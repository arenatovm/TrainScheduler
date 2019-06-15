var firebaseConfig = {
  apiKey: "AIzaSyAy2BThoJ1yHEt5BcTsCg5cWe9lM2t3KXI",
  authDomain: "traintime-32942.firebaseapp.com",
  databaseURL: "https://traintime-32942.firebaseio.com",
  projectId: "traintime-32942",
  storageBucket: "traintime-32942.appspot.com",
  messagingSenderId: "887135725325",
  appId: "1:887135725325:web:62717de9d22cad66"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  //global variables
  var trainName;
  var trainDestination;
  var trainFrequency;
  var firstTrain;
  var trainNextArrival;
  var trainMinutesAway;

  $("#add-train").on("click", function(event){
      //prevent form from pre-loading
      event.preventDefault(event);
      //capture input from form fileds
      trainName = $("#train-input").val().trim();
      trainDestination = $("#destination-input").val().trim();
      firstTrain = $("#start-input").val().trim();
      trainFrequency = $("#frequency-input").val().trim();
  
    //log everything to console
    console.log(trainName);
    console.log(trainDestination);
    console.log(firstTrain);
    console.log(trainFrequency);

    //uploads train data to the database
    database.ref().push({
        dbTrainName: trainName,
        dbTrainDestination: trainDestination,
        dbFirstTrain: firstTrain,
        dbTrainFrequency: trainFrequency
    })
    //alert :Train successfully added"
    alert("Train successfully added")
    //clears all of the text-boxes
    $("#train-input").text("");
    $("#destination-input").text("");
    $("#start-input").text("");
    $("#frequency-input").text("");
    
  });

  //create firebase event to retrieve trains form the database and a table row in the html when a user adds an entry
  database.ref().on("child_added", function(dataFromDatabase){
      //console log data to make sure it is retrieving results
    console.log(dataFromDatabase.val());

    //storage everything into a variable
    var tName = dataFromDatabase.val().dbTrainName;
    var tDestination = dataFromDatabase.val().dbTrainDestination;
    var tFirstTrain = dataFromDatabase.val().dbFirstTrain;
    var tFrequency = dataFromDatabase.val().dbTrainFrequency;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(tFirstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    //display results inside the table
    var tr = $("<tr>");
    var tdName = $("<td>").text(tName);
    var tdDestination = $("<td>").text(tDestination);
    var tdFrequency= $("<td>").text(tFrequency);
    var tdNextArrival = $("<td>").text(nextTrain);
    var tdMinutesAway = $("<td>").text(tMinutesTillTrain);
    //create vars to hold table elements and content
    tr.append(tdName, tdDestination, tdFrequency, tdNextArrival,tdMinutesAway);
    //append all table data(td) to the table row (tr)
    //append to tbody element
    $("tbody").append(tr);
    

  });