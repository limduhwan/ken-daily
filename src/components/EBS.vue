<template>
  <div>
    <div align="right">
      <button @click="btnAddClick" class="button">Add</button>
    </div>
    <div>
      <v-client-table @rowClick="testClick" :data="tableData" :columns="colums" :options="options">
        <div slot="title" slot-scope="props">
          <label @click="titleClick(props.row.id, props.row.comment)">{{props.row.title}}</label>
        </div>
      </v-client-table>
    </div>
    <EBSDetail
      v-if="showModalEBSDetail"
      :showModal="showModalEBSDetail"
      :closeAction="closeEBSDetailPopup"
      :objectEBSDetail="objectEBSDetail">

    </EBSDetail>
  </div>
</template>

<script>
  // FireBase Setting
  import firebase from 'firebase'
  import Firebase_Config from '../config/Firebase_Config'
  import ButtonCalendar from './com/ButtonCalendar'
  import { VueEditor } from 'vue2-editor'
  import EBSDetail from './EBS-Detail'

    export default {
      name: "EBS",
      components: {
        ButtonCalendar,
        EBSDetail,
        VueEditor
      },
      created: function (){
        this.getNewsPapersList(this.cal.getMonth()+1)
      },
      methods: {
        titleClick (id, comment) {
          console.log(id)
          this.objectEBSDetail.id = id
          this.showModalEBSDetail = true
        },
        btnAddClick () {
          console.log("btnAddClick")
          this.showModalEBSDetail = true
        },
        closeEBSDetailPopup () {
          this.showModalEBSDetail = false
        },
        getNewsPapersList (_month) {
          this.tableData = []

          this.database = firebase.database()

          let getMonth = _month.toString().length === 1 ? '0'+_month.toString(): _month

          // let month = this.cal.getFullYear().toString().substr(2,2)+getMonth

          let month = '1808'
          let query = this.database.ref('newspaper/' + month+'/')

          console.log(query)

          query.once("value")
            .then((snapshot)=>{
              snapshot.forEach( (childSnapShot) =>{
                 console.log('key', childSnapShot.key)
                console.log('val', childSnapShot.val())
                this.tableData.push(childSnapShot.val())
              })
            })
        }
      },
      data: function () {
        return {
          objectEBSDetail: {},
          showModalEBSDetail: false,
          content: '',
          currentMonth: (new Date().getMonth()+1),
          cal: new Date(),
          selectedYear: 2018,
          colums: ['id', 'title'],
          tableData: [],
          options: {
            headings: {
              id: 'Date',
              title: 'Title'
            },
            filterable: false

          }
        }
      }
    }
</script>

<style>
  .button {
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 5px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
  }
</style>
