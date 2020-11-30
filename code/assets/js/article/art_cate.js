$(function () {
    // 1.文章类别列表展示
    initArtCateList()
    function initArtCateList() {
        $.ajax({
            url:"/my/article/cates",
            success: function (res) {
                var str = template('tpl_art_cate',res)
                $('tbody').html(str)
            }
        })
    }
    // 2.显示添加文字分类列表
    var layer = layui.layer
    $("#btnAdd").on('click',function () {
        indexAdd =layer.open({
            type:1,
            title: '添加文章分类',
            area: ['500px', '300px'],
            content: $('#dialog_add').html()
          });     
            
    })
//   3 提交文章分类添加(事件委托)
    var indexAdd = null
    $("body").on('submit',"#form_add", function (e) {
        e.preventDefault()
        $.ajax({
            method:"post",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success:function (res) {
                if(res.status !== 0) return layer.msg(res.message)
                initArtCateList()
                layer.msg("恭喜您，文章类别添加成功")
                layer.close(indexAdd)
            }

        })
    })
    // 4.修改 展示表单
    var form=layui.form
    var indexEdit = null
    $('tbody').on('click',".btn_edit",function(){
        indexEdit = layer.open({
            type:1,
            title: '修改文章分类',
            area: ['500px', '300px'],
            content: $('#dialog_edit').html()
          });  
          var id= $(this).attr('data-id')   
          $.ajax({
              method:"get",
              url:"/my/article/cates/" + id,
              success: function(res) {
                  form.val('form-edit',res.data)
              }
          })
    })

//    4.修改-提交
$('body').on('submit',"#form_edit",function (e){
    e.preventDefault()
    $.ajax({
        method:"post",
        url:"/my/article/updatecate",
        data:$(this).serialize(),
        success:function(res) {
            if(res.status !== 0) return layer.msg(res.message)
            initArtCateList()
            layer.msg('恭喜您，文章类别更新成功')
            layer.close(indexEdit)
        }
    })
})
// 5.删除
$("tbody").on('click',".btn_delete",function(){
    // 先获取id 进入函数this代指就改变
    var id = $(this).attr('data-id')
    layer.confirm('是否确认删除?', {icon: 3, title:'提示'}, function(index){
        //do something
        $.ajax({
            method:"get",
            url:"/my/article/deletecate/" + id,
            success: function (res) {
                if(res.status !== 0) return layer.msg(res.message)
                initArtCateList()
                layer.msg(res.message)
            }
        })
        layer.close(index);
      });
})
})