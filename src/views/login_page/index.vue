<template>
    <div class="login-wrapper">
        <div class="main-content">
            <div class="title">
                <p>党建项目后台管理界面</p>
            </div>
            <div class="two-input">
                <el-input
                        placeholder="请输入用户名"
                        v-model="formData.username"
                        clearable>
                </el-input>
                <el-input
                        placeholder="请输入密码"
                        type="password"
                        v-model="formData.password"
                        clearable>
                </el-input>
                <el-Button type="primary" size="medium" @click="login">登录</el-Button>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "index",
    data(){
      return{
        formData:{
          username:'',
          password:''
        }
      }
    },
    methods:{
      login(){
        // let formdata = new FormData();
        // formdata.append('username',this.formData.username);
        // formdata.append('password',this.formData.password);
        this.$axios.post('/login',this.formData).then(res=>{
          if(res.code == 200){
            let id = res.data._id;
            this.$store.commit('ChANGE_ID',id);
            this.$router.push(`/layout`)
          }
        }).catch(err=>{
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
.login-wrapper{
    min-height: 100vh;
    background: -webkit-linear-gradient(#010204, #0c1848); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#010204, #0c1848); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#010204, #0c1848); /* Firefox 3.6 - 15 */
    background: linear-gradient(#010204, #0c1848); /* 标准的语法 */
    overflow: hidden;
    .title{
        height: 60px;
        line-height: 60px;
        font-size: 22px;
        font-weight: 600;
        text-align: center;
        margin-top: 20px;
    }
    .main-content{
        width: 500px;
        height: 400px;
        margin: 100px auto 0;
        border: 1px solid #fff;
        background-color: #fff;
        border-radius: 6px;
        .two-input{
            padding:0 50px 20px;
        }
    }
}
/deep/.el-input{
    margin-top: 40px;
}
/deep/.el-button{
    width: 100%;
    margin-top: 40px;
}
</style>