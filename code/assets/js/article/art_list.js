$(function (){
//    2.格式化日期
template.defaults.imports.dateFormat=function(dtStr) {
    var dt = new Date(dtStr)

    var y = dt.getFullYear()
    var m =padZero(dt.getMonth()+1)
    var d =padZero(dt.getDate())

    var hh = padZero(dt.getHours())
    var mm = padZero(dt.getMinutes())
    var ss = padZero(dt.getSeconds())
    return y + "-" +m +'-' +d+ "  " +hh+':'+mm+":"+ss
}
// 在个数的左侧补0
function padZero(n){
    return n>=10? n:"0"+n
}


    // 1.获取后台数据渲染页面
    var layer=layui.layer
    var q = {
        pagenum: 1,//页码值
       pagesize:2, //每页多少条数据
       cate_id:"",//文章分类的ID
       state:"",//文章的状态，可选值有：已发布、草稿

    }
    initTable()
    function initTable(){
        $.ajax({
            method:"GET",
            url:"/my/article/list",
            data:q,
            success: function(res) {
                if(res.status !==0) return layer.msg(res.message)
                var str = template("tpl_table",res)
                $("tbody").html(str)
                // 把页面得res.total总页数传给分页
                renderPage(res.total)
            }
        })
    }
    // 3.初始化分类选择框
    var form = layui.form
    initCate()
    function initCate() {
        $.ajax({
            method:"GET",
            url:"/my/article/cates",
            success:function (res) {
                if(res.status !==0) return layer.msg(res.message)
                var str = template("tpl_cate",res)
                $("[name=cate_id]").html(str)
                form.render()
            }
        })
        
    }
    // 4.检测表单的提交事件 完成删选功能
    $('#form_search').on('submit',function (e) {
        e.preventDefault()
        // 获取选择框选择状态和选择分类的值
        var state = $('[name="state"]').val()
        var cate_id =$('[name="cate_id"]').val()
        // 赋值给参数 向后台获取值相对应得表格数据
        q.cate_id= cate_id
        q.state=state
        // 初始化表格
        initTable()
    })
    // 5.分页功能
    var laypage = layui.laypage;

    function renderPage(total) {
        //执行一个laypage实例
        laypage.render({
          elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
          count: total, //数据总数，从服务端得到
          limit:q. pagesize,//每页显示多少数据
          curr:q.pagenum,//页码值第几页
          layout:["count","limit",'prev', 'page', 'next',"skip"],
          limits:[2, 3, 4, 5, 10],
        //   判断页码值是否发送改变
          jump: function(obj, first){
            //obj包含了当前分页的所有参数，比如：
            // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
            // console.log(obj.limit); //得到每页显示的条数
            // console.log(obj);
            // 把当前得页码值 和每页显示多少条数据给数据中
            q.pagenum = obj.curr
            q.pagesize = obj.limit
            //首次不执行
            // 判断，不是第一次初始化分页，才能重新调用初始化文章列表
            if(!first){
              //do something
               // 初始化表格
              initTable()
            }
          }
        });
    }
    // 6.删除功能
    $('tbody').on('click',".btn_delete",function(){
        
        var id = $(this).attr('data-id')
        // 先获取到当前删除按钮的id 再弹出层
        layer.confirm('是否确认删除?', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                method:"get",
                url:"/my/article/delete/"+id,
                success: function (res) {
                    if(res.status !==0) return layer.msg('删除失败')
                    // 渲染页面之前我们要判断本页面的数据是不是只剩下一条数据 
                    //判断 剩下一条数据 并且 页码值是大于第一页的时候就让当前的页码值-1
                    if($('tbody tr').length == 1 && q.pagenum > 1) q.pagenum--
                    // 删除成功后重新渲染页面
                    initTable()
                    layer.msg(res.message)
                }
            })
            layer.close(index);
          });
    })

})