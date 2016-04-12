// JSONURL containing movie quote data
var JSONURL = 'https://spreadsheets.google.com/feeds/list/1OEnWaZT7h4JygNfIWS74ONb6rEi80ZUKVncSfCua8aM/1/public/basic?alt=json';

// database variable
var database;
// databaseIndex -- keeps track of most recently displayed quote
var databaseIndex;
// switchColor -- stores current color index for the goodColor function
var switchColor;
// Tracks the last 4 colors to make sure colors do not repeat too frequently
var colorTracker = {
    colorTrackerIndex: 0,
    recentColors: [0, 0, 0]
}

function goodColor(numPossibleColors) {
    // Come up with new, random switchColor
    switchColor = Math.floor(Math.random() * numPossibleColors) + 1;
    // Check new switchColor against the recent 3 colors
    for (var i = 0; i < 3; i++) {
        if (switchColor === colorTracker.recentColors[i]) {
            return goodColor(numPossibleColors);
        }
    }
    // If the new color passes the test, add this color to the colorTracker list and increase the colorTrackerIndex
    colorTracker.recentColors[colorTracker.colorTrackerIndex] = switchColor;
    colorTracker.colorTrackerIndex = (colorTracker.colorTrackerIndex + 1) % 3;
    
    return switchColor;
}

// callback() calls data from spreadsheet
function callback(data){
    var rows = [];
    var cells = data.feed.entry;
    
    cells.forEach(function(individualCell) {
        var rowObj = {};
        rowObj.title = individualCell.title.$t;
        var rowCols = individualCell.content.$t.split(', fq');
        
        rowCols.forEach(function(individualCol) {
            var keyVal = individualCol.split('qq:');
            rowObj[keyVal[0].trim()] = keyVal[1].trim();
        });
        
        rows.push(rowObj);
    });
    
    return rows;
}

// returns random quote from newly-stored database
function randomQuote() {
    databaseIndex = Math.floor(Math.random() * database.length);
    
    // This if statement prevents the same quote from appearing twice in a row
    if ($("#quote").html() === database[databaseIndex].quote) {
        return randomQuote();
    }
    return database[databaseIndex];
}

// Returns random color
function randomColor() {
    var numberOfColors = 15;
    // Choose a color number while tracking and comparing to the recent colors
    var goodColorNumber = goodColor(numberOfColors);
    var color;
    
    // List of colors. See following link for more: http://www.yellowpipe.com/yis/tools/hex-to-rgb/color-converter.php
    switch (goodColorNumber) {
        // case 1 -- coral
        case 1: color = "rgb(255, 127, 80)";
            break;
        // case 2 -- cornflowerblue
        case 2: color = "rgb(100, 149, 237)";
            break;
        // case 3 -- chocolate
        case 3: color = "rgb(210, 105, 30)";
            break;
        // case 4 -- burlywood
        case 4: color = "rgb(222, 184, 135)";
            break;
        // case 5 -- cadetblue
        case 5: color = "rgb(95, 158, 160)";
            break;
        // case 6 -- darkseagreen
        case 6: color = "rgb(143, 188, 143)";
            break;
        // case 7 -- darkturquoise
        case 7: color = "rgb(143, 188, 143)";
            break;
        // case 8 -- goldenrod
        case 8: color = "rgb(218, 165, 32)";
            break;
        // case 9 -- lightpink
        case 9: color = "rgb(255, 182, 193)";
            break;
        // case 10 -- lightskyblue
        case 10: color = "rgb(135, 206, 250)";
            break;
        // case 11 -- mediumaquamarine
        case 11: color = "rgb(102, 205, 170)";
            break;
        // case 12 -- olivedrab
        case 12: color = "rgb(107, 142, 35)";
            break;
        // case 13 -- peru
        case 13: color = "rgb(205, 133, 63)";
            break;
        // case 14 -- plum
        case 14: color = "rgb(221, 160, 221)";
            break;
        // case 15 -- tomato
        case 15: color = "rgb(255, 99, 71)";
            break;
    }
    if ($('body').css("background-color") === color) {
        //alert(color + " is the same color as " + $('body').css("background-color") +". Sorry!");
        return randomColor();
    }
    return color;
}

// on page launch: 1. calls database-forming function AND 2. waits for random-quote button to be clicked
$(document).ready(function(){
    
    $.ajax({
        url:JSONURL,
        success: function(data){
            database = callback(data);
            
            var startQuote = randomQuote();
            $("#quote").fadeOut(1000, function() {
                $(this).text(startQuote.quote).fadeIn(1000);
            });
            
            $("#source_and_year").fadeOut(1000, function() {
                $(this).text(startQuote.source + ' - ' + startQuote.year).fadeIn(1000);
            });
        }
    });
    
    $('#randomQuoteButton').click(function(){
        var randoColor = randomColor();
        
        var datum = randomQuote();
        $("#quote").fadeOut(1000, function() {
            $(this).text(datum.quote).fadeIn(1000);
        });
        
        $("#source_and_year").fadeOut(1000, function() {
            $(this).text(datum.source + ' - ' + datum.year).fadeIn(1300);
        });
        
        /* animate the color transition with the help of:
        http://jqueryui.com/animate/
        AND
        https://github.com/jquery/jquery-color/
        AND the following plugins
            <script src="//code.jquery.com/jquery-1.10.2.js"></script>
            <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
        NOTE: jQuery 1.12 and jQuery 2.1.3 must be taken out of the <head> in order for this effect to work properly.
        */
        $("#home-contents").animate({
            color: randoColor
        }, 1000 );
        $("body, .quoteButtons").animate({
            backgroundColor: randoColor
        }, 1000 );
    });
    
    /* Tweet the current quote, using the following example --> http://debugmode.net/2012/06/27/how-to-post-a-tweet-using-javascript/ */
    $('#twitter_button').click(function () {
        alert('tweeting...');
        var textToTweet = database[databaseIndex].quote + " -- " + database[databaseIndex].source + ", " + database[databaseIndex].year;
        if (textToTweet.length > 140) {
            alert('Tweet should be less than 140 Chars');
        }
        else {
            var twtLink = 'http://twitter.com/home?status=' +encodeURIComponent(textToTweet);
            window.open(twtLink,'_blank');
        }
    });
    
    $('#fb_button').click(function () {
        alert('fbing...');
        FB.ui({
            app_id: '1676014795974337',
            method: 'feed',
            link: 'http://127.0.0.1:52908/index.html#',
            caption: 'Random_Quote_Machine',
            description: database[databaseIndex].quote + " -- " + database[databaseIndex].source + ", " + database[databaseIndex].year
        }, function(response){});
    });

});