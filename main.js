sound = "";
status = "";
objects = [];

function preload() {

}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}



function modelLoaded() {
    console.log("Model has Loaded!");
    status = true;
    objectDetector.detect(video, gotresult);
}

function gotresult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(video, 0, 0, 480, 380);

    if (status != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Object Detected";
            r = random(255);
            g = random(255);
            b = random(255);
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y + 20);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == "person") {
                document.getElementById("status").innerHTML = "Status: Baby Detected";
                ("Baby Detected");

            } else {
                document.getElementById("status").innerHTML = "Status: Baby Not Detected";
                console.log("Baby Not Detected");
            }
            if (objects[i].length < 0) {

                document.getElementById("status").innerHTML = "Status: Baby Not Detected";
                console.log("Baby Not Detected");
            }
        }

    }
}