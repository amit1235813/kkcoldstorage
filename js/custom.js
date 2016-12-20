/*
 * You may think you know what the following code does.
 * But you dont. Trust me.
 * Fiddle with it, and youll spend many a sleepless
 * night cursing the moment you thought you'd be clever
 * enough to "optimize" the code below.
 * Now close this file and go play with something else.
 */ 


 $(document).ready(function() {

// Removes transition of Bootstrap navigation bar
    $('.collapse').on('show.bs.collapse hide.bs.collapse', function(e) {
        e.preventDefault();
    });
    $('[data-toggle="collapse"]').on('click', function(e) {
        e.preventDefault();
        $($(this).data('target')).toggleClass('in');
    });

// Toggles navigation bar off after clicking a link
$('.nav a').on('click', function(){
    $('.navbar-toggle').click()
});

// Stops auto-sliding after clicking on a slider
    $('#myCarousel,#myCarousel_2,#myCarousel_3,#myCarousel_4').carousel({
        interval: false
    }); 

// Counts to a number when the number appears. Uses waypoints.
    $('.number').counterUp({
        delay: 50,
        time: 2500
    });    

// Google map
    var map;

    var googleLatandLong = new google.maps.LatLng(31.0388489, 77.1111277);

    var mapOptions = { 
        zoom: 14,
        center: googleLatandLong,
        mapTypeId: google.maps.MapTypeId.ROaDMaP 
    };

    var mapDiv = document.getElementById("google_map");
    map = new google.maps.Map(mapDiv, mapOptions);

    var markerOptions = {
        position: googleLatandLong, 
        map: map,
        title: "KK Cold Storage", 
        clickable: true
        };
    
    var marker = new google.maps.Marker(markerOptions);
    
    $('#google_map').addClass('scrolloff'); // Set the pointer events to none on doc ready
    $('.map').on('click', function () {
        $('#google_map').removeClass('scrolloff'); // Set the pointer events true on click
    });

    // To disable pointer events when the mouse leaves the map
    $("#google_map").mouseleave(function () {
        $('#google_map').addClass('scrolloff');
    });

    var infoWindowOptions = { 
        content: "Plot No. 54, Industrial Area, Shogi", 
        position: googleLatandLong
    };

    var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
    
    google.maps.event.addListener(marker, "click", function() { 
        infoWindow.open(map);
    });

// To keep the center on window resize
    google.maps.event.addDomListener(window, "resize", function() {
       var center = map.getCenter();
       google.maps.event.trigger(map, "resize");
       map.setCenter(center); 
    });


// Goes to default mail with user's name, subject and body
    function sendMail() {
        // Email obfuscator script 2.1 by Tim Williams, University of Arizona
        // Random encryption key feature by Andrew Moulden, Site Engineering Ltd
        // This code is freeware provided these four comment lines remain intact
        // A wizard to generate this code is at http://www.jottings.com/obfuscator/
        { coded = "ppuJ9uXGXl1u1ZHHH@wAzls.F6A"
            key = "aJoBSelLhfOKM25DgGmjPCZr9kvzU63Iuscdnyq8ViRwxANbYTXHp4W7E0Qt1F"
            shift=coded.length
            link=""
            for (i=0; i<coded.length; i++) {
                if (key.indexOf(coded.charAt(i))==-1) {
                    ltr = coded.charAt(i)
                    link += (ltr)
                }
                else {     
                    ltr = (key.indexOf(coded.charAt(i))-shift+key.length) % key.length
                    link += (key.charAt(ltr))
                }
            }
        };

        var userSubject = $('input[name="subject"]').val();
        var userText = $('textarea[name="message"]').val();
        var userName = $('input[name="sender_name"]').val();
        var mailto_link = 'mailto:' + link 
                    + '?subject=' + userSubject 
                    + '&body=' 
                    + 'Name = ' + userName
                    + "%0D%0A%0D%0A" + encodeURIComponent(userText);
        win = window.open(mailto_link);
        // Prevents a new tab from opening
        if (win && win.open && !win.closed) win.close();
    };

    $('#form_button').click(function() {
        sendMail();
    });

// Slides up on scrolling
    $('.slides_up').addClass("hide_me").viewportChecker({
            classToRemove: 'hide_me',
            classToAdd: 'visible animated slideInUp',
            offset: 100
    });

// Zooms in on scrolling
    $('.zooms_in').addClass("hide_me").viewportChecker({
            classToRemove: 'hide_me',
            classToAdd: 'visible animated zoomIn',
            offset: 100
    });

// Slides in or out - the back-to-top button - alongwith the visibility of the intro section
    var amountScrolled = 300;
    $(window).scroll(function() {
        if ( $(window).scrollTop() > amountScrolled ) {
            $('#top_button').removeClass('hide_me animated slideOutDown').addClass('animated slideInUp').css('display','inline-block');
        } else {
            $('#top_button').removeClass('animated slideInUp').addClass('animated slideOutDown');
        }
    });

// Scroll up on clicking
    $('#top_button').on('click', function(){
        $('html, body').animate({scrollTop : 0},800);
    });

});

/////////////////////////////////////// This is a well commented line.
