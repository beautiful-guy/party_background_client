<template>
    <div class="swiper-wrapper">
        <el-card>
            <div slot="header">
                轮播图列表
            </div>
            <el-table
                :data="formData"
                style="width:100%">
                <el-table-column
                        prop="title"
                        label="标题"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="newsId.content"
                        label="对应新闻"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="sort"
                        label="序号"
                        width="180">
                </el-table-column>
                <el-table-column
                        label="是否显示"
                        width="180">
                    <template slot-scope="scope">
                        <span v-text="scope.row.status?'是':'否'"></span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="轮播图"
                        width="180">
                    <template slot-scope="scope">
                        <img :src="scope.row.img" style="width: 60px;border-radius: 50%" alt="">
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="200">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="updateSwiper(scope.row._id)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="deleteSwiper(scope.row._id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
  export default {
    name: "index",
    data(){
      return{
        formData:[]
      }
    },
    methods:{
      getAllSwiper(){
        this.$axios.get('/getAllSwiper').then(res=>{
          if(res.code == 200){
            this.formData = res.data
          }
        })
      },
      deleteSwiper(id){
        this.$axios.delete(`/deleteSwiper?id=${id}`).then(res=>{
          if(res.code == 200){
            this.$message.success(res.msg)
            this.getAllSwiper();
          }else {
            this.$message.error(res.msg)
          }
        })
      },
      updateSwiper(id){
        this.$router.push(`/layout/updateSwiper?id=${id}`)
      }
    },
    created(){
      this.getAllSwiper();
    }
  }
</script>

<style scoped>

</style>