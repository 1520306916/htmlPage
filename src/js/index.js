$(function () {
    var mySwiper = new Swiper('.swiper-container', {
        loop: true, // 循环模式选项
        autoplay: true,
        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
            clickable :true,
        },
    })
    templateNoticeList();
    templateCgzc();
    $('.swiper-container').mouseover(function(){ //鼠标放上暂停轮播
        mySwiper.autoplay.stop();
    }).mouseleave(function(){
        mySwiper.autoplay.start();
    })
})

//初始化公告列表
function templateNoticeList() {
    get('/api/supply_chain/frontend/anonymous/notice/index').then((res) => {
        var html = template('list', res);
        $(".index-left").html(html);
    });
}

// 右上角采购政策初始化
function templateCgzc(){
    get('/api/supply_chain/frontend/anonymous/news/listByType?typeCode=1201002&limit=5').then((res) => {
        var html = template('cgzc', res.data);
        $(".index-right-ul").html(html);
    });
}


