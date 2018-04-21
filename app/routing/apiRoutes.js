var friendList = require("../data/friends.js");
var path = require('path');

module.exports = function (app) {
    app.get('/api/friends', function (req, res) {
        res.json(friendList);
    });

    app.post('/api/friends', function (req, res) {
        var newFriend = req.body;
        var newFriendScores = newFriend.scores;
        var scoresArray = [];
        var friendCount = 0;
        var bestMatch = 0;
        var differences = [];

        var matchName = '';
		var matchImage = '';
		var totalDifference = 10000;

        for (var i = 0; i < friendList.length; i++) {
            var diff = 0;
            for (var j = 0; j < newFriendScores.length; j++) {
                diff += (Math.abs(parseInt(friendList[i].scores[j]) - parseInt(newFriendScores[j])));
            }
            scoresArray.push(diff)
            console.log('diff = ' + diff);  
            
            // push totalDifference into differences array
            totalDifference = diff;
            // matchName = friendList[i].name;
            // matchImage = friendList[i].photo;

        }

        // If lowest difference, record the friend match
        // if (diff < totalDifference) {
        //     console.log('Closest match found = ' + diff);

        // }

        console.log(scoresArray);

        console.log(Math.min.apply(null, scoresArray));

        var bestMatchIndex = Math.min.apply(null, scoresArray);

        console.log(scoresArray.indexOf(bestMatchIndex) + " is the index");

        var matchIndex = scoresArray.indexOf(bestMatchIndex);

        console.log("match index = " + matchIndex)

        console.log("this is the match name: " + friendList[matchIndex].name);
        console.log("this is the match photo: " + friendList[matchIndex].photo);

        matchName = friendList[matchIndex].name;
        matchImage = friendList[matchIndex].photo;

        console.log(matchName);
        console.log(matchImage);

        // Add new user
		friendList.push(newFriend);

        // Send appropriate response
        res.json({status: 'OK', matchName: matchName, matchImage: matchImage});

    });

}
