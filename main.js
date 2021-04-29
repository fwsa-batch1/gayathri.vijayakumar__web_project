let c = document.getElementById("myName");
let ctx = c.getContext("2d");

let loadImage = (src, callback) => {
    let img = document.createElement("img");
    img.onload = () => callback(img);
    img.src = src;
};

let imagePath = (frameNumber) =>{
     return   "" + frameNumber + ".gif";
};

let frames = {
    Run: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
    jumpRight  : [18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62],
    jumpLeft :[63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,11,12,13,14,15,16,17,18,19],
}


let loadImages = (callback) => {
    let images = { Run: [] , jumpRight: [] , jumpLeft : []};
    let imagesToLoad = 0;
    
    ["Run","jumpRight","jumpLeft"].forEach((animation) =>
    {
      let animationFrames = frames[animation];
      imagesToLoad = imagesToLoad + animationFrames.length;

      animationFrames.forEach((frameNumber) => {
         let path = imagePath(frameNumber,animation);

         loadImage(path,(image) => {
         images[animation][frameNumber -1] = image;
         imagesToLoad = imagesToLoad - 1;

        if(imagesToLoad === 0){
            callback(images);
        }
      });
     });
    });  
};




let animate = (ctx,images,animation,callback)=>
{
    images[animation].forEach((image,index) => {
        setTimeout(() => {
            ctx.clearRect(0,0,500,500);
            ctx.drawImage(image,0,0,1300,500);
        }, index*100);
    });
    
};

let isJumpPressed = false;
loadImages((images) => {
    animate(ctx,images,'Run',() =>{
        console.log("Done");
    });
    let check = setInterval(() => {
        if(isJumpPressed == true)
        {
           jumpFunction()
           isJumpPressed = false; 
        }
        else
        {
            alert("GAME OVER");
            clearInterval(check);
            document.getElementById('demo').disabled = true
        }
     },5000)
});



let playerAniamation = null;
let count = 0;
ctx.font = "50px Arial";
ctx.fillText(("Score"+count),05,35)
loadImages((images) => playerAniamation = images);

function jumpFunction(){  
    isJumpPressed = true;  
    if(count%2 === 0)
    { 
        animate(ctx,playerAniamation,'jumpRight',null)
    }
    else
    {
        animate(ctx,playerAniamation,'jumpLeft',null)
    }
    count = count + 1;
    ctx.font = "50px Arial";
    ctx.fillText(("Score"+count),05,35 );
}