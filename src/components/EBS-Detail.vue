<template>
  <div v-bind:class="[showModal ? 'modal-mask': '']">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <select class="selectBox" v-model="selectedDay" @change="getEBSContents">
            <option v-for="day in getLastDay" >
              {{day}}
            </option>
          </select>
          <button class="btnclose" @click="closeAction">
            닫어
          </button>
          <button class="btnsave" @click="save">
            저장
          </button>
        </div>
        <div class="modal-body">
          <div>
            <input style="float: left; width: 60%; padding: 3px 3px 3px 3px;" class="title" v-model="title" placeholder="title here">
            <input style="float: left; width: 20%; padding: 3px 3px 3px 3px;" class="title" v-model="voca" placeholder="voca here">
            <button style="float: left; width: 18%; padding: 3px 3px 3px 3px;" class="btnadd" @click="saveVoca">Add</button>
          </div>
          <div><vue-editor id="editor1" v-model="content"></vue-editor></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // FireBase Setting
  import firebase from 'firebase'
  import Firebase_Config from '../config/Firebase_Config'
  import { VueEditor } from 'vue2-editor'

  export default {
    name: "EBS-Detail",
    props: ['showModal', 'closeAction', 'objectEBSDetail'],
    components: {
      VueEditor
    },
    created () {
      console.log("id////  "+this.objectEBSDetail.id)
      if(this.objectEBSDetail.id !='') {
        this.getEBSContents(this.objectEBSDetail.id)
        this.selectedMonth = id.substr(0,4)
        this.selectedDay = id.substr(4,2).substr(0,1) === '0' ? id.substr(4,2).substr(1,1) : id.substr(4,2)

      }
    },
    computed: {
      getLastDay : function(){
        let lastDay = ( new Date( this.cal.getFullYear(), this.cal.getMonth()+1, 0) ).getDate();
        return lastDay
      }
    },
    methods: {
      save : function(){
        // console.log("save")
        this.database = firebase.database()

        let getMonth = (this.cal.getMonth()+1).toString().length === 1 ? '0'+(this.cal.getMonth()+1).toString() : (this.cal.getMonth()+1).toString()

        let days = (this.selectedDay).toString().length === 1 ? "0"+(this.selectedDay).toString() : this.selectedDay

        let key = this.cal.getFullYear().toString().substr(2,2)+getMonth+days

        let month = this.cal.getFullYear().toString().substr(2,2)+getMonth

        // console.log('newspaper/' + month+'/'+key)
        // console.log(this.content)
        this.database.ref('newspaper/' + month+'/'+key).set({
          content : this.content,
          title : this.title,
          month : getMonth,
          id : key,
        })
      },
      saveVoca: function() {
        console.log("saveVoca")
        this.database = firebase.database()

        let year = this.cal.getFullYear()
        let getMonth = (this.cal.getMonth()+1).toString().length === 1 ? '0'+(this.cal.getMonth()+1).toString() : (this.cal.getMonth()+1).toString()
        let day = (this.selectedDay).toString().length === 1 ? "0"+(this.selectedDay).toString() : this.selectedDay
        let timestamp = new Date().getHours().toString()+new Date().getMinutes().toString()+new Date().getSeconds().toString()

        // console.log(timestamp)
        this.database.ref('voca/' + year+'/'+ getMonth + '/' + day +'/'+ timestamp).set({
          id : timestamp,
          word : this.voca,
        })

        this.voca = ""
      },
      getEBSContents (id) {
        console.log("get EBS Contents/////"+ id)
        this.database = firebase.database()

        let key = id

        let month = id.substr(0,4)

        this.selectedDay = id.substr(4,2).substr(0,1) === '0' ? id.substr(4,2).substr(1,1) : id.substr(4,2)

        let query = this.database.ref('newspaper/' + month+'/'+key)
        query.once("value")
          .then((snapshot)=>{
            snapshot.forEach( (childSnapShot) =>{
              // console.log('key', childSnapShot.key)
              // console.log('val', childSnapShot.val())
              switch(childSnapShot.key) {
                case "content":
                  this.content = childSnapShot.val()
                  break;
                case "title":
                  this.title = childSnapShot.val()
                  break;
              }
            })
          })
      }
    },

    data() {
      return {
        title: '',
        voca:'',
        content: '',
        cal: new Date(),
        selectedDay: new Date().getDate(),
        selectedMonth:'',

      }
    }
  }
</script>
<style scoped>
  #editorHeight {
    height: 350px;
    /*height: 100%;*/
  }

  #editor1, #editor2 {
    height: 350px;
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
    padding: 5px 32px;
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


