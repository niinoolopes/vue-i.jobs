<template>
  <div class="home">
    <Intro size="lg">
      <h1>I.jobs</h1>
      <p>Aqui cadastramos e encontramos vagas</p>
      <p>
        Seja bem vindo esperamos que encontre uma nova fase para sua vida
        profissional
      </p>
    </Intro>

    <h2>Candidatos</h2>
    <HomePerfilList />

    <h2>Vagas</h2>
    <HomeJobsList />

    <h2>Empresas</h2>
    <HomeCompanyList />
  </div>
</template>

<script>
import Intro from "../components/Intro.vue";
import HomeJobsList from "../components/HomeJobsList.vue";
import HomePerfilList from "../components/HomePerfilList.vue";
import HomeCompanyList from "../components/HomeCompanyList.vue";

export default {
  components: { Intro, HomeJobsList, HomePerfilList, HomeCompanyList },
  name: "HomeView",
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 2rem;
  @media (min-width: 1000px) {
    font-size: 3rem;
  }
}

h2 {
  @include text_subtitle;
}
</style>
