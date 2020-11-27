$(function(){
    $('#link_login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 表单验证格式功能
    var form = layui.form
    form.verify({
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
  pwd: [
    /^[\S]{6,12}$/
    ,'密码必须6到12位，且不能出现空格'
  ] ,
  repwd:function(value){
      var pwd = $('.reg-box [name="username"]').val()
      if(value!==pwd){
           return "俩次输入密码不一致"
      }
  }
    })
    
    // 注册绑定提交事件 触发就发起请求
    var layer=layui.layer
    $('#form_reg').on('submit',function (e) {
        e.preventDefault()
        $.ajax ({
            method:"post",
            url: "/api/reguser",
            data:{
                username: $('#form_reg [name="username"]').val(),
                password:  $('#form_reg [name="password"]').val()
            },
            success: function (res) {
                if(res.status!==0) return layer.msg(res.message);
                // 弹出消息，清空表单，跳转页面
                layer.msg(res.message)
                $('#form_reg')[0].reset()
                $('#link_login').click()
            }
        })
    })
// 登录绑定提交事件 触发就发起请求
    $('#form_login').on('submit',function (e) {
        e.preventDefault()
        $.ajax ({
            method:"post",
            url: "/api/login",
            data:$('#form_login').serialize(),
            success: function (res) {
                if(res.status!==0) return layer.msg(res.message);
                // 弹出消息，跳转页面 保存token
                layer.msg(res.message)
                location.href='/index.html'
                localStorage.setItem('token',res.token)
            }
        })
    })



})