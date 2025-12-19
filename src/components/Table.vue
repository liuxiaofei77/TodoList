<template>
  <div class="warp">
    <div class="mt10">
      <el-table
        :stripe="stripe"
        tooltip-effect="dark"
        v-bind="$attrs"
        :row-style="{backgroundColor: backgroundColor, color: color}"
        :header-cell-style="{backgroundColor: tableHeaderCellStyle}"
        :row-key="rowId"
      >
<!--        <el-table-column v-if="index" label="序号" align="center" type="index" width="55">-->
<!--        </el-table-column>-->
<!--        <el-table-column v-if="selection" type="selection" align="center" width="55" :reserve-selection="reserveSelection">-->
<!--        </el-table-column>-->
        <template v-for="item in column">
          <!-- eslint-disable-next-line -->
          <el-table-column v-if="item.customScope" align="center" v-bind="item" :show-overflow-tooltip="item.showOverflowTooltip" :render-header="item.renderH" :sort-orders="item.orderSort||['ascending', 'descending', null]">
            <template #header>
              <template v-if="item.label">
                 {{item.label}}
              </template>
            </template>
            <template #default="scope">
              <slot :name="item.prop" v-bind="scope" :item="item" />
            </template>
          </el-table-column>
          <!-- eslint-disable-next-line -->
          <el-table-column v-else align="center" v-bind="item" :sort-orders="item.orderSort||['ascending', 'descending', null]">
            <template #header>
              <template v-if="item.label">
                <template v-if="!item.label.includes(',')">{{
                  item.label
                }}</template>
                <template v-else>
                  <div
                    v-for="(sItem, sIndex) in item.label.split(',')"
                    :key="sIndex"
                    class="tableTitle"
                  >
                    {{ sItem }}
                  </div>
                </template>
              </template>
            </template>
          </el-table-column>
        </template>
        <el-table-column
          align="center"
          label="操作"
          prop="handle"
          v-if="lastColumn"
          :width="lastColumnWidth"
        >
          <template #default="scope">
            <slot v-bind="scope">-</slot>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
// prop描述:
//  list:要渲染得数据
//  column:要渲染的数据
//	例:{label:"状态",prop:'status',formatter:(r,c,status)=>{}),...} / {label:"状态",prop:'status',customScope:true,...}
//  lastColumn:是否需要最后操作一栏
export default {
  props: {
    selection: {
      type: Boolean,
      default: false
    },
    index: {
      type: Boolean,
      default: false
    },
    column: {
      type: Array,
      required: true
    },
    lastColumn: {
      type: Boolean,
      default: true
    },
    lastColumnWidth: {
      type: Number
    },
    stripe: {
      type: Boolean,
      default: true
    },
    fixed: {
      type: String,
      defalut: "-"
    },
    // 表格背景颜色
    backgroundColor: {
      type: String,
      default:'#fff'
    },
    color: {
      type: String,
      default: '#606266'
    },
    tableHeaderCellStyle: {
      type: String,
      defalut: ''
    },
    // reserveSelection: {
    //   type: Boolean,
    //   defalut: false
    // },
    rowId: {
      type: String,
      defalut: 'id'
    }
  },
  methods: {

  }
};
</script>
<style lang="scss" scoped="scoped">
.warp {
 ::v-deep .el-table__expand-icon {
    display: none;
  }

 ::v-deep .el-table__expanded-cell {
    padding: 7px 20px;
    background: #f1f1f1;
  }

 ::v-deep .el-table__header-wrapper .el-table__header th,
 ::v-deep .el-table th {
    background: rgba(28, 154, 191, 0.05);
  }

 ::v-deep .el-table--striped .el-table__body tr.el-table__row--striped td {
    background: rgba(28, 154, 191, 0.05);
  }

 ::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td {
    // background-color: #f5f7fa !important;
  }

 ::v-deep .el-table__header-wrapper .el-table__header th {
    background: rgba(28, 154, 191, 0.05);
  }
}
</style>

<style>
.el-tooltip__popper {
  max-width: 20% !important;
}
</style>
