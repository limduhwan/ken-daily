<template>
  <div>
    <vue-editor id="editor"
                useCustomImageHandler
                @imageAdded="handleImageAdded" v-model="editorContent">
    </vue-editor>
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
        editorContent: 'Initial Content'
      }
    },

    methods: {
      handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
        // An example of using FormData
        // NOTE: Your key could be different such as:
        // formData.append('file', file)

        var formData = new FormData();
        formData.append('image', file)

        axios({
          url: 'https://fakeapi.yoursite.com/images',
          method: 'POST',
          data: formData
        })
          .then((result) => {
            let url = result.data.url // Get url from response
            Editor.insertEmbed(cursorLocation, 'image', url);
            resetUploader();
          })
          .catch((err) => {
            console.log(err);
          })
      }
    }
  }
</script>
<style>
  @import "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/default.min.css";

  #editor {
    height: 400px;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*margin-top: 60px;*/
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 3em;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
