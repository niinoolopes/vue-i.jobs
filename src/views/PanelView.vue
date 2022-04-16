<template>
  <div>
    <Intro>
      <h1>Painel</h1>
    </Intro>

    <component :is="currentPanel" />
  </div>
</template>

<script>
import Intro from "../components/Intro.vue";
import PanelUser from "../components/PanelUser.vue";
import PanelCompany from "../components/PanelCompany.vue";

export default {
  name: "PanelView",

  components: {
    Intro,
    PanelUser,
    PanelCompany,
  },

  computed: {
    currentPanel() {
      return this.$store.state.perfil.type === "user"
        ? "PanelUser"
        : "PanelCompany";
    },
  },
};
</script>

<style>
</style>