<template>
  <div class="bg-f9">
    <div class="container pt20 pb20 pl30 pr30">
      <FormCreatItem
        :data="searchItem"
        :searchForm="searchForm"
        @resetFormData="resetFormData"
        @changeSearchValue="changeSearchValue"
        @getDataHand="getSearchList"
      >
      </FormCreatItem>
      <div class="operation">
        <div>
          <el-tabs
            v-model="activeName"
            type="card"
            class="demo-tabs"
            closable
            @tab-click="handleClick"
            @tab-remove="removeTab"
          >
            <el-tab-pane
              v-for="item in editableTabs"
              :key="item.name"
              :label="item.title"
              :name="item.name"
            >
              <div>
                <Table :data="list" :column="column" rowId="createTime" :lastColumn="false">
                  <template v-slot:level="{ row }">
                    <el-tag v-if="row.level === 1" type="primary">{{row.level}}1</el-tag>
                    <el-tag v-if="row.level === 2" type="success">{{row.level}}</el-tag>
                    <el-tag v-if="row.level === 3" type="info">{{row.level}}</el-tag>
                  </template>
                  <template v-slot:handle="{ row }">
                    <span style="cursor: pointer; color: #1890ff">修改</span>
                  </template>
                </Table>
                <Pagination
                  v-if="total"
                  :current-page.sync="pageNum"
                  :page-size.sync="pageSize"
                  :total="total * 1"
                  @getListHand="getListHand"
                />
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="settingbox">
          <el-button class="mr10" @click="addTab">+</el-button>
          <el-switch v-model="isDark" class="theme-btn" size="large" @change="toggleTheme">
            <template #active-action>
              <span class="custom-active-action">暗</span>
            </template>
            <template #inactive-action>
              <span class="custom-inactive-action c-333">亮</span>
            </template>
          </el-switch>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import FormCreatItem from '@/components/FormCreatItem.vue'
import ChangeFormValue from '@/mixins/ChangeFormVaule.vue'
import PageMixins from '@/mixins/PageMixins.vue'
import Table from '@/components/Table.vue'
import Pagination from '@/components/Pagination.vue'
export default defineComponent({
  components: {
    FormCreatItem,
    Table,
    Pagination,
  },
  mixins: [ChangeFormValue, PageMixins],
  data() {
    return {
      isDark: false,
      searchForm: {
        date: [],
      },
      column: Object.freeze([
        { label: '名称', prop: 'title', width: 220 },
        { label: '优先级', prop: 'level', width: 100, customScope: true, },
        { label: '开始时间', prop: 'startTime', width: 150, sortable: 'custom', orderSort:['descending','ascending', null]  },
        { label: '截止时间', prop: 'endTime', width: 150, sortable: 'custom', orderSort:['descending','ascending', null] },
        { label: '备注', prop: 'remark', width: 150, showOverflowTooltip: true },
        { label: '操作', prop: 'handle', customScope: true, width: 170 },
      ]),
      searchItem: [
        { label: '名称', prop: 'title', type: 'input' },
        {
          label: '优先级',
          prop: 'level',
          type: 'select',
          options: [
            { label: '一级任务', value: 1 },
            { label: '二级任务', value: 2 },
            { label: '三级任务', value: 3 },
          ],
        },
        { label: '开始时间', prop: 'startTime', type: 'date', placeholder: '开始时间' },
        { label: '截止时间', prop: 'endTime', type: 'date', placeholder: '截止时间' },
      ],
      activeName: '1',
      total: 1,
    }
  },
  created() {
    const theme = localStorage.getItem('todo-theme')
    if (theme === 'dark') {
      this.isDark = true
      document.documentElement.classList.add('dark-mode')
    }
  },
  computed: {
    editableTabs() {
      return (
        localStorage.getItem('editableTabs') || [
          {
            title: '生活',
            name: '1',
          },
          {
            title: '学习',
            name: '2',
          },
          {
            title: '工作',
            name: '3',
          },
        ]
      )
    },
    list() {
      return (
        localStorage.getItem('list' + this.activeName) || [
          {
            title: 'demo',
            level: 1,
            startTime: 'sbg',
            endTime: 'gs',
            remark: 'demoresfafasffsffsfsfsfmark',
          },
          {
            title: 'demo',
            level: 1,
            startTime: 'sbg',
            endTime: 'gs',
            remark: 'demoresfafasffsffsfsfsfmark',
          },
        ]
      )
    },
  },
  methods: {
    addTab(){
      // editableTabs.value.push({
      //   title: 'New Tab',
      //   name: newTabName,
      //   content: 'New Tab content',
      // })
      // editableTabsValue.value = newTabName
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    removeTab(targetName) {
      if (this.activeName === targetName) {
        this.editableTabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = this.editableTabs[index + 1] || this.editableTabs[index - 1]
            if (nextTab) {
              this.activeName = nextTab.name
            }
          }
        })
      }
      this.editableTabs = this.editableTabs.filter((tab) => tab.name !== targetName)
      localStorage.removeItem('list' + this.activeName)
    },
    toggleTheme(e) {
      this.isDark = e
      if (this.isDark) {
        document.documentElement.classList.add('dark-mode')
        localStorage.setItem('todo-theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark-mode')
        localStorage.setItem('todo-theme', 'light')
      }
    },
    getListHand() {
      let { date } = this.isSearch ? this.searchForm : this.oldSearchForm
      let params = {
        page: this.pageNum,
        pageSize: this.pageSize,
        ...date,
      }
      console.log(params)
    },
  },
})
</script>

<style scoped lang="scss">
//.bg-f9 {
//  background: #f9f9fb;
//}
.container {
  max-width: 1000px;
  width: 100%;
  margin: 30px auto;
  border: 1px solid #c9c9c9;
  border-radius: 5px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px 1px rgba(51, 51, 51, 0.2);
}
.operation {
  position: relative;
}
.settingbox{
  position: absolute;
  top: 0px;
  right: 0px;
}
.theme-btn {
  color: var(--text-color);
  background: none;
}
.icon-moon {
}
</style>
