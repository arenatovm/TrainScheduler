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
      firstTrain = $("#time-input").val().trim();
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
    //clears all of he text-boxes
    $("#train-input").text("");
    $("#destination-input").text("");
    $("#time-input").text("");
    $("#frequency-input").text("");
    
  });

  //create firebase event to retrieve trains form the satabase and a table row in the html when a user adds an entry
  database.ref().on("child_added", function(dataFromDatabase){
      //console log data to make sure it is retrieving results
    console.log(dataFromDatabase.val());

    //storage everything into a variable
    var tName = dataFromDatabase.val().dbTrainName;
    var tDestination = dataFromDatabase.val().dbTrainDestination;
    var tFirstTrain = dataFromDatabase.val().dbFirstTrain;
    var tFrequency = dataFromDatabase.val().dbTrainFrequency;

    //display results inside the table
    var tr = $("<tr>");
    var tdName = $("<td>").text(tName);
    var tdDestination = $("<td>").text(tDestination);
    var tdFrequency= $("<td>").text(tFrequency);
    var tdNextArrival = $("<td>").text("to be calculated");
    var tdMinutesAway = $("<td>").text("to be calculated");
    //create vars to hold table elements and content
    tr.append(tdName, tdDestination, tdFrequency, tdNextArrival,tdMinutesAway);
    //append all table data(td) to the table row (tr)
    //append to tbody element
    $("tbody").append(tr);
    

  });