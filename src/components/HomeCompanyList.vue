<template>
  <div class="company-list">
    <div class="company" v-for="company in companyList" :key="company.id">
      <p>{{ company.name }}</p>
      <span> vaga(s): {{ company.jobs.length }} </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeCompanyList",

  props: {
    companyList: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
.company-list {
  @include display_grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 350px));
  margin: 0 0.75rem 2rem;

  @media (max-width: 1000px) {
    justify-content: center;
  }
}

.company {
  @include card;

  & p {
    font-size: 1.25rem;
    font-weight: 600;
    text-transform: uppercase;
  }
}
</style>