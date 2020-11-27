$(function(){
    var form=layui.form
    form.verify({
        nickname: function(value){
            if(value.length>6){
                return "昵称必须在1-6之间"
            }
        }
        })
        
    // 2  把用户的资料渲染到资料中心
    xuanranZL()
   var layer=layui.layer
   function xuanranZL() {
       $.ajax({
           method:"GET",
           url:"/my/userinfo",
           success: function(res){
               if( res.status !==0) return  layer.msg(res.message)
            //    layer.msg(res.message)
               form.val("formTest",res.data)
            }
       })
   }
// 3重置功能
   $('#btnreset').on('click',function(e){
       e.preventDefault()
    //    将所有的资料返回到登录时的基本资料
       xuanranZL()
   })
//    4.提交事件
$('.layui-form').on("submit",function(e){
    // 提交功能不需要跳转页面只提交给后台
    e.preventDefault()
    $.ajax({
        method:"post",
        url:"/my/userinfo",
        data:$(this).serialize(),
        success: function(res){
            console.log(res);
            if(res.status !==0) return  layer.msg(res.message)
            layer.msg(res.message)
            window.parent.getUserInof()
        }
    })
})

 });      
