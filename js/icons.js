function start(){
  var w = 150 ;
  var h = 150 ;

  var canvas_youtube  = Get('canvas_youtube' ) ;
  var canvas_location = Get('canvas_location') ;
  var canvas_calendar = Get('canvas_calendar') ;
  var canvas_camera   = Get('canvas_camera'  ) ;
  
  var context_youtube  = canvas_youtube .getContext('2d') ; context_youtube .translate(0.5,0.5) ;
  var context_location = canvas_location.getContext('2d') ; context_location.translate(0.5,0.5) ;
  var context_calendar = canvas_calendar.getContext('2d') ; context_calendar.translate(0.5,0.5) ;
  var context_camera   = canvas_camera  .getContext('2d') ; context_camera  .translate(0.5,0.5) ;
  
  // Crosshair
  var r = 0.3*w ;
  var l = 0.1*w ;
  context_location.lineWidth = 0.08*w ;
  context_location.arc(0.5*w,0.5*h,r,0,2*Math.PI,true) ;
  
  context_location.moveTo(0.5*w-r-l,0.5*h) ;
  context_location.lineTo(0.5*w-r+l,0.5*h) ;
  context_location.moveTo(0.5*w+r-l,0.5*h) ;
  context_location.lineTo(0.5*w+r+l,0.5*h) ;
  
  context_location.moveTo(0.5*w,0.5*h-r-l) ;
  context_location.lineTo(0.5*w,0.5*h-r+l) ;
  context_location.moveTo(0.5*w,0.5*h+r-l) ;
  context_location.lineTo(0.5*w,0.5*h+r+l) ;
  context_location.stroke() ;
  
  // Youtube
  var x1 = 0.1*w ;
  var x2 = w-x1 ;
  var y1 = 0.1*h ;
  var y2 = h-y1 ;
  r = 0.2*w ;
  rounded_box_path(x1, y1, x2, y2, r, context_youtube) ;
  context_youtube.fill() ;
  
  context_youtube.beginPath() ;
  context_youtube.fillStyle = 'white' ;
  x1 = 0.4*w ;
  x2 = 0.7*w ;
  y1 = 0.3*h ;
  y2 = 0.5*h ;
  var y3 = 0.7*h ;
  context_youtube.moveTo(x1,y1) ;
  context_youtube.lineTo(x2,y2) ;
  context_youtube.lineTo(x1,y3) ;
  context_youtube.fill() ;
  
  // Calendar
  x1 = 0.1*w ;
  x2 = w-x1 ;
  y1 = 0.2*h ;
  y2 = 0.9*h ;
  r = 0.08*w ;
  rounded_box_path(x1, y1, x2, y2, r, context_calendar) ;
  context_calendar.fill() ;
  
  context_calendar.beginPath() ;
  context_calendar.fillStyle = 'white' ;
  var mx  = 0.04*w ;
  var my  = 0.04*h ;
  var mlr = 0.08*w ;
  var mt  = 0.14*h ;
  var mb  = 0.08*h ;
  var nc = 4 ;
  var nr = 3 ;
  var cw = ((x2-x1)-(nc-1)*mx-2*mlr)/nc ;
  var ch = ((y2-y1)-(nr-1)*my-mt-mb)/nr ;
  for(var i=0 ; i<nc ; i++){
    var xa = x1 + mlr + (mx+cw)*i ;
    for(var j=0 ; j<nr ; j++){
      var ya = y1 + mt + (my+ch)*j ;
      context_calendar.fillRect(xa, ya, cw, ch) ;
    }
  }
  
  context_calendar.fillStyle = 'black' ;
  x1 = 0.28*w ;
  x2 = 0.42*w ;
  y1 = 0.08*h ;
  y2 = 0.32*h ;
  r  = 0.06*w ;
  rounded_box_path(x1, y1, x2, y2, r, context_calendar) ;
  context_calendar.fill() ;
  
  x1 = 0.58*w ;
  x2 = 0.72*w ;
  y1 = 0.08*h ;
  y2 = 0.32*h ;
  r  = 0.06*w ;
  rounded_box_path(x1, y1, x2, y2, r, context_calendar) ;
  context_calendar.fill() ;
  
  
  context_calendar.fillStyle = 'white' ;
  x1 = 0.32*w ;
  x2 = 0.38*w ;
  y1 = 0.12*h ;
  y2 = 0.28*h ;
  r  = 0.03*w ;
  rounded_box_path(x1, y1, x2, y2, r, context_calendar) ;
  context_calendar.fill() ;
  
  x1 = 0.62*w ;
  x2 = 0.68*w ;
  y1 = 0.12*h ;
  y2 = 0.28*h ;
  r  = 0.03*w ;
  rounded_box_path(x1, y1, x2, y2, r, context_calendar) ;
  context_calendar.fill() ;
  
  
  // camera
  x1 = 0.1*w ;
  x2 = 0.7*w ;
  y1 = 0.3*h ;
  y2 = 0.8*h ;
  r  = 0.1*w ;
  rounded_box_path(x1, y1, x2, y2, r, context_camera) ;
  context_camera.fill() ;
  
  y3     = y1+0.1*h ;
  var y4 = y2-0.1*h ;
  y1 += 0.2*h ;
  y2 -= 0.2*h ;
  x1 = x2 ;
  x2 = 0.9*w ;
  context_camera.beginPath() ;
  context_camera.moveTo(x1,y1) ;
  context_camera.lineTo(x2,y3) ;
  context_camera.lineTo(x2,y4) ;
  context_camera.lineTo(x1,y2) ;
  context_camera.closePath() ;
  context_camera.fill() ;
  
  context_camera.lineWidth = 0.1*w ;
  context_camera.lineCap = 'round' ;
  context_camera.moveTo(0.5*w,0.45*h) ;
  context_camera.lineTo(0.4*w,0.15*h) ;
  context_camera.lineTo(0.2*w,0.15*h) ;
  context_camera.stroke() ;
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

function Get(id){ return document.getElementById(id) ; }
