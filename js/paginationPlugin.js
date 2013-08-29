(function ( $ ) {
    $.fn.tabify = function(vertical) {
		var outer = this;
		var tabList = outer.children('ul').first();
		$(tabList).show();
		var tabs = $(tabList).children('li');
		var links = $(tabs).children('a');
		var tabContentPanes = [];
		$(links).each(function(index, element){
			var selector = $(element).attr('href');
			var item = outer.children(selector).first();
			//item.addClass("tab-page");
			tabContentPanes.push(item[0]);
			$(element).click(function(e){
				e.preventDefault();
				$(links).parent().removeClass("active");
				$(tabContentPanes).each(function(i,e){
					$(e).removeClass("active");
				});
				$(this).parent().addClass("active");
				outer.children(selector).addClass("active");
			});
		});
		if (vertical){
			$(tabList).addClass("tab-vertical-list");
			$(tabs).addClass("tab-vertical-item");
			$(links).addClass("tab-vertical-link");
			$(tabContentPanes).addClass("tab-vertical-page");
			var height = $(tabList).css("height");
			var margin = $(tabList).css("width");
			$(tabContentPanes).css("min-height", height);
			$(tabContentPanes).css("margin-left", margin);
		}
		else{
			$(tabList).addClass("tab-list");
			$(tabs).addClass("tab-item");
			$(links).addClass("tab-link");
			$(tabContentPanes).addClass("tab-page");
		}
		// if (maxWidth !== undefined){
			// $(tabContentPanes).css("max-width", maxWidth + "px");
		// }
		// else{
			// $(tabContentPanes).css("max-width", "700px");
		// }
		return outer;
    };
 
}( jQuery ));