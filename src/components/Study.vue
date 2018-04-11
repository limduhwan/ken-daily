<template>
  <div>
    <v-client-table :data="tableData" :columns="columns">
      <div slot="child_row" slot-scope="props">
        {{props.row.content}}
      </div>
      <a slot="title" slot-scope="props" target="_blank" :href="props.row.url">{{props.row.title}}</a>
      <div slot="comment" slot-scope="props">
        <button @click="btnCommentClick(props.row.date, props.row.comment)">코멘트</button>
      </div>
    </v-client-table>
    <!--<study-comment v-if="showModal" :showModal="showModal" :closeAction="closeCommentPopup"></study-comment>-->
    <study-comment v-if="showModal"
                   :showModal="showModal"
                   :closeAction="closeCommentPopup"
                   :comment="comment"
                   :clickedCommentDate="clickedCommentDate"
                   :getList="getList"
    >
    </study-comment>
  </div>
</template>

<script>
  // FireBase Setting
  import firebase from 'firebase'
  import Firebase_Config from '../config/Firebase_Config'
  import StudyComment from './Study_Comment'

  export default {
      name: "study",
      components:{
        StudyComment
      },
      mounted: function() {
        this.getList()
      },
      data: function() {
          return {
            showModal: false,
            clickedCommentDate: '',
            columns: ['date', 'title', 'comment'],
            tableData: [],
            options: {
              headings: {
                date:'Date',
                title: '제목',
                comment: '코멘트'
              },
              filterable: false
            }
          }
      },
      methods: {
        getList () {
          console.log('getList')
          this.database = firebase.database()

          let query = this.database.ref('study/').orderByKey();

          let tempResult

          query.once("value")
            .then((snapshot)=>{
              // console.log(childSnapshot.key)
              console.log(snapshot.val())

              snapshot.forEach( (childSnapShot) =>{
                console.log('key', childSnapShot.key)
                console.log('val', childSnapShot.val())
                this.tableData.push(childSnapShot.val())
              })
            })
        },
        btnCommentClick: function(date, comment) {
          // alert(date)
          this.showModal = true
          this.comment = comment
          this.clickedCommentDate = date
          console.log(this.clickedCommentDate)
        },
        closeCommentPopup () {
          console.log('closeCommentPopu[')
          this.showModal = false
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
