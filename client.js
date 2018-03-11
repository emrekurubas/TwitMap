var connection = {};
var currentLocation = {};
var clickEventName = "click";
var popup = document.getElementById('popup');
var modalInternal = document.getElementsByClassName('modal-internal')[0];

var countries = [
    'finland',
    'us',
    'germany',
    'turkey',
    'france',
    'india',
    'china',
    'russia',
    'australia',
    'southafrica',
    'brazil'
];

for (i = 0; i < countries.length; i++) { 
    $('.' + countries[i]).on(clickEventName, function(e) { handleClick(e) });
}

// Handle popup opening, use websockets to retrieve live data from webserver.
function handleClick(e){
    e.preventDefault();
    popup.style.display = "block";
    
    resetPopup();
    
    var location = e.currentTarget.className;
    initializeWebSocket(location);
}

function initializeWebSocket(location) {
    connection = new WebSocket("ws://" + window.location.hostname + ":8081")
    connection.onopen = function (e) { connection.send(location); }; 
    currentLocation = location;
    
    connection.onclose = function(e) {
        if (connection.readyState == 3) {
            var message = "Connection lost.";
            console.error(message);
            setPopupHeader(message);    
        }
    }
    
    connection.onerror = function () {
        var message = "An error occured.";
        console.error(message);
        setPopupHeader(message);
    }
    
    connection.onmessage = function (event) {
        var div = document.createElement("p")
        div.textContent = event.data
        modalInternal.appendChild(div)
        modalInternal.scrollTop = modalInternal.scrollHeight;
    }
    
    setPopupHeader('Loading new tweets from ' + location.toUpperCase() + '. Please wait...');
}

function setPopupHeader(text) {
    var modalContent = document.getElementsByClassName('modal-content')[0];
    var p = modalContent.getElementsByClassName('inner-header')[0];
    p.textContent = text; 
}

$(".play-button").on(clickEventName, function(e){
    var isPlaying = e.currentTarget.textContent == "Pause";
    if (isPlaying) {
        connection.close();
        e.currentTarget.textContent = "Play";
        setPopupHeader('Connection to ' + currentLocation.toUpperCase() + ' has paused.');
    }
    else {
        e.currentTarget.textContent = "Pause";
        initializeWebSocket(currentLocation);
    }
});


function resetPopup() {
    playButton = document.getElementsByClassName('play-button')[0];
    playButton.textContent = "Pause";
    
    while (modalInternal.firstChild) {
        modalInternal.removeChild(modalInternal.firstChild);
    }
}

// Handle popup closing when pressing x
$(".close").on(clickEventName, function(e){
    popup.style.display = "none";
    connection.close();
});

// Handle popup closing when clicking somewhere outside the popup.
window.onclick = function(event) {
    var modal = popup;
    if (event.target == modal) {
        modal.style.display = "none";
        connection.close();
    }
}