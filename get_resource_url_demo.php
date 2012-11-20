<?php
/**
* 服务端示例脚本
**/
/*获取url参数*/
$queryFilter = array('title', 'imdb', 'did');
foreach ($queryFilter as $key) {
    $Q[$key] = isset($_GET[$key]) ? htmlspecialchars(urldecode($_GET[$key])) : '';
}

/*配置*/
$config = array(
	/*播放资源地址*/
	'play' => array(
		'url'  => 'http://so.v.360.cn/index.php?kw=$title$',
		'preg' => '/class=\"view\"\>\<ahref=\"(.+?)\"/',
		'resource' => '$path$'
	),
	/*下载资源地址*/
	'down' => array(
		'url'  => 'http://dianying.fm/search?key=$title$',
		'preg' => '/\<divclass=\"x-movie-entry\"id=\"component_\d+\"\>\<ahref=\"(\/=.+?)\"/',
		'resource' => 'http://dianying.fm$path$#download'
	)
);

$map = array(
	'playurl' => 'play',
	'downurl' => 'down'
);

$res = array();
function replaceMatche($matches){
    $name = $matches[1];
    global $Q;
    global $queryFilter;
    if(in_array($name, $queryFilter)){
        return urlencode(preg_replace('/\(\w+\)/', '', $Q[$name]));
    }
    return '';
};
foreach ($map as $type => $conf) {
	if(!isset($config[$conf])){
		$res[$type] = '';
		continue;
	}
	$url = preg_replace_callback('/\$(\w+)\$/', 'replaceMatche', $config[$conf]['url']);
	
	$html = file_get_contents($url);
	if($html){
		$p = preg_match($config[$conf]['preg'], preg_replace('/\s+/', '', $html), $returl);
		if($p){
			$res[$type] = preg_replace('/\$\w+\$/', $returl[1], $config[$conf]['resource']);
		}
	}
}

header('Charset:UTF-8');
header('Content-Type:application/json');
echo json_encode($res);
?>
