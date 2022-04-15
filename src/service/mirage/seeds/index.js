export default [
  { model: 'empresa', register: { name: 'empresa 1', description: 'somos a empresa 1', vagasId: [1] } },
  { model: 'vaga', register: { name: 'Front-End', empresaId: 1 } },
  { model: 'vaga', register: { name: 'Front', empresaId: 1 } },
  { model: 'empresa', register: { name: 'empresa 2', description: 'somos a empresa 2', } },
  { model: 'empresa', register: { name: 'empresa 3', description: 'somos a empresa 3', } },
  { model: 'empresa', register: { name: 'empresa 7', description: 'somos a empresa 7', } },
  { model: 'usuario', register: { name: 'Nino', email: 'nino@gmail.com', password: 1234 } },
]