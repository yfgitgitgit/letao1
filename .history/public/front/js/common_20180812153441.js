/**
 * Created by Jepson on 2018/8/10.
 */

$(function() {
  // 区域滚动
  // 1. 引包
  // 2. 准备结构(不要忘了给父容器设置 position:relative)
  // 3. 进行初始化


  // mui实现的选择器, 可以生成mui实例, 就可以调用 mui实例的方法
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    indicators: false //是否显示滚动条
  });

  //获得slider插件对象
  var gallery = mui('.mui-slider');
  gallery.slider({
    interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
  });

});
    // 专门通过传递的参数 可以解析出地址栏的参数值
    function getSearch(name){
      var search = location.search;

      // 解析成中文
      search = decodeURI(search);
      
      // 将? 去掉
      search = search.slice(1);

      // 根据&进行切割
      var arr = search.split("&");

      var obj = {};
      // v就是每一项，["name=pp"]
      arr.forEach(function(v,i){
        var key = v.split("=")[0];
        var value = v.split("=")[1];
        
      })
    }