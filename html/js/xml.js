function loadXMLDoc(dname){
  if(window.XMLHttpRequest){
    xhttp = new XMLHttpRequest() ;
  }
  else{
    xhttp = new ActiveXObject('Microsoft.XMLHTTP') ;
  }
  xhttp.open('GET',dname,false) ;
  xhttp.send() ;
  return xhttp.responseXML ;
}
function loadXMLString(txt){
  if(window.DOMParser){
    parser = new DOMParser() ;
    xmlDoc = parser.parseFromString(txt,"text/xml") ;
  }
  else{ // code for IE
    xmlDoc = new ActiveXObject("Microsoft.XMLDOM") ;
    xmlDoc.async = false ;
    xmlDoc.loadXML(txt) ; 
  }
  return xmlDoc;
}

var xmlDoc = undefined ;
var source = '<doc></doc>' ;
if(window.DOMParser){
  var parser = new DOMParser();
  xmlDoc = parser.parseFromString(source, 'text/xml') ;
}
else{ // Internet Explorer
  xmlDoc = new ActiveXObject('Microsoft.XMLDOM') ;
  xmlDoc.async = false ;
  xmlDoc.loadXML(source) ;
}

function print_xml(element, depth){
  if(depth==undefined) depth = 0 ;
  var string = [] ;
  var indent = '' ;
  for(var i=0 ; i<depth ; i++){ indent = indent + '  ' ; }
  string.push(indent + '<' + element.nodeName) ;
  for(var i=0 ; i<element.attributes.length ; i++){
    if(element.attributes.length>1) string.push('\n ' + indent) ;
    string.push(' ' + element.attributes[i].name + '="' + element.attributes[i].value + '"') ;
  }
  string.push('>') ;
  for(var i=0 ; i<element.childNodes.length ; i++){
    string.push('\n' + print_xml(element.childNodes[i], depth+1)) ;
  }
  if(element.childNodes.length>0) string.push(indent) ;
  string.push('</'+element.nodeName+'>\n') ;
  string = string.join('') ;
  string = string.replace('\n\n','\n') ;
  return string ;
}

function xml_add_fields(object, element){
  for(var key in object.fields){
    if(key=='year' || key=='month' || key=='day' || key=='hour') continue ;
    element.setAttribute(key, object.fields[key]) ;
  }
}
function get_fields_from_xml(element){
  var fields = [] ;
  if(!element.attributes) return ;
  for(var i=0 ; i<element.attributes.length ; i++){
    fields[element.attributes[i].name] = element.attributes[i].value ;
  }
  return fields ;
}
function xml_add_array(arr, element, name){
  if(arr==undefined) return ;
  var list_element = xmlDoc.createElement(name+'_list') ;
  for(var i=0 ; i<arr.length ; i++){
    var instance_element = xmlDoc.createElement(name) ;
    instance_element.setAttribute('name', arr[i]) ;
    list_element.appendChild(instance_element) ;
  }
  element.appendChild(list_element) ;
}
function get_array_from_xml(element, name){
  var results = [] ;
  if(element.childNodes==undefined) return results ;
  for(var i=0 ; i<element.childNodes.length ; i++){
    var ch = element.childNodes[i] ;
    if(ch.nodeName==name+'_list'){
      for(var j=0 ; j<ch.childNodes.length ; j++){
        var ch2 = ch.childNodes[j] ;
        if(ch2.nodeName==name && ch2.hasAttribute('name')) results.push(ch2.getAttribute('name')) ;
      }
    }
  }
  return results ;
}
