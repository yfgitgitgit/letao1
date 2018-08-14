$(function(){
  // 功能1：解析地址栏参数，将参数赋值到input框中
  var key = getSearch("key");
  $('.search_input').val(key);

  // 三个必传的参数
  // var params = {};
  // params.proName = $(".search_input").val();//搜索关键字

  // 发送ajax请求。获取搜索到的商品，通过模板引擎渲染
  $.ajax({
    type:"get",
    url:"/product/queryProduct",
    data:{
      proName:$(".search_input").val(),
      page:1,
      pageSise:100,
    },
    dataType:"json",
    success:function(info){
      console.log(info);
    }
  })

})