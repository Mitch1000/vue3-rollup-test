<template>
  <h1>
    Hello
    <span class="name">
     {{ name }}
    </span>
  </h1>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
const props = defineProps({
    test: {
      type: String,
      default: "Vue prop example"
    }
})

const name :Ref<string> = ref("World")
console.log(props.test)

</script>

<style scoped>
.name {
    color: blue;
}
</style>
