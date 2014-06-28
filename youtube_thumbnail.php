<?php
$title = 'Marble Hornets icons' ;
$stylesheets = array('css/style_infographics.css') ;
$js_scripts  = array('js/youtube_thumbnail.js') ;
include($_SERVER['FILE_PREFIX'] . '/_core/preamble.php') ;
?>

<iframe id="player" width="420" height="315" src="//www.youtube.com/embed/Wmhfn3mgWUI" frameborder="0" allowfullscreen></iframe>
<input type="submit" id="capture" value="Capture!"/>
<?php foot() ; ?>