import axios from 'axios';

const baseUrl = process.env.NODE_ENV == 'development' ? '/apis' : '/'
const instance = axios.create({
  baseURL:baseUrl,
  timeout:15000
})
const xhr = {
  get(url,data,config){
    return new Promise((resolve,reject)=>{
      instance.get(url,{params:data},config).then(res=>{
        resolve(res.data)
      }).catch(err=>{
        reject(err)
      })
    })
  },
  otherReq(url,data,config,method){
    return new Promise((resolve,reject)=>{
      instance[method](url,data,config).then(res=>{
        resolve(res.data)
      }).catch(err=>{
        reject(err)
      })
    })
  },
  post(url,data,config){
    return this.otherReq(url,data,config,'post')
  },
  delete(url,data,config){
    return this.otherReq(url,data,config,'delete')
  }
}
export default xhr