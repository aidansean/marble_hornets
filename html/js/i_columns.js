var columns = new Array() ;
function column_object(name,title,abbreviation,width,background_color,color){
  this.name  = name ;
  this.title = title ;
  this.abbreviation = abbreviation ;
  this.width = width ;
  this.background_color = background_color  ;
  this.color = color  ;
  this.x     = -1 ;
  this.y     = margin_top ;
  this.center = -1 ;
  this.title_parts = this.title.split('//') ;
  if(this.title_parts.length*line_height>columns_title_height) columns_title_height = this.title_parts.length*line_height ;
  this.sub_columns = new Array() ;
  this.parent_column = 0 ;
  this.draw = function(){
    context.fillStyle = this.background_color ;
    context.strokeStyle = background_fill_color ;
    var x1 = this.x ;
    var y1 = this.y ;
    var x2 = x1 + this.width  ;
    var y2 = y1 + this.height ;
    var r = corner_radius ;
    rounded_box_path(x1, y1, x2, y2, r, context) ;
    context.fill() ;
    context.stroke() ;
  }
  this.draw_title = function(){
    context.fillStyle = this.color ;
    context.textAlign = 'center' ;
    context.textBaseline = 'bottom' ;
    context.font = column_font_size + 'px ' + font_family ;
    for(var i=0 ; i<this.title_parts.length ; i++){
      var part = (i==this.title_parts.length-1) ? this.title_parts[i] : this.title_parts[i]+'/' ;
      context.fillText(part,this.x+0.5*this.width,this.y+(i+2)*line_height) ;
    }
  }
  this.add_subcolumn = function(sub){
    this.sub_columns.push(sub) ;
    sub.parent_column = this ;
    this.width += sub.width ;
  }
  this.assign_positions = function(x){
    this.x = x ;
    this.center = this.x + 0.5*this.width ;
    this.height = ch - margin_top - margin_bottom - 50 ;
    for(var i=0 ; i<this.sub_columns.length ; i++){
      x = this.sub_columns[i].assign_positions(x) ;
      this.sub_columns[i].y = this.y + 2*column_font_size ;
      this.sub_columns[i].height = ch - margin_bottom - this.y - 90 ;
    }
    x += this.width ;
    return x ;
  }
  this.seek_column = function(abbreviation){
    if(this.abbreviation == abbreviation) return this ;
    for(var i=0 ; i<this.sub_columns.length ; i++){
      result = this.sub_columns[i].seek_column(abbreviation) ;
      if(result!=0) return result ;
    }
    return 0 ;
  }
  this.set_height = function(h){
     this.height = h - this.y ;
     for(var i=0 ; i<this.sub_columns.length ; i++){
       this.sub_columns[i].set_height(h-margin_bottom) ;
     }
  }
}

// Main columns
var all_columns = new Array() ;
var columns_by_name = new Array() ;
var column_names = ['chronology', 'location','character'] ;

var chronology_column = new column_object('chronology', 'Date'      , 'd', 100*scale, '#000000', '#ffffff') ;
var spacer_column_1   = new column_object('spacer_1'  , ''          , '1', 110*scale, background_fill_color, '#ffffff') ;
var spacer_column_2   = new column_object('spacer_2'  , ''          , '2', 150*scale, '#ffffff', '#ffffff') ;
var character_column  = new column_object('character' , 'Characters', 'c',   0, '#000000', '#ffffff') ;
var location_column   = new column_object('location'  , 'Locations' , 'l',   0, '#000000', '#ffffff') ;
var entry83_column    = new column_object('entry83'   , 'Entry #83' , '8',   0, '#000000', '#ffffff') ;

var poster_column     = new column_object('poster'    , 'Locations' , 'p',   0, '#000000', '#ffffff') ;

columns_by_name['chronology'] = chronology_column ;
columns_by_name['character' ] =  character_column ;
columns_by_name['location'  ] =   location_column ;
columns_by_name['entry83'   ] =    entry83_column ;
columns_by_name['poster'    ] =     poster_column ;

var  dark_column = '#bbbbbb' ;
var light_column = '#dddddd' ;

var location_columns = new Array() ;
location_columns.push( new column_object('location_C' , 'CollegeTown'    , 'C' , 400*scale,  dark_column, '#000000')) ;
location_columns.push( new column_object('location_R' , 'Rosswood'       , 'R' , 400*scale, light_column, '#000000')) ;
location_columns.push( new column_object('location_E' , 'Elsewhere'      , 'E' , 400*scale,  dark_column, '#000000')) ;

var poster_columns = new Array() ;
var poster_columnC_color = '#322222' ;
var poster_columnH_color = 'rgb(27,37,27)' ;
var poster_columnS_color = 'rgb(33,33,33)' ;
var poster_columnE_color = 'rgb(31,44,55)' ;
var poster_columnP_color = 'rgb(29,49,52)' ;
var poster_columnT_color = 'rgb(23,33,49)' ;
var poster_columnB_color = 'rgb(32,32,57)' ;
poster_columns.push( new column_object('poster_C' , 'CollegeTown'         , 'PC' , 400*scale, poster_columnC_color, '#000000')) ;
poster_columns.push( new column_object('poster_H' , 'Hospital'            , 'PH' , 400*scale, poster_columnH_color, '#000000')) ;
poster_columns.push( new column_object('poster_S' , 'Slenderverse'        , 'PS' , 400*scale, poster_columnS_color, '#000000')) ;
poster_columns.push( new column_object('poster_E' , 'Elsewhere'           , 'PE' , 400*scale, poster_columnE_color, '#000000')) ;
poster_columns.push( new column_object('poster_P' , 'Rosswood Park'       , 'PP' , 400*scale, poster_columnP_color, '#000000')) ;
poster_columns.push( new column_object('poster_T' , 'Rosswood Town'       , 'PT' , 400*scale, poster_columnT_color, '#000000')) ;
poster_columns.push( new column_object('poster_B' , 'Benedict Campus'     , 'PB' , 400*scale, poster_columnB_color, '#000000')) ;

// Character columns
var character_columns = new Array() ;
character_columns.push(new column_object('character_U', 'Other/unknown'  , 'U' , 350*scale, light_column, '#000000')) ;
character_columns.push(new column_object('character_A', 'Alex'           , 'A' , 350*scale,  dark_column, '#000000')) ;
character_columns.push(new column_object('character_J', 'Jay'            , 'J' , 350*scale, light_column, '#000000')) ;
character_columns.push(new column_object('character_T', 'Tim/Masky'      , 'T' , 350*scale,  dark_column, '#000000')) ;
character_columns.push(new column_object('character_H', 'Hoody'          , 'H' , 350*scale, light_column, '#000000')) ;

// Entry #83 columns
var entry83_columns = new Array() ;
entry83_columns.push(  new column_object('entry83_B'  , 'Benedict Campus', 'B8', 250*scale,  dark_column, '#000000')) ;
entry83_columns.push(  new column_object('entry83_R'  , 'Rosswood'       , 'R8', 250*scale, light_column, '#000000')) ;
entry83_columns.push(  new column_object('entry83_H'  , 'The Hospital'   , 'H8', 250*scale,  dark_column, '#000000')) ;
entry83_columns.push(  new column_object('entry83_T'  , 'Tim\'s house'   , 'T8', 250*scale, light_column, '#000000')) ;
entry83_columns.push(  new column_object('entry83_E'  , 'Elsewhere'      , 'E8', 250*scale,  dark_column, '#000000')) ;

for(var i=0 ; i< location_columns.length ; i++){  location_column.add_subcolumn( location_columns[i]) ; }
for(var i=0 ; i<character_columns.length ; i++){ character_column.add_subcolumn(character_columns[i]) ; }
for(var i=0 ; i<  entry83_columns.length ; i++){   entry83_column.add_subcolumn(  entry83_columns[i]) ; }

var poster_colors = ['rgb(23,33,59)', 'rgb(37,37,57)', 'rgb(34,51,57)', 'rgb(31,44,55)', 'rgb(29,49,52)', 'rgb(23,33,59)', 'rgb(32,32,57)'] ;
// Special option for the poster to remove dead space
if(selected_epoch_string){
  var poster_labels = [] ;
  if(selected_epoch_string=='2006'   ){ poster_labels = ['PC','PH','PS','PE','PT'] ; }
  if(selected_epoch_string=='season1'){ poster_labels = ['PC','PS','PE','PT'] ; }
  if(selected_epoch_string=='7months'){ poster_labels = ['PE','PP','PT'] ; }
  if(selected_epoch_string=='season2'){ poster_labels = ['PE','PP','PT'] ; }
  if(selected_epoch_string=='season3'){ poster_labels = ['PC','PH','PS','PE','PP','PT','PB'] ; }
  if(selected_epoch_string=='S1'     ){ poster_labels = ['PC','PH','PS','PE','PT'] ; }
  if(selected_epoch_string=='S2'     ){ poster_labels = ['PE','PP','PT'] ; }
  if(selected_epoch_string=='S3'     ){ poster_labels = ['PC','PH','PS','PE','PP','PT','PB'] ; }
  if(selected_epoch_string=='S3a'    ){ poster_labels = ['PC','PH','PS','PE','PP','PT'] ; }
  if(selected_epoch_string=='S3b'    ){ poster_labels = ['PC','PH','PS','PE','PP','PT','PB'] ; }
  for(var i=0 ; i<poster_labels.length ; i++){
    for(var j=0 ; j<poster_columns.length ; j++){
      if(poster_columns[j].abbreviation==poster_labels[i]){
        //poster_columns[j].background_color = (poster_column.sub_columns.length%2==0) ? light_column : dark_column ;
        //poster_columns[j].background_color = poster_colors[poster_column.sub_columns.length] ;
        poster_columns[j].color = '#ffffff' ;
        poster_column.add_subcolumn(poster_columns[j]) ;
      }
    }
  }
}

all_columns.push(chronology_column) ;
all_columns.push(spacer_column_1  ) ;
all_columns.push(spacer_column_2  ) ;
all_columns.push(character_column ) ;
all_columns.push(location_column  ) ;
all_columns.push(entry83_column   ) ;
all_columns.push(poster_column    ) ;

// Broody columns example
var broody_persona_column = new column_object('character' , 'Persona', 'b',   0, '#000000', '#ffffff') ;
columns_by_name['broody'] = broody_persona_column ;
  
// Broody columns
var broody_columns = new Array() ;
broody_columns.push(new column_object('broody_Br', 'Brian'  , 'Br' , 350, light_column, '#000000')) ;
broody_columns.push(new column_object('Broody_Ho', 'Hoody'  , 'Ho' , 350,  dark_column, '#000000')) ;
  
for(var i=0 ; i<broody_columns.length   ; i++){ broody_persona_column.add_subcolumn( broody_columns[i]) ; }
all_columns.push(broody_persona_column) ;