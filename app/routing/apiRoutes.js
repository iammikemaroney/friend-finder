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

        for (var i = 0; i < friendList.length; i++) {
            var temp = 0;
            for (var j = 0; j < newFriendScores.length; j++) {
                temp += (Math.abs(parseInt(friendList[i].scores[j]) - parseInt(newFriendScores[j])));
            }
            scoresArray.push(temp)       
            
        }
        for (var i = 0; i < scoresArray.length; i++) {
            if (scoresArray[i] <= scoresArray[bestMatch]) {
                bestMatch = i;
            }
        }
 
        //return bestMatch data
        var bff = friendList[bestMatch];
        res.json(bff);
 
        //pushes new submission into the friendsList array
        friendList.push(newFriend);
    });

}
