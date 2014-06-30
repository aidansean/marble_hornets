function add_key(){
  var summer2006 = get_scene_by_name('Summer 2006') ;
  var y0 = summer2006.y + summer2006.h + 2*scene_spacing ;
  var y = y0 ;
  
  if(key_heading){
    key_heading.draw(y,false) ;
    y += key_heading.draw(y,true) ;
  }
  
  if(key_scene){
    key_scene.draw(y,false) ;
    y += key_scene.draw(y,1) + scene_spacing ;
    key_scene.draw_thumbnail_text() ;
  }
  
  for(var i=0 ; i<key_events.length ; i++){
    var e = key_events[i] ;
    e.text_color = 'rgb(0,0,0)' ;
    e.fields['color'] = 'rgb(255,255,255)' ;
    e.has_border = true ;
    e.draw(y,false) ;
    y += e.draw(y,true) ;
  }
  
  y = y0 ;
  
  if(key_color_heading){
    key_color_heading.draw(y,false) ;
    y += key_color_heading.draw(y,true) ;
  }
  for(var i=0 ; i<key_color_events.length ; i++){
    var e = key_color_events[i] ;
    if(e.fields['tape_tag']!=undefined) e.fields['color'] = tape_tag_background_colors[parseInt(e.fields['tape_tag'])] ;
    e.text_color = 'rgb(0,0,0)' ;
    e.has_border = true ;
    e.draw(y,false) ;
    y += e.draw(y,true) ;
  }
}
function draw(option){
  var clear_height = 0 ;
  for(var i=0 ; i<things.length ; i++){
    context.font = character_font_size + 'pt ' + font_family ;
    var w = context.measureText(things[i].name).width + 4*text_margin_LR ;
    if(w>clear_height) clear_height = w ;
  }
  clear_height = (type=='items') ? clear_height : clear_height+50 ;
  
  if(filtered_scenes) scene_spacing *= 1.5 ;
  columns_title_height += 2*column_font_size ;
  
  // Draw the scenes, one by one
  var y = columns_title_height ;
  var dy = 0 ;
  y += line_height ;
  y += arrow_fade ;
  context.font = font_size  + 'px ' + font_family ;
  for(var i=0 ; i<the_scenes.length ; i++){
    if(the_scenes[i].is_active==false) continue ;
    dy = the_scenes[i].draw(y,option) + scene_spacing ;
    dy += scene_spacing ;
    if(the_scenes[i].type=='epoch') dy += scene_spacing ; // A bit of extra space for the arrowheads
    y += dy ;
    if(y>last_label_clear && y<28000){
      label_clears.push(y) ;
      y += clear_height ;
      last_label_clear = y + last_label_interval ;
    }
  }
  y += fade_down_height + margin_bottom ;
  
  ch = Math.ceil(y) ;
  Get('span_dimensions').innerHTML = 'w = ' + cw + 'px, h = ' + ch + ' size = ' + (cw*ch) + 'px<sup>2</sup><br />w = ' + (cw/112) + 'cm x ' + (ch/112) + 'cm' ;
  
  for(var i=0 ; i<columns.length ; i++){ columns[i].set_height(y-margin_bottom) ; }
  
  cw = total_width ;
  canvas.width        = cw ;
  canvas.height       = ch ;
  canvas.style.width  = cw ;
  canvas.style.height = ch ;
  
  // Clear the canvas
  context.fillStyle = '#ffffff' ;
  context.fillRect(0,0,cw,ch) ;
  // Draw columns
  for(var i=0 ; i<columns.length ; i++){
    columns[i].draw() ;
    for(var j=0 ; j<columns[i].sub_columns.length ; j++){
      columns[i].sub_columns[j].draw() ;
    }
  }
  
  for(var i=0 ; i<things.length ; i++){
    var option = (type=='items') ? 2 : 1 ;
    things[i].connect_all_scenes(option) ;
  }
  for(var i=0 ; i<connections.length ; i++){
    for(var j=0 ; j<connections.length ; j++){
      if(i==j) continue ;
      resolve_connection_conflicts(connections[i],connections[j]) ;
    }
  }
  for(var i=0 ; i<connections.length ; i++){ connections[i].draw() ; }
  for(var i=0 ; i<things.length ; i++){
    if(type=='items'){
      things[i].fade_in() ;
      if(things[i].fate=='Destroyed' || things[i].fate=='Missing'){
        things[i].fade_out(2) ;
      }
      else{
        things[i].fade_down() ;
      }
    }
    else{
      var fated = false ;
      var born  = false ;
      for(var j=0 ; j<scenes.length ; j++){
        if(scenes[j]==things[i].first_scene) born  = true ;
        if(scenes[j]==things[i].final_scene) fated = true ;
      }
      if(things[i].fate=='Extant') fated = false ;
      if(fated){
        things[i].fade_out(2) ;
      }
      else{
        things[i].fade_down(2) ;
      }
      if(born){
        things[i].fade_in() ;
      }
      else{
        things[i].fade_top() ;
      }
    }
  }
  for(var i=0 ; i<the_scenes.length ; i++){
    if(the_scenes[i].is_active==false) continue ;
    the_scenes[i].draw(-1,option) ;
  }
  for(var i=0 ; i<columns.length ; i++){
    columns[i].draw_title() ;
    for(var j=0 ; j<columns[i].sub_columns.length ; j++){
      columns[i].sub_columns[j].draw_title() ;
    }
  }
  if(!filtered_scenes && type!='items') add_key() ;
}

