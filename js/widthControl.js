$(document).ready(function() {
	var $wid = $(window).width();
	var $liWid = $wid - 60 - $wid*0.02;
	if ( $wid < 1041 ) {
		$('ul').css({'width': $liWid}).children().each(function() {
			switch($(this).hasClass('wide')) {
			case true:
				$(this).css({'width': $liWid})
				break;
			default: 
				break;
			};
		});
	}  

});