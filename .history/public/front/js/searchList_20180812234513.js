
$(function(){
  // 功能1：解析地址栏参数，将参数赋值到input框中
  var key = getSearch("key");
  $('.search_input').val(key);
  render();
  // 三个必传的参数
  // var params = {};
  // params.proName = $(".search_input").val();//搜索关键字
  // params.page = 1;
  // package.pageSize = 100;
  
   // 两个可选的参数
  // 通过判断有没有高亮的a标签, 来决定需不需要传递排序的参数
  var $current = $(".")
  // 获取input框的值 请求数据，进行渲染
  function render(){
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
        var str = template("tmp",info);
        $(".lt_product").html(str);
        }
      })
  }
  // 功能2:点击搜索按钮，实现搜索功能
  $('mui-btn mui-btn-primary search_btn')
  // 获取搜索框的值
  var key = $("search_input").val();
  // 获取数组
  var jsonStr = localStorage.getItem("search_list");
  var arr = JSON.parse(jsonStr);
  
  将搜索关键字添加到arr
  render();
})