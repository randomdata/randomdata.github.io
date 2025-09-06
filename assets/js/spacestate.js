function setStatus(open, lastUpdate) {
    const parentElement = document.querySelector('.space-state-wrapper');
    if(!parentElement) {
        return;
    }
    parentElement.innerHTML = "";
    const newElement = document.createElement('div');
    newElement.classList.add('space-state')

    const innerElement = document.createElement('div');
    const lastUpdateElement = document.createElement('div');
    lastUpdateElement.classList.add('space-state-last-update');

    const lastUpdatedText = dateFns.intlFormatDistance(new Date(lastUpdate * 1000), new Date())
    lastUpdateElement.innerHTML = "Last update: " + lastUpdatedText


    if(open) {
        newElement.classList.add('space-state-open')
        innerElement.innerText = "OPEN! 🎉";
        newElement.appendChild(innerElement);
    }

    if (!open) {
        newElement.classList.add('space-state-closed')
        innerElement.innerText = "Closed 😥";
        newElement.appendChild(innerElement);
    }

    parentElement.appendChild(newElement);
    parentElement.appendChild(lastUpdateElement);
}

function mainLoop() {
    fetch("https://randomdata.sandervankasteel.nl/index.json")
        .then(response => response.json())
        .then(function(data) {
            setStatus(data.state.open, data.state.lastchange);
        }).catch(function() {
            console.log("Failed to set space state")
        });
}

document.addEventListener("DOMContentLoaded", function(e) {
    setInterval(() => {
        mainLoop();
    }, 120000); // Check every 120 seconds / 2 minutes.

    mainLoop();
});