$(function () {
  templateNewsList();
})

function templateNewsList(no, page, limit) {
  var d=JSON.parse(localStorage.getItem('userInfo'));
  page = page ? page : 1;
  limit = limit ? limit : 10;
  if(no){
    /*var postData = {FContractSup:'许昌山花油脂有限公司',FToOANo: no,page:page ,limit:limit}*/
    var postData = {FContractSup:d.fullName,FToOANo: no,page:page ,limit:limit}
  }else{
   /* var postData = {FContractSup:'许昌山花油脂有限公司',page:page ,limit:limit}*/
    var postData = {FContractSup:d.fullName,page:page ,limit:limit}
  }
  post('/api/supply_chain/frontend/myYlSupplier/getContractInfo',postData).then((res) => {
    var html = template('pay-list', res.data);
    $(".my-body").html(html);
    $("#pagination").createPage({
      total: res.data.total,
      page,
      limit,
      backFn:function(p){
        templateNewsList(no, p ,limit);
      }
    });
    if(no){
      document.getElementById("inp").value = no;
    }
  });
}
