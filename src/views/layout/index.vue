<template>
    <div class="home-wrapper">
        <el-container>
            <el-aside width="200px">
                <el-menu
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#00b7ff"
                >
                    <el-menu-item index="1" @click="skipToHomePage">
                        <i class="el-icon-location"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>管理员管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1" @click="skipToQuery">查看所有管理员</el-menu-item>
                            <el-menu-item index="1-2" @click="skipToAdd">添加管理员</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>导航二</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="2-1">选项1</el-menu-item>
                            <el-menu-item index="2-2">选项2</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header>
                    <div class="header-content">
                        <p>欢迎来到党建后台管理页面</p>
                        <div class="userData">
                            <img src="../../assets/logo.png" alt="">
                            <el-dropdown trigger="click">
                                <span class="el-dropdown-link">
                                    admin
                                    <i class="el-icon-caret-bottom el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>编辑个人信息</el-dropdown-item>
                                    <el-dropdown-item>退出</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </div>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
  export default {
    name: "index",
    data(){
      return{

      }
    },
    methods:{
      skipToHomePage(){
        this.$router.push('/layout/home_page')
        },
      skipToQuery(){
        this.$router.push('/layout/query_allAdmin')
      },
      skipToAdd(){
        this.$router.push('/layout/addAdministrator')
      }
    }
  }
</script>

<style scoped lang="scss">
.home-wrapper{
    .header-content{
        position: relative;
        color: #fff;
        p{
            font-size: 22px;
            font-weight: 600;
            text-align: center;
            margin-top: 14px;
        }
        .userData{
            position: absolute;
            top: 0;
            right: 0;
            img{
                width: 30px;
                height: 30px;
                vertical-align: middle;
                border-radius: 50%;
            }
            .el-dropdown-link{
                color: #fff;
                font-size: 16px;
                cursor: pointer;
            }
        }
    }
}
/deep/.el-aside{
    background-color: #545c64;
    min-height: 100vh;
}
/deep/.el-header{
    background-color: #00B7FF;
    min-height: 10vh;
}
/deep/.el-main{
    background-color: #fff;
    min-height: 90vh;
}
/deep/.el-menu{
    border: none;
}
</style>