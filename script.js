// SCROLL LAYOUT WITH EASING
var ScrollLayout = (function() {

	var config = {
		$sections : $( '#msl > section' ),
		$navlinks : $( '#msl > nav > a' ),
		$homenav : $( '#top-nav > a'),
		currentLink : 0,
		$body : $( 'html, body' ),
		animspeed : 1050,
		animeasing : 'easeInOutExpo'
	};

	function init() {

		config.$homenav.on( 'click', function() {
			scrollAnim( config.$sections.eq( $( this ).index() ).offset().top );
			return false;
		} );

		config.$navlinks.on( 'click', function() {
			scrollAnim( config.$sections.eq( $( this ).index() ).offset().top );
			return false;
		});

		var waypoints = $('#sec2').waypoint({
			handler: function(direction) {
				$('#navbar').fadeToggle("fast", "linear");
			},
			offset: '50%'
		});


	}

	function scrollAnim( myTop ) {
		config.$body.stop().animate( { scrollTop : myTop }, config.animspeed, config.animeasing );
	}

	return { init : init };

})();


$(document).ready(function(){
	resizeDiv();

	$('.portfolio-slider').slick({
		arrows: false,
		dots: true,
		infinite: false,
		speed: 300,
		slidesToShow: 4,
		slidesToScroll: 4,		
		responsive: [
		    {
		      breakpoint: 1024,
		      settings: {
		        slidesToShow: 3,
		        slidesToScroll: 3
		      }
		    },
		    {
		      breakpoint: 600,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 2
		      }
		    },
		    {
		      breakpoint: 480,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1
		      }
		    }
		]
	});

	$('.next-slide').click(function(){
	    $(".slick-slider").slick('slickNext');
	});

	$('.prev-slide').click(function(){
	    $(".slick-slider").slick('slickPrev');
	});


	$('.slick-slider').on('edge', function(event, slick, direction) {
		if (direction === 'left') {
			$(".next-slide").attr('src', 'https://himigatliwanag.files.wordpress.com/2016/01/slick-next-edge.png');
		}
	}).on('swipe', function(event, slick, direction){
		if (direction === 'right') {
			$(".next-slide").attr('src', 'https://himigatliwanag.files.wordpress.com/2016/01/slick-next-fill.png');
		}
	});

	$('.slick-slider').on('edge', function(event, slick, direction) {
		if (direction === 'right') {
			$(".prev-slide").attr('src', 'https://himigatliwanag.files.wordpress.com/2016/01/slick-prev-edge.png');
		}
	}).on('swipe', function(event, slick, direction){
		if (direction === 'left') {
			$(".prev-slide").attr('src', 'https://himigatliwanag.files.wordpress.com/2016/01/slick-prev-fill.png');
		}
	});


});

window.onresize = function(event) {
	resizeDiv();
};

function resizeDiv() {
	vpw = $(window).width();
	vph = $(window).height();
	$('.page-sections').css({'min-height': vph + 'px'});
};

$(function() {
		ScrollLayout.init();
});



var lastId,
    topMenu = $("#navbar"),
    topMenuHeight = topMenu.outerHeight()+15,
    menuItems = topMenu.find("a"),
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

menuItems.click(function(e){
  var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
  $('html, body').stop().animate({ 
      scrollTop: offsetTop
  }, 300);
  e.preventDefault();
});

$(window).scroll(function(){
   var fromTop = $(this).scrollTop()+topMenuHeight;
   
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   
   if (lastId !== id) {
       lastId = id;
       menuItems
         .parent().removeClass("active")
         .end().filter("[href='#"+id+"']").parent().addClass("active");
   }                   
});