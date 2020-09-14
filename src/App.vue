<template>
  <HelloWorld :msg="teamName +'Team VACs'" />
  <ul>
    <li v-for="user in vacsData" :key="user._id">
      <div>
        {{ user.icon }} {{user.name}}
        <br />
        <div class="calendar">
          <!--PAST YEAR DISABLED CHECKBOXES -->
          <div v-for="n in 2" v-bind:key="n">
            <input :title="n" disabled type="checkbox" />
          </div>
          <!-- ACTIVE YEAR -->
          <div v-for="(item, index) in daylist" v-bind:key="index">
            <input
              :title="item"
              type="checkbox"
              :value="index"
              v-model="checkedDays"
              @change="check($event)"
            />
          </div>
          <!--NEXT YEAR DISABLED CHECKBOXES -->
          <div v-for="n in 3" v-bind:key="n">
            <input :title="n" disabled type="checkbox" />
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  data() {
    return {
      teamName: "MyAwesomeGuys",
      checkedDays: [],
      daylist: [],
      vacsData: null,
    };
  },
  mounted() {
    //init calendar:
    var getDaysArray = function (start, end) {
      for (
        var arr = [], dt = new Date(start); //new Date+365??? like GH
        dt <= end;
        dt.setDate(dt.getDate() + 1)
      ) {
        arr.push(new Date(dt));
      }
      return arr;
    };
    this.daylist = getDaysArray(
      new Date("2020-01-01"),
      new Date("2020-12-31")
    ).map((v) => v.toString().slice(0, 10));
    //this.daylist = this.daylist.map((v) => v.toString().slice(0, 10)).join(",");
    //fetch data:
    axios
      .get("http://localhost:8082/api/v1/vacs")
      .then((response) => (this.vacsData = response.data));
  },
  methods: {
    check: function () {
      console.log(this.checkedCategories);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.calendar {
  display: block;
  column-count: 54;
  margin: 0px;
  padding: 0px;
  width: 1080px;
}
input[type="checkbox"] {
  height: 20px;
  width: 20px;
  display: block;
  margin: 0px;
  padding: 0px;
  background-color: aquamarine;
}

input[type="checkbox"] :hover {
  background-color: aquamarine;
}
</style>
