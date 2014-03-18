<?php
$draw_js      = 'js/draw.js' ;
$title = 'Marble Hornets timeline' ;
$stylesheets = array('css/style_infographics.css') ;
$js_scripts  = array(
  'js/i_functions.js'      ,
  'js/i_draw.js'           ,
  'js/i_settings.js'       ,
  'js/xml.js'            ,
  'js/i_columns.js'        ,
  'js/scenes.js'         ,
  'js/scenes_data.js'    ) ;
if(isset($_GET['type'])){
  if($_GET['type']=='items') $js_scripts[] = 'js/i_items_data.js' ;
}
$js_scripts[] = 'js/i_characters.js' ;
include($_SERVER['FILE_PREFIX'] . '/_core/preamble.php') ;
?>
<script>
var prefix = 'master' ;
var main_column = columns_by_name['location'] ;
var draw_option = 1 ;
var mode        = 'timeline' ;
var type = (getParameterByName('type')) ? getParameterByName('type') : 'timeline' ;
if(type=='entry83'){
  prefix = 'entry83' ;
  main_column = columns_by_name['entry83'] ;
  draw_option = 3 ;
}
else if(type=='items'){
  main_column = columns_by_name['character'] ;
  draw_option = 2 ;
}
else if(type=='hotel'){
  prefix = 'hotel' ;
}
elise if(type=='2006'){
  prefix = '2006' ;
}
?>
</script>
<div class="center">
  <p>(Timeline height = <span id="span_ch">-</span>px)</p>
</div>
<div id="canvas_wrapper" class="center"></div>
<div id="img_wrapper" class="center"></div>

<div class="center">
  <textarea id="textarea_xml"          rows="80" cols="90"></textarea><br />
  <textarea id="textarea_selected_xml" rows="20" cols="90"></textarea>
</div>
<div id="info"></div>
<?php foot() ; ?>