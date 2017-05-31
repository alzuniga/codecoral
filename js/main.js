/*==================================================
** HTML/CSS/JS editors and canvas
**================================================*/
var editor = {};

$('.panel').each(function(i, el){
  var lang = $(this).data('lang');
  editor[lang] = CodeMirror(el,{
    mode: (lang === 'html')? 'htmlmixed': lang,
    lineNumbers: true,
    lineWrapping: true,
    pollInterval: 1500,
    theme: 'monokai'
  });

  // editor[lang].setSize('100%', '86%');
  emmetCodeMirror(editor[lang]);
});
editor.html.on('change', function(editor){
  $('#canvas').contents().find('#html').html(editor.getValue());
});
editor.css.on('change', function(editor){
  $('#canvas').contents().find('#css').html(editor.getValue());
});
editor.javascript.on('change', function(editor){
  console.log(editor.getValue());
  // $('#canvas').contents().find('#javascript').html(editor.getValue());
  $('#canvas').contents().find('#html').append('<h2>Javascript panel currently disabled while in development</h2>');
  $('div[data-lang="javascript"] .CodeMirror div textarea').attr('disabled');
});

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
