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
        <Modal v-model="delModal" width="360">
          <p slot="header" style="color:#f60;text-align:center">
              <Icon type="information-circled"></Icon>
              <span>删除确认</span>
          </p>
          <div style="text-align:center;">
              <p style="font-size:18px">是否继续删除？</p>
          </div>
          <div slot="footer">
              <Button type="error" size="large" :loading="isLoading" @click="ok">确定</Button>
              <Button size="large"  @click="cancel">取消</Button>
          </div>
      </Modal>
    </div>
</template>
<script>
export default {
  data() {
    return {
      allUserInfo: [],
      delModal: false,
      showBorder: false,
      showStripe: false,
      showHeader: true,
      showIndex: true,
      showCheckbox: false,
      fixedHeader: false,
      tableSize: "default",
      isLoading: true,
      delId:''
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
    // 点击显示用户信息框
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

    // 点击删除按钮弹确认框
    remove(index) {
      this.delModal = true;
      this.delId = this.allUserInfo[index]._id;
    },

    //弹框确认按钮事件
    ok() {
      this.delModal = false;
      this.delUserInfo(this.delId);
    },

    //弹框取消事件
    cancel() {
      this.delId = '';
      this.delModal = false;
    },

    //获取所有用户信息
    getAllUserInfo() {
      this.$ajax
        .get("user/getAllUserInfo")
        .then(
          res => ((this.isLoading = false), (this.allUserInfo = res.data.data))
        );
    },

    // 删除用户信息
    delUserInfo(id) {
      this.$ajax
        .post("user/delUserInfo", { id: id })
        .then(res => {
          if (res.data.status) {
            this.$Message.success("删除成功！");
            this.getAllUserInfo();
          } else {
            this.$Message.error("删除失败！");
          }
        });
    },

  },
  created() {
    this.getAllUserInfo();
  }
};
</script>
