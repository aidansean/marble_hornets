function text_box(text,width){
  this.text = text ;
  this.x = -1 ;
  this.y = -1 ;
  this.w = width ;
  this.h = wrapText(text,0,0,this.w,line_height,false) ;
  this.draw = function(x,y){
    if(abs(this.x+1)<1e-3) this.x = x ;
    if(abs(this.y+1)<1e-3) this.y = y ;
    wrapText(this.text,this.x+0.5,this.y+0.5,this.w,line_height,true) ;
  }
}
function image_box(url,width,height){
  n_images++ ;
  this.url = url ;
  this.x = -1 ;
  this.y = -1 ;
  this.w = width  ;
  this.h = height ;
  this.do_clip = false ;
  this.draw = function(x,y,border){
    if(abs(this.x+1)<1e-3) this.x = x ;
    if(abs(this.y+1)<1e-3) this.y = y ;
    this.img = new Image() ;
    this.img.src = this.url ;
    var img = this.img ;
    var img_x = this.x+0.5 ;
    var img_y = this.y+0.5 ;
    var img_w = this.w ;
    var img_h = this.h ;
    var do_clip = this.do_clip ;
    var r = 4 ;
    this.img.onload = function(){
      if(do_clip){
        context.save() ;
        rounded_box_path(img_x, img_y, img_x+img_w, img_y+img_h, r, context) ;
        context.clip() ;
      }
      context.drawImage(img,img_x,img_y,img_w,img_h) ;
      context.restore() ;
    }
    if(border){
      context.strokeStyle = 'rgb(0,0,0)' ;
      rounded_box_path(img_x, img_y, img_x+img_w, img_y+img_h, r, context) ;
      context.stroke() ;
    }
  }
}

function rounded_box_path(x1, y1, x2, y2, r, context){
  context.beginPath() ;
  context.moveTo(x1+r,y1) ;
  context.lineTo(x2-r,y1) ;
  context.arcTo (x2,y1,x2,y1+r,r) ;
  context.lineTo(x2,y2-r) ;
  context.arcTo (x2,y2,x2-r,y2,r)
  context.lineTo(x1+r,y2) ;
  context.arcTo (x1,y2,x1,y2-r,r)
  context.lineTo(x1,y1+r) ;
  context.arcTo (x1,y1,x1+r,y1,r)
}

function event_object(node, mode){
  this.read_from_xml = function(element){
    this.fields      = get_fields_from_xml(element) ;
    if(this.fields==undefined) this.fields = [] ;
    if(this.fields['color']==undefined) this.fields['color'] = 'rgb(0,0,99)' ; // Default colour
    this.characters  = get_array_from_xml(element, 'character') ;
    this.items       = get_array_from_xml(element, 'item'     ) ;
  }
  this.fields = [] ;
  this.selected = false ;
  
  this.read_from_xml(node) ;
  this.type = 'event' ;
  this.x    = -1 ;
  this.y    = -1 ;
  this.w    = -1 ;
  this.h    = -1 ;
  
  this.set_date_time = function(date,time){
    if(this.fields==undefined) this.fields = [] ;
    if(date==undefined) date = '1900/01/01' ;
    if(time==undefined) time = '12:00' ;
    this.fields['date' ] = date ;
    this.fields['time' ] = time ;
    this.year  = parseInt(this.fields['date'].split('/')[0],10) ;
    this.month = parseInt(this.fields['date'].split('/')[1],10) ;
    this.day   = parseInt(this.fields['date'].split('/')[2],10) ;
    this.hour  = parseInt(this.fields['time'].split(':')[0],10) ;
  }
  this.set_date_time(this.fields['date'],this.fields['time']) ;
  this.text_color = 'rgb(255,255,255)' ;
  this.has_border = false ;
  
  this.parent_column = -1 ;
  this.parent = this.fields['location'] ;
  this.update_parent_column = function(){
    for(var i=0 ; i<all_columns.length ; i++){
      var parent = all_columns[i].seek_column(this.parent) ;
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
    this.fields['time' ] = time ;
    this.hour = parseInt(this.fields['time'].split(':')[0],10) ;
  }
  
  this.characters_in  = [] ;
  this.characters_out = [] ;
  this.add_character_in  = function(name){
    var add_char = true ;
    for(var i=0 ; i<this.characters_in.length ; i++){
      if(name==this.characters_in[i]){
        add_char = false ;
        break ;
      }
    }
    if(add_char) this.characters_in.push(name) ;
  }
  this.add_character_out = function(name){
    var add_char = true ;
    for(var i=0 ; i<this.characters_out.length ; i++){
      if(name==this.characters_out[i]){
        add_char = false ;
        break ;
      }
    }
    if(add_char) this.characters_out.push(name) ;
  }
  
  this.draw_border = function(draw){
    context.strokeStyle = 'rgb(0,0,0)'
    if(this.selected) context.strokeStyle = selected_border_color ;
    context.lineWidth = 1 ;
    if(draw){
      var x1 = this.x+0.5 ;
      var x2 = x1+this.w  ;
      var y1 = this.y+0.5 ;
      var y2 = y1+this.h  ;
      var r = corner_radius ;
      rounded_box_path(x1, y1, x2, y2, r, context) ;
      context.stroke() ;
    }
  }
  this.draw = function(y_in,draw){
    var dy = (this.characters_in.length+0)*scene_spacing ;
    var y = y_in + dy ;
    if(y_in>=0) this.y = y ;
    this.x = this.parent_column.center - 0.5*this.w ;
    
    // Rectangle
    context.fillStyle = this.fields['color'] ;
    if(draw){
      var x1 = this.x+0.5 ;
      var x2 = x1+this.w  ;
      var y1 = this.y+0.5 ;
      var y2 = y1+this.h  ;
      var r = corner_radius ;
      rounded_box_path(x1, y1, x2, y2, r, context) ;
      context.fill() ;
    }
    
    // Border
    var draw_border = (this.has_border || this.selected) ;
    if(draw_border && draw) this.draw_border(draw) ;

    // Write title, center aligned text
    context.fillStyle = this.text_color ;
    context.font = event_title_font_size + 'px ' + font_family ;
    context.textAlign = 'center' ;
    var x = this.parent_column.center ;
    dy = 0.25*event_title_font_size ;
    var text_dy = (this.fields['description']=='') ? 5 : 0 ;
    if(draw) context.fillText(this.fields['title'],x,this.y+dy+text_dy) ;
    
    // Write description, wrapper left aligned text
    context.font = event_font_size + 'px ' + font_family ;
    dy += event_title_font_size + event_font_size ;
    if(this.fields['description']!=''){
      var y = this.y+dy-0.5*event_font_size ;
      context.textAlign = 'left' ;
      x = this.x + scene_padding ;
      dy += wrapText(this.fields['description'],x,y,this.w-2*scene_padding,event_font_size,draw) ;
    }
    this.h = dy ;

    // Date
    x = columns_by_name['chronology'].center ;
    context.fillStyle = 'rgb(255,255,255)' ;
    context.textAlign = 'center' ;
    if(draw && this.year>1950) context.fillText(this.fields['date'],x,this.y+0.5*this.h) ;
    
    var spacing = (this.characters_in.length+1)*scene_spacing ;
    if(spacing<scene_spacing) spacing = scene_spacing ;
    return this.h + spacing ;
  }
  this.make_xml_element = function(){
    var element = xmlDoc.createElement('event') ;
    xml_add_fields(this, element) ;
    xml_add_array(this.characters, element, 'character') ;
    xml_add_array(this.items     , element, 'item'     ) ;
    this.xml = element ;
    return element ;
  }
}
function epoch_object(node, mode){
  this.read_from_xml = function(element){
    this.fields = get_fields_from_xml(element) ;
  }
  this.fields = [] ;
  this.read_from_xml(node) ;
  this.type = 'epoch' ;
  this.x = -1 ;
  this.y = -1 ;
  this.w = -1 ;
  this.h = -1 ;
  this.selected = false ;
  
  this.set_date_time = function(date,time){
    this.fields['date' ] = date ;
    this.fields['time' ] = time ;
    this.year  = parseInt(this.fields['date'].split('/')[0],10) ;
    this.month = parseInt(this.fields['date'].split('/')[1],10) ;
    this.day   = parseInt(this.fields['date'].split('/')[2],10) ;
    this.hour  = parseInt(this.fields['time'].split(':')[0],10) ;
  }
  this.set_date_time(this.fields['date'],this.fields['time']) ;
  this.update_location_column = function(){} ;
  this.draw_border = function(draw){
    var x1 = this.w-ribbon_size_x ;
    var x2 = this.w ;
    var y1 = this.y+this.h ;
    var y2 = this.y+this.h+ribbon_size_y ;
    
    context.fillStyle = epoch_fold_color ;
    if(this.selected) context.fillStyle = selected_border_color ;
    context.beginPath() ;
    context.moveTo(x1,y1) ;
    context.lineTo(x2,y1) ;
    context.lineTo(x1,y2) ;
    context.lineTo(x1,y1) ;
    if(draw) context.fill() ;
  }
  this.draw = function(y_in,draw){
    this.w = margin_left+total_width-margin_right-fade_out_width+ribbon_size_x ;
    this.h = epoch_title_font_size + 3*epoch_font_size ;

    if(y_in>=0) this.y = y_in ;
    
    // Border
    this.draw_border(draw) ;

    this.x = 0 ;
    context.beginPath() ;
    context.fillStyle = epoch_color ;
    if(draw) context.fillRect(this.x+0.5,this.y+0.5,this.w,this.h) ;

    context.fillStyle = 'rgb(255,255,255)' ;
    context.font = epoch_title_font_size + 'px ' + font_family ;
    this.x = margin_left + 0.5*total_width ;
    var dy = 10 ;
    context.textAlign = 'center' ;
    if(draw) context.fillText(this.fields['title'],this.x+0.5,this.y+dy+0.5) ;

    context.font = epoch_font_size + 'px ' + font_family ;
    dy += epoch_title_font_size + 0.75*epoch_font_size ;
    var y = this.y+dy ;
    if(draw) context.fillText(this.fields['description'],this.x+0.5,y+0.5) ;
    dy += line_height ;

    context.font = font_size  + 'px ' + font_family ;
    return this.h ;
  }
  this.make_xml_element = function(){
    var element = xmlDoc.createElement('epoch') ;
    xml_add_fields(this, element) ;
    this.xml = element ;
    return element ;
  }
}
function video_object(node, mode){
  this.fields = [] ;
  this.read_from_xml = function(element){
    this.fields      = get_fields_from_xml(element) ;
    this.characters  = get_array_from_xml(element, 'character') ;
    this.items       = get_array_from_xml(element, 'item'     ) ;
  }
  this.selected = false ;
  this.read_from_xml(node) ;
  this.type = 'video' ;
  this.scenes = new Array() ;
  this.add_scene = function(scene){
    scene.fields['name'] = this.fields['title'] + ' scene ' + (1+this.scenes.length) ;
    this.scenes.push(scene) ;
    scene.video = this ;
  }
  
  this.draw = function(y,draw){}
  this.video_still_url = function(id){ return path = 'images/thumbnails/' + this.fields['youtube_id'] + '_' + id + '.jpg' ; }
  this.make_xml_element = function(){
    var element = xmlDoc.createElement('video') ;
    xml_add_fields(this, element) ;
    var scene_list_element = xmlDoc.createElement('scene_list') ;
    for(var i=0 ; i<this.scenes.length ; i++){
      if(this.scenes[i].xml==undefined) this.scenes[i].make_xml_element() ;
      var scene_element = this.scenes[i].xml ;
      scene_list_element.appendChild(scene_element) ;
    }
    element.appendChild(scene_list_element) ;
    this.xml = element ;
    return element ;
  }
}
function scene_object(node, mode){
  this.read_from_xml = function(element){
    this.fields     = get_fields_from_xml(element) ;
    this.characters = get_array_from_xml(element, 'character') ;
    this.items      = get_array_from_xml(element, 'item'     ) ;
  }
  this.selected = false ;
  this.fields = [] ;
  this.read_from_xml(node) ;
  this.characters = this.characters.sort() ;
  this.type       = 'scene' ;
  
  this.set_date_time = function(date,time){
    this.fields['date' ] = date ;
    this.fields['time' ] = time ;
    this.year  = parseInt(this.fields['date'].split('/')[0],10) ;
    this.month = parseInt(this.fields['date'].split('/')[1],10) ;
    this.day   = parseInt(this.fields['date'].split('/')[2],10) ;
    this.hour  = parseInt(this.fields['time'].split(':')[0],10) ;
  }
  this.set_date_time(this.fields['date'],this.fields['time']) ;
  
  this.parent_column = -1 ;
  this.parent = this.fields['location'] ;
  this.update_parent_column = function(){
    for(var i=0 ; i<all_columns.length ; i++){
      var parent = all_columns[i].seek_column(this.parent) ;
      if(parent!=0){
        this.parent_column = parent ;
        this.w = this.parent_column.width - 4*column_padding ;
        break ;
      }
    }
  }
  if(mode=='timeline') this.update_parent_column() ;
  
  this.set_time = function(time){
    this.fields['time'] = time ;
    this.hour = parseInt(this.fields['time'].split(':')[0]) ;
  }
  
  if(mode=='timeline'){
    this.w = this.parent_column.width - 4*column_padding ;
    this.h = scene_height ;
    this.x = this.parent_column.center - 0.5*this.w ;
    this.y = -1 ;
    
    this.image_width  = youtube_scale*youtube_image_width  ;
    this.image_height = youtube_scale*youtube_image_height ;
    this.set_video_still = function(i){ this.fields['video_still_id'] = i ; }
  }
  this.characters_in  = [] ;
  this.characters_out = [] ;
  this.add_character_in  = function(name, other_scene){
    var add_char = true ;
    for(var i=0 ; i<this.characters_in.length ; i++){
      if(name==this.characters_in[i][0]){
        add_char = false ;
        break ;
      }
    }
    if(add_char){
      this.characters_in.push([name,other_scene]) ;
    }
  }
  this.add_character_out = function(name){
    var add_char = true ;
    for(var i=0 ; i<this.characters_out.length ; i++){
      if(name==this.characters_out[i]){
        add_char = false ;
        break ;
      }
    }
    if(add_char) this.characters_out.push(name) ;
  }
  
  this.draw_thumbnail_text = function(){
    context.beginPath() ;
    context.fillStyle = 'rgb(200,200,200)' ;
    context.fillRect(this.youtube.x+0.5,this.youtube.y+0.5,this.image_width,this.image_height) ;
    context.fill() ;
    
    context.fillStyle = 'rgb(0,0,0)' ;
    var x  = this.youtube.x + 0.25*this.image_width + 0.5 ;
    var y1 = this.youtube.y + 0.5 + 0.27*this.image_height ;
    var y2 = this.youtube.y + 0.5 + 0.53*this.image_height ;
    var thumbnail_text1 = new text_box('Youtube', this.image_width) ;
    var thumbnail_text2 = new text_box('preview', this.image_width) ;
    thumbnail_text1.x = x ; thumbnail_text1.y = y1 ;
    thumbnail_text2.x = x ; thumbnail_text2.y = y2 ;
    thumbnail_text1.draw() ;
    thumbnail_text2.draw() ;
  }
  this.fields['video_title'] = '' ;
  this.arrange_items = function(){
    this.x = this.parent_column.center - 0.5*this.w ;
    this.y = -1 ;

    var url = this.video.video_still_url(this.fields['video_still_id']) ;
    this.youtube = new image_box(url,this.image_width,this.image_height) ;
    this.youtube.x = this.w - scene_padding - this.image_width ;
    this.youtube.y = scene_padding ;
    this.youtube.do_clip = true ;

    this.video_icon  = new image_box( video_icon_url, scene_icon_width, scene_icon_height) ;
    this.date_icon   = new image_box(  date_icon_url, scene_icon_width, scene_icon_height) ;
    this.filmed_icon = new image_box(filmed_icon_url, scene_icon_width, scene_icon_height) ;
    this.place_icon  = new image_box( place_icon_url, scene_icon_width, scene_icon_height) ;
    
    if(this.fields['video_title']==''){
      var initial = this.video.fields['channel'][0] ;
      this.fields['video_title'] = this.video.fields['title'] + ' (' + initial.toUpperCase() + this.video.fields['season'] + ')' ;
    }
    
    var date_string = (this.fields['date_string']==undefined) ? this.fields['date'] : this.fields['date_string'] ;
    this.video_text       = new text_box(this.fields['video_title' ], this.w-3*scene_padding-this.image_width) ;
    this.date_text        = new text_box(date_string                , this.w-3*scene_padding-this.image_width) ;
    this.filmed_text      = new text_box(this.fields['cameraperson'], this.w-3*scene_padding-this.image_width) ;
    this.place_text       = new text_box(this.fields['place'       ], this.w-3*scene_padding-this.image_width) ;
    this.description_text = new text_box(this.fields['description' ], this.w-2*scene_padding-this.image_width) ;

    var text_dy = 2 ;
    var w  = 0.6*(this.w - this.image_width - 4*scene_padding) ;
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

    this.filmed_icon.x = x3 ;
    this.filmed_text.x = x4 ;
    this.filmed_icon.y = y3 ;
    this.filmed_text.y = y4 ;

    this.date_icon.x   = x3 ;
    this.date_text.x   = x4 ;
    this.date_icon.y   = y1 ;
    this.date_text.y   = y2 ;

    this.place_icon.x  = x1 ;
    this.place_text.x  = x2 ;
    this.place_icon.y  = y3 ;
    this.place_text.y  = y4 ;

    this.description_text.x = scene_padding ;
    this.description_text.y = this.place_text.y+this.place_text.h + line_height ;

    this.h = scene_padding + (this.description_text.y-this.y) + this.description_text.h ;
    return this.h ;
  }
  this.draw_border = function(draw){
    context.strokeStyle = 'rgb(0,0,0)'
    if(this.selected) context.strokeStyle = selected_border_color ;
    context.lineWidth = 1 ;
    context.beginPath() ;
    var r = corner_radius ;
    var x1 = this.x+0.5 ;
    var x2 = this.x+this.w+0.5 ;
    var y1 = this.y+0.5 ;
    var y2 = this.y+this.h+0.5 ;
    
    rounded_box_path(x1, y1, x2, y2, r, context) ;
    if(draw) context.stroke() ;
  }
  this.draw = function(y_in,draw){
    var dy = 0 ;
    dy += (this.characters_in.length+0)*scene_spacing ;
    if(this.h<this.image_height+2*scene_padding) this.h = this.image_height+2*scene_padding ;
    
    if(y_in>=0){
      this.arrange_items() ;
      this.y = y_in ;
      this.y += dy ;
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
    context.font = font_size + 'px ' + font_family ;

    // Shadow
    context.lineWidth = 1 ;
    context.fillStyle = shadow_color ;
    if(draw){
      var x1 = this.x+shadow_size+0.5 ;
      var y1 = this.y+shadow_size+0.5 ;
      var x2 = x1 + this.w ;
      var y2 = y1 + this.h ;
      var r = corner_radius ;
      rounded_box_path(x1, y1, x2, y2, r, context) ;
      context.fill() ;
    }

    // Background box
    context.fillStyle = tape_tag_background_colors[this.fields['tape_tag']] ;
    if(draw){
      var x1 = this.x+0.5 ;
      var y1 = this.y+0.5 ;
      var x2 = x1 + this.w ;
      var y2 = y1 + this.h ;
      var r = corner_radius ;
      rounded_box_path(x1, y1, x2, y2, r, context) ;
      context.fill() ;
    }

    // Date
    var x = columns_by_name['chronology'].center ;
    y = this.y+dy ;
    context.fillStyle = 'rgb(255,255,255)' ;
    context.textAlign = 'center' ;
    if(draw && this.year>1950){
      context.fillText(this.fields['date'],x,y) ;
      context.fillText(this.video.fields['title'],x,y+line_height) ;
    }
    dy += line_height ;
    this.video.draw(y,draw) ;

    // Text style
    context.fillStyle = 'rgb(0,0,0)' ;
    context.textAlign = 'left' ;
    
    switch(draw){
      case 1:
        this.place_icon .draw(0,0,false) ;
        this.video_icon .draw(0,0,false) ;
        this.filmed_icon.draw(0,0,false) ;
        this.date_icon  .draw(0,0,false) ;
        
        this.place_text .draw(0,0) ;
        this.video_text .draw(0,0) ;
        this.filmed_text.draw(0,0) ;
        this.date_text  .draw(0,0) ;
        
        this.description_text.draw(0,0) ;
        this.youtube.draw(0,0,true) ;
        break ;
        
      case 2:
        this.place_icon .draw(0,0,false) ;
        this.video_icon .draw(0,0,false) ;
        
        this.place_text .draw(0,0) ;
        this.video_text .draw(0,0) ;
        
        this.description_text.draw(0,0) ;
        this.youtube.draw(0,0,true) ;
        break ;
    
      case 3:
        this.filmed_icon.x = this.video_icon.x ;
        this.filmed_icon.y = this.video_icon.y ;
        
        this.filmed_text.x = this.video_text.x ;
        this.filmed_text.y = this.video_text.y ;
      
        this.place_icon .draw(0,0,false) ;
        this.place_text .draw(0,0) ;
        
        this.filmed_icon.draw(0,0,false) ;
        this.filmed_text.draw(0,0) ;
        
        this.description_text.draw(0,0) ;
        this.youtube.draw(0,0,true) ;
        break ;
        
        //case 3:
        //  break ;
    }

    // Border
    this.draw_border(draw) ;
    
    if(false){
      for(var i=this.characters_in.length-1 ; i>=0 ; i--){
        var character = null ;
        for(var j=0 ; j<characters.length ; j++){
          if(characters[j].name==this.characters_in[i][0]) character = characters[j] ;
        }
        connect_two_scenes(this.characters_in[i][1], this, character, 2) ;
      }
    }
    
    return this.h + (this.characters_in.length+1)*scene_spacing ;
  }
  this.make_xml_element = function(){
    var element = xmlDoc.createElement('scene') ;
    xml_add_fields(this, element) ;
    xml_add_array(this.characters, element, 'character') ;
    xml_add_array(this.items     , element, 'item'     ) ;
    this.xml = element ;
    return element ;
  }
}

function connect_two_scenes(scene_out,scene_in,character,type){
  context.lineWidth   = character_line_width ;
  context.strokeStyle = character.color ;
  context.fillStyle   = character.color ;
  var position = (1+character.position)/(1+characters.length) ;
    
  var x1 = scene_out.x+position*scene_out.w + 0.5 ;
  var x2 = scene_in.x +position*scene_in.w  + 0.5 ;
  var y1 = scene_out.y+scene_out.h + 0.5 ;
  var y2 = scene_in.y + 0.5 ;
  
  var x0 = columns_by_name['location'].x + 0.5 ;
  var yA = y1+arrow_spacing + 0.5 ;
  var yB = y2-arrow_spacing + 0.5 ;
    
  // Arrow path
  // Now we have reserved some space for the vertical line
  // We need to find the values of yA and yB to make this work
  var yC = (type==1) ? yA : yB ;
  if(type==2){
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
  if(abs(x1-x2)<1e-3){
    context.beginPath() ;
    context.moveTo(x1,y1) ;
    context.lineTo(x2,y2) ;
    context.stroke() ;
    
    for(var i=0 ; i<label_clears.length ; i++){
      var y_lc = label_clears[i] ;
      if(y_lc>=y1 && y_lc<=y2){
        draw_vertical_label(context, x1, y_lc, character.color, character.font_color, character.name) ;
      }
    }
  }
  else{
    var r = corner_radius ;
    var dx = (x1<x2) ? r : -r ;
    context.beginPath() ;
    context.moveTo(x1,y1) ;
    context.lineTo(x1,yC-r) ;
    context.arcTo(x1,yC,x1+dx,yC,r) ;
    context.lineTo(x2-dx,yC) ;
    context.arcTo(x2,yC,x2,yC+r,r) ;
    context.lineTo(x2,y2) ;
    context.stroke() ;
    
    for(var i=0 ; i<label_clears.length ; i++){
      var y_lc = label_clears[i] ;
      var y_check = [ [y1,yC-r] , [yC+r,y2] ] ;
      var x_check = [ x1 , x2 ] ;
      for(var j=0 ; j<2 ; j++){
        if(y_lc>=y_check[j][0] && y_lc<=y_check[j][1]){
          draw_vertical_label(context, x_check[j], y_lc, character.color, character.font_color, character.name) ;
        }
      }
    }
  }

  horizontal_line_segments.push(new line_segment(x1,yC,x2,yC)) ;

  // Arrowhead
  context.beginPath() ;
  context.moveTo(x2,y2) ;
  context.lineTo(x2-arrowhead_size*arrowhead_fraction,y2-arrowhead_size) ;
  context.lineTo(x2+arrowhead_size*arrowhead_fraction,y2-arrowhead_size) ;
  context.moveTo(x2,y2) ;
  context.fill() ;
}

function get_scene_by_name(name){
  for(var i=0 ; i<scenes.length ; i++){
    if(scenes[i].fields['name']==name){
      return scenes[i] ;
    }
  }
  return -1 ;
}
function get_video_by_title(title){
  for(var i=0 ; i<videos.length ; i++){
    if(videos[i].fields['title']==title){
      return videos[i] ;
    }
  }
  return -1 ;
}

function set_scene_date_time(name,date,time){
  for(var i=0 ; i<scenes.length ; i++){
    if(scenes[i].name==name){
      scenes[i].fields['date' ] = date ;
      scenes[i].fields['time' ] = time ;
      scenes[i].year  = parseInt(scenes[i].fields['date'].split('/')[0],10) ;
      scenes[i].month = parseInt(scenes[i].fields['date'].split('/')[1],10) ;
      scenes[i].day   = parseInt(scenes[i].fields['date'].split('/')[2],10) ;
      scenes[i].hour  = parseInt(scenes[i].fields['time'].split(':')[0],10) ;
      return ;
    }
  }
}
