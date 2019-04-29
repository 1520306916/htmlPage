$(function() {
  var userName = '';
  var password = '';
  $('#submit').on('click', function() {
    localStorage.clear();
      userName = $('#userName input').val();
      password = $('#password input').val();
      if (!userName) {
          $('#username-err').show();
          return false;
      } else if (!password) {
          $('#password-err').show();
          return false;
      }
      login(userName, password);
    });

  $('.login-form').on('input propertychange', 'input', function() {
      $('#password i').hide();
  })
})
// 登录请求
function login(username, password) {
  $('#submit').attr("disabled","disabled").addClass('disabled');
  
  post('/api/auth/jwt/token',{
    username,
    password,
    appCode: 'supply-chain',
  }).then((res) => {
    if(res && res.status==200){
      console.log('登录成功');
      loginCallBack(res.data);
    }else{
      var msg = res ? res.message : '未知错误';
      $('#err').html(msg).show();
      $('#submit').removeAttr("disabled").removeClass('disabled');
    }
  });
}
// 登录成功处理
function loginCallBack(data){
  var tk = data.rows[0];
  localStorage.setItem('user-token', tk.token);
  localStorage.setItem('refreshToken', tk.refreshToken);
  //TODO 定时

  getUserInfo();
}
// 获取用户信息
function getUserInfo(){
  get('/api/admin/user/front/info?appCode=supply-chain').then((res) => {
    return res;
  }).then((user)=>{
    get('/api/supply_chain/frontend/supplierInfo/getInfo?id='+user.corpId).then((res) => {
      var supplierInfo = res.data;
      var userInfo = {
        fullName: user.name,
        userId: user.id,
        supplierNo: supplierInfo.no,
        identifyNumber: supplierInfo.identifyNumber,
      };
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }).then(()=>{
      $('#submit').removeAttr("disabled").removeClass('disabled');
      var d=JSON.parse(localStorage.getItem('userInfo'));
      console.log(d && d.userId);
      jumpUrl()
    });
  });
}

function jumpUrl() {
  var back = getUrlParam('back');
  if (back === "0") {
    parent.$(window.parent.document).find('#back').click();
  } else {
    window.top.location.href='/index.html';
  }
}
