<!--创建表单-->
<template>
  <div class="searchWrap textCenter pt15">
    <div class="searchBox">
      <el-row type="flex" align="middle" class="flexBox">
        <el-col
          v-for="(inItem, inIndex) in data"
          :key="`in${inIndex}`"
          :span="6"
          class="pl10 pr10 mb10"
        >
          <el-row type="flex" align="middle">
            <el-col
              v-if="inItem.label"
              :span="8"
            >
              <span class="fs14 label">{{ inItem.label }}：</span>
            </el-col>
            <el-col :span="16">
              <el-input
                v-if="inItem.type === 'input'"
                type="text"
                :placeholder="inItem.placeholder || `请输入${inItem.label}`"
                :value="searchForm[inItem.prop]"
                @input="$emit('changeSearchValue', $event, inItem.prop)"
              >
              </el-input>
              <el-select
                v-if="inItem.type === 'select'"
                :value="searchForm[inItem.prop]"
                @input="$emit('changeSearchValue', $event, inItem.prop)"
                :placeholder="inItem.placeholder || `请选择${inItem.label}`"
                class="select"
                :options="inItem.options"
                :popper-class="inItem.isPopper ? 'select-down' : ''"
              >
                <!-- 加popper-class属性，重写select样式，处理选项文字过长导致下拉框被撑开的问题 -->
                <el-option
                  v-for="(sItem, sIndex) in inItem.options"
                  :key="`sI${sIndex}`"
                  :label="sItem.label"
                  :value="sItem.value"
                >
                </el-option>
              </el-select>
              <template v-if="inItem.type === 'date'">
                <el-config-provider :locale="zhCn">
                <el-date-picker
                  v-model="searchForm[inItem.prop]"
                  @change="$emit('changeSearchValue', $event, inItem.prop)"
                  type="datetime"
                  format="YYYY-MM-DD HH:mm:ss"
                  :value-format="'timestamp'"
                  :placeholder="inItem.placeholder"
                />
                </el-config-provider>
              </template>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <slot name="btns">
      <div class="textCenter pt10 btnWrap">
        <el-button
          @click="$emit('getDataHand')"
          type="primary"
          class="btns searchBtn"
          >查询</el-button
        >
        <el-button @click="$emit('resetFormData')" class="btns">重置</el-button>
      </div>
    </slot>
  </div>
</template>

<script>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
export default {
  props: {
    data: {
      // 表单配置数据
      type: Array,
      required: true
    },
    searchForm: {
      // 绑定的对象
      type: Object,
      required: true
    },
  },
  data() {
    return {
      value1:'',
      zhCn
    };
  },

  methods: {

  }
};
</script>

<style scoped lang="scss">
.searchWrap{

}
.searchBox {
  max-height: 145px;
  overflow: hidden;
  transition: max-height 0.5s;
}
.flexBox {
  flex-wrap: wrap;
}

.btns {
  min-width: 100px;
  height: 40px;
  &:not(:last-child) {
    margin-right: 20px;
  }
}
::v-deep .select.el-select .el-input,
.select {
  width: 100%;
}
::v-deep .el-select .el-input {
  width: 130px;
}

::v-deep .el-date-editor.el-input,::v-deep .el-date-editor.el-input__inner {
  width: 100%;
}
.el-select-dropdown.el-popper.select-down {
  width: 16.5% !important;
}
</style>


