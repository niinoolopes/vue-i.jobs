<template>
  <div id="app">
    <Header />

    <Main>
      <Alert />
      <router-view />
    </Main>
  </div>
</template>


<script>
import Header from "./components/layout/Header.vue";
import Main from "./components/layout/Main.vue";
import Alert from "./components/layout/Alert.vue";

export default {
  components: { Header, Main, Alert },
};
</script>
