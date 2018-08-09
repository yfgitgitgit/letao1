$(function(){
  var currentPage = 1;
  var pageSize = 5;
  render();
 function render(){
   $.ajax({
     type:"get",
     url:"/category/querySecondCategoryPaging",
    data:{
      page:currentPage,
      pageSize:pageSize,
    },
    dataType:"json",
    success:function(info){
      // console.log(info);
      var str = template("secondTpl",info);
      $('tbody').html(str);

      // 进行分页初始化
      $('#paginator').bootstrapPaginator({
        bootstrapMajorVersion: 3,
        // 总页数
        totalPages:Math.ceil( info.total / info.size),
        // 当前页
        currentPage: info.page,
        // 添加页码点击事件
        onPageClicked:function( a, b, c, page){
          // 更新当前页
          currentPage = page;
          // 重新渲染
          render();
        }
      })
    }
   })
 }
    //  2.点击添加模态框
    $('#addBtn').click(function(){
      // 模态框显示
      $('#addModal').modal("show");

      // 发送ajsx请求，获取一级分类全部数据，通过模板引擎渲染
      $.ajax({
        type:'get',
        url:'/category/queryTopCategoryPaging',
        data:{
          page:1,
          pageSize:100,
        },
        dataType:"json",
        success:function(info){
          console.log(info);
          // 组合
          var str = template("dropdownTpl",info);
          $('.dropdown-menu').html(str);
        }
      })
    })

    // 3.通过事件委托，给dropdown-menu下所有的a绑定事件
    $('.dropdown-menu').on("click","a",function(){
      // 获取a的文本
      var txt = $(this).text();
      // 设置给 dropdownText
      $('.dropdownText').text(txt);
      // 获取选中的 id
      var id = $(this).data("id");
      // 设置给 input
      $('[name="categoryId"]').val( id );
       console.log(  $('#form').data("bootstrapValidator"))
      // 将隐藏域校验状态, 设置成校验成功状态 updateStatus
      // updateStatus(字段名, 校验状态, 校验规则)
      $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID")
    })

    // 4.进行文件上传初始化
    // 配置返回的数据格式
    $('#fileupload').fileupload({
      //配置返回的数据格式 
      dataType:"json",
      // 图片上传完成后会调用done回调函数
      done:function(e,data){
        // 获取上传得到的图片地址
        var imgUrl = data.result.picAddr;
        // 赋值给img
        $('#imgBox img').attr("src",imgUrl);
        // 将图片地址，设置给input
        $('[ name="brandLogo"]').val(imgUrl);
        // 手动重置隐藏域的效验状态
        $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID")
      }
    })
    // 5.实现表单效验
    $("#form").bootstrapValidator({
      //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
      //   我们需要对隐藏域进行校验, 所以不需要将隐藏域 排除到 校验范围外
      excluded: [],
  
      // 配置图标
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',     // 校验成功
        invalid: 'glyphicon glyphicon-remove',  // 校验失败
        validating: 'glyphicon glyphicon-refresh'  // 校验中
      },
  
      // 配置字段
      fields: {
        // categoryId 分类id
        // brandName 二级分类名称
        // brandLogo 图片地址
        categoryId: {
          validators: {
            notEmpty: {
              message: "请选择一级分类"
            }
          }
        },
        brandName: {
          validators: {
            notEmpty: {
              message: "请输入二级分类"
            }
          }
        },
        brandLogo: {
          validators: {
            notEmpty: {
              message: "请选择图片"
            }
          }
        }
      }
    });
    // 6.注册表单效验成功事件，阻止默认提交，通过ajax 进行提交
  $('#form').on("success.form.bv",function(e){
    e.preventDefault();
    // 通过ajax提交
    $.ajax({
      type:'post',
      url:"/category/addSecondCategory",
      data:$('#form').serialize(),
      dataType:"json",
      success:function(info){
        if(info.success){
          // 关闭模态框
          $('#addModal').modal('hide');
          // 重新渲染第一页页面
          currentPage = 1;
          render();
         // 重置模态框的表单, 不仅校验状态要重置, 文本内容也要重置
          $('#form').data("bootstrapValidator").resetForm(true);
         // 手动重置文本内容, 和图片路径
         $('#dropdownText').text("请选择一级分类")
        $('#imgBox img').attr("src","images/none.png");
        }
      }
    })
  })
  })