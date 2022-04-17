import { createServer, Model, Response } from "miragejs"
import seedHabilidade from './seeds/habilidade'
import seedEmpresa from './seeds/empresa'
import seedVaga from './seeds/vaga'
import seedUsuario from './seeds/usuario'

export function makeServer({ environment = "development" } = {}) {
  let server = createServer({
    environment,

    models: {
      habilidade: Model,
      empresa: Model.extend(),
      vaga: Model.extend(),
      usuario: Model.extend(),
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
        const habilidades = schema.habilidades.all().models.map(skill => ({
          id: +skill.id,
          name: skill.name,
        }))

        const vagas = schema.vagas.all().models.map(vaga => {
          const skillIds = vaga.habilidadeIds.map(n => +n)

          const skill = habilidades.filter(skill => skillIds.includes(skill.id))

          return {
            id: +vaga.id,
            name: vaga.name,
            description: vaga.description,
            skill,
            skillIds,
          }
        })

        const empresas = schema.empresas.all().models
          .filter(model => {
            return model.vagaIds.length
          })
          .map(model => {
            const jobsIds = model.vagaIds.map(n => +n)

            const jobs = vagas.filter(({ id }) => jobsIds.includes(id))

            return {
              id: +model.id,
              name: model.name,
              description: model.description,
              jobs,
              jobsIds
            }
          })

        return new Response(200, {}, empresas);
      })
      this.get('/empresa/:id', (schema, request) => {
        const habilidades = schema.habilidades.all().models.map(skill => ({
          id: +skill.id,
          name: skill.name,
        }))

        const vagas = schema.vagas.all().models.map(vaga => {
          const skillIds = vaga.habilidadeIds.map(n => +n)

          const skill = habilidades.filter(skill => skillIds.includes(skill.id))

          return {
            id: +vaga.id,
            name: vaga.name,
            description: vaga.description,
            skill,
            skillIds,
          }
        })

        let id = request.params.id

        const empresa = schema.empresas.find(id)

        const jobsIds = empresa.vagaIds
        const jobs = vagas.filter(({ id }) => jobsIds.includes(id))

        return new Response(200, {}, {
          id: +empresa.id,
          name: empresa.name,
          description: empresa.description,
          jobs,
          jobsIds
        });
      })
      this.put('/empresa/:id', (schema, request) => {
        const habilidades = schema.habilidades.all().models.map(skill => ({
          id: +skill.id,
          name: skill.name,
        }))

        const vagas = schema.vagas.all().models.map(vaga => {
          const skillIds = vaga.habilidadeIds.map(n => +n)

          const skill = habilidades.filter(skill => skillIds.includes(skill.id))

          return {
            id: +vaga.id,
            name: vaga.name,
            description: vaga.description,
            skill,
            skillIds,
          }
        })

        let id = request.params.id
        let { name, email, description } = JSON.parse(request.requestBody)

        const empresa = schema.empresas.find(id).update({ name, email, description })

        const jobsIds = empresa.vagaIds
        const jobs = vagas.filter(({ id }) => jobsIds.includes(id))

        return new Response(200, {}, {
          id: +empresa.id,
          name: empresa.name,
          description: empresa.description,
          jobs,
          jobsIds
        });
      })


      // VAGA
      this.get('/vaga', (schema, request) => {
        const paramsSkill = request.queryParams?.skill?.map(n => +n) || []
        const paramsCompany = request.queryParams?.company || 0

        const habilidades = schema.habilidades.all().models.map(skill => ({
          id: +skill.id,
          name: skill.name,
        }))

        const empresas = schema.empresas.all().models.map(empresa => ({
          id: +empresa.id,
          name: empresa.name,
          description: empresa.description,
        }))

        let data = schema.vagas.all().models
          // .filter(model => !model.usuarioId)
          .map(vaga => {

            const empresaId = +vaga.empresaId

            const empresa = empresas.filter(e => e.id === empresaId)

            const skillIds = vaga.habilidadeIds.map(n => +n)

            const skill = habilidades.filter(skill => skillIds.includes(skill.id))

            return {
              id: +vaga.id,
              name: vaga.name,
              description: vaga.description,
              skill,
              skillIds,
              empresa,
              empresaId,
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
        const habilidades = schema.habilidades.all().models.map(skill => ({
          id: +skill.id,
          name: skill.name,
        }))

        const empresas = schema.empresas.all().models.map(empresa => ({
          id: +empresa.id,
          name: empresa.name,
          description: empresa.description,
        }))

        let { name, description, empresaId, skill: habilidadeIds } = JSON.parse(request.requestBody)

        const vaga = schema.vagas.create({ name, description, empresaId, habilidadeIds })

        const empresa = empresas.filter(e => e.id === empresaId)

        const skillIds = habilidadeIds.map(n => +n)

        const skill = habilidades.filter(skill => skillIds.includes(skill.id))

        return new Response(200, {}, {
          id: +vaga.id,
          name: vaga.name,
          description: vaga.description,
          skill,
          skillIds,
          empresa,
          empresaId,
        });
      })
      this.put('/vaga/:id', (schema, request) => {
        let id = request.params.id
        let { name, description, empresaId, skill: habilidadeIds } = JSON.parse(request.requestBody)

        const habilidades = schema.habilidades.all().models.map(skill => ({
          id: +skill.id,
          name: skill.name,
        }))

        const empresas = schema.empresas.all().models.map(empresa => ({
          id: +empresa.id,
          name: empresa.name,
          description: empresa.description,
        }))

        const vaga = schema.vagas.find(id).update({ name, description, empresaId, habilidadeIds })

        const empresa = empresas.filter(e => e.id === empresaId)

        const skillIds = habilidadeIds.map(n => +n)

        const skill = habilidades.filter(skill => skillIds.includes(skill.id))

        return new Response(200, {}, {
          id: +vaga.id,
          name: vaga.name,
          description: vaga.description,
          skill,
          skillIds,
          empresa,
          empresaId,
        });
      })
      this.del('/vaga/:id', (schema, request) => {
        let id = request.params.id

        schema.vagas.find(id).destroy()

        return new Response(204, {}, {});
      })


      // AUTH
      this.post('/signin', (schema, request) => {
        let { email, password } = JSON.parse(request.requestBody)

        const resultUsuario = schema.usuarios.where({ email, password }).models

        if (resultUsuario.length > 0) {
          const [usuario] = resultUsuario

          console.log('signin usuario', usuario);

          return new Response(200, {}, {
            id: usuario.id,
            name: usuario.name,
            email: usuario.email,
            type: usuario.type,
            // skill: usuario.habilidade.models.map(({ id }) => +id),
            // skill: usuario.habilidade.models.map(({ id, name }) => ({ id, name })),
            skillIds: usuario.habilidadeIds.map(n => +n),
          });
        }

        // find EMPRESA
        const resultEmpresa = schema.empresas.where({ email, password }).models

        if (resultEmpresa.length > 0) {
          const [empresa] = resultEmpresa

          console.log('signin empresa', empresa);

          // const habilidades = schema.habilidades.all().models.map(skill => ({
          //   id: +skill.id,
          //   name: skill.name,
          // }))

          const vagaIds = empresa.vagaIds.map(n => +n)

          // const vagas = schema.vagas.all().models
          //   .filter(vaga => vagaIds.includes(+vaga.id))
          //   .map(vaga => {

          //     const skillIds = vaga.habilidadeIds.map(n => +n)

          //     const skill = habilidades.filter(skill => skillIds.includes(skill.id))

          //     return {
          //       id: +vaga.id,
          //       name: vaga.name,
          //       description: vaga.description,
          //       skill,
          //       skillIds,
          //       // empresa,
          //       // empresaId,
          //     }
          //   })

          return new Response(200, {}, {
            id: empresa.id,
            name: empresa.name,
            email: empresa.email,
            description: empresa.description,
            // vaga: vagas,
            vagaIds
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

        const habilidades = schema.habilidades.all().models.map(skill => ({
          id: +skill.id,
          name: skill.name,
        }))

        let data = schema.usuarios.all().models
          // filtra por candidatos sem vagas
          .filter(model => {
            return !model.vaga
          })
          .map(model => {
            const skillIds = model.habilidadeIds.map(id => +id)

            const skill = habilidades.filter(({ id }) => skillIds.includes(id))

            return {
              id: +model.id,
              name: model.name,
              email: model.email,
              type: model.type,
              skill,
              skillIds
            }
          })

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
        let { uid, name, email, password, type, skill: habilidadeIds } = JSON.parse(request.requestBody)

        const data = schema.usuarios.create({ uid, name, email, password, type, habilidadeIds })

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
        let { name, email, type, habilidadeIds } = JSON.parse(request.requestBody)

        const data = schema.usuarios.find(id).update({ name, email, type, habilidadeIds })

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