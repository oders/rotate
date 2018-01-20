
$(document).ready(function () {
	initNavigation();
	initMobileNavigation();
});

function initNavigation() {
	var layerOpen = false;
	var layerLevel2Open = false;

	$('.navigation-list__item[data-dropdown="true"] > a').on('click', function () {
		var _this = $(this);

		if (layerOpen) {
			if (_this.parent().hasClass('navigation-list__item--dropdown-open')) {
				_this.parent().toggleClass('navigation-list__item--dropdown-open');
				_this.parent().find('.navigation-list__dropdown').toggle();

				layerOpen = false;
			} else {
				$('.navigation-list__item--dropdown-open > .navigation-list__dropdown').stop().toggle();
				$('.navigation-list__item--dropdown-open').toggleClass('navigation-list__item--dropdown-open');

				layerOpen = false;
				_this.click();
				_this.parent().addClass('navigation-list__item--dropdown-open');
			}

			/** reset level-2 accordions **/
			$('.navigation-list__item--level-2').removeClass('navigation-list__item--dropdown-open').find('> .navigation-list').removeAttr('style');
			layerLevel2Open = false;

		} else {
			layerOpen = true;
			_this.parent('li').toggleClass('navigation-list__item--dropdown-open');
			_this.parent().find('.navigation-list__dropdown').toggle();
		}

		//close active header-submenu
		$('.header-submenu').find('.active').click();


		$('body').toggleClass('overlay');
		return false;
	});

	/** clickevent on document to close layer if open **/
	$(document).on('click touchstart', function (e) {
		if (layerOpen && e.which !== 3) {
			$('.navigation-list__item--dropdown-open > a').click();

			if($('#mobile-toggle').hasClass('mobile-toggle__icon--open')){
				$('#mobile-toggle').click();
			}
		}
	});

	/** stop click triggering on .navigation-section__layer-wrapper **/
	$('.navigation-list, .mobile-toggle').on('click touchstart', function (e) {
		e.stopPropagation();
	});


	/** level 2 accordion on mobile **/
	$('.navigation-list__headline').click(function (){
		if($(window).width() < 769){
			var _this = $(this);

			if(layerLevel2Open){
				if (_this.parent().hasClass('navigation-list__item--dropdown-open')) {
					_this.parent().toggleClass('navigation-list__item--dropdown-open');
					_this.parent().find('> .navigation-list').toggle();
					layerLevel2Open = false;
				} else {
					$('.navigation-list__item--level-2.navigation-list__item--dropdown-open').find('> .navigation-list').stop().toggle();
					$('.navigation-list__item--level-2.navigation-list__item--dropdown-open').removeClass('navigation-list__item--dropdown-open');
					layerLevel2Open = false;
					_this.click();
					_this.parent().addClass('navigation-list__item--dropdown-open');
				}

			}else{
				layerLevel2Open = true;
				_this.parent().toggleClass('navigation-list__item--dropdown-open');
				_this.parent().find('> .navigation-list').toggle();
			}
			return false;
		}
	});
}

function initMobileNavigation(){
	$('#mobile-toggle').click(function (){

		//close active mobile-slides
		if($('.mobile-toggle').find('.active').index() > -1){
			$('.mobile-toggle').find('.active').click();
			$('body,html').animate({
				scrollTop: 0
			}, 150);
		}

		//remove overlay if set or toggle mobile navigation
		if($('body').hasClass('overlay')){
			$(document).click();
		}else{
			$('.navigation').stop().slideToggle(150);
			$(this).toggleClass('mobile-toggle__icon--open').toggleClass('mobile-toggle__icon--close');
		}

		return false;
	});
}
(function ($){
	var $window = $(window);
	var $navigationSub = $('.navigation-sub');
	var $navigationSubHeadline = $('.navigation-sub__headline');

	$(document).ready(function () {
		var winWidth = $window.width();
		var countSubPoints = $navigationSub.find('li ul.navigation-sub').children().length;
		var activeSubTitle = $navigationSub.find('li ul.navigation-sub li.navigation-sub__item--active').text();

		if (countSubPoints === 1 && $navigationSub.find('li ul.navigation-sub .navigation-sub__item--active').length) {
			$navigationSub.addClass('navigation-sub--single-active');
		}
		else {
			$navigationSub.find('span.navigation-sub__headline a').append('<span class="navigation-sub__headline--mobile">'+ activeSubTitle +'</span>');
		}

		$window.resize(function () {
			winWidth = $window.width();
		});

		$navigationSubHeadline.on('click', function () {
			$navigationSub.find('.navigation-sub').toggleClass('navigation-sub--dropdown-open');
			$navigationSub.find('.navigation-sub__headline').toggleClass('navigation-sub--dropdown-close-icon');

			if (winWidth < 769) {
				return false;
			}
		});
	});
})(jQuery);
(function ($){
	var speed = 150;
	var active;
	var current;

	var $mobileClickButtons = $('.header-submenu__icon, .mobile-toggle__icon');
	var $mobileToggle = $('.mobile-toggle');
	var $closeButton = $('.close-button');

	function initHeadSubmenu(){
		$mobileClickButtons.click(function (){
			var data = $(this).data("content");

			if($('#'+data).index() > -1) {
				//closes active Slides
				$(this).parent().siblings().find('.active').click();

				//closes mobile-toggle
				$mobileToggle.find('.mobile-toggle__icon--open').click();

				//closes the main-menu if open
				if($('body').hasClass('overlay')){
					$(document).click();
				}

				$('#' + data).slideToggle(speed, function (){
					if(data === 'search'){
						$('#search-field').focus();
					}
				});
				$('[data-content="'+data+'"]').toggleClass('active');
			}

			return false;
		});

		$closeButton.click(function (){
			var id = $(this).parent().parent().attr('id');
			$('.header-submenu__icon[data-content="'+id+'"]').click();
			return false;
		});
	}

	$(document).ready(function(){
		initHeadSubmenu();
	});
})(jQuery);
/*!
 * jQuery Accordion 0.0.1
 * (c) 2014 Victor Fernandez <victor@vctrfrnndz.com>
 * MIT Licensed.
 */

;(function ( $, window, document, undefined ) {

	var pluginName = 'accordion',
		defaults = {
			transitionSpeed: 300,
			transitionEasing: 'ease',
			controlElement: '[data-control]',
			contentElement: '[data-content]',
			groupElement: '[data-accordion-group]',
			singleOpen: true
		};

	function Accordion(element, options) {
		this.element = element;
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	Accordion.prototype.init = function () {
		var self = this,
			opts = self.options;

		var $accordion = $(self.element),
			$controls = $accordion.find('> ' + opts.controlElement),
			$content =  $accordion.find('> ' + opts.contentElement);

		var accordionParentsQty = $accordion.parents('[data-accordion]').length,
			accordionHasParent = accordionParentsQty > 0;

		var closedCSS = { 'max-height': 0, 'overflow': 'hidden' };

		var CSStransitions = supportsTransitions();

		function debounce(func, threshold, execAsap) {
			var timeout;

			return function debounced() {
				var obj = this,
					args = arguments;

				function delayed() {
					if (!execAsap) func.apply(obj, args);
					timeout = null;
				};

				if (timeout) clearTimeout(timeout);
				else if (execAsap) func.apply(obj, args);

				timeout = setTimeout(delayed, threshold || 100);
			};
		}

		function supportsTransitions() {
			var b = document.body || document.documentElement,
				s = b.style,
				p = 'transition';

			if (typeof s[p] == 'string') {
				return true;
			}

			var v = ['Moz', 'webkit', 'Webkit', 'Khtml', 'O', 'ms'];

			p = 'Transition';

			for (var i=0; i<v.length; i++) {
				if (typeof s[v[i] + p] == 'string') {
					return true;
				}
			}

			return false;
		}

		function requestAnimFrame(cb) {
			if(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame) {
				return  requestAnimationFrame(cb) ||
					webkitRequestAnimationFrame(cb) ||
					mozRequestAnimationFrame(cb);
			} else {
				return setTimeout(cb, 1000 / 60);
			}
		}

		function toggleTransition($el, remove) {
			if(!remove) {
				$content.css({
					'-webkit-transition': 'max-height ' + opts.transitionSpeed + 'ms ' + opts.transitionEasing,
					'transition': 'max-height ' + opts.transitionSpeed + 'ms ' + opts.transitionEasing
				});
			} else {
				$content.css({
					'-webkit-transition': '',
					'transition': ''
				});
			}
		}

		function calculateHeight($el) {
			var height = 0;

			$el.children().each(function() {
				height = height + $(this).outerHeight(true);
			});

			$el.data('oHeight', height);
		}

		function updateParentHeight($parentAccordion, $currentAccordion, qty, operation) {
			var $content = $parentAccordion.filter('.accordion--open').find('> [data-content]'),
				$childs = $content.find('[data-accordion].accordion--open > [data-content]'),
				$matched;

			if(!opts.singleOpen) {
				$childs = $childs.not($currentAccordion.siblings('[data-accordion].accordion--open').find('> [data-content]'));
			}

			$matched = $content.add($childs);

			if($parentAccordion.hasClass('accordion--open')) {
				$matched.each(function() {
					var currentHeight = $(this).data('oHeight');

					switch (operation) {
						case '+':
							$(this).data('oHeight', currentHeight + qty);
							break;
						case '-':
							$(this).data('oHeight', currentHeight - qty);
							break;
						default:
							throw 'updateParentHeight method needs an operation';
					}

					$(this).css('max-height', $(this).data('oHeight'));
				});
			}
		}

		function refreshHeight($accordion) {
			if($accordion.hasClass('accordion--open')) {
				var $content = $accordion.find('> [data-content]'),
					$childs = $content.find('[data-accordion].accordion--open > [data-content]'),
					$matched = $content.add($childs);

				calculateHeight($matched);

				$matched.css('max-height', $matched.data('oHeight'));
			}
		}

		function closeAccordion($accordion, $content) {
			$accordion.trigger('accordion.close');

			if(CSStransitions) {
				if(accordionHasParent) {
					var $parentAccordions = $accordion.parents('[data-accordion]');

					updateParentHeight($parentAccordions, $accordion, $content.data('oHeight'), '-');
				}

				$content.css(closedCSS);

				$accordion.removeClass('accordion--open');
			} else {
				$content.css('max-height', $content.data('oHeight'));

				$content.animate(closedCSS, opts.transitionSpeed);

				$accordion.removeClass('accordion--open');
			}
		}

		function openAccordion($accordion, $content) {
			$accordion.trigger('accordion.accordion--open');
			if(CSStransitions) {
				toggleTransition($content);

				if(accordionHasParent) {
					var $parentAccordions = $accordion.parents('[data-accordion]');

					updateParentHeight($parentAccordions, $accordion, $content.data('oHeight'), '+');
				}

				requestAnimFrame(function() {
					$content.css('max-height', $content.data('oHeight'));
				});

				$accordion.addClass('accordion--open');
			} else {
				$content.animate({
					'max-height': $content.data('oHeight')
				}, opts.transitionSpeed, function() {
					$content.css({'max-height': 'none'});
				});

				$accordion.addClass('accordion--open');
			}
		}

		function closeSiblingAccordions($accordion) {
			var $accordionGroup = $accordion.closest(opts.groupElement);

			var $siblings = $accordion.siblings('[data-accordion]').filter('.accordion--open'),
				$siblingsChildren = $siblings.find('[data-accordion]').filter('.accordion--open');

			var $otherAccordions = $siblings.add($siblingsChildren);

			$otherAccordions.each(function() {
				var $accordion = $(this),
					$content = $accordion.find(opts.contentElement);

				closeAccordion($accordion, $content);
			});

			$otherAccordions.removeClass('accordion--open');
		}

		function toggleAccordion() {
			var isAccordionGroup = (opts.singleOpen) ? $accordion.parents(opts.groupElement).length > 0 : false;

			calculateHeight($content);

			if(isAccordionGroup) {
				closeSiblingAccordions($accordion);
			}

			if($accordion.hasClass('accordion--open')) {
				closeAccordion($accordion, $content);
			} else {
				openAccordion($accordion, $content);
			}
			return false;
		}

		function addEventListeners() {
			$controls.on('click', toggleAccordion);

			$controls.on('accordion.toggle', function() {
				if(opts.singleOpen && $controls.length > 1) {
					return false;
				}

				toggleAccordion();
			});

			$(window).on('resize', debounce(function() {
				refreshHeight($accordion);
			}));
		}

		function setup() {
			$content.each(function() {
				var $curr = $(this);

				if($curr.css('max-height') != 0) {
					if(!$curr.closest('[data-accordion]').hasClass('accordion--open')) {
						$curr.css({ 'max-height': 0, 'overflow': 'hidden' });
					} else {
						toggleTransition($curr);
						calculateHeight($curr);

						$curr.css('max-height', $curr.data('oHeight'));
					}
				}
			});


			if(!$accordion.attr('data-accordion')) {
				$accordion.attr('data-accordion', '');
				$accordion.find(opts.controlElement).attr('data-control', '');
				$accordion.find(opts.contentElement).attr('data-content', '');
			}
		}

		setup();
		addEventListeners();
	};

	$.fn[pluginName] = function ( options ) {
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName,
					new Accordion( this, options ));
			}
		});
	}

})( jQuery, window, document );
/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.5.7
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"undefined"!=typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){"use strict";var b=window.Slick||{};b=function(){function c(c,d){var f,e=this;e.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:a(c),appendDots:a(c),arrows:!0,asNavFor:null,prevArrow:'<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',nextArrow:'<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(a,b){return'<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">'+(b+1)+"</button>"},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},e.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},a.extend(e,e.initials),e.activeBreakpoint=null,e.animType=null,e.animProp=null,e.breakpoints=[],e.breakpointSettings=[],e.cssTransitions=!1,e.hidden="hidden",e.paused=!1,e.positionProp=null,e.respondTo=null,e.rowCount=1,e.shouldClick=!0,e.$slider=a(c),e.$slidesCache=null,e.transformType=null,e.transitionType=null,e.visibilityChange="visibilitychange",e.windowWidth=0,e.windowTimer=null,f=a(c).data("slick")||{},e.options=a.extend({},e.defaults,f,d),e.currentSlide=e.options.initialSlide,e.originalSettings=e.options,"undefined"!=typeof document.mozHidden?(e.hidden="mozHidden",e.visibilityChange="mozvisibilitychange"):"undefined"!=typeof document.webkitHidden&&(e.hidden="webkitHidden",e.visibilityChange="webkitvisibilitychange"),e.autoPlay=a.proxy(e.autoPlay,e),e.autoPlayClear=a.proxy(e.autoPlayClear,e),e.changeSlide=a.proxy(e.changeSlide,e),e.clickHandler=a.proxy(e.clickHandler,e),e.selectHandler=a.proxy(e.selectHandler,e),e.setPosition=a.proxy(e.setPosition,e),e.swipeHandler=a.proxy(e.swipeHandler,e),e.dragHandler=a.proxy(e.dragHandler,e),e.keyHandler=a.proxy(e.keyHandler,e),e.autoPlayIterator=a.proxy(e.autoPlayIterator,e),e.instanceUid=b++,e.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,e.registerBreakpoints(),e.init(!0),e.checkResponsive(!0)}var b=0;return c}(),b.prototype.addSlide=b.prototype.slickAdd=function(b,c,d){var e=this;if("boolean"==typeof c)d=c,c=null;else if(0>c||c>=e.slideCount)return!1;e.unload(),"number"==typeof c?0===c&&0===e.$slides.length?a(b).appendTo(e.$slideTrack):d?a(b).insertBefore(e.$slides.eq(c)):a(b).insertAfter(e.$slides.eq(c)):d===!0?a(b).prependTo(e.$slideTrack):a(b).appendTo(e.$slideTrack),e.$slides=e.$slideTrack.children(this.options.slide),e.$slideTrack.children(this.options.slide).detach(),e.$slideTrack.append(e.$slides),e.$slides.each(function(b,c){a(c).attr("data-slick-index",b)}),e.$slidesCache=e.$slides,e.reinit()},b.prototype.animateHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.animate({height:b},a.options.speed)}},b.prototype.animateSlide=function(b,c){var d={},e=this;e.animateHeight(),e.options.rtl===!0&&e.options.vertical===!1&&(b=-b),e.transformsEnabled===!1?e.options.vertical===!1?e.$slideTrack.animate({left:b},e.options.speed,e.options.easing,c):e.$slideTrack.animate({top:b},e.options.speed,e.options.easing,c):e.cssTransitions===!1?(e.options.rtl===!0&&(e.currentLeft=-e.currentLeft),a({animStart:e.currentLeft}).animate({animStart:b},{duration:e.options.speed,easing:e.options.easing,step:function(a){a=Math.ceil(a),e.options.vertical===!1?(d[e.animType]="translate("+a+"px, 0px)",e.$slideTrack.css(d)):(d[e.animType]="translate(0px,"+a+"px)",e.$slideTrack.css(d))},complete:function(){c&&c.call()}})):(e.applyTransition(),b=Math.ceil(b),d[e.animType]=e.options.vertical===!1?"translate3d("+b+"px, 0px, 0px)":"translate3d(0px,"+b+"px, 0px)",e.$slideTrack.css(d),c&&setTimeout(function(){e.disableTransition(),c.call()},e.options.speed))},b.prototype.asNavFor=function(b){var c=this,d=c.options.asNavFor;d&&null!==d&&(d=a(d).not(c.$slider)),null!==d&&"object"==typeof d&&d.each(function(){var c=a(this).slick("getSlick");c.unslicked||c.slideHandler(b,!0)})},b.prototype.applyTransition=function(a){var b=this,c={};c[b.transitionType]=b.options.fade===!1?b.transformType+" "+b.options.speed+"ms "+b.options.cssEase:"opacity "+b.options.speed+"ms "+b.options.cssEase,b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.autoPlay=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer),a.slideCount>a.options.slidesToShow&&a.paused!==!0&&(a.autoPlayTimer=setInterval(a.autoPlayIterator,a.options.autoplaySpeed))},b.prototype.autoPlayClear=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer)},b.prototype.autoPlayIterator=function(){var a=this;a.options.infinite===!1?1===a.direction?(a.currentSlide+1===a.slideCount-1&&(a.direction=0),a.slideHandler(a.currentSlide+a.options.slidesToScroll)):(0===a.currentSlide-1&&(a.direction=1),a.slideHandler(a.currentSlide-a.options.slidesToScroll)):a.slideHandler(a.currentSlide+a.options.slidesToScroll)},b.prototype.buildArrows=function(){var b=this;b.options.arrows===!0&&(b.$prevArrow=a(b.options.prevArrow).addClass("slick-arrow"),b.$nextArrow=a(b.options.nextArrow).addClass("slick-arrow"),b.slideCount>b.options.slidesToShow?(b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.prependTo(b.options.appendArrows),b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.appendTo(b.options.appendArrows),b.options.infinite!==!0&&b.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},b.prototype.buildDots=function(){var c,d,b=this;if(b.options.dots===!0&&b.slideCount>b.options.slidesToShow){for(d='<ul class="'+b.options.dotsClass+'">',c=0;c<=b.getDotCount();c+=1)d+="<li>"+b.options.customPaging.call(this,b,c)+"</li>";d+="</ul>",b.$dots=a(d).appendTo(b.options.appendDots),b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden","false")}},b.prototype.buildOut=function(){var b=this;b.$slides=b.$slider.children(b.options.slide+":not(.slick-cloned)").addClass("slick-slide"),b.slideCount=b.$slides.length,b.$slides.each(function(b,c){a(c).attr("data-slick-index",b).data("originalStyling",a(c).attr("style")||"")}),b.$slidesCache=b.$slides,b.$slider.addClass("slick-slider"),b.$slideTrack=0===b.slideCount?a('<div class="slick-track"/>').appendTo(b.$slider):b.$slides.wrapAll('<div class="slick-track"/>').parent(),b.$list=b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(),b.$slideTrack.css("opacity",0),(b.options.centerMode===!0||b.options.swipeToSlide===!0)&&(b.options.slidesToScroll=1),a("img[data-lazy]",b.$slider).not("[src]").addClass("slick-loading"),b.setupInfinite(),b.buildArrows(),b.buildDots(),b.updateDots(),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.options.draggable===!0&&b.$list.addClass("draggable")},b.prototype.buildRows=function(){var b,c,d,e,f,g,h,a=this;if(e=document.createDocumentFragment(),g=a.$slider.children(),a.options.rows>1){for(h=a.options.slidesPerRow*a.options.rows,f=Math.ceil(g.length/h),b=0;f>b;b++){var i=document.createElement("div");for(c=0;c<a.options.rows;c++){var j=document.createElement("div");for(d=0;d<a.options.slidesPerRow;d++){var k=b*h+(c*a.options.slidesPerRow+d);g.get(k)&&j.appendChild(g.get(k))}i.appendChild(j)}e.appendChild(i)}a.$slider.html(e),a.$slider.children().children().children().css({width:100/a.options.slidesPerRow+"%",display:"inline-block"})}},b.prototype.checkResponsive=function(b,c){var e,f,g,d=this,h=!1,i=d.$slider.width(),j=window.innerWidth||a(window).width();if("window"===d.respondTo?g=j:"slider"===d.respondTo?g=i:"min"===d.respondTo&&(g=Math.min(j,i)),d.options.responsive&&d.options.responsive.length&&null!==d.options.responsive){f=null;for(e in d.breakpoints)d.breakpoints.hasOwnProperty(e)&&(d.originalSettings.mobileFirst===!1?g<d.breakpoints[e]&&(f=d.breakpoints[e]):g>d.breakpoints[e]&&(f=d.breakpoints[e]));null!==f?null!==d.activeBreakpoint?(f!==d.activeBreakpoint||c)&&(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):null!==d.activeBreakpoint&&(d.activeBreakpoint=null,d.options=d.originalSettings,b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b),h=f),b||h===!1||d.$slider.trigger("breakpoint",[d,h])}},b.prototype.changeSlide=function(b,c){var f,g,h,d=this,e=a(b.target);switch(e.is("a")&&b.preventDefault(),e.is("li")||(e=e.closest("li")),h=0!==d.slideCount%d.options.slidesToScroll,f=h?0:(d.slideCount-d.currentSlide)%d.options.slidesToScroll,b.data.message){case"previous":g=0===f?d.options.slidesToScroll:d.options.slidesToShow-f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide-g,!1,c);break;case"next":g=0===f?d.options.slidesToScroll:f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide+g,!1,c);break;case"index":var i=0===b.data.index?0:b.data.index||e.index()*d.options.slidesToScroll;d.slideHandler(d.checkNavigable(i),!1,c),e.children().trigger("focus");break;default:return}},b.prototype.checkNavigable=function(a){var c,d,b=this;if(c=b.getNavigableIndexes(),d=0,a>c[c.length-1])a=c[c.length-1];else for(var e in c){if(a<c[e]){a=d;break}d=c[e]}return a},b.prototype.cleanUpEvents=function(){var b=this;b.options.dots&&null!==b.$dots&&(a("li",b.$dots).off("click.slick",b.changeSlide),b.options.pauseOnDotsHover===!0&&b.options.autoplay===!0&&a("li",b.$dots).off("mouseenter.slick",a.proxy(b.setPaused,b,!0)).off("mouseleave.slick",a.proxy(b.setPaused,b,!1))),b.options.arrows===!0&&b.slideCount>b.options.slidesToShow&&(b.$prevArrow&&b.$prevArrow.off("click.slick",b.changeSlide),b.$nextArrow&&b.$nextArrow.off("click.slick",b.changeSlide)),b.$list.off("touchstart.slick mousedown.slick",b.swipeHandler),b.$list.off("touchmove.slick mousemove.slick",b.swipeHandler),b.$list.off("touchend.slick mouseup.slick",b.swipeHandler),b.$list.off("touchcancel.slick mouseleave.slick",b.swipeHandler),b.$list.off("click.slick",b.clickHandler),a(document).off(b.visibilityChange,b.visibility),b.$list.off("mouseenter.slick",a.proxy(b.setPaused,b,!0)),b.$list.off("mouseleave.slick",a.proxy(b.setPaused,b,!1)),b.options.accessibility===!0&&b.$list.off("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().off("click.slick",b.selectHandler),a(window).off("orientationchange.slick.slick-"+b.instanceUid,b.orientationChange),a(window).off("resize.slick.slick-"+b.instanceUid,b.resize),a("[draggable!=true]",b.$slideTrack).off("dragstart",b.preventDefault),a(window).off("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).off("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.cleanUpRows=function(){var b,a=this;a.options.rows>1&&(b=a.$slides.children().children(),b.removeAttr("style"),a.$slider.html(b))},b.prototype.clickHandler=function(a){var b=this;b.shouldClick===!1&&(a.stopImmediatePropagation(),a.stopPropagation(),a.preventDefault())},b.prototype.destroy=function(b){var c=this;c.autoPlayClear(),c.touchObject={},c.cleanUpEvents(),a(".slick-cloned",c.$slider).detach(),c.$dots&&c.$dots.remove(),c.options.arrows===!0&&(c.$prevArrow&&c.$prevArrow.length&&(c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.prevArrow)&&c.$prevArrow.remove()),c.$nextArrow&&c.$nextArrow.length&&(c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.nextArrow)&&c.$nextArrow.remove())),c.$slides&&(c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){a(this).attr("style",a(this).data("originalStyling"))}),c.$slideTrack.children(this.options.slide).detach(),c.$slideTrack.detach(),c.$list.detach(),c.$slider.append(c.$slides)),c.cleanUpRows(),c.$slider.removeClass("slick-slider"),c.$slider.removeClass("slick-initialized"),c.unslicked=!0,b||c.$slider.trigger("destroy",[c])},b.prototype.disableTransition=function(a){var b=this,c={};c[b.transitionType]="",b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.fadeSlide=function(a,b){var c=this;c.cssTransitions===!1?(c.$slides.eq(a).css({zIndex:c.options.zIndex}),c.$slides.eq(a).animate({opacity:1},c.options.speed,c.options.easing,b)):(c.applyTransition(a),c.$slides.eq(a).css({opacity:1,zIndex:c.options.zIndex}),b&&setTimeout(function(){c.disableTransition(a),b.call()},c.options.speed))},b.prototype.fadeSlideOut=function(a){var b=this;b.cssTransitions===!1?b.$slides.eq(a).animate({opacity:0,zIndex:b.options.zIndex-2},b.options.speed,b.options.easing):(b.applyTransition(a),b.$slides.eq(a).css({opacity:0,zIndex:b.options.zIndex-2}))},b.prototype.filterSlides=b.prototype.slickFilter=function(a){var b=this;null!==a&&(b.unload(),b.$slideTrack.children(this.options.slide).detach(),b.$slidesCache.filter(a).appendTo(b.$slideTrack),b.reinit())},b.prototype.getCurrent=b.prototype.slickCurrentSlide=function(){var a=this;return a.currentSlide},b.prototype.getDotCount=function(){var a=this,b=0,c=0,d=0;if(a.options.infinite===!0)for(;b<a.slideCount;)++d,b=c+a.options.slidesToShow,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else if(a.options.centerMode===!0)d=a.slideCount;else for(;b<a.slideCount;)++d,b=c+a.options.slidesToShow,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d-1},b.prototype.getLeft=function(a){var c,d,f,b=this,e=0;return b.slideOffset=0,d=b.$slides.first().outerHeight(!0),b.options.infinite===!0?(b.slideCount>b.options.slidesToShow&&(b.slideOffset=-1*b.slideWidth*b.options.slidesToShow,e=-1*d*b.options.slidesToShow),0!==b.slideCount%b.options.slidesToScroll&&a+b.options.slidesToScroll>b.slideCount&&b.slideCount>b.options.slidesToShow&&(a>b.slideCount?(b.slideOffset=-1*(b.options.slidesToShow-(a-b.slideCount))*b.slideWidth,e=-1*(b.options.slidesToShow-(a-b.slideCount))*d):(b.slideOffset=-1*b.slideCount%b.options.slidesToScroll*b.slideWidth,e=-1*b.slideCount%b.options.slidesToScroll*d))):a+b.options.slidesToShow>b.slideCount&&(b.slideOffset=(a+b.options.slidesToShow-b.slideCount)*b.slideWidth,e=(a+b.options.slidesToShow-b.slideCount)*d),b.slideCount<=b.options.slidesToShow&&(b.slideOffset=0,e=0),b.options.centerMode===!0&&b.options.infinite===!0?b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)-b.slideWidth:b.options.centerMode===!0&&(b.slideOffset=0,b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)),c=b.options.vertical===!1?-1*a*b.slideWidth+b.slideOffset:-1*a*d+e,b.options.variableWidth===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow),c=f[0]?-1*f[0].offsetLeft:0,b.options.centerMode===!0&&(f=b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow+1),c=f[0]?-1*f[0].offsetLeft:0,c+=(b.$list.width()-f.outerWidth())/2)),c},b.prototype.getOption=b.prototype.slickGetOption=function(a){var b=this;return b.options[a]},b.prototype.getNavigableIndexes=function(){var e,a=this,b=0,c=0,d=[];for(a.options.infinite===!1?e=a.slideCount:(b=-1*a.options.slidesToScroll,c=-1*a.options.slidesToScroll,e=2*a.slideCount);e>b;)d.push(b),b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d},b.prototype.getSlick=function(){return this},b.prototype.getSlideCount=function(){var c,d,e,b=this;return e=b.options.centerMode===!0?b.slideWidth*Math.floor(b.options.slidesToShow/2):0,b.options.swipeToSlide===!0?(b.$slideTrack.find(".slick-slide").each(function(c,f){return f.offsetLeft-e+a(f).outerWidth()/2>-1*b.swipeLeft?(d=f,!1):void 0}),c=Math.abs(a(d).attr("data-slick-index")-b.currentSlide)||1):b.options.slidesToScroll},b.prototype.goTo=b.prototype.slickGoTo=function(a,b){var c=this;c.changeSlide({data:{message:"index",index:parseInt(a)}},b)},b.prototype.init=function(b){var c=this;a(c.$slider).hasClass("slick-initialized")||(a(c.$slider).addClass("slick-initialized"),c.buildRows(),c.buildOut(),c.setProps(),c.startLoad(),c.loadSlider(),c.initializeEvents(),c.updateArrows(),c.updateDots()),b&&c.$slider.trigger("init",[c]),c.options.accessibility===!0&&c.initADA()},b.prototype.initArrowEvents=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.on("click.slick",{message:"previous"},a.changeSlide),a.$nextArrow.on("click.slick",{message:"next"},a.changeSlide))},b.prototype.initDotEvents=function(){var b=this;b.options.dots===!0&&b.slideCount>b.options.slidesToShow&&a("li",b.$dots).on("click.slick",{message:"index"},b.changeSlide),b.options.dots===!0&&b.options.pauseOnDotsHover===!0&&b.options.autoplay===!0&&a("li",b.$dots).on("mouseenter.slick",a.proxy(b.setPaused,b,!0)).on("mouseleave.slick",a.proxy(b.setPaused,b,!1))},b.prototype.initializeEvents=function(){var b=this;b.initArrowEvents(),b.initDotEvents(),b.$list.on("touchstart.slick mousedown.slick",{action:"start"},b.swipeHandler),b.$list.on("touchmove.slick mousemove.slick",{action:"move"},b.swipeHandler),b.$list.on("touchend.slick mouseup.slick",{action:"end"},b.swipeHandler),b.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},b.swipeHandler),b.$list.on("click.slick",b.clickHandler),a(document).on(b.visibilityChange,a.proxy(b.visibility,b)),b.$list.on("mouseenter.slick",a.proxy(b.setPaused,b,!0)),b.$list.on("mouseleave.slick",a.proxy(b.setPaused,b,!1)),b.options.accessibility===!0&&b.$list.on("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),a(window).on("orientationchange.slick.slick-"+b.instanceUid,a.proxy(b.orientationChange,b)),a(window).on("resize.slick.slick-"+b.instanceUid,a.proxy(b.resize,b)),a("[draggable!=true]",b.$slideTrack).on("dragstart",b.preventDefault),a(window).on("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).on("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.initUI=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.show(),a.$nextArrow.show()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.show(),a.options.autoplay===!0&&a.autoPlay()},b.prototype.keyHandler=function(a){var b=this;a.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===a.keyCode&&b.options.accessibility===!0?b.changeSlide({data:{message:"previous"}}):39===a.keyCode&&b.options.accessibility===!0&&b.changeSlide({data:{message:"next"}}))},b.prototype.lazyLoad=function(){function g(b){a("img[data-lazy]",b).each(function(){var b=a(this),c=a(this).attr("data-lazy"),d=document.createElement("img");d.onload=function(){b.animate({opacity:0},100,function(){b.attr("src",c).animate({opacity:1},200,function(){b.removeAttr("data-lazy").removeClass("slick-loading")})})},d.src=c})}var c,d,e,f,b=this;b.options.centerMode===!0?b.options.infinite===!0?(e=b.currentSlide+(b.options.slidesToShow/2+1),f=e+b.options.slidesToShow+2):(e=Math.max(0,b.currentSlide-(b.options.slidesToShow/2+1)),f=2+(b.options.slidesToShow/2+1)+b.currentSlide):(e=b.options.infinite?b.options.slidesToShow+b.currentSlide:b.currentSlide,f=e+b.options.slidesToShow,b.options.fade===!0&&(e>0&&e--,f<=b.slideCount&&f++)),c=b.$slider.find(".slick-slide").slice(e,f),g(c),b.slideCount<=b.options.slidesToShow?(d=b.$slider.find(".slick-slide"),g(d)):b.currentSlide>=b.slideCount-b.options.slidesToShow?(d=b.$slider.find(".slick-cloned").slice(0,b.options.slidesToShow),g(d)):0===b.currentSlide&&(d=b.$slider.find(".slick-cloned").slice(-1*b.options.slidesToShow),g(d))},b.prototype.loadSlider=function(){var a=this;a.setPosition(),a.$slideTrack.css({opacity:1}),a.$slider.removeClass("slick-loading"),a.initUI(),"progressive"===a.options.lazyLoad&&a.progressiveLazyLoad()},b.prototype.next=b.prototype.slickNext=function(){var a=this;a.changeSlide({data:{message:"next"}})},b.prototype.orientationChange=function(){var a=this;a.checkResponsive(),a.setPosition()},b.prototype.pause=b.prototype.slickPause=function(){var a=this;a.autoPlayClear(),a.paused=!0},b.prototype.play=b.prototype.slickPlay=function(){var a=this;a.paused=!1,a.autoPlay()},b.prototype.postSlide=function(a){var b=this;b.$slider.trigger("afterChange",[b,a]),b.animating=!1,b.setPosition(),b.swipeLeft=null,b.options.autoplay===!0&&b.paused===!1&&b.autoPlay(),b.options.accessibility===!0&&b.initADA()},b.prototype.prev=b.prototype.slickPrev=function(){var a=this;a.changeSlide({data:{message:"previous"}})},b.prototype.preventDefault=function(a){a.preventDefault()},b.prototype.progressiveLazyLoad=function(){var c,d,b=this;c=a("img[data-lazy]",b.$slider).length,c>0&&(d=a("img[data-lazy]",b.$slider).first(),d.attr("src",d.attr("data-lazy")).removeClass("slick-loading").load(function(){d.removeAttr("data-lazy"),b.progressiveLazyLoad(),b.options.adaptiveHeight===!0&&b.setPosition()}).error(function(){d.removeAttr("data-lazy"),b.progressiveLazyLoad()}))},b.prototype.refresh=function(b){var c=this,d=c.currentSlide;c.destroy(!0),a.extend(c,c.initials,{currentSlide:d}),c.init(),b||c.changeSlide({data:{message:"index",index:d}},!1)},b.prototype.registerBreakpoints=function(){var c,d,e,b=this,f=b.options.responsive||null;if("array"===a.type(f)&&f.length){b.respondTo=b.options.respondTo||"window";for(c in f)if(e=b.breakpoints.length-1,d=f[c].breakpoint,f.hasOwnProperty(c)){for(;e>=0;)b.breakpoints[e]&&b.breakpoints[e]===d&&b.breakpoints.splice(e,1),e--;b.breakpoints.push(d),b.breakpointSettings[d]=f[c].settings}b.breakpoints.sort(function(a,c){return b.options.mobileFirst?a-c:c-a})}},b.prototype.reinit=function(){var b=this;b.$slides=b.$slideTrack.children(b.options.slide).addClass("slick-slide"),b.slideCount=b.$slides.length,b.currentSlide>=b.slideCount&&0!==b.currentSlide&&(b.currentSlide=b.currentSlide-b.options.slidesToScroll),b.slideCount<=b.options.slidesToShow&&(b.currentSlide=0),b.registerBreakpoints(),b.setProps(),b.setupInfinite(),b.buildArrows(),b.updateArrows(),b.initArrowEvents(),b.buildDots(),b.updateDots(),b.initDotEvents(),b.checkResponsive(!1,!0),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),b.setSlideClasses(0),b.setPosition(),b.$slider.trigger("reInit",[b]),b.options.autoplay===!0&&b.focusHandler()},b.prototype.resize=function(){var b=this;a(window).width()!==b.windowWidth&&(clearTimeout(b.windowDelay),b.windowDelay=window.setTimeout(function(){b.windowWidth=a(window).width(),b.checkResponsive(),b.unslicked||b.setPosition()},50))},b.prototype.removeSlide=b.prototype.slickRemove=function(a,b,c){var d=this;return"boolean"==typeof a?(b=a,a=b===!0?0:d.slideCount-1):a=b===!0?--a:a,d.slideCount<1||0>a||a>d.slideCount-1?!1:(d.unload(),c===!0?d.$slideTrack.children().remove():d.$slideTrack.children(this.options.slide).eq(a).remove(),d.$slides=d.$slideTrack.children(this.options.slide),d.$slideTrack.children(this.options.slide).detach(),d.$slideTrack.append(d.$slides),d.$slidesCache=d.$slides,d.reinit(),void 0)},b.prototype.setCSS=function(a){var d,e,b=this,c={};b.options.rtl===!0&&(a=-a),d="left"==b.positionProp?Math.ceil(a)+"px":"0px",e="top"==b.positionProp?Math.ceil(a)+"px":"0px",c[b.positionProp]=a,b.transformsEnabled===!1?b.$slideTrack.css(c):(c={},b.cssTransitions===!1?(c[b.animType]="translate("+d+", "+e+")",b.$slideTrack.css(c)):(c[b.animType]="translate3d("+d+", "+e+", 0px)",b.$slideTrack.css(c)))},b.prototype.setDimensions=function(){var a=this;a.options.vertical===!1?a.options.centerMode===!0&&a.$list.css({padding:"0px "+a.options.centerPadding}):(a.$list.height(a.$slides.first().outerHeight(!0)*a.options.slidesToShow),a.options.centerMode===!0&&a.$list.css({padding:a.options.centerPadding+" 0px"})),a.listWidth=a.$list.width(),a.listHeight=a.$list.height(),a.options.vertical===!1&&a.options.variableWidth===!1?(a.slideWidth=Math.ceil(a.listWidth/a.options.slidesToShow),a.$slideTrack.width(Math.ceil(a.slideWidth*a.$slideTrack.children(".slick-slide").length))):a.options.variableWidth===!0?a.$slideTrack.width(5e3*a.slideCount):(a.slideWidth=Math.ceil(a.listWidth),a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0)*a.$slideTrack.children(".slick-slide").length)));var b=a.$slides.first().outerWidth(!0)-a.$slides.first().width();a.options.variableWidth===!1&&a.$slideTrack.children(".slick-slide").width(a.slideWidth-b)},b.prototype.setFade=function(){var c,b=this;b.$slides.each(function(d,e){c=-1*b.slideWidth*d,b.options.rtl===!0?a(e).css({position:"relative",right:c,top:0,zIndex:b.options.zIndex-2,opacity:0}):a(e).css({position:"relative",left:c,top:0,zIndex:b.options.zIndex-2,opacity:0})}),b.$slides.eq(b.currentSlide).css({zIndex:b.options.zIndex-1,opacity:1})},b.prototype.setHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.css("height",b)}},b.prototype.setOption=b.prototype.slickSetOption=function(b,c,d){var f,g,e=this;if("responsive"===b&&"array"===a.type(c))for(g in c)if("array"!==a.type(e.options.responsive))e.options.responsive=[c[g]];else{for(f=e.options.responsive.length-1;f>=0;)e.options.responsive[f].breakpoint===c[g].breakpoint&&e.options.responsive.splice(f,1),f--;e.options.responsive.push(c[g])}else e.options[b]=c;d===!0&&(e.unload(),e.reinit())},b.prototype.setPosition=function(){var a=this;a.setDimensions(),a.setHeight(),a.options.fade===!1?a.setCSS(a.getLeft(a.currentSlide)):a.setFade(),a.$slider.trigger("setPosition",[a])},b.prototype.setProps=function(){var a=this,b=document.body.style;a.positionProp=a.options.vertical===!0?"top":"left","top"===a.positionProp?a.$slider.addClass("slick-vertical"):a.$slider.removeClass("slick-vertical"),(void 0!==b.WebkitTransition||void 0!==b.MozTransition||void 0!==b.msTransition)&&a.options.useCSS===!0&&(a.cssTransitions=!0),a.options.fade&&("number"==typeof a.options.zIndex?a.options.zIndex<3&&(a.options.zIndex=3):a.options.zIndex=a.defaults.zIndex),void 0!==b.OTransform&&(a.animType="OTransform",a.transformType="-o-transform",a.transitionType="OTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.MozTransform&&(a.animType="MozTransform",a.transformType="-moz-transform",a.transitionType="MozTransition",void 0===b.perspectiveProperty&&void 0===b.MozPerspective&&(a.animType=!1)),void 0!==b.webkitTransform&&(a.animType="webkitTransform",a.transformType="-webkit-transform",a.transitionType="webkitTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.msTransform&&(a.animType="msTransform",a.transformType="-ms-transform",a.transitionType="msTransition",void 0===b.msTransform&&(a.animType=!1)),void 0!==b.transform&&a.animType!==!1&&(a.animType="transform",a.transformType="transform",a.transitionType="transition"),a.transformsEnabled=null!==a.animType&&a.animType!==!1},b.prototype.setSlideClasses=function(a){var c,d,e,f,b=this;d=b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),b.$slides.eq(a).addClass("slick-current"),b.options.centerMode===!0?(c=Math.floor(b.options.slidesToShow/2),b.options.infinite===!0&&(a>=c&&a<=b.slideCount-1-c?b.$slides.slice(a-c,a+c+1).addClass("slick-active").attr("aria-hidden","false"):(e=b.options.slidesToShow+a,d.slice(e-c+1,e+c+2).addClass("slick-active").attr("aria-hidden","false")),0===a?d.eq(d.length-1-b.options.slidesToShow).addClass("slick-center"):a===b.slideCount-1&&d.eq(b.options.slidesToShow).addClass("slick-center")),b.$slides.eq(a).addClass("slick-center")):a>=0&&a<=b.slideCount-b.options.slidesToShow?b.$slides.slice(a,a+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):d.length<=b.options.slidesToShow?d.addClass("slick-active").attr("aria-hidden","false"):(f=b.slideCount%b.options.slidesToShow,e=b.options.infinite===!0?b.options.slidesToShow+a:a,b.options.slidesToShow==b.options.slidesToScroll&&b.slideCount-a<b.options.slidesToShow?d.slice(e-(b.options.slidesToShow-f),e+f).addClass("slick-active").attr("aria-hidden","false"):d.slice(e,e+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false")),"ondemand"===b.options.lazyLoad&&b.lazyLoad()},b.prototype.setupInfinite=function(){var c,d,e,b=this;if(b.options.fade===!0&&(b.options.centerMode=!1),b.options.infinite===!0&&b.options.fade===!1&&(d=null,b.slideCount>b.options.slidesToShow)){for(e=b.options.centerMode===!0?b.options.slidesToShow+1:b.options.slidesToShow,c=b.slideCount;c>b.slideCount-e;c-=1)d=c-1,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d-b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");for(c=0;e>c;c+=1)d=c,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d+b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");b.$slideTrack.find(".slick-cloned").find("[id]").each(function(){a(this).attr("id","")})}},b.prototype.setPaused=function(a){var b=this;b.options.autoplay===!0&&b.options.pauseOnHover===!0&&(b.paused=a,a?b.autoPlayClear():b.autoPlay())},b.prototype.selectHandler=function(b){var c=this,d=a(b.target).is(".slick-slide")?a(b.target):a(b.target).parents(".slick-slide"),e=parseInt(d.attr("data-slick-index"));return e||(e=0),c.slideCount<=c.options.slidesToShow?(c.setSlideClasses(e),c.asNavFor(e),void 0):(c.slideHandler(e),void 0)},b.prototype.slideHandler=function(a,b,c){var d,e,f,g,h=null,i=this;return b=b||!1,i.animating===!0&&i.options.waitForAnimate===!0||i.options.fade===!0&&i.currentSlide===a||i.slideCount<=i.options.slidesToShow?void 0:(b===!1&&i.asNavFor(a),d=a,h=i.getLeft(d),g=i.getLeft(i.currentSlide),i.currentLeft=null===i.swipeLeft?g:i.swipeLeft,i.options.infinite===!1&&i.options.centerMode===!1&&(0>a||a>i.getDotCount()*i.options.slidesToScroll)?(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d)),void 0):i.options.infinite===!1&&i.options.centerMode===!0&&(0>a||a>i.slideCount-i.options.slidesToScroll)?(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d)),void 0):(i.options.autoplay===!0&&clearInterval(i.autoPlayTimer),e=0>d?0!==i.slideCount%i.options.slidesToScroll?i.slideCount-i.slideCount%i.options.slidesToScroll:i.slideCount+d:d>=i.slideCount?0!==i.slideCount%i.options.slidesToScroll?0:d-i.slideCount:d,i.animating=!0,i.$slider.trigger("beforeChange",[i,i.currentSlide,e]),f=i.currentSlide,i.currentSlide=e,i.setSlideClasses(i.currentSlide),i.updateDots(),i.updateArrows(),i.options.fade===!0?(c!==!0?(i.fadeSlideOut(f),i.fadeSlide(e,function(){i.postSlide(e)
})):i.postSlide(e),i.animateHeight(),void 0):(c!==!0?i.animateSlide(h,function(){i.postSlide(e)}):i.postSlide(e),void 0)))},b.prototype.startLoad=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.hide(),a.$nextArrow.hide()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.hide(),a.$slider.addClass("slick-loading")},b.prototype.swipeDirection=function(){var a,b,c,d,e=this;return a=e.touchObject.startX-e.touchObject.curX,b=e.touchObject.startY-e.touchObject.curY,c=Math.atan2(b,a),d=Math.round(180*c/Math.PI),0>d&&(d=360-Math.abs(d)),45>=d&&d>=0?e.options.rtl===!1?"left":"right":360>=d&&d>=315?e.options.rtl===!1?"left":"right":d>=135&&225>=d?e.options.rtl===!1?"right":"left":e.options.verticalSwiping===!0?d>=35&&135>=d?"left":"right":"vertical"},b.prototype.swipeEnd=function(){var c,b=this;if(b.dragging=!1,b.shouldClick=b.touchObject.swipeLength>10?!1:!0,void 0===b.touchObject.curX)return!1;if(b.touchObject.edgeHit===!0&&b.$slider.trigger("edge",[b,b.swipeDirection()]),b.touchObject.swipeLength>=b.touchObject.minSwipe)switch(b.swipeDirection()){case"left":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide+b.getSlideCount()):b.currentSlide+b.getSlideCount(),b.slideHandler(c),b.currentDirection=0,b.touchObject={},b.$slider.trigger("swipe",[b,"left"]);break;case"right":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide-b.getSlideCount()):b.currentSlide-b.getSlideCount(),b.slideHandler(c),b.currentDirection=1,b.touchObject={},b.$slider.trigger("swipe",[b,"right"])}else b.touchObject.startX!==b.touchObject.curX&&(b.slideHandler(b.currentSlide),b.touchObject={})},b.prototype.swipeHandler=function(a){var b=this;if(!(b.options.swipe===!1||"ontouchend"in document&&b.options.swipe===!1||b.options.draggable===!1&&-1!==a.type.indexOf("mouse")))switch(b.touchObject.fingerCount=a.originalEvent&&void 0!==a.originalEvent.touches?a.originalEvent.touches.length:1,b.touchObject.minSwipe=b.listWidth/b.options.touchThreshold,b.options.verticalSwiping===!0&&(b.touchObject.minSwipe=b.listHeight/b.options.touchThreshold),a.data.action){case"start":b.swipeStart(a);break;case"move":b.swipeMove(a);break;case"end":b.swipeEnd(a)}},b.prototype.swipeMove=function(a){var d,e,f,g,h,b=this;return h=void 0!==a.originalEvent?a.originalEvent.touches:null,!b.dragging||h&&1!==h.length?!1:(d=b.getLeft(b.currentSlide),b.touchObject.curX=void 0!==h?h[0].pageX:a.clientX,b.touchObject.curY=void 0!==h?h[0].pageY:a.clientY,b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curX-b.touchObject.startX,2))),b.options.verticalSwiping===!0&&(b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curY-b.touchObject.startY,2)))),e=b.swipeDirection(),"vertical"!==e?(void 0!==a.originalEvent&&b.touchObject.swipeLength>4&&a.preventDefault(),g=(b.options.rtl===!1?1:-1)*(b.touchObject.curX>b.touchObject.startX?1:-1),b.options.verticalSwiping===!0&&(g=b.touchObject.curY>b.touchObject.startY?1:-1),f=b.touchObject.swipeLength,b.touchObject.edgeHit=!1,b.options.infinite===!1&&(0===b.currentSlide&&"right"===e||b.currentSlide>=b.getDotCount()&&"left"===e)&&(f=b.touchObject.swipeLength*b.options.edgeFriction,b.touchObject.edgeHit=!0),b.swipeLeft=b.options.vertical===!1?d+f*g:d+f*(b.$list.height()/b.listWidth)*g,b.options.verticalSwiping===!0&&(b.swipeLeft=d+f*g),b.options.fade===!0||b.options.touchMove===!1?!1:b.animating===!0?(b.swipeLeft=null,!1):(b.setCSS(b.swipeLeft),void 0)):void 0)},b.prototype.swipeStart=function(a){var c,b=this;return 1!==b.touchObject.fingerCount||b.slideCount<=b.options.slidesToShow?(b.touchObject={},!1):(void 0!==a.originalEvent&&void 0!==a.originalEvent.touches&&(c=a.originalEvent.touches[0]),b.touchObject.startX=b.touchObject.curX=void 0!==c?c.pageX:a.clientX,b.touchObject.startY=b.touchObject.curY=void 0!==c?c.pageY:a.clientY,b.dragging=!0,void 0)},b.prototype.unfilterSlides=b.prototype.slickUnfilter=function(){var a=this;null!==a.$slidesCache&&(a.unload(),a.$slideTrack.children(this.options.slide).detach(),a.$slidesCache.appendTo(a.$slideTrack),a.reinit())},b.prototype.unload=function(){var b=this;a(".slick-cloned",b.$slider).remove(),b.$dots&&b.$dots.remove(),b.$prevArrow&&b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.remove(),b.$nextArrow&&b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.remove(),b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},b.prototype.unslick=function(a){var b=this;b.$slider.trigger("unslick",[b,a]),b.destroy()},b.prototype.updateArrows=function(){var b,a=this;b=Math.floor(a.options.slidesToShow/2),a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&!a.options.infinite&&(a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===a.currentSlide?(a.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-a.options.slidesToShow&&a.options.centerMode===!1?(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-1&&a.options.centerMode===!0&&(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},b.prototype.updateDots=function(){var a=this;null!==a.$dots&&(a.$dots.find("li").removeClass("slick-active").attr("aria-hidden","true"),a.$dots.find("li").eq(Math.floor(a.currentSlide/a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden","false"))},b.prototype.visibility=function(){var a=this;document[a.hidden]?(a.paused=!0,a.autoPlayClear()):a.options.autoplay===!0&&(a.paused=!1,a.autoPlay())},b.prototype.initADA=function(){var b=this;b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),b.$slideTrack.attr("role","listbox"),b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c){a(this).attr({role:"option","aria-describedby":"slick-slide"+b.instanceUid+c})}),null!==b.$dots&&b.$dots.attr("role","tablist").find("li").each(function(c){a(this).attr({role:"presentation","aria-selected":"false","aria-controls":"navigation"+b.instanceUid+c,id:"slick-slide"+b.instanceUid+c})}).first().attr("aria-selected","true").end().find("button").attr("role","button").end().closest("div").attr("role","toolbar"),b.activateADA()},b.prototype.activateADA=function(){var a=this,b=a.$slider.find("*").is(":focus");a.$slideTrack.find(".slick-active").attr({"aria-hidden":"false",tabindex:"0"}).find("a, input, button, select").attr({tabindex:"0"}),b&&a.$slideTrack.find(".slick-active").focus()},b.prototype.focusHandler=function(){var b=this;b.$slider.on("focus.slick blur.slick","*",function(c){c.stopImmediatePropagation();var d=a(this);setTimeout(function(){b.isPlay&&(d.is(":focus")?(b.autoPlayClear(),b.paused=!0):(b.paused=!1,b.autoPlay()))},0)})},a.fn.slick=function(){var g,a=this,c=arguments[0],d=Array.prototype.slice.call(arguments,1),e=a.length,f=0;for(f;e>f;f++)if("object"==typeof c||"undefined"==typeof c?a[f].slick=new b(a[f],c):g=a[f].slick[c].apply(a[f].slick,d),"undefined"!=typeof g)return g;return a}});
(function ($) {
	$(window).load(function () {
		var $scrollTop = $("#scrollTop");
		var $body = $("body");

		window.onscroll = function () {
			var scrollAmountPoint = 450;
			$scrollTop.toggleClass("scrollTop--active", (window.pageYOffset >= scrollAmountPoint));
		};

		$scrollTop.on("click", function (ev) {
			ev.preventDefault();
			$("html, body").animate({
				scrollTop: 0
			}, 1000, "swing");
		});
	});
})(jQuery);

jQuery(document).ready(function(e){function a(e,a){l(e,a),e.find(a.container).first().show()}function n(a,n){if(n.tabs){var t=e("<div />",{"class":n.tabMenuClassName}).insertBefore(a.children(n.container).filter(":first"));a.children(n.container).each(function(i,r){var l=e("<button/>").html(e(this).children(n.header).html()).addClass(0==i?n.tabMenuItemActiveClassName:"").addClass("item"+i).addClass("btn btn-default").prop("type","button").on("click keypress",{container:a.children(n.container),fieldset:e(r)},function(){var t=e(this),i=t.parent().children().index(t);s(a,n,t,i)});n.tabIndex&&l.prop("tabindex",i),t.append(l)})}}function t(a,n){n.navigation&&a.children(n.container).each(function(t){var i=e("<div />").addClass("powermail_fieldwrap").addClass("powermail_tab_navigation").appendTo(e(this));t>0&&i.append(c(a,n)),t<a.children(n.container).length-1&&i.append(o(a,n))})}function i(a,n){e.fn.parsley&&"data-parsley-validate"===a.data("parsley-validate")&&a.parsley().subscribe("parsley:field:validated",function(){v(a,n),C(a,n)})}function r(a,n){n.openTabOnError&&e.listen("parsley:field:error",function(){setTimeout(function(){a.find("."+n.tabMenuClassName+" > ."+n.tabMenuItemErrorClassName+":first").click()},50)})}function s(a,n,t,i){$activeTab=p(a,n),$activeTab.removeClass(n.tabMenuItemActiveClassName),t.addClass(n.tabMenuItemActiveClassName),l(a,n),e(".powermail_fieldset",a).slice(i,i+1).show()}function l(e,a){e.children(a.container).hide()}function c(a,n){return e("<a />").prop("href","#").addClass("btn btn-warning").html("<").click(function(e){e.preventDefault(),u(a,n)})}function o(a,n){return e("<a />").prop("href","#").addClass("btn btn-primary pull-right").html(">").click(function(e){e.preventDefault(),d(a,n)})}function d(e,a){var n=m(e,a);$activeTab=p(e,a),$activeTab.removeClass(a.tabMenuItemActiveClassName).next().addClass(a.tabMenuItemActiveClassName),f(e,a,n+1)}function u(e,a){var n=m(e,a);$activeTab=p(e,a),$activeTab.removeClass(a.tabMenuItemActiveClassName).prev().addClass(a.tabMenuItemActiveClassName),f(e,a,n-1)}function f(e,a,n){l(e,a),e.find(".powermail_fieldset").slice(n,n+1).show()}function m(e,a){var n=b(e,a),t=n.index(p(e,a));return parseInt(t)}function b(e,a){return e.find("."+a.tabMenuClassName).children()}function p(e,a){var n=b(e,a);return n.filter("."+a.tabMenuItemActiveClassName)}function v(e,a){var n=b(e,a);n.removeClass(a.tabMenuItemErrorClassName)}function C(a,n){a.parsley().isValid()||a.find(".parsley-error").each(function(){var t=a.find(".powermail_fieldset").index(e(this).closest(".powermail_fieldset")),i=b(a,n),r=i.slice(t,t+1);r.addClass(n.tabMenuItemErrorClassName)})}e.fn.powermailTabs=function(e){"use strict";var s=jQuery(this);e=jQuery.extend({container:"fieldset",header:"legend",tabs:!0,navigation:!0,openTabOnError:!0,tabIndex:!0,tabMenuClassName:"btn-group",tabMenuItemActiveClassName:"btn-primary",tabMenuItemErrorClassName:"btn-danger"},e),a(s,e),n(s,e),t(s,e),i(s,e),r(s,e)}});
function PowermailForm(e){"use strict";this.initialize=function(){a(),t(),i(),r(),o(),n(),c(),l()};var a=function(){e.fn.powermailTabs&&e(".powermail_morestep").each(function(){e(this).powermailTabs()})},t=function(){e("form[data-powermail-ajax]").length&&p()},i=function(){if(e('*[data-powermail-location="prefill"]').length&&navigator.geolocation){e(this);navigator.geolocation.getCurrentPosition(function(a){var t=a.coords.latitude,i=a.coords.longitude,r=D()+"/index.php?eID=powermailEidGetLocation";jQuery.ajax({url:r,data:"lat="+t+"&lng="+i,cache:!1,success:function(a){a&&e('*[data-powermail-location="prefill"]').val(a)}})})}},r=function(){e.fn.datetimepicker&&e(".powermail_date").each(function(){var a=e(this);if("date"===a.prop("type")||"datetime-local"===a.prop("type")||"time"===a.prop("type")){if(!a.data("datepicker-force")){if(e(this).data("date-value")){var t=v(e(this).data("date-value"),e(this).data("datepicker-format"),a.prop("type"));null!==t&&e(this).val(t)}return}a.prop("type","text")}var i=!0,r=!0;"date"===a.data("datepicker-settings")?r=!1:"time"===a.data("datepicker-settings")&&(i=!1),a.datetimepicker({format:a.data("datepicker-format"),timepicker:r,datepicker:i,lang:"en",i18n:{en:{months:a.data("datepicker-months").split(","),dayOfWeek:a.data("datepicker-days").split(",")}}})})},o=function(){e(".powermail_all_type_password.powermail_all_value").html("********")},n=function(){e.fn.parsley&&e(".powermail_reset").on("click","",function(){e('form[data-parsley-validate="data-parsley-validate"]').parsley().reset()})},l=function(){window.Parsley&&(_(),x())},p=function(){var a,t=!1;e(document).on("submit","form[data-powermail-ajax]",function(i){var r=e(this);r.data("powermail-ajax-uri")&&(a=r.data("powermail-ajax-uri"));var o=r.data("powermail-form");t||(e.ajax({type:"POST",url:r.prop("action"),data:new FormData(r.get(0)),contentType:!1,processData:!1,beforeSend:function(){s(r)},complete:function(){d(r),c()},success:function(i){var n=e('*[data-powermail-form="'+o+'"]:first',i);n.length?(e('*[data-powermail-form="'+o+'"]:first').closest(".tx-powermail").html(n),e.fn.powermailTabs&&e(".powermail_morestep").powermailTabs(),e.fn.parsley&&e('form[data-parsley-validate="data-parsley-validate"]').parsley(),m()):(a?j(a):r.submit(),t=!0)}}),i.preventDefault())})},s=function(a){d(a),e(".powermail_submit",a).length?e(".powermail_submit",a).parent().append(g()):a.closest(".tx-powermail").append(g())},d=function(e){e.closest(".tx-powermail").find(".powermail_progressbar").remove()},c=function(){e(".powermail_fieldwrap_file").find(".deleteAllFiles").each(function(){f(e(this).closest(".powermail_fieldwrap_file").find('input[type="file"]'))}),e(".deleteAllFiles").click(function(){u(e(this).closest(".powermail_fieldwrap_file").find('input[type="hidden"]')),e(this).closest("ul").fadeOut(function(){e(this).remove()})})},f=function(e){e.prop("disabled","disabled").addClass("hide").prop("type","hidden")},u=function(e){e.prop("disabled",!1).removeClass("hide").prop("type","file")},m=function(){e("img.powermail_captchaimage").each(function(){var a=w(e(this).prop("src"));e(this).prop("src",a+"?hash="+h(5))})},w=function(e){var a=e.split("?");return a[0]},h=function(e){for(var a="",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",i=0;i<e;i++)a+=t.charAt(Math.floor(Math.random()*t.length));return a},v=function(e,a,t){var i=Date.parseDate(e,a);if(null===i)return null;var r=new Date(i),o=r.getFullYear()+"-";o+=("0"+(r.getMonth()+1)).slice(-2)+"-",o+=("0"+r.getDate()).slice(-2);var n=("0"+r.getHours()).slice(-2)+":"+("0"+r.getMinutes()).slice(-2),l=o+"T"+n;return"date"===t?o:"datetime-local"===t?l:"time"===t?n:null},g=function(){return e("<div />").addClass("powermail_progressbar").html(e("<div />").addClass("powermail_progress").html(e("<div />").addClass("powermail_progess_inner")))},y=function(e){for(var a=e.get(0),t=0,i=0;i<a.files.length;i++){var r=a.files[i];r.size>t&&(t=r.size)}return parseInt(t)},_=function(){window.Parsley.addValidator("powermailfilesize",function(a,t){if(t.indexOf(",")!==-1){var i=t.split(","),r=parseInt(i[0]),o=e('*[name="tx_powermail_pi1[field]['+i[1]+'][]"]');if(o.length&&y(o)>r)return!1}return!0},32).addMessage("en","powermailfilesize","Error")},x=function(){window.Parsley.addValidator("powermailfileextensions",function(a,t){var i=e('*[name="tx_powermail_pi1[field]['+t+'][]"]');return!i.length||b(k(a),i.prop("accept"))},32).addMessage("en","powermailfileextensions","Error")},b=function(e,a){return a.indexOf("."+e)!==-1},k=function(e){return e.split(".").pop().toLowerCase()},j=function(e){e.indexOf("http")!==-1?window.location=e:window.location.pathname=e},D=function(){var a;return a=e("base").length>0?jQuery("base").prop("href"):"https:"!=window.location.protocol?"http://"+window.location.hostname:"https://"+window.location.hostname}}jQuery(document).ready(function(e){"use strict";var a=new window.PowermailForm(e);a.initialize()});
(function($){
	$(document).ready(function(){

		$tabMapNavigationActive = $('.tab-map__navigation .navigation-list__item--active');
		$tabMapNavigation = $('.tab-map__navigation');
		$tabMapNavigation.find('a').on('click',function(){
			var $this = $(this);
			var href = $this.attr('href');

			if($(href).index() > -1){
				$this.parent().siblings().removeClass('navigation-list__item--active');
				$this.parent().addClass('navigation-list__item--active');

				$('.tab-map__area').removeClass('tab-map__area--active');
				$(href).addClass('tab-map__area--active');
			}

			return false;
		});

		//active first element
		$tabMapNavigationActive.find('a').click();
	});
})(jQuery);