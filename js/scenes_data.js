// Tape tag numbers:
// 0: Other/unknown
// 1: Tapes given to Jay from Alex in 2006 (Season 1)
// 2: Tapes from Jay rediscovered by Jay in 2010 (Season 2)
// 3: Harddrive from Alex stolen by Jay in 2010 (Season 2)
// 4: Tapes given to Jay from Tim in 2012 (Season 3)
// 5: Tapes found by Jay and Tim in 2013 (Season 3)
// 6: Footage filmed by Jay in real time (Seasons 1,2,3)
// 7: Footage filmed by Tim in real time (Season 3)
// 8: Footage taken from Jay's laptop by Tim in 2013 (Season 3)
// 10: totheark footage (Seasons 1,2,3)
// 11: hoody footage (Seasons 1,2,3)
// 12: Hoody's tape (stolen from Alex)

// A video_object contains the information relating to the youtube video, and they contain a list of scenes.
// A scene_object contains the information for a short period of time.  The scenes are timetamped so that they appear in order.  If a scene is just another scene reycled (eg a totheark video that uses footage Jay uploaded) then the timestamp is set to the time of upload.
// You can add an epoch_object to mark a period of time (eg Summer 2006).
// You can add an event_object to highlight something important that happens, or to draw attention to something that took place outside the videos.

// Once the scenes have been entered, they are sorted by timestamp.  Then the character lines link up the scenes.  The character line for a given character always enters and leaves a scene in the same place to avoid awkward collisions.  (eg Alex is always the leftmost character.)

// The inputs for a video_object are:
// Title, season, youtube channel

// The inputs for a scene_object are:
// Timestamp, List of characters that appear in the scene, who filmed the scene, the general location of the scene (C for CollegeTown, R for Rosswood, E for elsewhere), the place for the scene (eg Red Tower), how Jay obtained the tape (see the list at the top of the page), description

// The inputs for a epoch_object are:
// Title, timestamp, description (optional)

// The inputs for a event_object are:
// Title, timestamp, relevant characters, location, description (optional)

// Most events are blue.  Events that lead to Jay gaining more tapes are green.

// Scenes are given names according to which video they appear in, and in what order.  For example, the second scene of Entry #52 is called:
// "Entry #52 scene 2"
// You can change the timestamp for a scene with the following function:
// set_scene_date_time(scene_name,date,time) ;

// You can use time of day for fine time ordering.  Only the hours count (24 scenes per day should be more than enough!)
var item_scenes = [] ;
var videos = [] ;
var scenes = [] ;
var key_heading       = null ;
var key_color_heading = null ;
var key_scene         = null ;
var key_events        = [] ;
var key_color_events  = [] ;

function load_scenes_from_xml(){
  // all_scenes is used to find the final appearance of things
  var all_scenes = [] ;

  if(getParameterByName('prefix')) prefix = getParameterByName('prefix') ;
  var xml_timeline_doc = loadXMLDoc('xml/'+prefix+'_timeline.xml') ;
  var xml_timeline = xml_timeline_doc.childNodes[0] ;
  
  var selected_season_string       = getParameterByName('season'      ) ;
  var selected_characters_string   = getParameterByName('characters'  ) ;
  var selected_camerapeople_string = getParameterByName('cameraperson') ;
  if(selected_season_string      !=null) filtered_scenes = true ;
  if(selected_characters_string  !=null) filtered_scenes = true ;
  if(selected_camerapeople_string!=null) filtered_scenes = true ;
  
  for(var i=0 ; i<xml_timeline.childNodes.length ; i++){
    if(xml_timeline.childNodes[i].nodeName=='video'){
      var video_node = xml_timeline.childNodes[i] ;
      var add_video = true ;
      var title = video_node.getAttribute('title') ;
      for(var j=0 ; j<videos.length ; j++){
        if(videos[j].fields['title']==title){
          add_video = false ;
          break ;
        }
      }
      if(selected_season_string!=null){
        var season = video_node.getAttribute('season') ;
        if(season!=selected_season_string) add_video = false ;
      }
      if(add_video==false) continue ;
      var video = new video_object(video_node) ;
      videos.push(video) ;
      for(var j=0 ; j<video_node.childNodes.length ; j++){
        if(video_node.childNodes[j].nodeName=='scene_list'){
          var scene_counter = 0 ;
          for(var k=0 ; k<video_node.childNodes[j].childNodes.length ; k++){
            var scene_node = video_node.childNodes[j].childNodes[k] ;
            var add_scene = true ;
            if(selected_epoch_string!=null && scene_node.getAttribute){
              var date = scene_node.getAttribute('date') ;
              if(date<lower_date) add_scene = false ;
              if(date>upper_date) add_scene = false ;
            }
            if(scene_node.nodeName=='scene'){
              scene_counter++ ;
              var scene = new scene_object(scene_node, mode) ;
              if(add_scene){
                scenes.push(scene) ;
                video.add_scene(scene) ;
              }
              all_scenes.push(scene) ;
            }
          }
        }
      }
    }
    else if(mode=='timeline'){
      if(xml_timeline.childNodes[i].nodeName=='event'){
        var add_event = true ;
        var event_node = xml_timeline.childNodes[i] ;
        var event = new event_object(event_node) ;
        if(selected_season_string!=null){
          var season = event_node.getAttribute('season') ;
          if(season!=selected_season_string) add_event = false ;
        }
        if(selected_epoch_string!=null){
          var date = event_node.getAttribute('date') ;
          if(date<lower_date) add_event = false ;
          if(date>upper_date) add_event = false ;
        }
        if(add_event) scenes.push(event) ;
        all_scenes.push(event) ;
      }
      else if(xml_timeline.childNodes[i].nodeName=='epoch'){
        var add_epoch = true ;
        //if(filtered_scenes) add_epoch = false ;
        var epoch_node = xml_timeline.childNodes[i] ;
        var epoch = new epoch_object(epoch_node) ;
        if(selected_season_string!=null){
          var season = epoch_node.getAttribute('season') ;
          if(season.indexOf(selected_season_string)==-1) add_epoch = false ;
        }
        if(selected_epoch_string!=null){
          var date = epoch_node.getAttribute('date') ;
          if(date<lower_date) add_epoch = false ;
          if(date>upper_date) add_epoch = false ;
        }
        if(add_epoch) scenes.push(epoch) ;
        all_scenes.push(epoch) ;
      }
      else if(xml_timeline.childNodes[i].nodeName=='key'){
        if(selected_epoch_string!=null) continue ;
        var key_node = xml_timeline.childNodes[i] ;
        for(var j=0 ; j<key_node.childNodes.length ; j++){
          if(key_node.childNodes[j].nodeName=='video'){
            var video_node = key_node.childNodes[j] ;
            var video = new video_object(video_node) ;
            for(var k=0 ; k<video_node.childNodes.length ; k++){
              if(video_node.childNodes[k].nodeName=='scene_list'){
                for(var l=0 ; l<video_node.childNodes[k].childNodes.length ; l++){
                  var scene_node = video_node.childNodes[k].childNodes[l] ;
                  if(scene_node.nodeName=='scene'){
                    var scene = new scene_object(scene_node) ;
                    video.add_scene(scene) ;
                    key_scene = scene ;
                  }
                }
              }
            }
          }
          else if(key_node.childNodes[j].nodeName=='event'){
            var event = new event_object(key_node.childNodes[j]) ;
            if(key_node.childNodes[j].id=='key_heading'){
              key_heading = event ;
            }
            else if(key_node.childNodes[j].id=='key_color_heading'){
              key_color_heading = event ;
            }
            else if(key_node.childNodes[j].hasAttribute('tape_tag')){
              key_color_events.push(event) ;
            }
            else{
              key_events.push(event) ;
            }
          }
        }
      }
      else if(xml_timeline.childNodes[i].nodeName=='gathering'){
        var add_gathering = true ;
        var gathering_node = xml_timeline.childNodes[i] ;
        var gathering = new gathering_object(gathering_node) ;
        if(selected_season_string!=null){
          var season = event_node.getAttribute('season') ;
          if(season!=selected_season_string) add_gathering = false ;
        }
        if(selected_epoch_string!=null){
          var date = event_node.getAttribute('date') ;
          if(date<lower_date) add_gathering = false ;
          if(date>upper_date) add_gathering = false ;
        }
        add_gathering = true ;
        if(add_gathering) scenes.push(gathering) ;
        all_scenes.push(gathering) ;
      }
    }
  }
  
  if(selected_characters_string!=null){
    var selected_characters = selected_characters_string.split(',') ;
    for(var i=scenes.length-1 ; i>=0 ; i--){
      var success = false ;
      if(scenes[i].characters==undefined) continue ;
      for(var j=0 ; j<scenes[i].characters.length ; j++){
        if(success) break ;
        for(var k=0 ; k<selected_characters.length ; k++){
          if(scenes[i].characters[j]==selected_characters[k]){
            success = true ;
            break ;
          }
        }
      }
      if(!success){ scenes.splice(i,1) ; }
    }
  }
  else if(selected_camerapeople_string!=null){
    var selected_camerapeople = selected_camerapeople_string.split(',') ;
    for(var i=scenes.length-1 ; i>=0 ; i--){
      var success = false ;
      for(var j=0 ; j<selected_camerapeople.length ; j++){
        if(scenes[i].fields['cameraperson']==selected_camerapeople[j]){
          success = true ;
          break ;
        }
      }
      if(!success){ scenes.splice(i,1) ; }
    }
  }
  order_scenes() ;
  order_videos() ;
  
  for(var i=0 ; i<scenes.length ; i++){
    if(scenes[i].items==undefined) continue ;
    if(filter_items.length>0){
      var success = false ;
      for(var j=0 ; j<scenes[i].items.length ; j++){
        for(var k=0 ; k<filter_items.length ; k++){
          if(scenes[i].items[j]==filter_items[k]){
            success = true ;
            break ;
          }
        }
        if(success) break ;
      }
      if(success==false) continue ;
    }
    if(scenes[i].items.length > 0) item_scenes.push(scenes[i]) ;
  }
  
  for(var i=0 ; i<things.length ; i++){
    for(var j=0 ; j<all_scenes.length ; j++){
      if(!all_scenes[j].characters) continue ;
      for(var k=0 ; k<all_scenes[j].characters.length ; k++){
        if(things[i].name==all_scenes[j].characters[k]){
          if(things[i].first_date==null){
            things[i].first_date  = all_scenes[j].fields['date'] ;
            things[i].first_scene = all_scenes[j] ;
          }
          else{
            if(all_scenes[j].fields['date']<things[i].first_date){
              things[i].first_date  = all_scenes[j].fields['date'] ;
              things[i].first_scene = all_scenes[j] ;
            }
          }
          
          if(things[i].final_date==null){
            things[i].final_date  = all_scenes[j].fields['date'] ;
            things[i].final_scene = all_scenes[j] ;
          }
          else{
            if(all_scenes[j].fields['date']>things[i].final_date){
              things[i].final_date  = all_scenes[j].fields['date'] ;
              things[i].final_scene = all_scenes[j] ;
            }
          }
        }
      }
    }
  }
}

function order_scenes(){
  scenes.sort(function(a,b){
    if(a.year  !=b.year ) return a.year  - b.year  ;
    if(a.month !=b.month) return a.month - b.month ;
    if(a.day   !=b.day  ) return a.day   - b.day   ;
    return a.hour - b.hour ;
  }) ;
  for(var i=0 ; i<scenes.length ; i++){ scenes[i].position = i ; }
}

function order_videos(){
  videos.sort(function(a,b){
    var a_r = a.fields['release_date'] ;
    var b_r = b.fields['release_date'] ;
    var a_year  = parseInt(a_r.split('/')[0]) ;
    var b_year  = parseInt(b_r.split('/')[0]) ;
    var a_month = parseInt(a_r.split('/')[1]) ;
    var b_month = parseInt(b_r.split('/')[1]) ;
    var a_day   = parseInt(a_r.split('/')[2]) ;
    var b_day   = parseInt(b_r.split('/')[2]) ;
    if(a_year !=b_year ) return a_year  - b_year  ;
    if(a_month!=b_month) return a_month - b_month ;
    return a_day - b_day ;
  }) ;
}

function order_scenes_by_release(){
  scenes = [] ;
  for(var i=0 ; i<videos.length ; i++){
    var v = videos[i] ;
    for(var j=0 ; j<v.scenes.length ; j++){
      scenes.push(v.scenes[j]) ;
    }
  }
}