var videos = new Array() ;
var scenes = new Array() ;

function event_object(title,date,characters,items,parent_abbreviation,description){
  this.title        = title ;
  this.name         = title ;
  this.date         = date ;
  this.time         = '12:00' ;
  this.set_date_time = function(date,time){
    this.date = date ;
    this.time = time ;
    this.year  = parseInt(this.date.split('/')[0],10) ;
    this.month = parseInt(this.date.split('/')[1],10) ;
    this.day   = parseInt(this.date.split('/')[2],10) ;
    this.hour  = parseInt(this.time.split(':')[0],10) ;
  }
  this.set_date_time(this.date,this.time) ;
  this.characters   = characters ;
  this.items        = items ;
  this.description  = description ;
  this.cameraperson = 'N/A' ;
  this.place        = 'N/A' ;
  this.type         = 'event' ;
  this.x            = -1 ;
  this.y            = -1 ;
  this.h            = -1 ;
  this.color = event_color ;
  this.text_color = 'rgb(255,255,255)' ;
  this.has_border = false ;

  if(parent_abbreviation==null) parent_abbreviation = 'E' ;
  this.parent_abbreviation = parent_abbreviation ;
  this.parent_column = -1 ;
  this.update_parent_column = function(){
    for(var i=0 ; i<all_columns.length ; i++){
      var parent = all_columns[i].seek_column(this.parent_abbreviation) ;
      if(parent!=0){
        this.parent_column = parent ;
        this.w = this.parent_column.width - 4*column_padding ;
        break ;
      }
    }
  }
  this.update_parent_column() ;

  this.set_time = function(time){
    this.time = time ;
    this.hour = parseInt(this.time.split(':')[0]) ;
  }
  this.draw_border = function(draw){
    context.strokeStyle = 'rgb(0,0,0)'
    context.lineWidth = 1 ;
    context.moveTo(this.x       ,this.y       ) ;
    context.lineTo(this.x+this.w,this.y       ) ;
    context.lineTo(this.x+this.w,this.y+this.h) ;
    context.lineTo(this.x       ,this.y+this.h) ;
    context.lineTo(this.x       ,this.y       ) ;
    if(draw) context.stroke() ;
  }
  this.draw = function(y_in,draw){
    if(y_in>=0) this.y = y_in ;
    this.x = this.parent_column.center - 0.5*this.w ;
    this.h = 1.5*event_title_font_size ;
    if(this.description!=''){
      this.h += wrapText(this.description,x,y,this.w-2*scene_padding,event_font_size,false) ;
      this.h += event_font_size ;
    }
    context.fillStyle = this.color ;
    if(draw) context.fillRect(this.x,this.y,this.w,this.h) ;
    // Border
    if(this.has_border) this.draw_border(draw) ;

    context.fillStyle = this.text_color ;
    context.font = event_title_font_size + 'px ' + font_family ;
    var dy = 0.25*event_title_font_size ;
    x = this.parent_column.center ;
    context.textAlign = 'center' ;
    if(draw) context.fillText(this.title,x,this.y+dy) ;

    context.font = event_font_size + 'px ' + font_family ;
    dy += event_title_font_size + event_font_size ;
    if(this.description!=''){
      var y = this.y+dy ;
      context.textAlign = 'left' ;
      x = this.x + scene_padding ;
      dy += wrapText(this.description,x,y,this.w-2*scene_padding,event_font_size,draw) ;
      dy += line_height ;
    }

    // Date
    var x = columns_by_name['chronology'].center ;
    y = y_in+0.5*this.h ;
    context.fillStyle = 'rgb(255,255,255)' ;
    context.textAlign = 'center' ;
    if(draw) context.fillText(this.date,x,this.y+0.5*this.h) ;

    return this.h+scene_spacing ;
  }
}
function epoch_object(title,date,description){
  this.title        = title ;
  this.name         = title ;
  this.date         = date ;
  this.time         = '12:00' ;
  this.description  = description ;
  this.cameraperson = 'N/A' ;
  this.place        = 'N/A' ;
  this.characters   = [] ;
  this.items        = [] ;
  this.type         = 'epoch' ;
  this.x            = -1 ;
  this.y            = -1 ;
  this.w            = -1 ;
  this.h            = -1 ;
  this.set_date_time = function(date,time){
    this.date = date ;
    this.time = time ;
    this.year  = parseInt(this.date.split('/')[0],10) ;
    this.month = parseInt(this.date.split('/')[1],10) ;
    this.day   = parseInt(this.date.split('/')[2],10) ;
    this.hour  = parseInt(this.time.split(':')[0],10) ;
  }
  this.set_date_time(this.date,this.time) ;
  this.update_location_column = function(){} ;
  this.draw = function(y_in,draw){
    this.w = margin_left+total_width-margin_right-fade_out_width+ribbon_size_x ;
    this.h = epoch_title_font_size + 3*epoch_font_size ;

    if(y_in>=0) this.y = y_in ;
    var x1 = this.w-ribbon_size_x ;
    var x2 = this.w ;
    var y1 = this.y+this.h ;
    var y2 = this.y+this.h+ribbon_size_y ;
    context.fillStyle = epoch_fold_color ;
    context.beginPath() ;
    context.moveTo(x1,y1) ;
    context.lineTo(x2,y1) ;
    context.lineTo(x1,y2) ;
    context.lineTo(x1,y1) ;
    if(draw) context.fill() ;

    this.x = 0 ;
    context.beginPath() ;
    context.fillStyle = epoch_color ;
    if(draw) context.fillRect(this.x,this.y,this.w,this.h) ;

    context.fillStyle = 'rgb(255,255,255)' ;
    context.font = epoch_title_font_size + 'px ' + font_family ;
    this.x = margin_left + 0.5*total_width ;
    var dy = 0 ;
    context.textAlign = 'center' ;
    if(draw) context.fillText(this.title,this.x,this.y) ;

    context.font = epoch_font_size + 'px ' + font_family ;
    dy += epoch_title_font_size + epoch_font_size ;
    var y = this.y+dy ;
    if(draw) context.fillText(this.description,this.x,y) ;
    dy += line_height ;

    context.font = font_size  + 'px ' + font_family ;
    return this.h ;
  }
}
function video_object(title,season,channel,scene){
  this.title   = title   ;
  this.season  = season  ;
  this.channel = channel ;
  this.type    = 'video' ;
  this.video_still_id = 2 ;
  this.scenes = new Array() ;
  this.add_scene = function(scene){
    scene.name = this.title + ' scene ' + (1+this.scenes.length) ;
    this.scenes.push(scene) ;
    scene.video = this ;
  }
  if(scene!=null) this.add_scene(scene) ;
  this.entry = 0 ;
  for(var i=0 ; i<entries.length ; i++){
    if(entries[i].name==this.title){
      this.entry = entries[i] ;
      break ;
    }
  }

  this.draw = function(y,draw){}

  this.video_still_url = function(id){
    var path = 'thumbnails/' + this.entry.youtube_id + '_' + id + '.jpg' ;
    return path ;
  }
}
function text_box(text,width){
  this.text = text ;
  this.x = -1 ;
  this.y = -1 ;
  this.w = width ;
  this.h = wrapText(text,0,0,this.w,line_height,false) ;
  this.draw = function(x,y){
    if(abs(this.x+1)<1e-3) this.x = x ;
    if(abs(this.y+1)<1e-3) this.y = y ;
    wrapText(this.text,this.x,this.y,this.w,line_height,true) ;
  }
}
function image_box(url,width,height){
  n_images++ ;
  this.url = url ;
  this.x = -1 ;
  this.y = -1 ;
  this.w = width  ;
  this.h = height ;
  this.draw = function(x,y,border){
    if(abs(this.x+1)<1e-3) this.x = x ;
    if(abs(this.y+1)<1e-3) this.y = y ;
    this.img = new Image() ;
    this.img.src = this.url ;
    var img = this.img ;
    var img_x = this.x ;
    var img_y = this.y ;
    var img_w = this.w ;
    var img_h = this.h ;
    this.img.onload = function(){
      context.drawImage(img,img_x,img_y,img_w,img_h) ;
      n_images_loaded++ ;
      if(n_images_loaded==n_images){
        //paint_canvas() ;
      }
    }
    if(border){
      context.strokeStyle = 'rgb(0,0,0)' ;
      context.moveTo(this.x       ,this.y       ) ;
      context.lineTo(this.x+this.w,this.y       ) ;
      context.lineTo(this.x+this.w,this.y+this.h) ;
      context.lineTo(this.x       ,this.y+this.h) ;
      context.lineTo(this.x       ,this.y       ) ;
      context.stroke() ;
    }
  }
}
function scene_object(date,characters,items,cameraperson,parent_abbreviation,place,tape_tag,description){
  this.date         = date ;
  this.time         = '12:00' ;
  this.characters   = characters.sort() ;
  this.items        = items ;
  this.cameraperson = cameraperson ;
  this.type         = 'scene' ;
  this.tape_tag     = tape_tag ;
  this.place        = place ;
  this.description  = description ;
  this.title = 'N/A' ;
  this.set_date_time = function(date,time){
    this.date = date ;
    this.time = time ;
    this.year  = parseInt(this.date.split('/')[0],10) ;
    this.month = parseInt(this.date.split('/')[1],10) ;
    this.day   = parseInt(this.date.split('/')[2],10) ;
    this.hour  = parseInt(this.time.split(':')[0],10) ;
  }
  this.set_date_time(this.date,this.time) ;

  if(parent_abbreviation==null) parent_abbreviation = 'E' ;
  this.parent_abbreviation = parent_abbreviation ;
  this.parent_column = -1 ;
  this.update_parent_column = function(){
    for(var i=0 ; i<all_columns.length ; i++){
      var parent = all_columns[i].seek_column(this.parent_abbreviation) ;
      if(parent!=0){
        this.parent_column = parent ;
        this.w = this.parent_column.width - 4*column_padding ;
        break ;
      }
    }
  }
  this.update_parent_column() ;

  this.set_time = function(time){
    this.time = time ;
    this.hour = parseInt(this.time.split(':')[0]) ;
  }

  this.w = this.parent_column.width - 4*column_padding ;
  this.h = scene_height ;
  this.x = this.parent_column.center - 0.5*this.w ;
  this.y = -1 ;

  this.video_still_id = 2 ;
  this.image_width  = youtube_scale*youtube_image_width  ;
  this.image_height = youtube_scale*youtube_image_height ;
  this.set_video_still = function(i){ this.video_still_id = i ; }

  this.video_title = '' ;
  this.arrange_items = function(){
    this.x = this.parent_column.center - 0.5*this.w ;
    this.y = -1 ;

    this.youtube = new image_box(this.video.video_still_url(this.video_still_id),this.image_width,this.image_height) ;
    this.youtube.x = this.w - scene_padding - this.image_width ;
    this.youtube.y = scene_padding ;

    this.video_icon       = new image_box( video_icon_url, scene_icon_width, scene_icon_height) ;
    this.date_icon        = new image_box(  date_icon_url, scene_icon_width, scene_icon_height) ;
    this.filmed_icon      = new image_box(filmed_icon_url, scene_icon_width, scene_icon_height) ;
    this.place_icon       = new image_box( place_icon_url, scene_icon_width, scene_icon_height) ;

    if(this.video_title=='') this.video_title = this.video.title + ' (' + this.video.channel[0].toUpperCase() + this.video.season + ')' ;
    this.video_text       = new text_box(this.video_title ,this.w-3*scene_padding-this.image_width) ;
    this.date_text        = new text_box(this.date        ,this.w-3*scene_padding-this.image_width) ;
    this.filmed_text      = new text_box(this.cameraperson,this.w-3*scene_padding-this.image_width) ;
    this.place_text       = new text_box(this.place       ,this.w-3*scene_padding-this.image_width) ;
    this.description_text = new text_box(this.description ,this.w-2*scene_padding-this.image_width) ;

    var text_dy = 2 ;
    var w  = 0.4*(this.w - this.image_width - 4*scene_padding) ;
    var x1 = scene_padding ;
    var x2 = x1 + scene_padding + scene_icon_width ;
    var x3 = scene_spacing + w ;
    var x4 = x3 + scene_padding + scene_icon_width ;
    var y1 = scene_padding ;
    var y2 = y1 + text_dy ;
    var y3 = y2 + this.video_text.h  + scene_padding ;
    var y4 = y3  + text_dy ;

    this.video_icon.x  = x1 ;
    this.video_text.x  = x2 ;
    this.video_icon.y  = y1 ;
    this.video_text.y  = y2 ;

    this.date_icon.x   = x1 ;
    this.date_text.x   = x2 ;
    this.date_icon.y   = y3 ;
    this.date_text.y   = y4 ;

    this.filmed_icon.x = x3 ;
    this.filmed_text.x = x4 ;
    this.filmed_icon.y = y1 ;
    this.filmed_text.y = y2 ;

    this.place_icon.x  = x3 ;
    this.place_text.x  = x4 ;
    this.place_icon.y  = y3 ;
    this.place_text.y  = y4 ;

    this.description_text.x = scene_padding ;
    this.description_text.y = this.date_text.y+this.date_text.h + line_height ;

    this.h = scene_padding + (this.description_text.y-this.y) + this.description_text.h ;
    return this.h ;
  }
  this.draw = function(y_in,draw){
    var dy = 0 ;
    if(y_in>=0){
      this.arrange_items() ;
      this.y = y_in ;
      this.youtube.x          += this.x ; this.youtube.y          += this.y ;
      this.filmed_icon.x      += this.x ; this.filmed_icon.y      += this.y ;
      this.place_icon.x       += this.x ; this.place_icon.y       += this.y ;
      this.video_icon.x       += this.x ; this.video_icon.y       += this.y ;
      this.date_icon.x        += this.x ; this.date_icon.y        += this.y ;
      this.filmed_text.x      += this.x ; this.filmed_text.y      += this.y ;
      this.place_text.x       += this.x ; this.place_text.y       += this.y ;
      this.video_text.x       += this.x ; this.video_text.y       += this.y ;
      this.date_text.x        += this.x ; this.date_text.y        += this.y ;
      this.description_text.x += this.x ; this.description_text.y += this.y ;
    }
    context.font = font_size  + 'px ' + font_family ;

    // Shadow
    context.fillStyle = shadow_color ;
    if(draw) context.fillRect(this.x+shadow_size,this.y+shadow_size,this.w,this.h) ;

    // Background box
    context.fillStyle = tape_tag_background_colors[this.tape_tag] ;
    if(draw) context.fillRect(this.x,this.y,this.w,this.h) ;

    // Date
    var x = columns_by_name['chronology'].center ;
    y = this.y+dy ;
    context.fillStyle = 'rgb(255,255,255)' ;
    context.textAlign = 'center' ;
    if(draw){
      context.fillText(this.date,x,y) ;
      context.fillText(this.video.title,x,y+line_height) ;
    }
    dy += line_height ;
    this.video.draw(y,draw) ;

    // Text style
    context.fillStyle = 'rgb(0,0,0)' ;
    context.textAlign = 'left' ;
    if(draw){
      this.filmed_icon.draw(0,0,false) ;
      this.place_icon .draw(0,0,false) ;
      this.video_icon .draw(0,0,false) ;
      this.date_icon  .draw(0,0,false) ;

      this.filmed_text.draw(0,0) ;
      this.place_text .draw(0,0) ;
      this.video_text .draw(0,0) ;
      this.date_text  .draw(0,0) ;
      this.description_text.draw(0,0) ;
      this.youtube.draw(0,0,true) ;
    }

    // Border
    context.strokeStyle = 'rgb(0,0,0)'
    context.lineWidth = 1 ;
    context.moveTo(this.x       ,this.y       ) ;
    context.lineTo(this.x+this.w,this.y       ) ;
    context.lineTo(this.x+this.w,this.y+this.h) ;
    context.lineTo(this.x       ,this.y+this.h) ;
    context.lineTo(this.x       ,this.y       ) ;
    if(draw) context.stroke() ;

    return this.h + 2*scene_spacing ;
  }
}

function get_scene_by_name(name){
  for(var i=0 ; i<scenes.length ; i++){
    if(scenes[i].name==name){
      return scenes[i] ;
    }
  }
  return -1 ;
}

function set_scene_date_time(name,date,time){
  for(var i=0 ; i<scenes.length ; i++){
    if(scenes[i].name==name){
      scenes[i].date = date ;
      scenes[i].time = time ;
      scenes[i].year  = parseInt(scenes[i].date.split('/')[0],10) ;
      scenes[i].month = parseInt(scenes[i].date.split('/')[1],10) ;
      scenes[i].day   = parseInt(scenes[i].date.split('/')[2],10) ;
      scenes[i].hour  = parseInt(scenes[i].time.split(':')[0],10) ;
      return ;
    }
  }
}

function add_key(){
  var summer2006 = get_scene_by_name('Summer 2006') ;
  var y = summer2006.y + summer2006.h + 2*scene_spacing ;

  y += key_event.draw(y,true) + scene_spacing ;
  key_scene.draw(y,true) ;

  var indices = [12,1,2,3,4,5,6,7,10,11,0] ;
  var y = key_scene.y + key_scene.h + scene_spacing ;
  for(var i=0 ; i<indices.length ; i++){
    var index = indices[i] ;
    var e = color_events[index] ;
    if(index!=12){
      e.color = tape_tag_background_colors[index] ;
      e.text_color = 'rgb(0,0,0)' ;
      e.has_border = true ;
    }
    y += e.draw(y,true) ;
  }

  for(var i=0 ; i<other_key_events.length ; i++){
    var e = other_key_events[i] ;
    if(i!=0){
      e.color = tape_tag_background_colors[0] ;
      e.text_color = 'rgb(0,0,0)' ;
      e.has_border = true ;
    }
    y += other_key_events[i].draw(y,true) ;
  }
}

function order_scenes(){
  scenes.sort(function(a,b){
    if(a.year !=b.year ) return a.year  - b.year  ;
    if(a.month!=b.month) return a.month - b.month ;
    if(a.day   !=b.day ) return a.day   - b.day   ;
    return a.hour - b.hour ;
  }
) ;

for(var i=0 ; i<scenes.length ; i++){
  scenes[i].position = i ;
}



}
