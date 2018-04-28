$(document).ready(function(){



    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBjcL9z0eAIUcRcsyhuJ_jgqB9UPW0F2m8",
        authDomain: "train-form-5cc9e.firebaseapp.com",
        databaseURL: "https://train-form-5cc9e.firebaseio.com",
        projectId: "train-form-5cc9e",
        storageBucket: "train-form-5cc9e.appspot.com",
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

        // Clear all text-boxes
        $('#name').val('');
        $('#destination').val('');
        $('#frequency').val('');
        $('#time').val('');

        return false;
    });


    trainsDb.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());

        // Store everything into a variable.
        var trainName = childSnapshot.val().name;
        var trainDestination = childSnapshot.val().destination;
        var trainFrequency = childSnapshot.val().frequency;
        var trainTime = childSnapshot.val().time;
        var trainStamp = childSnapshot.val().timestamp;

        var diffTime = moment().diff(moment.unix(trainTime), "minutes");
        var timeRemainder = moment().diff(moment.unix(trainTime), "minutes") % trainFrequency;
        var minutes = trainFrequency - timeRemainder;

        

        $(".table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + trainTime + " mins" + "</td><td>" + trainStamp + "</td><td>" + minutes + "</td></tr>");




  
    });
});


