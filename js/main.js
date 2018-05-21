$( document ).ready(function(){
  var portfolioFilter = $('.portfolio-filter-item[data-filter]');
  var portfolioImage = $('.portfolio-list-item[data-category]')

  portfolioFilter.on('click', function(e){
    e.preventDefault();
    var filterType = $(this).attr('data-filter');
    $('.portfolio-filter-item').removeClass('active');
    $(this).addClass('active');
    if (filterType == "all") {
      portfolioImage.fadeIn(500);
      $('.blog-posts-pagination').fadeIn(500);
      var fancyboxFilter = portfolioImage.attr('data-fancybox', 'gallery');
    } else {
      portfolioImage.hide();
      $('.blog-posts-pagination').hide();
      portfolioImage.filter('[data-category = "' + filterType + '"]').fadeIn(500);
      var fancyboxFilter = portfolioImage.filter('[data-category = "' + filterType + '"]').attr('data-fancybox', ''+filterType+'');
    }
    return false;
  })

  function removeHash () {
    history.pushState("", document.title, window.location.pathname + window.location.search);
  };

  $(".blog-posts-item-btn").click(function(e){
    $('.blog-page-category-item').removeClass('active');
    var currentPost = $(this).parent();
    var filterType = currentPost.attr('data-category');
    var nextPost = currentPost.next(['+filterType+']);
    $('.blog-page-category-item').filter('[data-filter = "' + filterType + '"]').addClass("active");
    var pageHash = currentPost.attr('data-post-name');
    e.preventDefault();
    $(".blog-posts-item, .blog-posts-pagination").hide();
    $(".blog-post-item").fadeIn(500);
    $.get("../blog/post/"+pageHash+".html", function(data) {
        $(".blog-post-item-content").html(data);
    });
    $('html, body').animate({
        scrollTop: $('.blog-post-item').offset().top - 20
    }, 'slow');
    document.location.hash = pageHash;
  });

  if(window.location.hash) {
      var hash = window.location.hash.substring(1);
      $(".blog-posts-item").filter('[data-post-name = "' + hash + '"]').find('.blog-posts-item-btn')[0].click();
  }

  var categoryItem = $('.blog-page-category-item [data-filter]');
  var blogPosts = $('.blog-posts [data-category]');

  $('.blog-post-back').click(function(e){
    e.preventDefault();
    $('.blog-post-item').hide();
    blogPosts.fadeIn(500);
    $('.blog-posts-pagination').fadeIn(500);
    removeHash();
    $('html, body').animate({
        scrollTop: $('.blog-posts').offset().top - 20
    }, 'slow');
    $('.blog-page-category-item').removeClass('active');
    $('.blog-page-category-item').filter('[data-filter = "all"]').addClass("active");
  })

  $('.blog-page-category-item').click(function (e) {
    e.preventDefault();
    var filterType = $(this).attr('data-filter');
    $('.blog-page-category-item').removeClass('active');
    $('.blog-post-item').hide();
    removeHash();
    $(this).addClass('active');
    if (filterType == "all") {
      blogPosts.fadeIn(500);
      $('.blog-posts-pagination').fadeIn(500);
    } else {
      blogPosts.hide();
      $('.blog-posts-pagination').hide();
      blogPosts.filter('[data-category = "' + filterType + '"]').fadeIn(500);
    }
    return false;
  });

  var slickInit = function(){
      $('section.residential-indoor-icons').slick({
        infinite: false,
        mobileFirst: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: '<div class="residential-indoor-icons_next"><?xml version="1.0" encoding="utf-8"?><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 477.2 480.7" style="enable-background:new 0 0 477.2 480.7;" xml:space="preserve"><g><path d="M360.7,230.8L135.6,5.7c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1L332,240.3L116.5,455.8c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.9,244.6,365.9,236,360.7,230.8z"/></g></svg></div>',
        prevArrow: '<div class="residential-indoor-icons_prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 477.2 477.2"><path d="M145.2 238.6L360.7 23c5.3-5.3 5.3-13.8 0-19.1s-13.8-5.3-19.1 0L116.5 229a13.5 13.5 0 0 0 0 19.2l225 225c2.7 2.6 6.2 4 9.6 4s6.9-1.3 9.5-4a13.5 13.5 0 0 0 0-19.1L145.2 238.6z"/></svg></div>',
        responsive: [{
          breakpoint: 500,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 1
          }
        },{
          breakpoint: 1000,
          settings: "unslick"
        }]
      });
  };

  var highlightCurrentPage = function(){
    //get current location to highlight header links
      var current = window.location.href.split('#')[0];
      console.log(current);
      var parts = current.split('/');
      var lastSegment = parts.pop() || parts.pop();
      console.log(lastSegment);
      $('.header-nav-item a[href$="https://homecourtadvantage.net/devsite/'+lastSegment+'"]').parent('.header-nav-item').addClass('header-nav-item_active');
      $('.footer-nav-list-item a[href$="https://homecourtadvantage.net/devsite/'+lastSegment+'"]').parent('.footer-nav-list-item').addClass("footer-nav-list-item_active");
      $('.header-nav-item a[href$="https://homecourtadvantage.net/'+lastSegment+'"]').parent('.header-nav-item').addClass('header-nav-item_active');
      $('.footer-nav-list-item a[href$="https://homecourtadvantage.net/'+lastSegment+'"]').parent('.footer-nav-list-item').addClass("footer-nav-list-item_active");
  };

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

  highlightCurrentPage();
  labelAnimation();
  maskInputs();
  slickInit();

  $.fancybox.defaults.btnTpl.arrowRight = '<a data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}" href="javascript:;">' +
  '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" style="fill:#ff4c00;" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.2 480.7" xml:space="preserve"><g><path style="fill:#ff4c00;" d="M360.7,230.8L135.6,5.7c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1L332,240.3L116.5,455.8c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.9,244.6,365.9,236,360.7,230.8z"></path></g></svg>'+
  '</a>';
  $.fancybox.defaults.btnTpl.arrowLeft = '<a data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREVIOUS}}" href="javascript:;">' +
  '<svg xmlns="http://www.w3.org/2000/svg"  style="fill:#ff4c00;" viewBox="0 0 477.2 477.2"><path style="fill:#ff4c00;" d="M145.2 238.6L360.7 23c5.3-5.3 5.3-13.8 0-19.1s-13.8-5.3-19.1 0L116.5 229a13.5 13.5 0 0 0 0 19.2l225 225c2.7 2.6 6.2 4 9.6 4s6.9-1.3 9.5-4a13.5 13.5 0 0 0 0-19.1L145.2 238.6z"></path></svg>'+
  '</a>';
  $.fancybox.defaults.btnTpl.close = '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}">' +
  '<i class="designer-modal-close" data-pop-out="homepage-designer-modal"></i>'+
  '</button>';


  $('a.portfolio-list-item').fancybox({
    infobar: false,
    buttons: [
    //"zoom",
    //"share",
    //"slideShow",
    //"fullScreen",
    //"download",
    //"thumbs",
    "close"
    ],
  });
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
              $('.designer-modal-hidden-link').show();
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
