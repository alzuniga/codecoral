/*
 * TODO: Fix focus/blur issue;
 *       Fix document.write issue
 */

/*==================================================
** HTML/CSS/JS editors and canvas
**================================================*/
var editor = {};

// loop to set-up each editor
$('.panel').each(function(i, el){
  var lang = $(this).data('lang');
  editor[lang] = CodeMirror(el,{
    mode: (lang === 'html')? 'htmlmixed': lang,
    theme: 'monokai',
    tabSize: 2,
    lineWrapping: true,
    lineNumbers: true
  });

  // add Emmet functionality to editors
  emmetCodeMirror(editor[lang]);

});

// Update sandbox on html editor change
editor.html.on('change', function(editor){
  $('#sandbox').contents().find('#html').html(editor.getValue());
});

// Update sandbox on css editor change
editor.css.on('change', function(editor){
  $('#sandbox').contents().find('#css').html(editor.getValue());
});

// Update sandbox on javascript editor change
// Using debounce to throttle how often updates take place
editor.javascript.on('keyup', debounce(function(editor, change){
  // document.getElementById('sandbox').contentWindow.eval(editor.getValue());
  $('#sandbox').contents().find('#javascript').html(editor.getValue());
  document.getElementById('sandbox').contentWindow.postMessage(editor.getValue(), '*');
  $(editor.javascript).blur();
}, 1000));


/*==================================================
** Document ready initializations
**================================================*/
$().ready(function(){
  // Get and set panel widths
  var code = parseInt($('#code').width(), 10);
  var slider = parseInt($('#slider').width(), 10);
  var canvas = parseInt($('#canvas').width(), 10);
  var minWidth = parseInt((code + slider + canvas) * 10 / 100, 10);
  var offset = $('.container-fluid').offset();
  var containerHeight = $('.container-fluid').height();
  var editorsHeights = Math.floor((containerHeight / 3) /*- 34*/);

  $('#code .panel .CodeMirror').css('height', editorsHeights + 'px');

  var splitter = function(e, ui){
    var codeWidth = parseInt(ui.position.left);
    var canvasWidth = code + canvas - codeWidth;
    $('#code').css({width : codeWidth});
    $('#canvas').css({width : canvasWidth});
  };
  // Make slider draggable - jQuery-UI
  $('#slider').draggable({
    axis : 'x',
    containment : [
        offset.left + minWidth,
        offset.top,
        offset.left + code + canvas - minWidth,
        offset.top + $('.container-fluid').height()
        ],
    drag : splitter
  });

  window.addEventListener('devtoolschange', function (e) {
		console.log('is DevTools open?', e.detail.open);
		console.log('and DevTools orientation?', e.detail.orientation);
	});
});

// function getNewWidthPercentage(wrapperWidth, elementWidth){
// 	var elWidth = ((elementWidth - 52) / wrapperWidth) * 100;
// 	return elWidth.toFixed(2);
// }

/*==================================================
** Utility functions
**================================================*/

// debounce - used to throttle how a function executes
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

window.addEventListener('message',function (e) {
  var frame = document.getElementById('canvas');
  if (e.origin === "null" && e.source === frame.contentWindow)
    alert('Result: ' + e.data);
});
