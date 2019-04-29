$(function () {
    templateNewsList();
})

function templateNewsList() {
    get('/api/supply_chain/frontend/anonymous/news/index').then((res) => {
        var html = template('news-list', res);
       $(".my-body").html(html);
    });
}
