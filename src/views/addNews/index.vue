<template>
    <div class="add-wrapper">
        <el-card>
            <div slot="header">
                <h4>添加新闻</h4>
            </div>
            <el-form
                    :model="formData"
                    label-width="80px"
                    size="mini">
                <el-form-item label="新闻头图:">
                    <uploadimg @input="getImagUrl"></uploadimg>
                </el-form-item>
                <el-form-item label="新闻标题" required>
                    <el-input v-model="formData.title"></el-input>
                </el-form-item>
                <el-form-item label="新闻内容" required>
                    <quill-editor
                            v-model="formData.contentText"
                            ref="myQuillEditor"
                            @change="editChange($event)"
                            :options="editorOption"
                    >
                    </quill-editor>
                </el-form-item>
                <el-form-item label="新闻作者" required>
                    <el-select v-model="formData.author">
                        <el-option
                            v-for="(item,index) in authors"
                            :label="item.nickname"
                            :key="index"
                            :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="新闻类型" required>
                    <el-select v-model="formData.types">
                        <el-option
                            v-for="(item,index) in category"
                            :label="item.title"
                            :key="index"
                            :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="commitNews">提交</el-button>
        </el-card>
    </div>
</template>

<script>
    import uploadimg from '../../components/upload_avatar';
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    import {quillEditor, Quill} from 'vue-quill-editor'
    import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'

    Quill.register('modules/ImageExtend', ImageExtend)
  export default {
    name: "index",
    components:{
      uploadimg,
      quillEditor
    },
    data(){
      return{
        formData:{
          title:'',
          content:'',
          contentText:'',
          img:'',
          author:'',
          types:'',
        },
        authors:[],
        category:[],
        myToken:'',
        editorOption:{
          modules: {
            ImageExtend: {
              loading: true,
              name: 'file',
              action: 'https://upload-z1.qiniup.com',
              response: (res) => {
                return res.url
              },
              change: (xhr, formData) => {
                // xhr.setRequestHeader('myHeader','myValue')
                formData.append('token', this.myToken)
              } // 可选参数 每次选择图片触发，也可用来设置头部，但比headers多了一个参数，可设置formData
            },
            toolbar: {
              container: container,
              handlers: {
                'image': function () {
                  QuillWatch.emit(this.quill.id)
                }
              }
            }
          }
        }
      }
    },
    methods:{
      getAllAuthor(){
        this.$axios.get('/getAdmin').then(res=>{
            if(res.code == 200){
              this.authors = res.data
            }
        })
      },
      getAllCategory(){
        this.$axios.get('/getCategory').then(res=>{
          if(res.code == 200){
            this.category = res.data
          }else {
            this.$message.error('登录状态失效，请重新登录！')
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      getMyToken(){
        this.$axios.get('http://upload.yaojunrong.com/getToken').then(res=>{
          if(res.code == 200){
            this.myToken = res.data
          }
        })
      },
      editChange({ quill, html, text }){
        this.formData.content = text
      },
      getImagUrl(res){
        this.formData.img = res
      },
      commitNews(){
        this.$axios.post('addNews',this.formData).then(res=>{
          if(res.code == 200){
            this.$message.success(res.msg)
            setTimeout(()=>{
              this.$router.push('/layout/getAllNews')
            },1000)
          }else {
            this.$message.error(res.msg)
          }
        }).catch(err=>{
          console.log(err)
        })
      }
    },
    created(){
      this.getAllAuthor();
      this.getAllCategory();
      this.getMyToken();
    }
  }
</script>

<style  lang="scss">
.add-wrapper{
    .ql-editor{
        min-height: 200px;
        p{
            img{
                width: 50px;
                height: 50px;
            }
        }
    }
}

</style>