;
(function($) {
	$.fn.simpleTableFilter = function(option) {
		option = $.extend({
			autoFiltering : true
		}, option);

		return this
				.each(function() {
					var target = $(this);
					target
							.on(
									'table-filtering',
									function() {
										$(this)
												.find('> tbody > tr')
												.each(
														function() {
															var tr = $(this)
																	.show();
															$(this)
																	.find('> *')
																	.each(
																			function(
																					index) {
																				var filter = option.filters[index];
																				if (filter) {
																					filter = $(filter);
																					var data = $(
																							this)
																							.text()
																							.toLowerCase();
																					var filter_val = filter
																							.val()
																							.toLowerCase();
																					if (filter
																							.prop('type') == 'radio') {
																						var filter_val = filter
																								.filter(
																										':checked')
																								.val()
																								.toLowerCase();
																					}
																					if (data
																							.indexOf(filter_val) < 0) {
																						tr
																								.hide();

																						return false;
																					}
																				}

																			});
														});
									});

					if (option.autoFiltering) {
						for ( var i in option.filters) {
							var timer;
							$(option.filters[i]).on('keydown change',
									function() {
										if (timer)
											clearTimeout(timer);
										timer = setTimeout(function() {
											target.trigger('table-filtering');
										}, 300);
									});
						}
					}
					target.trigger('table-filtering');

				});
	}
})(jQuery);

function initMyFilter() {
	var json = {}
	$('table tbody tr').each(function() {
		json[$(this).find('> td:eq(3)').text() - 0] = '';
	});
	for ( var i in json) {
		$('<option/>').html(i).appendTo('#qty-filter')
	}

	$('table').simpleTableFilter({
		filters : {
			1 : '#id-filter',
			2 : '#name-filter'
		}
	});
}