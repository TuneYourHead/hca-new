$( document ).ready(function(){

  $("form").submit(function(e) {
    $(this).find("input[type='submit']").val('submiting');
    if (e.preventDefault(), "" == grecaptcha.getResponse()) alert("Recaptcha is wrong!");
    else {
        var dataform = $(this).serializeArray();
        console.log(dataform);
        $.ajax({
            type: "POST",
            url: "https://homecourtadvantage.net/dev/leadform.php",
            data: dataform,
            success: function(e) {
                $("#thankyou_message").css("display", "block");
                $("form").find("input[type='submit']").val('submit');
                grecaptcha.reset();
                $('form')[0].reset();
            }
        })
    }
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
  }
  toggleMenu();
  labelAnimation();

  $('.zip-code').mask('00000');
})
