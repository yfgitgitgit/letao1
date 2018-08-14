$(function(){
  // 功能1：解析地址栏参数，将参数赋值到input框中
  var key = getSearch("key");
  $('.search_input').val(key);

  // 三个必传的参数
  var params = {};
  params.proName = $(".search_input").val();//搜索关键字
  params.page = 1;
  package.pageSize = 100;
  
   // 两个可选的参数
  // 通过判断有没有高亮的a标签, 来决定需不需要传递排序的参数
  var $
  // 发送ajax请求。获取搜索到的商品，通过模板引擎渲染
  $.ajax({
    type:"get",
    url:"/product/queryProduct",
    data:{
      proName:$(".search_input").val(),
      page:1,
      pageSize:100
    },
    dataType:"json",
    success:function(info){
      console.log(info);
    }
  })

})