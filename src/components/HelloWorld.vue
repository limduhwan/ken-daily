<template>
  <div id="app">
    <vue-editor id="editor1" v-model="editor1Content"></vue-editor>
  </div>
</template>

<script>
  import { VueEditor } from 'vue2-editor'

  export default {
    components: {
      VueEditor
    },

    data() {
      return {
        editor1Content: '<h1>Editor 1 Starting Content</h1>',
        editor2Content: '<h1>Editor 2 Starting Content</h1>',
      }
    }
  }
</script>

<style>
  #editor1, #editor2 {
    height: 350px;
  }
</style>
