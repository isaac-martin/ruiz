$(function(){
// 'use strict';

$.fn.igs = function() {
  var token = '4125349687.1677ed0.0b857da8ae1245c197bf2accff4d5009',
    num_photos = 6;

  $.ajax({
  url: 'https://api.instagram.com/v1/users/self/media/recent',
  dataType: 'jsonp',
  type: 'GET',
  data: {access_token: token, count: num_photos},
  success: function(data){
    for( x in data.data ){
      $('#igs').append('<div class="col-2_sm-4 single-ig"><a href="https://instagram.com/welltraveled.io" target=_blank><img src="'+data.data[x].images.standard_resolution.url+'"></a></div>');
    }
  },
  error: function(data){
    console.log(data);
  }
  });
}

$.fn.subscribe = function(){
  $(".subscribe-btn").click(function(){
    fbq('track', 'CompleteRegistration');
    pintrk('track', 'signup');
  });
}

$.fn.menu = function(){
  $(".menu-trigger").click(function(){
    $(".menu-slide").toggleClass("slide-open");
    $(this).toggleClass("icon-rotate");
  });
}

$.fn.signup = function(){
  $(".signup-trigger").click(function() {
    $(".signup-cont").toggleClass("slide-open");
    $(".contact-cont").removeClass("slide-open");
    fbq('track', 'Lead');
    pintrk('track', 'lead');
  });

  $(".contact-trigger").click(function() {
    $(".contact-cont").toggleClass("slide-open");
      $(".signup-cont").removeClass("slide-open");
  });

  $(".exit-slide").click(function() {
    $(".slidepanel").removeClass("slide-open");
    $(".menu-trigger").toggleClass("icon-rotate");
  });
}

$.fn.forms = function() {

var $contactForm = $('#contact-form');

 $contactForm.submit(function(e) {
 	e.preventDefault();
 	var $submit = $('input:submit', $contactForm);
 	var defaultSubmitText = $submit.val();

 	$.ajax({
 		url: '//formspree.io/hello@welltraveled.io',
 		method: 'POST',
 		data: $(this).serialize(),
 		dataType: 'json',
 		beforeSend: function() {
 		},
 		success: function(data) {
        $('.submit-success').show();
        $('.contact-form').fadeOut();
 			    setTimeout(function() {
            $(".slidepanel").removeClass("slide-open");

    }, 4000);
 		},
 		error: function(err) {
    $('.submit-fail').show();
 		}
 	});
 });

}


  $( document ).ready(function() {
      $().forms();
      $().igs();
      $().signup();
      $().menu();
      $('#mc-embedded-subscribe-form').formchimp();
  });

  var $page = $('#main'),
      options = {
        debug: true,
        prefetch: true,
        debug: true,
        cacheLength: 2,
        onStart: {
          duration: 1500, // Duration of our animation
          render: function ($container) {
            // Add your CSS animation reversing class
            $container.addClass('is-exiting');
            // Restart your animation
            smoothState.restartCSSAnimations();
          }
        },
        onReady: {
          duration: 0,
          render: function ($container, $newContent) {
            // Remove your CSS animation reversing class
            $container.removeClass('is-exiting');
            // Inject the new content
            $container.html($newContent);
          }
        },
        onAfter: function( $container ) {
            $().forms();
            $().igs();
            $().signup();
            $().menu();
            FB.XFBML.parse();
            $('#mc-embedded-subscribe-form').formchimp();
            if (window.ga)
    {
        window.ga('send', 'pageview',
            undefined !== window.location.pathname ? window.location.pathname : url);
    }
    
        }
      },
      smoothState = $page.smoothState(options).data('smoothState');
});
