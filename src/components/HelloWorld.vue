<template>
  <div id="app">
    <h1>My Calendar</h1>
    <calendar-view></calendar-view>
  </div>
</template>
<script>
  import CalendarView from "vue-simple-calendar"
  // The next two lines are processed by webpack. If you're using the component without webpack compilation,
  // you should just create <link> elements for these as you would normally for CSS files. Both of these
  // CSS files are optional, you can create your own theme if you prefer.
  // require("vue-simple-calendar/dist/static/css/default.css")
  // require("vue-simple-calendar/dist/static/css/holidays-us.css")

  export default {
    name: 'app',
    data: function() {
      return { showDate: new Date() }
    },
    components: {
      CalendarView
    },
    methods: {
      setShowDate(d) {
        this.showDate = d;
      },
    }
  }
</script>
<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #2c3e50;
    height: 67vh;
    width: 90vw;
    margin-left: auto;
    margin-right: auto;
  }
</style>
