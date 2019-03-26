$(document).ready(function(){
 console.log("READY")
});

$(document).ready(function(){
 $.ajax({
     url: "https://icanhazip.com", success: function(result){
      $("#myip").html(result);
  }});
});


/* 
// https://developers.cloudflare.com/1.1.1.1/dns-over-https/json-format/
https://cloudflare-dns.com/dns-query?name=space.randomdata.nl&type=A
https://exana.io/tools/dns/space.randomdata.nl/a
*/
$(document).ready(function() {
    var data = {message: 'space.randomdata.nl'}
    $.ajax({
        url: 'https://cloudflare-dns.com/dns-query?name=space.randomdata.nl&type=A',
        type: 'GET',
        beforeSend: function(xhr){xhr.setRequestHeader('accept', 'application/dns-json');},
        success:function(){
          console.log("success");
        },
        error: function(){
          console.log("error");        
        }
    });
});

