<?php

class Twitter {
	function getTweets($username) {
		$url = "http://api.twitter.com/1/statuses/user_timeline.xml?screen_name=$username";
		$xmlString = file_get_contents($url);
		$simpleXML = simplexml_load_string($xmlString);
		return $simpleXML;
	}
}

?>