/* var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var responsObject = JSON.parse(this.responseText);
    var question = responsObject.results[0].question;
    var answers = responsObject.results[0].incorrect_answers;
    answers.push(responsObject.results[0].correct_answer);

    console.log("the question is", question);
    console.log("answer are", answers);
  }
};

xhttp.open("GET", "https://opentdb.com/api.php?amount=1");

xhttp.send(); */


////

function get_countries(){
  $.ajax({
    url: "https://restcountries.com/v3.1/all",
    type: "GET",
    dataType: "json",
    success: function(data){
      populate_countries(data);
      if(localStorage.selectedCountries){
        $("#countries").val(localStorage.selectedCountries);
        var countryName = $("#countries option:selected").text();

        get_holidays(localStorage.selectedCountries, countryName);
      }
    },
    error: function(){
      console.log("error");
    }
  });
}

function populate_countries(countires){
  for(var a = 0; a < countires.length; a++){
    //console.log(countires[a].name.common);
    //console.log(countires[a].cca3);
    var countryOption = "<option value ='" + countires[a].cca3 +"'>"+ countires[a].name.common +"</option>"
    document.getElementById("countries").innerHTML += countryOption;
    
  }
}

$("#countries").change(function(){
  //console.log("change");
  localStorage.setItem("selectedCountries", $("#countries").val());
  var countryName = $("#countries option:selected").text();
  get_holidays($("#countries").val(), countryName);
})
get_countries();



/*
////////////////// 2 /////////////////////
var courses = '[{"title": "PHP", "reviews": []}, {"title": "javascript", "reviews": [5,5,4.5]},{"title": "phython", "reviews": [5,5,4.5,5,5,4.5,3,4,2]}]';

function average_reviews(data){
  var courses = JSON.parse(data);
  //console.log(courses);
  for(var a = 0; a < courses.length; a++){
    var reviews = courses[a].reviews;

    try{
      if (reviews.length == 0) {
        throw "No reviews";
      }else if(reviews.length < 5){
        throw "Not enught reviews";
      }

      var sumReviews = 0;
      for (let b = 0; b < reviews.length; b++) {
        sumReviews += reviews[b];
        
      }

      var averageReviews = sumReviews / reviews.length;
      courses[a].averageRating = averageReviews.toFixed(1);
      document.getElementById("review").innerHTML = "Review " + courses[a].averageRating ;
    } catch(err){
      courses[a].averageRating = err;

    }
  }
  //console.log(courses);
  return JSON.stringify(courses);
  

}
average_reviews(courses);
*/


/////////////3///////////
//93464d32-24a4-44e2-9800-76f9130941d3
//https://holidayapi.com/v1/holidays?pretty&key=93464d32-24a4-44e2-9800-76f9130941d3&country=BD&year=2023

var api_key = "93464d32-24a4-44e2-9800-76f9130941d3";

function get_holidays(countryCode, countryName){

  var previousYear = new Date().getFullYear() - 1;
  $.ajax({
    url: "https://holidayapi.com/v1/holidays?pretty&key=" + api_key + "&country=" + countryCode + "&year=" + previousYear,
    //url: "https://holidayapi.com/v1/holidays?pretty&key=93464d32-24a4-44e2-9800-76f9130941d3&country=BD&year=2023",
    type: "GET",
    dataType: "json",
    success: function(data){
      var holidays = data.holidays;

      $("#selectedCountry").text(countryName);
      $("#previousYear").text(previousYear);

      $("#holidayList").html("");

      for(var a = 0; a < holidays.length; a++){
        if(holidays[a].public){
          var listItem = "<li>";
          listItem += holidays[a].date + " - " + holidays[a].name;
          listItem += "</li>";

          $("#holidayList").append(listItem);

        }
      }
    },
    error: function(){
      console.log("error");
    }
  });
}
//get_holidays(localStorage.selectedCountries);
