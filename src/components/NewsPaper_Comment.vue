<template>
  <!--<div class='modal-mask'>-->
  <div v-bind:class="[showModal ? 'modal-mask': '']">

    <div class="modal-wrapper">
      <div class="modal-container">

        <div class="modal-header">
          <slot name="header">
            Comment를 남기자
          </slot>
        </div>

        <div class="modal-body">
          <slot name="body">
            <textArea rows="13" cols="35" @input='updateValue($event.target.value)'>{{modalDataNewsPaperComment.comment}}</textArea>
          </slot>

        </div>

        <div class="modal-footer">
          <slot name="footer">
            <button class="modal-default-button" @click="closeAction">
              닫어
            </button>
            <button class="modal-default-button" @click="updateComment">
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
    name: "newspaper_comment",
    props: ['showModal', 'closeAction','getList', 'modalDataNewsPaperComment'],
    created () {
      this.database = firebase.database()
      // this.textAreaComment = this.comment
    },
    data: function() {
      return {
        cal: new Date(),
        textAreaComment: ''
      }
    },
    methods: {
      updateValue (value) {
        this.textAreaComment = value.trim()
      },
      updateComment: function () {
        this.database = firebase.database()

        let getMonth = (this.cal.getMonth()+1).toString().length === 1 ? '0'+(this.cal.getMonth()+1).toString() : (this.cal.getMonth()+1).toString()
        // let key = this.cal.getFullYear().toString().substr(2,2)+getMonth+this.selectedDay

        let month = this.cal.getFullYear().toString().substr(2,2)+getMonth

        let url = 'newspaper/'+month+'/'+this.modalDataNewsPaperComment.date
        let query = this.database.ref(url)
        query.update({
          comment : this.textAreaComment

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
