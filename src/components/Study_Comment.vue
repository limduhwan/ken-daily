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
            <textArea rows="20" cols="45">{{comment}}</textArea>
          </slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <button class="modal-default-button" @click="closeAction">
              닫어
            </button>
            <button class="modal-default-button" @click="closeAction">
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
        name: "study_commnet",
        props: ['showModal', 'closeAction', 'comment', 'clickedCommentDate'],
        created () {
          this.database = firebase.database()
          let url = 'study/'+clickedCommentDate
          database.ref.child(url).update({
            "comment" : comment
          })
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
    width: 500px;
    height: 700px;
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
<!--&#45;&#45; 조회-->
<!--&#45;&#45; 수정-->
