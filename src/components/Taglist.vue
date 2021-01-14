<template>
  <ul class="tag-list">
    <li class="tag-default tag-pill tag-outline" v-for="tag in tags" :key="tag">
      {{ tag }}
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'AppTaglist',
    props: {
      tags: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style></style>
