window.onload = function(){
    
    var container = document.getElementById("widguana-container");
    var content = '';
    /* Style */
    content += '<style>';
    content += '#widguana-overlay {visibility: hidden; position: absolute; left: 0px; top: 0px; width:100%; height:100%; text-align:center; z-index: 1000; background:rgba(224, 224, 224, 0.8);}';
    content += '#widguana-overlay div {width:400px;margin: 50px auto;background-color: #fff;border:1px solid #000;padding:15px;text-align:center;}';
    content += '#widguana-overlay div label,#widguana-overlay div select{display: block;width: 100%;}';
    content += '#widguana-bttn {display: block; margin-top: 15px; width: 100%}';
    content += '#widguana-response { word-wrap: break-word; }';
    content += '</style>';
    
    /* HTML */
    content += '<form id="widguana-1">';
    content += '<button type="button"  style="padding: 10px; height: 50px;" type="button" onclick="overlay()" autofocus>WIDGUANA</button>';
    content += '</form><div id="widguana-overlay">';
    content += '<div><h3>WidGuana</h3>';
    content += '<p>Sends HTTP Request To Iguna Agent.</p>';
    content += '<label>Select Predefined Agent and Method</label>';
    content += '<select id="widguana-requests">';
    content += '<option value="">SuperNET API</option>';
    content += '<option value="/api/ramchain/getinfo?">Iguana Info</option>';
    content += '<option value="/api/SuperNET/help?">Supernet Help</option>';
    content += '<option value="/api/hash/NXT?passphrase=sometext" selected>Hash NXT, passphrase:sometext</option>'
    content += '</select></form>';
    content += '<h4>Send Request</h4>';
    content += '<button class="widguana-bttn" type="button" onclick="httpGetIguna()">Send XMLHttpRequest to Iguana</button>';
    content += '<h4>Response:</h4>';
    content += '<p id="widguana-response"></p>';
    content += 'Click here to [<a href="#" onclick="overlay()">close</a>]';
    content += '</div></div>';
    
                  
    container.innerHTML = content;
}


/* Modal */
function overlay() {
	el = document.getElementById("widguana-overlay");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
}


/* XMLHttpRequest */
function httpGetIguna() {
  var xhttp;
  var request;
  var el = document.getElementById("widguana-requests");
  var selected = el.options[el.selectedIndex].value;
  var response_cont = document.getElementById("widguana-response");
  
  request = '//127.0.0.1:7778' + selected ;
  
  
  if (window.XMLHttpRequest){
         xhttp = new XMLHttpRequest();
  }else{
       xhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  xhttp.onreadystatechange = function() {    
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        
        //response.innerHTML = '';  
        //response = JSON.parse(xhttp.responseText);
        response = xhttp.responseText;
        console.log(response);
        response_cont.innerHTML = response;
         
    }    
  };
  
  xhttp.open("GET", request, true);
  
  xhttp.onprogress = function(){
    response.innerHTML = 'Status: ' + xhttp.status;
  }
  
    xhttp.send();
}
