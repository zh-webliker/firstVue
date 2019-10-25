import request from '@/utils/request'
import qs from 'qs'

export function fetchList (query) {
  return request({
    url: '/admin/getHouseList',
    method: 'get',
    params: query
  })
}

export function modifyList (data) {
  return request({
    url: '/admin/set',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 房型
export function getRoomList (data) {
  return request({
    url: '/admin/get?id=' + data,
    method: 'get',
    data
  })
}
// 添加房型
export function setRoom (data) {
  return request({
    url: '/admin/setRoom',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 删除
export function deleteInfo (data) {
  return request({
    url: '/admin/delete',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 添加图片
export function setImg (data) {
  return request({
    url: '/admin/setImg',
    method: 'post',
    data: qs.stringify(data)
  })
}
//分类列表
export function getLabelList (data) {
  return request({
    url: '/label/getList',
    method: 'get',
    data
  })
}
//选择房型
export function getChooseList (data) {
  return request({
    url: '/house/getLabel?label=' + data,
    method: 'get'
  })
}
//
export function modifyHouse (data) {
  return request({
    url: '/admin/setLabel',
    method: 'post',
    data: qs.stringify(data)
  })
}