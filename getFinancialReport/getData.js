
var companies = $inputText.val().split('\n');
var market = 'LS';
var month = 'Jun';
var year = '2014';
var reportItems = [];
reportItems['is'] = ['Total Revenue', 'Cost of Revenue', 'Gross Profit', 'Operating Expenses', 'Research Development', 'Selling General and Administrative', 
	'Total Operating Expenses', 'Operating Income or Loss', 'Operating Income or Loss', 'Total Other Income/Expenses Net', 'Earnings Before Interest And Taxes',
	'Interest Expense', 'Income Before Tax', 'Net Income From Continuing Ops', 'Net Income'];
reportItems['bs'] = ['Cash And Cash Equivalents', 'Short Term Investments', 'Net Receivables', 'Inventory', 'Other Current Assets', 'Total Current Assets', 'Long Term Investments',
	'Property Plant and Equipment', 'Goodwill', 'Intangible Assets', 'Accumulated Amortization', 'Other Assets', 'Total Assets', 'Accounts Payable', 'Short/Current Long Term Debt',
	'Total Current Liabilities', 'Long Term Debt', 'Deferred Long Term Liability Charges', 'Total Liabilities', 'Common Stock', 'Retained Earnings', 'Total Stockholder Equity', 'Net Tangible Assets'];
reportItems['cf'] = ['Net Income', 'Depreciation', 'Changes In Accounts Receivables', 'Changes In Liabilities', 'Changes In Inventories', 'Changes In Other Operating Activities', 'Total Cash Flow From Operating Activities',
	'Capital Expenditures', 'Investments', 'Other Cash flows from Investing Activities', 'Total Cash Flows From Investing Activities', 'Dividends Paid', 'Sale Purchase of Stock', 'Net Borrowings',
	'Total Cash Flows From Financing Activities', 'Effect Of Exchange Rate Changes', 'Change In Cash and Cash Equivalents'];
var reports = [];
var rst = [];
var curRst = [];
var cnt = 0;
for(var c = 0; c < companies.length; c++) {
	for(var r in reportItems) {
		(function() {
			var company = companies[c];
			var report = r;
			var url = 'http://finance.yahoo.com/q/' + report + '?s=' + company + '.' + market;
			var $div = $('<div></div>');
			$.get(url, function(res) {
				var available = false;
				// Locate month location
				var monthLocation = 0;
				var $div = $(res);
				var $ele = $div.find('td:contains("Period Ending")').last();
				// console.log($ele);
				for(var m = 0; m < 4; m++) {
					$ele = $ele.next();
					if($ele.text().indexOf(month) != -1 && $ele.text().indexOf(year) != -1) {
					// if($ele.text().indexOf(month) != -1) {
						available = true;
						monthLocation = m;
						break;
					}
				}
				if(available == false) {
					console.log(company + ' ' + report + ' UNAVAILABLE');
					return;
				}
				// console.log(company + ' ' + report + ' AVAILABLE');
				reports[company] = reports[company] || [];
				// reports[company][report] = [];
				curRst = [];
				for(var i = 0; i < reportItems[report].length; i++) {
					$ele = $div.find('td:contains("' + reportItems[report][i] + '")').last().next();
					for(var loc = 0; loc < m; loc++) {
						$ele = $ele.next();
					}
					var rawData = $ele.text().trim().split(',').join('');
					// console.log(rawData);
					
					var value;
					
					if(rawData.indexOf('-') != -1) {
						value = 0;
					} else if(rawData.indexOf('(') != -1) {
						value = -1 * parseInt(rawData.split(/[\(\)]/).join(''));
					} else {
						value = parseInt(rawData);
					}
					curRst.push(value);
				}
				reports[company][report] = curRst;
				console.log(company + report);
				console.log(curRst);
			});				
		})();
	}
	/*
	var url = 'http://finance.yahoo.com/q/is?s=' + companies[c] + '.BR';
	(function() {
		var $tmp = $('<div></div>');
		var cc = c;
		$tmp.load(url, function() {
			// console.log('loaded');
			curRst.push(companies[cc]);
			curRst = [];
			for(var i = 0; i < reportItems['is'].length; i++) {
				var str = $tmp.find('td:contains("' + reportItems['is'][i] + '")').last().next().text().trim().split(',').join('');
				var val;
				if(str.indexOf('(') == -1) {
					val = parseInt(str);
				} else {
					val = -1 * parseInt(str.split(/[\(\)]/).join(''));
				}
				curRst.push(val);
			}
			cnt++;
			console.log(curRst);
			if(cnt == companies.length) {
				$rstText.text(rst.join('\n'));
			}
		});
	})();
	*/
}
