<template>
  <div>
    <div style="float: left; width: 35%; padding: 3px 3px 3px 3px;">
      <select-box-year class="selectBox"></select-box-year>
    </div>
    <div style="float: left; width: 30%; padding: 3px 3px 3px 3px;">
      <select-box-month class="selectBox"></select-box-month>
    </div>
    <div style="float: left; width: 30%; padding: 3px 3px 3px 3px;">
      <select class="selectBox" v-model="selectedDay" @change="getVOCAContents()">
        <option v-for="day in getLastDay" >
          {{day}}
        </option>
      </select>
    </div>
    <div>
      <v-client-table @rowClick="testClick" :data="tableData" :columns="colums" :options="options">
        <div slot="delete" slot-scope="props">
          <button @click="btnDelClick(props.row.id)">Del</button>
        </div>
      </v-client-table>
    </div>
  </div>
</template>

<script>
  // FireBase Setting
  import firebase from 'firebase'
  import Firebase_Config from '../config/Firebase_Config'

  import { VueEditor } from 'vue2-editor'
  import SelectBoxDay from './com/selectBoxDay'
  import SelectBoxMonth from './com/selectBoxMonth'
  import SelectBoxYear from './com/selectBoxYear'

    export default {
      name: "Voca",
      components: {
        SelectBoxMonth,
        SelectBoxYear,
        SelectBoxDay,
        VueEditor
      },
      mounted: function() {
        console.log("mount")

        this.tableData = []

        this.database = firebase.database()

        let year = this.cal.getFullYear().toString()
        let month = (this.cal.getMonth()+1).toString().length === 1 ? '0'+(this.cal.getMonth()+1).toString(): (this.cal.getMonth()+1).toString()
        let day = (this.cal.getDate()).toString().length === 1 ? "0"+(this.cal.getDate()).toString() : this.cal.getDate()

        console.log(year)
        console.log(month)
        console.log(day)

        // let query = this.database.ref('voca/' + '2018'+'/'+'08'+'/'+'27')
        let query = this.database.ref('voca/' + year+'/'+month+'/'+day)

        console.log(query)

        query.once("value")
          .then((snapshot)=>{
            snapshot.forEach( (childSnapShot) =>{
              console.log('key', childSnapShot.key)
              console.log('val', childSnapShot.val())
              this.tableData.push(childSnapShot.val())
            })
          })
      },
      computed: {
        getLastDay : function(){
          let lastDay = ( new Date( this.cal.getFullYear(), this.cal.getMonth()+1, 0) ).getDate();
          return lastDay
        }
      },
      methods: {
        btnDelClick (id) {
          console.log('id   '+id)
        },
        getVOCAContents () {
          console.log("getVOCAContents")
          console.log(this.selectedDay)
          this.tableData = []

          this.database = firebase.database()

          let year = this.cal.getFullYear().toString()
          let month = (this.cal.getMonth()+1).toString().length === 1 ? '0'+(this.cal.getMonth()+1).toString(): (this.cal.getMonth()+1).toString()
          let day = this.selectedDay.toString().length === 1 ? "0"+this.selectedDay.toString() : this.selectedDay

          console.log(year)
          console.log(month)
          console.log(day)

          // let query = this.database.ref('voca/' + '2018'+'/'+'08'+'/'+'27')
          let query = this.database.ref('voca/' + year+'/'+month+'/'+day)

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
          cal: new Date(),
          // day: '',
          selectedDay: new Date().getDate(),
          colums: ['word', 'delete'],
          tableData: [],
          options: {
            headings: {
              word: 'Word',
              delete: 'Del'
            },
            filterable: false,
            //pagination: { chunk:0, dropdown:false },
            perPageValues: [100],

          }
        }
      }
    }
</script>

<style scoped>
  #editor {
    /*height: 2px;px*/
    height: 100%;
  }

  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    /*width: 400px;*/
    height: 100%;
    margin: 0px auto;
    /*padding: 20px 30px;*/
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-header {
    color: #42b983;
  }

  .modal-body {
    height: 10px;
  }

  /*
   * The following styles are auto-applied to elements with
   * transition="modal" when their visibility is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by editing
   * these styles.
   */

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .selectBox {
    background-color: #6c757d;
    border: none;
    color: white;
    padding: 5px 40px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    font-weight: bold;
  }

  .btnsave {
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
    font-weight: bold;
  }

  .btnclose {
    background-color: #ffc107;
    border: none;
    color: white;
    padding: 5px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    font-weight: bold;
  }

  .btnadd {
    background-color: #007bff;
    border: none;
    color: white;
    padding: 3px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 2px 2px;
    cursor: pointer;
    font-weight: bold;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);

  }

  .title {
    width: 370px;
    border: 1px solid green;
  }
</style>



