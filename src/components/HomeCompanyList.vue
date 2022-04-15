<template>
  <div class="company-list">
    <div class="company" v-for="company in companyList" :key="company">
      <div class="company-header">
        <p>name</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeCompanyList",

  data() {
    return {
      companyList: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    };
  },
};
</script>

<style lang="scss" scoped>
.company-list {
  @include display_grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  margin-bottom: 2rem;
}

.company {
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
}
</style>