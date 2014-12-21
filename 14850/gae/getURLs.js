var routesLink = $('#leftColSub > p > a');

routesLink.each(function() {
	var $this = $(this);
	console.log('\'' + $this.text().match(/\d{2}/) + '\' => \'http://tcat.nextinsight.com/' + $this.attr('href') + '\',');
});