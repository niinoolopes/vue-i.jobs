<template>
  <div class="intro" :class="cssIntro">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "IntroComponent",

  props: {
    size: {
      type: String,
      default: "sm",
    },
  },

  computed: {
    cssIntro() {
      return {
        sm: this.$props.size === "sm",
        lg: this.$props.size === "lg",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.intro {
  margin-bottom: 1rem;

  background: linear-gradient(90deg, var(--color-gray), var(--color-black));
  border: 1px solid var(--color-gray);
  border-radius: 0.25rem;
  color: var(--color-white);

  &.sm {
    padding: 1.5rem 1rem;
    @media (min-width: 1000px) {
      padding: 2.25rem 1.5rem;
    }
  }

  &.lg {
    padding: 2.5rem 1rem;
    @media (min-width: 1000px) {
      padding: 3rem 1.5rem;
    }
  }
}
</style>