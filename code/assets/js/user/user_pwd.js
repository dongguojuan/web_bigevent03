$(function(){
    // 验证格式
    var form= layui.form
    form.verify({
       
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pwd: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ], 

        repwd: function(value){ //value：表单的值、item：表单的DOM对象
            if(value!==$('[name="newPwd"]').val()) return "新密码与确认密码不一致"  
         },
         samepwd: function(value){ //value：表单的值、item：表单的DOM对象
            if(value==$('[name="oldPwd"]').val()) return "新密码与旧密码不能一样"  
         },
          
      });  
    //   提交密码修改
    $(".layui-form").on('submit',function(e){
      e.preventDefault()
      $.ajax({
          method:"post",
          url:"/my/updatepwd",
          data: $(this).serialize(),
          success: function(res){
              if(res.status!==0) return layer.msg(res.message)
              layer.msg(res.message)
            //   清空
              $(".layui-form")[0].reset() 
          }
      })
    })
      



})