<template>
<div>
  <div style="float: right">
  <Button>등록</Button>
  </div>
    <div>
    <v-client-table :data="tableData" :columns="colums" :options="options">
      <div slot="child_row" slot-scope="props">
        {{props.row.VocaExplain}}
      </div>
      <a slot="Voca" slot-scope="props" target="_blank" :href="props.row.link">
        {{props.row.VocaLink}}
      </a>
      <div slot="Del" slot-scope="props">
        <button @click="btnDelClick(props.row.seq)">.</button>
      </div>
    </v-client-table>
  </div>
</div>
</template>

<script>
    export default {
        name: "Voca",
        data: function (){
          return {
            tableData: [],
            colums: ['Category', 'Voca', 'Del'],
            options:{
              filterable: false
            }
          }
        }
    }
</script>

<style scoped>

</style>
