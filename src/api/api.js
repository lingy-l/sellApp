import axios from 'axios';


//ip
// const ip='http://127.0.0.1:3333'
// const ip='http://192.168.1.2:3333'
const ip='http://192.168.253.1:3333'

//获取商家信息接口
export function getSeller(){
    return axios.get(ip+'/api/seller').then(({data})=>{
        return data.data
    })
}
// 获取商品列表信息接口
export function getGoods(){
    return axios.get(ip+'/api/goods').then(({data})=>{
        return data.data
    })
}
// 获取商品评论信息接口
export function getRatings(){
    return axios.get(ip+'/api/ratings').then(({data})=>{
        return data.data
    })
}