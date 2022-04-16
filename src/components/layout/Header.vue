<template>
  <header>
    <div class="header-container">
      <router-link to="/" class="header-brand">I.jobs</router-link>

      <ul class="header-links">
        <template v-if="$store.state.logged">
          <router-link to="/panel">Painel</router-link>
          <router-link to="/perfil">Perfil</router-link>
        </template>

        <a v-if="$store.state.logged" @click="onSignOut">Sair</a>
        <router-link v-else to="/login">Entrar</router-link>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  name: "LayoutHeader",

  methods: {
    async onSignOut() {
      await this.$store.dispatch("signOut");
      await this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  margin-bottom: 2rem;

  &-container {
    padding: 0.75rem 1rem;
    border-radius: 0 0 8px 8px;
    box-shadow: var(--shadow);

    @include container;
    @include display_flex_justify_space_between;
  }

  &-brand {
    font-size: 2rem;
    font-weight: 300;
    color: var(--color-black);
    font-family: cursive;
    line-height: 1;

    @include transition;
    &:hover {
      @include hover_filter;
    }
  }
  &-links {
    @include display_flex_align_items;
    gap: 0.5rem;

    span {
      @include btn_base(var(--color-black), var(--color-white));
      border: none;
      border-radius: initial;
      border-right: 2px solid;
      cursor: initial;
    }

    a {
      @include btn_base(var(--color-black), var(--color-white));
      @include transition;
      &:hover {
        @include hover_filter;
      }
    }
  }
}
</style>
