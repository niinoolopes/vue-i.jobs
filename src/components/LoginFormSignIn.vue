<template>
  <form class="form" @submit.prevent="onSubmit">
    <h2>Login</h2>

    <div class="form-field">
      <input v-model="fields.email" placeholder="Email" type="email" required />
    </div>

    <div class="form-field">
      <input
        v-model="fields.password"
        placeholder="Senha"
        type="password"
        required
      />
    </div>

    <div class="actions">
      <button type="submit">Entrar</button>
      <button class="actions-google" type="button" @click="signInWithGoogle">
        <img
          src="@/assets/icons8-google-logo-48.png"
          alt="Criar contra com Gmail"
        />
      </button>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import { authUser } from "../service/firebase/firebase-auth";

export default {
  name: "LoginFormSignIn",

  data() {
    return {
      fields: {
        email: "nino@gmail.com",
        password: 1234,
      },
    };
  },

  methods: {
    async onSubmit() {
      const form = { ...this.fields };

      const { status, data } = await axios.post("/api/signin", form);

      if (status !== 200) {
        return;
      }

      await this.$store.dispatch("signIn", {
        id: data.usuario.id,
        name: data.usuario.name,
        email: data.usuario.email,
      });

      await this.$router.push("/panel");
    },

    async signInWithGoogle() {
      const { name, uid } = await authUser();

      const { status, data } = await axios.post("/api/signin-google", {
        name,
        uid,
      });

      if (status !== 200) {
        const createPerfil = window.confirm(
          "Não foi encontrado um cadastro com email, deseja criar?"
        );

        if (createPerfil) {
          this.$emit("changeForm", "LoginFormSignUp");
        }
        return;
      }

      await this.$store.dispatch("signIn", {
        id: data.usuario.id,
        name: data.usuario.name,
        email: data.usuario.email,
      });

      await this.$router.push("/panel");
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  width: 100%;
  max-width: 300px;
  padding: 1rem;

  h2 {
    @include text_subtitle;
    text-align: initial;
  }
  button {
    @include btn_base(var(--color-black), var(--color-white));
    @include transition;
    &:hover {
      @include hover_filter;
    }
  }

  .actions {
    @include display_flex_justify_space_between;

    .actions-google {
      border: none;

      img {
        max-height: 24px;
      }
    }
  }
}
</style>