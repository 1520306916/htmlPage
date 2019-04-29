 $(function () {
     // select
     $('.price-table').on('click', '.select-input', function () {
         var cls = $(this).parent().attr('class');
         console.log(cls)
         $('.global-select').removeClass("active");
         $('.global-select ul').hide();
         if (cls === 'global-select') {
             $(this).parent().addClass('active');
             $(this).next().show();
         } else {
             $(this).parent().removeClass('active');
             $(this).next().hide();
         }

     })
     $('.price-table').on('click', 'li', function (e) {
         console.log(123)
         $(this).parent().hide().prev().prev().val($(this).text()).parent().removeClass('active')
         window.event ? window.event.cancelBubble = true : e.stopPropagation();
         return false;
     })
     $(window).on('click', function (e) {
         if ($(e.target).attr('class') != 'select-input') {
             $('.global-select').removeClass("active");
             $('.global-select ul').hide();
         }
     })

     // 关闭model
     $('.model-top').on('click', 'img', function () {
         $('.model').hide();
     })

     $('.price-table').on('focus', 'input', function() {
         $('td').removeClass('active');
         $(this).parent().addClass('active');
     })
     $('.price-table').on('blur', 'input', function() {
        $('td').removeClass('active');
    })

    $('#back').click(function () {
        setTimeout(function() {
            var d = localStorage.getItem('userInfo');
            if (d) {
                templateNavMenu();
            }
        })
        $(this).parent().parent().hide();
    })
     
 })
