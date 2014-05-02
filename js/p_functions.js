// Main settings
var delay    =  750 ;
var autoplay = true ;
var autoskip = true ;
var paused   = true ;
var show_spoilers = false ;
var do_film_strip = false ;

var nCol = 6 ;
var set_focus_on_change_video = true  ;
var play_on_change_video      = true  ;

var main_player = null ;
var scenes = [] ;
var scene_player_first = true ;

// Playlist settings
var entries = [] ;
var base_playlist = 'release' ;

var filter_items = [] ;
var filter_items_from_URL = getParameterByName('items') ;
if(filter_items_from_URL) filter_items = filter_items_from_URL.split(';') ;

function get_entry_by_name(name){
  for(var i=0 ; i<entries.length ; i++){
    if(entries[i].name==name) return i ;
  }
  return -1 ;
}

// Playlists
var current_playlist = 0 ;
var release_order_playlist = new Array() ;
var chronological_order_playlist = new Array() ;

var current_playlist = release_order_playlist ;
var current_entry    = null ;
var heartbeat_entry  = -1 ;
var heartbeat_frame  =  3 ;

var base_playlist       = 'release'      ;
var playlist_direction  = 'forwards'     ;
var playlist_channel    = 'all_channels' ;
var playlist_characters = ['A','Am','B','Br','H','J','Je','M','O','Sa','Se','T','To','U','X'] ;
var playlist_filter_characters = false ;
var playlist_filter_operator   = false ;
var playlist_suspected_operator_presence = true ;
var playlist_suspected_operator_sighting = true ;
var playlist_confirmed_operator_presence = true ;
var playlist_confirmed_operator_sighting = true ;

function parse_playlist_variables(){
  base_playlist      = Get('base_playlist'     ).value ;
  playlist_channel   = Get('playlist_channel'  ).value ;
  playlist_direction = Get('playlist_direction').value ;

  playlist_characters = [] ;
  var inputs = document.getElementsByTagName('input') ;
  for(var i=0 ; i<inputs.length ; i++){
    var input = inputs[i] ;
    if(input.name.search('character_')!=-1){
      if(input.checked==false) continue ;
      var character = input.name.split('_')[1] ;
      playlist_characters.push(character) ;
    }
  }

  playlist_filter_characters = Get('playlist_filter_characters').checked ;
}
function reset_playlist(){
  current_playlist = release_order_playlist ;
  playlist_direction  = 'forwards'      ;
  playlist_channel    = 'all_channels'  ;
  base_playlist       = 'release_order' ;
  playlist_characters = ['A','Am','B','Br','H','J','Je','M','O','Sa','Se','T','To','U','X'] ;
  playlist_filter_characters = false ;
  playlist_filter_operator   = false ;

  playlist_suspected_operator_presence = true ;
  playlist_suspected_operator_sighting = true ;
  playlist_confirmed_operator_presence = true ;
  playlist_confirmed_operator_sighting = true ;
  create_playlist() ;
}
function create_playlist(){
  parse_playlist_variables() ;
  if(playlist_direction!='forwards' && playlist_direction!='backwards') playlist_direction = 'forwards' ;
  var source_playlist = release_order_playlist ;
  if(base_playlist=='chronological') source_playlist = chronological_order_playlist ;

  var new_playlist = [] ;
  for(var index=0 ; index<source_playlist.length ; index++){
    // Direction selection
    var i = index ;
    if(playlist_direction=='backwards') i = source_playlist.length - (index+1) ;
    var entry = entries[source_playlist[i]] ;

    // Channel selection
    if(playlist_channel!='all_channels'){
      if(playlist_channel!=entry.channel) continue ;
    }

    // Character selection
    var accept_characters = false ;
    if(playlist_filter_characters==false){
      accept_characters = true ;
    }
    else{
      for(var j=0 ; j<playlist_characters.length ; j++){
        for(var k=0 ; k<entry.characters.length ; k++){
          if(playlist_characters[j]==entry.characters[k]){
            accept_characters = true ;
            break ;
          }
          if(accept_characters) break ;
        }
      }
    }
    if(accept_characters==false) continue ;

    new_playlist.push(source_playlist[i]) ;
  }
  current_playlist = new_playlist ;
  current_entry = (current_playlist.length==0) ? 0 : current_playlist[0] ;
  change_video() ;
  update_runtime() ;
  update_n_videos() ;
  return new_playlist ;
}

function update_runtime(){
  var seconds = 0 ;
  var minutes = 0 ;
  for(var i=0 ; i<current_playlist.length ; i++){
    seconds += entries[current_playlist[i]].seconds ;
    minutes += entries[current_playlist[i]].minutes ;
  }
  minutes += Math.floor(seconds/60) ;
  seconds = seconds%60 ;
  var hours = 0 ;
  if(minutes>60){
    hours = Math.floor(minutes/60) ;
    minutes = minutes%60 ;
  }
  minutes = (minutes<10) ? '0'+minutes : minutes ;
  seconds = (seconds<10) ? '0'+seconds : seconds ;
  Get('total_runtime').innerHTML = hours + ':' + minutes + ':' + seconds ;
}
function update_n_videos(){ Get('nVideos_playlist').innerHTML = current_playlist.length ; }

function get_all_names(names){
  var string = '' ;
  for(var i=0 ; i<names.length ; i++){
    if(i==0){
      string = string +        get_name(names[i]) ;
    }
    else{
      string = string + ', ' + get_name(names[i]) ;
    }
  }
  return string ;
}
function get_name(letters){
  if(letters=='A' ) return 'Alex'         ;
  if(letters=='Am') return 'Amy'          ;
  if(letters=='B' ) return 'Brian'        ;
  if(letters=='Br') return 'Bruce'        ;
  if(letters=='H' ) return 'Hoody'        ;
  if(letters=='J' ) return 'Jay'          ;
  if(letters=='Je') return 'Jessica'      ;
  if(letters=='M' ) return 'Masky'        ;
  if(letters=='O' ) return 'The Operator' ;
  if(letters=='Sa') return 'Sarah'        ;
  if(letters=='Se') return 'Seth'         ;
  if(letters=='T' ) return 'Tim'          ;
  if(letters=='To') return 'totheark'     ;
  if(letters=='U' ) return 'Unknown'      ;
  if(letters=='X' ) return 'Other'        ;
  return 'None' ;
}

function toggle_spoilers(){
  show_spoilers = !show_spoilers ;
  if(show_spoilers){
    Get('show_spoilers').innerHTML = 'True'  ;
  }
  else{
    Get('show_spoilers').innerHTML = 'False' ;
  }
  set_spoilers() ;
}
function toggle_autoplay(){
  autoplay = !autoplay ;
  if(autoplay){
    Get('autoplay').innerHTML = 'True'  ;
  }
  else{
    Get('autoplay').innerHTML = 'False' ;
  }
}
function toggle_autoskip(){
  autoskip = !autoskip ;
  if(autoskip){
    Get('autoskip').innerHTML = 'True'  ;
  }
  else{
    Get('autoskip').innerHTML = 'False' ;
  }
}
function set_spoilers(){
  if(show_spoilers){
    Get('entry_cameraperson').className = 'right' ;
    Get('entry_characters'  ).className = 'right' ;
    Get('entry_description' ).className = 'right' ;
  }
  else{
    Get('entry_cameraperson').className = 'right spoiler' ;
    Get('entry_characters'  ).className = 'right spoiler' ;
    Get('entry_description' ).className = 'right spoiler' ;
  }
}

function update_entry_info(){
  Get('entry_title'       ).innerHTML = entries[current_entry].name         ;
  Get('entry_description' ).innerHTML = entries[current_entry].description  ;
  Get('entry_characters'  ).innerHTML = get_all_names(entries[current_entry].characters  ) ;
  Get('entry_cameraperson').innerHTML = get_all_names(entries[current_entry].cameraperson) ;

  Get('entry_youtube_link'           ).href = 'http://www.youtube.com/watch?v='                  + entries[current_entry].youtube_id     ;
  Get('entry_wikidot_link'           ).href = 'http://marblehornets.wikidot.com/'                + entries[current_entry].wikidot_link   ;
  Get('entry_unfiction_link'         ).href = 'http://forums.unfiction.com/forums/viewtopic.php' + entries[current_entry].unfiction_link ;

  Get('entry_youtube_external_link'  ).href = 'http://www.youtube.com/watch?v='                  + entries[current_entry].youtube_id     ;
  Get('entry_wikidot_external_link'  ).href = 'http://marblehornets.wikidot.com/'                + entries[current_entry].wikidot_link   ;
  Get('entry_unfiction_external_link').href = 'http://forums.unfiction.com/forums/viewtopic.php' + entries[current_entry].unfiction_link ;
}
function update_thumbnails(){
  for(var i=0 ; i<entries.length ; i++){
    var in_playlist = false ;
    for(var j=0 ; j<current_playlist.length ; j++){
      if(i==current_playlist[j]){
        in_playlist = true ;
        break ;
      }
    }
    if(in_playlist){
      Get(  'p_entry_'+i).className = 'thumbnail thumbnail_in_playlist entry_name' ;
      Get('img_entry_'+i).className = 'thumbnail thumbnail_in_playlist' ;
      Get( 'td_entry_'+i).className = 'thumbnail thumbnail_in_playlist' ;
    }
    else{
      Get(  'p_entry_'+i).className = 'thumbnail thumbnail_inactive entry_name' ;
      Get('img_entry_'+i).className = 'thumbnail thumbnail_inactive' ;
      Get( 'td_entry_'+i).className = 'thumbnail thumbnail_inactive' ;
    }
  }
  Get(  'p_entry_'+current_entry).className = 'thumbnail thumbnail_active entry_name' ;
  Get('img_entry_'+current_entry).className = 'thumbnail thumbnail_active' ;
  Get( 'td_entry_'+current_entry).className = 'thumbnail thumbnail_active' ;
}
function get_row_and_column(index){
  if(index<0 || index>= entries.length) return [-99,-99] ;
  return( [Math.floor(index/nCol),index%nCol] ) ;
}
function set_flashlight(f){
  // Use the nearActive class names:
  // nearActive0 = active entry
  // nearActive1 = 1 square away from active entry
  // nearActive2 = diagonally away form active entry
  var f_results = get_row_and_column(f) ;
  for(var i=0 ; i<entries.length ; i++){
    for(var j=0 ; j<4 ; j++){
      remove_className(  'p_entry_'+i, 'nearActive'+j) ;
      remove_className('img_entry_'+i, 'nearActive'+j) ;
      remove_className( 'td_entry_'+i, 'nearActive'+j) ;
    }
    var results = get_row_and_column(i) ;
    var distance_x = Math.abs(results[0]-f_results[0]) ;
    var distance_y = Math.abs(results[1]-f_results[1]) ;
    if(distance_x>1 || distance_y>1){
      add_className(  'p_entry_'+i, 'nearActive3') ;
      add_className('img_entry_'+i, 'nearActive3') ;
      add_className( 'td_entry_'+i, 'nearActive3') ;
      continue ;
    }
    var d = distance_x+distance_y ;
    add_className(  'p_entry_'+i, ' nearActive'+(d)) ;
    add_className('img_entry_'+i, ' nearActive'+(d)) ;
    add_className( 'td_entry_'+i, ' nearActive'+(d)) ;
  }
  for(var j=0 ; j<4 ; j++){
    remove_className(  'p_entry_'+current_entry, 'nearActive'+j) ;
    remove_className('img_entry_'+current_entry, 'nearActive'+j) ;
    remove_className( 'td_entry_'+current_entry, 'nearActive'+j) ;
  }
  add_className(  'p_entry_'+current_entry, ' nearActive0') ;
  add_className('img_entry_'+current_entry, ' nearActive0') ;
  add_className( 'td_entry_'+current_entry, ' nearActive0') ;
}
function add_className(id, className){
  Get(id).className += ' '+className ;
}
function remove_className(id, className){
  Get(id).className = Get(id).className.replace(' '+className,'') ;
}

function change_video(){
  if(getParameterByName('scene')) return ;
  if(current_entry<0 || current_entry>=entries.length) current_entry = 0 ;

  if(autoplay && main_player.loadVideoById){
    main_player.loadVideoById(entries[current_entry].youtube_id) ;
  }
  else if(Get('youtube_object_movie').cueVideoById){
    Get('youtube_object_movie').cueVideoById(entries[current_entry].youtube_id) ;
  }

  update_entry_info() ;
  update_thumbnails() ;
  if(set_focus_on_change_video==true) Get('main_youtube_player').scrollIntoView() ;
  if(main_player.onStateChange) main_player.onStateChange() = update_video_status() ;
  set_flashlight(current_entry) ;
}
function get_position_in_playlist(){
  for(var i=0 ; i<current_playlist.length ; i++){
    if(current_playlist[i]==current_entry) return i ;
  }
  return -999 ;
}
function update_video_status(){
  if(autoskip && main_player.getPlayerState()==0){
    var position = get_position_in_playlist() ;
    if(position==-999) return ;
    position++ ;
    if(position>=current_playlist.length) position = 0 ;
    current_entry = current_playlist[position] ;
    change_video() ;
  }
}
function entry(name, youtube_id, description, channel, wikidot_link, unfiction_link, runtime, characters, cameraperson, operator, season){
  this.name           = name           ;
  this.youtube_id     = youtube_id     ;
  this.description    = description    ;
  this.channel        = channel        ;
  this.wikidot_link   = wikidot_link   ;
  this.unfiction_link = unfiction_link ;
  this.runtime        = runtime        ;
  this.characters     = characters     ;
  this.cameraperson   = cameraperson   ;
  this.operator       = operator       ;
  this.season         = season         ;

  this.minutes = parseInt(this.runtime.split(':')[0]) ;
  this.seconds = parseInt(this.runtime.split(':')[1]) ;
}

function start(){
  load_scenes_from_xml() ;
  for(var i=0 ; i<videos.length ; i++){
    var v = videos[i] ;
    var f = v.fields ;
    var scenes = v.scenes ;
    var characters = [] ;
    var camerapeople = [] ;
    for(var j=0 ; j<scenes.length ; j++){
      var s = scenes[j] ;
      for(var k=0 ; k<s.characters.length ; k++){
        if(s.characters[k]=='') characters.push() ;
        else if(s.characters[k]=='Alex'    ) characters.push('A' ) ;
        else if(s.characters[k]=='Amy'     ) characters.push('Am') ;
        else if(s.characters[k]=='Brian'   ) characters.push('B' ) ;
        else if(s.characters[k]=='Bruce'   ) characters.push('Br') ;
        else if(s.characters[k]=='Hoody'   ) characters.push('H' ) ;
        else if(s.characters[k]=='Jay'     ) characters.push('J' ) ;
        else if(s.characters[k]=='Jessica' ) characters.push('Je') ;
        else if(s.characters[k]=='Masky'   ) characters.push('M' ) ;
        else if(s.characters[k]=='operator') characters.push('O' ) ;
        else if(s.characters[k]=='Sarah'   ) characters.push('Sa') ;
        else if(s.characters[k]=='Seth'    ) characters.push('Se') ;
        else if(s.characters[k]=='Tim'     ) characters.push('T' ) ;
        else if(s.characters[k]=='totheark') characters.push('To') ;
        else if(s.characters[k]=='Unknown' ) characters.push('U' ) ;
        else characters.push('X') ;
      }
      if(s.cameraperson=='') camerapeople.push() ;
      else if(s.cameraperson=='Alex'    ) camerapeople.push('A' ) ;
      else if(s.cameraperson=='Amy'     ) camerapeople.push('Am') ;
      else if(s.cameraperson=='Brian'   ) camerapeople.push('B' ) ;
      else if(s.cameraperson=='Bruce'   ) camerapeople.push('Br') ;
      else if(s.cameraperson=='Hoody'   ) camerapeople.push('H' ) ;
      else if(s.cameraperson=='Jay'     ) camerapeople.push('J' ) ;
      else if(s.cameraperson=='Jessica' ) camerapeople.push('Je') ;
      else if(s.cameraperson=='Masky'   ) camerapeople.push('M' ) ;
      else if(s.cameraperson=='operator') camerapeople.push('O' ) ;
      else if(s.cameraperson=='Sarah'   ) camerapeople.push('Sa') ;
      else if(s.cameraperson=='Seth'    ) camerapeople.push('Se') ;
      else if(s.cameraperson=='Tim'     ) camerapeople.push('T' ) ;
      else if(s.cameraperson=='totheark') camerapeople.push('To') ;
      else if(s.cameraperson=='Unknown' ) camerapeople.push('U' ) ;
      else camerapeople.push('X') ;
    }
    var e = new entry(f.title, f.youtube_id, f.player_summary, f.channel, f.wikidot, f.unfiction, f.duration, characters, camerapeople, 0) ;
    entries.push(e) ;
  }
  for(var i=0 ; i<entries.length ; i++){ release_order_playlist.push(i) ; }
  current_entry = current_playlist[0] ;

  externalLinks() ;
  document.addEventListener('keydown', keyDown, false) ;
  Get('nVideos').innerHTML = entries.length ;
  var div   = Get('entries_div') ;
  var tbody = Get('entries_tbody') ;
  var tr ;
  for(var i=0 ; i<entries.length ; i++){
    if(i%nCol==0){
      if(do_film_strip){
        tr = Create('tr') ;
        for(var j=0 ; j<nCol ; j++){
          var td = Create('td') ;
          td.className = 'film_strip' ;
          tr.appendChild(td) ;
        }
        tbody.appendChild(tr) ;
      }
      tr = Create('tr') ;
    }

    var p = Create('p') ;
    p.className = 'entry_name' ;
    p.innerHTML = entries[i].name ;
    p.id = 'p_entry_' + i ;
    p.className = 'thumbnail thumbnail_inactive entry_name'

    var image = Create('img') ;
    // Preload images
    image.src = 'http://img.youtube.com/vi/' + entries[i].youtube_id + '/1.jpg' ;
    image.src = 'http://img.youtube.com/vi/' + entries[i].youtube_id + '/3.jpg' ;
    image.src = 'http://img.youtube.com/vi/' + entries[i].youtube_id + '/2.jpg' ;
    image.alt = entries[i].description ;
    image.title = entries[i].description ;
    image.id = 'img_entry_' + i ;
    image.className = 'thumbnail thumbnail_inactive'
    image.width  = 120 ;
    image.height =  90 ;

    var td = Create('td') ;
    td.className = 'thumbnail thumbnail_inactive'
    td.id = 'td_entry_' + i ;
    td.onclick = function(e){
      current_entry = e.target.parentNode.id.split('_')[2] ;
      change_video() ;
    }
    td.onmouseover = function(e){
      var id = e.target.parentNode.id.split('_')[2] ;
      heartbeat_entry = id ;
      set_flashlight(id) ;
    }
    td.onmouseout = function(e){
      heartbeat_entry = -1 ;
      heartbeat_frame =  3 ;
      var index = e.target.parentNode.id.split('_')[2] ;
      var image_id = 'img_entry_' + index ;
      Get(image_id).src = 'http://img.youtube.com/vi/' + entries[index].youtube_id + '/2.jpg' ;
    }
    td.appendChild(p) ;
    td.appendChild(image) ;
    tr.appendChild(td) ;

    // XHTML strict does not accept empty tables.  Sigh.
    if(Get('tr_remove')) tbody.removeChild(Get('tr_remove')) ;
    if(i%nCol==nCol-1 || i==entries.length-1){
      tbody.appendChild(tr) ;
      if(do_film_strip){
        tr = Create('tr') ;
        for(var j=0 ; j<nCol ; j++){
          var td = Create('td') ;
          td.className = 'film_strip' ;
          tr.appendChild(td) ;
        }
        tbody.appendChild(tr) ;
      }
      tr = Create('tr') ;
      for(var j=0 ; j<nCol ; j++){
        var td = Create('td') ;
        td.className = 'spacer' ;
        tr.appendChild(td) ;
      }
      tbody.appendChild(tr) ;
    }
  }
  main_player = Get('main_youtube_player') ;
  update_entry_info() ;
  update_thumbnails() ;
  parse_playlist_variables() ;
  set_spoilers() ;
  main_player.addEventListener('onStateChange', 'update_video_status') ;
  update_runtime() ;
  update_n_videos() ;
  set_flashlight(current_entry) ;
  heartbeat() ;
  if(getParameterByName('scene')){
    if(getParameterByName('index')){
      scene_player_current_index = parseInt(getParameterByName('index')) ;
    }
    if(getParameterByName('order')){
      if(getParameterByName('order')=='release'){
        order_scenes_by_release() ;
      }
    }
    scene_player_heartbeat() ;
  }
}
function heartbeat(){
  if(heartbeat_entry!=-1){
    var image_id = 'img_entry_' + heartbeat_entry ;
    heartbeat_frame = 1+(heartbeat_frame+1)%3 ;
    Get(image_id).src = 'http://img.youtube.com/vi/' + entries[heartbeat_entry].youtube_id + '/' + (heartbeat_frame) + '.jpg' ;
  }
  window.setTimeout('heartbeat()', delay) ;
}

function keyDown(e){
  var keyDownID = window.event ? event.keyCode : (e.keyCode != 0 ? e.keyCode : e.which) ;
  switch(keyDownID){
    case 37: case 65: case 97:           // Left
    case 39: case 68: case 100:          // Right
    case 32: case 38: case 87: case 119: // Up
    case 40: case 83: case 115:          // Down
      e.preventDefault() ;
      break ;
  }
  switch(keyDownID){
    case 37: case 65: case 97: // Left
      var position = get_position_in_playlist() ;
      if(position==-999) return ;
      position-- ;
      if(position<0) position = current_playlist.length-1 ;
      current_entry = (current_playlist.length==0) ? 0 : current_playlist[position] ;
      change_video() ;
      break ;

    case 39: case 68: case 100: // Right
      var position = get_position_in_playlist() ;
      if(position==-999) return ;
      position++ ;
      if(position>=current_playlist.length) position = 0 ;
      current_entry = (current_playlist.length==0) ? 0 : current_playlist[position] ;
      change_video() ;
      break ;

    case 38: case 87: case 119:// Up
      current_entry =(current_playlist.length==0) ? 0 :  current_playlist[0] ;
      change_video() ;
      break ;

    case 40: case 83: case 115: // Down
      current_entry = (current_playlist.length==0) ? 0 : current_playlist[current_playlist.length-1] ;
      change_video() ;
      break ;

    case 32: // Space
      if(main_player.pauseVideo){
        switch(main_player.getPlayerState()){
          case 1: // Playing
            main_player.pauseVideo() ;
            break ;
          case -1: // Unstarted
          case 2: // Paused
            main_player.playVideo()   ;
            break ;
          default:
            break ;
        }
      }
    break ;

    case  61: // =
    case 107: // +
      if(main_player.getVolume){
        if(main_player.getVolume()<95){
          main_player.setVolume(main_player.getVolume()+5) ;
        }
        else{
          main_player.setVolume(100) ;
        }
      }
    break ;

    case 109: // -
    case   0: // _
      if(main_player.getVolume){
        if(main_player.getVolume()>5){
          main_player.setVolume(main_player.getVolume()-5) ;
        }
        else{
          main_player.setVolume(0) ;
        }
      }
    break ;

    case 77: // m/M
      if(main_player.isMuted){
        if(main_player.isMuted()){
          main_player.unMute() ;
        }
        else{
          main_player.mute() ;
        }
      }
    break ;

    case 13: // enter
      create_playlist() ;
    break ;
  }
}

/* Stuff for playing the scenes in order without white text etc */
var scene_player_delay = 100 ;
var scene_player_current_index = 0 ;
function scene_player_heartbeat(){
  var queue_next_video = false ;
  if(main_player.getCurrentTime()>scenes[scene_player_current_index].end){
    if(scene_player_current_index==scenes.length-1){
      return ;
    }
    scene_player_current_index++ ;
    queue_next_video = true ;
  }
  if(scene_player_first){
    scene_player_first = false ;
    queue_next_video = true ;
  }
  if(queue_next_video){
    var youtube_id = scenes[scene_player_current_index].video.fields['youtube_id'] ;
    main_player.cueVideoById(youtube_id, scenes[scene_player_current_index].start) ;
    main_player.playVideo() ;
    var uri = '?scene=true&index=' + scene_player_current_index ;
    if(getParameterByName('order')=='release') uri = uri + '&order=release' ;
    Get('keep_watching_link').href = uri ;
    
    // Hmm, might need to rethink this part
    var v = scenes[scene_player_current_index].video ;
    Get('entry_title'       ).innerHTML = v.fields['title'] ;
    Get('entry_description' ).innerHTML = scenes[scene_player_current_index].fields['description'] ;
    
    Get('entry_youtube_link'           ).href = 'http://www.youtube.com/watch?v='                  + v.fields['youtube_id'] ;
    Get('entry_wikidot_link'           ).href = 'http://marblehornets.wikidot.com/'                + v.fields['wikidot'   ] ;
    Get('entry_unfiction_link'         ).href = 'http://forums.unfiction.com/forums/viewtopic.php' + v.fields['unfiction' ] ;

    Get('entry_youtube_external_link'  ).href = 'http://www.youtube.com/watch?v='                  + v.fields['youtube_id'] ;
    Get('entry_wikidot_external_link'  ).href = 'http://marblehornets.wikidot.com/'                + v.fields['wikidot'   ] ;
    Get('entry_unfiction_external_link').href = 'http://forums.unfiction.com/forums/viewtopic.php' + v.fields['unfiction' ] ;
  }
  window.setTimeout(scene_player_heartbeat, scene_player_delay) ;
}

function    Get(id ){ return document.getElementById(id) ; }
function Create(tag){ return document.createElement(tag) ; }
function getParameterByName(name){
  // Taken from http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
  var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search) ;
  return match && decodeURIComponent(match[1].replace(/\+/g, ' ')) ;
}
