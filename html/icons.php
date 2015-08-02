<?php
$title = 'Marble Hornets icons' ;
$stylesheets = array('css/style_infographics.css') ;
$js_scripts  = array('js/icons.js') ;
include($_SERVER['FILE_PREFIX'] . '/_core/preamble.php') ;
?>

<div id="canvas_wrapper" class="center">
  <canvas id="canvas_youtube"  width="150" height="150"></canvas>
  <canvas id="canvas_location" width="150" height="150"></canvas>
  <canvas id="canvas_calendar" width="150" height="150"></canvas>
  <canvas id="canvas_camera"   width="150" height="150"></canvas>
</div>
<?php foot() ; ?>