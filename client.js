var connection = {};

$(".finland").on("click", function(e) { handleClick(e) });
$(".us").on("click", function(e) { handleClick(e) });
$(".germany").on("click", function(e) { handleClick(e) });
$(".turkey").on("click", function(e) { handleClick(e) });
$(".france").on("click", function(e) { handleClick(e) });
$(".india").on("click", function(e) { handleClick(e) });
$(".china").on("click", function(e) { handleClick(e) });
$(".russia").on("click", function(e) { handleClick(e) });
$(".southafrica").on("click", function(e) { handleClick(e) });
$(".australia").on("click", function(e) { handleClick(e) });
$(".brazil").on("click", function(e) { handleClick(e) });

var currentLocation = {};

// Handle popup opening, use websockets to retrieve live data from webserver.
function handleClick(e){
    e.preventDefault();
    document.getElementById('popup').style.display = "block";
    
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
        var modal = document.getElementsByClassName('modal-internal')[0];
        var div = document.createElement("p")
        div.textContent = event.data
        modal.appendChild(div)
        modal.scrollTop = modal.scrollHeight;
    }
    
    setPopupHeader('Loading new tweets from ' + location.toUpperCase() + '. Please wait...');
}

function setPopupHeader(text) {
    var modalContent = document.getElementsByClassName('modal-content')[0];
    var p = modalContent.getElementsByClassName('inner-header')[0];
    p.textContent = text; 
}

$(".play-button").on("click", function(e){
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
    
    var modal = document.getElementsByClassName('modal-internal')[0];
    while (modal.firstChild) {
        modal.removeChild(modal.firstChild);
    }
}

// Handle popup closing when pressing x
$(".close").on("click", function(e){
    document.getElementById('popup').style.display = "none";
    connection.close();
});

// Handle popup closing when clicking somewhere outside the popup.
window.onclick = function(event) {
    var modal = document.getElementById('popup');
    if (event.target == modal) {
        modal.style.display = "none";
        connection.close();
    }
}