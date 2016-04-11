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
        rowObj.quote = cells[i].title.$t;
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
    var randomNumber = Math.floor((Math.random() * database.length));
    
    // This if statement prevents the same quote from appearing twice in a row
    if ($("#quote").html() === database[randomNumber].quote) {
        return randomQuote();
    }
    return database[randomNumber];
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
        $("#quote").html(datum.quote);
        $("#movie_year").html(datum.movie + ' - ' + datum.year);
    });

});