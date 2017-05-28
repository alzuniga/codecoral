window.onload = function() {
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

  window.editor.on('change', function() {
    iframe.html(window.editor.getValue());
  });
};

$('.code-panel').resizable({
  alsoResizeReverse: '.canvas-panel',
  containment: 'section.main',
  handles: 'e',
  minWidth: 300,
  maxWidth: 640
});

// function getNewWidthPercentage(wrapperWidth, elementWidth){
// 	var elWidth = ((elementWidth - 52) / wrapperWidth) * 100;
// 	return elWidth.toFixed(2);
// }
