<template>
  <el-container id="app">
    <el-header height="auto">
      <h1 class="header">
        Vue Auto Storage

        <a class="star"
           href="https://github.com/zh-rocco/vue-auto-storage"
           target="_blank"
           title="Github">
          <svg height="32"
               class="icon-github"
               viewBox="0 0 16 16"
               version="1.1"
               width="32"
               aria-hidden="true">
            <path fill-rule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
          </svg>
        </a>
      </h1>
    </el-header>
    <el-main>

      <el-row :gutter="40">
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
        <h3>Just fill in the two forms above and click the button below.</h3>
      </el-row>

      <el-row class="mt-l center">
        <el-button type="primary"
                   @click="handleReload">Reload Page</el-button>
        <el-button @click="handleClearCurrent">Reload Page (with clearing storage)</el-button>
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
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },

      form: {
        name: "",
        region: "",
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
      location.reload();
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
  width: 1200px;
  margin: 0 auto;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.center {
  text-align: center;
}

.mt-l {
  margin-top: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.star {
  font-size: 0;
}

.icon-github {
  fill: #2c3e50;
  transition: opacity 0.3s;
}

.icon-github:hover {
  opacity: 0.9;
}

.el-form {
  padding: 10px;
  border-radius: 2px;
  background-color: #f9f9f9;
}

.el-checkbox {
  margin-left: 0 !important;
  margin-right: 30px;
}
</style>
