jQuery.fn.extend({
  slideRightShow: function() {
    return this.each(function() {
        $(this).show('slide', {direction: 'right'}, 1000);
    });
  },
  slideLeftHide: function() {
    return this.each(function() {
      $(this).hide('slide', {direction: 'left'}, 1000);
    });
  },
  slideRightHide: function() {
    return this.each(function() {
      $(this).hide('slide', {direction: 'right'}, 1000);
    });
  },
  slideLeftShow: function() {
    return this.each(function() {
      $(this).show('slide', {direction: 'left'}, 1000);
    });
  }
});

jQuery.fn.slideRightHide = function( speed, callback ) {  
    this.animate({  
        width : "hide",  
        paddingLeft : "hide",  
        paddingRight : "hide",  
        marginLeft : "hide",  
        marginRight : "hide"  
    }, speed, callback );  
};  
jQuery.fn.slideRightShow = function( speed, callback ) {  
    this.animate({  
        width : "show", 
        paddingRight : "show", 
        paddingLeft : "show",  
        marginRight : "show",
        marginLeft : "show"
    }, speed, callback );  
};