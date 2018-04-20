<template>
  <!--<div class='modal-mask'>-->
  <div v-bind:class="[showModal ? 'modal-mask': '']">

    <div class="modal-wrapper">
      <div class="modal-container">

        <div class="modal-header">
          <slot name="header">
            저장을 하자
            <select v-model="selectedDay">
              <option v-for="day in getLastDay" >
                {{day}}
              </option>
            </select>
          </slot>
        </div>

        <div class="modal-body">
          <slot name="body">
            Title <input type="text" width="100%" v-model="title"><br>
            Link <input tpye="text" v-model="link"><br>
          Content <textArea rows="13" cols="35" @input="updateValue($event.target.value)"></textArea>
          </slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <button class="modal-default-button" @click="closeAction">
              닫어
            </button>
            <button class="modal-default-button" @click="saveRegister">
              저장
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // FireBase Setting
  import firebase from 'firebase'
  import Firebase_Config from '../config/Firebase_Config'

  export default {
    name: 'newspaper_register',
    props: ['showModal', 'closeAction', 'modalDataNewsPaper'],
    data : function() {
      return {
        cal: new Date(),
        selectedDay: new Date().getDate(),
        title: '',
        textAreaComment: '',
        link: ''
      }
    },
    computed: {
      getLastDay : function(){
        let lastDay = ( new Date( this.cal.getFullYear(), this.cal.getMonth()+1, 0) ).getDate();
        return lastDay
      }

    },
    methods: {
      updateValue (value) {
        this.textAreaComment = value.trim()
      },
      saveRegister : function(){
        this.database = firebase.database()

        let getMonth = (this.cal.getMonth()+1).toString().length === 1 ? '0'+(this.cal.getMonth()+1).toString() : (this.cal.getMonth()+1).toString()
        let key = this.cal.getFullYear().toString().substr(2,2)+getMonth+this.selectedDay

        let month = this.cal.getFullYear().toString().substr(2,2)+getMonth
        this.database.ref('newspaper/' + month+'/'+key).set({
          content : this.textAreaComment,
          title : this.title,
          link : this.link,

          month : getMonth,
          id : key,
          study : 'N',
          comment : ''
        })
      }
    }
  }
</script>

<style scoped>
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
    width: 400px;
    height: 600px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }

  .modal-body {
    margin: 10px 0;
  }

  .modal-default-button {
    float: right;
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

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
