<template>
  <div>
    <div style="float: left; width: 22%; padding: 3px 3px 3px 3px;">
      <select-box-year class="selectBox"></select-box-year>
    </div>
    <div style="float: left; width: 30%; padding: 3px 3px 3px 3px;">
      <select-box-month class="selectBox" :getNewsEBSlist="getNewsEBSlist"></select-box-month>
    </div>
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

  import ButtonCalendar from './com/selectBoxDay'
  import { VueEditor } from 'vue2-editor'
  import EBSDetail from './EBS-Detail'
  import SelectBoxMonth from './com/selectBoxMonth'
  import SelectBoxYear from './com/selectBoxYear'

    export default {
      name: "EBS",
      components: {
        SelectBoxMonth,
        SelectBoxYear,
        ButtonCalendar,
        EBSDetail,
        VueEditor
      },
      created: function (){

        // this.getNewsPapersList(this.cal.getMonth()+1)
        this.getNewsEBSlist(this.cal.getMonth()+1)
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
          this.objectEBSDetail.id = ''
          this.showModalEBSDetail = false
        },
        getNewsEBSlist (month) {
          // console.log("month    "+month)
          // console.log(selectedYears)
          // console.log(this.selectedMonths)

          this.tableData = []

          this.database = firebase.database()

          let getMonth = month.toString().length === 1 ? '0'+month.toString(): month

          let yearMonth = '18'+getMonth
          let query = this.database.ref('newspaper/' + yearMonth+'/')

          // console.log(query)

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
          objectEBSDetail: {},
          showModalEBSDetail: false,
          content: '',
          currentMonth: (new Date().getMonth()+1),
          cal: new Date(),
          selectedYears: '',
          selectedMonths: '',
          colums: ['id', 'title'],
          tableData: [],
          options: {
            headings: {
              id: 'Date',
              title: 'Title'
            },
            filterable: false,
            //pagination: { chunk:0, dropdown:false },
            perPageValues: [100],
            // pagination: { dropdown:false },
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


  .selectBox {
    background-color: #007bff;
    border: none;
    color: white;
    padding: 5px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    font-weight: bold;
  }
</style>
