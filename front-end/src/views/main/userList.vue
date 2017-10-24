<template>
    <div style="margin: 10px">
        显示边框 <i-switch v-model="showBorder" style="margin-right: 5px"></i-switch>
        显示斑马纹 <i-switch v-model="showStripe" style="margin-right: 5px"></i-switch>
        显示索引 <i-switch v-model="showIndex" style="margin-right: 5px"></i-switch>
        显示多选框 <i-switch v-model="showCheckbox" style="margin-right: 5px"></i-switch>
        显示表头 <i-switch v-model="showHeader" style="margin-right: 5px"></i-switch>
        表格滚动 <i-switch v-model="fixedHeader" style="margin-right: 5px"></i-switch>
        <br>
        <br>
        表格尺寸
        <Radio-group v-model="tableSize" type="button">
            <Radio label="large">大</Radio>
            <Radio label="default">中</Radio>
            <Radio label="small">小</Radio>
        </Radio-group>
        <Table :border="showBorder" :stripe="showStripe" :show-header="showHeader" :height="fixedHeader ? 'calc(100% - 25px)' : ''" :size="tableSize" :data="allUserInfo" :columns="tableColumns3" :loading="isLoading"></Table>
    </div>
</template>
<script>
export default {
  data() {
    return {
      allUserInfo: [],
      showBorder: false,
      showStripe: false,
      showHeader: true,
      showIndex: true,
      showCheckbox: false,
      fixedHeader: false,
      tableSize: "default",
      isLoading: true
    };
  },
  computed: {
    tableColumns3() {
      let columns = [];
      if (this.showCheckbox) {
        columns.push({
          type: "selection",
          width: 60,
          align: "center"
        });
      }
      if (this.showIndex) {
        columns.push({
          type: "index",
          width: 60,
          align: "center"
        });
      }
      columns.push({
        title: "Id",
        key: "_id"
      });
      columns.push({
        title: "用户名",
        key: "loginname"
      });
      columns.push({
        title: "密码",
        key: "password"
      });
      columns.push({
        title: "昵称",
        key: "username"
      });
      columns.push({
        title: "年龄",
        key: "age",
        sortable: true,
        filters: [
          {
            label: "大于25岁",
            value: 1
          },
          {
            label: "小于25岁",
            value: 2
          }
        ],
        filterMultiple: false,
        filterMethod(value, row) {
          if (value === 1) {
            return row.age > 25;
          } else if (value === 2) {
            return row.age < 25;
          }
        }
      });
      columns.push({
        title: "性别",
        key: "sex"
      });
      columns.push({
        title: "出生日期",
        key: "birthDay",
        sortable: true
      });
      columns.push({
        title: "操作",
        key: "action",
        width: 150,
        align: "center",
        render: (h, params) => {
          return h("div", [
            h(
              "Button",
              {
                props: {
                  type: "primary",
                  size: "small"
                },
                style: {
                  marginRight: "5px"
                },
                on: {
                  click: () => {
                    this.show(params.index);
                  }
                }
              },
              "查看"
            ),
            h(
              "Button",
              {
                props: {
                  type: "error",
                  size: "small"
                },
                on: {
                  click: () => {
                    this.remove(params.index);
                  }
                }
              },
              "删除"
            )
          ]);
        }
      });
      return columns;
    }
  },
  methods: {
    ok() {
      this.$Message.info("点击了确定");
    },
    cancel() {
      this.$Message.info("点击了取消");
    },
    getAllUserInfo() {
      this.$ajax
        .get("user/getAllUserInfo")
        .then(
          res => ((this.isLoading = false), (this.allUserInfo = res.data.data))
        );
    },
    show(index) {
      this.$Modal.info({
        title: "用户信息",
        content: `用户名${this.allUserInfo[index].loginname}<br>密码：${this
          .allUserInfo[index].password}<br>昵称：${this.allUserInfo[index]
          .username}
          <br>出生日期：${this.allUserInfo[index].birthDay}<br>性别：${this.allUserInfo[
          index
        ].sex}`
      });
    },
    remove(index) {
      this.$ajax
        .post("user/delUserInfo", { id: this.allUserInfo[index]._id })
        .then(res => {
          if (res.data.status) {
            this.$Message.success("删除成功！");
            this.getAllUserInfo();
          } else {
            this.$Message.error("删除失败！");
          }
        });
    }
  },
  created() {
    this.getAllUserInfo();
  }
};
</script>
