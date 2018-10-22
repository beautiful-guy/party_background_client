import axios from 'axios';

const baseUrl = '/apis'
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
  }
}
export default xhr