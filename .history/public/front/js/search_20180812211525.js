
$(function(){
  // 要渲染历史记录, 要先读取历史记录, 下面都是进行历史记录存取操作
  // 我们需要约定一个键名, search_list

  // 功能1: 历史记录渲染功能
  // (1) 读取本地历史, 得到 jsonStr
  // (2) 将 jsonStr 转换成 数组
  // (3) 通过数组, 进行页面渲染(模板引擎)
  render();

 
  // 封装一个方法，用于读取历史记录数组。返回一个数组
  function getHistory(){
    var history = localStorage.getItem("search_list") || '[]' ;
    var arr = JSON.parse(history);//转成数组
    return arr;
  }
  // 专门用于读取本地历史记录，进行渲染
  function render(){
    var arr = getHistory();
    // 结合模板渲染 组合
    // template(模板id,数据对象);第二个要求必须是对象
      var str = template("tmp",{arr:arr});
      $('.lt_history').html(str);
  }

  // 功能2: 清空历史记录功能
  // (1) 通过事件委托给清空记录绑定点击事件
  // (2) 清空, 将本地的 search_list 移除, removeItem(key);
  // (3) 重新渲染页面
  $('.lt_history').on("click",".btn_empty",function(){
    // mui确认框：
    //参数1：提示文本
    //参数2：表题
    //参数3:提示框按钮，要求是一个数组
    mui.confirm("你确认要清空历史记录嘛?","温")
    // 移除本地历史
    localStorage.removeItem("search_list");
    //重新渲染
    render();
  })

  // 功能3: 删除单条历史记录
  // (1) 事件委托绑定点击事件
  // (2) 将下标存在删除按钮中, 点击后获取下标
  // (3) 读取本地存储, 拿到数组
  // (4) 根据下标, 从数组中将该下标的项移除,  splice
  // (5) 将数组转换成 jsonStr
  // (6) 存到本地存储中
  // (7) 重新渲染
  $('.lt_history').on("click",".btn_delete",function(){
    // 获取下标
    var index = $(this).data("index");
    // 获取数组
    var arr = getHistory();
    // 根据下标删除
    // splice(从哪开始,删几个,添加的项1,,添加的项2，。。)
    arr.splice(index,1);
    // 转成jsonstr 存入本地存储
    var jsonStr = JSON.stringify(arr);
    localStorage.setItem("search_list",jsonStr);
    // 重新渲染
    render();

  })
})