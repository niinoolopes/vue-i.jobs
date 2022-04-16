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
      buscarJobs: null,
      jobList: [],
    };
  },

  mounted() {
    this.getJobs();

    this.buscarJobs = setInterval(() => this.getJobs(), 5 * 1000);
  },

  beforeUnmount() {
    clearInterval(this.buscarJobs);
  },

  methods: {
    async getJobs() {
      const skillId = this.$store.state.perfil.skillIds
        // formatação para ? skill[]=1 & skill[]=2 & skill[]=3
        .reduce((acc, id) => {
          acc += `${acc ? "&" : "?"}skill[]=${id}`;
          return acc;
        }, "");

      const { status, data } = await axios.get(`/api/vaga${skillId}`);

      this.jobList = status === 200 ? data : [];

      !status &&
        window.alert("Ops.. algo aconteceu! [jobList] contate o suporte");
    },
  },
};
</script>

<style lang="scss" scoped>
h2 {
  @include text_subtitle;

  @media (max-width: 1000px) {
    text-align: center;
  }
}
</style>
