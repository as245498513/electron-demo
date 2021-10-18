<template>
  <div>
    <el-row>
      <h3>1. 表格 demo，数据可通过 axios 调用接口获取</h3>
      <el-table
          :border="true"
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%;"
          @selection-change="handleSelectionChange">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            label="日期"
            width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            width="120">
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址"
            show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>
    </el-row>
    <el-row>
      <h3>2. 创建文件 demo</h3>
      <el-input v-model="dir" placeholder="请输入要创建的目录"></el-input>
      <el-button @click="createDir()">创建</el-button>
    </el-row>
    <el-row>
      <h3>3. Capture One 21 选中热文件夹 demo</h3>
      <el-input v-model="hot_dir" placeholder="请输入要选择的的目录"></el-input>
      <el-button @click="selectDir()">选择</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      dir: '',
      hot_dir: '',
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      }],
      multipleSelection: [],
    };
  },

  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 创建目录 demo
    createDir() {
      const fs = require('fs');
      if (fs.existsSync(this.dir)) {
        this.$notify.error('目录已存在！');
        return;
      }

      fs.mkdirSync(this.dir);
      this.$notify.success('创建目录成功！');
    },
    selectDir() {
      const { execSync } = require('child_process');
      const script = `
      tell application "Capture One 21"
\tactivate
\ttell application "System Events"
\t\ttell process "Capture One 21"
\t\t\tclick menu item 3 of menu "相机" of menu bar 1
\t\tend tell
\tend tell
\tactivate
\ttell application "System Events"
\t\tkey code 5 using {shift down, command down}
\t\tkeystroke "${this.hot_dir}"
\t\tkeystroke return
\t\tdelay 1
\t\tkeystroke return
\tend tell
end tell`;
      const output = execSync(`osascript -e '${script}'`);
      console.log(output);
    },
  },
};
</script>
