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

  $('.header-nav-btn').click(function(){
    $(this).toggleClass('header-nav-btn_active');
    $(this).parent().find('.header-nav').toggleClass('header-nav_active');
    $('body').toggleClass('stop-scrolling');
  })

  var maskInputs = function(){
    $('.zip-code').mask('00000');
    $('.phone').mask('(000) 000-0000');
  };

  labelAnimation();
  maskInputs();

})

var newWindow;

var onloadCallback = function() {
    if ($("#designerCaptcha").length > 0){
      designerCaptcha = grecaptcha.render( 'designerCaptcha', {
        'sitekey' : '6LemEFcUAAAAABWy45ws1TPvrW19hzJAXLtmYj13',
      });
    };
    if ($("#quoteCaptcha").length > 0){
      quoteCaptcha = grecaptcha.render( 'quoteCaptcha', {
        'sitekey' : '6LemEFcUAAAAABWy45ws1TPvrW19hzJAXLtmYj13',
      });
    };
    if ($("#inquiryCaptcha").length > 0){
      inquiryCaptcha = grecaptcha.render( 'inquiryCaptcha', {
        'sitekey' : '6LemEFcUAAAAABWy45ws1TPvrW19hzJAXLtmYj13',
      });
    };
    if ($("#contactUsFormCaptcha").length > 0){
      contactUsFormCaptcha = grecaptcha.render( 'contactUsFormCaptcha', {
        'sitekey' : '6LemEFcUAAAAABWy45ws1TPvrW19hzJAXLtmYj13',
      });
    };
}

var submitForm = function(thisForm, captchaID){
  thisForm.find("button[type='submit']").html('submiting');
  var dataform = thisForm.serializeArray();
  var response = grecaptcha.getResponse(captchaID);
  console.log(""+response+"");
  if (response == ''){
    alert("Recaptcha is wrong!");
    grecaptcha.reset();
    thisForm.find("button[type='submit']").html('submit');
  }else {
    $.ajax({
        type: "POST",
        url: "https://homecourtadvantage.net/devsite/leadform.php",
        data: dataform,
        success: function(e) {
            thisForm.find("button[type='submit']").html('submit');
            grecaptcha.reset();
            thisForm.find('input').last().notify("Thank you for your submission!", "success", { position:"center" });
            thisForm.trigger("reset");
            if(thisForm.hasClass('designer-modal-form')){
              newWindow.location.href = 'http://www.snapsports.com/designer/';
              }
            }
        })
    }
};


$("#homepage-designer-modal button").click(function(e) {
  newWindow = window.open("","_blank");
  e.preventDefault();
  e.stopImmediatePropagation();
  var thisForm = $(this).parent('form');
  submitForm(thisForm, designerCaptcha);
});


$(".contact-us-form button").click(function(e) {
  e.preventDefault();
  e.stopImmediatePropagation();
  var thisForm = $(this).parent('form');
  submitForm(thisForm, contactUsFormCaptcha);
});

$(".contact-page-form.contact-page_quote button").click(function(e) {
  e.preventDefault();
  e.stopImmediatePropagation();
  var thisForm = $(this).parent('form');
  submitForm(thisForm, quoteCaptcha);
});

$(".contact-page-form.contact-page_inquiry button").click(function(e) {
  e.preventDefault();
  e.stopImmediatePropagation();
  var thisForm = $(this).parent('form');
  submitForm(thisForm, inquiryCaptcha);
});
