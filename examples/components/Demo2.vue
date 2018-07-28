<template>
  <div class="demo-page">
    <header>
      <h1>Demo 2</h1>
    </header>

    <section v-for="(item, index) in form"
             :key="index">
      <header>
        <h2 style="margin-top: 40px;">
          <i class="el-icon-goods"></i> 表单 {{ index + 1 }}：
        </h2>
      </header>
      <el-form ref="form"
               :model="item"
               label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="item.name"></el-input>
        </el-form-item>
        <el-form-item label="即时配送">
          <el-switch v-model="item.delivery"></el-switch>
        </el-form-item>
      </el-form>
    </section>

    <el-button type="primary"
               @click="handleAdd">新增</el-button>
  </div>
</template>

<script>
export default {
  name: "Demo2",

  autoStorage: ["form", "form2", "form3"],

  data() {
    return {
      form: [{ name: "", delivery: false }]
    };
  },

  methods: {
    handleAdd() {
      this.form.push({ name: "", delivery: false });
    }
  },

  beforeCreate() {},

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
