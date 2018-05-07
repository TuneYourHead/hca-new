$( document ).ready(function(){

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

$("form").submit(function(e) {
  var thisForm = $(this);
  thisForm.find("button[type='submit']").html('submiting');
  e.preventDefault();
  var dataform = thisForm.serializeArray();
  if ("" == grecaptcha.getResponse()){
    alert("Recaptcha is wrong!");
  }else {
    $.ajax({
        type: "POST",
        url: "https://homecourtadvantage.net/devsite/leadform.php",
        data: dataform,
        success: function(e) {
            thisForm.find("button[type='submit']").html('submit');
            grecaptcha.reset();
            $.notify("Thank you for submission!", "success");
            thisForm.trigger("reset");
            if(thisForm.hasClass('designer-modal-form')){
              window.open('http://www.snapsports.com/designer/', '_blank');
            }
            }
        })
    }
});
