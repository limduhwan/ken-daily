<template>
    <div>
      <v-client-table @rowClick="testClick" :data="tableData" :columns="colums" :options="options">
        <div slot="delete" slot-scope="props">
          <button @click="btnDelClick(props.row.id)">Del</button>
        </div>
      </v-client-table>
    </div>
</template>

<script>
  // FireBase Setting
  import firebase from 'firebase'
  import Firebase_Config from '../config/Firebase_Config'

    export default {
      name: "Voca",
      mounted: function() {
        console.log("mount")

        this.tableData = []

        this.database = firebase.database()

        // let getMonth = _month.toString().length === 1 ? '0'+_month.toString(): _month

        // let month = this.cal.getFullYear().toString().substr(2,2)+getMonth

        // let month = '1808'
        // let query = this.database.ref('voca/' + year +'/')
        let query = this.database.ref('voca/' + '2018'+'/'+'08'+'/'+'16')


        query.once("value")
          .then((snapshot)=>{
            snapshot.forEach( (childSnapShot) =>{
              console.log('key', childSnapShot.key)
              console.log('val', childSnapShot.val())
              this.tableData.push(childSnapShot.val())
            })
          })
      },
      methods: {
        btnDelClick (id) {
          console.log('id   '+id)
        }
      },
      data: function () {
        return {
          colums: ['word', 'delete'],
          tableData: [],
          options: {
            headings: {
              word: 'Word',
              delete: 'Del'
            },
            filterable: false

          }
        }
      }
    }
</script>

<style scoped>

</style>
