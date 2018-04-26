$(document).ready(function(){

});

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBjcL9z0eAIUcRcsyhuJ_jgqB9UPW0F2m8",
    authDomain: "train-form-5cc9e.firebaseapp.com",
    databaseURL: "https://train-form-5cc9e.firebaseio.com",
    projectId: "train-form-5cc9e",
    storageBucket: "",
    messagingSenderId: "857072185147"
};
firebase.initializeApp(config);

var trainsDb = firebase.database();

$('#submit-btn').on('click', function () {
    var name = $('#name').val();
    var destination = $('#destination').val();
    var frequency = $('#frequency').val();
    var time = $('#time').val();

    var train = {
        name: name,
        destination: destination,
        frequency: frequency,
        time: time,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    };

    trainsDb.ref().push(train);



});


trainsDb.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    $('table').append(JSON.stringify(childSnapshot.val()));
});
