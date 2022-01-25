import request from '@/utils/request'
//分页获取文章
/**
 *
 * @param {页码} page
 * @param {条数} limit
 */
export function findBlog(page = 1, limit = 10) {
  return request({
    url: '/api/blog',
    method: 'get',
    params: {
      page,
      limit,
    }
  })
}
//删除文章

export function delOneBlog(id) {
  return request({
    url:`/api/blog/:${id}`,
    method:"delete",
  })
}

//test
export function test() {
  return request({
    url: 'https://qcyp1k.api.cloudendpoint.cn/hello',
    method:'get'
  })
}
