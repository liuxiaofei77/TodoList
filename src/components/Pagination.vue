<template>
  <div class="pagination">
    <el-config-provider :locale="zhCn">
    <el-pagination
      background
      class="textCenter pt20 pb20 pagination"
      layout="total,prev, pager, next,sizes,jumper"
      :page-sizes="pageSizes"
      v-bind="$attrs"
      :pageSize="pageSize"
      :currentPage="currentPage"
      @size-change="sizeChange"
      @current-change="currentChange"/>
    </el-config-provider>
  </div>
</template>

<script>
  import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
  export default{
    props:{
      pageSize:{
        type:Number,
        default:10
      },
      currentPage:{
        type:Number,
        default:1
      },
      // tabs 栏目配置
      pageSizes:{
        type:Array,
        default:() => [10, 20, 30, 50]
      }
    },
    data(){
      return {
        zhCn
      }
    },
    methods:{
      getListHand(){
        this.$emit('getListHand')
      },
      sizeChange(page){
        this.$emit('update:pageSize',page)
        this.getListHand()
      },
      currentChange(page){
        this.$emit('update:currentPage',page)
        this.getListHand()
      }
    }
  }
</script>
