// JavaScript Document
var pages = [];
var numPages = 0;
var pageTime = 20;
var person;


var pageshow = document.createEvent("CustomEvent");

pageshow.initEvent("pageShow", false, true);


function addDispatch(num) {
    pages[num].dispatchEvent(pageshow);
    //num is the value i from the setTimeout call
    //using the value here is creating a closure
}


document.addEventListener("deviceready", intfunc, false);

function intfunc() {
    //device ready listener
    document.getElementById("btnCancel").addEventListener("click", cancel);
    document.getElementById("btnBack").addEventListener("click", backToHome);
//    document.addEventListener("backbutton",backToHome,false);
    
    
    
  
 
    pages = document.querySelectorAll('[data-role="page"]');
    numPages = pages.length;
    //alert("xxxx");
    
    //add the listener for pageshow to each page
    for (var p = 0; p < numPages; p++) {
        pages[p].addEventListener("pageShow", handlePageShow, false);
        //alert("xxxx");
        //pages[p].addEventListener("pageShow", maplocation, false);
    }
    //alert("xxxx");
    loadPage(null);
    
    
    
};




// back control
function backToHome() {
    loadPage("people");
};

function handlePageShow(ev) {
    ev.target.className = "active";
}

function loadPage(url) {
    if (url == null) {
        //home page first call
        pages[0].className = 'active';
        //alert("xxxx");
        //showContacts();
        
        history.replaceState(null, null, "#people");
    } else {
        for (var i = 0; i < numPages; i++) {
            pages[i].className = "hidden";
            //get rid of all the hidden classes
            //but make them display block to enable anim.
            if (pages[i].id == url) {
                pages[i].className = "show";
                //add active to the proper page
                history.pushState(null, null, "#" + url);
                setTimeout(addDispatch, pageTime, i);
            }
        }
        
    }
};

//cancel button
function cancel(ev) {
    document.querySelector("[data-role=modal]").style.display = "none";
    document.querySelector("[data-role=overlay]").style.display = "none";
};

//Hammer control single tap and double tap

$(function(){  
var people = document.getElementById("people");
var occasion = document.getElementById("occasion");

//Swipe
Hammer(people).on("swipeleft", function() {
    loadPage("occasion");
});

Hammer(occasion).on("swiperight", function() {
    loadPage("people");
});
});
	
function addHammerRecognizer(theElement) {
    // We create a manager object, which is the same as Hammer(), but without 	  //the presetted recognizers.
    
    var mc = new Hammer.Manager(theElement);
    
    
    // Tap recognizer with minimal 2 taps
    mc.add(new Hammer.Tap({
                          event: 'doubletap',
                          taps: 2,
                          threshold:5,
                          posThreshold:30
                          }));
    // Single tap recognizer
    mc.add(new Hammer.Tap({
                          event: 'singletap',
                          taps:1,
                          threshold:5
                          }));
    
    
    // we want to recognize this simulatenous, so a quadrupletap will be detected even while a tap has been recognized.
    mc.get('doubletap').recognizeWith('singletap');
    // we only want to trigger a tap, when we don't have detected a doubletap
    mc.get('singletap').requireFailure('doubletap');
    
    
    mc.on("singletap", function (ev) {
          //alert("sfdsfad");
          //console.log("ev"+ev);
          showDetails(ev);
          
          });
      //  mc.on("singletap", showDetails);
    mc.on("doubletap", function (ev) {
          //showDynamicMap(ev);
          loadPage("mapPage");
          showDynamicMap(ev);
          });
    
};

// find all contacts

function showContacts() {
    
    persons = [];
   // ev.preventDefault();
    
    if (localStorage.getItem("persons")) {
        persons = JSON.parse(localStorage.getItem("persons"));
        
        
        for (i = 0; i < persons.length; i++) {
            
            var li = document.createElement('li');
            li.innerHTML = persons[i].name;
            li.setAttribute('data-ref', persons[i].id);
            addHammerRecognizer(li);
            //alert(personCount);
            document.querySelector('[data-role=listview]').appendChild(li);
            
        }
        
        
    }
    
    
    
};

//show contact info details
function showDetails(ev) {
    
    persons = [];
    //ev.preventDefault();
    
    
    document.querySelector("[data-role=modal]").style.display = "block";
    document.querySelector("[data-role=overlay]").style.display = "block";
    
    var itemID = ev.target.getAttribute("data-ref");
    var item;
    
    
    
    var itemVal = "";
    
    itemVal += ev.target.innerHTML; //name
    if (localStorage.getItem("persons")) {
        persons = JSON.parse(localStorage.getItem("persons"));
        
        
        for (i = 0; i < persons.length; i++) {
            
            if (persons[i].id == itemID)
                displayInfo(persons[i]);
            
        }
        
        
    }
  
};

function displayInfo(person) {
    console.log(person);
    var info = '<ul>'
    if (person.displayName != null) {
        info += '<li>' + 'Name: ' + person.displayName + '</li>';
    }
    if (person.phoneNumbers != null) {
        for (var p = 0; p < person.phoneNumbers.length; p++) {
            info += '<li>' + 'Phone Numbers: ' + person.phoneNumbers[p].type + ' ' + person.phoneNumbers[p].value + '</li>'
        }
    }
    if (person.birthday != null) {
        info += '<li>' + 'Birthday: ' + new Date(person.birthday).toString() + '</li>'
    }
    if (person.addresses != null) {
        for (var j = 0; j < person.addresses.length; j++) {
            info += '<li>' + 'Address: ' + person.addresses[j].type + ' ' + person.addresses[j].streetAddress + '</li>'
        }
    }
    if (person.emails != null) {
        for (var e = 0; e < person.emails.length; e++) {
            info += '<li>' + 'Emails: ' + person.emails[e].value + '</li>'
        }
    }
    info += '</ul>';
    console.log(info);
    document.querySelector('#output').innerHTML = info;
};





function showDynamicMap(ev) {
    ev.preventDefault();
     document.querySelector("[data-role=overlay]").style.display = "block";
    // Try HTML5 geolocation
    
    persons = [];
    
    
    var personID = ev.target.getAttribute("data-ref");
    
   
    //
    //
    //
    //    var itemVal ="";
    //
    //itemVal+=ev.target.innerHTML;//name
    if (localStorage.getItem("persons")) {
        persons = JSON.parse(localStorage.getItem("persons"));
        
        
        for (i = 0; i < persons.length; i++) {
            
            if (persons[i].id == personID) {
                person = persons[i];
                personID_map = personID;
            }
            
        }
        
        
    }
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(scc, failed);
    }
    
    
    
  
    
    
    
    
    
    
    
    
    //document.querySelector("[data-role=modal] h3").innerHTML = itemVal+"map here";
};

function savePersonLocation(ev) {
    //alert(personID_map);
    console.log(ev.latLng);
    persons = [];
    
    
    //
    //
    //
    //    var itemVal ="";
    //
    //itemVal+=ev.target.innerHTML;//name
    if (localStorage.getItem("persons")) {
        persons = JSON.parse(localStorage.getItem("persons"));
        
        
        for (i = 0; i < persons.length; i++) {
            
            if (persons[i].id == personID_map) {
                //console.log(ev);
                persons[i].latitude = ev.latLng.lat();
                persons[i].longitude = ev.latLng.lng();
                //console.log(persons[i]);
                //alert(personID_map);
            }
            
        }
        //persons[personID_map].latitude = ev.latLng.D;
        //persons[personID_map].longitude = ev.latLng.k;
        
    }
   // console.log(JSON.stringify(persons));
    localStorage.setItem("persons", JSON.stringify(persons));
    
    
    
};

function scc(position) {
    
    
    var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var mapOptions = {
    zoom: 14,
    center: pos,
    mapTypeControlOptions: {
    mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.TERRAIN, google.maps.MapTypeId.SATELLITE]
    }
    }
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    google.maps.event.addListener(map, 'dblclick', addMarker);
    google.maps.event.addListener(map, 'dblclick', savePersonLocation);
     document.querySelector("[data-role=overlay]").style.display = "none";
    checkPersonLan();
    
}
function checkPersonLan(){
    console.log(person.latitude);
    console.log(person.longitude);
    if (person.latitude == null || person.longitude == null) {
        document.querySelector("#output").innerHTML = "Please double taps to add your current loctaion!";
        document.querySelector("[data-role=modal]").style.display = "block";
        document.querySelector("[data-role=overlay]").style.display = "block";
    } else {
        console.log(person);
        var location = new google.maps.LatLng(Number(person.latitude), Number(person.longitude));
         markerold = new google.maps.Marker({
                                               position: location,
                                               animation: google.maps.Animation.BOUNCE
                                               
                                               });
        markerold.setMap(map);
    
        
    }
    
}

//if geolocation failed
function failed() {
    handleNoGeolocation(true);
}

function handleNoGeolocation(errorFlag) {
    if (errorFlag) {
        var content = 'Error: The Geolocation service failed.';
    } else {
        var content = 'Error: Your browser doesn\'t support geolocation.';
    }
    
    
}

//add maker
function addMarker(ev) {
    if(marker){
        console.log(marker);
        marker.setMap(null);
        maker=null;
    }
    if(markerold){
        console.log(markerold);
        markerold.setMap(null);
        markerold=null;
    }
    
     marker = new google.maps.Marker({
                                        position: ev.latLng,
                                        animation: google.maps.Animation.BOUNCE
                                        
                                        });
     marker.setMap(map);
    //
   
    //    deleteMarkers();
    //    markers.push(marker);
    //    showMarkers();
    
};


// Sets the map on all markers in the array.
function setAllMap(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
};

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setAllMap(null);
};
function clearmarkerstest(){
    console.log(marker);
    if(marker){
        console.log(marker);
        marker.setMap(null);
    }
};

// Shows any markers currently in the array.
function showMarkers() {
    setAllMap(map);
};

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    markers = [];
};




//google.maps.event.addDomListener(window, 'load', initialize);




