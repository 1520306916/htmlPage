$(function () {
  var id = getUrlParam("id");
  var d=JSON.parse(localStorage.getItem('userInfo'));
  var bizNo='';
  // var supplyId ='123';
  var supplyId =d && d.supplierNo;
  var param = {};
  var list = {};
  get('/api/supply_chain/frontend/anonymous/notice/accessories/getOne?id=' + id).then((res) => {
    bizNo = res.data.main.bizNo;
    list= res;
    return post('/api/supply_chain/baseInfo/dict/1208',param);
  }).then((data) => {
    var html = template('accessories-detail', list.data.main);
    $(".information-text").html(html);
    var itemHtml = template('accessoriesItem-detail2', {data: list.data.itemList , list: data});
    $(".price-table").html(itemHtml);
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

  $('.price-table').on('click', 'li', function (e) {
    console.log(123)
    $(this).parent().hide().prev().prev().val($(this).text()).parent().removeClass('active')
    window.event ? window.event.cancelBubble = true : e.stopPropagation();
    return false;
  })

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
    get('/api/supply_chain/myNoticeAccessories/getSupplyBiddingInfo?noticeId='+id+'&supplyId='+ supplyId).then((res) => {
      var html = template('accessories-biddingInfo', {bizNo:bizNo,data:res.data});
      $(".bidding-table").html(html);
    });
   /* var postData = {noticeId:id ,supplyId:supplyId };
    post('/api/supply_chain/myBiddingAccessoriesItem/getSupplyBiddingInfo',postData).then((res) => {
      var html = template('accessories-biddingInfo', {bizNo:bizNo,data:res.data.rows});
      $(".bidding-table").html(html);
    });*/
    $('#bidding-details').show();
  })

  $('#bidding-detail-export').on('click', function () {
    let searchData = '';
    searchData += `&noticeId=${id}`;
    window.open(
      `api/supply_chain/myNoticeAccessories/export?token=${localStorage.getItem(
        'user-token',
      )}${searchData}`,
      'blank',
    );
  })

  // 提交
  $('.price-table').on('click', '.price-button', function() {
    var mains ={};
    var submitMaps ={};
    var arr = [];
    $('tbody tr').each(function () {
      var item = {}
       $(this).children('td').each(function() {
         if ($(this).text()) {
           item[$(this).attr('id')] = $(this).text();
         } else {
          item[$(this).attr('id')] = $(this).find('input').val();
         }
       })
      item.mainId = id;
       arr.push(item)
    });
    mains.supplyId = d && d.supplierNo;
    // mains.supplyId = '123';
    mains.supplyName = d.fullName;
    submitMaps.main = mains;
    submitMaps.itemList = arr;

    var postData = submitMaps;
    post('/api/supply_chain/myBiddingAccessoriesItem/add',postData).then((res) => {
      if(res.status===200){
        alert(res.message);
      }
    });
    // 提交数据
    console.log(arr)
  })
  // 获取总数
  $('.price-table').on('input', '#supplyAmount input', function() {
    var num = 0;
    $('.price-table #supplyAmount input').each(function() {
      if ($(this).val()){
        num += parseFloat($(this).val())
      }
    })
    $("#allmoney").text(num.toFixed(2));
  })
})

// 导入提交
function submit1(list) {
  var d=JSON.parse(localStorage.getItem('userInfo'));
  var id = getUrlParam("id");
  var mapList =[];
  var main ={};
  var submitMap ={};
  main.supplyId = d && d.supplierNo;
  // main.supplyId = '123';
  main.supplyName = d.fullName;
  console.log(list.itemList);
  for ( var i = 0; i <list.itemList.length; i++){
    var map ={};
    list.itemList[i];
    map.accessoriesName = list.itemList[i].辅料名称;
    map.destName = list.itemList[i].目的地名称;
    map.unit = list.itemList[i].单位;
    map.packageType = list.itemList[i].包装类型;
    map.amount = list.itemList[i].需求量;

    map.biddingType = list.itemList[i].报价类型;
    map.destAddr = list.itemList[i].生产厂家;
    map.outPrice = list.itemList[i].出厂价;
    map.freight = list.itemList[i].运费;
    map.biddingPrice = list.itemList[i].报价;
    map.supplyAmount = list.itemList[i].供货量;
    map.mainId = id;
    mapList.push(map);
  }
  submitMap.main = main;
  submitMap.itemList = mapList;

  var postData = submitMap;
  post('/api/supply_chain/myBiddingAccessoriesItem/add',postData).then((res) => {
    if(res.status===200){
      alert(res.message);
    }
  });
}
