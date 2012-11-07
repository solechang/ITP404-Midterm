<?php require 'twitter.php' ?>
<?php

	$twitter = new Twitter();

	$xml = $twitter->getTweets('linkinpark');

	
	echo '<ul>';
	foreach($xml->status as $tweet) {
		echo '<li>' . $tweet->text . '</li>';
		
		

	}
	echo '</ul>';
?>
