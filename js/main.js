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

// Update canvas on html editor change
editor.html.on('change', function(editor){
  $('#canvas').contents().find('#html').html(editor.getValue());
});

// Update canvas on css editor change
editor.css.on('change', function(editor){
  $('#canvas').contents().find('#css').html(editor.getValue());
});

// Update canvas on javascript editor change
// Using debounce to throttle how often updates take place
editor.javascript.on('keyup', debounce(function(editor, change){
  // document.getElementById('canvas').contentWindow.eval(editor.getValue());
  $('#canvas').contents().find('#javascript').html(editor.getValue());
  document.getElementById('canvas').contentWindow.postMessage(editor.getValue(), '*');
  $(editor.javascript).blur();
}, 1000));


/*==================================================
** Document ready initializations
**================================================*/
$().ready(function(){
  var wrapperHeight = $('.main').height();

  // set code panels and canvas panel widths
  $('.main .panel-wrap').width(Math.floor($('.main').width() * 0.3));
  $('.canvas-panel').width(Math.floor($('.main').width() * 0.7));

  // set code panels heights
  var panelHeights = Math.floor((wrapperHeight / 3) - 34);

  $('.main .panel .CodeMirror').css({
    'height': panelHeights + 'px'
  }); // $('.main .panel .CodeMirror').css();

  // make panels resizable
  $('.main .panel-wrap').resizable({
    alsoResizeReverse: '.canvas-panel',
    containment: 'section.main',
    handles: 'e'
  }); // $('.main .panel-wrap').resizable();

  // table panel functionality
  $('.toggleButton').click(function(){
    var lang = $(this).data('lang');
    $('[data-lang="' + lang + '"]').toggleClass('active').toggleClass('inactive');

    var activePanels = 3 - $('.panel.inactive').length;
    var newPanelHeight = Math.floor((wrapperHeight / activePanels) - 34);

    $('.main .active .CodeMirror').css({
      'height': newPanelHeight + 'px'
    }); // $('.main .active .CodeMirror').css();
  }); // $('.toggleButton').click();

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
