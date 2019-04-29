
$(function(){
    loadHeaderAndFooter();
});

function loadHeaderAndFooter(){
    var header = $('#header');
    if(header.length>0 && header.html().length==0){
        $('#header').load('./template/header.html', function () {
            templateNavMenu();
        });
    }
    var footer = $('#footer'); 
    if(footer.length>0 && footer.html().length==0){
        $('#footer').load('./template/footer.html');
    }
    
}

function templateNavMenu(){
    var userInfo = localStorage.getItem('userInfo');
    var hasLogin = userInfo && userInfo != null ? true : false;
    var currentPosition = window.location.pathname.substring(1);
    var obj = {
        login: hasLogin,
        currentPosition,
    }
    var html = template('nav-menu', obj);
    $(".index-nav").html(html);
    
    loadSearchType();
    
    if(hasLogin){
        obj.user = JSON.parse(userInfo).fullName;
    }
    var user = template('uesr-login', obj);
    $("#user").html(user);
    if(hasLogin){
        bindLogout();
    }
}

function loadSearchType(){
    get('/api/supply_chain/frontend/anonymous/news/listNewsTypes').then((res) => {
        var html = template('search-type', res);
        $(".search-down").html(html);
    }).then(()=>{
        $('.search-down>div').on('click', function() {
            $("#down").show();
            $('.search-down>div>img').addClass('active');
        })

        $('#down').on('click', 'li', function() {
            $('#down').hide();
            $('.search-down>div>span').text($(this).text()).attr('data', $(this).attr("data"));
            $('.search-down>div>img').removeClass('active');
        })

        $(window).on('click', function (e) {
            if (e.target.nodeName != 'LI' && $(e.target).attr('id') != 'LI') {
                $('.search-down>div>img').removeClass("active");
                $('#down').hide();
            }
        })
        $('#input_keyword').on('keypress',function(event){ 
            if(event.keyCode == 13) {  
                var keyword = $("#input_keyword").val();
                var type= $("#LI").attr("data");
                if(keyword!='' && type!=''){
                    window.open('../news_list.html?keyword=' + escape(keyword) + '#' + type);
                }
            }  
        });
        $('#btn_search').on('click', function() {
            var keyword = $("#input_keyword").val();
            var type= $("#LI").attr("data");
            if(keyword!='' && type!=''){
                window.open('../news_list.html?keyword=' + escape(keyword) + '#' + type);
            }
        })
    });
}

function bindLogout(){
    $('.logout-button').on('click', function () {
        post('/api/auth/jwt/logout').then((res)=>{
            console.log(res);
            var href = window.location.href
            if(res.status == 200){
                if (href.indexOf('pay') > -1) {
                    localStorage.clear();
                    window.location.href = './index.html'
                } else {
                    localStorage.clear();
                    window.location.reload();
                }
                
            }
        });
    })
}