<style scoped>
.layout {
  background: #f5f7f9;
  position: relative;
  overflow: hidden;
  height: 100%;
}
.layout > div {
  height: 100%;
}

.layout-breadcrumb {
  padding: 10px 15px 0;
}
.layout-content {
  height: calc(100% - 121px);
  margin: 15px;
  box-sizing: border-box;
  overflow: hidden;
  background: #fff;
  border-radius: 4px;
}
.layout-content-main {
  padding: 10px;
}
.layout-copy {
  text-align: center;
  padding: 10px 0 20px;
  color: #9ea7b4;
}
.layout-menu-left {
  background: #464c5b;
}
.layout-header {
  height: 60px;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
.layout-ceiling-main a {
  color: #9ba7b5;
}
.layout-hide-text .layout-text {
  display: none;
}
.ivu-col {
  transition: width 0.2s ease-in-out;
}
.navLink {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
<template>
    <div class="layout" :class="{'layout-hide-text': spanLeft < 5}" >
        <Row type="flex" >
            <Col :span="spanLeft" class="layout-menu-left">
                <Menu active-name="1" theme="dark" width="auto">
                    <div class="layout-logo-left"></div>
                      <router-link to="/">          
                        <MenuItem name="1">         
                              <Icon type="ios-navigate" :size="iconSize"></Icon>
                              <span class="layout-text">主页</span>  
                        </MenuItem> 
                      </router-link> 
                      <router-link to="userList" @click="changeNav">                                                         
                        <MenuItem name="2">      
                              <Icon type="ios-keypad" :size="iconSize"></Icon>
                              <span class="layout-text">用户管理</span>  
                        </MenuItem>
                       </router-link>
                      <router-link to="login">            
                        <MenuItem name="3">
                              <Icon type="ios-analytics" :size="iconSize"></Icon>
                              <span class="layout-text">注册</span>   
                        </MenuItem>                      
                      </router-link>                 

                </Menu>
            </Col>
            <Col :span="spanRight">
                <div class="layout-header">
                    <Button type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
                </div>
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <BreadcrumbItem href="/index">首页</BreadcrumbItem>
                        <BreadcrumbItem>{{navValue}}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div class="layout-content">
                    <div class="layout-content-main">
                        <router-view></router-view>
                    </div>
                </div>
            </Col>
        </Row>
    </div>
</template>
<script>
export default {
  data() {
    return {
      spanLeft: 5,
      spanRight: 19,
      navValue: "用户管理",
      navObj: {
        index: "主页",
        userManger: "用户管理",
        login: "登陆/注册"
      }
    };
  },
  computed: {
    iconSize() {
      return this.spanLeft === 5 ? 14 : 24;
    }
  },
  beforeCreate() {},
  created() {
    // this.menuHeight = window.innerHeight;
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    toggleClick() {
      if (this.spanLeft === 5) {
        this.spanLeft = 2;
        this.spanRight = 22;
      } else {
        this.spanLeft = 5;
        this.spanRight = 19;
      }
    },
    changeNav() {
      this.navValue = "用户管理";
    }
  }
};
</script>
