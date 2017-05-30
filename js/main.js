/*==================================================
** HTML/CSS/JS editors and canvas
**================================================*/

var editor = {};
$('#output').find('head').append('<style></style>\n<script></script>');
var iframeTarget = {
  html: $('#output').find('body'),
  css: $('#output').find('style'),
  javascript: $('#output').find('script')
};
$('.panel').each(function(i, el){
  var lang = $(this).data('lang');
  editor[lang] = CodeMirror(el,{
    mode: lang,
    lineNumbers: true,
    lineWrapping: true,
    pollInterval: 1500,
    theme: monokai
  });

  editor[lang].setSize(null, '100%');
  emmetCodeMirror(editor[lang]);
  editor.html.on('change', function(editor){
    $('#canvas').find('#' + lang).html(editor.getValue());
  });
});

/*==================================================
** Document ready initializations
**================================================*/
$().ready(function(){
  // intialize editors
  initEditor('html');
  initEditor('css');
  initEditor('js');
  // set code panels and canvas panel widths
  $('.main [class^="code-panel-"]').width(Math.floor($('.main').width() * 0.3));
  $('.canvas-panel').width(Math.floor($('.main').width() * 0.7));
  // make panels resizable
  $('.main [class^="code-panel-"]').resizable({
    alsoResizeReverse: '.canvas-panel',
    containment: 'section.main',
    handles: 'e'
  });
  // table panel functionality
  $('ul li[class^="code-panel-"]').click(function() {
    var selectedPanel = $(this).attr('class').split(' ')[0];
    $('[class^="code-panel-"]').not('.' + selectedPanel).removeClass('active');
    $('.' + selectedPanel).addClass('active');
    // set code panels and canvas panel widths
    $('.main [class^="code-panel-"]').width(Math.floor($('.main').width() * 0.3));
    $('.canvas-panel').width(Math.floor($('.main').width() * 0.7));
    // $('ul li[class^="code-panel-"]').not(selectedPanel).hasClass('active').toggleClass('active');
    // var currPanel = $(this).attr('class').split(' ')[0];
    // $('[class^="code-panel-"]').not(currPanel).removeClass('active');
    // $('[class="' + currPanel + '"]').addClass('active');
  });
});

// function getNewWidthPercentage(wrapperWidth, elementWidth){
// 	var elWidth = ((elementWidth - 52) / wrapperWidth) * 100;
// 	return elWidth.toFixed(2);
// }
