/*==================================================
** HTML/CSS/JS editors and canvas
**================================================*/
var iframe = $('.canvas').contents();           // iframe for code
var panels = {
  html: {
    target: iframe.find('body#codeCoralHtml')  // target body tag of iframe
  },
  css: {
    target: iframe.find('style#codeCoralCss')  // target style tag of iframe
  },
  js: {
    target: iframe.find('script#codeCoralJs')  // target script tag of iframe
  }
};

// function to create HTML/CSS/JS editors
function initEditor(language){
  // grab panel based on specified language
  var el = $('.main .code-panel-' + language)[0];
  var lang = '';
  if(language === 'js') lang = 'javascript';
  else if (language === 'html') lang = 'htmlmixed';
  else lang = language;

  window['editor' + language] = CodeMirror(el,{
    mode: lang,
    lineNumbers: true,
    lineWrapping: true,
    pollInterval: 1500,
    theme: 'monokai'
  });

  window['editor' + language].setSize(null, '100%');
  emmetCodeMirror(window['editor' + language]);
  window['editor' + language].on('change', function(ed){
    panels[language].target.html(window['editor' + language].getValue());
  });
}

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
