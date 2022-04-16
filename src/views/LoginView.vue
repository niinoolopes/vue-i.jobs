<template>
  <div class="login">
    <div class="login-container">
      <ul>
        <li
          :class="{ active: currentForm === 'LoginFormSignIn' }"
          @click="currentForm = 'LoginFormSignIn'"
        >
          Já tenho conta
        </li>
        <li
          :class="{ active: currentForm === 'LoginFormSignUp' }"
          @click="currentForm = 'LoginFormSignUp'"
        >
          Não tenho conta
        </li>
      </ul>

      <component :is="currentForm" @changeForm="(ev) => (currentForm = ev)" />
    </div>
  </div>
</template>

<script>
import LoginFormSignIn from "../components/LoginFormSignIn.vue";
import LoginFormSignUp from "../components/LoginFormSignUp.vue";

export default {
  name: "LoginView",

  components: {
    LoginFormSignIn,
    LoginFormSignUp,
  },

  data() {
    return {
      currentForm: "LoginFormSignIn",
    };
  },
};
</script>

<style lang="scss" scoped>
.login {
  @include display_flex_column;
  align-items: center;
}

.login-container {
  @include card;
}

ul {
  @include display_flex_align_items;
  padding: 0.25rem;
  margin-bottom: -0.25rem;
  gap: 0.25rem;

  border-bottom: 1px solid var(--color-gray);

  li {
    @include btn_base(var(--color-black), var(--color-white));
    border: none;

    @include transition;
    &:hover {
      @include hover_filter;
    }

    &.active {
      @include hover_filter;
    }
  }
}
</style>
