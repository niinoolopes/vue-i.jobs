<template>
  <div class="job-list">
    <div class="job" v-for="job in jobList" :key="job">
      <div class="job-header">
        <p>name</p>
      </div>
      <ul>
        <li>PHP</li>
        <li>JS</li>
        <li>CSS</li>
        <li>HTML</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePerfilList",

  data() {
    return {
      jobList: [1, 2, 3, 4, 5],
    };
  },
};
</script>

<style lang="scss" scoped>
.job-list {
  @include display_grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  margin-bottom: 2rem;
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
    @include display_flex_align_items;
    justify-content: center;
    gap: 0.5rem;

    & li {
      @include badge;
    }
  }
}
</style>