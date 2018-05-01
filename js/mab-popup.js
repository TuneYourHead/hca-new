$( document ).ready(function(){
  $("body").prepend("<div class='darkOverlay' style='display: none'></div>");
  var actionButton = $('button').filter("[data-pop]");
  actionButton.on("click", function(){
    var currentActionButton = $(this);
    var targetId = '#' + ($(this).attr("data-pop"));
    var AnimationIn = ($(""+targetId+"").attr("data-pop-animation"));
    var AnimationOut = ($(""+targetId+"").attr("data-pop-animation-out"));
    var targetAnimationIn = function(){
      $(""+targetId+"").addClass(""+AnimationIn+"");
      $(""+targetId+"").addClass("animated");
      setTimeout(function(){
        $(""+targetId+"").removeClass(""+AnimationIn+"");
      }, 1000);
    }
    var targetAnimationOut = function(){
      $(""+targetId+"").removeClass("animated");
      $(""+targetId+"").addClass(""+AnimationOut+"");
      $(""+targetId+"").addClass("animated");
      $(".darkOverlay").fadeOut();
      setTimeout(function(){
        $(""+targetId+"").removeClass(""+AnimationOut+"");
        $(""+targetId+"").css("display", "none");
      }, 1000);
    }
    if($(""+targetId+"").is(':hidden')){
      if($(""+targetId+"").hasClass("darkOverlayOn")){
        $(".darkOverlay").fadeIn();
      }
      if($(this).filter("[data-pop-animation]")){
        targetAnimationIn();
      }
      $(""+targetId+"").fadeIn();
    }else{
      if($(this).attr("data-pop-out")){
        if($(this).filter("[data-pop-animation-out]")){
          targetAnimationOut();
        }
        $(""+targetId+"").fadeOut();
      }
    }
    $(".darkOverlay").on("click", function(){
      targetAnimationOut();
    });
  });
})
