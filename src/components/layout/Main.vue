<template>
  <main class="main">
    <slot></slot>
  </main>
</template>

<script>
export default {
  name: "LayoutMain",
};
</script>

<style lang="scss" scoped>
.main {
  @include container;
  position: relative;
}
</style>