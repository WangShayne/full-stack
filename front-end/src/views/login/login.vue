<style scoped>
    .login {
        width: 300px;
        min-height:300px; 
        margin:auto;
        position: absolute;  
        top: 50%; 
        left: 50%;   
        transform: translate(-50%,-50%);  
        text-align: center;
    }
    .ivu-menu-item{
        width:50%;
        margin-bottom: 24px;
        font-size:16px;
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
            <FormItem prop="name">
                <Input v-model="signUp.name" placeholder="姓名"></Input>
            </FormItem>
            <FormItem prop="nick">
                <Input v-model="signUp.nick" placeholder="用户名"></Input>
            </FormItem>
            <FormItem prop="password">
                <Input v-model="signUp.password" placeholder="密码"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('signUp')">提交</Button>
                <Button type="ghost" @click="handleReset('signUp')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
        <Form ref="signIn" :model="signIn" :rules="signInRule" v-show="activeName=='2'">
            <FormItem prop="nick">
                <Input v-model="signIn.nick" placeholder="用户名"></Input>
            </FormItem>
            <FormItem prop="password">
                <Input v-model="signIn.password" placeholder="密码"></Input>
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
        data () {
            return {
                activeName:'1',
                signUp: {
                    name: '',
                    nick: '',
                    password: ''
                },
                signUpRule:{
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    nick: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' },
                        { type: 'string',max:12, message: '最长12位', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                        { type: 'string',max:6, message: '最长6位', trigger: 'blur' }
                    ],
                },
                signIn: {
                    nick: '',
                    password: ''
                },
                signInRule:{
                    nick: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            menuChange(name){
                let v = this;
                v.activeName = name;
            },
            handleSubmit (name) {
                var v = this;
                v.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                        //ajax 提交
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
                
            },
            handleReset (name) {
                var v = this;
                v.$refs[name].resetFields();
            }
        }
    }
</script>