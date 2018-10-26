<template>
    <div>
        <el-card>
            <div slot="header">
                编辑轮播图
            </div>
            <el-form :model="formData" label-width="80px">
                <el-form-item label="轮播图:" required>
                    <swiperImg v-model="formData.img"></swiperImg>
                </el-form-item>
                <el-form-item label="标题:" required>
                    <el-input v-model="formData.title"></el-input>
                </el-form-item>
                <el-form-item label="新闻:">
                    <el-select v-model="formData.newsId">
                        <el-option
                                v-for="item in news"
                                :label="item.title"
                                :value="item._id"
                                :key="item._id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="排序:">
                    <el-input-number v-model="formData.sort" :min="1" :max="1000" label="序列号"></el-input-number>
                </el-form-item>
                <el-form-item label="是否显示:">
                    <el-switch
                            v-model="formData.status"
                            active-text="显示"
                            inactive-text="不显示">
                    </el-switch>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="commitSwiper">
                提交
            </el-button>
        </el-card>
    </div>
</template>

<script>
    import swiperImg from '../../components/upload_avatar'
  export default {
      components:{
        swiperImg
      },
    name: "index",
    data(){
      return{
        formData:{
          title:'',
          img:'',
          sort:'',
          status:'',
          newsId:''
        },
        news:[]
      }
    },
    methods:{
      getAllnewsData(){
        this.$axios.get('/getNews').then(res=>{
          if(res.code == 200){
            this.news = res.data
          }
        })
      },
      getCurrentSwiper(){
        let {id} = this.$route.query;
        this.$axios.get(`/getAllSwiper/${id}`).then(res=>{
          if(res.code == 200){
            this.formData = res.data
          }
        })
      },
      commitSwiper(){
        let {id} = this.$route.query
        this.$axios.put(`/editSwiper?id=${id}`,this.formData).then(res=>{
          if(res.code == 200){
            this.$message.success(res.msg)
            setTimeout(()=>{
              this.$router.push('/layout/getSwiperList')
            },1000)
          }else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    created(){
      this.getCurrentSwiper();
      this.getAllnewsData();
    }
  }
</script>

<style scoped>

</style>