var friendList = require("../data/friends.js");

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
        var matchName = '';
		var matchImage = '';
		var totalDifference = 10000;

        // total up user's score (difference)
        for (var i = 0; i < friendList.length; i++) {
            var diff = 0;
            for (var j = 0; j < newFriendScores.length; j++) {
                diff += (Math.abs(parseInt(friendList[i].scores[j]) - parseInt(newFriendScores[j])));
            }
            scoresArray.push(diff)
        }

        // if lowest difference, record the match
        if (diff < totalDifference) {
            totalDifference = diff;
            matchName = friendList[i].name;
            matchImage = friendList[i].photo;
        }

        //pushes new submission into the friendsList array
        friendList.push(newFriend);

		// Send appropriate response
        res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
        
    });
}
