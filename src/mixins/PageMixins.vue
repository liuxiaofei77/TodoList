/**
* 翻页方法
*/
<template>
  <div></div>
</template>
<script>
  export default {
    data () {
      return {
        pageNum: 1, // 当前页码
        pageSize: 10,
        total: 0
      }
    },
    methods: {
      resetPage () {
        this.pageNum = 1
        this.total = 0
      },
      // 设置total和一些边缘处理
      setTotalHandle (data, type, callback) {
        this.total = +(data.data.total)
        if (this.total && !data.data[type].length) {
          this.pageNum = this.pageNum - 1
          this.getListHand()
        } else {
          callback()
        }
      },
    }
  }
</script>
