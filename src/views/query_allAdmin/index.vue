<template>
    <div class="allAdmin-wrapper">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/layout/home_page' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/layout/query_allAdmin' }">管理员列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-table
                :data="adminData"
                style="width: 100%">
            <el-table-column
                    prop="username"
                    label="用户名"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="nickname"
                    label="昵称"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="sex"
                    label="性别"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    label="添加时间"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="desc"
                    label="个性签名"
                    width="180">
            </el-table-column>
            <el-table-column
                    label="头像"
                    width="180">
                <template slot-scope="scope">
                        <img style="width:60px;border-radius: 50%" :src="scope.row.avatar" alt="">
                </template>
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="200">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary"
                            >编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="deleteAdmin(scope.row._id)"
                            >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
  export default {
    name: "index",
    data(){
      return{
        adminData:[],
        page:1,
        size:10
      }
    },
    methods:{
      getalladmin(){
        this.$axios.get('/getAdmin?page=1&size=10').then(res=>{
          if(res.code == 200){
            this.adminData.push(...res.data);
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      deleteAdmin(id){
        this.$axios.delete(`/deleteAdmin?id=${id}`).then(res=>{
          if(res.code == 200){
            this.$message.success(res.msg)
          }else{
            this.$message.error(res.msg)
          }
        }).catch(err=>{
          console.log(err)
        })
      }
    },
    created(){
      this.getalladmin()
    }
  }
</script>

<style scoped lang="scss">

</style>