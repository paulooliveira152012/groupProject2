var welcomeEl = document.querySelector('#welcome');
var saveAreaEl = document.querySelector('savedArea');
var logOutEl = document.querySelector("#logOut");
var eventsPageEl = document.querySelector("#eventsPage");

var populateSavedEvents = function() {
    $.ajax({
        type: "GET",
        url: "/api/posts",
        success: function(response) { 
            welcomeEl.innerHTML += `<p> Welcome ${response[0].user.username}!</p>`
            for (let index = 0; index < response.length; index++) {
                    var eventName = response[index].name
                    var eventLocation = response[index].address;
                    var eventDate = response[index].date_of_event;
                    var buyLink = response[index].post_url
                    savedArea.innerHTML += '<li><a class="buyLink" target="blank" href='+ buyLink + '>' +
                    '<div class="eventName">'+ eventName +
                    '</div><div class="eventLocation">'+ eventLocation +'</div>' +
                    '<div class="eventDate">' + eventDate + '</div>'+
                    '</a></li>' 
            }
        }
    });
}

var eventsPage = function() {
    window.location = '/index2.html'
};

var logOut = function() {
    $.ajax({
        type: "GET",
        url: "/api/users/logout",
        success: function() {
            window.location = '/index.html'
        }
    });
}

populateSavedEvents();
logOutEl.addEventListener("click", logOut);
eventsPageEl.addEventListener("click", eventsPage);