<template>
    <div>
        <el-upload
                class="avatar-uploader"
                action="https://upload-z1.qiniup.com"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :data="formData">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>
</template>

<script>
  export default {
    name: "index",
    props:{
      value:String
    },
    data(){
      return{
        formData:{
          token:''
        },
        imageUrl:this.value
      }
    },
    methods:{
      getToken(){
        this.$axios.get('http://upload.yaojunrong.com/getToken').then(res=>{
          if(res.code == 200){
            this.formData.token = res.data
          }
        })
      },
      handleAvatarSuccess(res){
        this.imageUrl = res.url
        this.$emit('input',this.imageUrl)
      }
    },
    created(){
      this.getToken();
    },
    watch:{
      value(val){
        this.imageUrl = val
      }
    }
  }
</script>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 80px;
        height: 80px;
        line-height: 80px;
        text-align: center;
    }
    .avatar {
        width: 80px;
        height: 80px;
        display: block;
    }
</style>