<template>
  <form class="form" @submit.prevent="onSubmit">
    <h2>Cadastrar</h2>

    <div class="form-field">
      <input v-model="fields.name" placeholder="Nome" type="text" required />
    </div>

    <div class="form-field">
      <input v-model="fields.email" placeholder="Email" type="email" required />
    </div>

    <div class="form-field">
      <input
        ref="password"
        v-model="fields.password"
        placeholder="Senha"
        type="password"
        required
      />
    </div>

    <div class="form-field">
      <select v-model="fields.type" required>
        <option value="" disabled selected>Tipo</option>
        <option value="company">Empresa</option>
        <option value="user">Candidato</option>
      </select>
    </div>

    <div class="actions">
      <button type="submit">Cadastrar</button>
      <button
        :disabled="disableActionsGoogle"
        class="actions-google"
        type="button"
        @click="registerWithGoogle"
      >
        <img
          src="@/assets/icons8-google-logo-48.png"
          alt="Fazer cadastro com Gemail"
        />
      </button>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import { authUser } from "../service/firebase/firebase-auth";

export default {
  name: "LoginFormSignUp",

  data() {
    return {
      fields: {
        uid: null,
        name: "anderson",
        email: "niinoolopes0@gmail.com",
        password: "1234",
        type: "user",
      },
      disableActionsGoogle: false,
    };
  },

  methods: {
    async onSubmit() {
      const form = { ...this.fields };

      const { status, data } = await axios.post("/api/user", form);

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

    async registerWithGoogle() {
      const { uid, name, email } = await authUser();

      this.fields.uid = uid;
      this.fields.name = name;
      this.fields.email = email;

      this.$refs.password.focus();

      this.disableActionsGoogle = true;
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