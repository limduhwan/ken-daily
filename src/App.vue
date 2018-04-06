<template>
  <div id="app">
    <main>
      <vue-tabs>
        <v-tab title="News Paper">
          <news-paper></news-paper>
        </v-tab>

        <v-tab title="Voca">
          Second tab content
        </v-tab>

        <v-tab title="Reading">
          Third tab content
        </v-tab>
      </vue-tabs>
    </main>

  </div>
  <!--<div>-->
  <!--<v-client-table :columns="columns" :data="tableData">-->

  <!--</v-client-table>-->
  <!--</div>-->
</template>

<script>
  import NewsPaper from './components/NewsPaper'

  export default {
    name: 'app',
    components: {
      NewsPaper
    }
  }
</script>
