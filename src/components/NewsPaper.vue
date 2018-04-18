<template>
  <div>
    <div>
      <div style="float: left; width: 15%; padding: 3px 0px 3px 0px;">
        <select v-model="selectedYear">
          <option>2018</option>
          <option>2019</option>
        </select>
      </div>
      <button-calendar :currentMonth="currentMonth" :getNewsPaperList="getNewsPapersList"></button-calendar>
      <div style="float: right;"><button id="btnNewsPaper" @click="btnNewsPaperRegisterClick" class="fb7">Add</button></div>
    </div>
    <br>
    <div>
      <v-client-table :data="tableData" :columns="colums" :options="options">
        <div slot="child_row" slot-scope="props">
          {{props.row.content}}
        </div>
        <a slot="title" slot-scope="props" target="_blank" :href="props.row.link">
          {{props.row.title}}
        </a>
        <div slot="comment" slot-scope="props">
          <button @click="btnCommentClick(props.row.date, props.row.comment)">.</button>
        </div>
      </v-client-table>
    </div>
    <news-paper-comment
      v-if="showModalComment"
      :showModal="showModalComment"
      :closeAction="closeCommentPopup"
      :modalDataNewsPaperComment="ObjectModalDataNewsPaperComment"
    ></news-paper-comment>
    <news-paper-register
      v-if="showModalRegister"
      :showModal="showModalRegister"
      :closeAction="closeRegisterPopup"
      :modalDataNewsPaper="objectModalDataNewsPaper"
    ></news-paper-register>
    <!--<news-paper-register></news-paper-register>-->
  </div>
</template>

<script>
  // FireBase Setting
  import firebase from 'firebase'
  import Firebase_Config from '../config/Firebase_Config'

  import ButtonCalendar from './ButtonCalendar'
  import NewsPaperComment from './NewsPaper_Comment'
  import NewsPaperRegister from './NewsPaper_Register'
  import Utils from '../script/utils'

  export default {
    name: 'news-paper',
    components: {
      ButtonCalendar,
      NewsPaperComment,
      NewsPaperRegister
    },
    created: function (){
      // firebase.initializeApp(config)
      // this.showModalRegister = true;

      //공통함수로 빼자
      // console.log('Utils.getMonth', Utils.getMonth())

      this.getNewsPapersList()

      // console.log('tableDAta', this.tableData)
    },
    methods: {
      btnNewsPaperRegisterClick () {

        this.showModalRegister = true;
      },
      btnCommentClick: function(date, comment) {
        this.ObjectModalDataNewsPaperComment.ttt = 'ttt'
        this.ObjectModalDataNewsPaperComment.comment = comment
        this.ObjectModalDataNewsPaperComment.date = date
        this.showModalComment = true
      },
      closeCommentPopup () {
        this.showModalComment = false
      },
      closeRegisterPopup () {
        this.showModalRegister = false
      },
      getNewsPapersList () {

        this.tableData = []

        this.database = firebase.database()

        let getMonth = (this.cal.getMonth()+1).toString().length === 1 ? '0'+(this.cal.getMonth()+1).toString() : (this.cal.getMonth()+1).toString()

        let month = this.cal.getFullYear().toString().substr(2,2)+getMonth

        let query = this.database.ref('newspaper/' + month+'/')

        let tempResult

        query.once("value")
          .then((snapshot)=>{

            snapshot.forEach( (childSnapShot) =>{
              // console.log('key', childSnapShot.key)
              // console.log('val', childSnapShot.val())
              this.tableData.push(childSnapShot.val())
            })
          })
      }
    },
    data: function () {
      return {
        currentMonth: (new Date().getMonth()+1),
        cal: new Date(),
        showModalComment: false,
        showModalRegister: false,
        objectModalDataNewsPaper: {},
        ObjectModalDataNewsPaperComment: {},
        selectedYear: 2018,
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

  /* Image Button */
  .fb7 {
    background: #EBE3CD;
    vertical-align:middle;
    border: 1px solid #969184;
  }

</style>
