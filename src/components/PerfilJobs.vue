<template>
  <div>
    <h2>vagas</h2>
    <div class="vagas">
      <div v-for="vaga in vagas" :key="vaga.id" class="vaga"></div>
    </div>
  </div>
</template>

<script>
export default {

  
  data() {
    return {
      jobs: [
        {
          id: 1,
          name: "Front-End",
          description: "Front-End",
          empresaId: 1,
          habilidadeIds: [9, 8, 4, 5],
          usuarioId: null,
        },
      ],
    };
  },
};
</script>

<style>
</style>