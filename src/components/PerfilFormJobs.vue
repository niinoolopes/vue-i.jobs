<template>
  <form class="form" @submit.prevent="onSubmit">
    <div class="form-field">
      <input v-model="fields.name" placeholder="Nome" type="text" required />
    </div>

    <div class="form-field">
      <textarea
        v-model="fields.description"
        name=""
        id=""
        cols="30"
        rows="5"
      ></textarea>
    </div>

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

    <div class="actions">
      <button type="submit">Cadastrar</button>
    </div>

  </form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      fields: {
        name: "",
        description: "",
        skill: [],
      },
      vagas: [],
      jobs: [
        {
          id: 1,
          name: "Front-End",
          description: "Front-End",
          empresaId: 1,
          habilidadeIds: [9, 8, 4, 5],
          usuarioId: null,
        },
      ],
      skills: [],
    };
  },

  mounted() {
    this.getSkill();
  },

  methods: {
    async onSubmit() {
      const form = {
        ...this.fields,
        empresaId: this.$store.state.perfil.id,
        usuarioId: null,
      };

      const { status } = await axios.post("/api/vaga", form);

      if (status !== 200) {
        window.alert("Ops.. algo aconteceu! contate o suporte");
        return;
      }

      alert(status === 200 ? 'Vaga criada com sucesso' : 'Algo deu errado em!')

      this.fields = {
        name: "",
        description: "",
        skill: [],
      };

      this.$emit('getJobs')
    },

    async getSkill() {
      const { status, data } = await axios.get("/api/habilidade");

      this.skills = status === 200 ? data : [];

      !status &&
        window.alert("Ops.. algo aconteceu! [skills] contate o suporte");
    },
  },
};
</script>


<style lang="scss" scoped>
.form {
  padding: 1rem;
}

button {
  @include btn_base(var(--color-black), var(--color-white));
  @include transition;
  &:hover {
    @include hover_filter;
  }
}
</style>
