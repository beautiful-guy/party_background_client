<template>
    <div class="news-wrapper">
        <el-table
                :data="newData"
                style="width: 100%">
            <el-table-column
                    prop="title"
                    label="新闻标题"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="author.nickname"
                    label="作者"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="types.title"
                    label="分类"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="content"
                    label="新闻内容"
                    width="200">
            </el-table-column>
            <el-table-column
                    label="新闻头图"
                    width="150">
                <template slot-scope="scope">
                    <img style="width:60px;border-radius: 50%" :src="scope.row.img" alt="">
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
                            @click="deleteNew(scope.row._id)"
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
        newData:[]
      }
    },
    methods:{
      getAllNewsData(){
        this.$axios.get('/getNews').then(res=>{
          if(res.code == 200){
            this.newData = res.data
          }
        })
      },
      deleteNew(id){
        this.$axios.delete(`/deleteNews?id=${id}`).then(res=>{
          if(res.code == 200){
            this.$message.success(res.msg);
            this.getAllNewsData();
          }else{
            this.$message.error(res.msg)
          }
        }).catch(err=>{
          console.log(err)
        })
      }
    },
    created(){
      this.getAllNewsData();
    }
  }
</script>

<style  lang="scss">
.news-wrapper{
.el-table_3_column_16{
    .cell{
        display:-webkit-box;
        -webkit-line-clamp:1;
        -webkit-box-orient:vertical;
        overflow:hidden;
    }
}
}
</style>