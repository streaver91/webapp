if(app.DEBUG) {
  $('<a class="result-box result-box-special" href="javascript:;" data-location="42.426899,-76.513805">Walmart Supercenter</a>').appendTo('#addon-results');
  $('<div class="result-box" >TEST ALERT</div>').appendTo('#addon-results');
  app.fn.bindRouteAction();
}

if(app.version == 'beta') {
  $('<div class="result-box" style="background-color: rgba(255,255,255,0.6);white-space:normal;line-height:20px;font-size:18px;">NOTE: THIS IS A BETA TEST VERSION<br />WE MAY DISCONTINUE ITS SUPPORT AT ANY TIME<br />IF YOU HAVE ANY FEEDBACK, PLEASE SEND ME AN EMAIL AT: ROOT.GRAMMER.797@GMAIL.COM</div>').appendTo('#addon-results');
}