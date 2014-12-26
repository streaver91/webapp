var NUM_OF_TEXTAREAS = 5;

var _load = function(filename, callback) {
  var match = filename.match(/\.(js|css)$/);
  if(!match) return;
  var type = match[1];
  if (type == 'js'){ //if filename is a external JavaScript file
    var script = document.createElement('script');
    script.setAttribute('type','text/javascript');
    script.setAttribute('src', filename);
  }
  else if (type == 'css'){ //if filename is an external CSS file
    var script = document.createElement('link');
    script.setAttribute('rel', 'stylesheet');
    script.setAttribute('type', 'text/css');
    script.setAttribute('href', filename);
  }
  document.getElementsByTagName('head')[0].appendChild(script);
  script.onload = callback;
};

var _toLoad = [
  '//code.jquery.com/ui/1.11.2/themes/smoothness/jquery-ui.css',
  '//code.jquery.com/jquery-1.10.2.js',
  '//code.jquery.com/ui/1.11.2/jquery-ui.js'
];

var _loadCount = 0;

var _checkLoad = (function(script) {
  return function() {
    _loadCount++;
    console.log('Script loaded: ' + script);
    if(_loadCount == _toLoad.length) {
      _setup();
    }
  };
});

var _setup = function() {
  var _$textareas = [];
  for(var i = 0; i < NUM_OF_TEXTAREAS; i++) {
    var $container = $('<div id="scf-container-' + i + '"></div>').appendTo('body');
    // $container = $('#scf-container-' + i);
    $container.css({
      'position': 'absolute',
      'height': '180px',
      'width': '300px',
      'background-color': '#fff',
      'top': (200 * i + 50) + 'px',
      'left': '50px',
      'z-index': '2000',
      'border': '1px solid #ccc',
      'opacity': '0.7'
    });
    $container.draggable();
    var $title = $('<div>Container ' + i + '</div>').appendTo('#scf-container-' + i);
    var $textarea = $('<textarea id="scf-textarea-' + i + '"></textarea>').appendTo('#scf-container-' + i);
    $textarea.css({
      'position': 'absolute',
      'height': '145px',
      'width': '275px',
      'top': '20px',
      'left': '10px',
      'overflow': 'scroll',
      'white-space': 'nowrap'
    });
    _$textareas.push($textarea);
  }
  
  var scf = (function() {
    return {
      get: function(id) {
        return _$textareas[id].val();
      },
      set: function(id, str) {
        _$textareas[id].val(str);
        return this;
      }
    };
  })();
  window.scf = scf;
};

for(var i = 0; i < _toLoad.length; i++) {
  _load(_toLoad[i], _checkLoad(_toLoad[i]));
}