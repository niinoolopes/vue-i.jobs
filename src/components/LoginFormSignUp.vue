<template>
  <form class="form" @submit.prevent="onSubmit">
    <h2>Dados</h2>

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

    <h2>Tipo</h2>
    <div class="form-field">
      <div class="form-fild-input">
        <label class="input" for="input-radio-company">
          <input v-model="fields.type" type="radio" id="input-radio-company" value="company" />
          Empresa
        </label>
        <label class="input" for="input-radio-user">
          <input v-model="fields.type" type="radio" id="input-radio-user" value="user" />
          Candidato
        </label>
      </div>
    </div>

    <div v-show="fields.type === 'user'" class="form-field">
      <h2>Habilidades</h2>
      <div class="form-fild-input">
        <label v-for="skill in skills" :key="skill.id" class="input" :for="skill.id">
          <input v-model="fields.skill" type="checkbox" :id="skill.id" :value="skill.id" />
          {{skill.name}}
        </label>
      </div>
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
        skill: [1,2,3,4,5],
      },
      skills: [],
      disableActionsGoogle: false,
    };
  },

  mounted() {
    this.getSkill();
  },

  methods: {
    async onSubmit() {
      const form = { ...this.fields };

      const { status, data } = await axios.post("/api/usuario", form);

      if (status !== 200) {
        window.alert('Ops.. algo aconteceu! contate o suporte')
        return;
      }

      await this.$store.dispatch("signIn", data);

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

    async getSkill() {
      const { status, data } = await axios.get("/api/habilidade");

      this.skills = status === 200 ? data : [];

      !status && window.alert('Ops.. algo aconteceu! [skills] contate o suporte')
    },
  },

  watch: {
    'fields.type'(newValue) {
      if (newValue === "company") {
        this.fields.skill = [];
      }
    }
  }
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