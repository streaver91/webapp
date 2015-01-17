<?php

$routeURLs = array(
	'10' => 'http://tcat.nextinsight.com/routes.php?mrnid=416',
	'11' => 'http://tcat.nextinsight.com/routes.php?mrnid=428',
	'13' => 'http://tcat.nextinsight.com/routes.php?mrnid=453',
	'14' => 'http://tcat.nextinsight.com/routes.php?mrnid=313',
	'15' => 'http://tcat.nextinsight.com/routes.php?mrnid=415',
	'17' => 'http://tcat.nextinsight.com/routes.php?mrnid=343',
	'20' => 'http://tcat.nextinsight.com/routes.php?mrnid=314',
	'21' => 'http://tcat.nextinsight.com/routes.php?mrnid=315',
	'30' => 'http://tcat.nextinsight.com/routes.php?mrnid=386',
	'31' => 'http://tcat.nextinsight.com/routes.php?mrnid=318',
	'32' => 'http://tcat.nextinsight.com/routes.php?mrnid=424',
	'36' => 'http://tcat.nextinsight.com/routes.php?mrnid=389',
	'37' => 'http://tcat.nextinsight.com/routes.php?mrnid=322',
	'40' => 'http://tcat.nextinsight.com/routes.php?mrnid=391',
	'41' => 'http://tcat.nextinsight.com/routes.php?mrnid=340',
	'43' => 'http://tcat.nextinsight.com/routes.php?mrnid=393',
	'51' => 'http://tcat.nextinsight.com/routes.php?mrnid=460',
	'52' => 'http://tcat.nextinsight.com/routes.php?mrnid=329',
	'53' => 'http://tcat.nextinsight.com/routes.php?mrnid=330',
	'65' => 'http://tcat.nextinsight.com/routes.php?mrnid=401',
	'67' => 'http://tcat.nextinsight.com/routes.php?mrnid=422',
	'70' => 'http://tcat.nextinsight.com/routes.php?mrnid=478',
	'72' => 'http://tcat.nextinsight.com/routes.php?mrnid=320',
	'74' => 'http://tcat.nextinsight.com/routes.php?mrnid=325',
	'75' => 'http://tcat.nextinsight.com/routes.php?mrnid=406',
	'77' => 'http://tcat.nextinsight.com/routes.php?mrnid=407',
	'81' => 'http://tcat.nextinsight.com/routes.php?mrnid=408',
	'82' => 'http://tcat.nextinsight.com/routes.php?mrnid=398',
	'83' => 'http://tcat.nextinsight.com/routes.php?mrnid=430',
	'90' => 'http://tcat.nextinsight.com/routes.php?mrnid=410',
	'92' => 'http://tcat.nextinsight.com/routes.php?mrnid=426',
	'93' => 'http://tcat.nextinsight.com/routes.php?mrnid=427'
);

$_HOUR_INCREMENT_INTERVAL = 3;
$_GAE = true;
$_STEP_TIME = 3;

// Get query string
$start = $_GET['start'];
$startwalk = $_GET['startwalk'] + 0.0;
$end = $_GET['end'];
$endwalk = $_GET['endwalk'] + 0.0;
$token = $_GET['token'];

if(!isset($_GET['version'])) {
	exit();
}

$version = $_GET['version'];

if($version == 'pro') {
	$pro = true;
} else {
	$pro = false;
}

echo '// console.log(\'version: ' . $version . '\');';

date_default_timezone_set('America/New_York');

//set POST variables
$url = 'http://tcat.nextinsight.com/index.php';

// $time = time() - 38 * 60 * 60;
// $time = time() + 11 * 60 * 60;
$time = time() - 60;
for($i = 0; $i < 5; $i++) {
	echo '// searching start time: ' . date('Y-m-d H:i:s', $time) . PHP_EOL;
	if(date('a', $time) == 'am') {
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
		'day' => date('w', $time),
		'departure' => '0',
		'starthours' => date('g', $time),
		'startminutes' => date('i', $time),
		'startampm' => $startampm,
		'customer' => '1',
		'sort' => '1',
		'transfers' => '2',
		'addr' => '',
		'city' => 'Ithaca',
		'radius' => '.5'
	);
	
	$fields_string = http_build_query($fields);
	
	if($_GAE) {
		$context = [
			'http' => [
				'method' => 'POST',
				'content' => $fields_string
			]
		];
		$context = stream_context_create($context);
		$result = file_get_contents($url, false, $context);
	} else {
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_POST, count($fields));
		curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_COOKIEFILE, 'browser' . rand(0, 100) . '.txt');
		$result = curl_exec($ch);
		curl_close($ch);
	}
	
	preg_match_all('/<h4(?:\s+[^>]+)(.*?)<hr>/', $result, $routes);
	if(count($routes[1]) > 0) {
		break;
	}
	// echo $time;
	$time = strtotime('+' . $_HOUR_INCREMENT_INTERVAL . ' hours', $time);
}

$routesArr = array();

foreach($routes[1] as $route) {
	$currentRouteArr = array();
	$currentRouteOutputArr = array('<div class="route-box"><div class="route-box-detail">');
	
	// Get Trip Time Toal
	preg_match('/Estimated Trip Time: ([^<]*)/', $route, $timeString);
	// Extract steps description
	preg_match('/<strong>(.*)<br>/', $route, $steps);
	$steps = $steps[0];
	preg_match_all('/(.*?)(?:<br>|<br \/>)/', $steps, $steps);
	$steps = $steps[1];
	$numOfSteps = substr_count($route, 'Pay');
	echo '// Num of steps: ' . $numOfSteps;
	// echo '// ' . json_encode($steps);
	$timeArr = preg_split('/\D+/', $timeString[1], -1, PREG_SPLIT_NO_EMPTY);
	// if(count($timeArr) == 1) {
	if(preg_match('/hour/', $timeString[1]) == 0) {
		$timeTotal = $timeArr[0] + ceil($startwalk) + ceil($endwalk);
	} else {
		// echo '// timeArr: ' . json_encode(timeArr);
		$timeTotal = $timeArr[0] * 60 + $timeArr[1] + ceil($startwalk) + ceil($endwalk);
	}
	$timeTotal += ($numOfSteps - 1) * $_STEP_TIME;
	$currentRouteArr['timeTotal'] = $timeTotal;
	$busTimeSet = false;
	
	// Generate output
	array_push($currentRouteOutputArr, '<div class="route-box-totaltime">Estimated trip time: <span>' . ceil($timeTotal) . '</span> min</div>');
	array_push($currentRouteOutputArr, '<table>');
	
	
	// Extract info from each step
	foreach($steps as $index => $step) {
	
		// Neglect payment info
		if(preg_match('/<u>Pay<\/u>/', $step)) {
			continue;
		}
		// Calculate arrival time
		if(preg_match('/(?:<strong>(.*):<\/strong>|<b>(.*):<\/b>)/', $step, $busTime)) {
			$step = str_replace($busTime[0], '', $step);
			$busTime = $busTime[1];
			if($busTimeSet == false) {
				$busTimeSet = true;
				$timeArrival = strtotime(date('Y-m-d ', $time) . $busTime) + ($timeTotal - $startwalk) * 60;
				if($timeArrival < $time) {
					$timeArrival += 24 * 60 * 60;
				}
				echo '// ' . date('Y-m-d H:i:s', strtotime(date('Y-m-d ', $time) . $busTime)) . ' ' . $timeTotal . ' ';
				echo date('Y-m-d H:i:s', $timeArrival) . PHP_EOL;
				$currentRouteArr['timeArrivalStr'] = date('m/d/Y H:i:s', $timeArrival);
				$currentRouteArr['timeArrival'] = $timeArrival;
			}
		} else {
			$busTime = '';
		}
		$step = str_replace('</a>', '</span>', $step);
		$step = str_replace('<sup>D</sup>', '', $step);
		$step = str_replace('.', '', $step);
		$step = preg_replace('/<a[^>]*>/', '<span class="route-bus-num">', $step);
		preg_match_all('/Route (\d{2})/', $step, $involvedRoutes);
		// print_r($involvedRoutes);
		foreach($involvedRoutes[1] as $routeId => $involvedRoute) {
			if($involvedRoute == '79' || $involvedRoute == '96') continue;
			$routeURL = $routeURLs[$involvedRoute];
			// echo $routeURL;
			// $step = preg_replace('/Route ' . $involvedRoute . '/', '<a class="route-link" href="javascript:;" onclick="window.open(encodeURI(\'' . $routeURL . '\'), \'_system\')">Route ' . $involvedRoute . '</a>', $step);
			$step = preg_replace('/Route ' . $involvedRoute . '/', '<a class="route-link" href="' . $routeURL . '">Route ' . $involvedRoute . '</a>', $step);
			// console.log($step);
		}
		$step = '<tr><td class="route-box-time">' . $busTime . '</td><td>' . $step . '</td></tr>';
		array_push($currentRouteOutputArr, $step);
	}
	array_push($currentRouteOutputArr, '</table></div><hr class="route-hr" /></div>');
	
	// Combine output strings
	$currentRouteArr['output'] = implode('', $currentRouteOutputArr);
	array_push($routesArr, $currentRouteArr);
}
?>
app.fn.addRoutes(<?php echo json_encode($routesArr);?>, <?php echo $token; ?>);