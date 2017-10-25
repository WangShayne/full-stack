<style scoped>
.login {
  width: 300px;
  min-height: 300px;
  margin: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.ivu-menu-item {
  width: 50%;
  margin-bottom: 24px;
  font-size: 16px;
}
</style>
<template>
    <div class="login">
        <!-- <Tabs value="signUp">
            <TabPane label="登录" name="signUp">登录</TabPane>
            <TabPane label="注册" name="signIn">注册</TabPane>
        </Tabs> -->
        <Menu mode="horizontal" theme="light" active-name="1" @on-select="menuChange">
            <MenuItem name="1">
                注册
            </MenuItem>
            <MenuItem name="2">
                登录
            </MenuItem>
        </Menu>
        <Form ref="signUp" :model="signUp" :rules="signUpRule" v-show="activeName=='1'">
            <FormItem prop="loginname">
                <Input v-model="signUp.loginname" placeholder="用户名"></Input>
            </FormItem>
            <FormItem prop="password">
                <Input v-model="signUp.password" placeholder="密码"></Input>
            </FormItem>
            <FormItem prop="username">
                <Input v-model="signUp.username" placeholder="昵称"></Input>
            </FormItem>
            <FormItem prop="birthDate">
                <DatePicker v-model="signUp.birthDate" type="date" placeholder="出生日期" format="yyyy-MM-dd" @on-change="dateFormat($event)" style="width:100%"></DatePicker>
            </FormItem>              
            <FormItem prop="sex">
                <RadioGroup v-model="signUp.sex">
                    <Radio label="1">男</Radio>
                    <Radio label="0">女</Radio>
                </RadioGroup>
            </FormItem>
         
            <FormItem>
                <Button type="primary" @click="handleSubmit('signUp')">提交</Button>
                <Button type="ghost" @click="handleReset('signUp')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
        <Form ref="signIn" :model="signIn" :rules="signInRule" v-show="activeName=='2'">
            <FormItem prop="loginname">
                <Input v-model="signIn.loginname" placeholder="用户名"></Input>
            </FormItem>
            <FormItem prop="password">
                <Input v-model="signIn.password" type="password" placeholder="密码"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('signIn')">提交</Button>
                <Button type="ghost" @click="handleReset('signIn')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "1",
      isLoading: true,
      signUp: {
        loginname: "",
        password: "",
        username: "",
        sex: "",
        birthDate: "",
        birthDay: ""
      },
      signUpRule: {
        loginname: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          {
            type: "string",
            min: 6,
            max: 18,
            message: "最小6位，最长18位",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            type: "string",
            min: 6,
            max: 12,
            message: "最小6位最长12位",
            trigger: "blur"
          }
        ],
        username: [
          { required: true, message: "昵称不能为空", trigger: "blur" },
          {
            type: "string",
            min: 2,
            max: 12,
            message: "最小2位，最长12位",
            trigger: "blur"
          }
        ],
        birthDate: [
          // { required: true, message: '出生日期未选择', trigger: 'blur' },
          { type: "date", message: "日期为空", trigger: "blur" }
        ],
        sex: [
          { required: true, message: "性别未选择", trigger: "blur" },
          { type: "string", trigger: "blur" }
        ]
      },
      signIn: {
        loginname: "",
        password: ""
      },
      signInRule: {
        loginname: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    menuChange(name) {
      let v = this;
      v.activeName = name;
    },
    handleSubmit(name) {
      var v = this;
      v.$refs[name].validate(valid => { 
        if (valid) {
          this.registerLogin();
          //ajax 提交
        } else {
          this.$Message.error("表单验证失败!");
        }
      });
    },
    handleReset(name) {
      var v = this;
      v.$refs[name].resetFields();
    },
    dateFormat(e) {
      this.signUp.birthDay = e;
    },
    registerLogin() {
      let con = {
        loginname: this.signUp.loginname,
        password: this.signUp.password,
        username: this.signUp.username,
        birthDay: this.signUp.birthDay,
        sex: this.signUp.sex
      };
      this.$ajax
        .get("user/existLoginName", { params: { loginname: con.loginname } })
        .then(res => {
          if (res.data) {
            return this.$ajax.post("user/registerUser", con);
          } else {
            this.$Message.error("用户名重复！");
          }
        })
        .then(res => {
          if (res != undefined) {
            if (res.data.status == true) {
              this.handleReset('signUp');
              this.$Message.success("注册成功！");
            } else {
              this.$Message.error("注册失败！");
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>