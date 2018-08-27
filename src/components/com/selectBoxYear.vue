<template>
  <select v-model="selectedYear">
    <option>2018</option>
    <option>2019</option>
  </select>
</template>

<script>
  export default {
    name: "selectBoxYear",
    data: function(){
      return{
        selectedYear: new Date().getFullYear(),
      }
    }
  }
</script>

<style scoped>

</style>
