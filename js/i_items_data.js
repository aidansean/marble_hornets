function get_item_scene_by_name(name){
  for(var i=0 ; i<item_scenes.length ; i++){
    if(item_scenes[i].fields['name']==name){
      return item_scenes[i] ;
    }
  }
  return -1 ;
}

function update_item_details(scene_name,parent,description){
  var scene = get_item_scene_by_name(scene_name) ;
  scene.parent = parent ;
  scene.parent_is_set = true ;
  if(description=='') return ;
  if(scene.fields) scene.fields['description'] = description ;
}

function order_items_scenes(){
  item_scenes.sort(function(a,b){
    if(a.year !=b.year ) return a.year  - b.year  ;
    if(a.month!=b.month) return a.month - b.month ;
    if(a.day   !=b.day ) return a.day   - b.day   ;
    return a.hour - b.hour ;
  }) ;
}

function update_item_info(){

  item_scenes.push(new event_object('Entry #22 tape at Red Tower','2006/09/01',[],['Entry #22 tape'],'C','Someone puts the Entry #22 tape in the Red Tower')) ;
  update_item_details('Entry #22 tape at Red Tower', 'U', 'Someone puts the Entry #22 tape in the Red Tower') ;

  item_scenes.push(new event_object('Jay has a knife','2009/11/01',[],['Knife'],'C','')) ;
  update_item_details('Jay has a knife', 'J', 'Jay has a knife with him') ;

  item_scenes.push(new event_object('Masky has the knife','2009/11/11',[],['Knife'],'C','Somehow, Masky obtains the knife')) ;
  update_item_details('Masky has the knife', 'T', 'Somehow, Masky obtains the knife') ;

  item_scenes.push(new event_object('Alex has a spare key','2010/08/01',[],['Alex\'s key'],'C','Alex\'s spare key is sitting safely on its hook')) ;
  update_item_details('Alex has a spare key', 'A', 'Alex\'s spare key is sitting safely on its hook') ;

  item_scenes.push(new event_object('Alex keeps some tapes','2006/06/02',[],['Static hole tapes'],'C','')) ;
  update_item_details('Alex keeps some tapes', 'A', 'Alex chooses not to give Jay all the tapes') ;

  item_scenes.push(new event_object('Entry #26 mystery footage','2006/06/20',[],['Entry #26 tape'],'C','')) ;
  update_item_details('Entry #26 mystery footage', 'U', 'Someone films footage on the Entry #26 tape') ;

  item_scenes.push(new event_object('Alex gets Entry #26 tape','2010/04/05',[],['Entry #26 tape'],'R','')) ;
  update_item_details('Alex gets Entry #26 tape', 'A', 'Alex obtains the Entry #26 tape.  He posts it on to Jay') ;

  item_scenes.push(new event_object('Alex has a camera','2006/05/01',[],['AlexCam1'],'C','')) ;
  update_item_details('Alex has a camera', 'A', 'Alex has a main camera during the filming of Marble Hornets') ;

  item_scenes.push(new event_object('Alex has another camera','2006/05/02',[],['AlexCam2'],'C','')) ;
  update_item_details('Alex has another camera', 'A', 'Alex has a second camera during the filming of Marble Hornets') ;

  item_scenes.push(new event_object('Alex gives Tim a camera','2006/05/15',[],['AlexCam2'],'C','')) ;
  update_item_details('Alex gives Tim a camera', 'T', 'Alex gives Tim his second camera to record "Behind the scenes" footage') ;


  update_item_details('Entry #1 scene 1'        ,'A', 'Alex films the operator with his camera') ;
  update_item_details('Introduction scene 1'    ,'J', 'Jay starts the youtube channel, marblehornets') ;

  // Pills
  update_item_details('Entry #20 scene 1', 'T', 'Tim is seen with his pills for the first time') ;
  update_item_details('Entry #65 scene 4', 'T', 'Tim takes a large number of pills') ;
  update_item_details('Entry #72 scene 2', 'T', 'Tim takes some pills to cope with the presence of the operator') ;
  update_item_details('entry #73 scene 3', 'H', 'Hoody takes some of Tim\'s pills.  Entry #76 tape is seen in the box') ;
  update_item_details('Entry #74 scene 2', 'T', 'Tim has some pills') ;
  update_item_details('Entry #81 scene 4', 'H', 'Tim\'s pills are missing') ;

  // Sketches and other Entry #16 things
  update_item_details('Entry #8 scene 1' , 'A', 'Alex creates his sketches') ;
  update_item_details('Entry #11 scene 1', 'A', 'Alex\'s sketches are above his bed') ;

  update_item_details('Entry #16 scene 1'  , 'J', 'Jay takes some of Alex\'s sketches, Tim\'s pills and the bullet casing from Brian\'s house') ;
  update_item_details('Jay loses his knife', 'U', 'Jay\'s knife is taken from him') ;
  update_item_details('Entry #19 scene 1'  , 'T', 'Masky takes his pills back from Jay.  Masky may have also taken the bullet casing') ;

  update_item_details('Jay\'s youtube', 'J', 'Jay creates the Marble Hornets youtube account') ;
  update_item_details('Jay\'s twitter', 'J', 'Jay creates the Marble Hornets twitter account') ;

  // Weapons
  update_item_details('Entry #35 scene 1', 'J', 'Alex takes the knife from Masky.  Jay then has the knife') ;
  update_item_details('Entry #52 scene 1', 'J', 'Jay has the knife') ;
  update_item_details('Entry #52 scene 2', 'A', 'Alex has the gun') ;
  update_item_details('Entry #67 scene 2', 'H', 'Hoody takes the gun from Alex') ;
  update_item_details('Entry #67 scene 3', 'H', 'Hoody has the gun') ;
  update_item_details('Entry #67 scene 4', 'T', 'Tim wakes up and finds he has the gun') ;
  update_item_details('Entry #76 scene 3', 'A', 'Alex takes the gun from Jessica') ;
  update_item_details('Entry #80 scene 2', 'A', 'Alex has the gun') ;
  update_item_details('Entry #85 scene 2', 'A', 'Alex has the gun') ;
  
  update_item_details('Entry #86 scene 1', 'A', 'Alex has the gun') ;
  update_item_details('Entry #86 scene 2', 'T', 'Tim takes the gun') ;
  update_item_details('Entry #86 scene 3', 'T', 'Tim has the knife') ;

  // Tapes
  update_item_details('Entry #22 scene 1', 'U', 'Seth films Entry #22') ;
  update_item_details('Entry #21 scene 1', 'J', 'Jay takes the Entry #22 tape from the Red Tower') ;

  update_item_details('Entry #26 scene 2', 'U', 'Amy films footage of her apartment in Entry #26 using Alex\'s camera') ;
  update_item_details('Entry #26 scene 4', 'J', 'Jay receives the Entry #26 tape') ;

  update_item_details('Jay obtains Alex tapes', 'J', 'Jay gets the entries tapes from Alex') ;

  update_item_details('Entry #51 scene 1', 'A', 'Alex films Brian in the hospital') ;
  update_item_details('Entry #51 scene 2', 'U', 'Brian films in the hospital') ;
  update_item_details('Entry #51 scene 3', 'A', 'Alex is in the hospital and takes the camera') ;
  update_item_details('Entry #46 scene 1', 'J', 'Jay steals Alex\'s spare key') ;
  update_item_details('Entry #50 scene 3', 'J', 'Using Alex\'s spare key, Jay takes the Entry #51 tape from Alex\'s apartment') ;

  update_item_details('Alex burns tapes' , 'A', 'Alex takes some tapes and burns them in the static hole') ;
  update_item_details('Entry #69 scene 3', 'J', 'Jay and Tim recover the tapes from the static hole') ;
  update_item_details('Entry #75 scene 2', 'T', 'Tim takes the Amy photo and the entry #73 tape') ;
  update_item_details('Entry #75 scene 3', 'J', 'Jay takes the entry #73 tape from Tim') ;
  update_item_details('Entry #76 scene 2', 'U','Jessica takes the camera from Hoody and the gun from Alex') ;
  update_item_details('Entry #54 scene 2', 'J', 'Tim gives his tapes to Jay') ;

  // Cameras and hard drive
  update_item_details('Entry #54 scene 1', 'T', 'Tim records some behind the scenes footage on Alex\'s second camera') ;
  update_item_details('Entry #57 scene 2', 'U', 'Tim records some footage at the hospital on Alex\'s second camera.  It is unclear what happens to the camera after this.') ;

  update_item_details('Entry #41 scene 1', 'H', 'Hoody returns Jay\'s camera to his car') ;

  update_item_details('Entry #84 scene 3', 'A', 'Alex is seen using his main camera for the first time') ;
  update_item_details('Entry #42 scene 1', 'A', 'Alex is seen using the chestcam for the first time') ;
  update_item_details('Entry #42 scene 2', 'J', 'Jay\'s camera is returned to him') ;
  update_item_details('Entry #52 scene 3', 'J', 'Jay takes the hard drive and chestcam') ;
  update_item_details('Entry #27 scene 1', 'J', 'Jay wakes up wearing the chestcam') ;
  update_item_details('Entry #64 scene 1', 'T', 'Tim takes the chestcam') ;

  update_item_details('Entry #15 scene 1', 'J', 'Jay starts to film') ;
  update_item_details('Entry #23 scene 3', 'J', 'Jay\'s first camera stops functioning after a confrontation with the operator') ;
  update_item_details('Entry #24 scene 1', 'J', 'Jay starts to film again with a second camera') ;

  update_item_details('Entry #61 scene 1', 'H','Hoody films Tim having a seizure, and takes his pills') ;
  update_item_details('Entry #62 scene 2', 'H','Hoody films Jay using Jay\'s camera') ;
  update_item_details('Entry #62 scene 3', 'J','Jay takes his camera back after waking up') ;
  update_item_details('Entry #74 scene 1', 'T','Tim is using Jay\'s camera') ;
  update_item_details('Entry #75 scene 1', 'J','Jay takes his camera back from Tim') ;

  //  update_item_details('Entry #76 scene 1', 'H', 'Hoody has a camera') ;
  update_item_details('Entry #77 scene 1', 'J','Jay goes Tim\'s house with the knife and camera') ;
  update_item_details('Entry #77 scene 2', 'T','Tim takes Jay\'s camera and knife') ;
  update_item_details('Entry #78 scene 1', 'J', 'Hoody returns Jay\'s camera') ;
  update_item_details('Entry #80 scene 3', 'T', 'Tim takes Jay\'s camera') ;
  
  update_item_details('Entry #84 scene 1', 'T', 'The chestcam stops working') ;
  update_item_details('Entry #84 scene 2', 'T', 'Tim starts using Jay\'s camera') ;

  // Hijacking of accounts
  update_item_details('Entry ###### scene 1', 'U', 'Jay loses control of the Marble Hornets youtube account'  ) ;
  update_item_details('Entry #25 scene 1'   , 'J', 'Jay regains control of the Marble Hornets youtube account') ;

  update_item_details('enttry 37 released', 'U', 'Jay loses control of the Marble Hornets youtube account'  ) ;
  update_item_details('Entry #38 released', 'J', 'Jay regains control of the Marble Hornets youtube account') ;
  update_item_details('entry released'    , 'U', 'Jay loses control of the Marble Hornets youtube account'  ) ;
  update_item_details('Entry #62 released', 'J', 'Jay regains control of the Marble Hornets youtube account') ;

  update_item_details('\'68\' released'   , 'H', 'Hoody hacks into the Marble Hornets youtube account') ;
  update_item_details('Entry #68 released', 'J', 'Jay regains control of the Marble Hornets youtube account') ;
  update_item_details('entry #73 scene 1' , 'H', 'Hoody hacks into the Marble Hornets youtube account.  Hoody has the gun and some of Tim\'s pills.') ;

  update_item_details('Jay posts Entry #78' , 'J', 'Jay regains control of the Marble Hornets youtube account') ;
  update_item_details('Jay posts Entry #79' , 'J', 'Jay regains control of the Marble Hornets youtube account') ;

  item_scenes.push(new event_object('Jay changes twitter password','2010/11/23',[],['marblehornets twitter'],'R','After noticing the images, Jay changes the twitter account password')) ;
  update_item_details('Jay changes twitter password', 'J', '') ;

  update_item_details('First cipher tweeted', 'U', 'Someone posts a cipher to the Marble Hornets twitter account'  ) ;
  item_scenes.push(new event_object('Jay acknowledges cipher tweet','2013/01/07',[],['marblehornets twitter'],'R','Jay acknowledges the cipher tweet')) ;
  update_item_details('Jay acknowledges cipher tweet', 'J', '') ;

  update_item_details('Second cipher tweeted', 'U', 'Someone posts a cipher to the Marble Hornets twitter account'  ) ;
  item_scenes.push(new event_object('Jay ignores cipher tweet','2013/06/08',[],['marblehornets twitter'],'R','Jay tweets, but does not acknowledge the second cipher tweet')) ;
  update_item_details('Jay ignores cipher tweet', 'J', '') ;

  update_item_details('Tim tweets from marblehornets', 'T' ,'Tim has control of the twitter account') ;
  update_item_details('Tim posts a video'            , 'T', 'Tim has control of the Marble Hornets youtube account') ;
  update_item_details('Jay posts a video'            , 'J',  'Jay regains control of the Marble Hornets youtube account') ;
  update_item_details('Tim posts another video'      , 'T', 'Tim has control of the Marble Hornets youtube account again') ;

  // Other
  update_item_details('Entry #2 scene 1'  , 'A', 'Alex walks his dog, Rocky') ;
  update_item_details('Rocky goes missing', 'U', 'Rocky is never seen or heard of again') ;

  update_item_details('Jay\'s apartment fire', 'U', 'Jay loses many posessions as his apartment burns down') ;
  update_item_details('Twitpics posted'      , 'U', '') ;

  update_item_details('Entry #18 scene 1'       , 'U', 'Jay finds the operator doll, but Masky tackles him before he can take it') ;
  update_item_details('Entry #23 scene 1'       , 'U', 'Jay finds the operator doll in the house, follows where it points, but leaves it at the house') ;
  update_item_details('Entry #60 scene 2'       , 'J', 'Jay finds Tim\'s medical notes and the operator doll in the maintenance tunnel and takes it with him') ;
  update_item_details('Tim admitted to hospital', 'T', 'Tim\'s medical records are written as he is admitted') ;
  update_item_details('Entry #63 scene 2'       , 'T', 'Jay gives Tim his medical records') ;

  update_item_details('Tim posts Entry #77', 'T', 'Tim has control of the Marble Hornets youtube account') ;
  update_item_details('Tim posts Entry #80', 'T', 'Tim has control of the Marble Hornets youtube account') ;
  update_item_details('Tim posts Entry #81', 'T', 'Tim posts footage from the chestcam') ;


  update_item_details('Entry #82 scene 1', 'T', 'Tim takes Jay\'s laptop') ;
  update_item_details('Entry #83 scene 3', 'T', 'Tim takes the pills and a tape from Hoody') ;

  order_items_scenes() ;

  for(var i=0 ; i<item_scenes.length ; i++){
    item_scenes[i].update_parent_column() ;
  }

  var summary_string = new Array() ;
  for(var i=0 ; i<item_scenes.length ; i++){
    var is = item_scenes[i] ;
    if(is.parent_is_set) continue ;
    summary_string.push(is.fields['name'] + ' ' + is.items + ' ' + is.fields['description'] + '<br />') ;
  }

}
