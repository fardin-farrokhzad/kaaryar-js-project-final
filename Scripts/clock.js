const canvas = document.getElementById("clockCanvas");
const ctx = canvas.getContext("2d");
const digitalClock = document.getElementById("digitalClock");
const radius = canvas.width / 2;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

function drawClock() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();

  // Translate to center
  ctx.translate(centerX, centerY);

  // Draw clock face
  ctx.beginPath();
  ctx.arc(0, 0, radius - 10, 0, 2 * Math.PI);
  ctx.fillStyle = "#fff";
  ctx.fill();

  // Draw numbers
  ctx.font = "20px Arial";
  ctx.fillStyle = "#000";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (let num = 1; num <= 12; num++) {
    const angle = ((num * 30 - 90) * Math.PI) / 180; // 30 degrees per hour, offset by 90 to start at 12
    const x = (radius - 30) * Math.cos(angle);
    const y = (radius - 30) * Math.sin(angle);
    ctx.fillText(num, x, y);
  }

  // Draw minute lines
  for (let i = 0; i < 60; i++) {
    const angle = ((i * 6 - 90) * Math.PI) / 180;
    const startRadius = radius - 50;
    const endRadius = radius - 55;
    ctx.beginPath();
    ctx.moveTo(startRadius * Math.cos(angle), startRadius * Math.sin(angle));
    ctx.lineTo(endRadius * Math.cos(angle), endRadius * Math.sin(angle));
    ctx.strokeStyle = "#666";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Draw hour lines (innermost lines)
  for (let i = 0; i < 12; i++) {
    const angle = ((i * 30 - 90) * Math.PI) / 180;
    const startRadius = radius - 50;
    const endRadius = radius - 60;
    ctx.beginPath();
    ctx.moveTo(startRadius * Math.cos(angle), startRadius * Math.sin(angle));
    ctx.lineTo(endRadius * Math.cos(angle), endRadius * Math.sin(angle));
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // Get current time
  const now = new Date();
  const hours = now.getHours() % 12 || 12; // Convert 0 to 12 for 12-hour format
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = now.getHours() >= 12 ? "PM" : "AM";

  // Update digital clock
  digitalClock.textContent = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${ampm}`;

  // Draw hour hand
  const hourAngle = (((hours + minutes / 60) * 30 - 90) * Math.PI) / 180;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(
    (radius - 60) * Math.cos(hourAngle),
    (radius - 60) * Math.sin(hourAngle)
  );
  ctx.strokeStyle = "#949494";
  ctx.lineWidth = 6;
  ctx.stroke();

  // Draw minute hand
  const minuteAngle = ((minutes * 6 - 90) * Math.PI) / 180;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(
    (radius - 40) * Math.cos(minuteAngle),
    (radius - 40) * Math.sin(minuteAngle)
  );
  ctx.strokeStyle = "#949494";
  ctx.lineWidth = 4;
  ctx.stroke();

  // Draw second hand
  const secondAngle = ((seconds * 6 - 90) * Math.PI) / 180;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(
    (radius - 30) * Math.cos(secondAngle),
    (radius - 30) * Math.sin(secondAngle)
  );
  ctx.strokeStyle = "#f00";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Draw center dot
  ctx.beginPath();
  ctx.arc(0, 0, 5, 0, 2 * Math.PI);
  ctx.fillStyle = "#b1b1b1";
  ctx.fill();

  ctx.restore();
}

// Update clock every second
setInterval(drawClock, 1000);
drawClock(); // Initial draw
