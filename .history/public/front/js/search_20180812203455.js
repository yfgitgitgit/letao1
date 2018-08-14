import { rename } from "fs";

$(function(){
  // 要渲染历史记录, 要先读取历史记录, 下面都是进行历史记录存取操作
  // 我们需要约定一个键名, search_list

  // 功能1: 历史记录渲染功能
  // (1) 读取本地历史, 得到 jsonStr
  // (2) 将 jsonStr 转换成 数组
  // (3) 通过数组, 进行页面渲染(模板引擎)

  // 结合模板渲染 组合
  var str = template("tmp",{arr:arr});
  $('.lt_history').html(str);

 // 功能2: 清空历史记录功能
  // (1) 通过事件委托给清空记录绑定点击事件
  // (2) 清空, 将本地的 search_list 移除, removeItem(key);
  // (3) 重新渲染页面
  $('.lt_history').on("click",".btn_empty",function(){
  
  })
  // 封装一个方法，用于读取历史记录数组。返回一个数组
  function getHistory(){
    var history = localStorage.getItem("search_list") || '[]' ;
    var arr = JSON.parse(history);//转成数组
    return arr;
  }
  专门用于读取本地
})