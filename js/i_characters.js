function draw_vertical_label(context, x, y, color, font_color, text){
  context.save() ;
  var dx = 5 ;
  var r = textbox_corner_radius ;
  
  context.lineWidth = 1 ;
  context.font = character_font_size + 'pt ' + font_family ;
  var h_box = context.measureText(text).width + 2*text_margin_LR ;
  var w_box = character_font_size + 2*text_margin_TB ;
  context.fillStyle = color ;
  rounded_box_path(x-0.5*w_box, y, x+0.5*w_box, y+h_box, r, context) ;
  context.fill() ;
            
  context.beginPath() ;
  context.translate(x,y) ;
  context.rotate(Math.PI/2) ;
  context.textAlign = 'left' ;
  context.textBaseline = 'middle' ;
  context.fillStyle = font_color ;
  context.fillText(text, dx, 0) ;
  context.restore() ;
}

function is_between(xA, x1, x2){
  if(xA>x1 && xA<x2) return true ;
  if(xA>x2 && xA<x1) return true ;
  return false ;
}

var connections = [] ;
function connection_object(character, x1, y1, x2, y2, yC){
  this.x1 = x1 ;
  this.y1 = y1 ;
  this.x2 = x2 ;
  this.y2 = y2 ;
  this.yC = yC ;
  this.r  = corner_radius ;
  this.color      = character.color ;
  this.font_color = character.font_color ;
  this.name       = character.name ;
  this.draw = function(){
    // Arrow path
    context.lineWidth = character_line_width ;
    context.strokeStyle = this.color ;
    context.fillStyle   = this.color ;
    
    if(abs(this.x1-this.x2)<1e-3){
      context.beginPath() ;
      context.moveTo(this.x1,this.y1) ;
      context.lineTo(this.x2,this.y2) ;
      context.stroke() ;
      
      for(var i=0 ; i<label_clears.length ; i++){
        var y_lc = label_clears[i] ;
        if(y_lc>=y1 && y_lc<=y2){
          draw_vertical_label(context, this.x1, y_lc, this.color, this.font_color, this.name) ;
        }
      }
    }
    else{
      this.dx = (this.x1<this.x2) ? this.r : -this.r ;
      context.beginPath() ;
      context.moveTo(this.x1,this.y1) ;
      context.lineTo(this.x1,this.yC-this.r) ;
      context.arcTo (this.x1,this.yC,this.x1+this.dx,this.yC,this.r) ;
      context.lineTo(this.x2-this.dx,this.yC) ;
      context.arcTo(this.x2,this.yC,this.x2,this.yC+this.r,this.r) ;
      context.lineTo(this.x2,this.y2) ;
      context.stroke() ;
      
      for(var i=0 ; i<label_clears.length ; i++){
        var y_lc = label_clears[i] ;
        var y_check = [ [this.y1,this.yC-this.r] , [this.yC+this.r,this.y2] ] ;
        var x_check = [ this.x1 , this.x2 ] ;
        for(var j=0 ; j<2 ; j++){
          if(y_lc>=y_check[j][0] && y_lc<=y_check[j][1]){
            draw_vertical_label(context, x_check[j], y_lc, this.color, this.font_color, this.name) ;
          }
        }
      }
    }

    // Arrowhead
    context.beginPath() ;
    context.moveTo(this.x2,this.y2) ;
    context.lineTo(this.x2-arrowhead_size*arrowhead_fraction,this.y2-arrowhead_size) ;
    context.lineTo(this.x2+arrowhead_size*arrowhead_fraction,this.y2-arrowhead_size) ;
    context.moveTo(this.x2,this.y2) ;
    context.fill() ;
  }
}
function resolve_connection_conflicts(c1, c2){
  var nConflicts = 0 ;
  if( is_between(c2.yC, c1.y1, c1.y2) && is_between(c1.x1, c2.x1, c2.y2) ) nConflicts++ ;
  if( is_between(c1.yC, c2.y1, c2.y2) && is_between(c2.x2, c1.x1, c1.y2) ) nConflicts++ ;
  if(nConflicts==2){
    var yC_tmp = c1.yC ;
    c1.yC = c2.yC ;
    c2.yC = yC_tmp ;
  }
}

function character_object(name,color,font_color,fate,category){
  this.name       = name  ;
  this.color      = color ;
  this.font_color = font_color ;
  this.fate       = fate  ;
  this.position   = 0 ;
  this.category   = category ;
  this.scenes = new Array() ;
  
  this.parse_scenes = function(){
    this.scenes = new Array() ;
    for(var i=0 ; i<scenes.length ; i++){
      if(scenes[i].characters==null) continue ;
      for(var j=0 ; j<scenes[i].characters.length ; j++){
        if(scenes[i].characters[j]==this.name){
          this.scenes.push([i,this.position,characters.length,scenes[i]]) ;
          if(this.scenes.length<=1) break ;
          var s1 = this.scenes[this.scenes.length-2][3] ;
          var s2 = this.scenes[this.scenes.length-1][3] ;
          if(s1.fields['location']==s2.fields['location']) continue ;
          scenes[i].add_character_in(this.name, s1) ;
          break ;
        }
      }
    }
  }
  this.parse_item_scenes = function(){
    this.scenes = new Array() ;
    for(var i=0 ; i<item_scenes.length ; i++){
      if(item_scenes[i].items==null) continue ;
      for(var j=0 ; j<item_scenes[i].items.length ; j++){
        if(item_scenes[i].items[j]==this.name){
          this.scenes.push([i,this.position,items.length,item_scenes[i]]) ;
          break ;
        }
      }
    }
  }
  this.connect_all_scenes = function(type){
    for(var i=0 ; i<this.scenes.length-1 ; i++){
      var s1 = this.scenes[i+0] ;
      var s2 = this.scenes[i+1] ;
      this.connect_scenes(s1[3], s2[3], type) ;
    }
  }
  this.final_scene = function(){ return this.scenes[this.scenes.length-1] ; }
  this.fade_in = function(){
    if(this.scenes.length==0) return ;
    context.lineWidth = character_line_width ;
    var s = this.scenes[0][3] ;
    var x1 = s.x - arrow_fade ;
    x1 = columns[0].x + 0.5 ;
    var x2 = s.x + 0.5 ;
    var y_index = 0 ;
    var n_fade_in = 0 ;
    for(var i=0 ; i<things.length ; i++){
      if(things[i].scenes[0]==undefined) continue ;
      if(things[i].scenes[0][3]==s) n_fade_in++ ;
      if(things[i]==this) y_index = n_fade_in ;
    }
    n_fade_in = (n_fade_in==0) ? 1 : n_fade_in ;
    var y = s.y + scene_padding + (s.h-2*scene_padding)*y_index/n_fade_in ;
    if(n_fade_in==1) y = s.y + 0.5*s.h ;

    context.strokeStyle = this.color ;
    context.fillStyle   = this.color ;
    context.beginPath() ;
    context.moveTo(x1,y) ;
    context.lineTo(x2,y) ;
    context.stroke() ;

    context.moveTo(x2,y) ;
    context.lineTo(x2-arrowhead_size,y-arrowhead_size*arrowhead_fraction) ;
    context.lineTo(x2-arrowhead_size,y+arrowhead_size*arrowhead_fraction) ;
    context.moveTo(x2,y) ;
    context.fill() ;
    horizontal_line_segments.push(new line_segment(x1,y,x2,y)) ;
    
    var w = columns[1].width - 10 ;
    context.textBaseline = 'middle' ;
    var h     = wrapText(this.name,x,0,w,line_height,false) + 2*text_margin_TB ;
    var w_box = wrapText(this.name,x,0,w,line_height,-1   ) + 2*text_margin_LR ;
    var r = textbox_corner_radius ;
    var x = columns[1].center ;
    var y_text = y-0.5*h+2 ;
    rounded_box_path(x-0.5*w_box, y-0.5*h, x+0.5*w_box, y+0.5*h, r, context) ;
    context.fill() ;
    if(this.color=='#ffffff'){
      context.strokeStyle = '#000000' ;
      context.lineWidth   = 1 ;
      context.stroke() ;
    }
    
    context.textAlign = 'center' ;
    context.textBaseline = 'top' ;
    context.fillStyle = this.font_color ;
    context.font = character_font_size + 'pt ' + font_family ;
    wrapText(this.name,x,y_text,w_box,line_height,true) ;
    context.textBaseline = 'top' ;
  }
  this.fade_out = function(type){
    if(this.scenes.length==0) return ;
    context.lineWidth = character_line_width ;
    var s = this.scenes[this.scenes.length-1][3] ;
    var x1  = s.x + s.w + 0.5 ;
    var x2  = s.x + s.w + arrow_fade + 0.5 ;
    x2 = columns[columns.length-1].x + columns[columns.length-1].width + arrow_fade + 0.5 ;
    var x3 = x2 + 5 ;
    var y_index = 0 ;
    var n_fade_in = 0 ;
    for(var i=0 ; i<things.length ; i++){
      if(things[i].scenes[things[i].scenes.length-1]==undefined) continue ;
      if(things[i].scenes[things[i].scenes.length-1][3]==s) n_fade_in++ ;
      if(things[i]==this) y_index = n_fade_in ;
    }
    n_fade_in = (n_fade_in==0) ? 1 : n_fade_in ;
    var y = s.y + scene_padding + (s.h-2*scene_padding)*y_index/n_fade_in ;
    if(n_fade_in==1) y = s.y + 0.5*s.h ;

    context.strokeStyle = this.color ;
    context.fillStyle = this.color ;
    context.beginPath() ;
    context.moveTo(x1,y) ;
    context.lineTo(x2,y) ;
    context.stroke() ;
    
    horizontal_line_segments.push(new line_segment(x1,y,x2,y)) ;
    
    var w = context.measureText(this.name+' ('+this.fate+')').width + 2*text_margin_LR ;
    var h = character_font_size + 2*text_margin_TB ;
    var r = textbox_corner_radius ;
    var x4 = x3 - text_margin_LR ;
    rounded_box_path(x4, y-0.5*h, x4+w, y+0.5*h, r, context) ;
    context.fill() ;
    
    context.textAlign = 'left' ;
    context.textBaseline = 'middle' ;
    context.fillStyle = this.font_color ;
    context.font = character_font_size + 'pt ' + font_family ;
    if(type==1){
      context.fillText(this.name,x3,y) ;
      context.fillText('('+this.fate+')',x2,y+line_height) ;
    }
    else{
      context.fillText(this.name+' ('+this.fate+')',x3,y) ;
    }
    context.textBaseline = 'top' ;
  }
  this.fade_down = function(){
    if(this.scenes.length==0) return ;
    context.lineWidth = character_line_width ;
    var i  = this.scenes[this.scenes.length-1] ;
    var s  = i[3] ;
    var x  = s.x+((1+i[1])/(1+i[2]))*s.w + 0.5 ;
    var y1 = s.y+s.h + 0.5 ;
    var y2 = ch - fade_down_height ;

    context.strokeStyle = this.color ;
    context.fillStyle   = this.color ;
    context.beginPath() ;
    context.moveTo(x,y1) ;
    context.lineTo(x,y2) ;
    context.stroke() ;
    
    draw_vertical_label(context, x, y2, this.color, this.font_color, this.name) ;
    
    for(var i=0 ; i<label_clears.length ; i++){
      var y_lc = label_clears[i] ;
      if(y_lc>=y1 && y_lc<=y2){
        draw_vertical_label(context, x, y_lc, this.color, this.font_color, this.name) ;
      }
    }
    
  }
  this.intermediate_scene = function(s1,s2){
    return false ;
    for(var i=s1.position+1 ; i<s2 ; i++){
      if(scenes[i].type=='scene' && scenes[i].location_abbreviation==this.location_abbreviation){
        return true ;
      }
    }
    return false ;
  }
  this.connect_scenes = function(scene_out,scene_in,type){
    var position = (1+this.position)/(1+things.length) ;
    var x1 = scene_out.x+position*scene_out.w ;
    var x2 = scene_in.x +position*scene_in.w  ;
    var y1 = scene_out.y+scene_out.h ;
    var y2 = scene_in.y ;
    
    // Now we have reserved some space for the vertical line
    // We need to find the values of yA and yB to make this work
    var x0 = columns_by_name['location'].x ;
    var yA = y1+arrow_spacing ;
    var yB = y2-arrow_spacing ;
    
    var yC = (type==1) ? yA : yB ;
    if(type==1){
      for(yC=y1+arrow_spacing ; yC<y2-arrow_spacing ; yC+=arrow_spacing){
        var result = check_line_collisions(x1,yC,x2,yC) ;
        if(result[0]==0) break ;
      }
    }
    else{
      for(yC=y2-2*arrow_spacing ; yC>=y1+arrow_spacing ; yC-=arrow_spacing){
        var result = check_line_collisions(x1,yC,x2,yC) ;
        if(result[0]==0) break ;
      }
    }
    
    horizontal_line_segments.push(new line_segment(x1,yC,x2,yC)) ;
    connections.push(new connection_object(this, x1, y1, x2, y2, yC)) ;
  }
}

function line_segment(x1,y1,x2,y2){
  this.x1 = x1 ;
  this.y1 = y1 ;
  this.x2 = x2 ;
  this.y2 = y2 ;
  if(this.x1>this.x2){
    var   x = this.x1 ;
    this.x1 = this.x2 ;
    this.x2 = x ;
  }
  if(this.y1>this.y2){
    var   y = this.y1 ;
    this.y1 = this.y2 ;
    this.y2 = y ;
  }
}
function check_line_collisions(x1,y1,x2,y2){
  // Return values:
  // result[0]: Number of overlaps with parallel line segments
  // result[1]: Number of intersection with perpendicular line segments
  var results = [0,0] ;

  if(x1>x2){
    var x = x1 ;
    x1    = x2 ;
    x2    = x  ;
  }
  if(y1>y2){
    var y = y1 ;
    y1    = y2 ;
    y2    = y  ;
  }

  if(abs(x1-x2)<1e-3){
    for(var i=0 ; i<vertical_line_segments.length ; i++){
      var v = vertical_line_segments[i] ;
      if(abs(x1-v.x1)<1e-3){
        if((y1<=v.y1 && y2>=v.y1) || (v.y1>=y1 && v.y2<=y2) || (y1>=v.y1 && y2<=v.y2) ) results[0]++ ;
      }
    }
    for(var i=0 ; i<horizontal_line_segments.length ; i++){
      var h = horizontal_line_segments[i] ;
      if(x1>=h.x1 && x1<=h.x2 && y1<=h.y1 && y2>=h.y1) results[1]++ ;
    }
  }
  if(abs(y1-y2)<1e-3){
    for(var i=0 ; i<horizontal_line_segments.length ; i++){
      var h = horizontal_line_segments[i] ;
      if(abs(y1-h.y1)<1e-3){
        if(x1<=h.x1){
          results[0] += (h.x1<=x2) ;
        }
        else{
          results[0] += (x1<=h.x2) ;
        }
      }
    }
    for(var i=0 ; i<vertical_line_segments.length ; i++){
      var v = vertical_line_segments[i] ;
      if(y1>=v.y1 && y1<=v.y2 && x1<=v.x1 && x2>=v.x1) results[1]++ ;
    }
  }
  return results ;
}

var characters = new Array() ;
// Holy Trinity
characters.push( new character_object('Alex'     , '#0000ff', '#ffffff' , 'Extant' , 'primary')) ;
characters.push( new character_object('Jay'      , '#ff0000', '#ffffff' , 'Missing', 'primary')) ;
characters.push( new character_object('Tim'      , '#eeee00', '#000000' ,' Extant' , 'primary')) ;

// Marble Hornets crew
characters.push( new character_object('Brian'    , '#005500', '#ffffff' , 'Missing', 'cast')) ;
characters.push( new character_object('Seth'     , '#00aa00', '#ffffff' , 'Missing', 'cast')) ;
characters.push( new character_object('Sarah'    , '#00dd00', '#ffffff' , 'Missing', 'cast')) ;

// Other normal humans
characters.push( new character_object('Amy'      , '#ff00ff', '#ffffff' , 'Missing', 'minor'    )) ;
characters.push( new character_object('Bruce'    , '#aa00aa', '#ffffff' , 'Dead'   , 'minor'    )) ;
characters.push( new character_object('Jessica'  , '#550055', '#ffffff' , 'Missing', 'secondary')) ;

// Unknown quantities
characters.push( new character_object('Masky'    , '#eeeeee', '#000000' , 'Extant' , 'antagonist')) ;
characters.push( new character_object('Hoody'    , '#888888', '#ffffff' , 'Missing', 'antagonist')) ;
characters.push( new character_object('totheark' , '#555555', '#ffffff' , 'Extant' , 'antagonist')) ;
characters.push( new character_object('operator' , '#000000', '#ffffff' , 'Extant' , 'antagonist')) ;
characters.push( new character_object('Unknown'  , '#00bbbb', '#ffffff' , 'Extant' , 'minor'     )) ;

characters.push( new character_object('Broody'   , '#ffa500', '#ffffff' , 'Extant' , 'minor'     )) ;

// Items
var items = new Array() ;

// Cameras
items.push(new character_object('AlexCam1', '#ffff00', '#000000' , 'Missing'  , 'camera')) ;
items.push(new character_object('AlexCam2', '#eeee00', '#000000' , 'Missing'  , 'camera')) ;
items.push(new character_object('JayCam1' , '#dddd00', '#000000' , 'Destroyed', 'camera')) ;
items.push(new character_object('JayCam2' , '#bbbb00', '#ffffff' , 'Tim'      , 'camera')) ;
items.push(new character_object('Chestcam', '#999900', '#ffffff' , 'Destroyed', 'camera')) ;
items.push(new character_object('HoodyCam', '#777700', '#ffffff' , 'Hoody'    , 'camera')) ;

// Tapes
items.push(new character_object('Alex\'s tapes'    , '#0000ff', '#ffffff' , 'Destroyed', 'tape')) ;
items.push(new character_object('Entry #51 tape'   , '#0000dd', '#ffffff' , 'Jay'      , 'tape')) ;
items.push(new character_object('Tim\'s tapes'     , '#0000bb', '#ffffff' , 'Jay'      , 'tape')) ;
items.push(new character_object('Static hole tapes', '#000099', '#ffffff' , 'Jay'      , 'tape')) ;
items.push(new character_object('Entry #26 tape'   , '#000077', '#ffffff' , 'Jay'      , 'tape')) ;
items.push(new character_object('Entry #22 tape'   , '#000055', '#ffffff' , 'Destroyed', 'tape')) ;
items.push(new character_object('Entry #76 tape'   , '#000055', '#ffffff' , 'Jay'      , 'tape')) ;
items.push(new character_object('Hoody tape'       , '#000033', '#ffffff' , 'Tim'      , 'tape')) ;

// Accounts
items.push(new character_object('marblehornets youtube', '#ffffff', '#000000' , 'Jay', 'account')) ;
items.push(new character_object('marblehornets twitter', '#000000', '#ffffff' , 'Jay', 'account')) ;

// Weapons
items.push(new character_object('Bullet casing', '#ff0000', '#ffffff' , 'missing', 'weapon')) ;
items.push(new character_object('Knife'        , '#cc0000', '#ffffff' , 'Jay'    , 'weapon')) ;
items.push(new character_object('Gun'          , '#aa0000', '#ffffff' , 'Hoody'  , 'weapon')) ;

// Other
items.push(new character_object('Alex\'s sketches'    , '#00ff00', '#000000' , 'Destroyed', 'other')) ;
items.push(new character_object('Tim\'s medical notes', '#00cc00', '#000000' , 'Tim'      , 'other')) ;
items.push(new character_object('Tim\'s pills'        , '#00aa00', '#ffffff' , 'Tim'      , 'other')) ;
items.push(new character_object('Alex\'s key'         , '#009900', '#ffffff' , 'Jay'      , 'other')) ;
items.push(new character_object('Rocky (Alex\'s dog)' , '#00aa00', '#ffffff' , 'Missing'  , 'other')) ;
items.push(new character_object('Doll'                , '#007700', '#ffffff' , 'Jay'      , 'other')) ;
items.push(new character_object('Amy photo'           , '#005500', '#ffffff' , 'Tim'      , 'other')) ;

if(filter_categories.length>0){
  for(var i=0 ; i<filter_categories.length ; i++){
    for(var j=0 ; j<items.length ; j++){
      if(filter_categories[i]==items[j].category){
        filter_items.push(items[j].name) ;
      }
    }
  }
}
if(filter_items.length>0){
  var items_out = [] ;
  for(var i=0 ; i<filter_items.length ; i++){
    for(var j=0 ; j<items.length ; j++){
      if(filter_items[i]==items[j].name){
        items_out.push(items[j]) ;
        break ;
      }
    }
  }
  items = items_out ;
}

var things = [] ;

function process_characters(){
  for(var i=0 ; i<characters.length ; i++){
    characters[i].position = i ;
    characters[i].parse_scenes() ;
  }
}

function process_items(){
  for(var i=0 ; i<items.length ; i++){
    items[i].position = i ;
    items[i].parse_item_scenes() ;
  }
}

function abs(x){ return Math.abs(x) ; }