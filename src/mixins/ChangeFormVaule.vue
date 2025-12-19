/**
* 表单搜索改变value公用方法
* 因为搜索框都是双向数据绑定所以确定用新的搜索条件还是旧的，使用isSearch来判断
*/
<template>
  <div></div>
</template>

<script>
  import lodash from 'lodash'

  export default {
    data () {
      return {
        isSearch: false, // true说明点击了查询
        oldSearchForm: {},
      }
    },
    created () {
      // 备份
      this.oldSearchForm = lodash.cloneDeep(this.searchForm)
    },
    methods: {
      //点击查询按钮
      getSearchList () {
        console.log(this.searchItem)
        // 把判断是否数字
        if (this.searchItem) {
          for (let i = 0; i < this.searchItem.length; i++) {
            const item = this.searchItem[i]
            console.log(this.searchForm[item.prop])
            if (item.type === 'date') {
              if (this.searchForm[item.prop] && this.searchForm[item.prop].length) {
                if (this.searchForm[item.prop][0]) this.searchForm[item.key ? item.key[0] : 'start'] = this.searchForm[item.prop][0] /1000
              } else {
                delete this.searchForm[item.prop]
              }
            }
          }
        }
        // 只有点击查询的时候才使用新搜索条件，所以要备份一次旧的搜索条件
        this.oldSearchForm = lodash.cloneDeep(this.searchForm)

        this.isSearch = true
        this.resetPage()
        this.getListHand()
        this.setFormChange()
      },
      // 修改搜索值
      changeSearchValue (value, type) {
        this.searchForm[type] = value
      },
      // 重置表单
      resetFormData (data = 'searchForm') {
        const tmpDataArr = Object.entries(this[data])
        for (let value of tmpDataArr) {
          if (typeof value[1] === 'object' && value[1] !== null) {
            if (Array.isArray(value[1])) {
              this.$set(this[data], [value[0]], [])
            } else {
              this.$set(this[data], [value[0]], {})
            }
          } else {
            this.$delete(this[data], [value[0]])
          }
        }
      },
      // 把使用新搜索条件关闭
      setFormChange () {
        this.isSearch = false
      }
    }
  }
</script>
