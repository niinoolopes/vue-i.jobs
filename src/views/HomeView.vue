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
    <HomePerfilList :perfilList="perfilList" />

    <h2>Vagas</h2>
    <HomeJobsList :jobList="jobList" />

    <h2>Empresas</h2>
    <HomeCompanyList :companyList="companyList" />
  </div>
</template>

<script>
import axios from "axios";

import Intro from "../components/Intro.vue";
import HomeJobsList from "../components/HomeJobsList.vue";
import HomePerfilList from "../components/HomePerfilList.vue";
import HomeCompanyList from "../components/HomeCompanyList.vue";

export default {
  components: { Intro, HomeJobsList, HomePerfilList, HomeCompanyList },
  name: "HomeView",

  data() {
    return {
      jobList: [],
      perfilList: [],
      companyList: [],
    };
  },

  async mounted() {
    await this.getUser();
    await this.getJobs();
    await this.getCompany();
  },

  methods: {
    async getUser() {
      const { status, data } = await axios.get("/api/usuario");

      this.perfilList = status === 200 ? data : [];

      !status &&
        window.alert("Ops.. algo aconteceu! [perfil] contate o suporte");
    },
    async getJobs() {
      const { status, data } = await axios.get("/api/vaga");

      this.jobList = status === 200 ? data : [];

      !status && window.alert("Ops.. algo aconteceu! [jobs] contate o suporte");
    },
    async getCompany() {
      const { status, data } = await axios.get("/api/empresa");

      this.companyList = status === 200 ? data : [];

      !status &&
        window.alert("Ops.. algo aconteceu! [company] contate o suporte");
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 1rem;
  font-size: 2rem;
  @media (min-width: 1000px) {
    font-size: 3rem;
  }
}

h2 {
  @include text_subtitle;

  @media (max-width: 1000px) {
    text-align: center;
  }
}
</style>
