function getPublicIP(callback){
  var url = "https://icanhazip.com";
  $.ajax({
    url: url, 
    success: function(result){
      callback(String($.trim(result)));
    },
    error:function(data){
      console.log("error");
    }
  });
}

function getSpaceIP(callback){
  var url = "https://cloudflare-dns.com/dns-query";
  var query = "space.randomdata.nl"
  var queryType = 'A'
  $.ajax({
    url: url,
    type: "GET",
    data: { name: query, type: queryType },
    beforeSend: function(xhr){xhr.setRequestHeader('accept', 'application/dns-json');},
    success:function(data){
      console.log("success");
      /* console.log(data) */
      callback(String($.trim(data["Answer"][0]["data"])));
    },
    error:function(data){
      console.log("error");
    }    
  });
}

function getData(callback){
  return [ getPublicIP(func), getSpaceIP(func)]
}

$(document).ready(function(){
 console.log("READY")
});

$(document).ready(function(){
  let array = {};
  let pub = (function(){
    getPublicIP(function(returnvalue){
      /* console.log(returnvalue); */
      $("#myip").html(returnvalue);
      /* array.pub = returnvalue; */
      return returnvalue
    });
  });

  getSpaceIP(function(returnvalue){
    /* console.log(returnvalue); */
    array.space = returnvalue;
    $("#dns").html(returnvalue);
  });

  /* TODO Stuck at the following code */
  console.log(array);
  var str = Object.keys(array);
  console.log('pub ip:', array["pub"], 'space ip', array.space, 'values:', str);
  console.log('pub ip:', $(pub), 'space ip', '');

  if(array["pub"] == array["space"]) {
    console.log('Public IP is the same as space IP');
  }
});

/*
$(document).ready(function(){
 $.ajax({
     url: "https://icanhazip.com", success: function(result){
      SPACE_IP = result;
      $("#myip").html(result);
  }});
});
*/

/*
https://developers.cloudflare.com/1.1.1.1/dns-over-https/json-format/
https://cloudflare-dns.com/dns-query?name=space.randomdata.nl&type=A
https://exana.io/tools/dns/space.randomdata.nl/a
*/

/*
$(document).ready(function() {
    var data = {message: 'space.randomdata.nl'}
    $.ajax({
        url: 'https://cloudflare-dns.com/dns-query?name=space.randomdata.nl&type=A',
        type: 'GET',
        beforeSend: function(xhr){xhr.setRequestHeader('accept', 'application/dns-json');},
        success:function(data){
          console.log("success");
          PUBLIC_IP = ["Answer"][0]["data"];
          $("#dns").html(data["Answer"][0]["data"]);
        },
        error: function(){
          console.log("error");        
        }
    });
});
*/



/************************
Ping over AJAX hack
************************/

$(document).ready(function(){
  $.Ping("http://heat.space.randomdata.nl", 1000).done(function (success, url, time, on) {
    console.log("ping done", arguments);
  }).fail(function (failure, url, time, on) {
    console.log("ping fail", arguments)
  });
});

/* Extending Ping */
$.extend($, {
 Ping: function Ping(url, timeout) {
  timeout = timeout || 1500;
  var timer = null;

  return $.Deferred(function deferred(defer) {

   var img = new Image();
   img.onload = function () { success("onload"); };
   img.onerror = function () { success("onerror"); };  // onerror is also success, because this means the domain/ip is found, only the image not;

   var start = new Date();
   img.src = url += ("?cache=" + +start);
   timer = window.setTimeout(function timer() { fail(); }, timeout);

   function cleanup() {
    window.clearTimeout(timer);
    timer = img = null;
   }

   function success(on) {
    cleanup();
    defer.resolve(true, url, new Date() - start, on);
   }

   function fail() {
    cleanup();
    defer.reject(false, url, new Date() - start, "timeout");
   }

  }).promise();
 }
});
