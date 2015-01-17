<?php
exit();
// Get query string
$start = $_GET['start'];
$startwalk = $_GET['startwalk'] + 0.0;
$end = $_GET['end'];
$endwalk = $_GET['endwalk'] + 0.0;
$token = $_GET['token'];

date_default_timezone_set('America/New_York');

//set POST variables
$url = 'http://tcat.nextinsight.com/index.php';

if(date('a') == 'am') {
	$startampm = '0';
} else {
	$startampm = '1';
}

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
	'day' => date('w'),
	'departure' => '0',
	'starthours' => date('g'),
	'startminutes' => date('i'),
	'startampm' => $startampm,
	'customer' => '1',
	'sort' => '1',
	'transfers' => '2',
	'addr' => '',
	'city' => 'Ithaca',
	'radius' => '.25'
);

$fields_string = '';
foreach($fields as $key => $value) {
	$fields_string .= $key . '=' . $value . '&';
}
rtrim($fields_string, '&');

// Fetch results
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, count($fields));
curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_COOKIEFILE, 'browser' . rand(0, 100) . '.txt');
$result = curl_exec($ch);
curl_close($ch);

preg_match_all('/<h4(?:\s+[^>]+)(.*?)<hr>/', $result, $routes);

// print_r($routes[1]);

$routesArr = array();

foreach($routes[1] as $route) {
	$currentRouteArr = array();
	$currentRouteOutputArr = array('<div class="route-box"><div class="route-box-detail">');
	
	// Get Trip Time Toal
	preg_match('/Estimated Trip Time: ([^<]*)/', $route, $timeString);
	$timeArr = preg_split('/\D+/', $timeString[1], -1, PREG_SPLIT_NO_EMPTY);
	if(count($timeArr) == 1) {
		$timeTotal = $timeArr[0] + ceil($startwalk) + ceil($endwalk);
	} else {
		$timeTotal = $timeArr[0] * 60 + $timeArr[1] + ceil($startwalk) + ceil($endwalk);
	}
	array_push($currentRouteOutputArr, '<div class="route-box-totaltime">Estimated trip time: <span>' . ceil($timeTotal) . '</span> min</div>');
	$currentRouteArr['timeTotal'] = $timeTotal;
	$busTimeSet = false;
	
	// Generate output
	// Extract steps description
	preg_match('/<strong>(.*)<br>/', $route, $steps);
	$steps = $steps[0];
	preg_match_all('/(.*?)(?:<br>|<br \/>)/', $steps, $steps);
	$steps = $steps[1];
	array_push($currentRouteOutputArr, '<table>');
	
	// Extract info from each step
	foreach($steps as $index => $step) {
	
		// Neglect payment info
		if(preg_match('/<u>Pay<\/u>/', $step)) {
			continue;
		}
		
		// Calculate arrival time
		// echo '// ' . json_encode($step);
		
		if(preg_match('/(?:<strong>(.*):<\/strong>|<b>(.*):<\/b>)/', $step, $busTime)) {
			$step = str_replace($busTime[0], '', $step);
			$busTime = $busTime[1];
			if($busTimeSet == false) {
				$busTimeSet = true;
				$timeArrival = strtotime(date('Y-m-d') . $busTime) + ($timeTotal - $startwalk) * 60;
				$currentRouteArr['timeArrivalStr'] = date('m/d/Y H:i:s', $timeArrival);
				$currentRouteArr['timeArrival'] = $timeArrival;
			}
		} else {
			$busTime = '';
		}
		$step = str_replace('</a>', '</span>', $step);
		$step = str_replace('.', '', $step);
		$step = preg_replace('/<a[^>]*>/', '<span class="route-bus-num">', $step);
		array_push($currentRouteOutputArr, '<tr><td class="route-box-time">' . $busTime . '</td><td>' . $step . '</td></tr>');
		
	}
	array_push($currentRouteOutputArr, '</table></div><hr class="route-hr" /></div>');
	
	// Combine output strings
	$currentRouteArr['output'] = implode('', $currentRouteOutputArr);
	array_push($routesArr, $currentRouteArr);
}
?>
app.fn.addRoutes(<?php echo json_encode($routesArr);?>, <?php echo $token; ?>);
// console.log(<?php echo json_encode($routesArr);?>);