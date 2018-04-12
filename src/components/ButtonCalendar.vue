<template>
  <div class="centered">
    <button class="button">1</button>
    <button class="button">2</button>
    <button class="button">3</button>
    <button class="button">4</button>
    <button class="button">5</button>
    <button class="button">6</button>
    <button class="button">7</button>
    <button class="button">8</button>
    <button class="button">9</button>
    <button class="button">10</button>
    <button class="button">11</button>
    <button class="button">12</button>
  </div>
</template>

<script>
  export default {
    name: 'button-calendar',
    created () {
      let cal = new Date()
      console.log('cal get full year', cal.getFullYear())
      console.log('cal get month', cal.getMonth()+1)
      console.log('cal get iso string', cal.toISOString())
    }
  }
</script>

<style scoped>
  .button {
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 10px 10x;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 9px;
  }
</style>

<!--[ 만들기능 ]-->
 <!-- - 현재달이면 색상 달리하고 자동 Select-->

<!--[ 리팩토링 해야할 것 ]-->
 <!-- - 버튼 동적 생성-->
