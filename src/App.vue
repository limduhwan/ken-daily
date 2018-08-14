<template>
  <div id="app">
    <main>
      <vue-tabs>
        <v-tab title="EBS">
          <e-b-s></e-b-s>
        </v-tab>
        <v-tab title="TEST">
          <hello-world></hello-world>
        </v-tab>
        <v-tab title="News Paper">
          <NewsPaper></NewsPaper>
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
  import HelloWorld from "./components/HelloWorld";
  import EBS from "./components/EBS";

  export default {
    name: 'app',
    components: {
      EBS,
      HelloWorld,
      NewsPaper
    }
  }
</script>

<!--</script>-->
<!--&#45;&#45; 조회-->
<!--&#45;&#45; 수정-->
<!--코멘트 저장 후에 리프레쉬-->
<!--탭 클릭시 조회, 생성할 때 말고-->
<!--뉴스 저장시 그날짜에 이미 존재하는지 여부-->
<!--저장 후 클리어, 콜백으로-->
<!--Voca 페이지 제거-->
