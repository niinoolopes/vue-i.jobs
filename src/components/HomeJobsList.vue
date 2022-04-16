<template>
  <div class="job-list">
    <div class="job" v-for="job in jobList" :key="job.id">
      <div class="job-header">
        <p>{{ job.name }}</p>
      </div>
      <ul>
        <li v-for="skill in job.skill" :key="skill.id">{{ skill.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePerfilList",

  props: {
    jobList: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
.job-list {
  @include display_grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 350px));
  margin: 0 0.75rem 2rem;

  @media (max-width: 1000px) {
    justify-content: center;
  }
}

.job {
  @include card;

  &-header {
    @include display_flex_align_items;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;

    & p {
      font-size: 1.25rem;
      font-weight: 600;
      text-transform: uppercase;
    }
  }
  & ul {
    max-width: 250px;
    margin: 0 auto;

    @include display_flex_align_items;
    gap: 0.5rem;
    flex-wrap: initial;
    overflow-x: auto;
    padding: 0.25rem;

    & li {
      @include badge;
    }
  }
}
</style>