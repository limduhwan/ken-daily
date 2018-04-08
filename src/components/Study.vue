<template>
  <div>
    <v-client-table :data="tableData" :columns="columns">
      <div slot="child_row" slot-scope="props">
        {{props.row.content}}
      </div>
      <a slot="title" slot-scope="props" target="_blank" :href="props.row.url">{{props.row.title}}</a>
    </v-client-table>
  </div>
</template>

<script>
  // FireBase Setting
  import firebase from 'firebase'
  import Firebase_Config from '../config/Firebase_Config'

  export default {
      name: "study",
      created: function() {
        this.database = firebase.database()

        let query = this.database.ref('study/')

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
      data: function() {
          return {
            columns: ['date', 'title', 'record'],
            tableData: [],
            options: {
              headings: {
                date:'Date',
                title: '제목',
                record: '녹음'
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
