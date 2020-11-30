$(function(){
    // 1.初始化分类下拉框
    var layer=layui.layer
    var form=layui.form
    initCate()
    function initCate(){
        $.ajax({
            method:"get",
            url:"/my/article/cates",
            success: function (res) {
                if(res.status !==0) return layer.msg("获取分类失败")
                var str=template('tpl_cate',res)
                $('[name="cate_id"]').html(str)
                form.render()
            }
        })
    }
    //2. 初始化富文本编辑器复制
       initEditor()
    //    实现裁剪效果 复制
      // 1. 初始化图片裁剪器
  var $image = $('#image')
  
  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }
  
  // 3. 初始化裁剪区域
  $image.cropper(options)
//   4.点击上传按钮触发文件域自动点击
$('#btnChooseImage').on('click',function(){
    $('#coverfile').click()
})
// 5.修改图片
$('#coverfile').change(function(e){
    // 拿到用户当前选择的文件
    var file=e.target.files[0]
    console.log(file);
    // 非空校验 判断文件是否是undefined  此处的文件是个对象不能用length
    if(file == undefined) return;
    var newImgURL = URL.createObjectURL(file)
    $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', newImgURL)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域
})
// 6.设置状态 
// 先设置状态默认为：发布状态  点击草稿状态变为草稿
var state="已发布"
$('#btnSave2').on('click',function(){
       state="草稿"
})
// 7.监听form的提交事件 发送ajax 渲染页面
$('#form_search').on('submit',function(e){
    e.preventDefault()
    var fd=new FormData(this)
    fd.append("state",state)
    $image
  .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
    width: 400,
    height: 280
  })
  .toBlob(function(blob) {       // 将 Canvas 画布上的内容，转化为文件对象
    // 得到文件对象后，进行后续的操作
    fd.append("cover_img",blob)
    $.ajax({
        method:"post",
        url:"/my/article/add",
        data:fd,
        processData:false,   //  告诉jquery不要处理发送的数据
        contentType:false,   // 告诉jquery不要设置content-Type请求头
        success:function(res){
            if(res.status !==0) return layer.msg("添加文章分布失败")
            layer.msg("添加文章分布成功")
            // location.href="/article/art_list.html"
            setTimeout(function() {
                window.parent.document.getElementById('art_list').click()
            
              
            },1500)
        }
    })
  })
   
})
})
