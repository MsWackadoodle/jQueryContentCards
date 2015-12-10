$(document).ready(function() {
	$.getScript('js/cards.js');

	//DOM manipulation && static calculations for screen sizes >= 480px
	var $addWide = "<li class='cards wide'><div><p></p></div></li>";
	var $addNarr = "<li class='cards narrow'><div><p></p></div></li>";
	var $wid = $(window).width();
	var $liWid = $wid - 60 - $wid*0.02;
	var $check = $wid > 1041;
	var $checkN = $wid < 480;

	//what we get on load
	(function() {

		//create a list with .cards from an array 
	    var theTemplateScript = $("#hb-cards").html(); 
	    var theTemplate = Handlebars.compile(theTemplateScript);
	    $(".cards-nav").append(theTemplate(cardsData));

	    //enumerate cards, output goes to cards' html 
	    $(".cards-nav").children().each(function() {
	    	$(this).find('p').html($(this).index());
		});

	    //setting up an initial layout dependend on amount of cards 
	    if ( $('li').siblings().size() > 1 && $('li:last-child').hasClass('wide') ) {
	    	$('li:last-child').css({'left': '60px', 'width': '960px'}).prevAll().css('box-shadow', 'none')
	    } else if ( $('li').siblings().size() > 1 && $('li:last-child').hasClass('narrow') ) {
	    	$('li:last-child').css({'left': '60px'}).prevAll().css('box-shadow', 'none')
	    } else if ( $('li:last-child').hasClass('wide') ) {
	    	$('li:last-child').css({'width': '960px'})
	    } else { $('li:last-child').css({'width': '400px'}) }
	})();

	//self-explanatory
	(function() {
		$('ul').on('mouseleave', function() { $('body').animate({backgroundColor: '#e9e6d3'})})
			   .on('mouseenter', function() { $('body').animate({backgroundColor: '#ADD8E6'})});
	})();

	//if out of .cards, set up a new deck;
	function startOver() {
		$('ul').css('display', 'none');
		$('#startover').fadeIn('slow');
		$('body').on('click', '#btn-yes', function() {
				cardsData = [];
				$('#startover').fadeOut('slow').hide();
				$('ul').css('display', 'inline-block');
				$($addNarr).appendTo('.cards-nav').hide();
				$('li:last-child > div > p').html(cardsData.length+1);
				$('li:last-child').fadeIn('800');
				cardsData.push({type:'narrow'});
			});
		$('body').on('click', '#btn-no', function() {
				$('ul').css('display', 'none');
				$('#startover').fadeOut('slow', function() {
					$('#startover').html('<div id="full"></div>').fadeIn(1500);
				})
		});
	};

	//the function catches mouse click event and then adds/removes .cards && fires an animation 
	(function() {	
		//begin
		$('body').on('click', 'li', function(e) {
			//list isnt blank, create a wide card
			if (e.shiftKey && e.altKey) {
				$($addWide).appendTo('.cards-nav').hide();
				$('li:last-child > div > p').html(cardsData.length+1);
				($check) ? $('li:last-child').css({'width': '960px'}) : $('li:last-child').css({'width': $liWid});
				$('li:last-child').css({'left': '60px'});
				$('li:last-child').fadeIn('800', function() {
					$(this).prevAll().css('box-shadow', 'none');
				});
				cardsData.push({type:'wide'});
			} 
			//list isnt blank, create a narrow card
			else if (e.shiftKey) {
				$($addNarr).appendTo('.cards-nav').hide();
				$('li:last-child > div > p').html(cardsData.length+1);
				$('li:last-child').css({'left': '60px'}).prevAll().css({ 'width': '400px'});
				$('li:last-child').fadeIn('800', function() {
					$(this).prevAll().css('box-shadow', 'none');
				});
				cardsData.push({type:'narrow'});
			}
			//remove a card 
			else {
			 	$('li:last-child').animate({left: '250px', opacity: '0.1'}, 800, 'easeInExpo', function() {
			 		$('li:last-child').remove();
			 		//if out of .cards, ask if want to start over;
					if ( $('ul').children().size() == 1 ) {
						startOver();						
					}
					// .cards with different width management
					if ( $('li:last-child').hasClass('wide') && $('li').siblings().size() > 1 ) { 
						$('li:last-child').css({'left': '60px', 'box-shadow' : '-1px -1px 4px 2px rgba(0,0,0,0.1)' });
						($check) ? $('li:last-child').animate({'width': '960px'}, 400, 'linear')
						         : $('li:last-child').animate({'width': $liWid}, 400, 'linear'); 
					} 
					else if ($('li:last-child').hasClass('wide')) {
						$('li:last-child').css({'box-shadow' : '-1px -1px 4px 2px rgba(0,0,0,0.1)'});
						($check) ? $('li:last-child').animate({'width': '960px'}, 400, 'linear') 
						         : animate({'width': $liWid}, 400, 'linear');
					}
					else if ( $('li:last-child').hasClass('narrow') && $('li').siblings().size() > 1 ) {
						$('li:last-child').css({'box-shadow' : '-1px -1px 4px 2px rgba(0,0,0,0.1)'});
						$('li:last-child').animate({'left': '60px'}, 400, 'linear');
					}
					else { $('li').animate({left: '0px', 'box-shadow': '-1px -1px 4px 2px rgba(0,0,0,0.1)'}, 400, 'linear') }
			 	});
				cardsData.pop();
			};			
		});
	})();
});