<template>
  <div class="demo-page">
    <header>
      <h1>Demo 1</h1>
    </header>

    <h2>
      <i class="el-icon-goods"></i>
      表单一：
    </h2>
    <el-form ref="form"
             :model="form"
             label-width="80px">
      <el-form-item label="活动区域">
        <el-select v-model="form.region"
                   placeholder="请选择活动区域">
          <el-option label="区域一"
                     value="shanghai"></el-option>
          <el-option label="区域二"
                     value="beijing"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="即时配送">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>

      <el-form-item label="活动性质">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="美食/餐厅线上活动"
                       name="type"></el-checkbox>
          <el-checkbox label="地推活动"
                       name="type"></el-checkbox>
          <el-checkbox label="线下主题活动"
                       name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光"
                       name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="特殊资源">
        <el-radio-group v-model="form.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   @click="handleClearCurrent">清空当前表单缓存</el-button>
        <el-button type="warning"
                   @click="handleClearAll">清空所有缓存</el-button>
      </el-form-item>
    </el-form>

    <h2 style="margin-top: 40px;">
      <i class="el-icon-goods"></i>
      表单二：
    </h2>
    <el-form label-width="80px">
      <el-form-item label="活动名称">
        <el-input v-model="deepObj.form"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Demo1",

  autoStorage: ["form", "deepObj.form"],

  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },

      deepObj: { form: "" }
    };
  },

  methods: {
    handleClearCurrent() {
      this.$autoStorage.clear("form");
    },

    handleClearAll() {
      this.$autoStorage.clear();
    }
  },

  created() {
    // console.log(this);
  },

  beforeDestroy() {}
};
</script>

<style>
.el-checkbox + .el-checkbox {
  margin-left: 0;
}

.el-checkbox:not(:last-child) {
  margin-right: 30px;
}
</style>
