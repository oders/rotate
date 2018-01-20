function initLightbox(selector){
	$(selector).magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: true,
		fixedContentPos: true,
		mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
		tLoading: 'Lade Bild #%curr%...',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1], // Will preload 0 - before current, and 1 after the current image
			tCounter: '<span class="mfp-counter">%curr% von %total%</span>'
		},
		image: {
			verticalFit: true,
			titleSrc: function(item) {

				if (item.el.attr('data-lightbox-description')) {
					var description = item.el.attr('data-lightbox-description');
				} else {
					var description = item.el.context.parentElement.children[1] ? item.el.context.parentElement.children[1].firstChild.data : false;
				}

				if(description){
					return description;
				}else{
					return null;
				}
			}
		},
		zoom: {
			enabled: true,
			duration: 300 // don't foget to change the duration also in CSS
		},
		callbacks: {
			open: function() {
				$('body').swipe( {
					swipe:function(event, direction) {
						if(direction === 'right'){
							$('.mfp-arrow-left').click();
						}
						if(direction === 'left'){
							$('.mfp-arrow-right').click();
						}
					},
					threshold:0
				});
			},
			close: function() {
				$('body').swipe('destroy');
			}
		}
	});
}

$(document).ready(function(){
	if($('.image-lightbox').length){
		initLightbox('.image-lightbox');
	}
});