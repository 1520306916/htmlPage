$(function () {
  get('/api/supply_chain/frontend/anonymous/manual/index').then((res) => {
      var html = template('fileList', res);
      $(".guidance").html(html);
  })
})