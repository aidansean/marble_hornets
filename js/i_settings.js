var canvas  = null ;
var context = null ;
var cw = 0 ;
var ch = 0 ;

var scale = 1.7 ;

var filtered_scenes = false ;

var margin_top    =  10*scale ;
var margin_bottom =  10*scale ;
var margin_left   =  10*scale ;
var margin_right  =  10*scale ;

var fade_out_width   = 200*scale ;
var fade_down_height = 200*scale ;

var column_spacing = 50*scale ;
var column_padding =  5*scale ;
var video_spacing  = 20*scale ;
var scene_spacing  = 12*scale ;

var scene_padding = 4*scale ;
var scene_width   = (250 + 2*scene_padding)*scale ;
var scene_height  = 200*scale ;

var youtube_image_width  =  120*scale ;
var youtube_image_height =   66*scale ;
var youtube_scale        = 1 ;
var scene_icon_width     =   30 ; //15*scale ;
var scene_icon_height    =   30 ; //15*scale ;
var filmed_icon_url = 'images/camera_icon.png'   ;
var place_icon_url  = 'images/location_icon.png' ;
var video_icon_url  = 'images/youtube_icon.png'  ;
var date_icon_url   = 'images/calendar_icon.png' ;

var n_images = 0 ;
var n_images_loaded = 0 ;

var font_size               = 12*scale ;
var column_font_size        = 20*scale ;
var epoch_title_font_size   = 30*scale ;
var epoch_font_size         = 14*scale ;
var event_title_font_size   = 14*scale ;
var event_font_size         = 12*scale ;
var date_font_size          = 12*scale ;
var font_family             = 'arial' ;
var text_margin_LR          = 5*scale ;
var text_margin_TB          = 5*scale ;
var tapetag_title_font_size = 8*scale ;

var line_height = font_size+1 ;
var columns_title_height = -1 ;
var total_width          = -1 ;

var shadow_size = 5*scale ;
var shadow_color = 'rgb(0,0,0)' ;

var selected_border_color = 'rgb(255,0,0)' ;
var event_color = 'rgb(0,0,100)' ;
var epoch_color = 'rgb(100,0,0)' ;
var epoch_fold_color = 'rgb(50,0,0)' ;

var location_abbreviations = ['C','R','E'] ;
var location_names = new Array() ;
location_names['C'] = 'CollegeTown' ;
location_names['R'] = 'Rosswood'    ;
location_names['E'] = 'Elsewhere'   ;

var tape_tag_background_colors = new Array() ;        // Tape tag numbers:
tape_tag_background_colors[0]  = 'rgb(255,255,255)' ; // 0: Other/unknown
tape_tag_background_colors[1]  = 'rgb(200,200,200)' ; // 1: Tapes given to Jay from Alex in 2006
tape_tag_background_colors[2]  = 'rgb(200,255,200)' ; // 2: Tapes from Jay rediscovered by Jay in 2010
tape_tag_background_colors[3]  = 'rgb(200,200,255)' ; // 3: Harddrive from Alex stolen by Jay in 2010
tape_tag_background_colors[4]  = 'rgb(255,255,200)' ; // 4: Tapes given to Jay from Tim in 2012
tape_tag_background_colors[5]  = 'rgb(255,200,255)' ; // 5: Tapes found by Jay and Tim in 2013
tape_tag_background_colors[6]  = 'rgb(200,255,255)' ; // 6: Footage filmed by Jay in real time
tape_tag_background_colors[7]  = 'rgb(150,255,225)' ; // 7: Footage filmed by Tim in real time
tape_tag_background_colors[8]  = 'rgb(255,200,150)' ; // 8: Footage taken from Jay's laptop
tape_tag_background_colors[10] = 'rgb(255,225,225)' ; // 10: totheark footage
tape_tag_background_colors[11] = 'rgb(225,225,255)' ; // 11: hoody footage
tape_tag_background_colors[12] = 'rgb(225,225,225)' ; // 12: hoody tape (stolen from Alex)

var tape_tag_descriptions = new Array() ;        // Tape tag numbers:
tape_tag_descriptions[0]   = 'Other footage'         ; // 0: Other/unknown
tape_tag_descriptions[1]   = 'Alex\'s tapes'         ; // 1: Tapes given to Jay from Alex in 2006
tape_tag_descriptions[2]   = 'Jay\'s safe tapes'     ; // 2: Tapes from Jay rediscovered by Jay in 2010
tape_tag_descriptions[3]   = 'Hard drive footage'    ; // 3: Harddrive from Alex stolen by Jay in 2010
tape_tag_descriptions[4]   = 'Tim\'s tapes'          ; // 4: Tapes given to Jay from Tim in 2012
tape_tag_descriptions[5]   = 'Burned tapes'          ; // 5: Tapes found by Jay and Tim in 2013
tape_tag_descriptions[6]   = 'Jay\'s footage'        ; // 6: Footage filmed by Jay in real time
tape_tag_descriptions[7]   = 'Tim\'s footage'        ; // 7: Footage filmed by Tim in real time
tape_tag_descriptions[8]   = 'Jay\'s laptop footage' ; // 8: Footage taken from Jay's laptop
tape_tag_descriptions[10]  = 'totheark footage'      ; // 10: totheark footage
tape_tag_descriptions[11]  = 'Hoody\'s footage'      ; // 11: hoody footage
tape_tag_descriptions[12]  = 'Brian\'s tape'         ; // 12: hoody tape (stolen from Alex)

// Extra bits to make the poster more informative
tape_tag_descriptions[101] = 'Entry #22 tape' ;
tape_tag_descriptions[102] = 'Entry #51 tape' ;
tape_tag_descriptions[103] = 'Entry #26 tape' ;

var override_tapetag_colors = false ;
var found_footage_event_color = '#444444' ;

var character_line_width = 3*scale ;
var character_font_size = 10*scale ;
var arrowhead_size = 10*scale ;
var arrow_spacing  = 1.05*arrowhead_size ;
var arrowhead_fraction = 1.0/Math.sqrt(3) ; // Ratio of arrowhead width to height
var arrow_fade = 2*arrow_spacing ;
var arrowhead_type = 'circle' ; //'triangle' ;

var draw_shadows = false ;
var textbox_corner_radius = 4*scale ;
var border_width = 1 ;
// Every now and then, display the labels to make it easier to keep track
// This is such a LaTeX way to think - clear your floats!
var last_label_clear    = 0 ;
var last_label_interval =  4000*scale ;
var label_clears        = [] ;

var corner_radius =  8*scale ;
var ribbon_size_x = 40*scale ;
var ribbon_size_y = 10*scale ;
var image_corner_radius = corner_radius - scene_padding ;

var vertical_line_segments   = new Array() ;
var horizontal_line_segments = new Array() ;

var channel_names = ['marblehornets','totheark'] ;
var channel_abbreviations = new Array() ;
channel_abbreviations['marblehornets'] = 'M' ;
channel_abbreviations['totheark'     ] = 'T' ;

var character_names = new Array() ;
character_names.push('Alex'    ) ;
character_names.push('Jay'     ) ;
character_names.push('operator') ;
character_names.push('Brian'   ) ;
character_names.push('Tim'     ) ;
character_names.push('Amy'     ) ;
character_names.push('Sarah'   ) ;
character_names.push('Jessica' ) ;
character_names.push('masky'   ) ;
character_names.push('hoody'   ) ;
