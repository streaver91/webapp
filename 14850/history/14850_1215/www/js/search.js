var C = {
	SEARCH_HINT: 'WHERE TO?'
};

var V = {
};

var F = (function() {
	var _GOOGLE_KEY = 'AIzaSyAtFRqiCFal5V45ugeSg7kuozo4D_xQrBM';
	var _GEOCODING_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
	
	var _show_search = function() {
		$('#search-results').slideDown();
		$('#recent-results').fadeOut();
		$('#special-results').fadeOut();
	};
	
	var _show_recommend = function() {
		$('#search-results').fadeOut();
		$('#recent-results').slideDown();
		$('#special-results').slideDown();
	};
	
	var _show_destination = function(lat2, lng2) {
		/*
		console.log('show dest');
		$('#map-canvas').remove();
		$('.route-map').prepend('<div id="map-canvas"></div>');
		var mapOptions = {zoom: 15, center: new google.maps.LatLng(lat2, lng2)};
		V.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		*/
		V.map.panTo(new google.maps.LatLng(lat2, lng2));
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(lat2, lng2),
		});
		marker.setMap(V.map);
		V.lastMarker = marker;
		google.maps.event.trigger(V.map, 'resize'); 
	};
	
	var _search_route = function(lat1, lng1, lat2, lng2) {
		_show_destination(lat2, lng2);
		var script = document.createElement( 'script' );
		script.type = 'text/javascript';
		script.src = 'http://10.144.20.154/webapp/14850/www/js/fetchPlanner.php?start=9351&end=9225';
		document.getElementsByTagName("body")[0].appendChild(script)
		console.log(arguments);
	};
	
	return {
		search: function() {
			console.log($('#search-box').val());
			var address = $('#search-box').val();
			if(address == C['SEARCH_HINT']) return;
			$.get(_GEOCODING_URL, {address: address, key: _GOOGLE_KEY, components: 'postal_code:14850'}, function(data) {
				console.log(data);
				var results = data.results;
				$('#search-results').empty();
				
				if(results.length == 1 && results[0].formatted_address == 'Ithaca, NY 14850, USA') {
					$('<div class="result-box" >No Result Found</div>').appendTo('#search-results');
				} else {
					for(var i = 0; i < results.length && i < 5; i++) {
						var loc = results[i].geometry.location;
						var locStr = [loc.lat, loc.lng].join(',');
						$('<a class="result-box" href="javascript:;" data-location="' + locStr + '">' + results[i].formatted_address + '</a>').appendTo('#search-results');
					}
				}
				_show_search();
				F.bindClick();
			});
		},
		recommend: function() {
			_show_recommend();
		},
		loadRecent: function() {
			var recentLocations = JSON.parse(window.localStorage.getItem('recent'));
			if(recentLocations == null) return;
			for(var i = 0; i < recentLocations.length; i++) {
				$('#recent-results').append('<a class="result-box" href="javascript:;" data-location="' + recentLocations[i].latlng + '">' + recentLocations[i].address + '</a>');
			}
		}
		bindClick: function() {
			$('.result-box').click(function() {
				var $this = $(this);
				if(V.lastMarker) {
					V.lastMarker.setMap(null);
				}
				$('.route-box').remove();
				$('#search-label').html('Searching tcatbus');
				$('#route').fadeIn();
				navigator.geolocation.getCurrentPosition(function(position) {
					var lat1 = position.coords.latitude;
					var lng1 = position.coords.longitude;
					var destArr = $this.data('location').split(',');
					var lat2 = parseFloat(destArr[0]);
					var lng2 = parseFloat(destArr[1]);
					_search_route(lat1, lng1, lat2, lng2);
					
				});
				
				// Save recent searches
				alert($this.html());
				var recentLocations = JSON.parse(window.localStorage.getItem('recent')) || [];
				for(var i = 0; i < recentLocations.length; i++) {
					if(recentLocations[i].address == $this.html()) {
						recentLocations[i].time = (new Date()).getTime();
						break;
					}
				}
				if(i == recentLocations.length) {
					recentLocations.push({
						address: $this.html(),
						latlng: $this.data('location'),
						time: (new Date()).getTime()
					});
				}
				recentLocations.sort(function(a, b) {
					return a.time - b.time;
				});
				recentLocations = recentLocations.slice(0, 5);
				window.localStorage.setItem('recent', JSON.stringify(recentLocations));
			});
		},
		initializeMap: function() {
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&' +
			  'callback=F.showIthacaMap';
			document.body.appendChild(script);
		},
		showIthacaMap: function() {
			var mapOptions = {zoom: 15, center: new google.maps.LatLng(42.444188, -76.502323)};
			V.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		}
	};
})();

$('#search-box').focus(function() {
	var $this = $(this);
	if($this.val() == C['SEARCH_HINT']) {
		$this.val('');
	} else {
		$this.select();
	}
});

V.lastAddrModTime = 0;
$('#search-box').on('keyup paste focusout', function(event) {
	if(event.charCode == 13) {
		F.search();
		return;
	}
	var curTime = (new Date()).getTime()
	V.lastAddrModTime = curTime;
	console.log(V.lastAddrModTime);
	setTimeout(function() {
		if(curTime == V.lastAddrModTime && $('#search-box').val().length >= 3 && $('#search-box').val().length != C['SEARCH_HINT']) {
			F.search();
		}
	}, 500);
	if($('#search-box').val().length < 3 || $('#search-box').val().length == C['SEARCH_HINT']) {
		F.recommend();
	}
	var $this = $(this);
	if($this.val() == '') {
		$this.val(C['SEARCH_HINT']);
	}
});

$('#route-map-back').click(function() {
	$('#route').fadeOut();
});

$(document).ready(function() {
	F.bindClick();
	F.initializeMap();
	F.loadRecent();
});
