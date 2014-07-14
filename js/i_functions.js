function update_entry_metadata(id, published, nViews, nLikes, nDislikes, nFaves, nRatings, rating){
  for(var i=0 ; i<entries.length ; i++){
    if(entries[i].youtube_id!=id) continue ;
    entries[i].published = published ;
    entries[i].nViews    = nViews    ;
    entries[i].nLikes    = nLikes    ;
    entries[i].nDislikes = nDislikes ;
    entries[i].nFaves    = nFaves    ;
    entries[i].nRatings  = nRatings  ;
    entries[i].rating    = rating    ;

    entries[i].year  = parseInt(published.split('-')[0]) ;
    entries[i].month = parseInt(published.split('-')[1]) ;
    entries[i].day   = parseInt(published.split('-')[2]) ;
  }
}
function days_diff(entry_A,entry_B){
  var days = 0 ;
  days += 365*(entry_A.year-entry_B.year) ;
  var m_days_A = 0 ;
  switch(entry_A.month){
    case 1 : m_days_A =  31 ; break ;
    case 2 : m_days_A =  59 ; break ;
    case 3 : m_days_A =  90 ; break ;
    case 4 : m_days_A = 120 ; break ;
    case 5 : m_days_A = 151 ; break ;
    case 6 : m_days_A = 181 ; break ;
    case 7 : m_days_A = 212 ; break ;
    case 8 : m_days_A = 243 ; break ;
    case 9 : m_days_A = 273 ; break ;
    case 10: m_days_A = 304 ; break ;
    case 11: m_days_A = 334 ; break ;
    case 12: m_days_A = 365 ; break ;
  }
  var m_days_B = 0 ;
  switch(entry_B.month){
    case 1 : m_days_B =  31 ; break ;
    case 2 : m_days_B =  59 ; break ;
    case 3 : m_days_B =  90 ; break ;
    case 4 : m_days_B = 120 ; break ;
    case 5 : m_days_B = 151 ; break ;
    case 6 : m_days_B = 181 ; break ;
    case 7 : m_days_B = 212 ; break ;
    case 8 : m_days_B = 243 ; break ;
    case 9 : m_days_B = 273 ; break ;
    case 10: m_days_B = 304 ; break ;
    case 11: m_days_B = 334 ; break ;
    case 12: m_days_B = 365 ; break ;
  }
  if(entry_A.year%4==0 && entry_A.year%400!=0 && entry_A.month>2) m_days_A++ ;
  if(entry_B.year%4==0 && entry_B.year%400!=0 && entry_B.month>2) m_days_B++ ;
  days += (m_days_A-m_days_B) ;
  days += (entry_A.day-entry_B.day) ;
  return days ;
}

function wrapText(text,x,y_in,maxWidth,lineHeight,draw){
  // Taken from www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/
  if(text==undefined) return 0 ;
  var words = text.split(' ') ;
  var line = '' ;
  var w = 0 ;
  var h = 0 ;
  var y = 0 ;

  for(var n=0 ; n<words.length ; n++){
    var testLine = line + words[n] + ' ' ;
    var testWidth = context.measureText(testLine).width ;
    if(testWidth>maxWidth){
      y = y_in+h ;
      if(draw) context.fillText(line, x, y) ;
      line = words[n] + ' ' ;
      h += lineHeight ;
    }
    else{
      line = testLine ;
      if(testWidth>w) w = testWidth ;
    }
  }
  y = y_in+h ;
  context.textBaseline = 'top' ;
  if(draw) context.fillText(line, x, y) ;
  h += lineHeight ;
  if(draw==-1) return w ;
  return h ;
}

var filter_items = [] ;
var filter_items_from_URL = getParameterByName('items') ;
if(filter_items_from_URL) filter_items = filter_items_from_URL.split(',') ;

var filter_categories = [] ;
var filter_categories_from_URL = getParameterByName('categories') ;
if(filter_categories_from_URL) filter_categories = filter_categories_from_URL.split(',') ;

var selected_epoch_string = getParameterByName('epoch') ;
lower_date = '1900/01/01' ;
upper_date = '3000/01/01' ;
if(selected_epoch_string=='2006'   ){ lower_date = '1900/01/01' ;  upper_date = '2009/04/30' ; }
if(selected_epoch_string=='season1'){ lower_date = '2009/06/17' ;  upper_date = '2010/04/19' ; }
if(selected_epoch_string=='7months'){ lower_date = '2010/04/19' ;  upper_date = '2010/11/22' ; }
if(selected_epoch_string=='season2'){ lower_date = '2010/11/23' ;  upper_date = '2012/02/28' ; }
if(selected_epoch_string=='season3'){ lower_date = '2012/02/28' ;  upper_date = '3001/01/01' ; }

if(selected_epoch_string=='S1' ){ lower_date = '1900/01/01' ;  upper_date = '2010/04/19' ; }
if(selected_epoch_string=='S2' ){ lower_date = '2010/04/19' ;  upper_date = '2012/02/28' ; }
if(selected_epoch_string=='S3' ){ lower_date = '2012/02/28' ;  upper_date = '3001/01/01' ; }
if(selected_epoch_string=='S3a'){ lower_date = '2012/02/28' ;  upper_date = '2013/02/29' ; }
if(selected_epoch_string=='S3b'){ lower_date = '2013/02/29' ;  upper_date = '3001/01/01' ; }

function start(){
  if(type=='items'){
    last_label_clear    *= 0.5 ;
    last_label_interval *= 0.5 ;
  }
  things     = (type=='items') ? items       : characters ;
  the_scenes = (type=='items') ? item_scenes : scenes     ;
  
  // Load data from xml
  load_scenes_from_xml() ;
  process_characters() ;
  process_items() ;
  if(type=='items') update_item_info() ;

  // Select columns
  columns.push(chronology_column) ;
  columns.push(spacer_column_1  ) ;
  columns.push(main_column      ) ;

  var x = margin_left ;
  for(var i=0 ; i<columns.length ; i++){ x = columns[i].assign_positions(x) ; }
  total_width = columns[columns.length-1].x + columns[columns.length-1].width + fade_out_width ;
  cw = total_width ;
  
  canvas = document.createElement('canvas') ;
  canvas.id = 'timeline' ;
  canvas.width  = total_width ;
  Get('canvas_wrapper').appendChild(canvas) ;
  
  context = canvas.getContext("2d") ;
  context.font = font_size + ' ' + font_family
  context.textBaseline = 'top' ;
  context.translate(0.5,0.5) ;

  draw(draw_option) ;
  
  var timeline_xml = xmlDoc.createElement('timeline') ;
  for(var i=0 ; i<scenes.length ; i++){
    var s = scenes[i] ;
    if(s.type!='epoch') continue ;
    s.make_xml_element() ;
    timeline_xml.appendChild(s.xml) ;
  }
  for(var i=0 ; i<videos.length ; i++){
    var v = videos[i] ;
    v.make_xml_element() ;
    timeline_xml.appendChild(v.xml) ;
  }
  for(var i=0 ; i<scenes.length ; i++){
    var s = scenes[i] ;
    if(s.type!='event') continue ;
    s.make_xml_element() ;
    timeline_xml.appendChild(s.xml) ;
  }
  Get('textarea_xml').value = print_xml(timeline_xml) ;
  canvas.addEventListener('mousedown',click) ;
}

function XY_from_mouse(evt){
  var X = evt.pageX - evt.target.offsetLeft ;
  var Y = evt.pageY - evt.target.offsetTop  ;
  return [X,Y] ;
}
function click(evt){
  var rightclick ;
  if(!evt) var evt = window.event ;
  if(evt.which) rightclick = (evt.which==3) ;
  else if(evt.button) rightclick = (evt.button==2) ;

  var XY = XY_from_mouse(evt) ;
  var X = XY[0] ;
  var Y = XY[1] ;
  
  var success = false ;
  for(var i=0 ; i<scenes.length ; i++){
    var s = scenes[i] ;
    if(X>=s.x && X<=s.x+s.w && Y>=s.y && Y<=s.y+s.h){
      s.selected = !s.selected ;
      s.draw_border(true) ;
      success = true ;
      break ;
    }
  }
  var string = [] ;
  string.push('<timeline>') ;
  for(var i=0 ; i<scenes.length ; i++){
    var s = scenes[i] ;
    if(s.selected){
      if(s.type=='scene'){
        string.push( print_xml(s.video.xml) ) ;
      }
      else{
        string.push( print_xml(s.xml) ) ;
      }
    }
  }
  string.push('</timeline>') ;
  string = string.join('\n') ;
  Get('textarea_selected_xml').value = string ;
}

function getParameterByName(name){
  // Taken from http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
  var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search) ;
  return match && decodeURIComponent(match[1].replace(/\+/g, ' ')) ;
}
function Get(id){ return document.getElementById(id) ; }
