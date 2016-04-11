/* Goals:
    1. GENERATE THE DATABASE OF MOVIE QUOTES FROM GOOGLE SPREADSHEET DATA
    2. GENERATE RANDOM QUOTE EACH TIME A BUTTON IS CLICKED
    
    Credit for spreadsheet database --> Cris Noble: http://kovalent.co/blog/google-docs-as-a-backend/
*/
// JSONURL containing movie quote data
var JSONURL = 'https://spreadsheets.google.com/feeds/list/1OEnWaZT7h4JygNfIWS74ONb6rEi80ZUKVncSfCua8aM/1/public/basic?alt=json';

// database storage variable
var database;

// callback() calls data from spreadsheet
function callback(data){
    var rows = [];
    var cells = data.feed.entry;
    
    for (var i = 0; i < cells.length; i++){
        var rowObj = {};
        rowObj.title = cells[i].title.$t;
        var rowCols = cells[i].content.$t.split(', mq');
        for (var j = 0; j < rowCols.length; j++){
            var keyVal = rowCols[j].split(':');
            rowObj[keyVal[0].trim()] = keyVal[1].trim();
        }
        rows.push(rowObj);
    }
    
    //var raw = document.getElementById("demo");
    //raw.innerText = JSON.stringify(rows);
    //document.body.appendChild(raw);
    return rows;
}

// returns random quote from newly-stored database
function randomQuote() {
    var randomNumber = Math.floor(Math.random() * database.length);
    
    // This if statement prevents the same quote from appearing twice in a row
    if ($("#quote").html() === database[randomNumber].quote) {
        return randomQuote();
    }
    return database[randomNumber];
}

// Returns random color
function randomColor() {
    var numberOfColors = 5;
    var randomNumber = Math.floor(Math.random() * numberOfColors) + 1;
    var color;
    
    switch (randomNumber) {
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
        // case 6 -- 
        case 6: color = "";
            break;
        case 7: color = "";
            break;
        case 8: color = "";
            break;
        case 9: color = "";
            break;
        case 10: color = "";
            break;
        case 11: color = "";
            break;
        case 12: color = "";
            break;
        case 13: color = "";
            break;
        case 14: color = "";
            break;
        case 15: color = "";
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
            //var raw = document.getElementById("quote");
            //raw.innerText = JSON.stringify(database[1].quote);
            //document.body.appendChild(raw);
        }
    });

    $('#randomQuoteButton').click(function(){
        var datum = randomQuote();
        var randoColor = randomColor();
        $("#quote").html(datum.quote);
        $("#source_and_year").html(datum.source + ' - ' + datum.year);
        /* This works, but does not allow for a 'smooth transition' with the current jQuery
        $('body').css("background-color", randomColor());*/
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

});