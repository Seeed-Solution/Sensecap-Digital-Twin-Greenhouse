// Hotspot Config
export const HTP_CONFIG = [{"sid":"p_1660751408777","title":"Gateway","position":"-0.5790568292604112m 0.45742846592292524m 0.7520557057995807m","normal":"","visible":"visible","fieldOfView":"15deg","cameraTarget":"-0.6181748474580369m 0.3715813283668526m 0.19175892752459942m","cameraOrbit":"0.22497699237522825rad 1.400572267092532rad 1.811122882564131m"},{"sid":"p_1660751518378","title":"Data Visualization","position":"0.3528954147473016m 0.289036109013605m 0.026589425945702638m","normal":"","visible":"visible","fieldOfView":"15deg","cameraTarget":"0.354800849978557m 0.18913432209196224m 0.0621364981941463m","cameraOrbit":"-0.6902640871105837rad 1.6247826206236895rad 1.1100530889102265m"},{"sid":"p_1660751671399","title":"S2102<span class=\"mini-title\"> - Light Intensity Sensor</span>","position":"0.12734116068835705m 0.23176811051059065m -0.036972184923827034m","normal":"","visible":"visible","fieldOfView":"18deg","cameraTarget":"0.40088018545222015m 0.26875671152812697m 0.7552200019512995m","cameraOrbit":"0.27942667714710195rad 1.5265555342310968rad -0.1696571414157483m","eui":"2CF7F1C042300109","deviceData":[{"measurement_value":79369,"measurement_id":"4099","time":"2022-09-13T04:35:49.528Z","measurement_cn_name":"光照","measurement_en_name":"Light Intensity","measurement_unit":"Lux","measurement_scope":"0~188000"}]},{"sid":"p_1660752352582","title":"S2104<span class=\"mini-title\"> - Soil Moisture and Temperature Sensor</span>","position":"-0.277558851696286m 0.22814226796889386m -0.47512603091728256m","normal":"","visible":"visible","fieldOfView":"15deg","cameraTarget":"-0.24525277685305433m 0.048767655131992826m -0.5608368657327625m","cameraOrbit":"0.22010413712435417rad 0.6522762106445825rad 0.8561063231508765m","content":"","eui":"2CF7F1C042300223","deviceData":[{"measurement_value":32,"measurement_id":"4102","time":"2022-09-13T04:35:42.909Z","measurement_cn_name":"土壤温度","measurement_en_name":"Soil Temperature","measurement_unit":"℃","measurement_scope":"-30~70"},{"measurement_value":25.3,"measurement_id":"4103","time":"2022-09-13T04:35:42.909Z","measurement_cn_name":"土壤湿度","measurement_en_name":"Soil Moisture","measurement_unit":"%","measurement_scope":"0~100"}]},{"sid":"p_1660752564850","title":"S2105<span class=\"mini-title\"> - Soil Moisture, Temperature and EC Sensor</span>","position":"-0.7356990868393823m 0.26822493258577124m 0.06491725982264784m","normal":"","visible":"visible","fieldOfView":"21deg","cameraTarget":"-0.46348093009089064m 0.1376057675681672m 0.07796790313909116m","cameraOrbit":"-1.2370066963734203rad 1.539640332264485rad 1.3709734655530024m","eui":"2CF7F1C04230038A","deviceData":[{"measurement_value":30.7,"measurement_id":"4102","time":"2022-09-13T04:32:56.647Z","measurement_cn_name":"土壤温度","measurement_en_name":"Soil Temperature","measurement_unit":"℃","measurement_scope":"-30~70"},{"measurement_value":13.2,"measurement_id":"4103","time":"2022-09-13T04:32:56.647Z","measurement_cn_name":"土壤湿度","measurement_en_name":"Soil Moisture","measurement_unit":"%","measurement_scope":"0~100"},{"measurement_value":0,"measurement_id":"4108","time":"2022-09-13T04:32:56.647Z","measurement_cn_name":"土壤电导率","measurement_en_name":"Electrical Conductivity","measurement_unit":"dS/m","measurement_scope":"0~23"}]},{"sid":"p_1661971917046","title":"S2101<span class=\"mini-title\"> - Air Temperature and Humidity Sensor</span>","position":"0.0077970770096655855m 0.2839807034048093m 0.3090838678023568m","normal":"","visible":"visible","fieldOfView":"15deg","cameraTarget":"-0.009167606032389718m 0.23044197227446708m 0.2969119124792745m","cameraOrbit":"9.465354752893225rad 1.4172556611599727rad 0.9282076784668868m","eui":"2CF7F1C04230006D","deviceData":[{"measurement_value":35.86,"measurement_id":"4097","time":"2022-09-13T04:31:15.137Z","measurement_cn_name":"空气温度","measurement_en_name":"Air Temperature","measurement_unit":"℃","measurement_scope":"-40~90"},{"measurement_value":35.61,"measurement_id":"4098","time":"2022-09-13T04:31:15.137Z","measurement_cn_name":"空气湿度","measurement_en_name":"Air Humidity","measurement_unit":"% RH","measurement_scope":"0~100"}]},{"sid":"p_1662976525117","title":"S2103<span class=\"mini-title\"> - CO2, Temperature and Humidity Sensor</span>","position":"0.016787793733708006m 0.23781715881512028m -0.4064723578603153m","normal":"","visible":"visible","fieldOfView":"15deg","cameraTarget":"0.016787793733708006m 0.23781715881512028m -0.4064723578603153m","cameraOrbit":"-0.14728215864647282rad 1.4632001389150724rad 1.2091456036364192m","eui":"2CF7F1C141600050","deviceData":[{"measurement_value":36.69,"measurement_id":"4097","time":"2022-09-13T04:33:49.121Z","measurement_cn_name":"空气温度","measurement_en_name":"Air Temperature","measurement_unit":"℃","measurement_scope":"-40~90"},{"measurement_value":33.48,"measurement_id":"4098","time":"2022-09-13T04:33:49.121Z","measurement_cn_name":"空气湿度","measurement_en_name":"Air Humidity","measurement_unit":"% RH","measurement_scope":"0~100"},{"measurement_value":427,"measurement_id":"4100","time":"2022-09-13T04:33:49.121Z","measurement_cn_name":"二氧化碳","measurement_en_name":"CO2","measurement_unit":"ppm","measurement_scope":"0~10000"}]}]

// Init Camera
export const INITIAL_CAMERA_CONFIG = {
	"cameraTarget":"0.008893345304666483m 0.05014994082867047m 0.08660083089716474m",
	"cameraOrbit":"-2.261679864164347rad 1.3212640007451548rad 4.431181454891983m",
	fieldOfView: "40deg",
};

export const VISIBLE_CONFIG_PANEL = false;
export const VISIBLE_CONFIG_JSON = false;
export const VISIBLE_HOTSPOT_PANEL = false;
export const UPDATE_DEVICE_GAP = 10 * 1000;
export const LIMIT_SCREEN_WIDTH = 820;
