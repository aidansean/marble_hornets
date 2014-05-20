var canvas  = null ;
var context = null ;
var cw = 0 ;
var ch = 0 ;

var filtered_scenes = false ;

var margin_top    =  10 ;
var margin_bottom =  10 ;
var margin_left   =  10 ;
var margin_right  =  10 ;

var fade_out_width   = 200 ;
var fade_down_height = 200 ;

var column_spacing = 50 ;
var column_padding =  5 ;
var video_spacing  = 20 ;
var scene_spacing  = 14 ;

var scene_padding = 6 ;
var scene_width   = 250 + 2*scene_padding ;
var scene_height  = 200 ;

var youtube_image_width  =  120 ;
var youtube_image_height =   90 ;
var youtube_scale        = 0.75 ;
var scene_icon_width     =   15 ;
var scene_icon_height    =   15 ;
var filmed_icon_url = 'images/camera.gif'   ;
var place_icon_url  = 'images/pin.gif'      ;
var video_icon_url  = 'images/youtube.jpg'  ;
var date_icon_url   = 'images/calendar.gif' ;

var n_images = 0 ;
var n_images_loaded = 0 ;

var font_size             = 12 ;
var column_font_size      = 20 ;
var epoch_title_font_size = 30 ;
var epoch_font_size       = 14 ;
var event_title_font_size = 14 ;
var event_font_size       = 12 ;
var font_family           = 'arial' ;
var text_margin_LR        = 5 ;
var text_margin_TB        = 2 ;

var line_height = font_size+1 ;
var columns_title_height = -1 ;
var total_width          = -1 ;

var shadow_size = 5 ;
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

var character_line_width = 3 ;
var character_font_size = 10 ;
var arrowhead_size = 12 ;
var arrow_spacing  = 1.05*arrowhead_size ;
var arrowhead_fraction = 1.0/Math.sqrt(3) ; // Ratio of arrowhead width to height
var arrow_fade = 2*arrow_spacing ;
var textbox_corner_radius = 4 ;

// Every now and then, display the labels to make it easier to keep track
// This is such a LaTeX way to think - clear your floats!
var last_label_clear    = 0 ;
var last_label_interval = 4000 ;
var label_clears        = [] ;

var corner_radius =  8 ;
var ribbon_size_x = 40 ;
var ribbon_size_y = 10 ;

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
