var c = document.getElementById("myName");
let context = c.getContext("2d");

// here i load the images..
let loadImage = (src,callback) => {
    let img = document.createElement("img");
    img.onload = () => callback(img);
    img.src = src;
};

// create a image path and retun the image.
let imagePath = (frameNumber) => {
    return "./images/" + frameNumber + ".jpg";
}

// In the frames variable i load a images like a list.
let frames = {
    // if i start the girl will run .so that time this list will call.
    Run: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],

    //if the boy come left side of the girl is this list will call.
    theBoyComeLeft: [
       14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
       33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51,
       52, 53, 54,
    ],

    // if the boy come right side of the girl is this list will call.
    theBoyComeRight: [
       55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73,
       74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85,
    ],

    // if the girl is out this list image will be call
    isTheBoyIsOut : [86] 
};

let loadImages = (callback) => {
    let images = { Run : [] , theBoyComeLeft : [], theBoyComeRight : [], isTheBoyIsOut : [] };
    let imagesToLoad = 0 ;

    ["Run","theBoyComeLeft","theBoyComeRight","isTheBoyIsOut"].forEach(
      (animation) => {
        let animationFrames = frames[animation];
        imagesToLoad = imagesToLoad + animationFrames.length;
        animationFrames.forEach((frameNumber) => {
            let path = imagePath(frameNumber);
            loadImage(path,(image)=>{
                images[animation].push(image);
                imagesToLoad = imagesToLoad-1;

                if(imagesToLoad === 0)
                {
                    callback(images);
                }
            });
        });
    });

  };

let count = 0;
let jumping = false;
let gameOver  = false;
let animate = (ctx, images, animation, callback) => {
    console.log("animation", animation);
    console.log("images", images);

    images[animation].forEach((image, index) => {
      setTimeout(() => {
        if (!gameOver || animation === "isTheBoyIsOut") {
          ctx.clearRect(0, 0, 200, 500);
          ctx.drawImage(image, 0, 0, 1300, 500);
          ctx.font = "50px Arial";
          ctx.fillText("Score" + count, 5, 35);
        }
        if (
          (animation === "theBoyComeLeft" && index === 6) ||
          (animation === "theBoyComeRight" && index === 8)
        ) {
          console.log("jumping", jumping, gameOver);
          if (jumping) {
            count++;
            jumping = false;
          } else {
            gameOver = true;
            callback();
          }
        }
      }, index * 100);
    });
    if (!gameOver) setTimeout(callback, images[animation].length * 100);
  };

context.fillText("score"+count, 5, 35);


count = 0;


loadImages((images) => {
  //aux secting the type of animation frames to run and sending to animate function
  let aux = () => {
    console.log("gameOver", gameOver);
    let selectedAnimation = !gameOver ? ["Run", "theBoyComeLeft", "theBoyComeRight"][Math.floor(Math.random() * 3)] : "isTheBoyIsOut";
    animate(context, images, selectedAnimation, (gameOver ? () => console.log("Game over") : aux));
  };

  aux();

  document.addEventListener("keyup", (event) => {
    const key = event.key;
    if (key === "ArrowUp" && !jumping) {
      
      console.log(jumping)
      jumping = true;
    }
  });
});
