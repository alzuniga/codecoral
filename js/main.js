window.onload = function(){
	var iframe = $('.canvas').contents().find('body');
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

var resizing = false;
var recentXCoord = 0;

$().ready(function(){
	var main = $('section.main');
	var canvasPanel = $('div.canvas-panel');
	var canvas = $('iframe.canvas');
	var codePanel = $('div.code-panel');
	var grip = $('div.grip');

	grip.mousedown(function(e){
		resizing = true;
		recentXCoord = e.clientX;
	});

	$(document).mousemove(function(e){
		if(!resizing) return;

		var rightOffset = main.width() - (e.clientX - main.offset().left);
		canvasPanel.css('right', rightOffset);
		canvas.css('width',canvasPanel.width());
		codePanel.css('width', rightOffset);
	});
	grip.mouseup(function(e){
		resizing = false;
	});
});


// function getNewWidthPercentage(wrapperWidth, elementWidth){
// 	var elWidth = ((elementWidth - 52) / wrapperWidth) * 100;
// 	return elWidth.toFixed(2);
// }
