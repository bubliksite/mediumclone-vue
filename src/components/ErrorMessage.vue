<template>
  <div>{{ message }}</div>
</template>

<script>
  export default {
    name: 'AppErrorMessage',
    props: {
      message: {
        type: String,
        required: false,
        default: 'Something broken'
      }
    }
  }
</script>

<style scoped></style>
