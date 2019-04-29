$(function () {
    var FContractNo = getUrlParam("FContractNo");
    var postData = {FContractNo:FContractNo}
    var postDatas = [{FContractNo:FContractNo}]
   /* post('/api/supply_chain/frontend/myYlSupplier/poundInfo',postData).then((res) => {
        var html = template('typeList', res.data);
        $(".t-body").html(html);
        var htmls = template('list', postData);
        $(".pay-info").html(htmls);
    }).then(()=>{
        loadList(FContractNo);
    });*/
  loadList1(FContractNo);
})

function loadList(contractNo, page, limit){
    page = page ? page : 1;
    limit = limit ? limit : 10;
    var url = '/api/supply_chain/frontend/myInvoice/getHistoryList';
    url += '?contractNo=' + contractNo + "&page=" + page + '&limit=' + limit;
    get(url).then((res) => {
        var data = {
            rows : res && res.data && res.data.rows || [],
        }
        var html = template('newsList', data);
        $(".modalBodys").append(html);
      $("#paginations").createPage({
        total: res.data.total,
        page,
        limit,
        backFn:function(p){
          loadList(contractNo, p ,limit);
        }
      });
    })
}

function loadList1(contractNo, page, limit){
  page = page ? page : 1;
  limit = limit ? limit : 10;
  var postData = {FContractNo:contractNo , page:page, limit: limit, type: '0'}
  post('/api/supply_chain/frontend/myYlSupplier/poundInfo',postData).then((res) => {
    var html = template('typeList', res.data);
    $(".t-body").html(html);
    var htmls = template('list', postData);
    $(".pay-info").html(htmls);
    $("#pagination").createPage({
      total: res.data.total,
      page,
      limit,
      backFn:function(p){
        loadList1(contractNo, p ,limit);
      }
    });
  }).then(()=>{
    loadList(contractNo);
  });

}
