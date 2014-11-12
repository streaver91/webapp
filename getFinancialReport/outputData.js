var outputStr = [];
var curRst = [];

// Title
curRst.push('COMP');
for(var r in reportItems) {
	for(var i = 0; i < reportItems[r].length; i++) {
		curRst.push(reportItems[r][i]);
	}
}
outputStr.push(curRst.join('\t'));

// Data
for(var company in reports) {
	curRst = [];
	curRst.push(company);
	for(var r in reportItems) {
		for(var i = 0; i < reportItems[r].length; i++) {
			curRst.push(reports[company][r][i]);
		}
	}
	outputStr.push(curRst.join('\t'));
}
$outputText.text(outputStr.join('\n'));