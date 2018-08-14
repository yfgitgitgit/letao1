import { template } from "handlebars";

$(function(){
  // 要渲染历史记录, 要先读取历史记录, 下面都是进行历史记录存取操作
  // 我们需要约定一个键名, search_list

  var history = localStorage.getItem("search_list");
  var arr = JSON.parse(history);//转成数组
  // 结合模板渲染
  var str = template("tmp",{arr:arr});
  $('.lt_history').html(str);
})