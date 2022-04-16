import { belongsTo, createServer, hasMany, Model, Response } from "miragejs"
import seedHabilidade from './seeds/habilidade'
import seedEmpresa from './seeds/empresa'
import seedVaga from './seeds/vaga'
import seedUsuario from './seeds/usuario'

export function makeServer({ environment = "development" } = {}) {
  let server = createServer({
    environment,


    models: {
      habilidade: Model,
      empresa: Model.extend({
        vaga: hasMany()
      }),
      vaga: Model.extend({
        usuario: belongsTo(),
        habilidade: hasMany()
      }),
      usuario: Model.extend({
        vaga: belongsTo(),
        habilidade: hasMany()
      }),
    },

    seeds(server) {
      seedHabilidade.map(el => server.create('habilidade', el))
      seedVaga.map(el => server.create('vaga', el))
      seedEmpresa.map(el => server.create('empresa', el))
      seedUsuario.map(el => server.create('usuario', el))
    },

    routes() {
      this.namespace = "api"

      // EMPRESA
      this.get('/empresa', (schema) => {
        const data = schema.empresas.all().models
          // filtro de empresa que contem vagas
          // .filter(model => {
          //   return model.vaga.models.length
          // })
          // limite em 10 empresas
          .splice(0, 10)
          .map(model => {
            return {
              id: model.id,
              name: model.name,
              description: model.description,
              jobs: model.vaga.models.map(job => ({
                id: job.id,
                name: job.name,
                description: job.description,
                skill: job.habilidade.models.map(({ id, name }) => ({ id, name })),
              })),
            }
          })

        return new Response(200, {}, data);
      })
      this.get('/empresa/:id', (schema, request) => {
        let id = request.params.id

        const data = schema.empresas.find(id)

        return new Response(200, {}, {
          id: data.id,
          name: data.name,
          description: data.description,
          // servicosId: data.servicosId,
          // service: data.vagas.models,
        });
      })
      this.put('/empresa/:id', (schema, request) => {
        let id = request.params.id
        let { name, email, description } = JSON.parse(request.requestBody)

        const data = schema.empresas.find(id).update({ name, email, description })

        return new Response(200, {}, {
          id: data.id,
          name: data.name,
          email: data.email,
          description: data.description,
          vaga: data.vaga.models.map(model => ({
            id: model.id,
            name: model.name,
            description: model.description,
            skill: model.habilidade.models
          })),
          vagaIds: data.vaga.models.map(({ id }) => +id)
        });
      })


      // VAGA
      this.get('/vaga', (schema, request) => {
        const paramsSkill = request.queryParams?.skill?.map(n => +n) || []
        const paramsCompany = request.queryParams?.company || 0

        const empresas = schema.empresas.all().models

        let data = schema.vagas.all().models
          .filter(model => !model.usuarioId)
          .map(model => {
            return {
              id: model.id,
              name: model.name,
              description: model.description,
              skill: model.habilidade.models,
              empresa: empresas.filter(e => +e.id === +model.empresaId),
              empresaIds: empresas.map(e => +e.id),
            }
          })

        // filtra por skill via url
        if (paramsSkill.length > 0) {
          data = data.filter(model => model.skill.reduce((acc, { id }) => acc || paramsSkill.includes(+id), false))
        }

        // filtra por skill via url
        if (paramsCompany > 0) {
          data = data.filter(model => model.empresa.reduce((acc, { id }) => acc || +paramsCompany === +id, false))
        }

        return new Response(200, {}, data);
      })
      this.post('/vaga', (schema, request) => {
        const empresas = schema.empresas.all().models

        let { name, description, empresaId, skill: habilidadeIds } = JSON.parse(request.requestBody)

        const data = schema.vagas.create({ name, description, empresaId, habilidadeIds })

        return new Response(200, {}, {
          id: data.id,
          name: data.name,
          description: data.description,
          skill: data.habilidade.models,
          empresa: empresas.filter(e => +e.id === +data.empresaId),
          empresaIds: empresas.map(e => +e.id),
        });
      })


      // AUTH
      this.post('/signin', (schema, request) => {
        let { email, password } = JSON.parse(request.requestBody)

        const resultUsuario = schema.usuarios.where({ email, password }).models

        // find USUARIO
        if (resultUsuario.length) {
          const [data] = resultUsuario

          return new Response(200, {}, {
            id: data.id,
            name: data.name,
            email: data.email,
            type: data.type,
            skill: data.habilidade.models.map(({ id }) => +id),
            // skill: data.habilidade.models.map(({ id, name }) => ({ id, name })),
            // skillIds: data.habilidade.models.map(({ id }) => +id),
          });
        }

        // find EMPRESA
        const resultEmpresa = schema.empresas.where({ email, password }).models
        if (resultEmpresa.length) {
          const [data] = resultEmpresa

          return new Response(200, {}, {
            id: data.id,
            name: data.name,
            email: data.email,
            description: data.description,
            vaga: data.vaga.models.map(model => ({
              id: model.id,
              name: model.name,
              description: model.description,
              skill: model.habilidade.models
            })),
            vagaIds: data.vaga.models.map(({ id }) => +id)
          });
        }

        return new Response(204, { error: 'Usuario não encontrado' }, {});
      })
      this.post('/signin-google', (schema, request) => {
        let { uid } = JSON.parse(request.requestBody)

        const data = schema.usuarios.findBy({ uid })

        if (!data) {
          return new Response(204, { error: 'Usuario não encontrado' }, {});
        }

        return new Response(200, {}, data);
      })


      // USUARIO
      this.get('/usuario', (schema, request) => {
        const paramsSkill = request.queryParams?.skill?.map(n => +n) || []
        const paramsLimit = request.queryParams?.limit || 0

        let data = schema.usuarios.all().models
          // filtra por candidatos sem vagas
          .filter(model => {
            return !model.vaga
          })
          .map(model => ({
            id: model.id,
            name: model.name,
            email: model.email,
            type: model.type,
            skill: model.habilidade.models.map(({ id, name }) => ({ id, name })),
            skillIds: model.habilidade.models.map(({ id }) => +id),
          }))

        // filtra por skill via url
        if (paramsSkill.length > 0) {
          data = data.filter(model => model.skill.reduce((acc, { id }) => acc || paramsSkill.includes(+id), false))
        }
        if (paramsLimit > 0) {
          data = data.splice(0, paramsLimit)
        }

        return new Response(200, {}, data);
      })
      this.post('/usuario', (schema, request) => {
        let { name, email, password, type, skill: habilidadeIds } = JSON.parse(request.requestBody)

        const data = schema.usuarios.create({ name, email, password, type, habilidadeIds })

        return new Response(200, {}, {
          id: data.id,
          name: data.name,
          email: data.email,
          type: data.type,
          skill: data.habilidade.models.map(({ id, name }) => ({ id, name })),
          skillIds: data.habilidade.models.map(({ id }) => +id),
        });
      })
      this.put('/usuario/:id', (schema, request) => {
        let id = request.params.id
        let { name, email, type } = JSON.parse(request.requestBody)

        const data = schema.usuarios.find(id).update({ name, email, type })

        return new Response(200, {}, {
          id: data.id,
          name: data.name,
          email: data.email,
          type: data.type,
          skill: data.habilidade.models.map(({ id, name }) => ({ id, name })),
          skillIds: data.habilidade.models.map(({ id }) => +id),
        });
      })


      // HABILIDADE
      this.get('/habilidade', (schema) => {
        const data = schema.habilidades.all().models

        return new Response(200, {}, data);
      })
    },
  })

  // libera acesso url externas
  server.passthrough('https://www.googleapis.com/**');
  server.passthrough('https://identitytoolkit.googleapis.com/**');

  return server
}