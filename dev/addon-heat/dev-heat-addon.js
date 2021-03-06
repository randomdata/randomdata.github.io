var getPublicIP = new Promise(function(resolve, reject){
  var url = "https://icanhazip.com";
  $.ajax({
    url: url, 
    success: function(result){
      resolve(String($.trim(result)));
    },
    error:function(data){
      reject("error in retrieving own ip");
    }
  });
});

/*
https://developers.cloudflare.com/1.1.1.1/dns-over-https/json-format/
https://cloudflare-dns.com/dns-query?name=space.randomdata.nl&type=A
https://exana.io/tools/dns/space.randomdata.nl/a
*/
var getSpaceIP = new Promise(function(resolve, reject){
  var url = "https://cloudflare-dns.com/dns-query";
  var query = "space.randomdata.nl"
  var queryType = 'A'
  $.ajax({
    url: url,
    type: "GET",
    data: { name: query, type: queryType },
    beforeSend: function(xhr){xhr.setRequestHeader('accept', 'application/dns-json');},
    success:function(data){
      resolve(String($.trim(data["Answer"][0]["data"])));
    },
    error:function(data){
      reject("error in retrieving Space IP");
    }    
  });
});

$(document).ready(function(){
  var addresses = {};

  getPublicIP.then(function(result) {
    console.log("Function completed succesfully, ip is: ", JSON.stringify(result))
    addresses.pub = result;
    $("#myip").html(result);
  });

  getSpaceIP.then(function(result) {
    console.log("function completed succesfully, space ip is:", JSON.stringify(result))
    addresses.space = result;
    $("#dns").html(result);
  })

  Promise.all([getPublicIP,getSpaceIP]).then(function(values) {
    if(addresses.space == addresses.pub ) {
      console.log('Public IP is the same as space IP');
      console.log('pub ip:', addresses.pub, 'space ip', addresses.space);
      // Add code to ping Heat server.
      /* TODO */
      // Add heating button.
      $('#topMenu').append("<li><a href='http://heat.space.randomdata.nl/?HEAT=1' class='button fit'>Heating</a></li>")
    } else {
      console.log('You are not in the space, or something went wrong.');
    };
  });

  if('x' == 'x') {
    console.log('show heating button');
    var buttonHtml = '<li><a href="http://heat.space.randomdata.nl/?HEAT=1" >Heating</a></li>';
    $("#button-heat").html(buttonHtml);
  }

});


/**************************************************
* Ping over AJAX hack
* source: https://gist.github.com/jerone/3487795
***************************************************/

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
