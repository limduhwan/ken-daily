<template>
  <select v-model="selectedMonth" @change="getNewsEBSlist(selectedMonth)">
    <option v-for="month in months" >
      {{month}}
    </option>
  </select>
</template>

<script>
    export default {
      name: "selectBoxMonth",
      props: ['getNewsEBSlist'],
      data: function(){
        return{
          selectedMonth: new Date().getMonth()+1,
          months: 12,
        }
      }
    }
</script>

<style scoped>

</style>
