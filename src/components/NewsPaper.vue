<template>
  <div class ="newspaper-table">
    <div>
      <div class="centered">
        <select v-model="selected">
          <option>2018</option>
          <option>2019</option>
        </select>
        <br>
        <button-calendar></button-calendar>
      </div>
    </div>
    <br>
    <div class="table th td">
      <v-client-table :data="tableData" :columns="colums" :options="options">

      </v-client-table>
    </div>
  </div>
</template>

<script>
  import ButtonCalendar from './ButtonCalendar'

  export default {
    name: 'news-paper',
    components: {
      ButtonCalendar
    },
    data: function () {
      return {
        selected: 2018,
        colums: ['createDate', 'title'],
        tableData: [],
        options: {
          headings: {
            createDate: 'Create Date',
            title: '제목'
          },
          filterable: false

        }
      }
    }
  }
</script>

<style>
  .newspaper-table thead th:nth-child(5){
    display: none;
  }


  .layer{ top:50%; left:40%;  height:100px; margin:0 auto;}
  table{
    border: 1px solid black;
    table-layout: fixed;
    width: 200px;
  }

  th, td {
    border: 1px solid black;
    width: 100px;
  }
  /*.centered { display: table; margin-left: auto; margin-right: auto; }*/

</style>

<!--[ 만들기능 ]-->
 <!-- - 등록-->
 <!-- - 수정-->
 <!-- - 삭제-->
 <!-- - 클릭하면 링크 이동 -->
 <!-- - 링크가 차일드에서 생성-->
 <!-- - 최신 등록일 부터 조회-->

<!--[ 리팩토링 해야할 것 ]-->

