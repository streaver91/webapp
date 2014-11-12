// Load jQuery
var root = 'http://localhost/webapp/getFinancialReport/';
var jQuery = document.createElement('script');
jQuery.src = root + 'jquery.js';
document.head.appendChild(jQuery);

if(!$inputText) {
	var $inputText = $('<textarea id="result" style="z-index:12000;position:fixed;width:200px;height:400px;top:80px;left:1150px;"></textarea>');
	$inputText.appendTo(document.body);
}

if(!$outputText) {
	var $outputText = $('<textarea id="result" style="z-index:12000;position:fixed;width:200px;height:400px;top:500px;left:1150px;"></textarea>');
	$outputText.appendTo(document.body);
}