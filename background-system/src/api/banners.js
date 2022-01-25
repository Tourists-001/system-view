import request from '@/utils/request'

//获取首页标语
export function getBanners() {
  return request({
    url: '/api/banner',
    method: 'get',
  })
}
