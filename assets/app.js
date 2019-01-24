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
      var firstTrain = moment($("#firstTrainInput").val().trim(),"HH:mm").subtract(10,"years").format("X");
      var frequency = $("#frequencyInput").val().trim();

      var newData = {
          name: trainName, 
          destination: destination,
          firstTrain: firstTrain,
          frequency: frequency
      
      }
    trainData.ref().push(newData);

      alert("train added!");
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");
    return false;

  });