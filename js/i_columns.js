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
    var x1 = this.x+0.5 ;
    var y1 = this.y+0.5 ;
    var x2 = x1 + this.width  ;
    var y2 = y1 + this.height ;
    var r = corner_radius ;
    rounded_box_path(x1, y1, x2, y2, r, context) ;
    context.fill() ;
    
    context.fillStyle = this.color ;
    context.textAlign = 'center' ;
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

var chronology_column = new column_object('chronology', 'Date'      , 'd', 100, '#000000', '#ffffff') ;
var spacer_column_1   = new column_object('spacer_1'  , ''          , '1', 110, '#ffffff', '#ffffff') ;
var spacer_column_2   = new column_object('spacer_2'  , ''          , '2', 150, '#ffffff', '#ffffff') ;
var character_column  = new column_object('character' , 'Characters', 'c',   0, '#000000', '#ffffff') ;
var location_column   = new column_object('location'  , 'Locations' , 'l',   0, '#000000', '#ffffff') ;
var entry83_column    = new column_object('entry83'   , 'Entry #83' , '8',   0, '#000000', '#ffffff') ;

columns_by_name['chronology'] = chronology_column ;
columns_by_name['character' ] =  character_column ;
columns_by_name['location'  ] =   location_column ;
columns_by_name['entry83'   ] =    entry83_column ;

var location_columns = new Array() ;
location_columns.push( new column_object('location_C' , 'CollegeTown'    , 'C' , 400, '#bbbbbb', '#000000')) ;
location_columns.push( new column_object('location_R' , 'Rosswood'       , 'R' , 400, '#dddddd', '#000000')) ;
location_columns.push( new column_object('location_E' , 'Elsewhere'      , 'E' , 400, '#bbbbbb', '#000000')) ;

// Character columns
var character_columns = new Array() ;
character_columns.push(new column_object('character_U', 'Other/unknown'  , 'U' , 350, '#dddddd', '#000000')) ;
character_columns.push(new column_object('character_A', 'Alex'           , 'A' , 350, '#bbbbbb', '#000000')) ;
character_columns.push(new column_object('character_J', 'Jay'            , 'J' , 350, '#dddddd', '#000000')) ;
character_columns.push(new column_object('character_T', 'Tim/Masky'      , 'T' , 350, '#bbbbbb', '#000000')) ;
character_columns.push(new column_object('character_H', 'Hoody'          , 'H' , 350, '#dddddd', '#000000')) ;

// Entry #83 columns
var entry83_columns = new Array() ;
entry83_columns.push(  new column_object('entry83_B'  , 'Benedict Campus', 'B8', 250, '#bbbbbb', '#000000')) ;
entry83_columns.push(  new column_object('entry83_R'  , 'Rosswood'       , 'R8', 250, '#dddddd', '#000000')) ;
entry83_columns.push(  new column_object('entry83_H'  , 'The Hospital'   , 'H8', 250, '#bbbbbb', '#000000')) ;
entry83_columns.push(  new column_object('entry83_T'  , 'Tim\'s house'   , 'T8', 250, '#dddddd', '#000000')) ;
entry83_columns.push(  new column_object('entry83_E'  , 'Elsewhere'      , 'E8', 250, '#bbbbbb', '#000000')) ;

for(var i=0 ; i<location_columns.length  ; i++){  location_column.add_subcolumn( location_columns[i]) ; }
for(var i=0 ; i<character_columns.length ; i++){ character_column.add_subcolumn(character_columns[i]) ; }
for(var i=0 ; i<entry83_columns.length   ; i++){   entry83_column.add_subcolumn(  entry83_columns[i]) ; }

all_columns.push(chronology_column) ;
all_columns.push(spacer_column_1  ) ;
all_columns.push(spacer_column_2  ) ;
all_columns.push(character_column ) ;
all_columns.push(location_column  ) ;
all_columns.push(entry83_column   ) ;




// Broody columns example
var broody_persona_column = new column_object('character' , 'Persona', 'b',   0, '#000000', '#ffffff') ;
columns_by_name['broody'] = broody_persona_column ;
  
// Broody columns
var broody_columns = new Array() ;
broody_columns.push(new column_object('broody_Br', 'Brian'  , 'Br' , 350, '#dddddd', '#000000')) ;
broody_columns.push(new column_object('Broody_Ho', 'Hoody'  , 'Ho' , 350, '#bbbbbb', '#000000')) ;
  
for(var i=0 ; i<broody_columns.length   ; i++){ broody_persona_column.add_subcolumn( broody_columns[i]) ; }
all_columns.push(broody_persona_column) ;