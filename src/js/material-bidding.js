$(function() {

    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
    }


    /**
     * material-bidding
     */
    function templateTable(id, data) {
      
        // 结果公告
        $("#result").createPage({
            pageCount:100,
            current:1,
            backFn:function(p){
                // 分页的回调函数
                console.log(p);
            }
        });
    };

    var type = getUrlParam('type') || 1;
    loadData(type);
    if (type == 1) {
        $('.bidding-content-nav span').eq(0).addClass('active')
    } else {
        $('.bidding-content-nav span').eq(1).addClass('active')
    }

    $('.bidding-content-nav').on('click', 'span', function() {
        $('.bidding-content-nav span').removeClass('active');
        $(this).addClass('active');
        loadData($(this).data('name'));
    })


})

function loadData(biddingStatus, page, limit){
    page = page || 1, 
    limit = limit || 10,
    get('/api/supply_chain/frontend/anonymous/notice/listByType',{
        typeCode: 'material',
        biddingStatus: biddingStatus,
        page,
        limit,
    }).then((res) => {
        var html = template('table'+biddingStatus, res);
        $(".bidding-table").html(html);
        var total = res.data.total;
        $("#conduct").createPage({
            total,
            page,
            limit,
            backFn:function(p){
                loadData(biddingStatus, p ,limit);
            }
        });
    })
}
