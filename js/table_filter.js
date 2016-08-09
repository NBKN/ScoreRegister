;
(function($) {
	$.fn.simpleTableFilter = function(option) {

		// �I�v�V�����ݒ�
		option = $.extend({
			autoFiltering : true
		}, option);

		return this
				.each(function() {

					// table �v�f�̎擾
					var target = $(this);

					// --------------------------------------------------------------
					// �t�B���^�����O�����̎����ƃe�[�u���ւ̃o�C���h
					// --------------------------------------------------------------

					target
							.on(
									'table-filtering',
									function() {

										// tr �Ń��[�v
										$(this)
												.find('> tbody > tr')
												.each(
														function() {

															// ��U tr
															// ��\����Ԃɂ���
															var tr = $(this)
																	.show();

															// td �Ń��[�v
															$(this)
																	.find('> *')
																	.each(
																			function(
																					index) {

																				// �Ή�����t�B���^���擾
																				var filter = option.filters[index];

																				// �t�B���^�̊��蓖�Ă��Ă邩�H
																				if (filter) {

																					// jQuery
																					// �I�u�W�F�N�g��
																					filter = $(filter);

																					// td
																					// �̒l�������������Ď擾
																					var data = $(
																							this)
																							.text()
																							.toLowerCase();

																					// �t�B���^�̒l�������������Ď擾
																					var filter_val = filter
																							.val()
																							.toLowerCase();

																					// ���W�I�{�^���̏ꍇ�͑I�����ꂽ�v�f����l���擾
																					if (filter
																							.prop('type') == 'radio') {
																						var filter_val = filter
																								.filter(
																										':checked')
																								.val()
																								.toLowerCase();
																					}

																					// �t�B���^�̒l��
																					// td
																					// �̒l�Ɋ܂܂�ĂȂ�������
																					if (data
																							.indexOf(filter_val) < 0) {

																						// tr
																						// ���\���ɂ���
																						tr
																								.hide();

																						// td
																						// �̃��[�v�𔲂���
																						return false;
																					}
																				}

																			});
														});
									});

					// --------------------------------------------------------------
					// �������̓t�B�[���h�ɕύX����������t�B���^�����O�������N������
					// --------------------------------------------------------------

					// �����t�B���^�����O�I�v�V�������L���̏ꍇ�̂݃o�C���h����
					if (option.autoFiltering) {

						// �������̓t�B�[���h�Ń��[�v
						for ( var i in option.filters) {

							// �L�[���͌�̃t�B���^�����O������x�����s�����邽�߂̃^�C�}�[�ϐ�
							var timer;

							// �t�B���^�������͎�
							$(option.filters[i]).on('keydown change',
									function() {

										// ���߂̃L�[���͂ɂ����s�҂��̃t�B���^�����O�������L�����Z��
										if (timer)
											clearTimeout(timer);

										// 300ms ��̃t�B���^�����O���s��\��
										timer = setTimeout(function() {
											target.trigger('table-filtering');
										}, 300);
									});
						}
					}

					// �t�B���^�����O�̎��s
					target.trigger('table-filtering');

				});
	}
})(jQuery);

function initFilter() {
	var json = {}
	$('table tbody tr').each(function() {
		json[$(this).find('> td:eq(3)').text() - 0] = '';
	});
	for ( var i in json) {
		$('<option/>').html(i).appendTo('#qty-filter')
	}

	$('table').simpleTableFilter({
		filters : {
			2 : '#name-filter'
		}
	});
}