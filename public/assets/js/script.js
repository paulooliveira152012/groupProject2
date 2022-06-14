// Select elements from page for dom manipulation
var formEl = document.querySelector('form');
var selectOption = document.querySelector('select');
var listEl = document.querySelector('ul');
var stateHeader = document.querySelector('#list h1');
var loginFormEl = document.querySelector(".loginForm");
var signUpFormEl = document.querySelector(".signUpForm");

// Load Events from API to page and set header text to correct state
var populateEvents = function(json) {
    localStorage.setItem('last-loaded-events', JSON.stringify(json))
    stateHeader.innerText = "Events in " + json._embedded.events[0]._embedded.venues[0].state.name

    // Loop through 10 events and load them to the ul element as li elements
    for (let index = 0; index < 10; index++) {
        if (json._embedded.events.length > index) {
            var eventName = json._embedded.events[index].name
            var eventLocation = json._embedded.events[index]._embedded.venues[0].address.line1;
            var eventDate = json._embedded.events[index].dates.start.localDate;
            var buyLink = json._embedded.events[index].url
            listEl.innerHTML += '<li><a class="buyLink" target="blank" href='+ buyLink + '>' +
            '<div class="eventName">'+ eventName +
            '</div><div class="eventLocation">'+ eventLocation +'</div>' +
            '<div class="eventDate">' + eventDate + '</div>'
            // save icon that should appear at the end 
            "<i class='fa-solid fa-floppy-disk'></i>"
            '</a></li>'
        }
    }
}

// Handle form submit that calls API with selected state code
var handleFormSubmit = function(event) {
    event.preventDefault();
    var state = selectOption.value;
    listEl.innerHTML = '';

    $.ajax({
        type:"GET",
        url:"https://app.ticketmaster.com/discovery/v2/events.json?size=10&apikey=KDhnCyJ8Hg2vSizuLF0Xs4WtQFp2wQQo&keyword=rock&sort=date,asc&stateCode=" + state,
        async:true,
        dataType: "json",
        success: populateEvents,
        error: function(xhr, status, err) {
                    
        }
    })
}

// Function that loads the last viewed events to page on load.
var loadLocalStorage = function() {
    var events = localStorage.getItem('last-loaded-events');
    if (events) {
        var jsonEvents = JSON.parse(events);
        populateEvents(jsonEvents);
    }
}

// Loads local storage
loadLocalStorage();

var loginFormHandler = function(event){
    event.preventDefault();

    console.log(document.querySelector('[name="username"]').value, document.querySelector('[name="password"]').value);
    $.ajax({
        type: "POST",
        url: "/api/users/login",
        data: {
            username: document.querySelector('[name="username"]').value,
            password: document.querySelector('[name="password"]').value
        },
        success: function() {
            window.location = '/index2.html'
        }
    });
}

var signUpFormHandler = function (event){
    event.preventDefault();
    console.log('hi')
    $.ajax({
        type: "POST",
        url: "/api/users",
        data: {
            username: document.querySelector('[name="newUserId"]').value,
            password: document.querySelector('[name="newUserPassword"]').value
        },
        success: function() {
            window.location = '/index2.html'
        }
    });
}

// Handles form submission 
formEl.addEventListener('submit', handleFormSubmit)
loginFormEl.addEventListener("submit", loginFormHandler)
signUpFormEl.addEventListener("submit", signUpFormHandler)
