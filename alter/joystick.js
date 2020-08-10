function startJoystick() {

    document.getElementById('container').style.display = "block";
    var joystick = new VirtualJoystick({
                                       container	: document.getElementById('container'),
                                       mouseSupport	: true,
                                       });
    joystick.addEventListener('touchStart', function(){
                              
                              })
    joystick.addEventListener('touchEnd', function(){
                              
                              })

    setInterval(function(){
                
                if (joystick.left()) {
                leftTemp = true;
                } else {
                leftTemp = false;
                }
                if (joystick.right()) {
                    rightTemp = true;
                } else {
                    rightTemp = false;
                }
                if (joystick.up()) {
                upTemp = true;
                } else {
                upTemp = false;
                }
                if (joystick.down()) {
                downTemp = true;
                } else {
                downTemp = false;
                }
            }, 1/30 * 1000);
}
