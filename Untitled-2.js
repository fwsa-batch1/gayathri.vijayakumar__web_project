let c = document.getElementById("myName");
let ctx = c.getContext("2d");
ctx.beginPath();
//loadeimage the images
let loadimage = (src, callback) => {
  let img = document.createElement("img");
  img.onload = () => callback(img);
  img.src = src;
};
let imagepath = (framenumber) => {
  return "" + framenumber + ".png";
};
//loadimage
let Loadimages = (callback) => {
  let images = [];
  let imagetoload = 1;
  [87].forEach((framenumber) => {
    let path = imagepath(framenumber);
    loadimage(path, (image) => {
      images[framenumber - 1] = image;
      imagetoload = imagetoload - 1;
      if (imagetoload === 0) {
        callback(images);
      }
    });
  });
};
let imagex = 0;
let imagey = 200;
// the array store the retangelaxis
let animate = (ctx, images, callback) => {
  images.forEach((image, index) => {
    setTimeout(() => {
      ctx.clearRect(0, 0, 1200, 500);
      ctx.drawImage(image, imagex, imagey, 100, 100);
      //draw a square
      //callback to the drawRectangle
    });
  });
  setTimeout(callback, images.length * 100);
};
Loadimages((images) => {
  animate(ctx, images, () => {});
  window.onkeydown = function (event) {
    var key = event.keyCode;
    if (key === 39) {
      // red RIGHT
      animate(ctx, images, () => {});
      imagex = imagex + 50;
    }
    if (key === 38) {
      // ball up arrow
      animate(ctx, images, () => {});
      imagey = imagey - 50;
    }
    if (key === 37) {
      // ball left arrow
      animate(ctx, images, () => {});
      imagex = imagex - 20;
    }
    if (key === 40) {
      // ball down button
      animate(ctx, images, () => {});
        imagey = imagey + 20;
      }
    };
});
    //call the animate function ,once hit the ball reloade the game
    //     animate(ctx, images, () => {
    //       for (let i = 0; i < 3; i++) {
    //         if (
    //           rectangleXAxis[i] == imagex + 100 &&
    //           rectangleYAxis[i] == imagey + 50
    //         ) {
    //           alert("reload");
    //           location.reload();
    //         }
    //       }
    //       if (imagex > 1000) {
    //         alert("game over");
    //         location.reload();
    //       }
    //     });
    // }
    //   document.getElementById("left").onclick=()=>{
    //     imagex=imagex-8;
    //     animate(ctx,images,()=>{});
    //   };
    //   document.getElementById("down").onclick=()=>{
    //     imagey=imagey+20;
    //     animate(ctx,images,()=>{});
    //   };
    //   document.getElementById("up").onclick = () => {
    //     imagey = imagey - 55;
    //     animate(ctx, images, () => {});
    //   };
    //   };

football---:

    // let check = setInterval(() => 
    // {
    //    if(isJumpPressed == true)
    //    {
    //       jumpFunction()
    //       isJumpPressed = false; 
    //    }
    //    else   // if the isJumpPressed button is not click this else part is work.
    //    {   
    //        clearInterval(check);  // If the alert is worked the function is not called any more.
    //        animate(ctx,images,'isTheBoyIsOut',null);
    //        document.getElementById('demo').disabled = true // And the jump button is also not worked.So i have to disable tha button.
    //    }
    // },4000 // here i set the timer
    // )

    
// The jumpFunction is use to load a images.
// function jumpFunction(){    
//     isJumpPressed = true;  
//     if(count%2 === 0)  // here i have a two kind of images if the boy come and hit the girl's left side the if condion is work
//     { 
//         animate(ctx,playerAniamation,'theBoyComeLeft',null)
//         count = count + 1; // if the girl jump over the boy. then only the count is increse other wise no.
//     }
//     else // other wise the else part is work.
//     {
//         animate(ctx,playerAniamation,'theBoyComeRight',null)
//         count = count + 1; // if the girl jump over the boy. then only the count is increse other wise no.
  
//     }
     
//     ctx.font = "50px Arial";
//     ctx.fillText(("Score"+count),05,35 );  // here i dispaly the score.
    
// }