const routers = [
    {
        path: '/',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },{
        path: '/login',
        meta: {
            title: '登录'
        },
        component: (resolve) => require(['./views/login/login.vue'], resolve)
    },
    {
        path: '/userList',
        meta: {
            title: '用户列表'
        },
        component: (resolve) => require(['./views/main/userList.vue'], resolve)
    }



];
export default routers;