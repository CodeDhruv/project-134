 
status = "";
object = [];
 
var audio = new Audio("music.mp3");
function preload() {
}
function setup() {
  canvas = createCanvas(500, 400);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380,380);
  video.hide();
  objectDetector = ml5.objectDetector("cocossd", modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting the baby";
}
function modelLoaded() {
  console.log("Done!");
  status = true;
}
function gotResult(error, results) {
  if (error) {
      console.error(error);
  } else {
      console.log(results);
      objects = results;
  }
}
function draw() {
  image(video, 0, 0, 500, 400);
  if (status != "") {
      objectDetector.detect(video, gotResult);
      for (var i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Status : Objects Detected !";
          if (objects[i].label != "person") {
              audio.play();
              document.getElementById("objects").innerHTML = "Baby Not Found";
          } else if (objects[i].label == "person") {
              audio.stop();
              document.getElementById("objects").innerHTML = "Baby Found";
          }
      }
  }
}
function play() {
   audio.play();
 }
 function stop(){
     audio.stop();
 }