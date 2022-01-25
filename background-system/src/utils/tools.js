//时间转换
export function formatDate(timestamp) {
  var date = new Date(parseInt(timestamp))
  var year = date.getFullYear() //获取年
  var mouth = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var weekArr = ['星期日', '星期六', '星期五', '星期四', '星期三', '星期二', '星期一']
  var week = weekArr[date.getDay()]

  //需要给一位数前加0
  if (mouth >= 1 && mouth <= 9) {
    mouth = '0' + mouth
  }
  if (day >= 1 && day <= 9) {
    day = '0' + day
  }
  if (hour >= 1 && hour <= 9) {
    hour = '0' + hour
  }
  if (minutes >= 1 && minutes <= 9) {
    minutes = '0' + minutes
  }
  if (seconds >= 1 && seconds <= 9) {
    seconds = '0' + seconds
  }
  return year + '-' + mouth + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds + ' ' + week
}
