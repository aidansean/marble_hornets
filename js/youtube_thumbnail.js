var player = null ;
var margin = 0 ;
function start(){
  player = Get('player') ;
  Get('capture').addEventListener('click', make_thumbnail) ;
}

function canvas_from_element(element, id, container){
  if(Get(id)!=undefined && Get(id)!=null) return false ; // Check to make sure id is not already used
  if(container==undefined || container==null) container = document.getElementsByTagName('body')[0] ;
  if(element==undefined || element==null) return false ;
  //var w = element.offsetWidth  ;
  //var h = element.offsetHeight ;
  var id2 = element.id ;
  var w = $('#'+id2).outerWidth() ;
  var h = $('#'+id2).outerHeight() ;
  var m = margin ;
  var render = element.innerHTML ;
  
  // Hint from http://stackoverflow.com/questions/21049179/drawing-an-svg-containing-html-in-a-canvas-with-safari
  //var data = 'data:image/svg+xml,'+'<svg xmlns="http://www.w3.org/2000/svg" width="'+ (w+2*m) +'" height="'+ (h+2*m) +'">' +
  var data = '<svg xmlns="http://www.w3.org/2000/svg" width="'+ (w+2*m) +'" height="'+ (h+2*m) +'">' +
             '<foreignObject width="100%" height="100%">' +
               '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:20pt;padding:0.1em">' +
                 render +
               '</div></foreignObject></svg>';
  var DOMURL = self.URL || self.webkitURL || self ;
  var img = new Image() ;
  var svg = new Blob([data], {type: "image/svg+xml;charset=utf-8"}) ;
  var url = DOMURL.createObjectURL(svg) ;
  img.onload = function(){
    var canvas = document.createElement('canvas') ;
    canvas.width  = w+2*m ;
    canvas.height = h+2*m ;
    canvas.style.width  = w+2*m ;
    canvas.style.height = h+2*m ;
    canvas.id = id ;
    var context = canvas.getContext('2d') ;
    context.fillStyle = 'rgb(255,255,255)' ;
    context.drawImage(img, 0, 0, w, h, m, m, 1*w, 1*h) ;
    container.appendChild(canvas) ;
    
    DOMURL.revokeObjectURL(url) ; // Garbage collection
  } ;
  img.src = url ;
}

function make_thumbnail(){
  canvas_from_element(player, 'id1', null) ;
}

function Get(id){ return document.getElementById(id) ; }
