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
                            <el-menu-item index="1-1" @click="skipToQuery">管理员列表</el-menu-item>
                            <el-menu-item index="1-2" @click="skipToAdd">添加管理员</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>新闻管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="2-1" @click="skipToNews">新闻列表</el-menu-item>
                            <el-menu-item index="2-2" @click="addNews">添加新闻</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>轮播图管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="3-1" @click="skipToSwiperList">轮播图列表</el-menu-item>
                            <el-menu-item index="3-2" @click="skipToAddSwiper">添加轮播图</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header>
                    <div class="header-content">
                        <p>欢迎来到党建后台管理页面</p>
                        <div class="userData">
                            <img :src="adminData.avatar" alt="">
                            <el-dropdown trigger="click" @command="handleCommand">
                                <span class="el-dropdown-link">
                                    {{adminData.username}}
                                    <i class="el-icon-caret-bottom el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>编辑个人信息</el-dropdown-item>
                                    <el-dropdown-item command="logout">退出</el-dropdown-item>
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
        adminData:{}
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
      },
      skipToNews(){
        this.$router.push('/layout/getAllNews')
      },
      addNews(){
        this.$router.push('/layout/addNews')
      },
      skipToSwiperList(){
        this.$router.push('/layout/getSwiperList')
      },
      skipToAddSwiper(){
        this.$router.push('/layout/addSwiper')
      },
      getAdminData(){
        let id = this.$store.state.id;
        this.$axios.get(`/getAdmin/${id}`).then(res=>{
            if(res.code == 200){
              this.adminData = res.data
            }else {
              this.$message.error('用户信息过期，请重新登录')
            }
        }).catch(err=>{
          console.log(err)
        })
      },
      handleCommand(logout){
        this.$axios.get('/logOut').then(res=>{
          if(res.code == 200){
            this.$message.success(res.msg)
            setTimeout(()=>{
              this.$router.push('/')
            },1000)
          }else {
            this.$message.error(res.msg)
            setTimeout(()=>{
              this.$router.push('/')
            },1000)
          }
        }).catch(err=>{
          console.log(err)
        })
      }
    },
    created(){
      this.getAdminData();
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