
$(function() {
	function camera() {
		$('canvas').remove();
		$('#center').removeAttr('disabled');
		navigator.mediaDevices.getUserMedia(constraints)
		.then(function(stream) {
			$('#camera').remove();
			$('body').append('<video autoplay id="camera"></video>');
			$('#camera').css('padding', 0);
			var video = document.querySelector('video');
			video.srcObject = stream;

			const track = stream.getVideoTracks()[0];
			imgCap = new ImageCapture(track);
			$('.title').text('');
			$('.pageloader').removeClass('is-active');
		}).catch(function(err) {
			$('.title').text('');
			$('.pageloader').removeClass('is-active');
			console.log(err);
			Swal.fire({
				type: 'error',
				title: 'Cannot Access Device Camera',
				text: 'An error occurred while accessing your device\'s camera',
			});
			$('video').remove();
			$('#center').attr('disabled', 'disabled');
			$('#camera').append('<div id="warning"><span class="icon is-large is-block">\n<span class="fa-stack fa-lg">\n<i class="fas fa-camera fa-stack-1x has-text-black"></i>\n<i class="fas fa-exclamation-triangle fa-stack-2x"></i></span></span></div>');
			$('#warning').append('LinEase had a problem accessing your device\'s camera. Please refresh and try again.<br>If problem persists, we recommend changing browsers.');
		});
	}

	var imgCap, w, h, lat, lng;
	const constraints = {
		audio: false,
		video: {
			width: {ideal: 720},
			height: {ideal: 720},
			facingMode: {ideal: 'environment'}
		},
	};

  // Create Custom Select Dropdown with Thumbnails
  $.widget( "custom.iconselectmenu", $.ui.selectmenu, {
  	_renderItem: function( ul, item ) {
  		var li = $( "<li>" ),
  		wrapper = $( "<div>", { text: item.label, "data-img": item.element.attr("data-img") } );

  		if ( item.disabled ) {
  			li.addClass( "ui-state-disabled" );
  		}

  		$( "<span>", {
  			style: item.element.attr( "data-style" ),
  			"class": "ui-icon " + item.element.attr( "data-class" )
  		}).appendTo( wrapper );

  		return li.append( wrapper ).appendTo( ul );
  	}
  });
  $('#severity').iconselectmenu().iconselectmenu('menuWidget').addClass('ui-menu-icons avatar');
  $('#severity-button').css('height', '40px');
  $('.modal-card-body').bind('touchmove', function(e) {
  	if ($('.ui-selectmenu-menu').hasClass('ui-selectmenu-open')) {
  		e.preventDefault();
  	}
  });
  $(window).click(function() {
  	if ($('.ui-selectmenu-menu').hasClass('ui-selectmenu-open')) {
  		$('.modal-card-body').addClass('no-scroll');
  	} else {
  		$('.modal-card-body').removeClass('no-scroll');
  	}
  });


  $('html').addClass('has-navbar-fixed-bottom');
  $('#center').attr('disabled', 'disabled');
  $('#right').addClass('inactive');
  $('.pageloader').addClass('is-active');

  if (!Modernizr.getusermedia) {
  	Swal.fire({
  		type: 'warning',
  		title: 'Unsupported Browser',
  		text: 'Your browser does not support getUserMedia according to Modernizr.',
  	});
  	$('#camera').append('<div id="warning"><span class="icon is-large is-block">\n<span class="fa-stack fa-lg">\n<i class="fas fa-camera fa-stack-1x has-text-black"></i>\n<i class="fas fa-ban fa-stack-2x"></i></span></span></div>');
  	$('#warning').append('LinEase cannot access your device\'s camera through this broswer. We recommend Google Chrome for more browser feature supports.');
  } else {
  	$('.title').text('Checking Geolocation');
  	if (navigator.geolocation) {
  		$('.title').text('Initializing Camera');
  		camera();
  	} else {
  		Swal.fire({
  			type: 'warning',
  			title: 'Unsupported Browser',
  			text: 'Your browser does not support Geolocation. Try switching broswers.',
  		});
  		$('#camera').append('<div id="warning"><span class="icon is-large is-block">\n<span class="fa-stack fa-lg">\n<i class="fas fa-map-marker-alt fa-stack-1x has-text-black"></i>\n<i class="fas fa-exclamation-triangle fa-stack-2x"></i></span></div>');
  		$('#warning').append('LinEase cannot fetch your coordinates. Try switching browsers with more supported features.');
  	}
  }

  $('#center').click(function() {
  	console.log('Hello');
  	if ( $('#center').attr('disabled') ) {
  		console.log('Here');
  		return false;
  	} else if ( !$('canvas').length ) {
  		console.log('World');
  		$('body').append('<canvas></canvas>');
  		$('#right').removeClass('inactive');
  		const canvas = document.querySelector('canvas');
  		try {
  			imgCap.grabFrame()
  			.then(imageBitmap => {
  				canvas.width = w = imageBitmap.width;
  				canvas.height = h = imageBitmap.height;
  				canvas.getContext('2d').drawImage(imageBitmap, 0, 0);
  				$('#licon').removeClass('fa-times').addClass('fa-redo-alt');
  			}).catch(error => {
  				console.log(error);
  				Swal.fire({
  					type: 'error',
  					title: 'Cannot Capture Image',
  					text: 'An error occurred while capturing the image. Please refresh and try again.',
  				});
  				$('canvas').remove();
  				$('body').append('<div id="camera"></div>');
  				$('#camera').append('<div id="warning"><span class="icon is-large is-block">\n<span class="fa-stack fa-lg">\n<i class="fas fa-camera fa-stack-1x has-text-black"></i>\n<i class="fas fa-exclamation-triangle fa-stack-2x"></i></span></span></div>');
  				$('#warning').append('LinEase encountered an error while capturing your image. Please refresh the page and try again.<br>If problem persists, please contact us at rndccss@gmail.com');
  				$('#right').addClass('inactive');
  			});
  			$('video').remove();
  			$('#center').attr('disabled', 'disabled');
  		} catch (err) {
  			Swal.fire({
  				type: 'error',
  				title: 'Cannot Capture Image',
  				text: 'An error occurred while capturing the image. Please try again.',
  			});
  			$('canvas').remove();
  			$('body').append('<div id="camera"></div>');
  			$('#right').addClass('inactive');
  		}
  	}
  });

  $('#left').click(function() {	
  	if ( $('#licon').hasClass('fa-times') ) {	
      // Localhost Computer	
      $('.pageloader').addClass('is-active');	
      $('.title').text('Loading Dashboard');	
      window.location.href = $('#camjs').data('link');
    } else {	
    	camera();	
    	$('#licon').removeClass('fa-redo-alt').addClass('fa-times');	
    	$('#right').addClass('inactive');	
    }	
  });

  $('#right').click(function() {
  	if ( $('#right').hasClass('inactive') ) {
  		return false;
  	} else {
      // HTML5 Geolocation
      if (navigator.geolocation) {
      	navigator.geolocation.getCurrentPosition(function(position) {
      		lat = position.coords.latitude;
      		lng = position.coords.longitude;

      		$('#lat').val(lat);
      		$('#lng').val(lng);
      	});
      }
      var canvas = document.querySelector('canvas');
      var img = canvas.toDataURL('image/jpeg', 1.0);
      $('#left').addClass('inactive');
      $('#right').addClass('inactive');
      $('#center').attr('disabled', 'disabled');
      $('#createReport').addClass('is-active');
      var preview = document.getElementById('preview');
      preview.src = img;
      $('.icon.is-left img').attr('src', 'img/RLabel.png');
      $('.icon.is-left img').attr('src', 'img/S4Label.png');
      $('.icon.is-left img').attr('src', 'img/S3Label.png');
      $('.icon.is-left img').attr('src', 'img/S2Label.png');
      $('.icon.is-left img').attr('src', 'img/S1Label.png');
      $('#loader').addClass('is-hidden');
      $('.modal-card-body form').removeClass('is-hidden');
    }
  });

  $('body').click(function(e) {
  	var target = e.target;
  	if ($(target).hasClass('ui-menu-item-wrapper')) {
  		var img = $(target).data('img');
  		$('.icon.is-left img').attr('src', 'img/' + img);
  	}
  });

  $('#cancel').click(function() {
  	$('.modal').removeClass('is-active');
  	$('#left').removeClass('inactive');
  	$('#right').removeClass('inactive');
  });

  $('form').submit(function(e) {
  	e.preventDefault();
  	$('#submit').addClass('is-loading');
  	$('#cancel').attr('disabled', 'disabled');
  	var des = $('textarea').val();
  	var sev = $('#severity-button .ui-selectmenu-text').text().toUpperCase();
  	var img = $('#preview').attr('src');
  	$.ajax({
  		type: 'POST',
  		url: 'camera',
  		data: {lat:lat, lng:lng, sev:sev, des:des, img:img},
  		datatype: 'JSON',
  		success: function(response) {
  			console.log(response);
  			$('#submit').removeClass('is-loading').attr('disabled', 'disabled');
  			Swal.fire({
  				type: 'success',
  				title: response,
  				showConfirmButton: false,
  				timer: 2500,
  			}).then(function() {
  				window.location.href = '/linease-alpha/';
  			});
  		},
  		error: function(err) {
  			console.log(err);
  			$('#submit').removeClass('is-loading');
  			$('#cancel').removeAttr('disabled');
  			Swal.fire({
  				type: 'error',
  				title: 'Cannot Upload Report',
  				text: 'Something went wrong. Please try again later.',
  			});
  		}
  	});
  });
});
