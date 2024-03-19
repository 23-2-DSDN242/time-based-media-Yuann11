// Update this function to draw you own maeda clock on a 960x500 canvas

function draw_starfield() {
  
  for (let i = 0; i < 100; i++) { 
    let starX = random(width);
    let starY = random(height);
    let starSize = random(1, 3); 
    fill(255);
    noStroke();
    ellipse(starX, starY, starSize, starSize);
  }
}

function draw_clock(obj) {

  background(25, 25, 112);
  draw_starfield();

  let sunX = width / 2;
  let sunY = height / 2;
  let sunDiameter = 50; 

  
  fill(255, 204, 0); 
  noStroke(); 
  ellipse(sunX, sunY, sunDiameter, sunDiameter);

  // Define the track radius
  let jupiterOrbit = 100; 
  let earthOrbit = 150; 
  let moonOrbit = 200; 

  // Mapping time to planetary positions
  let jupiterAngle = map(obj.hours % 12, 0, 12, 0, TWO_PI) - HALF_PI;
  let earthAngle = map(obj.minutes, 0, 60, 0, TWO_PI) - HALF_PI;
  let moonAngle = map(obj.seconds, 0, 60, 0, TWO_PI) - HALF_PI;

  // Plotting Jupiter's orbit
  noFill();
  stroke(255);
  ellipse(width / 2, height / 2, jupiterOrbit * 2);

// Plotting the Earth's orbit

  ellipse(width / 2, height / 2, earthOrbit * 2);

// Plotting the Moon's orbit
  ellipse(width / 2, height / 2, moonOrbit * 2);

  // Plotting Jupiter
  fill(205, 92, 92); 
  let jupiterX = width / 2 + cos(jupiterAngle) * jupiterOrbit;
  let jupiterY = height / 2 + sin(jupiterAngle) * jupiterOrbit;
  ellipse(jupiterX, jupiterY, 40, 40); 

  // Plotting Earth
  fill(0, 100, 255); 
  let earthX = width / 2 + cos(earthAngle) * earthOrbit;
  let earthY = height / 2 + sin(earthAngle) * earthOrbit;
  ellipse(earthX, earthY, 30, 30); 

  // Moon
  fill(255); 
  let moonX = width / 2 + cos(moonAngle) * moonOrbit;
  let moonY = height / 2 + sin(moonAngle) * moonOrbit;
  ellipse(moonX, moonY, 20,20); 
  

 
}