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

<!--</script>-->
<!--&#45;&#45; 조회-->
<!--&#45;&#45; 수정-->
<!--코멘트 저장 후에 리프레쉬-->
<!--저장시 월별로 저장하기-->
<!--그리드 클릭 버그 잡기-->
<!--버튼 동적생성-->
