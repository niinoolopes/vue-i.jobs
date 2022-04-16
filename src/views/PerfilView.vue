<template>
  <div>
    <Intro>
      <h1>Perfil</h1>
    </Intro>

    <ul v-if="this.$store.getters.isCompany">
      <li
        :class="{ active: showComponent === 'dados' }"
        @click="showComponent = 'dados'"
      >
        Dados
      </li>
      <li
        :class="{ active: showComponent === 'vagas' }"
        @click="showComponent = 'vagas'"
      >
        Vagas
      </li>
    </ul>

    <div v-show="showComponent === 'dados'">
      <h2>Dados</h2>
      <form class="form" @submit.prevent="onSubmit">
        <div class="form-field">
          <input
            v-model="fields.name"
            placeholder="Nome"
            type="text"
            required
          />
        </div>

        <div class="form-field">
          <input
            v-model="fields.email"
            placeholder="Email"
            type="email"
            required
          />
        </div>

        <template v-if="this.$store.getters.isUser">
          <h2>Tipo</h2>
          <div class="form-field">
            <div class="form-fild-input">
              <label class="input" for="input-radio-company">
                <input
                  v-model="fields.type"
                  type="radio"
                  id="input-radio-company"
                  value="company"
                />
                Empresa
              </label>
              <label class="input" for="input-radio-user">
                <input
                  v-model="fields.type"
                  type="radio"
                  id="input-radio-user"
                  value="user"
                />
                Candidato
              </label>
            </div>
          </div>

          <div v-show="fields.type === 'user'" class="form-field">
            <h2>Habilidades</h2>
            <div class="form-fild-input">
              <label
                v-for="skill in skills"
                :key="skill.id"
                class="input"
                :for="skill.id"
              >
                <input
                  v-model="fields.skill"
                  type="checkbox"
                  :id="skill.id"
                  :value="skill.id"
                />
                {{ skill.name }}
              </label>
            </div>
          </div>
        </template>

        <template v-else>
          <div class="form-field">
            <textarea
              v-model="fields.description"
              name=""
              id=""
              cols="30"
              rows="5"
            ></textarea>
          </div>
        </template>

        <div class="actions">
          <button type="submit">Salvar</button>
        </div>
      </form>
    </div>

    <div v-if="showComponent === 'vagas'">
      <div class="content">
        <section>
          <h2>Nova vaga</h2>
          <PerfilFormJobs @getJobs="getJobs" />
        </section>
        <section>
          <h2>Minhas vagas</h2>
          <HomeJobsList :jobList="jobList" />
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Intro from "../components/Intro.vue";
import PerfilFormJobs from "../components/PerfilFormJobs.vue";
import HomeJobsList from "../components/HomeJobsList.vue";

export default {
  name: "PerfilView",

  components: { Intro, PerfilFormJobs, HomeJobsList },

  data() {
    return {
      showComponent: "dados",
      fields: {
        ...this.$store.state.perfil,
      },
      skills: [],
      jobList: [],
    };
  },

  async mounted() {
    await this.getSkill();

    if (this.$store.getters.isCompany) {
      await this.getJobs();
    }
  },

  methods: {
    async onSubmit() {
      const { id, ...form } = this.fields;

      if (form?.type === "company") {
        form.skill = [];
      }

      const { status } = this.$store.getters.isUser
        ? await axios.put(`/api/usuario/${id}`, form)
        : await axios.put(`/api/empresa/${id}`, form);

      alert(status === 200 ? "Tudo salvo" : "Algo deu errado em!");

      await this.$store.commit("SET", {
        key: "perfil",
        value: { ...this.fields },
      });
    },

    async getSkill() {
      const { status, data } = await axios.get("/api/habilidade");

      this.skills = status === 200 ? data : [];

      !status &&
        window.alert("Ops.. algo aconteceu! [skills] contate o suporte");
    },

    async getJobs() {
      const paramCompany = this.$store.state.perfil.id;

      const { status, data } = await axios.get(
        `/api/vaga?company=${paramCompany}`
      );

      this.jobList = status === 200 ? data : [];

      !status && window.alert("Ops.. algo aconteceu! [jobs] contate o suporte");
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  max-width: 350px;
  margin-bottom: 1rem;
  padding: 1rem;
}
.content {
  @include display_grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

ul {
  @include display_flex_align_items;
  padding: 0.25rem;
  margin-bottom: 1rem;
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

button {
  @include btn_base(var(--color-black), var(--color-white));
  @include transition;
  &:hover {
    @include hover_filter;
  }
}
</style>
