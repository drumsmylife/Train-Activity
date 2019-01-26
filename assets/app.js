// Initialize Firebase
var config = {
    apiKey: "AIzaSyDuMLqgAjWlOXiElUyUzSPwqnVpQAvU2J8",
    authDomain: "train-scheduler-97a86.firebaseapp.com",
    databaseURL: "https://train-scheduler-97a86.firebaseio.com",
    projectId: "train-scheduler-97a86",
    storageBucket: "train-scheduler-97a86.appspot.com",
    messagingSenderId: "45923130778"
  };
  firebase.initializeApp(config);

  var trainData = firebase.database();
  // when addTrainBtn is clicked it will collect and store all form inputs into the variables
  $("#addTrainBtn").on("click",function(event){
      event.preventDefault();
      var trainName = $("#trainNameInput").val().trim();
      var destination = $("#destinationInput").val().trim();
      //turning first train input into a unit variable. Making everything appear on one line
      var firstTrain = moment($("#firstTrainInput").val().trim(),"HH:mm").subtract(1,"years").format("X");
      console.log("firstTrain", firstTrain);
      var frequency = $("#frequencyInput").val().trim();
      //created variable to push the data
      var newData = {
          name: trainName, 
          destination: destination,
          firstTrain: firstTrain,
          frequency: frequency
      
      }
      //pushes the var newData to firebase
      trainData.ref().push(newData);

      //lets user know train was added
      alert("train added!");

  
      return false;

  });

    // referencing FB database when train time is added.
    // calculate arrival using remainder and minutes/frequency.
    //  //appends info to schedule on document
  trainData.ref().on("child_added",function(snapshot){
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrain = snapshot.val().firstTrain;
    console.log("firstTrain2", firstTrain);
    console.log("frequency2", frequency);

    var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes,"m").format("hh:mm A");

    console.log("remainder", remainder);
    console.log("minutes", minutes);
    console.log("arrival", arrival);
    $("#trainTable > tbody").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");
  })