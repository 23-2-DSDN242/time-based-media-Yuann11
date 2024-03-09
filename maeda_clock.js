// Update this function to draw you own maeda clock on a 960x500 canvas

function draw_clock(obj) {

  background(135,206,250);

 // Position and size of the sun
 let sunX = width / 2;
 let sunY = height / 2;
 let sunDiameter = 50; 

 // sun
 fill(255, 204, 0); // 太阳颜色
 noStroke(); // 不绘制边框
 ellipse(sunX, sunY, sunDiameter, sunDiameter);
  // 定义轨道半径
  let jupiterOrbit = 100; // 木星轨道半径
  let earthOrbit = 150; // 地球轨道半径
  let moonOrbit = 200; // 月球轨道半径

  // 将时间映射到行星位置
  let jupiterAngle = map(obj.hours % 12, 0, 12, 0, TWO_PI) - HALF_PI;
  let earthAngle = map(obj.minutes, 0, 60, 0, TWO_PI) - HALF_PI;
  let moonAngle = map(obj.seconds, 0, 60, 0, TWO_PI) - HALF_PI;

  // 绘制木星轨道
  noFill();
  stroke(255);
  ellipse(width / 2, height / 2, jupiterOrbit * 2);

  // 绘制地球轨道
  ellipse(width / 2, height / 2, earthOrbit * 2);

  // 绘制月球轨道
  ellipse(width / 2, height / 2, moonOrbit * 2);

  // 木星
  fill(205,92,92); // 木星颜色
  let jupiterX = width / 2 + cos(jupiterAngle) * jupiterOrbit;
  let jupiterY = height / 2 + sin(jupiterAngle) * jupiterOrbit;
  ellipse(jupiterX, jupiterY, 40, 40); // 木星大小

  // 地球
  fill(0, 100, 255); // 地球颜色
  let earthX = width / 2 + cos(earthAngle) * earthOrbit;
  let earthY = height / 2 + sin(earthAngle) * earthOrbit;
  ellipse(earthX, earthY, 30, 30); // 地球大小

  // 月球
  fill(255); // 月球颜色
  let moonX = width / 2 + cos(moonAngle) * moonOrbit;
  let moonY = height / 2 + sin(moonAngle) * moonOrbit;
  ellipse(moonX, moonY, 20,20); // 月球大小
  

 
}
