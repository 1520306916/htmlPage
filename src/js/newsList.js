$(function () {
    var currentType = document.location.hash.substr(1);
    var keyword = getUrlParam("keyword");
    console.log(keyword);
    get('/api/supply_chain/frontend/anonymous/news/listNewsTypes').then((res) => {
        var html = template('typeList', {
            res, currentType
        });
        $(".new-nav").html(html);
    }).then(()=>{
        loadList(currentType, keyword);
    });

    $('.new-nav').on('click', 'li', function() {
        $(this).addClass('active').siblings().removeClass('active')
        loadList($(this).attr("key"));
        window.location.replace('#' + $(this).attr("key"))
    })
})

function loadList(typeCode, keyword, page, limit){
    page = page ? page : 1;
    limit = limit ? limit : 10;
    var url = '/api/supply_chain/frontend/anonymous/news/listByType';
    get(url,{
        typeCode, 
        title: keyword,
        page,
        limit,
    }).then((res) => {
        var data = {
            rows : res && res.data && res.data.rows || [],
        }
        var html = template('newsList', data);
        $(".new-list").html(html);
        $("#pagination").createPage({
            total: res.data.total,
            page,
            limit,
            backFn:function(p){
                loadList(typeCode, keyword, p ,limit);
            }
        });
    })
}
