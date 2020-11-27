

var url="http://ajax.frontend.itheima.net"
$.ajaxPrefilter(function (params) {
    params.url = url+params.url

    if(params.url.indexOf("/my/") !==-1){
        params. headers = {
            Authorization:localStorage.getItem('token') || ""
        } 
    }
    // 拦截功能
    params.complete=function(res) {
     console.log(res);
     if(res.responseJSON.status==1 && res.responseJSON.message==="身份认证失败！"){
        //  清空token值
        localStorage.removeItem('token')
        // 跳回登录页面
        location.href="/login.html"
     }
    }



})