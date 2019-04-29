$(function () {
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
    }
    var d = JSON.parse(localStorage.getItem('userInfo'));
    var id = getUrlParam("id");
    var bizNo = '';
    // var supplyId='12345678';
    var supplyId = d && d.supplierNo;
    var no = "您的编号:" + supplyId;
    $(".supplyBizNo").html(no);
    get('/api/supply_chain/myNoticeLogist/getOne?id=' + id).then((res) => {
        bizNo = res.data && res.data.main && res.data.main.bizNo;
        var html = template('logist-detail', res.data && res.data.main);
        $(".information-text").html(html);
    });

    get('/api/supply_chain/myNoticeLogist/getSupplyEvaluation?noticeId=' + id + '&supplyId=' + supplyId).then((res) => {
        var html = template('bidding-detail', {
            bizNo: bizNo,
            data: res.data
        });
        $(".price-table").html(html);
    });
    get('/api/supply_chain/myNoticeLogist/getSupplyEvaluationName?noticeId=' + id + '&supplyId=' + supplyId).then((res) => {
        var html = template('accessoriesName', {
            bizNo: bizNo,
            data: res.data
        });
        $(".information-tips").html(html);
    });
})