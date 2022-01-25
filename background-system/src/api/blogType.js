import request from '@/utils/request'

//查看文章分类
export function getBlogType() {
  return request({
    url: '/api/blogtype',
    method: 'get'
  })
}
//添加文字分类
export function addBlogType(data) {
  return request({
    url: '/api/blogtype',
    method: 'post',
    data
  })
}
//删除文章分类
export function delBlogType(id) {
  return request({
    url: `/api/blogtype/${id}`,
    method: 'delete'
  })
}
//查找某一个分类
export function findOneBlogType(id) {
  return request({
    url: `http://mock.duyiedu.com/mock/76/api/blogtype/:${id}`,
    method: 'get',
  })
}
//更新某个文章分类
export function updateOneBlogType(editInfo) {
  return request({
    url: `/api/blogtype/${editInfo.id}`,
    method: 'post',
    data: editInfo.data
  })
}
//添加文字
export function addBlog(data) {
  return request({
    url: '/api/blog',
    method: 'post',
    data,
  })
}
//编辑文章
export function editBlog(blogInfo) {
  return request({
    url: `/api/blog/${blogInfo.id}`,
    method: 'put',
    data: blogInfo.data
  })
}

//根基id查找文章
export function findOneBlog(id) {
  return request({
    url: `/api/blog/${id}`,
    method: 'get',
  })
}
