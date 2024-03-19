/*
 * use p5.js to draw a clock on a 960x500 canvas
 */

// Image
let earthImage; 
let smallStarImage; 
let bigStarImage; 
let ufoImage; 
let fallStarImage; 
let jupiterImage; 
let moonImage; 
let sunImage; 
let rocketImage; 
let satelliteImage; 

// timepiece
let startTime; 
let count = false; 
let flashing = false; 
let transparency = 255; 
let add = -5; // Transparency change speed

let stars = []; // Define an array of stars
function  preload(){
    earthImage = loadImage("./earth.png");
    smallStarImage = loadImage("./smallStar.png");
    bigStarImage = loadImage("./star.png");
    sunImage = loadImage("./sun.png");
    moonImage = loadImage("./moon.png");
    jupiterImage = loadImage("./jupiter.png");
    ufoImage = loadImage("./UFO.png");
    rocketImage = loadImage("./rocket.png");
    fallStarImage = loadImage("./fallStar.png")
    satelliteImage = loadImage("./satellite.png");





}

let isSetup =false;

function draw_starfield() {
  
    for (let star of stars) { 
        fill(255,random(255));
        noStroke();
        ellipse(star.x, star.y, star.size, star.size);
    }
}

function checkAlarm() {
    if (debug_is_on && debugCheckbox.checked()) {
        hourSlider.removeAttribute('disabled');
        minSlider.removeAttribute('disabled');
        secSlider.removeAttribute('disabled');
        millisSlider.removeAttribute('disabled');

        H = hourSlider.value();
        M = minSlider.value();
        S = secSlider.value();
        mils = millisSlider.value();
    }
    else {
        // Get current time
        H = hour();
        M = minute();
        S = second();
        if (nextAlarm > 0) {
            now = millis();
            var millis_offset = nextAlarm - now;
            if (millis_offset < 0) {
                if (flashing == false) {
                    startTime = millis();
                    flashing = true;
                }
            }
            if (millis_offset < -10000) {
                // Turning off the alarm
                nextAlarm = -1;
                alarm = -1;
                turn_off_alarm();
            } else if (millis_offset < 0) {
                alarm = 0;
                alarmOverlaySlider.value(alarm);
                alarmActiveCheckbox.checked(true);
            } else {
                alarm = millis_offset / 1000.0;
                alarmOverlaySlider.value(alarm);
                alarmActiveCheckbox.checked(false);
            }
        } else {
            alarm = -1;
        }
        // Reckon the current millisecond,
        // particularly if the second has rolled over.
        // Note that this is more correct than using millis()%1000;
        if (prevSec != S) {
            millisRolloverTime = millis();
        }
        prevSec = S;
        mils = floor(millis() - millisRolloverTime);
        if (debug_is_on) {
            hourSlider.attribute('disabled', '');
            minSlider.attribute('disabled', '');
            secSlider.attribute('disabled', '');
            millisSlider.attribute('disabled', '');

            hourSlider.value(H);
            minSlider.value(M);
            secSlider.value(S);
            millisSlider.value(mils);
        }
    }
}

function draw_clock(obj) {

    if(isSetup==false){
        //Initialize Star
        for (let i = 0; i < 100; i++) { // Number of stars
            let starX = random(width);
            let starY = random(height);
            let starSize = random(1, 3); // Size of stars
            let star = {
                x: starX,
                y: starY,
                size: starSize
            };
            stars.push(star); // Add star information to the array
        }
        isSetup=true;
    }
// Drawing a Starry Sky Background
    background(25, 25, 112);
    imageMode(CENTER);
    draw_starfield();

    // Position and size of the sun
    let sunX = width / 2;
    let sunY = height / 2;
    let sunDiameter = 50;

    // Drawing the Sun
    fill(255, 204, 0); // sun color
    noStroke(); // No Border Drawing
    ellipse(sunX, sunY, sunDiameter, sunDiameter);

    // Define track radius
    let jupiterOrbit = 100; // Jupiter's orbital radius
    let earthOrbit = 150; // Earth's orbital radius
    let moonOrbit = 200; // Orbital radius of the Moon

    // Mapping time to planetary positions
    let jupiterAngle = map(obj.hours % 12, 0, 12, 0, TWO_PI) - HALF_PI;
    let earthAngle = map(obj.minutes, 0, 60, 0, TWO_PI) - HALF_PI;
    let moonAngle = map(obj.seconds, 0, 60, 0, TWO_PI) - HALF_PI;
    strokeWeight(2);
    // Plotting Jupiter's orbit
    noFill();
    stroke(255);
    ellipse(width / 2, height / 2, jupiterOrbit * 2);

    // Mapping the Earth's orbit
    ellipse(width / 2, height / 2, earthOrbit * 2);

    // Plotting the Moon's orbit
    ellipse(width / 2, height / 2, moonOrbit * 2);

    // Plotting Jupiter
    fill(205, 92, 92); // Jupiter color
    let jupiterX = width / 2 + cos(jupiterAngle) * jupiterOrbit;
    let jupiterY = height / 2 + sin(jupiterAngle) * jupiterOrbit;

    ellipse(jupiterX, jupiterY, 40, 40); // Jupiter size
    image(jupiterImage,jupiterX, jupiterY, 60, 60);

    // Mapping the Earth
    fill(0, 100, 255); // earth color
    let earthX = width / 2 + cos(earthAngle) * earthOrbit;
    let earthY = height / 2 + sin(earthAngle) * earthOrbit;
    ellipse(earthX, earthY, 30, 30); // earth's size
    image(earthImage,earthX, earthY, 50, 50);

    // moon
    fill(255); // moon color
    let moonX = width / 2 + cos(moonAngle) * moonOrbit;
    let moonY = height / 2 + sin(moonAngle) * moonOrbit;
    ellipse(moonX, moonY, 20,20); // moon siez
    image(moonImage,moonX, moonY, 50, 50);

    checkAlarm();
    // blinking
    if (flashing) {
        if (millis() - startTime < 5000) {
            transparency += add;
            if (transparency < 0) {
                add = 5;
            }
            if (transparency > 255) {
                add = -5;
            }
        } else {
            flashing = false;
            transparency = 255;
        }
        tint(255, transparency);
        // Show image
        image(ufoImage, 750, 150, ufoImage.width / 10 * 2.5, ufoImage.height / 10 * 2.5);
        image(fallStarImage, 850, 250, fallStarImage.width / 10 * 2.5, fallStarImage.height / 10 * 2.5);
        image(fallStarImage, 750, 400, fallStarImage.width / 10 * 2.3, fallStarImage.height / 10 * 2.3);
        image(bigStarImage, 70, 60, bigStarImage.width / 10 * 1.2, bigStarImage.height / 10 * 1.2);
        image(bigStarImage, 120, 250, bigStarImage.width / 10 * 1.2, bigStarImage.height / 10 * 1.2);
        image(bigStarImage, 280, 400, bigStarImage.width / 10 * 1.2, bigStarImage.height / 10 * 1.2);
        image(bigStarImage, 900, 410, bigStarImage.width / 10 * 1.2, bigStarImage.height / 10 * 1.2);
        image(smallStarImage, 360, 50, smallStarImage.width / 10 * 0.8, smallStarImage.height / 10 * 0.8);
        image(smallStarImage, 700, 50, smallStarImage.width / 10 * 0.8, smallStarImage.height / 10 * 0.8);
        noTint();
    } else {
        noTint();
        //Show image
        image(ufoImage, 750, 150, ufoImage.width / 10 * 2.5, ufoImage.height / 10 * 2.5);
        image(fallStarImage, 850, 250, fallStarImage.width / 10 * 2.5, fallStarImage.height / 10 * 2.5);
        image(fallStarImage, 750, 400, fallStarImage.width / 10 * 2.3, fallStarImage.height / 10 * 2.3);
        image(bigStarImage, 70, 60, bigStarImage.width / 10 * 1.2, bigStarImage.height / 10 * 1.2);
        image(bigStarImage, 120, 250, bigStarImage.width / 10 * 1.2, bigStarImage.height / 10 * 1.2);
        image(bigStarImage, 280, 400, bigStarImage.width / 10 * 1.2, bigStarImage.height / 10 * 1.2);
        image(bigStarImage, 900, 410, bigStarImage.width / 10 * 1.2, bigStarImage.height / 10 * 1.2);
        image(smallStarImage, 360, 50, smallStarImage.width / 10 * 0.8, smallStarImage.height / 10 * 0.8);
        image(smallStarImage, 700, 50, smallStarImage.width / 10 * 0.8, smallStarImage.height / 10 * 0.8);
    }
    // Showing the sun, satellites and rockets
    image(sunImage, canvasWidth / 2, canvasHeight / 2, 80, 80);
    image(satelliteImage, 180, 120, satelliteImage.width / 10 * 3, satelliteImage.height / 10 * 3);
    image(rocketImage, 180, 300, 587 / 10, 1021 / 10);

}
