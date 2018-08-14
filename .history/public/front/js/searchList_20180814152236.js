$(function () {
  var currentPage = 1; //当前页
  var pageSize = 2; //每页条数
  // 获取input框的值 请求数据，进行渲染
  function render(callback) {
    //  $('.lt_product').html('<div class="loading"></div>');
    // 三个必传的参数
    var params = {};
    params.proName = $('.search_input').val(); // 搜索关键字
    params.page = currentPage;
    params.pageSize = pageSize;

    // 两个可选的参数
    // 通过判断有没有高亮的a标签, 来决定需不需要传递排序的参数
    var $current = $('.lt_sort a.current');
    if ($current.length > 0) {
      // 当前有 a 标签有current类, 需要进行排序
      // console.log("需要进行排序");
      // 按照什么进行排序
      var sortName = $current.data("type");
      // 升序还是降序, 可以通过判断箭头的方向决定, （1升序，2降序）
      var sortValue = $current.find("i").hasClass("fa-angle-down") ? 2 : 1;

      // 如果需要排序, 需要将参数添加在params中
      params[sortName] = sortValue;
    }

    setTimeout(function () {
        // 发送 ajax 请求, 获取搜索到的商品, 通过模板引擎渲染
        $.ajax({
          type: "get",
          url: "/product/queryProduct",
          data: params,
          dataType: "json",
          success: function (info) {
            // console.log("发送成功");

            console.log(info);
            // 下拉刷新和上拉加载拿到数据执行的操作不一样
            // 将拿到数据后需要做的事情。通过函数传递进行来调用即可
            callback && callback(info);
          }
        })
      }, 1000);
  }
  // 功能1：解析地址栏参数，将参数赋值到input框中
  var key = getSearch("key");
  $('.search_input').val(key);


  // 下拉刷新和上拉加载需要执行的渲染是不一样的
  // 下拉刷新, 重新刷新, 利用 html方法 覆盖显示 第一页的数据
  // 上拉加载, 加载更多, 利用 append 方法, 在原有数据基础上追加
  mui.init({
    pullRefresh: {
      container: ".mui-scroll-wrapper",
      // 配置下拉刷新
      down: {
        // 一进入页面，自动触发一次下拉刷新
        auto: true,
        // 必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
        callback: function () {
          console.log("下拉刷新了");
          //  render();
          // 下拉刷新，重置当前页
          currentPage = 1; // 下拉刷新, 通过调用render方法, 请求数据进行渲染
          render(function (info) {
            var htmlStr = template("tmp", info);
            $('.lt_product').html(htmlStr);
            //手动调用原型上的方法, 进行下拉刷新
            // mui('.mui-scroll-wrapper').pullRefresh().enablePullupToRefresh();
           
            // 重新启动上拉加载
            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
          })
        }
      },
      // 配置上拉加载
      up: {
        callback: function () {
          console.log("上拉加载更多");
          // 上拉加载, 加载下一页的数据
          currentPage++;
          render(function (info) {
            var htmlStr = template("tmp", info);
            $('.lt_product').append(htmlStr);
            //  需要在数据回来之后关闭上拉加载

            // endPullupToRefresh(boolean)
            // 1. false 还有更多数据
            // 2. true  没有更多数据了
            if (info.data.length === 0) {
            // 没有更多数据，默认会禁用上拉加载
              mui('.mui-scroll-wrapper').pullRefresh().enablePullupToRefresh(true);
            } else {
              mui('.mui-scroll-wrapper').pullRefresh().enablePullupToRefresh(false);
            }
          });
        }
      }
    },

  });

  // 功能2:点击搜索按钮，实现搜索功能
  $(".search_btn").click(function () {
    // console.log("hahahah");

    // 获取搜索框的值
    var key = $(".search_input").val();
    // 获取数组
    var jsonStr = localStorage.getItem("search_list");
    // console.log(jsonStr);

    var arr = JSON.parse(jsonStr);

    // 1.不能重复
    var index = arr.indexOf(key);
    if (index > -1) {
      // 已经存在，删除该项
      arr.splice(index, 1);
    }
    // 2.不能超过10个
    if (arr.length >= 10) {
      arr.pop();
    }
    // 将搜索关键字添加到arr最前面
    arr.unshift(key);

    // 转存到本地存储中
    localStorage.setItem("search_list", JSON.stringify(arr));
    // render();
      // 触发一次下拉刷新
   mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
  })

  // 功能3: 点击价格或者库存, 切换current, 实现排序
  // 1. 绑定点击事件, 通过 a[data-type] 绑定
  // 2. 切换 current类
  //    (1)点击的a标签没有current类, 直接加上 current类, 并且移除其他 a 的current类
  //    (2)点击的a标签有current类, 切换箭头方向
  // 3. 调用 render 重新渲染
  $('.lt_sort a[data-type]').on("tap",function () {

    if ($(this).hasClass("current")) {
      // 有类, 切换箭头方向
      $(this).find("i").toggleClass("fa-angle-up").toggleClass("fa-angle-down");
    } else {
      // 当前a没有类, 给自己加上, 让其他的移除
      $(this).addClass("current").siblings().removeClass("current");
    }

    // 重新渲染
   // 重新渲染, 触发一次下拉刷新即可
   mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
  })
})