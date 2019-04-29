$(function () {
  var id = getUrlParam("id");
  var d=JSON.parse(localStorage.getItem('userInfo'));
  var bizNo='';
  var supplyId = d && d.supplierNo;
  var no="您的编号:"+supplyId;
  $(".bizNo").html(no);
  // var supplyId='12345678';
  get('/api/supply_chain/myNoticeAccessories/getOne?id='+id).then((res) => {
    bizNo=res.data.main.bizNo;
    var html = template('accessories-detail', res.data.main);
    $(".information-text").html(html);
    /*var itemHtml = template('materialItem-detail', res.data);
    $(".price-table").html(itemHtml);*/
  });
  get('/api/supply_chain/myNoticeAccessories/getSupplyEvaluation?noticeId='+id+'&supplyId='+supplyId).then((res) => {
    var html = template('bidding-detail', {bizNo:bizNo,data:res.data});
    $(".price-table").html(html);
  });

  get('/api/supply_chain/myNoticeAccessories/getSupplyEvaluationName?noticeId='+id+'&supplyId='+supplyId).then((res) => {
    var html = template('accessoriesName', res.data[0]);
    $(".information-tips").html(html);
  });
    /**
      * bidding-result.html
      */
     $("#bidding-result .tcdPageCode").createPage({
        pageCount: 100,
        current: 1,
        backFn: function (p) {
            // 分页的回调函数
            console.log(p);
        }
    });

    $('#bidding-result-record').on('click', function () {
        $('#bidding-result').show();
    })


    /**
     * bidding-details.html
     */
    $("#bidding-detail .tcdPageCode").createPage({
        pageCount: 100,
        current: 1,
        backFn: function (p) {
            // 分页的回调函数
            console.log(p);
        }
    });

  $('#bidding-detail-record').on('click', function () {
    var str='<span>报价记录</span>竞价编号:'+bizNo;
    $(".bizNo").html(str);
    get('/api/supply_chain/noticeMaterial/getBiddingInfo?noticeId='+id).then((res) => {
      var html = template('material-biddingInfo', {bizNo:bizNo,data:res.data});
      $(".bidding-table").html(html);
    });
    $('#bidding-details').show();
  })
})
