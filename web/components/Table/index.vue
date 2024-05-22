<template>
    <div>
        <el-table
        v-loading="loading"
        ref="tableRef"
        style="width: 100%;min-height: 400px;margin-bottom: 20px;"
        @selection-change="onSelectionChange"
        @select-all="onSelectAll"
        v-bind="$attrs">
            <el-table-column
            v-for="item in columns"
            :showOverflowTooltip="item.tooltip"
            v-bind="item">
                <template v-if="item.slot || item.render" #default="{row, column, $index}">
                    <!-- <div v-if="!item.slot">{{ row[item.prop] }}</div> -->
                    <div v-if="item.render">
                        <div>{{ item.render(row, column, row[item.prop], $index) }}</div>
                    </div>
                    <div v-else>
                        <slot :row="row" :column="column" :index="$index" :name="item.prop"></slot>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div class="clearfix" style="margin-top: 20px;">
            <el-checkbox class="fl" v-if="selection && selection.showCheckAll" v-model="selection.checkAll" @change="onCheckAllChange">{{ selection.checkAllText || '全选' }}</el-checkbox>
            <el-pagination
            class="fr"
            v-if="pagination"
            v-model:current-page="pagination.currentPage"
            v-model:page-size="pagination.pageSize"
            :default-page-size="10"
            :page-sizes="pagination.pageSizes || [10, 20, 50, 100]"
            :background="pagination.background || true"
            :layout="pagination?.layout || 'total, sizes, prev, pager, next, jumper'"
            :total="pagination.totalRow || 0"
            @size-change="pagination?.sizeChange"
            @current-change="pagination?.currentChange"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TableColumnCtx, PaginationProps } from 'element-plus';
import type { ElTable } from 'element-plus'

interface Column<T> extends TableColumnCtx<T> {
    slot?: boolean
    tooltip?: boolean
    render?: TableColumnCtx<T>['formatter']
}
interface Pagination extends PaginationProps {
    currentPage: number;
    pageSize: number;
    totalRow: number;
    pageSizes: number[];
    sizeChange: (val: number) => void;
    currentChange: (val: number) => void;
}
interface Selection {
    checkAll: boolean;
    showCheckAll?: boolean;
    checkAllText: string;
    selectedRows: any[];
}
interface Props<T> extends /* @vue-ignore */ Partial<InstanceType<typeof ElTable>> {
    loading: boolean
    columns: Column<T>[]
    pagination?: Pagination
    selection?: Selection
}

const tableRef = ref<InstanceType<typeof ElTable>>();
const props = defineProps<Props<any>>();
// withDefaults(defineProps<Props<any>>, {
//     loading: false,
// })
const onCheckAllChange = (val) => {
    val && tableRef.value?.toggleAllSelection();
    !val && tableRef.value?.clearSelection();
}
const onSelectionChange = (val) => {
    if (props.selection) {
        props.selection.selectedRows = val
        console.log(val, 'val');
    }
}
const onSelectAll= (val) => {
    if (props.selection) {
        props.selection.checkAll = !!val.length;
    }
}
</script>

<style lang="scss" scoped>

</style>