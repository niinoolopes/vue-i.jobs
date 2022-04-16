<template>
  <div id="app">
    <Header />

    <Main>
      <router-view />
    </Main>
  </div>
</template>


<script>
import Header from "./components/layout/Header.vue";
import Main from "./components/layout/Main.vue";

export default {
  components: { Header, Main },
};
</script>
