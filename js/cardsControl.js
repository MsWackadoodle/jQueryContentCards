$(document).ready(function() {
	$.getScript('js/cards.js', function() {});
	$(function() {
	    for ( var i=0; i<cardsData.length; i++) {
	    	$(".cards-nav").append('<li class="cards ' + cardsData[i].type + '"><div><p></p></div></li>')
	    }
	    /*var theTemplateScript = $("#hb-cards").html(); 
	    var theTemplate = Handlebars.compile(theTemplateScript);
	    $(".cards-nav").append(theTemplate(cardsData));*/
	    $(".cards-nav").children().each(function() {
	    	$(this).find('p').html($(this).index());
		});
	    if ( $('li').siblings().size() > 1 && $('li:last-child').hasClass('wide') ) {
	    	$('li:last-child').css({'left': '60px', 'width': '960px'}).prevAll().css('box-shadow', 'none')
	    } else if ( $('li').siblings().size() > 1 && $('li:last-child').hasClass('narrow') ) {
	    	$('li:last-child').css({'left': '60px'}).prevAll().css('box-shadow', 'none')
	    } else if ( $('li:last-child').hasClass('wide') ) {
	    	$('li:last-child').css({'width': '960px'})
	    } else {
	    	$('li:last-child').css({'width': '400px'})
	    }
	});
	(function() {
		$('ul').on("click", function(e) {
			if (e.shiftKey && e.altKey && $('li').siblings().size() > 0 ) {
				$('.cards-nav').append("<li class='cards wide'><div><p></p></div></li>");
				$('li:last-child > div > p').html(cardsData.length+1);
				$('li:last-child').css({'left': '60px', 'width': '960px'}).prevAll().css('box-shadow', 'none');
				cardsData.push({type:'wide'});

			} else if (e.shiftKey && e.altKey) {
				$('.cards-nav').append("<li class='cards wide'><div><p></p></div></li>");
				$('li:last-child > div > p').html(cardsData.length+1);
				$('li:last-child').css({'width': '960px'});
				cardsData.push({type:'wide'});
			}
			else if (e.shiftKey && $('li').siblings().size() > 0 ) {
				$('.cards-nav').append("<li class='cards narrow'><div><p></p></div></li>");
				$('li:last-child > div > p').html(cardsData.length+1);
				$('li:last-child').css({'left': '60px'}).prevAll().css({ 'width': '400px', 'box-shadow': 'none'});
				cardsData.push({type:'narrow'});
			} else if (e.shiftKey) {
				$('.cards-nav').append("<li class='cards narrow'><div><p></p></div></li>");
				$('li:last-child > div > p').html(cardsData.length+1);
				cardsData.push({type:'narrow'});
			}
			 else {
				$('li:last-child').remove();
				if ( $('li:last-child').hasClass('wide') && $('li').siblings().size() > 1 ) { 
					$('li:last-child').css({'width': '960px', 'left': '60px', 'box-shadow' : '-1px -1px 4px 2px rgba(0,0,0,0.1)' })
				} 

				else if ($('li:last-child').hasClass('wide')) {
					$('li:last-child').css({'width': '960px', 'box-shadow' : '-1px -1px 4px 2px rgba(0,0,0,0.1)'});
				}

				else if ( $('li:last-child').hasClass('narrow') && $('li').siblings().size() > 1 ) {
					$('li:last-child').css({'left': '60px', 'box-shadow' : '-1px -1px 4px 2px rgba(0,0,0,0.1)'});
				}

				 else { $('li').css({'left': '0px', 'box-shadow' : '-1px -1px 4px 2px rgba(0,0,0,0.1)'}) }
				cardsData.pop();
			  };
		});
	})();
});