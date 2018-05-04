$( document ).ready(function(){

  $("form").submit(function(e) {
    $(this).find("input[type='submit']").val('submiting');
    e.preventDefault();
        var dataform = $(this).serializeArray();
        console.log(dataform);
        $.ajax({
            type: "POST",
            url: "https://tuneyourhead.github.io/hca-new/leadform.php",
            data: dataform,
            success: function(e) {
                $("form").find("input[type='submit']").val('submit');
                grecaptcha.reset();
                $('form')[0].reset();
            }
        })
  });

  var labelAnimation = function() {
      $("input, textarea").on("focusin", function() {}, function() {
          $(this).addClass("active");
      });
      $("input, textarea").on("focusout", function() {}, function() {
          if ($(this).val() == "") {
              $(this).removeClass("active");
          }
      });
  };

  var toggleMenu = function(){
    $('.header-nav-btn').on('click', function(){
      $(this).toggleClass('header-nav-btn_active');
      $(this).parent().find('.header-nav').toggleClass('header-nav_active');
      $('body').toggleClass('stop-scrolling');
    })
  };

  var maskInputs = function(){
    $('.zip-code').mask('00000');
    $('.phone').mask('(000) 000-0000');
  };

  toggleMenu();
  labelAnimation();
  maskInputs();

})

var onloadCallback = function() {
  var recaptchas = document.querySelectorAll('div[class=g-recaptcha]');
  for( i = 0; i < recaptchas.length; i++) {
    grecaptcha.render( recaptchas[i], {
      'sitekey' : '6LemEFcUAAAAABWy45ws1TPvrW19hzJAXLtmYj13',
    });
  }
}
