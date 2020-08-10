

Parse.initialize("6hSDo4Y82Boba9vgHCL8URySWjsdX5z9Cuj5nPKo", "ZIdM2qQ9WxEMcXWxwwhMqT3a5c4qh0W6y4BP2rKN");
Parse.serverURL = 'https://parseapi.back4app.com/'
Parse.liveQueryServerURL = 'ws://tvcom.back4app.io'

var playerID
var player

var checkInputsInterval = 100  //milisegundos

var left = false
var right = false
var up = false
var down = false

var leftTemp = false
var rightTemp = false
var upTemp = false
var downTemp = false

function start() {
    
    startJoystick();
    
    window.setTimeout(checkInputs, checkInputsInterval);
    
    var name = document.getElementById("txtName").value
    var Player = Parse.Object.extend("Player");
    var newPlayer = new Player();
    var url = new URL(window.location.href);
    var roomID = url.searchParams.get("room");
    
    newPlayer.set("roomID", roomID);
    newPlayer.set("name", name);
    newPlayer.set("dead", false);
    
    newPlayer.set("left", left);
    newPlayer.set("right", right);
    newPlayer.set("up", up);
    newPlayer.set("down", down);
    
    newPlayer.save(null, {
                success: function(newPlayer) {
                   
                   var query = new Parse.Query("Player");
                   query.equalTo("objectId", newPlayer.id);
                   var subscription = query.subscribe();
                   
                   subscription.on('update', (object) => {
                                   if (object.get("dead")) {
                                       location.reload();
                                   }
                                   changeBackgroundColor(object.get("color"));
                                   });
                   
                   player = newPlayer;
                   showJumpPage();
                },
                error: function(player, error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and message.
                alert('Failed to create new object, with error code: ' + error.message);
                }
                });
}

function checkInputs() {
    
    var changed = false
    if (left != leftTemp) {
        left = leftTemp
        player.set("left", left)
        changed = true
    }
    if (right != rightTemp) {
        right = rightTemp
        player.set("right", right)
        changed = true
    }
    if (up != upTemp) {
        up = upTemp
        player.set("up", up)
        changed = true
    }
    if (down != downTemp) {
        down = downTemp
        player.set("down", down)
        changed = true
    }
    
    if (changed) {
        player.save(null, { success: function(player) {},
                    error: function(player, error) {}});
        changed = false;
    }
    window.setTimeout(checkInputs, checkInputsInterval);
}

function showJumpPage() {
    document.getElementById("startButton").style.display = "none";
    document.getElementById("divName").style.display = "none";
    document.getElementById("logo").style.display = "none";
    
    document.getElementById("divColor").style.display = "block";
    document.getElementById("joystick").style.display = "block";
}

function changeBackgroundColor(colorCode) {
    document.getElementById("divColor").style.backgroundColor = colorCode;
}
