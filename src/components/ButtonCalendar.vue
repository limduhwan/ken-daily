<template>
  <div style="float: left; width: 75%; padding: 3px 0px 3px 0px;">
    <button v-for="month in months" @click="btnMonthClick" :class="[month===currentMonth ? 'button' : '' ]">{{month}}</button>
  </div>
</template>

<script>
  export default {
    name: 'button-calendar',
    props: ['currentMonth'],
    created () {
      let cal = new Date()
      console.log('this.currentMonth', this.currentMonth)
      // console.log('cal get full year', cal.getFullYear())
      // console.log('cal get month', cal.getMonth()+1)
      // console.log('cal get iso string', cal.toISOString())
    },
    methods:{
      btnMonthClick: function(event){
        console.log(event.target.textContent)
      }
    },
    data: function(){
      return{
        months: 12,
        // btnMonthData: (new Date().getMonth()+1).toString()
        btnMonthData: ''
      }
    }
  }
</script>

<style scoped>
  .button {
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 15px 15x;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 18px;
  }
</style>
