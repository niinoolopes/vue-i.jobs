<template>
  <div class="perfil-list">
    <div class="perfil" v-for="perfil in perfilList" :key="perfil">
      <div class="perfil-header">
        <img src="@/assets/perfil.png" alt="photo perfil" />
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
      perfilList: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    };
  },
};
</script>

<style lang="scss" scoped>
.perfil-list {
  @include display_grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  margin-bottom: 2rem;
}

.perfil {
  @include card;

  &-header {
    @include display_flex_align_items;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;

    & img {
      border: 1px solid;
      border-radius: 50%;
      max-width: 4rem;
    }
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