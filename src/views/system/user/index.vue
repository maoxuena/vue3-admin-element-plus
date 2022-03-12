<template>
  <div class="user-manage-container">
    <el-card class="header">
      <el-button type="primary" @click="onImportExcelClick">
        {{ $t('msg.excel.importExcel') }}
      </el-button>
      <el-button type="success" @click="onToExcelClick">
        {{ $t('msg.excel.exportExcel') }}
      </el-button>
    </el-card>
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <!-- 索引 -->
        <el-table-column label="#" type="index" />
        <!-- 姓名 -->
        <el-table-column
          prop="username"
          width="120"
          :label="$t('msg.excel.name')"
        >
        </el-table-column>
        <!-- 手机号 -->
        <el-table-column
          prop="mobile"
          width="120"
          :label="$t('msg.excel.mobile')"
        >
        </el-table-column>
        <!-- 头像 -->
        <el-table-column
          width="80"
          :label="$t('msg.excel.avatar')"
          align="center"
        >
          <template v-slot="{ row }">
            <el-image
              class="avatar"
              :src="row.avatar"
              :preview-src-list="[row.avatar]"
            ></el-image>
          </template>
        </el-table-column>
        <!-- 角色 -->
        <el-table-column :label="$t('msg.excel.role')">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="item in row.role" :key="item.id">
                {{ item.title }}
              </el-tag>
            </div>
            <div v-else>
              <el-tag>{{ $t('msg.excel.defaultRole') }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <!-- 开通时间 -->
        <el-table-column width="120" :label="$t('msg.excel.openTime')">
          <template #default="{ row }">
            {{ $filters.dateFilter(row.openTime) }}
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column
          :label="$t('msg.excel.action')"
          fixed="right"
          width="200"
        >
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              @click="onShowClick(row._id)"
            >
              {{ $t('msg.excel.show') }}
            </el-button>
            <el-button type="info" size="small" @click="onShowRoleClick(row)">
              {{ $t('msg.excel.showRole') }}
            </el-button>
            <el-button type="danger" size="small" @click="onRemoveClick(row)">
              {{ $t('msg.excel.remove') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
    <!-- 导入 -->
    <import-dialog
      v-model="importToExcelVisible"
      @updateUser="getListData"
    ></import-dialog>
    <!-- 导出 -->
    <export-dialog v-model="exportToExcelVisible"></export-dialog>
    <!-- 配置角色 -->
    <roles-dialog
      v-model="roleDialogVisible"
      :userId="selectUserId"
      @updateRole="getListData"
    ></roles-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18n'
import { getUserManageList, deleteUser } from '@/api/user-manage'
import ImportDialog from './components/ImportDialog'
import ExportDialog from './components/ExportDialog'
import RolesDialog from './components/RolesDialog.vue'

// 数据相关
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(10)
// 获取数据的方法
const getListData = async () => {
  const result = await getUserManageList({
    page: page.value,
    size: size.value
  })
  tableData.value = result.list
  total.value = result.total
}
getListData()

// 监听语言切换
watchSwitchLang(getListData)
// 重新激活页面后，重新加载数据
// onActivated(getListData)

// 分页相关
/**
 * size 改变触发
 */
const handleSizeChange = currentSize => {
  size.value = currentSize
  getListData()
}

/**
 * 页码改变触发
 */
const handleCurrentChange = currentPage => {
  page.value = currentPage
  getListData()
}

/**
 * excel 导入点击事件
 */
const importToExcelVisible = ref(false)
const onImportExcelClick = () => {
  importToExcelVisible.value = true
}

/**
 * excel 导出点击事件
 */
const exportToExcelVisible = ref(false)
const onToExcelClick = () => {
  exportToExcelVisible.value = true
}

const router = useRouter()
/**
 * 查看按钮点击事件
 */
const onShowClick = id => {
  router.push(`/system/user/info/${id}`)
}

/**
 * 查看角色的点击事件
 */
const selectUserId = ref('')
const roleDialogVisible = ref(false)
const onShowRoleClick = row => {
  selectUserId.value = row._id
  roleDialogVisible.value = true
}

// 保证每次打开重新获取用户角色数据
watch(roleDialogVisible, val => {
  if (!val) selectUserId.value = ''
})

/**
 * 删除按钮点击事件
 */
const i18n = useI18n()
const onRemoveClick = row => {
  ElMessageBox.confirm(
    i18n.t('msg.excel.dialogTitle1') +
    row.username +
    i18n.t('msg.excel.dialogTitle2'),
    {
      type: 'warning'
    }
  ).then(async () => {
    await deleteUser(row._id)
    ElMessage.success(i18n.t('msg.excel.removeSuccess'))
    // 重新渲染数据
    getListData()
  })
}
</script>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }
  :deep(.avatar) {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  :deep(.el-tag) {
    margin-right: 6px;
  }

  .pagination {
    display: flex;
    margin-top: 20px;
    flex-direction: row-reverse;
  }
}
</style>
