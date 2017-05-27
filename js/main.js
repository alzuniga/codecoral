window.onload = function(){
	var iframe = $('#canvas').contents().find('body');
	var cpcWidth = $('#code-panel-container').width();
	window.editor = CodeMirror.fromTextArea(code, {
		mode: 'text/html',
		lineNumbers: true,
		lineWrapping: true,
		pollInterval: 1000,
		theme: 'monokai',
		profile: 'xhtml'
	});
	window.editor.setSize(null, '100%');
	emmetCodeMirror(window.editor);

	window.editor.on('change',function(){
		iframe.html(window.editor.getValue());
	});
};
