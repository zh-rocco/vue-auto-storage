<template>
  <el-container class="container">
    <el-header height="auto">
      <h1>
        Vue Auto Storage

        <a class="star"
           href="https://github.com/zh-rocco/vue-auto-storage"
           target="_blank"
           title="Go to Star">
          <i class="el-icon-star-on"
             style="float: right;"></i>
        </a>
      </h1>
    </el-header>
    <el-main>
      <!-- <router-view id="app"></router-view> -->

      <el-row :gutter="20">
        <el-col :span="12">
          <el-row class="center">
            <h2>Persistent Form</h2>
          </el-row>
          <el-form ref="persistentForm"
                   :model="persistentForm"
                   label-width="130px"
                   label-suffix=" :">
            <el-form-item label="Activity name">
              <el-input v-model="persistentForm.name"></el-input>
            </el-form-item>
            <el-form-item label="Activity zone">
              <el-select v-model="persistentForm.region"
                         placeholder="please select your zone">
                <el-option label="Zone one"
                           value="shanghai"></el-option>
                <el-option label="Zone two"
                           value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Activity time">
              <el-col :span="11">
                <el-date-picker type="date"
                                placeholder="Pick a date"
                                v-model="persistentForm.date1"
                                style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line"
                      :span="2">-</el-col>
              <el-col :span="11">
                <el-time-picker type="fixed-time"
                                placeholder="Pick a time"
                                v-model="persistentForm.date2"
                                style="width: 100%;"></el-time-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="Instant delivery">
              <el-switch v-model="persistentForm.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="Activity type">
              <el-checkbox-group v-model="persistentForm.type">
                <el-checkbox label="Online activities"
                             name="type"></el-checkbox>
                <el-checkbox label="Promotion activities"
                             name="type"></el-checkbox>
                <el-checkbox label="Offline activities"
                             name="type"></el-checkbox>
                <el-checkbox label="Simple brand exposure"
                             name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="Resources">
              <el-radio-group v-model="persistentForm.resource">
                <el-radio label="Sponsor"></el-radio>
                <el-radio label="Venue"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="Activity form">
              <el-input type="textarea"
                        v-model="persistentForm.desc"></el-input>
            </el-form-item>
          </el-form>
        </el-col>

        <el-col :span="12">
          <el-row class="center">
            <h2>Normal Form</h2>
          </el-row>
          <el-form ref="form"
                   :model="form"
                   label-width="130px"
                   label-suffix=" :">
            <el-form-item label="Activity name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="Activity zone">
              <el-select v-model="form.region"
                         placeholder="please select your zone">
                <el-option label="Zone one"
                           value="shanghai"></el-option>
                <el-option label="Zone two"
                           value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Activity time">
              <el-col :span="11">
                <el-date-picker type="date"
                                placeholder="Pick a date"
                                v-model="form.date1"
                                style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line"
                      :span="2">-</el-col>
              <el-col :span="11">
                <el-time-picker type="fixed-time"
                                placeholder="Pick a time"
                                v-model="form.date2"
                                style="width: 100%;"></el-time-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="Instant delivery">
              <el-switch v-model="form.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="Activity type">
              <el-checkbox-group v-model="form.type">
                <el-checkbox label="Online activities"
                             name="type"></el-checkbox>
                <el-checkbox label="Promotion activities"
                             name="type"></el-checkbox>
                <el-checkbox label="Offline activities"
                             name="type"></el-checkbox>
                <el-checkbox label="Simple brand exposure"
                             name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="Resources">
              <el-radio-group v-model="form.resource">
                <el-radio label="Sponsor"></el-radio>
                <el-radio label="Venue"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="Activity form">
              <el-input type="textarea"
                        v-model="form.desc"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <el-row class="mt-l center">
        <el-button type="primary"
                   @click="handleReload">Test Persistence (Reload Page)</el-button>
        <el-button @click="handleClearCurrent">Clear Stroage</el-button>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "App",

  autoStorage: ["persistentForm"],

  data() {
    return {
      persistentForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },

      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },

  methods: {
    handleClearCurrent() {
      this.$autoStorage.clear("persistentForm");
    },

    handleReload() {
      location.reload();
    }
  }
};
</script>

<style>
body {
  margin: 0;
}

#app {
  width: 460px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.container {
  width: 1200px;
  margin: 0 auto;
}

.center {
  text-align: center;
}

.mt-l {
  margin-top: 20px;
}

.star {
  color: #606266;
  transition: color 0.3s;
}

.star:hover {
  color: #409eff;
}

.el-checkbox {
  margin-left: 0 !important;
  margin-right: 30px;
}
</style>
