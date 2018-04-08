<template>
  <div id="app">
    <main>
      <vue-tabs>
        <v-tab title="News Paper">
          <news-paper></news-paper>
        </v-tab>
        <v-tab title="암기할 문장">

        </v-tab>
        <v-tab title="Voca">
          Second tab content
        </v-tab>

        <v-tab title="독서">
          Third tab content
        </v-tab>
        <v-tab title="스터디">
          <study></study>
        </v-tab>
        <v-tab title="Links">

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
  import Study from './components/Study'

  export default {
    name: 'app',
    components: {
      NewsPaper,
      Study
    }
  }
</script>
