$(function () {
    getUserInof()
    // 退出功能
    $('#tuichu').on('click',function(){
        layer.confirm('是否退出?', {icon: 3, title:'提示'}, function(index){
            //do something
            // 清空token
            localStorage.removeItem('token')
            // 跳转页面
            layer.close(index);
            location.href="/login.html"
          });
    })
})
// var layer=layui.layer
// function getUserInof() {
//     $.ajax({
//         method:"GET",
//         url:"/my/userinfo",
//         success: function (res) {
//           if(res.status!==0) return layer.msg(res.message)
//           // 请求成功，渲染头像
//           renderAvatar(res.data)
//         }
        
    
//     })
// }
// function  renderAvatar(user) {
//     var name = user.nickname || user.username
//     $('#welcome').html("欢迎&nbsp;&nbsp;" + name)
//     if(user.user_pic !==null){
//         $('.layui-nav-img').show().attr('src',user.user_pic)
//         $('.text-avatar').hide()
//     }else {
//         $('.layui-nav-img').hide()
//         $('.text-avatar').show().html(name[0].toUpperCase())
//     }
    
// }
function getUserInof() {
    $.ajax({
        url: '/my/userinfo',
        
        success: function (res) {
            if(res.status!==0) return layui.layer.msg(res.message)
            renderAvatar(res.data)
        }
    })
}
function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var text = name[0].toUpperCase();
        $('.text-avatar').html(text).show()
    }
}
