$(function(){
  // 1.从地址栏获取传递过来productId
  var productId = getSearch("productId");
  // 发送ajax请求
  $.ajax({
    type:"get",
    url:"/product/queryProductDetail",
    data:{
      id:productId
    },
    dataType:"json",
    success:function(){
      console.log(info)
    }
  })
})