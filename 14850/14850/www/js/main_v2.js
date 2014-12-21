var app = app || {};

app.fn = (function() {
  var _HINT = 'WHERE TO?';
  var _GOOGLE_KEY = 'AIzaSyAtFRqiCFal5V45ugeSg7kuozo4D_xQrBM';
  var _GEOCODING_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
  var _GEOBOUNDS = '42.298304,-76.711971|42.672286,-76.218885';
  // var _HOST_ADDRESS = 'http://10.128.9.43';
  // var _HOST_ADDRESS = 'http://127.0.0.1:10080';
  var _HOST_ADDRESS = 'http://root-grammar-797.appspot.com';
  var _ROUTE_FETCH_URL = _HOST_ADDRESS + '/fetchPlanner.php';
  var _ADDON_URL = _HOST_ADDRESS + '/addon.php';
  var _ROUTE_SEARCH_TIMEOUT = 2000;
  var _PENALTY_DISTANCE = 400;
  var _MAX_DISTANCE = 1000;
  var _stops = [{"stop":"Alpha Epsilon Pi","lat":42.453809,"lng":-76.487995,"stopid":9342},{"stop":"A Lot","lat":42.45815,"lng":-76.475667,"stopid":3660},{"stop":"Aldi","lat":42.449233,"lng":-76.50645,"stopid":8086},{"stop":"Albany @ Salvation Army","lat":42.43988,"lng":-76.501809,"stopid":9182},{"stop":"Anabel Taylor Hall","lat":42.444837,"lng":-76.485172,"stopid":8091},{"stop":"Airport","lat":42.489067,"lng":-76.4626,"stopid":2220},{"stop":"Asbury @ Triphammer","lat":42.526741,"lng":-76.491795,"stopid":9355},{"stop":"Appel Commons @ Cradit Farm","lat":42.453323,"lng":-76.476125,"stopid":9340},{"stop":"Aubles Trailer Park","lat":42.547383,"lng":-76.676117,"stopid":6500},{"stop":"Auburn Rd. (Rt. 34) @ Buck Rd.","lat":42.556779,"lng":-76.493983,"stopid":9357},{"stop":"Auburn Rd. (Rt. 34) @ E. Lansing/Searles","lat":42.567542,"lng":-76.492975,"stopid":9358},{"stop":"Aurora @ Commons","lat":42.439219,"lng":-76.49559,"stopid":8064},{"stop":"B Lot","lat":42.446745,"lng":-76.463465,"stopid":8102},{"stop":"Baker Flagpole","lat":42.44782,"lng":-76.487736,"stopid":3900},{"stop":"Baker Flagpole/Slopeside","lat":42.447817,"lng":-76.487483,"stopid":8083},{"stop":"Balch Hall @ Cradit Farm","lat":42.452893,"lng":-76.479412,"stopid":8092},{"stop":"Balch Hall @ Thurston","lat":42.452977,"lng":-76.480991,"stopid":3600},{"stop":"Bed Bath and Beyond","lat":42.429238,"lng":-76.513381,"stopid":9215},{"stop":"Boiceville Rd. @ Rt. 79","lat":42.393639,"lng":-76.362834,"stopid":9368},{"stop":"Boyce-Thompson Institute","lat":42.447451,"lng":-76.467465,"stopid":3360},{"stop":"BOCES (Elmira Rd.)","lat":42.429958,"lng":-76.504908,"stopid":9135},{"stop":"BOCES (TST BOCES-Warren Rd.)","lat":42.475128,"lng":-76.466008,"stopid":9249},{"stop":"Boldt Hall","lat":42.449263,"lng":-76.48925,"stopid":9032},{"stop":"Bradfield Hall","lat":42.447717,"lng":-76.476583,"stopid":8093},{"stop":"Brentwood Dr. @ Arrowood Dr.","lat":42.4791,"lng":-76.463385,"stopid":9251},{"stop":"Boynton Middle School","lat":42.460748,"lng":-76.497213,"stopid":9197},{"stop":"Bradfield Parking Lot","lat":42.447436,"lng":-76.476558,"stopid":8094},{"stop":"Brooktondale Park & Ride Outbound","lat":42.380902,"lng":-76.393331,"stopid":5115},{"stop":"Brooktondale Store","lat":42.381583,"lng":-76.396667,"stopid":5110},{"stop":"Brooktondale Park and Ride Inbound","lat":42.381028,"lng":-76.393182,"stopid":9057},{"stop":"Brown Rd. @ Culligan","lat":42.487509,"lng":-76.464565,"stopid":9268},{"stop":"Buttermilk Falls @ Rt. 13","lat":42.417576,"lng":-76.523455,"stopid":1900},{"stop":"Buffalo @ Fulton (Greenstar backside)","lat":42.440846,"lng":-76.511246,"stopid":9054},{"stop":"Campbell @ Brookfield Rd.","lat":42.455278,"lng":-76.524163,"stopid":9205},{"stop":"Campbell @ Hopkins Pl.","lat":42.456533,"lng":-76.524614,"stopid":9204},{"stop":"Candlewyck Dr @ Route 96 (Trumansburg Rd","lat":42.460016,"lng":-76.528616,"stopid":9207},{"stop":"Buttermilk Falls SP - Lower entrance","lat":42.416937,"lng":-76.521886,"stopid":9404},{"stop":"Campbell @ Hector St. (Rte. 79)","lat":42.452468,"lng":-76.523348,"stopid":9203},{"stop":"Caroline Turn-Around","lat":42.378215,"lng":-76.278395,"stopid":8072},{"stop":"Carpenter Hall","lat":42.44505,"lng":-76.48495,"stopid":9020},{"stop":"Cascadilla @ Albany","lat":42.444442,"lng":-76.502089,"stopid":9155},{"stop":"Caroline Town Hall","lat":42.393883,"lng":-76.349783,"stopid":5140},{"stop":"Cascadilla @ Cayuga","lat":42.444545,"lng":-76.499554,"stopid":9202},{"stop":"Cass Park","lat":42.452468,"lng":-76.51499,"stopid":8025},{"stop":"Cayuga @ Boynton MS","lat":42.460536,"lng":-76.500172,"stopid":8023},{"stop":"Cayuga @ Buffalo","lat":42.44121,"lng":-76.499004,"stopid":9166},{"stop":"Cascadilla @ Third","lat":42.444532,"lng":-76.503449,"stopid":9082},{"stop":"Cayuga @ Cascadilla","lat":42.44502,"lng":-76.499372,"stopid":9191},{"stop":"Cayuga @ Court","lat":42.442483,"lng":-76.499053,"stopid":9167},{"stop":"Cayuga @ Farm","lat":42.44485,"lng":-76.499117,"stopid":9168},{"stop":"Cayuga @ Jay","lat":42.450726,"lng":-76.49975,"stopid":9153},{"stop":"Cayuga @ Ithaca HS","lat":42.455208,"lng":-76.500083,"stopid":9012},{"stop":"Cayuga @ Lewis","lat":42.44965,"lng":-76.499723,"stopid":9083},{"stop":"Cayuga @ Tompkins","lat":42.448351,"lng":-76.499509,"stopid":9171},{"stop":"Cayuga @ Lincoln","lat":42.452017,"lng":-76.49965,"stopid":1460},{"stop":"Cayuga @ Marshall","lat":42.446003,"lng":-76.499236,"stopid":9169},{"stop":"Cayuga @ Yates","lat":42.447136,"lng":-76.499311,"stopid":9170},{"stop":"Cayuga Medical Center","lat":42.468305,"lng":-76.537001,"stopid":6000},{"stop":"Cayuga Ridge @ Route 96","lat":42.462505,"lng":-76.532688,"stopid":9208},{"stop":"Chestnut @ Elm Street","lat":42.438643,"lng":-76.519086,"stopid":9088},{"stop":"Cinema Dr. @ Uptown Rd.","lat":42.480967,"lng":-76.47843,"stopid":9388},{"stop":"Cinema Drive @ Crosswalk","lat":42.478631,"lng":-76.478341,"stopid":9387},{"stop":"Cayuga Nature Center","lat":42.519314,"lng":-76.554731,"stopid":8026},{"stop":"Ciser (Across Street)","lat":42.438508,"lng":-76.465254,"stopid":9380},{"stop":"Chestnut Hill Apartments","lat":42.441697,"lng":-76.51798,"stopid":9089},{"stop":"Ciser Shelter","lat":42.438653,"lng":-76.465359,"stopid":9379},{"stop":"Clinton @ Albany","lat":42.436689,"lng":-76.501767,"stopid":9124},{"stop":"Clinton @ Corn","lat":42.436719,"lng":-76.505882,"stopid":8142},{"stop":"Clinton @ Geneva","lat":42.436842,"lng":-76.500593,"stopid":1221},{"stop":"Clinton @ Fayette","lat":42.436673,"lng":-76.502749,"stopid":9125},{"stop":"Clinton West Plaza","lat":42.436564,"lng":-76.506354,"stopid":1250},{"stop":"College @ Mitchell","lat":42.437995,"lng":-76.485069,"stopid":1750},{"stop":"Clinton @ Plain","lat":42.43681,"lng":-76.503599,"stopid":9127},{"stop":"College @ Dryden","lat":42.441883,"lng":-76.485317,"stopid":8043},{"stop":"Commonland (Rt. 79 @ Lois Lane)","lat":42.424355,"lng":-76.464538,"stopid":9315},{"stop":"Conifer Village","lat":42.45092,"lng":-76.53214,"stopid":9092},{"stop":"Convenient Care","lat":42.479876,"lng":-76.465026,"stopid":8122},{"stop":"Corson/Mudd Hall","lat":42.447443,"lng":-76.47929,"stopid":3220},{"stop":"Creekwood Apartments","lat":42.479626,"lng":-76.399693,"stopid":4070},{"stop":"Dairy Bar","lat":42.447431,"lng":-76.471433,"stopid":3350},{"stop":"Danby Fire Station","lat":42.357244,"lng":-76.483002,"stopid":5300},{"stop":"Court @ Linn","lat":42.443103,"lng":-76.494408,"stopid":8125},{"stop":"Dairy Bar Across Street","lat":42.447685,"lng":-76.471409,"stopid":8095},{"stop":"Demand and Response (DAR) Zone","lat":42.482099,"lng":-76.417379,"stopid":9190},{"stop":"Dryden @ Turkey Hill Road","lat":42.460217,"lng":-76.427367,"stopid":302},{"stop":"Dewitt Middle School","lat":42.476259,"lng":-76.46699,"stopid":9255},{"stop":"Dryden Rd. @ Baker Hill Rd.","lat":42.467281,"lng":-76.411087,"stopid":9359},{"stop":"Dryden Rd. @ Humphreys Crosswalk","lat":42.442283,"lng":-76.476699,"stopid":9381},{"stop":"Dryden Rd. @ Ithaca Rd.","lat":42.44109,"lng":-76.478284,"stopid":9080},{"stop":"Dryden Rd. @ Mt. Pleasant Rd.","lat":42.455783,"lng":-76.43631,"stopid":9320},{"stop":"Dryden Rd. @ Game Farm Rd.","lat":42.450734,"lng":-76.449544,"stopid":9317},{"stop":"Dryden South","lat":42.47232,"lng":-76.294792,"stopid":4230},{"stop":"Dryden Village @ Post Office","lat":42.490414,"lng":-76.299405,"stopid":9365},{"stop":"Dryden Village @ Sunoco","lat":42.490596,"lng":-76.299609,"stopid":8060},{"stop":"East Hill Office Building","lat":42.438942,"lng":-76.46295,"stopid":9377},{"stop":"East Hill Office Building Across Street","lat":42.438568,"lng":-76.463409,"stopid":9378},{"stop":"East Ithaca Apts. @ Maple (outbound)","lat":42.441266,"lng":-76.472054,"stopid":9302},{"stop":"East Ithaca Apts. @ Maple (inbound)","lat":42.441404,"lng":-76.471801,"stopid":9303},{"stop":"East Shore Dr. @ Asbury Rd.","lat":42.525009,"lng":-76.500152,"stopid":9278},{"stop":"East Shore Dr. @ Atwater Rd.","lat":42.530393,"lng":-76.501043,"stopid":9279},{"stop":"East Hill Plaza","lat":42.437635,"lng":-76.462642,"stopid":3540},{"stop":"East Shore Dr. @ Autumn Ridge","lat":42.501086,"lng":-76.509347,"stopid":9275},{"stop":"East Shore Dr. @ Bolton Point Rd.","lat":42.502177,"lng":-76.509444,"stopid":9284},{"stop":"East Shore Dr. @ Burdick Hill Rd.","lat":42.497771,"lng":-76.50968,"stopid":9274},{"stop":"East Shore Dr. @ Cayuga Vista Dr.","lat":42.532939,"lng":-76.502867,"stopid":9280},{"stop":"East Shore Dr. @ Drake Rd.","lat":42.528085,"lng":-76.500871,"stopid":9281},{"stop":"East Shore Dr. @ East Shore Circle","lat":42.517208,"lng":-76.507469,"stopid":9282},{"stop":"East Shore Dr. @ Esty Dr.","lat":42.497526,"lng":-76.509948,"stopid":9285},{"stop":"East Shore Dr. @ James L. Gibbs Dr.","lat":42.463993,"lng":-76.499176,"stopid":9286},{"stop":"East Shore Dr. @ Waterwagon","lat":42.515512,"lng":-76.508231,"stopid":9276},{"stop":"East Shore Dr. @ East Lake Rd.","lat":42.514713,"lng":-76.508746,"stopid":9283},{"stop":"Eastern Hts. @ Joanne Dr.","lat":42.425025,"lng":-76.456443,"stopid":9311},{"stop":"Eastern Hts. @ Sharlene Dr.","lat":42.423338,"lng":-76.452516,"stopid":9310},{"stop":"Eastern Hts. @ Skyvue","lat":42.422262,"lng":-76.44839,"stopid":5020},{"stop":"EcoVillage @ Rt. 79","lat":42.448119,"lng":-76.540139,"stopid":6950},{"stop":"Ellis Hollow @ Genung Rd.","lat":42.428097,"lng":-76.415191,"stopid":5114},{"stop":"Elmira @ Spencer","lat":42.419984,"lng":-76.519405,"stopid":8117},{"stop":"Elmira Rd. @ Hess gas station","lat":42.422888,"lng":-76.516223,"stopid":9139},{"stop":"Ellis Hollow @ Rt. 79","lat":42.393655,"lng":-76.367265,"stopid":9369},{"stop":"Enfield Center / Park-n-Ride","lat":42.437817,"lng":-76.630967,"stopid":6900},{"stop":"Enfield Main Rd. @ Rt. 79","lat":42.450663,"lng":-76.631109,"stopid":6910},{"stop":"Etna @ Pinckney","lat":42.487183,"lng":-76.409683,"stopid":8056},{"stop":"Etna Mills Apartments","lat":42.485355,"lng":-76.38375,"stopid":4090},{"stop":"Fairview Apts. @ Maple Ave (inbound)","lat":42.441349,"lng":-76.475092,"stopid":9305},{"stop":"Fairview Apts. @ Maple Ave (outbound)","lat":42.441151,"lng":-76.475304,"stopid":9304},{"stop":"Falls @ Lake","lat":42.452828,"lng":-76.494817,"stopid":9149},{"stop":"Farrel Rd. @ Springbrook Circle","lat":42.514571,"lng":-76.469564,"stopid":9336},{"stop":"Farmers Market / Aldi","lat":42.44913,"lng":-76.506759,"stopid":9403},{"stop":"Finger Lakes School of Massage","lat":42.463993,"lng":-76.535203,"stopid":9210},{"stop":"Foundry - Cornell","lat":42.451478,"lng":-76.483748,"stopid":8105},{"stop":"Freeville - Railroad St. (Rt. 38 @ Rt. 3","lat":42.513721,"lng":-76.346269,"stopid":9366},{"stop":"Freeville Park-n-Ride","lat":42.512079,"lng":-76.350461,"stopid":8055},{"stop":"Freeville Village","lat":42.512001,"lng":-76.350384,"stopid":4100},{"stop":"Gaslight Village Apts.","lat":42.480524,"lng":-76.472965,"stopid":9264},{"stop":"Geneva @ Clinton","lat":42.436907,"lng":-76.500706,"stopid":9122},{"stop":"Geneva @ Green","lat":42.43846,"lng":-76.50061,"stopid":9142},{"stop":"Geneva @ State","lat":42.439625,"lng":-76.500828,"stopid":9326},{"stop":"Goldwin Smith Hall","lat":42.448276,"lng":-76.482879,"stopid":3040},{"stop":"Graham @ Triphammer Rd.","lat":42.486277,"lng":-76.486945,"stopid":9338},{"stop":"Green @ Fayette","lat":42.438391,"lng":-76.502813,"stopid":9056},{"stop":"Green @ Meadow","lat":42.438267,"lng":-76.508797,"stopid":9052},{"stop":"Green @ Commons","lat":42.438566,"lng":-76.497642,"stopid":1010},{"stop":"Greenstar","lat":42.440656,"lng":-76.511182,"stopid":9385},{"stop":"Groton Express Mart","lat":42.587111,"lng":-76.36675,"stopid":9363},{"stop":"Groton High School","lat":42.580404,"lng":-76.369314,"stopid":9362},{"stop":"Groton Main Street","lat":42.586483,"lng":-76.36631,"stopid":4300},{"stop":"Groton Rd. @ Peruville Rd.","lat":42.54814,"lng":-76.361536,"stopid":9361},{"stop":"Groton Town Hall","lat":42.58985,"lng":-76.369233,"stopid":8061},{"stop":"Gun Hill Apartments","lat":42.451091,"lng":-76.4936,"stopid":9396},{"stop":"Guthrie Clinic @ Hanshaw Rd.","lat":42.476123,"lng":-76.430683,"stopid":9395},{"stop":"Haller @ Elm","lat":42.436315,"lng":-76.526116,"stopid":9100},{"stop":"Hancock @ Auburn","lat":42.448324,"lng":-76.500844,"stopid":9194},{"stop":"Hancock @ Second St.","lat":42.44676,"lng":-76.504165,"stopid":9093},{"stop":"Hancock @ First St.","lat":42.447239,"lng":-76.503087,"stopid":9094},{"stop":"Hancock @ Third","lat":42.446529,"lng":-76.505029,"stopid":9157},{"stop":"Hancock Plaza","lat":42.446667,"lng":-76.504883,"stopid":1480},{"stop":"Hanshaw @ Blackstone","lat":42.466969,"lng":-76.470648,"stopid":9260},{"stop":"Hanshaw @ Murial","lat":42.46723,"lng":-76.461636,"stopid":9254},{"stop":"Hanshaw @ Sapsucker Woods Rd.","lat":42.467388,"lng":-76.450489,"stopid":9189},{"stop":"Hanshaw @ Salem Dr.","lat":42.467293,"lng":-76.458696,"stopid":9256},{"stop":"Hanshaw @ Warren","lat":42.467115,"lng":-76.46595,"stopid":8107},{"stop":"Hanshaw Village","lat":42.48308,"lng":-76.430898,"stopid":8115},{"stop":"Hasbrouck - Pleasant Grove Rd. @ Jessup","lat":42.456764,"lng":-76.474057,"stopid":9248},{"stop":"Hasbrouck Apts.","lat":42.456367,"lng":-76.471617,"stopid":3700},{"stop":"Hector (rte 79) @ Fall View Terrace","lat":42.451776,"lng":-76.521435,"stopid":9042},{"stop":"Hector (rte 79) @ Oakwood","lat":42.452023,"lng":-76.524791,"stopid":9098},{"stop":"Hector (rte 79) @ Warren Pl.","lat":42.448617,"lng":-76.5263,"stopid":8068},{"stop":"Hector St. (413 Hector Street)","lat":42.446162,"lng":-76.51705,"stopid":9096},{"stop":"Hector (rte 79) @ Sunrise","lat":42.44368,"lng":-76.516492,"stopid":9095},{"stop":"Helen Newman","lat":42.453171,"lng":-76.476965,"stopid":8084},{"stop":"Hickeys Music - see Cayuga @ Lewis","lat":42.449559,"lng":-76.501072,"stopid":9375},{"stop":"Highland @ Country Club Rd./Acacia","lat":42.458463,"lng":-76.486565,"stopid":9401},{"stop":"Highland @ Thurston","lat":42.45385,"lng":-76.4865,"stopid":1580},{"stop":"Highland @ Wyckoff","lat":42.456422,"lng":-76.486225,"stopid":9030},{"stop":"Highland @ Country Club Rd./Lakeland","lat":42.458449,"lng":-76.486365,"stopid":9400},{"stop":"Hillside Acres @ Dryden Rd.","lat":42.453493,"lng":-76.442801,"stopid":9318},{"stop":"Hillside View Trailer Park","lat":42.330467,"lng":-76.4433,"stopid":5340},{"stop":"Hillview @ Aurora","lat":42.434951,"lng":-76.494482,"stopid":9078},{"stop":"Hillview @ Hudson","lat":42.434878,"lng":-76.492261,"stopid":9079},{"stop":"Honness Lane @ Rt. 79","lat":42.42942,"lng":-76.472005,"stopid":5060},{"stop":"Hook @ Haller","lat":42.439484,"lng":-76.526052,"stopid":9099},{"stop":"Honness Ln. @ Ithaca recreation Way","lat":42.429657,"lng":-76.46699,"stopid":9313},{"stop":"Honness Ln. @ Harwick Rd.","lat":42.429483,"lng":-76.470718,"stopid":9314},{"stop":"Hopkins @ Route 96 (Trumansburgburg Rd)","lat":42.456762,"lng":-76.524432,"stopid":9206},{"stop":"Hospital Rd @ Harris B. Dates Drive","lat":42.467252,"lng":-76.538481,"stopid":9211},{"stop":"Hudson @ Aurora","lat":42.438388,"lng":-76.494662,"stopid":9063},{"stop":"Hudson @ Coddington (to IC)","lat":42.42933,"lng":-76.491457,"stopid":9065},{"stop":"Hudson @ Coddington (to Ithaca)","lat":42.429044,"lng":-76.491036,"stopid":9066},{"stop":"Hudson @ Columbia (to Commons)","lat":42.435776,"lng":-76.492261,"stopid":9062},{"stop":"Hudson @ Columbia (to IC)","lat":42.435996,"lng":-76.492428,"stopid":9061},{"stop":"Hudson @ Grandview","lat":42.431283,"lng":-76.492417,"stopid":1800},{"stop":"Hudson @ Pearsall","lat":42.431494,"lng":-76.492032,"stopid":8077},{"stop":"IC - Circle @ Main Entrance (towards Par","lat":42.421253,"lng":-76.499581,"stopid":9070},{"stop":"IC - Emerson Hall","lat":42.425733,"lng":-76.491764,"stopid":9068},{"stop":"IC - East Entrance","lat":42.426327,"lng":-76.488851,"stopid":9075},{"stop":"IC - Garden Apartments","lat":42.425745,"lng":-76.491615,"stopid":9073},{"stop":"IC - Roy Park School","lat":42.424379,"lng":-76.495351,"stopid":305},{"stop":"IC - Hudson @ IC East Entrance","lat":42.426668,"lng":-76.488844,"stopid":9067},{"stop":"IC - Smiddy Hall","lat":42.419742,"lng":-76.499138,"stopid":9071},{"stop":"IC - Smiddy Hall / Football Field side","lat":42.419597,"lng":-76.499141,"stopid":9072},{"stop":"IC - Circle @ Main Entrance (Towards Tow","lat":42.421811,"lng":-76.499667,"stopid":9069},{"stop":"IC - Terrace 1","lat":42.419584,"lng":-76.496773,"stopid":9076},{"stop":"IC - Terrace 2","lat":42.419694,"lng":-76.496676,"stopid":9077},{"stop":"IC - The Towers @ Ithaca College","lat":42.420368,"lng":-76.494488,"stopid":8076},{"stop":"Island Health (Chemung Canal Bank)","lat":42.440961,"lng":-76.512912,"stopid":9228},{"stop":"Island Health (LeHigh Valley House)","lat":42.440808,"lng":-76.512901,"stopid":9229},{"stop":"Ithaca Plaza","lat":42.429737,"lng":-76.506761,"stopid":9137},{"stop":"Ithaca Rd. @ Elmwood Ave.","lat":42.439542,"lng":-76.478602,"stopid":1780},{"stop":"Jacksonville Park-n-ride","lat":42.509628,"lng":-76.616077,"stopid":9237},{"stop":"Ithaca Bus Station","lat":42.43935,"lng":-76.51105,"stopid":1160},{"stop":"Jacksonville Post Office","lat":42.507867,"lng":-76.614233,"stopid":8070},{"stop":"Jacksonville Shursave","lat":42.532939,"lng":-76.64011,"stopid":9232},{"stop":"Jessup @ Pleasant Grove","lat":42.456828,"lng":-76.474513,"stopid":8071},{"stop":"Jessup Rd. @ Jessup Place","lat":42.456913,"lng":-76.478212,"stopid":9330},{"stop":"Jessup Rd. @ Tennis Courts","lat":42.456982,"lng":-76.47844,"stopid":9339},{"stop":"Joanne Dr. @ Regency Ln.","lat":42.425821,"lng":-76.456491,"stopid":9312},{"stop":"Juniper Manor","lat":42.540661,"lng":-76.661659,"stopid":6420},{"stop":"K-Mart - behind Sherwin WIlliams","lat":42.430461,"lng":-76.509913,"stopid":9138},{"stop":"Keith @ Lake","lat":42.470188,"lng":-76.283162,"stopid":4240},{"stop":"Kennedy Hall","lat":42.447668,"lng":-76.479291,"stopid":3200},{"stop":"Kohls / Home Depot @ Elmira Rd.","lat":42.419794,"lng":-76.520078,"stopid":9327},{"stop":"Lake @ Ithaca HS","lat":42.455117,"lng":-76.49595,"stopid":1510},{"stop":"Lake/East Shore Dr. @ Boynton MS","lat":42.460782,"lng":-76.497404,"stopid":9038},{"stop":"Lake/East Shore Dr. @ Renwick Dr.","lat":42.458967,"lng":-76.496467,"stopid":9150},{"stop":"Langmuir Lab","lat":42.485533,"lng":-76.4581,"stopid":8042},{"stop":"Lansing Fire Co. #3","lat":42.587233,"lng":-76.590083,"stopid":8053},{"stop":"Lansing HS","lat":42.542383,"lng":-76.537033,"stopid":4666},{"stop":"Lansing Town Hall","lat":42.53825,"lng":-76.4994,"stopid":8046},{"stop":"Lehman Alternative School","lat":42.43986,"lng":-76.518614,"stopid":9110},{"stop":"Lincoln @ Auburn","lat":42.451799,"lng":-76.501,"stopid":9192},{"stop":"Lincoln @ Cayuga","lat":42.452017,"lng":-76.49965,"stopid":9034},{"stop":"Lincoln @ Dey","lat":42.451164,"lng":-76.502733,"stopid":9152},{"stop":"Lincoln @ Tioga","lat":42.452064,"lng":-76.497567,"stopid":8075},{"stop":"Linderman Creek Apts.","lat":42.449307,"lng":-76.530451,"stopid":8123},{"stop":"Longview","lat":42.415806,"lng":-76.503867,"stopid":1870},{"stop":"Ludlowville","lat":42.553583,"lng":-76.537483,"stopid":4665},{"stop":"Lowes","lat":42.430794,"lng":-76.51348,"stopid":9118},{"stop":"Maplewood Park @ Maple Ave. (inbound)","lat":42.441341,"lng":-76.47502,"stopid":9301},{"stop":"Maplewood Park @ Maple Ave. (outbound)","lat":42.441127,"lng":-76.475315,"stopid":3520},{"stop":"McGraw House","lat":42.437711,"lng":-76.500571,"stopid":9120},{"stop":"Meadow @ Elmira","lat":42.428236,"lng":-76.507732,"stopid":8065},{"stop":"Meadow @ Tops gas station","lat":42.432292,"lng":-76.508188,"stopid":9370},{"stop":"Meadow @ Wood St.","lat":42.432514,"lng":-76.507893,"stopid":9041},{"stop":"Milstein Hall","lat":42.451193,"lng":-76.483823,"stopid":9392},{"stop":"Museum of the Earth","lat":42.467178,"lng":-76.536925,"stopid":9212},{"stop":"Myers Point Rd. @ Rt. 34","lat":42.5423,"lng":-76.53735,"stopid":8045},{"stop":"N. Lansing Fire Co. #4","lat":42.612975,"lng":-76.497034,"stopid":4620},{"stop":"Nates Floral Estates @ Lowes","lat":42.431855,"lng":-76.512313,"stopid":1310},{"stop":"Newfield Depot @ W. Danby","lat":42.3686,"lng":-76.552317,"stopid":8067},{"stop":"Newfield Depot Rd. @ Valley Manor","lat":42.368746,"lng":-76.556886,"stopid":5420},{"stop":"Newfield Central School / Garden Apts","lat":42.359273,"lng":-76.597281,"stopid":5405},{"stop":"Newfield Main St @ Elmira Rd.","lat":42.352257,"lng":-76.60831,"stopid":9371},{"stop":"Newfield Town Hall","lat":42.362615,"lng":-76.589057,"stopid":8112},{"stop":"North Wood","lat":42.48625,"lng":-76.469567,"stopid":2180},{"stop":"Northway @ The Parkway","lat":42.465322,"lng":-76.486752,"stopid":9245},{"stop":"Oak Hill Manor","lat":42.432529,"lng":-76.49179,"stopid":9040},{"stop":"Ornithology Lab","lat":42.480507,"lng":-76.449042,"stopid":8111},{"stop":"Overlook Apts.","lat":42.46575,"lng":-76.5403,"stopid":9009},{"stop":"P and C - see East Hill Plaza for times","lat":42.437596,"lng":-76.464238,"stopid":9398},{"stop":"Parkway @ Upland","lat":42.463751,"lng":-76.486608,"stopid":8041},{"stop":"Pinckney @ Lower Creek","lat":42.477183,"lng":-76.406233,"stopid":8057},{"stop":"Pine Tree @ Rte. 79","lat":42.423506,"lng":-76.461483,"stopid":9397},{"stop":"Pine Tree @ Honness Ln.","lat":42.429836,"lng":-76.462564,"stopid":9316},{"stop":"Pine Tree Rd.@ Rite Aid","lat":42.437568,"lng":-76.465259,"stopid":9306},{"stop":"Pine Tree Rd.@ East Hill Plaza","lat":42.437627,"lng":-76.465061,"stopid":9307},{"stop":"Plain @ Center","lat":42.435418,"lng":-76.503661,"stopid":9130},{"stop":"Plain @ Clinton","lat":42.436608,"lng":-76.503728,"stopid":9128},{"stop":"Plain @ Elmira Rd.","lat":42.430742,"lng":-76.503575,"stopid":9216},{"stop":"Plain @ North Titus (Southbound)","lat":42.434389,"lng":-76.503755,"stopid":9132},{"stop":"Plain @ South Titus (Northbound)","lat":42.433791,"lng":-76.503569,"stopid":9131},{"stop":"Pleasant Grove @ Hanshaw","lat":42.468133,"lng":-76.4781,"stopid":8078},{"stop":"Plain @ Wood","lat":42.432661,"lng":-76.503514,"stopid":9134},{"stop":"Pleasant Grove @ Jessup","lat":42.456974,"lng":-76.474309,"stopid":9261},{"stop":"Post Office @ Warren Rd.","lat":42.490054,"lng":-76.467617,"stopid":9353},{"stop":"Professional Building","lat":42.468065,"lng":-76.541158,"stopid":9374},{"stop":"Public Safety Building","lat":42.492333,"lng":-76.467983,"stopid":2200},{"stop":"Ridgewood @ Wyckoff","lat":42.456632,"lng":-76.487299,"stopid":9346},{"stop":"Ridgewood @ Thurston","lat":42.454235,"lng":-76.488748,"stopid":9345},{"stop":"Risley Hall","lat":42.452872,"lng":-76.481235,"stopid":3610},{"stop":"Robert H. Treman S.P. - Lower entrance","lat":42.398499,"lng":-76.552214,"stopid":9405},{"stop":"Robert Purcell Community Center","lat":42.456133,"lng":-76.4783,"stopid":3650},{"stop":"Robert Purcell Community Center @ Jessup","lat":42.456638,"lng":-76.477067,"stopid":9329},{"stop":"Rockefeller Hall","lat":42.449383,"lng":-76.482667,"stopid":3030},{"stop":"Rose Hill Rd. @ Murial St.","lat":42.473988,"lng":-76.461807,"stopid":9259},{"stop":"Rt. 13 @ George","lat":42.489835,"lng":-76.328362,"stopid":9015},{"stop":"Rt. 13 @ Irish Settlement","lat":42.489669,"lng":-76.327995,"stopid":4190},{"stop":"Rt. 13 @ Johnson","lat":42.48715,"lng":-76.343217,"stopid":9014},{"stop":"Rt. 13 @ Kirk","lat":42.480896,"lng":-76.373348,"stopid":4110},{"stop":"Rt. 13 @ Mineah Rd.","lat":42.480516,"lng":-76.373874,"stopid":9364},{"stop":"Rt. 34B (Auburn Rd.) @ Woodsedge Dr.","lat":42.538062,"lng":-76.499476,"stopid":9288},{"stop":"Rt. 34B (Ridge Rd.) @ Beach","lat":42.538758,"lng":-76.510849,"stopid":9290},{"stop":"Rt. 13 @ Yellowbarn","lat":42.48715,"lng":-76.343217,"stopid":8059},{"stop":"Rt. 34B (Ridge Rd.) @ Beckwith Ln.","lat":42.560256,"lng":-76.556039,"stopid":9296},{"stop":"Rt. 34B (Ridge Rd.) @ Brickyard","lat":42.543516,"lng":-76.524839,"stopid":9291},{"stop":"Rt. 34B (Ridge Rd.) @ Conlon Rd.","lat":42.538094,"lng":-76.507587,"stopid":9289},{"stop":"Rt. 34B (Ridge Rd.) @ Drake Rd.","lat":42.538963,"lng":-76.512201,"stopid":9300},{"stop":"Rt. 34B (Ridge Rd.) @ Emmons Rd.","lat":42.578998,"lng":-76.582582,"stopid":9292},{"stop":"Rt. 34B (Ridge Rd.) @ Lansing Station Rd","lat":42.579243,"lng":-76.583172,"stopid":9293},{"stop":"Rt. 34B (Ridge Rd.) @ Lakeview Dr.","lat":42.556684,"lng":-76.5484,"stopid":9298},{"stop":"Rt. 34B (Ridge Rd.) @ Portland Pt. Rd.","lat":42.541034,"lng":-76.519003,"stopid":9299},{"stop":"Rt. 34B (Ridge Rd.) @ Ross Rd.","lat":42.568877,"lng":-76.574299,"stopid":9295},{"stop":"Rt. 34B (Ridge Rd.) @ Speary Ln.","lat":42.558269,"lng":-76.55083,"stopid":9297},{"stop":"Rt. 34B (Ridge Rd.) @ Swayze Rd.","lat":42.576486,"lng":-76.58079,"stopid":9294},{"stop":"Rt. 366 @ Kirk Rd.","lat":42.490838,"lng":-76.374373,"stopid":9360},{"stop":"Rt. 79 @ Applegate","lat":42.451486,"lng":-76.611314,"stopid":9224},{"stop":"Rt. 79 @ Crispell's","lat":42.4026,"lng":-76.423967,"stopid":8073},{"stop":"Rt. 79 @ Sheffield","lat":42.447243,"lng":-76.571145,"stopid":9226},{"stop":"Rt. 79 @ VanDorn","lat":42.452056,"lng":-76.591229,"stopid":9225},{"stop":"Rt. 96 @ Bundy Road","lat":42.460566,"lng":-76.529871,"stopid":9214},{"stop":"Rt. 96 @ Elm St.","lat":42.541635,"lng":-76.660709,"stopid":9239},{"stop":"Rt. 96 @ Krums Corner","lat":42.486166,"lng":-76.573398,"stopid":9230},{"stop":"Rt. 96 @ South Street","lat":42.540884,"lng":-76.65836,"stopid":9234},{"stop":"Rt. 96 @ Perry City Rd.","lat":42.495786,"lng":-76.596014,"stopid":9231},{"stop":"Sage Hall","lat":42.445483,"lng":-76.482633,"stopid":3300},{"stop":"Salem Dr. @ Birchwood","lat":42.471313,"lng":-76.45684,"stopid":9257},{"stop":"Salvation Army @ Spencer/Elmira Rd.","lat":42.419877,"lng":-76.519164,"stopid":9141},{"stop":"Sandy Creek Mobile Home Park","lat":42.451174,"lng":-76.62627,"stopid":9186},{"stop":"Schwartz Performing Arts","lat":42.442333,"lng":-76.485483,"stopid":3000},{"stop":"Seneca @ Albany","lat":42.440498,"lng":-76.501536,"stopid":9055},{"stop":"Seneca @ Fulton (Greenstar)","lat":42.440084,"lng":-76.510954,"stopid":9053},{"stop":"Sheraton Dr. @ Triphammer","lat":42.478186,"lng":-76.48142,"stopid":9386},{"stop":"Seneca @ Commons","lat":42.440543,"lng":-76.49655,"stopid":1040},{"stop":"Shops at Ithaca Mall @ Sears","lat":42.4829,"lng":-76.489917,"stopid":9028},{"stop":"Sigma Delta Tau","lat":42.456136,"lng":-76.488797,"stopid":9343},{"stop":"Snyder Hill Rd @ Regency","lat":42.426205,"lng":-76.455263,"stopid":9308},{"stop":"Snyder Hill Rd @ Sharlene Rd.","lat":42.424177,"lng":-76.452398,"stopid":9309},{"stop":"South Hill Business Park","lat":42.423274,"lng":-76.502159,"stopid":9035},{"stop":"State @ Albany","lat":42.439375,"lng":-76.501864,"stopid":9105},{"stop":"Spencer Rd. @ Meadow St.","lat":42.426312,"lng":-76.507786,"stopid":8121},{"stop":"South Hill School","lat":42.433973,"lng":-76.491805,"stopid":9064},{"stop":"State @ Corn","lat":42.4392,"lng":-76.506333,"stopid":8038},{"stop":"State @ Fulton (Maxie's)","lat":42.439142,"lng":-76.509956,"stopid":8036},{"stop":"State @ Meadow","lat":42.439317,"lng":-76.508102,"stopid":9109},{"stop":"State @ Plain","lat":42.439296,"lng":-76.504066,"stopid":9106},{"stop":"State @ Quarry","lat":42.438668,"lng":-76.488492,"stopid":9037},{"stop":"State @ Stewart (inbound to Commons)","lat":42.43936,"lng":-76.490466,"stopid":9351},{"stop":"State @ Stewart (outbound)","lat":42.439209,"lng":-76.490478,"stopid":9036},{"stop":"State St. @ Taughannock Blvd.","lat":42.439517,"lng":-76.512485,"stopid":9394},{"stop":"Statler Hall","lat":42.445983,"lng":-76.482567,"stopid":3330},{"stop":"Stewart @ Seneca (Outbound)","lat":42.440598,"lng":-76.489694,"stopid":9399},{"stop":"Stewart @ Seneca St. (Inbound)","lat":42.440775,"lng":-76.489831,"stopid":9247},{"stop":"Stewart @ University","lat":42.448963,"lng":-76.490156,"stopid":3910},{"stop":"Stewart @ Williams","lat":42.442511,"lng":-76.489861,"stopid":3800},{"stop":"Stewart Park","lat":42.462652,"lng":-76.50045,"stopid":1520},{"stop":"Sunnys @ Rt. 34/96","lat":42.387233,"lng":-76.553898,"stopid":9372},{"stop":"Sunrise @ Hector","lat":42.443633,"lng":-76.516777,"stopid":9111},{"stop":"Target-stop moved to Sears entrance","lat":42.48251,"lng":-76.489938,"stopid":9199},{"stop":"Taughannock Falls","lat":42.544675,"lng":-76.597481,"stopid":8027},{"stop":"TC Community Action","lat":42.419576,"lng":-76.51866,"stopid":9328},{"stop":"TC Public Library - see Green@Commons","lat":42.438423,"lng":-76.498715,"stopid":9382},{"stop":"TC3","lat":42.5028,"lng":-76.288417,"stopid":4440},{"stop":"TC3 Dorms","lat":42.499575,"lng":-76.284428,"stopid":9188},{"stop":"TCAT Offices","lat":42.452567,"lng":-76.505517,"stopid":8139},{"stop":"Teagle Hall","lat":42.445817,"lng":-76.479683,"stopid":3070},{"stop":"Third @ Adams","lat":42.447304,"lng":-76.505729,"stopid":9112},{"stop":"Third @ Cascadilla","lat":42.444535,"lng":-76.503706,"stopid":9159},{"stop":"Third @ Hancock","lat":42.446372,"lng":-76.50498,"stopid":8031},{"stop":"Third @ Madison","lat":42.445537,"lng":-76.504527,"stopid":9158},{"stop":"Thornwood Dr. @ Courtyard Ithaca","lat":42.484287,"lng":-76.464618,"stopid":9267},{"stop":"Thurston @ Fall Creek Dr.","lat":42.453566,"lng":-76.483751,"stopid":9196},{"stop":"Thurston @ Highland","lat":42.453735,"lng":-76.486473,"stopid":9344},{"stop":"Thurston @ Ridgewood","lat":42.454267,"lng":-76.488867,"stopid":1570},{"stop":"Thurston @ Stewart","lat":42.454667,"lng":-76.490547,"stopid":9347},{"stop":"Thurston @ Waite","lat":42.453511,"lng":-76.485108,"stopid":9376},{"stop":"Thurston @ Wyckoff","lat":42.453647,"lng":-76.483684,"stopid":9240},{"stop":"Tioga @ Court St.","lat":42.4425,"lng":-76.4969,"stopid":9027},{"stop":"Tioga @ Falls","lat":42.452701,"lng":-76.497489,"stopid":9406},{"stop":"Titus Towers I","lat":42.431567,"lng":-76.504417,"stopid":1290},{"stop":"Tobin Field House","lat":42.45645,"lng":-76.481023,"stopid":9017},{"stop":"Tompkins @ Cayuga","lat":42.448433,"lng":-76.499433,"stopid":8085},{"stop":"Tobin Field House-Across the street","lat":42.456319,"lng":-76.480916,"stopid":9408},{"stop":"Tops Supermarket (Ithaca)","lat":42.431967,"lng":-76.509683,"stopid":8140},{"stop":"Tompkins @ Dey","lat":42.448394,"lng":-76.500536,"stopid":8082},{"stop":"Tops Supermarket (Lansing)","lat":42.482348,"lng":-76.486495,"stopid":8110},{"stop":"Triphammer @ 34B","lat":42.53841,"lng":-76.492567,"stopid":9356},{"stop":"Triphammer @ Cayuga Mall","lat":42.483666,"lng":-76.485491,"stopid":8137},{"stop":"Triphammer @ Dearborn","lat":42.45638,"lng":-76.481409,"stopid":9271},{"stop":"Triphammer @ Jessup","lat":42.456149,"lng":-76.481098,"stopid":9025},{"stop":"Triphammer @ Lansing West Apts.","lat":42.479114,"lng":-76.482721,"stopid":9242},{"stop":"Triphammer @ Northway","lat":42.466668,"lng":-76.484209,"stopid":9243},{"stop":"Triphammer @ Savage Farm","lat":42.476677,"lng":-76.48198,"stopid":9044},{"stop":"Triphammer @ Mobile / First Niagara","lat":42.483681,"lng":-76.485502,"stopid":9198},{"stop":"Triphammer @ Sheraton","lat":42.478167,"lng":-76.481967,"stopid":8133},{"stop":"Triphammer @ Hanshaw","lat":42.46979,"lng":-76.480556,"stopid":8079},{"stop":"Triphammer @ Tompkins Trust Co.","lat":42.478817,"lng":-76.482246,"stopid":9241},{"stop":"Triphammer @ Upland","lat":42.464555,"lng":-76.484123,"stopid":1640},{"stop":"Triphammer @ Wait","lat":42.454673,"lng":-76.481524,"stopid":9333},{"stop":"Trumansburg @ Tompkins Trust Co.","lat":42.542101,"lng":-76.662641,"stopid":9235},{"stop":"Trumansburg - W. Main @ Washington","lat":42.542086,"lng":-76.663681,"stopid":9236},{"stop":"Trumansburg Fairgrounds","lat":42.535975,"lng":-76.646676,"stopid":9233},{"stop":"Trumansburg Park-n-ride","lat":42.542022,"lng":-76.666718,"stopid":9238},{"stop":"Trumansburg Central School","lat":42.539283,"lng":-76.653167,"stopid":6400},{"stop":"Turkey Hill @ Ellis Hollow","lat":42.430783,"lng":-76.428317,"stopid":301},{"stop":"Turkey Hill Rd. @ Mt. Pleasant Rd.","lat":42.453355,"lng":-76.429396,"stopid":9321},{"stop":"Turkey Hill Rd. @ Stevenson","lat":42.445058,"lng":-76.429353,"stopid":9322},{"stop":"University @ Cornell Ave.","lat":42.447253,"lng":-76.493056,"stopid":9033},{"stop":"University @ Lake","lat":42.449406,"lng":-76.492236,"stopid":9059},{"stop":"University @ Stewart","lat":42.449295,"lng":-76.490566,"stopid":8127},{"stop":"Uptown Rd. @ Cinema Dr.","lat":42.481135,"lng":-76.478353,"stopid":9263},{"stop":"Uptown Rd. @ Warren Rd.","lat":42.478566,"lng":-76.467825,"stopid":9266},{"stop":"Uptown Rd. @ Warrenwood Apts.","lat":42.478491,"lng":-76.468803,"stopid":9265},{"stop":"Uptown Village Apts.","lat":42.478491,"lng":-76.472665,"stopid":2540},{"stop":"Uris Hall","lat":42.447503,"lng":-76.482349,"stopid":3090},{"stop":"Uris Hall Across Street","lat":42.447613,"lng":-76.482058,"stopid":8106},{"stop":"Valley Rd. @ Boiceville Rd.","lat":42.385771,"lng":-76.360323,"stopid":9367},{"stop":"Varna (Shelter)","lat":42.454283,"lng":-76.440733,"stopid":4000},{"stop":"Varna Auto (across from bus shelter)","lat":42.454182,"lng":-76.440543,"stopid":9319},{"stop":"Vet Medical Center","lat":42.446463,"lng":-76.464828,"stopid":8101},{"stop":"Vet School","lat":42.447361,"lng":-76.466653,"stopid":8044},{"stop":"Village Meadows Townhouses","lat":42.485335,"lng":-76.481216,"stopid":2160},{"stop":"Wait @ Triphammer","lat":42.454522,"lng":-76.481726,"stopid":9348},{"stop":"Wait Ave. @ Thurston Ave.","lat":42.45363,"lng":-76.48503,"stopid":9272},{"stop":"Wal*Mart","lat":42.428731,"lng":-76.513445,"stopid":8138},{"stop":"Warren Pl. @ Cliff Park","lat":42.441998,"lng":-76.524185,"stopid":9008},{"stop":"Warren Pl. @ Hector (Route 79)","lat":42.448573,"lng":-76.526374,"stopid":9114},{"stop":"Warren Pl. @ Hook","lat":42.439595,"lng":-76.523952,"stopid":9117},{"stop":"Warren Pl. @ Richard","lat":42.445715,"lng":-76.52562,"stopid":9115},{"stop":"Warren Pl. @ Sunrise","lat":42.443886,"lng":-76.524544,"stopid":9116},{"stop":"Warren Rd. @ Arrowood","lat":42.47838,"lng":-76.466882,"stopid":9250},{"stop":"Warren Rd. @ Asbury","lat":42.524669,"lng":-76.472687,"stopid":9354},{"stop":"Warren Rd. @ Dart Dr.","lat":42.483547,"lng":-76.467411,"stopid":9269},{"stop":"Warren Rd. @ Dutch Mill Rd.","lat":42.507635,"lng":-76.471581,"stopid":9334},{"stop":"Warren Rd. @ Farrell","lat":42.514467,"lng":-76.472,"stopid":4570},{"stop":"Warren Rd. @ Hanshaw","lat":42.467209,"lng":-76.466054,"stopid":9409},{"stop":"Warren Rd. @ Northwoods Dr.","lat":42.486372,"lng":-76.467719,"stopid":9337},{"stop":"Warren Rd. @ Uptown Rd.","lat":42.478914,"lng":-76.467156,"stopid":9270},{"stop":"Warren Rd. @ Village Circle","lat":42.511226,"lng":-76.471839,"stopid":9335},{"stop":"Warren Rd. @ Winthrop","lat":42.472904,"lng":-76.464833,"stopid":9253},{"stop":"Warrenwood Apts.","lat":42.477045,"lng":-76.467089,"stopid":9252},{"stop":"Wegmans","lat":42.434957,"lng":-76.509658,"stopid":8132},{"stop":"West Village @ Elm St.","lat":42.4365,"lng":-76.5225,"stopid":8118},{"stop":"Winston Ct.","lat":42.475633,"lng":-76.45755,"stopid":2320},{"stop":"Winston Dr. @ Rose Hill Rd.","lat":42.474162,"lng":-76.458342,"stopid":9258},{"stop":"Woodsedge Apartments","lat":42.535256,"lng":-76.499219,"stopid":9287},{"stop":"Wyckoff @ Highland","lat":42.456149,"lng":-76.486151,"stopid":9016},{"stop":"Wyckoff @ Wait","lat":42.454558,"lng":-76.483786,"stopid":9332},{"stop":"YMCA","lat":42.486023,"lng":-76.488876,"stopid":9200},{"stop":"Youth Bureau","lat":42.463433,"lng":-76.499466,"stopid":9151}];
  
  var _arrivedRoutes = [];
  var _firstArrivalTime = 0;
  
  var _showDestination = function() {
    var lat2 = app.mapLat;
    var lng2 = app.mapLng;
    var mapOptions = {zoom: 15, center: new google.maps.LatLng(lat2, lng2)};
    app.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat2, lng2)
    });
    marker.setMap(app.map);
    app.lastMarker = marker;
    // console.log('triggered');
    app.map = app.map;

    setTimeout(function() {
      google.maps.event.trigger(app.map, 'resize');
    }, 2000);
    setTimeout(function() {
      google.maps.event.trigger(app.map, 'resize');
    }, 4000);
  }
  
  // Geocoding search address
  var _search = function() {
    var address = $('#search-box').val();
    if(address == _HINT) {
      _recommend();
      return;
    }
    $.get(_GEOCODING_URL, {address: address, key:_GOOGLE_KEY, components: 'postal_code:14850'}, function(data) {
      var results = data.results;
      $('#search-results').empty();
      // console.log(results);
      if(results.length == 0 || (results.length == 1 && results[0].formatted_address == 'Ithaca, NY 14850, USA')) {
        // Not Found
        $('<div class="result-box" >No Result Found</div>').appendTo('#search-results');
      } else {
        for(var i = 0; i < results.length && i < 3; i++) {
          var location = results[i].geometry.location;
          var locationStr = [location.lat, location.lng].join(',');
          $('<a class="result-box" href="javascript:;" data-location="' + locationStr + '">' + results[i].formatted_address + '</a>').appendTo('#search-results');
        }
        for(var i = 0; i < _stops.length; i++) {
          var currentStop = _stops[i];
          if(currentStop['stop'].toUpperCase().indexOf(address.toUpperCase()) != -1) {
            $('<a class="result-box" href="javascript:;" data-location="' + currentStop['lat'] + ',' + currentStop['lng'] + '">BUS STOP: ' + currentStop['stop'] + '</a>').appendTo('#search-results');
          }
          if($('.search-results > .result-box').length >= 5) {
            break;
          }
        }
        _bind_route_action();
      }
      $('#search-results').slideDown();
      $('#recent-results').fadeOut();
      $('#special-results').fadeOut();
    });
  };
  
  // Show recent and recommended locations
  var _recommend = function() {
    $('#search-results').fadeOut();
    $('#recent-results').slideDown();
    $('#special-results').slideDown();
  }
  
  // Decide whether to call search
  var _searchHandler = function(event) {
    var $this = $(this);
    var searchStr = $this.val();
    
    if(event.charCode == 13) {
      _search();
    } else if(searchStr.length >= 3) {
      // console.log('fired ' + searchStr);
      setTimeout(function() {
        var currentAddr = $('#search-box').val();
        // console.log(currentAddr + ',' + _lastAddress);
        if(currentAddr == _lastAddress) {
          _search();
        }
      }, 500);
    } else {
      _recommend();
    }
    _lastAddress = searchStr;
    if(searchStr == '' && event.type == 'focusout') {
      $this.val(_HINT);
    }
  };
  
  var _searchFocusHandler = function() {
    var $this = $(this);
    if($this.val() == _HINT) {
      $this.val('');
    } else {
      $this.select();
    }
  };
  
  var _loadScript = function(src) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    document.body.appendChild(script);
  };
  
  // Load Google Map API
  var _initMap = function() {
    _loadScript('https://maps.googleapis.com/maps/api/js?v=3.exp&callback=app.fn.initMapCallback');
  };
  
  // Load recent searches
  var _load_recent = function() {
    $('#recent-results').empty();
    var recentLocations = JSON.parse(window.localStorage.getItem('recent'));
    if(recentLocations) {
      for(var i = 0; i < recentLocations.length; i++) {
        $('<a class="result-box" href="javascript:;" data-location="' + recentLocations[i].latlng + '">' + recentLocations[i].address + '</a>').appendTo('#recent-results');
      }
      _bind_route_action();
    }
  };
  
  var _getNearestStops = (function() {
    var rad2deg = Math.PI / 180;
    var r = 6.37e6;
    var thy = 42.45;
    var vol = 1.25;
    return (function(lat, lng, n) {
      var selectedStops = [];
      var dists = [];
      for(var i = 0; i < _stops.length && i < 1000; i++) {
        var dthx = Math.abs(lng - _stops[i].lng);
        var dthy = Math.abs(lat - _stops[i].lat);
        var dx = r * dthx * rad2deg * Math.cos(thy * rad2deg);
        var dy = r * dthy * rad2deg;
        var dist = Math.sqrt(dx * dx + dy * dy);
        var toAdd = {
          stopid: _stops[i].stopid,
          stop: _stops[i].stop,
          dist: dist,
          time: dist / vol / 60
        };
        if(dist > _PENALTY_DISTANCE) {
          toAdd.time += (dist - _PENALTY_DISTANCE) / vol / 60 * 0.5;
        }
        dists.push(toAdd);
      }
      dists.sort(function(a, b) {
        if(a.dist - b.dist < 0) {
          return -1;
        } else {
          return 1;
        }
      });
      for(var i = 0; i < n; i++) {
        selectedStops.push(dists[i]);
      }
      return selectedStops;
    });
  })();
  
  // Calculate route
  var _route = function(lat1, lng1, lat2, lng2) {
    var stops1 = _getNearestStops(lat1, lng1, 4);
    var stops2 = _getNearestStops(lat2, lng2, 4);
    // Use timestamp as token
    _token = (new Date()).getTime();
    _arrivedRoutes = [];
    _firstArrivalTime = 0;
    var flag = true;
    for(var i = 0; i < stops1.length; i++) {
      for(var j = 0; j < stops2.length; j++) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        var param = {
          start: stops1[i].stopid,
          startwalk: stops1[i].time,
          end: stops2[j].stopid,
          endwalk: stops2[j].time,
          token: _token
        };
        script.src = _ROUTE_FETCH_URL + '?' + $.param(param);
        try {
          document.getElementsByTagName('body')[0].appendChild(script);
        } catch (err) {
          console.log(err);
          // return false;
        }
        
      }
    }
  };
  
  // Handle search results click
  var _bind_route_action = function() {
    $('.result-box').click(function() {
      var $this = $(this);
      var destArr = $this.data('location').split(',');
      location.href = 'route.html?lat2=' + destArr[0] + '&lng2=' + destArr[1];
      
      // Save recent location
      if($this.data('special') == '1') {
        return;
      }
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
        return b.time - a.time;
      });
      recentLocations = recentLocations.slice(0, 5);
      window.localStorage.setItem('recent', JSON.stringify(recentLocations));
    });
  };
  
  // Sort and display route results
  var _displayRoutes = function() {
    // Stop future arrivals
    _token = (new Date()).getTime();
    // Prepare next search
    _firstArrivalTime = 0;
    
    // Deal with not found
    if(_arrivedRoutes.length == 0) {
      $('#route-status > span').html('Sorry, we can\'t find any results');
      return;
    }
    
    // Sort by timeTotal ascending
    _arrivedRoutes.sort(function(a, b) {
      if(a['timeTotal'] > b['timeTotal']) {
        return 1;
      } else {
        return -1;
      }
    });
    
    // Select top 30 and eliminate 2x && 20 min longer than shortest time, or take longer than 3 hours
    _arrivedRoutes = _arrivedRoutes.slice(0, 50);
    var minTimeTotal = _arrivedRoutes[0]['timeTotal'];
    var maxTimeTotal = Math.max.apply(null, [2 * minTimeTotal, minTimeTotal + 20]);
    maxTimeTotal = Math.min.apply(null, [maxTimeTotal, 3 * 60]);
    console.log(maxTimeTotal);
    for(var i = _arrivedRoutes.length - 1; i > 0; i--) {
      console.log(_arrivedRoutes[i]['timeTotal']);
      var curTimeTotal = _arrivedRoutes[i]['timeTotal'];
      if(curTimeTotal < maxTimeTotal) {
        _arrivedRoutes = _arrivedRoutes.slice(0, i + 1);
        break;
      }
    }
    
    // Remove same route and very close arrival time
    for(var i = 0; i < _arrivedRoutes.length; i++) {
      console.log(_arrivedRoutes[i]['timeTotal']);
      _arrivedRoutes[i]['routeSequence'] = _arrivedRoutes[i]['output'].match(/Route \d{2}/g).join(',');
    }
    for(var i = 0; i < _arrivedRoutes.length; i++) {
      var curSequence = _arrivedRoutes[i]['routeSequence'];
      var curTimeArrival = _arrivedRoutes[i]['timeArrival'];
      for(var j = _arrivedRoutes.length - 1; j > i; j--) {
        if(curSequence == _arrivedRoutes[j]['routeSequence'] && Math.abs(curTimeArrival - _arrivedRoutes[j]['timeArrival']) < 240) {
          _arrivedRoutes.splice(j, 1);
        }
      }
    }
    
    // Remove same route but longer total time
    for(var i = 0; i < _arrivedRoutes.length; i++) {
      var curSequence = _arrivedRoutes[i]['routeSequence'];
      var curTimeTotal = _arrivedRoutes[i]['timeTotal'];
      for(var j = _arrivedRoutes.length - 1; j > i; j--) {
        if(curSequence == _arrivedRoutes[j]['routeSequence'] && _arrivedRoutes[j]['timeTotal'] - curTimeTotal > 2) {
          _arrivedRoutes.splice(j, 1);
        }
      }
    }
    
    // Remove duplicate results
    for(var i = 0; i < _arrivedRoutes.length; i++) {
      var currentOutput = _arrivedRoutes[i]['output'];
      for(var j = _arrivedRoutes.length - 1; j > i; j--) {
        if(currentOutput == _arrivedRoutes[j]['output']) {
          _arrivedRoutes.splice(j, 1);
        }
      }
    }
    
    // Sort by arrival ascending

    _arrivedRoutes.sort(function(a, b) {
      var aArrivalTime = a['timeArrival'];
      var bArrivalTime = b['timeArrival'];
      if(aArrivalTime != bArrivalTime) {
        return aArrivalTime - bArrivalTime;
      }
      if(a['timeTotal'] > b['timeTotal']) {
        return 1;
      } else {
        return -1;
      }
    });
    
    
    // Select top 10
    _arrivedRoutes = _arrivedRoutes.slice(0, 10);
    
    // Display results
    for(var i = 0; i < _arrivedRoutes.length; i++) {
      $('#route-wrap').append(_arrivedRoutes[i]['output']);
    }
    $('#route-status > span').html(_arrivedRoutes.length + ' result(s) found');
  };
  
  var _getQuery = function(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  };
  
  return {
    init: function() {
      $('#search-box').on('keyup paste focusout input', _searchHandler);
      $('#search-box').on('focus', _searchFocusHandler);
      _load_recent();
      _bind_route_action();
      // _initMap();
      _loadScript(_ADDON_URL);
      $('#search-delete').click(function() {
        $('#search-box').val('');
        $('#search-box').focus();
      });
    },
    
    routeInit: function() {
      var lat2 = parseFloat(_getQuery('lat2'));
      var lng2 = parseFloat(_getQuery('lng2'));
      app.mapLat = lat2;
      app.mapLng = lng2;
      _initMap();
      $('#route-map-back').click(function() {
        location.href = 'index.html';
      });
      $('#route-status > span').html('Getting Your Location');
      navigator.geolocation.getCurrentPosition(function(position) {
        var lat1 = position.coords.latitude;
        var lng1 = position.coords.longitude;
        $('#route-status > span').html('Searching Nearby Stops');
        _route(lat1, lng1, lat2, lng2);
      });
      $('.route-box').remove();
      
    },
	
    initMapCallback: function() {
      _showDestination();
    },
    
    // Route result arrival handler
    addRoutes: function(routes, token) {
      // console.log(token + ', ## ' + _token);
      if(token != _token) return;
      var currentTime = (new Date()).getTime();
      if(_firstArrivalTime == 0) {
        $('#route-status > span').html('Retriving Routes');
        _firstArrivalTime = currentTime;
        setTimeout(function() {
          _displayRoutes();
        }, _ROUTE_SEARCH_TIMEOUT);
      }
      $.merge(_arrivedRoutes, routes);
    },
    
    bindRouteAction: function() {
      _bind_route_action();
    }
  };
})($);

app.DEBUG = false;
app.version = 'beta';

