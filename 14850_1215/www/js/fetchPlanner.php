$('#search-label').html('Results');
<?php
$start = $_GET['start'];
$end = $_GET['end'];

//set POST variables
$url = 'http://tcat.nextinsight.com/index.php';


$fields = array(
	'wml' => '',
	'addrO' => '',
	'latO' => '',
	'lonO' => '',
	'addrD' => '',
	'latD' => '',
	'lonD' => '',
	'origin' => '',
	'destination' => '',
	'search' => 'search',
	'fulltext' => '',
	'radiusO' => '',
	'radiusD' => '',
	'addressid1' => '',
	'addressid2' => '',
	'start' => $start,
	'end' => $end,
	'day' => '0',
	'departure' => '0',
	'starthours' => '12',
	'startminutes' => '5',
	'startampm' => '1',
	'customer' => '1',
	'sort' => '1',
	'transfers' => '2',
	'addr' => '',
	'city' => 'Ithaca',
	'radius' => '.25'
);

$fields_string = '';
//url-ify the data for the POST
foreach($fields as $key => $value) {
	$fields_string .= $key.'='.$value.'&';
}
rtrim($fields_string, '&');


//open connection
$ch = curl_init();

//set the url, number of POST vars, POST data
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, count($fields));
curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

//execute post
$result = curl_exec($ch);

//close connection
curl_close($ch);

// echo($result);

preg_match_all('/<h4(?:\s+[^>]+)(.*?)<hr>/', $result, $routes);
// print_r($routes[1]);

foreach($routes[1] as $route) {
?>
$('#route-wrap').append('<div class="route-box"><div class="route-box-detail"><table><?php
	preg_match('/<strong>(.*)<br>/', $route, $steps);
	$steps = $steps[0];
	preg_match_all('/(.*?)(?:<br>|<br \/>)/', $steps, $steps);
	$steps = $steps[1];
	// print_r($steps);
	foreach($steps as $step) {
		if(preg_match('/<u>Pay<\/u>/', $step)) {
			continue;
		}
		if(preg_match('/(?:<strong>(.*):<\/strong>|<b>(.*):<\/b>)/', $step, $time)) {
			// print_r($time);
			$step = str_replace($time[0], '', $step);
			$time = $time[1];
		} else {
			$time = '';
		}
		$step = str_replace('</a>', '</span>', $step);
		$step = str_replace('.', '', $step);
		$step = preg_replace('/<a[^>]*>/', '<span class="route-bus-num">', $step);
		echo '<tr><td class="route-box-time">' . $time . '</td><td>' . $step . '</td></tr>';
	}
?></table></div><hr class="route-hr" /></div>');
<?php
}
?>
$('#route-wrap').append('<div class="route-box"><div class="route-box-detail" style="font-size:14px;">Data From TCATBus Official Website</div></div>');