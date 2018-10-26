<template>
    <div>
        <el-card>
            <div slot="header">
                <h4>修改管理员</h4>
            </div>
            <el-form :model="formData" size="mini">
                <el-form-item label="用户头像:">
                    <uploadAvatar v-model="formData.avatar"></uploadAvatar>
                </el-form-item>
                <el-form-item label="用户名:">
                    <el-input v-model="formData.username" disabled></el-input>
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
                <el-button type="primary" @click="commitUser">
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
          nickname:'',
          desc:'',
          sex:'',
        }
      }
    },
    methods:{
      getUserData(){
        let {id} = this.$route.query;
        this.$axios.get(`/getAdmin/${id}`).then(res=>{
          if(res.code == 200){
            this.formData = res.data
          }
        })
      },
      commitUser(){
        let {id} = this.$route.query;
        this.$axios.put(`updateUser?id=${id}`,this.formData).then(res=>{
          if(res.code == 200){
            this.$message.success(res.msg);
            setTimeout(()=>{
              this.$router.push('/layout/query_allAdmin')
            },1000)
          }else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    created(){
      this.getUserData();
    }
  }
</script>

<style scoped>

</style>