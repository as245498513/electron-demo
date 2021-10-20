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
      <h3>3. Capture One 20 选择文件夹 demo</h3>
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
      const script = `tell application "Capture One 20"
\tactivate
end tell

tell application "System Events"
\ttell process "Capture One 20"
\t\t-- 遍历查找对应的 window
\t\tglobal win
\t\tset win to 0
\t\trepeat with w in windows
\t\t\tif exists of radio button 2 of radio group 1 of w then
\t\t\t\tset win to w
\t\t\tend if
\t\tend repeat
\t\t
\t\tif win = 0 then
\t\t\tdisplay notification "无法获取有效窗口" with title "AppleScript错误"
\t\t\treturn
\t\tend if
\t\t
\t\t-- 点击相机图标
\t\tclick radio button 2 of radio group 1 of win
\t\tdelay 0.1
\t\t
\t\tglobal destination
\t\tset destination to 0
\t\t
\t\t-- 遍历检查 group 里面是否有 scroll area 2 -> "NextCaptureLocation" -> "目的地"
\t\trepeat with g in every group of win
\t\t\t
\t\t\t-- 遍历每一个 scroll area，找到包含 "NextCaptureLocation" 的那一个，最终找到 destination
\t\t\trepeat with sa in every scroll area of g
\t\t\t\tif exists of group "NextCaptureLocation" of sa then
\t\t\t\t\tset nextCaptureLocation to group "NextCaptureLocation" of sa
\t\t\t\t\t
\t\t\t\t\t-- 中文版
\t\t\t\t\tif exists of group "目的地" of nextCaptureLocation then
\t\t\t\t\t\tset destination to group "目的地" of nextCaptureLocation
\t\t\t\t\tend if
\t\t\t\t\t
\t\t\t\t\t-- 英文版
\t\t\t\t\tif exists of group "Destination" of nextCaptureLocation then
\t\t\t\t\t\tset destination to group "Destination" of nextCaptureLocation
\t\t\t\t\tend if
\t\t\t\tend if
\t\t\tend repeat
\t\t\t
\t\tend repeat
\t\t
\t\t-- 判断 destination 是否获取到，没有获取到则提示并退出 applescript
\t\tif destination = 0 then
\t\t\tdisplay notification "无法获取目标元素 Destination" with title "AppleScript错误"
\t\t\treturn
\t\tend if
\t\t
\t\t-- 点击选择文件夹，并设置为自定义的文件夹
\t\tclick pop up button 1 of destination
\t\tclick menu item -1 of menu 1 of pop up button 1 of destination
\t\tdelay 1
\t\t-- Finder 里面 shift + command + G 可以自己手动输入路径
\t\tkey code 5 using {shift down, command down}
\t\tdelay 1
\t\t-- 清空弹出文本域的内容
\t\tkey code 0 using {command down} -- command + A
\t\tkey code 51 -- 51 对应回车键
\t\tdelay 1
\t\t-- 输入自定义的路径
\t\tset the clipboard to "${this.hot_dir}"
\t\t--\t\tkeystroke "/tmp"
\t\t-- 输入法会影响，所以使用粘贴的方式
\t\tkey code 9 using {command down} -- command + v
\t\tdelay 1
\t\tkeystroke return
\t\tdelay 1
\t\tkeystroke return
\t\t
\tend tell
end tell`;
      execSync(`osascript -e '${script}'`);
    },
  },
};
</script>
