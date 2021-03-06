// set your channel id here
var channel_id = 886012;
// set your channel's read api key here if necessary
var api_key = 'A0VXRM8FPPKUT031';


function update(){
// get the data from thingspeak
$.getJSON('https://api.thingspeak.com/channels/' + channel_id + '/feed/last.json?api_key=' + api_key, function(data) {
    // Debugging
    console.log(data);
    
    // get the data point
    state = data.field1;

    // if there is a data point display it
    if (state > 0) {
    $("#status_div").removeClass("closed").addClass("open");
    $("#status_div").text("space open");
    }else{
    $("#status_div").removeClass("open").addClass("closed");
    $("#status_div").text("space closed");
    }
});
}

$(function(){
    update();
    setInterval(update,5000);
});

function setModal(){
    var IncludePre = "[*] spacestate-addon >> ";
    // Get the modal
    var modal = document.getElementById("state-modal");
    // Get the button that opens the modal
    var spacestate = document.getElementById("status_div");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    console.log(IncludePre + modal + ' ' + spacestate + ' ' + span);

    // When the user clicks on the button, open the modal 
    spacestate.onclick = function() {
    modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

const callback = function(mutationlist, observer){
    // For all changes on DOM
    for (let mutation of mutationlist){
        // If mutation has a noticable list of added nodes
        if (mutation.type === 'childList' && mutation.addedNodes.length > 1 ){
            // loop over all nodes to get the id="one" section
            for (let el of mutation.addedNodes){
                if (el.id === "one"){
                    setModal();
                }                
            }
        }
    }
}

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
const observer = new MutationObserver(callback);
observer.observe(document, {subtree: true, childList: true});