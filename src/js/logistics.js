$(function () {

    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
    }

    var id = getUrlParam("id");
    var bizNo='';
    var supplyId=JSON.parse(localStorage.getItem('userInfo')) && JSON.parse(localStorage.getItem('userInfo')).userId;
    get('/api/supply_chain/frontend/anonymous/notice/logist/getOne?id='+id).then((res) => {
        bizNo=res.data.main.bizNo;
        var html = template('logist-detail', res.data.main);
        $(".information-text").html(html);
        var itemHtml = template('logistitem-detail', res.data);
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
    //
    // $('#bidding-result-record').on('click', function () {
    //     $('#bidding-result').show();
    // })


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
        get('/api/supply_chain/myNoticeLogist/getSupplyBiddingInfo?noticeId='+id+'&supplyId='+supplyId).then((res) => {
            var html = template('logist-biddingInfo', {bizNo:bizNo,data:res.data});
            $(".bidding-table").html(html);
        });
        $('#bidding-details').show();
    })
    // 关闭model
    $('.model-top').on('click', 'img', function () {
        $('#bidding-details').hide();
    })
    $('#bidding-export').on('click', function () {
        var utoken=localStorage.getItem('user-token');
        window.open(
            'api/supply_chain/myNoticeLogist/export?noticeId='+id+'&token='+utoken,
            'blank',
        );
    })

    $('#submit_bidding').on('click', function () {
        var trList = $("#bidding_item_list").children("tr")
        var result={},main={};
        main.noticeNo=bizNo;
        main.supplyId=JSON.parse(localStorage.getItem('userInfo')) && JSON.parse(localStorage.getItem('userInfo')).userId;
        main.supplyName=JSON.parse(localStorage.getItem('userInfo')) && JSON.parse(localStorage.getItem('userInfo')).fullName;
        result.main=main;
        var itemList = [];
        for (var i=0;i<trList.length;i++) {
            var jsonObj = {};
            var tdArr = trList.eq(i).find("td");
            jsonObj.noticeId=id;
            jsonObj.originName=tdArr.eq(1).text();
            jsonObj.destName=tdArr.eq(2).text();
            jsonObj.transportName=tdArr.eq(3).text();
            jsonObj.packageName=tdArr.eq(4).text();
            jsonObj.maxPrice=tdArr.eq(5).text();
            jsonObj.quoteType=tdArr.eq(6).text();
            jsonObj.biddingPrice=tdArr.eq(7).text();
            jsonObj.dayTransportCount=tdArr.eq(8).text();
            jsonObj.description=tdArr.eq(9).text();
            itemList.push(jsonObj);
        }
        result.itemList=itemList;
        console.log('----submit--form data----',result);
        post('/api/supply_chain/myBiddingLogistItem/add',result).then((res) => {
            console.log('----result-----11111---',res);
            alert(res.message);
        });
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
            item.noticeId = id;
            arr.push(item)
        });

        mains.noticeNo=bizNo;
        mains.supplyId=JSON.parse(localStorage.getItem('userInfo')) && JSON.parse(localStorage.getItem('userInfo')).userId;
        mains.supplyName=JSON.parse(localStorage.getItem('userInfo')) && JSON.parse(localStorage.getItem('userInfo')).fullName;

        submitMaps.main = mains;
        submitMaps.itemList = arr;

        var postData = submitMaps;
        post('/api/supply_chain/myBiddingLogistItem/add',postData).then((res) => {
            alert(res.message);
        });
        // 提交数据
        console.log(arr)
    })
    // 总计
    $('.price-table').on('input', '#dayTransportCount input', function() {
        var num = 0;
        $('.price-table #dayTransportCount input').each(function() {
            if ($(this).val()){
            num += parseFloat($(this).val())
            }
        })
        $("#allmoney").text(num.toFixed(2));
    })

})
