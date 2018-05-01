$( document ).ready(function(){
  var smoothScroll = function(){
    $.scrollify({
      section : ".scrollify",
      sectionName : "section-name",
      easing: "easeOutExpo",
      setHeights: false,
      updateHash: false,
      scrollSpeed: 1000,
      offset : 0,
      overflowScroll: true,
      before:function() {},
      after:function() {}
    });
  };
  smoothScroll();
})
