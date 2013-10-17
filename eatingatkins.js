/*global $, jQuery, document*/
/*jslint devel: true */
jQuery(document).ready(function ($) { "use strict"; //document.ready()
       $.anystretch("http://eatingatkins.ie/wp-content/uploads/site_images/eatingAtkins_BG.jpg", {speed: 150, positionX: 'right', positionY: 'top'});
       $("#menu-our_menu a").hover(
        function () {
			var $menuItem = $(this).parent();
			if ($menuItem.parent().hasClass('menu')) {
				if ($menuItem.is(':last-child') === false) {
					$menuItem.css("border-right", "1px solid #7C1417");
				}
				if ($menuItem.prev().length !== 0) {
					$menuItem.prev().css("border-right", "1px solid #7C1417");//maroon
				}
			}
		},
        function () {
			var $menuItem = $(this).parent();
			if ($menuItem.parent().hasClass('menu')) {
				if ($menuItem.is(':last-child') === false) {	//no separator after last menu item
					$menuItem.css("border-right", "1px solid #BCBABB");
				}
				if ($menuItem.prev().length !== 0) {
					$menuItem.prev().css("border-right", "1px solid #BCBABB");
				}
			}
		}
	);
	function closeFoodInfo() {
		var $FoodInfo = $('#FoodInfo');
		if ($FoodInfo.is(":visible")) {
			$FoodInfo.attr('style', '');
			$FoodInfo.attr('class', '');
			$FoodInfo.fadeOut('slow', function () {});
		}
	}
	function calculateLIsInRow(list) {
        var lisInRow = 0;
	    if (list.length > 0) {
			$(list).find('li:visible').each(function () {
				if ($(this).prev(":visible").length > 0) {
					if ($(this).position().top !== $(this).prev(":visible").position().top) {
					    return false;
					}
					lisInRow += 1;
				} else {
					lisInRow += 1;
				}
			});
	    }
		return lisInRow;
	}
	$("#jquery_jplayer_1").jPlayer({
        ready: function () {
            $(this).jPlayer("setMedia", {
                mp3: "http://eatingatkins.ie/wp-content/uploads/RAtkinsSoundcloud.mp3"
			});
        },
        swfPath: "../",
		errorAlerts: true,
        supplied: "mp3",
		wmode: "window"
    });
	function openPhase(phase) {
		var $currContainer = $(phase).parent().parent();
		$currContainer.toggleClass("open", "close");
		$currContainer.find('li').css('display', 'block');
		closeFoodInfo(); //close popup if open
	}
	$('.expander .arrow').click(function (e) {
		openPhase($(this));
        e.preventDefault();
	});
	$('.showMoreCarbs').click(function (e) {
		$(this).parent().find('table').addClass('showCarbs').removeClass('hideCarbs');
        e.preventDefault();
	});
	$('.hideMoreCarbs').click(function (e) {
		$(this).closest('table').addClass('hideCarbs').removeClass('showCarbs');
        e.preventDefault();
	});

	$('.filterBox span').click(function (e) {
        var $filterCat = $(this).attr("class"), $currPhase = $(this).parent().parent();
	    $currPhase.find('li').css('display', 'none');
	    $currPhase.find('li.' + $filterCat).css('display', 'block');
	});
	//************************** MOBILE NAVIGATION*********************/	
	function openMobileNav() {
		$("#menu-header_menu").stop(true, true);
		$("#menu-header_menu").animate({
			width: "70%",
			opacity: '1'
		}, 1000);
		$('#menu-header_menu').toggleClass('mobile_nav_open');
		$('#mobile_nav_btn a').toggleClass('open');
	}
	function closeMobileNav() {
		$("#menu-header_menu").stop(true, true);
		$("#menu-header_menu").animate({
			width: "0",
			opacity: '0'
		}, 500);
		$('#menu-header_menu').toggleClass('mobile_nav_open');
		$('#mobile_nav_btn a').toggleClass('open');
	}
	function toggleMobileSubMenu(e) {
		var topLevelMenu = $(this).parent();
		if (topLevelMenu.hasClass('closeSub')) {
			if (topLevelMenu.hasClass('hasSub')) {
				topLevelMenu.find('ul.sub-menu').css('display', 'none');
			}
		} else {
			$('#menu-header_menu li').removeClass('closeSub'); //if any left open, close them
			topLevelMenu.find('ul.sub-menu').show();
		}
		topLevelMenu.toggleClass('closeSub');
		e.stopPropagation();
	}
	$('html').click(function () {
	    if ($('#menu-header_menu').hasClass('mobile_nav_open')) {
			closeMobileNav();
		}
	});
	$('#menu-header_menu').click(function (e) {
		e.stopPropagation(); //prevents propagation of click event when user clicks outside the menu container to close it
	});
	$('#mobile_nav_btn a').click(function (e) {
	    var nav_button = $(this);
	    $('#menu-header_menu li').each(function (index) {	//add class to menu items with sub menu
			if ($(this).find('ul.sub-menu').length > 0) {
				$(this).addClass('hasSub').removeClass('closeSub');

			}
		});
		if (nav_button.hasClass('open')) {
		    openMobileNav();
		} else {
		    closeMobileNav();
		}
		e.preventDefault();
		e.stopPropagation();
	});
	function openFoodInfo(toggleBrand) {
		var $currContainer = $(toggleBrand).parent(), $FoodInfo = $('#FoodInfo'), popupOffset = $currContainer.offset(), pos = $currContainer.siblings(":visible").andSelf().index($currContainer) + 1, LIsInRow = calculateLIsInRow($currContainer.parent()), $foodPic = $("<div id = '" + $currContainer.attr('id') + "'/>");
		if ($FoodInfo.has('.foodDesc')) {
			$FoodInfo.find('div').remove();
			$FoodInfo.find('.foodDesc').remove(); //remove elements added previously
			$FoodInfo.find('span.sprite').remove();
		}
		if (LIsInRow === 1 || pos % LIsInRow !== 0) {// current li is last in row
			popupOffset.left = popupOffset.left + 200;
			$FoodInfo.find('#arrow').attr('class', 'l_arrow');
		} else {
			popupOffset.left = popupOffset.left - ($currContainer.width() + 20);//reposition popup so it doesn't spill over rhs of container
			$FoodInfo.find('#arrow').attr('class', 'r_arrow');
		}
		popupOffset.left = popupOffset.left - $currContainer.parent().offset().left;
		popupOffset.top = popupOffset.top - 280;

		$FoodInfo.offset(popupOffset);
		$FoodInfo.attr('class', $currContainer.attr('id'));

		$foodPic.html($currContainer.find('span.sprite').clone().removeClass('contract'));

		$foodPic.find('img').attr('width', '700px');
		$FoodInfo.append($foodPic);
		$FoodInfo.append($currContainer.find('.foodDesc').clone());
		$FoodInfo.fadeIn('slow', function () {
		});
	}
	$(".menu-item-type-custom a").click(toggleMobileSubMenu);
	/*************************************Open Food Info popup- on page showing finished page*******************************/
	$('.openPopup').click(function (e) {
	    openFoodInfo($(this));
	    e.stopPropagation();
        e.preventDefault();
	});

	$('.closePopup').click(function (e) {
		closeFoodInfo();
        e.preventDefault();
	});
	$('#FoodInfo').click(function (e) {
		e.stopPropagation();
	});
	 $('html').click(function () {
		closeFoodInfo();
	});
	/*jslint devel: true */
	$(document.window).resize(function () {
		calculateLIsInRow($('.open ul'));
		//resetMenu();
	});

	/*********Partner Registration *************/
	var regForm = {
        init: function () {
            var self = this;
            $('#register').bind('click', function (e) {
                self.submitForm();
				e.preventDefault();
            });
            self.placeHolderText();
        },
        submitForm: function () {
			var options = {
				beforeSubmit: function () {
				},
				success: function () {
					$('#partnerReg_form').css('display', 'none');
					$('.thankyou').css('display', 'block');
				},
				dataType: 'json'
			}, self = this, $error = $('#error');
            $('.placeholder').each(function (i) {
                var item = $(this), text = item.attr('rel');
                if (item.val() === text) { item.val(""); }
            });

            if (!$("#firstname").val()) {
				self.displayError($("#firstname"), $error, "Please enter your first name.");
				self.placeHolderText();
				return false;
		    }
			if (!$("#surname").val()) {
				self.displayError($("#surname"), $error, "Please enter your surname.");
				self.placeHolderText();
				return false;
			}
			if ($('#email').val().replace(/ /g, "").length <= 0) {
				self.displayError($('#email'), $error, "Please enter an email address.");
				self.placeHolderText();
				return false;
			}
			if (!self.validate($.trim($("#email").val()))) {
                self.displayError($('#email'), $error, "Please enter a valid email address.");
                self.placeHolderText();
                return false;
			}
			if (!$("#phone").val()) {
				self.displayError($("#phone"), $error, "Please enter a phone number.");
				self.placeHolderText();
				return false;
			}
			if (!$("#address1").val()) {
				self.displayError($("#address1"), $error, "Please enter the first line of your address.");
				self.placeHolderText();
				return false;
			}
			if (!$("#county").val()) {
				self.displayError($("#county"), $error, "Please enter your county.");
				self.placeHolderText();
				return false;
			}
			$('#partnerReg_form').ajaxSubmit(options);
				/*$.ajax({
					//url:"http://eatingatkins.ie/wp-content/plugins/registration/registration.php",
					type: "POST",
					data: self.serialize(),
					dataType: "json",
					success:function(){
						$('#partnerReg_form').css('display','none');
						$('.thankyou').css('display','block');
					}
				});*/
        },
		validate: function (email) {
            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if (reg.test(email) === false) {
                return false;
            }
            return true;
        },
		displayError: function ($currElm, $contain, errMsg) {
			if (errMsg !== "") {
				$('.error').remove();
				$contain.html('<span class="error">' + errMsg + '</span>');
				$currElm.after('<span class="error">' + errMsg + '</span>');
				$contain.css('display', 'block');
			}
		},
        placeHolderText: function () {

            $('.placeholder').each(function (i) {

                var item = $(this), text = item.attr('rel'), form = item.parents('form:first');
                if (item.val() === '') {
                    item.val(text);
                    item.css('color', '#888');
                }

                item.bind('focus.placeholder', function (event) {
                    if (item.val() === text) { item.val(''); }
                    item.css('color', '');
                });

                item.bind('blur.placeholder', function (event) {
                    if (item.val() === '') {
                        item.val(text);
                        item.css('color', '#888');
                    }
                });


            });

        }
    };
	regForm.init();
	});
