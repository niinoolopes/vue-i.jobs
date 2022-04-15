import { belongsTo, createServer, hasMany, Model, Response } from "miragejs"
import seeds from './seeds'

export function makeServer({ environment = "development" } = {}) {
  let server = createServer({
    environment,

    models: {
      vaga: Model.extend({
        empresa: belongsTo()
      }),
      empresa: Model.extend({
        vagas: hasMany()
      }),
      usuario: Model,
    },

    seeds(server) {
      seeds.map(({ model, register }) => {
        server.create(model, register)
      })
    },

    routes() {
      this.namespace = "api"

      // empresas
      this.get('/empresas', (schema) => {
        const data = schema.empresas.all().models
          .filter(model => {
            return !!model.vagas.models.length
          }).splice(0, 10)

        return new Response(200, {}, { empresas: data });
      })
      this.get('/empresas/:id', (schema, request) => {
        let id = request.params.id

        const data = schema.empresas.find(id)

        return new Response(200, {}, {
          empresa: {
            id: data.id,
            name: data.name,
            description: data.description,
            servicosId: data.servicosId,
            service: data.vagas.models,
          }
        });
      })


      this.post('/signin', (schema, request) => {
        let { email, password } = JSON.parse(request.requestBody)

        const data = schema.usuarios.findBy({ email, password })

        if (!data) {
          return new Response(204, { error: 'Usuario não encontrado' }, {});
        }

        return new Response(200, {}, data);
      })
      this.post('/signin-google', (schema, request) => {
        let { uid } = JSON.parse(request.requestBody)

        const data = schema.usuarios.findBy({ uid })

        if (!data) {
          return new Response(204, { error: 'Usuario não encontrado' }, {});
        }

        return new Response(200, {}, data);
      })

      // this.post('/signup', (schema, request) => {
      //   let { name, email, password } = JSON.parse(request.requestBody)

      //   return schema.usuario.create({
      //     name, email, password
      //   })
      // })

      this.post('/user', (schema, request) => {
        let { uid, name, email } = JSON.parse(request.requestBody)

        const data = schema.usuarios.create({
          uid, name, email
        })

        return new Response(200, {}, data);
      })
    },
  })

  // libera acesso url externas
  server.passthrough('https://www.googleapis.com/**');
  server.passthrough('https://identitytoolkit.googleapis.com/**');

  return server
}