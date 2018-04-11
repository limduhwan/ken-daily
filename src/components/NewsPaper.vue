<template>
  <div>
    <div>
      <div class="centered">
        <select v-model="selected">
          <option>2018</option>
          <option>2019</option>
        </select>
        <br>
        <button-calendar></button-calendar>
      </div>
      <div><button id="btnNewsPaper" @click="btnNewsPaperClick">추가</button></div>
    </div>
    <br>
    <div>
      <v-client-table :data="tableData" :columns="colums" :options="options">
        <div slot="child_row" slot-scope="props">
          The Content is here {{props.row.content}}
        </div>
        <a slot="title" slot-scope="props" target="_blank" :href="props.row.link">
          {{props.row.title}}
        </a>
        <div slot="comment" slot-scope="props">
          <button @click="btnCommentClick(props.row.date, props.row.comment)">.</button>
        </div>
        <!--<div slot="studyyn" slot-scope="props">-->
          <!--<select v-model="props.row.studyyn">-->
            <!--<option>Y</option>-->
            <!--<option>N</option>-->
          <!--</select>-->
        <!--</div>-->
      </v-client-table>
    </div>
    <news-paper-comment></news-paper-comment>
  </div>
</template>

<script>
  // Initialize Firebase
  // var config = {
  //   apiKey: "AIzaSyCDi2lA_VDjijGtojpxokaUkHRimcUXc0k",
  //   authDomain: "ken-daily.firebaseapp.com",
  //   databaseURL: "https://ken-daily.firebaseio.com",
  //   projectId: "ken-daily",
  //   storageBucket: "ken-daily.appspot.com",
  //   messagingSenderId: "15528160711"
  // }

  // FireBase Setting
  import firebase from 'firebase'
  import Firebase_Config from '../config/Firebase_Config'

  import ButtonCalendar from './ButtonCalendar'
  import NewsPaperComment from './NewsPaper_Comment'

  export default {
    name: 'news-paper',
    components: {
      ButtonCalendar,
      NewsPaperComment
    },
    created: function (){
      // firebase.initializeApp(config)

      this.database = firebase.database()

      let query = this.database.ref('newspaper/')

      let tempResult

      query.once("value")
        .then((snapshot)=>{
          // console.log(childSnapshot.key)
          // console.log(snapshot.val())

          snapshot.forEach( (childSnapShot) =>{
            // console.log('key', childSnapShot.key)
            // console.log('val', childSnapShot.val())
            this.tableData.push(childSnapShot.val())
          })
        })

      // console.log('tableDAta', this.tableData)
    },
    methods: {
      btnNewsPaperClick: function() {

      },
      btnCommentClick: function(date, comment) {
        // alert(date)
        this.showModal = true
        this.comment = comment
        this.clickedCommentDate = date
        console.log(this.clickedCommentDate)
      }
    },
    data: function () {
      return {
        selected: 2018,
        colums: ['date', 'title', 'comment'],
        tableData: [],
        options: {
          headings: {
            date: '날짜',
            link: '링크',
            title: '제목',
            studyyn: '여부',
            comment: ''
          },
          filterable: false

        }
      }
    }
  }
</script>

<style>
  /*#news-paper {*/
    /*width: 95%;*/
    /*margin: 0 auto;*/
  /*}*/

  th:nth-child(3) {
    text-align: center;
  }

  .VueTables__child-row-toggler {
    width: 16px;
    height: 16px;
    line-height: 16px;
    display: block;
    margin: auto;
    text-align: center;
  }

  .VueTables__child-row-toggler--closed::before {
    content: "+";
  }

  .VueTables__child-row-toggler--open::before {
    content: "-";
  }

</style>

<!--<script src="https://www.gstatic.com/firebasejs/4.12.1/firebase.js"></script>-->
<!--<script>-->


<!--</script>-->

<!--[ 만들기능 ]-->
 <!-- - 등록-->
 <!-- - 수정-->
 <!-- - 삭제-->
 <!-- - 클릭하면 링크 이동 -->
 <!-- - 링크가 차일드에서 생성-->
 <!-- - 최신 등록일 부터 조회-->

<!--[ 리팩토링 해야할 것 ]-->

