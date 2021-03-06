(function($) {

	$.fn.CloudZoom.defaults.zoomWidth = 585;
	$.fn.CloudZoom.defaults.zoomHeight = 320;



})(jQuery);

/* Add class to the searchfield */
(function($) {

	$(document).ready(function() {
	
		$('#searchfield').bind('focus', function() {
			var $this = $(this);
			$this.parent('form').addClass('active'); 
		});
		
		$('#searchfield').bind('blur', function() {
			var $this = $(this);
			$this.parent('form').removeClass('active');
		});

        $('.thumb_box a').bind('click', function() {
            $('.thumb_box a').removeClass('active');
            $(this).addClass('active');
        });
        $('.thumb_box a:first-child').addClass('active')
	});
})(jQuery);

/* remove the value per click from the newsletter input in the footer */
(function($) {
	$(document).ready(function() {
	  $('#newsletter_input').click(function() {
	    if (this.value == this.defaultValue) {
	      this.value = '';
	    }
	  });
	  $('#newsletter_input').blur(function() {
	    if (this.value == '') {
	      this.value = this.defaultValue;
	    }
	  });
	});
})(jQuery);

/* tapped the compareresults to the bottom of the page */
(function($) {

    $(document).ready(function() {
        $(window).resize(function() {
	        var offset = $('#compareHighlight').offset();
	        if(offset) {
		        $('body #compareContainerResults').css({
			        'left': offset.left - 81,
			        'top': offset.top + $('#compareHighlight').height() + 25
		        });
	        }
	    });
        $('#compareContainerResults').appendTo($('body')).hide();
        $(window).trigger('resize');
        
        $('#compareHighlight').live('mouseleave', function() {
	        $('body #compareContainerResults').hide();
        });
				
	});
})(jQuery);



(function($) {

	/**
     * Helper method which checks with the user agent
     * of the browser if the user is using an iPad
     *
     * @public
     * @return boolean
     */
    $.isiPad = function() {
	    return navigator.userAgent.match(/iPad/i) != null;
    }

	if($.isiPad()) {
		$.fn.CloudZoom = function() { /** ... empty function to disable the cloud zoom plugin */ }
	}

    $(document).ready(function() {
        /** Show / hide service menu - iPad */
        $(window).resize(function() {
	        var offset = $('.my_options .service').offset();
	        
	        if(offset) {
		       $('body #servicenavi').css({
			        'left': offset.left - 81,
			        'top': offset.top + $('.my_options .service').height() + 20
		        }); 
	        }
	    });
        $('.my_options #servicenavi').appendTo($('body')).hide();
        $(window).trigger('resize');
        
        $('.my_options .service').bind('click',function() {
			$('body #servicenavi').toggle();
		});
        
        if($.isiPad()) {
			
			$('body').bind('click', function() {
	        	$('div#searchresults').slideUp();
	        });
        }

        /** Set overflow:scroll feature and set .text height **/
        $('.html-text-inner-element').each(function(){
            var $this = $(this),
                $innerEl = $this.find('.text'),
                $offset = $innerEl.offset().top - $this.offset().top + 20;

            if($this.height() < $innerEl.height()) {
                $innerEl.css('overflow-y', 'scroll');
                $innerEl.css('height', $this.height() - $offset + 'px');
            }
        });



        /** Auto suggestion on iOS devices */
        if($.isiPad()) {
	       	$('input#searchfield, .register input[type=text]').attr({
		       	'autocomplete': 'off',
		       	'autocorrect': 'off',
		       	'autocapitalize': 'off'
	       	}); 
	       	$('.register input[type=text]').attr('autocapitalize', 'on');
	       	$('input#register_personal_email').attr({
		    	'type': 'email',
		    	'autocapitalize': 'off'
	       	});
	       	
	       	// ... and use the slimbox instead of the cloud zoom
            $("#zoom1, [rel^='lightbox']").slimbox();
            $('div.thumb_box a').bind('click', function (event) {
                event.preventDefault();
                $('a#zoom1').hide().attr('href', $(this).attr('href')).children().attr('src', $(this).attr('rev'));
                $('a#zoom1').fadeIn('slow');
                return false;
            });
        }
        
        $.compare.options.topLink = '#header';
    });

	//Refreshs the basket display
	$.basket.refreshDisplay = function () {
		$.ajax({
			'dataType': 'jsonp',
			'url': $.basket.options.viewport,
			'data': {
				'sAction': 'ajaxAmount'
			},
			'success': function (result) {
				// $('#shopnavi span.quantity')
				$('#shopnavi div.newbasket').html(result);
				$('div.ajax_basket').click(function () {
					if ($('.ajax_basket_result').hasClass('active')) {
						$('.ajax_basket_result').removeClass('active').slideToggle('fast');
					} else {
						$.basket.getBasket();
					}
				});
			}
		});
	};
	$.basket.getBasket = function () {
        if(!$($.basket.options.basketResult).length) {
        	$('<div>', {
        		'class': 'ajax_basket_result'
        	}).appendTo(document.body);
        }
        $($.basket.options.basketLoader).show();
        $.ajax({
            'data': {
                'sAction': 'ajaxCart'
            },
            'dataType': 'jsonp',
            'url': $.basket.options.viewport,
            'success': function (result) {
            	var offset = $($.basket.options.basketParent).offset();
            	$($.basket.options.basketResult).css({
            		'top': offset.top + 21,
            		'left': offset.left -($($.basket.options.basketResult).width() - $($.basket.options.basketParent).width() + ($.isiPad() ? -35 : 22))	// Hier die 20 aendern
            	});
                $($.basket.options.basketLoader).hide();
                if (result.length) {
                    $($.basket.options.basketResult).empty().html(result);
                } else {
                    $($.basket.options.basketResult).empty().html($.basket.options.emptyText);
                }
                $($.basket.options.basketParent).addClass('active');
                $($.basket.options.basketResult).addClass('active').slideDown('fast');
                $(document.body).bind('click.basket', function() {
					$($.basket.options.basketResult).removeClass('active').slideUp('fast');
					$($.basket.options.basketParent).removeClass('active');
					$(document.body).unbind('click.basket');
				});
            }
        });
    }
})(jQuery);


/**
 * Selectbox replacement
 *
 * Copyright (c) 2012, shopware AG
 */
(function($) {
	$(document).ready(function() {
		$('select').fancySelect();
	});
	
	$.fn.fancySelect =  function() {
		
		function createTemplate(width, text) {
            if(width < 50) {
                width = 50;
            }
			var outer = $('<div>', { 'class': 'outer-select' }).css('width', width),
				inner = $('<div>', { 'class': 'inner-select' }).appendTo(outer),
				text = $('<span>', { 'class': 'select-text', 'html': text }).appendTo(inner);
				
			return outer;
		}
	
		return this.each(function() {
			var $this = $(this),
				initalWidth = $this.is(':hidden') ? $this.width() + 3 : $this.width() + 15,
				selected = $this.find(':selected'),
				initalText = selected.html(),
				template = createTemplate(initalWidth, initalText);
			
			template.insertBefore($this);
			$this.appendTo(template).width(initalWidth);

            if($this.hasClass('instyle_error')) {
                template.addClass('instyle_error');
            }
			
			template.bind('mouseenter', function() {
				$(this).addClass('hovered');
			});
			template.bind('mouseleave', function() {
				$(this).removeClass('hovered');
			});
			
			$this.bind('change', function() {
				var $select = $(this),
					selected = $select.find(':selected');
					
				template.find('.select-text').html(selected.html());
			})
		});
	}
})(jQuery);


/**
 * SwagButtonSolution
 *
 * Copyright (c) 2012, shopware AG
 */
(function($) {
	$(document).ready(function() {
		$('.agb_cancelation input[name=sAGB]').change(function() {
			$('.agb-checkbox').val($(this).is(':checked'))
		});
		
		$('.agb_cancelation input[name=sNewsletter]').change(function() {
			$('.newsletter-checkbox').val($(this).is(':checked'))
		});
	});
})(jQuery);