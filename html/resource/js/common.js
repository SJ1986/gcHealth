'use strict';

$(function(){
	gnb();
    m_gnb();
    locationNav();
	subTab_healthCheck();
	imgSwitch();
})

function gnb(){
	$('.gnb li').hover(
		function () {
			$('ul', this).stop().slideDown(200);
		},
		function () {
			$('ul', this).stop().slideUp(200);
		}
	);
}

function m_gnb(){
    var $lateral_menu_trigger = $('#cd-menu-trigger'),
		$content_wrapper = $('.cd-main-content'),
		$navigation = $('#header');

	//open-close lateral menu clicking on the menu icon
	$lateral_menu_trigger.on('click', function(event){
        $('body').toggleClass('overflow-hidden');
		event.preventDefault();
		
		$lateral_menu_trigger.toggleClass('is-clicked');
		$navigation.toggleClass('lateral-menu-is-open');
		$content_wrapper.toggleClass('lateral-menu-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			// firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
			$('body').toggleClass('overflow-hidden');
		});
		$('#cd-lateral-nav').toggleClass('lateral-menu-is-open');
		
		//check if transitions are not supported - i.e. in IE9
		if($('html').hasClass('no-csstransitions')) {
			$('body').toggleClass('overflow-hidden');
		}
	});

	//close lateral menu clicking outside the menu itself
	$content_wrapper.on('click', function(event){
		if( !$(event.target).is('#cd-menu-trigger, #cd-menu-trigger span') ) {
			$lateral_menu_trigger.removeClass('is-clicked');
			$navigation.removeClass('lateral-menu-is-open');
			$content_wrapper.removeClass('lateral-menu-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$('body').removeClass('overflow-hidden');
			});
			$('#cd-lateral-nav').removeClass('lateral-menu-is-open');
			//check if transitions are not supported
			if($('html').hasClass('no-csstransitions')) {
				$('body').removeClass('overflow-hidden');
			}

		}
	});

	//open (or close) submenu items in the lateral menu. Close all the other open submenu items.
	$('.item-has-children').children('a').on('click', function(event){
		event.preventDefault();
		$(this).toggleClass('submenu-open').next('.sub-menu').slideToggle(200).end().parent('.item-has-children').siblings('.item-has-children').children('a').removeClass('submenu-open').next('.sub-menu').slideUp(200);
	});
}
function locationNav(){//서브 로케이션 메뉴
    $('.location-depth').setMenu();
} 
$.fn.setMenu = function () {//서브 로케이션 메뉴
	//첫 메뉴 선택
	var menu = $('.location-depth:first-child', this);
	menu.addClass('active');

	if ($('>div', menu).length > 0) {
		$('>div', menu).slideDown("fast");
		menu = $('>div>li:first', li);
		menu.addClass('active');
	}
	//첫 메뉴 선택
	$('button', this).click(function () {
		var depth = $(this).parent();
		var sibling = depth.siblings();

		sibling.removeClass('active');
		//$('li', sibling).removeClass('active');
		$('div', sibling).slideUp("fast");
		depth.toggleClass('active');

		var depthDiv = $('>div', depth);
		if (depthDiv.length > 0) {
		depthDiv.slideToggle("fast", function () {
			//$('body').setLayout();
		});
		return false;
		} else if ($(this).attr('target') != '_blank') {
		//$('#loFrmContent').attr('src', $(this).attr('href') + '?timestamp=' + new Date().getTime());
		//return false;
		}
	});
}
function subTab_healthCheck(){
	$('#subTab_healthCheck .tab-link button').click(function(){
		$('#subTab_healthCheck .tab-link button').removeClass('on');
		$('#subTab_healthCheck .tab-cont').removeClass('on');
		$(this).addClass('on');
		$('#' + $(this).data('id')).addClass('on');
	});
}

function imgSwitch(){
    $('.treatment-inner a').each(function() {
        var nowImg = $(this).children('.img-wrap').find('img');  
        var srcName = nowImg.attr('src');  
        var newSrc = srcName.substring(0, srcName.lastIndexOf('.'));
        $(this).hover(function() { 
            $(this).children('.img-wrap').find('img').attr('src', newSrc+ '_r.' + /[^.]+$/.exec(srcName)); 
            $(this).addClass('on');
        }, function() {
            $(this).children('.img-wrap').find('img').attr('src', newSrc + '.' + /[^.]+$/.exec(srcName)); 
            $(this).removeClass('on');
        });    
    });
}