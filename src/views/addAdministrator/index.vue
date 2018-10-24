<template>
    <div class="add-wrapper">
       <el-card>
           <div slot="header">
               <h4>添加管理员</h4>
           </div>
           <el-form :model="formData" size="mini">
               <el-form-item label="用户头像:">
                   <uploadAvatar v-on:input="getAvatar"></uploadAvatar>
               </el-form-item>
               <el-form-item label="用户名:" required>
                   <el-input v-model="formData.username"></el-input>
               </el-form-item>
               <el-form-item label="密码:" required>
                   <el-input type="password" v-model="formData.password"></el-input>
               </el-form-item>
               <el-form-item label="昵称:" >
                   <el-input v-model="formData.nickname"></el-input>
               </el-form-item>
               <el-form-item label="个性签名:" >
                   <el-input v-model="formData.desc"></el-input>
               </el-form-item>
               <el-form-item label="性别">
                   <el-select v-model="formData.sex">
                       <el-option label="男" value="1"></el-option>
                       <el-option label="女" value="0"></el-option>
                   </el-select>
               </el-form-item>
               <el-button type="primary" @click="addAdmin">
                   提交
               </el-button>
           </el-form>
       </el-card>
    </div>
</template>

<script>
    import uploadAvatar from '../../components/upload_avatar'
  export default {
    name: "index",
    components:{
      uploadAvatar
    },
    data(){
      return{
        formData:{
          avatar:'',
          username:'',
          password:'',
          nickname:'',
          desc:'',
          sex:'',
          phone:'',
          job:''
        }
      }
    },
    methods:{
      addAdmin(){
        this.$axios.post('/addAdmin',this.formData).then(res=>{
          if(res.code == 200){
            this.$message.success('添加成功')
            setTimeout(()=>{
              this.$router.push('/layout/query_allAdmin')
            },1000)
          }else {
            this.$message.error(res.msg);
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      getAvatar(res){
        this.formData.avatar = res
      }
    }
  }
</script>

<style scoped lang="scss">
.add-wrapper{
}
</style>