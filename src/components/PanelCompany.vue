<template>
  <div>
    <h2>Vagas</h2>
    <HomeJobsList :jobList="jobList" />
  </div>
</template>


<script>
import axios from "axios";
import HomeJobsList from "../components/HomeJobsList.vue";

export default {
  components: { HomeJobsList },

  data() {
    return {
      jobList: [],
    };
  },

  mounted() {
    this.getJobs();
  },

  methods: {
    async getJobs() {
      const companyId = `?company=${this.$store.state.perfil.id}`

      const { status, data } = await axios.get(`/api/vaga${companyId}`);

      this.jobList = status === 200 ? data : [];

      !status &&
        window.alert("Ops.. algo aconteceu! [jobList] contate o suporte");
    },
  },
};
</script>

<style>
</style>