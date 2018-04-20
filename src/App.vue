<template>
  <div id="app">
    <main>
      <vue-tabs>
        <v-tab title="News Paper">
          <news-paper></news-paper>
        </v-tab>

        <v-tab title="Voca">
          <voca></voca>
        </v-tab>

        <v-tab title="Readings">
          Third tab content
        </v-tab>

        <v-tab title="Links">
          <links></links>
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
  import Voca from './components/Voca'
  import Links from  './components/Links'

  export default {
    name: 'app',
    components: {
      NewsPaper,
      Study,
      Voca,
      Links
    }
  }
</script>

<!--</script>-->
<!--&#45;&#45; 조회-->
<!--&#45;&#45; 수정-->
<!--코멘트 저장 후에 리프레쉬-->
<!--탭 클릭시 조회, 생성할 때 말고-->
