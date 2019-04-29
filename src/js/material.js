$(function () {
  var id = getUrlParam("id");
  var d = JSON.parse(localStorage.getItem('userInfo'));
  var bizNo = '';
  // var supplyId ='123';
  var supplyId = d && d.supplierNo;
  var param = {};
  var list = {};
  get('/api/supply_chain/frontend/anonymous/notice/material/getOne?id=' + id).then((res) => {
    bizNo = res.data.noticeMaterial.bizNo;
    list= res;
    return post('/api/supply_chain/baseInfo/dict/1208',param);
  }).then((data) => {
    var html = template('material-detail', list.data.noticeMaterial);
    $(".information-text").html(html);
    var itemHtml = template('materialItem-detail2', {data: list.data.noticeMaterialItemList , list: data});
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

  $('#bidding-result-record').on('click', function () {
    $('#bidding-result').show();
  })

  $('.price-table').on('click', 'li', function (e) {
    console.log(123)
    $(this).parent().hide().prev().prev().val($(this).text()).parent().removeClass('active')
    window.event ? window.event.cancelBubble = true : e.stopPropagation();
    return false;
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
    var str = '<span>报价记录</span>竞价编号:' + bizNo;
    $(".bizNo").html(str);
    get('/api/supply_chain/noticeMaterial/getSupplyBiddingInfo?noticeId=' + id + '&supplyId' + supplyId).then((res) => {
      var html = template('material-biddingInfo', {
        bizNo: bizNo,
        data: res.data
      });
      $(".bidding-table").html(html);
    });
    /*var postData = {noticeId:id ,supplyId:supplyId };
    post('/api/supply_chain/myBiddingMaterialItem/getSupplyBiddingInfo',postData).then((res) => {
      var html = template('material-biddingInfo', {bizNo:bizNo,data:res.data.rows});
      $(".bidding-table").html(html);
    });*/
    $('#bidding-details').show();
  })

  //导出
  $('#bidding-detail-export').on('click', function () {
    let searchData = '';
    searchData += `&noticeId=${id}`;
    window.open(
      `api/supply_chain/noticeMaterial/export?token=${localStorage.getItem(
        'user-token',
      )}${searchData}`,
      'blank',
    );
  })
  // 填写提交
  $('.price-table').on('click', '.price-button', function () {
    var d = JSON.parse(localStorage.getItem('userInfo'))
    if (d) {
      var mains = {};
      var submitMaps = {};
      var arr = [];
      $('tbody tr').each(function () {
        var item = {}
        $(this).children('td').each(function () {
          if ($(this).attr('class').indexOf('disabled') > -1) {
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
      post('/api/supply_chain/myBiddingMaterialItem/add', postData).then((res) => {
        if (res.status === 200) {
          alert(res.message);
        }
      });
      // 提交数据
      console.log(arr)
    } else {
      $('.model-login').show();
    }
  })
  // 总计
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
  var d = JSON.parse(localStorage.getItem('userInfo'));
  var id = getUrlParam("id");
  var mapList = [];
  var main = {};
  var submitMap = {};
  /*main.supplyId = d.supplierNo;*/
  main.supplyId = '123';
  main.supplyName = d && d.fullName;
  console.log(list.noticeMaterialItemList);
  for (var i = 0; i < list.noticeMaterialItemList.length; i++) {
    var map = {};
    list.noticeMaterialItemList[i];
    map.materialName = list.noticeMaterialItemList[i].原粮名称;
    map.destName = list.noticeMaterialItemList[i].目的地名称;
    map.unit = list.noticeMaterialItemList[i].单位;
    map.packageType = list.noticeMaterialItemList[i].包装类型;
    map.amount = list.noticeMaterialItemList[i].需求量;

    map.biddingType = list.noticeMaterialItemList[i].报价类型;
    map.destAddr = list.noticeMaterialItemList[i].交货地;
    map.outPrice = list.noticeMaterialItemList[i].出厂价;
    // map.freight = list.itemList[i].运费;
    map.biddingPrice = list.noticeMaterialItemList[i].报价;
    map.supplyAmount = list.noticeMaterialItemList[i].供货量;
    map.mainId = id;
    mapList.push(map);
  }
  submitMap.main = main;
  submitMap.itemList = mapList;
  console.log(main);
  console.log(mapList);

  var postData = submitMap;
  post('/api/supply_chain/myBiddingMaterialItem/add', postData).then((res) => {
    if (res.status === 200) {
      alert(res.message);
    }
  });
}
