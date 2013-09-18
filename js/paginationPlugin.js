(function ( $ ) {
	$.fn.pagination = function(options){
		var settings = $.extend({
            // These are the defaults.
			source: '',
            pageSize: 5,
			startingPage: 1,
			templateIdentifiers: ''
        }, options );
		
		var currentPage = settings.startingPage - 1;
		var outer = this;
		var addressTemplate = Handlebars.compile(settings.source);
		var entry = $(settings.templateIdentifiers).html();
		var itemTemplate = Handlebars.compile(entry);
		var controls = 
		'<li class="paginationControls">' +
			'<div class="paginationControls_content">' + 
				'<input class="prevButton button alignLeft" type="button" value="Prev">' +
				'<div class="count alignLeft">' +
					'{{current}}' +
				'</div>'+
				'<input class="nextButton button alignLeft" type="button" value="Next">' +
				'<div class="clearfix"></div>'+
			'</div>' +
		'</li>';
		var controlsTemplate = Handlebars.compile(controls);
		
		render(true);
		
		$(document).on('click', '.prevButton', function(){
			var temp = currentPage - 1;
			if (temp >= 0){
				currentPage = temp
				render();
			}
			else{
				alert('There is no page below 1');
			}
		});
		
		$(document).on('click', '.nextButton', function(){
			currentPage = currentPage + 1;
			render();
		});
		
		function render(skipAlert){
			
			$.get(addressTemplate({pageSize: settings.pageSize, page: currentPage}), function(data){
				if (data.length > 0){
					var outputHtml = '<ul class="paginationList">';
					if(data instanceof Array){
						for(var i = 0; i < data.length; i++){
							outputHtml = outputHtml + '<li>' + itemTemplate(data[i]) + '</li>';
						}
					}
					else{
						outputHtml = outputHtml + itemTemplate(data);
					}
					var viewPage = currentPage + 1;
					outputHtml = outputHtml + controlsTemplate({current: viewPage}) +'</ul>';
					$(outer).empty();
					$(outer).append(outputHtml);
					cleanUp();
				}
				else{
					currentPage = currentPage - 1;
					if (skipAlert != true){
						alert('There are no more pages');
					}
					render(true);
				}
			})
			.fail(function(){
				alert('There was a problem communicating with the server');
			});
		}
		
		function cleanUp(){
			var width = 0;
			$('.paginationControls_content').children().each(function(){
				if ($(this).hasClass('clearfix') == false){
					var body = parseInt($(this).css('width').replace('px', ''));
					var mRight =  parseInt($(this).css('margin-right').replace('px', ''));
					var mLeft = parseInt($(this).css('margin-left').replace('px', ''));
					var pRight = parseInt($(this).css('padding-right').replace('px', ''));
					var pLeft = parseInt($(this).css('padding-left').replace('px', ''));
					var bRight = parseInt($(this).css('border-right').replace('px', ''));
					var bLeft = parseInt($(this).css('border-left').replace('px', ''));
					width = width + body + mRight + mLeft + pRight + pLeft + bRight + bLeft;
				}
			});
			$('.paginationControls_content').css('width', width);
		}
	};
}( jQuery ));