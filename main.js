let c = document.getElementById("myName");
let ctx = c.getContext("2d");

let loadImage = (src, callback) => {
    let img = document.createElement("img");
    img.onload = () => callback(img);
    img.src = src;
};

let imagePath = (frameNumber) =>{
     return    frameNumber + ".gif";
};

let frames = 
{   
    // The Run array have the Running Images of the game
    Run: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
    
    // The theBoyComeLeft array have a boy come and hit the girl's left side. This array that images in the array. 
    theBoyComeLeft  : [18,19,20,21,22,23,24,25,26,27,55,56,57,58,59,60],
    
    // The theBoyComeRight array have a boy come and hit the girl's right side.THis array have like that images.
    theBoyComeRight : [61,62,63,64,65,66,67,68,69,70,71,72,14,15,16,17],

    // The out array have a one images if the game is over one image that i have here.
    isTheBoyIsOut : [86],
}


let loadImages = (callback) => {
    let images = { Run: [] , theBoyComeLeft: [] ,theBoyComeRight : [] ,isTheBoyIsOut : []};
    let imagesToLoad = 0;
    
    ["Run","theBoyComeLeft","theBoyComeRight" , "isTheBoyIsOut"].forEach((animation) =>
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
    // if the run animation also call able here so i will cheak if the animation is not equal to run .
    images[animation].forEach((image,index) => {
        setTimeout(() => {
            ctx.clearRect(0,0,500,500);
            ctx.drawImage(image,0,0,1300,500);
        }, index*100);
    });
};

let isJumpPressed = false ;   // The boolean is check if the jump button is click or not;

loadImages((images) => {
    animate(ctx,images,'Run',() =>{
        console.log("Done");
    });

    let check = setInterval(() => 
    {
       if(isJumpPressed == true)
       {
          jumpFunction()
          isJumpPressed = false; 
       }
       else   // if the isJumpPressed button is not click this else part is work.
       {
           alert("GAME OVER")
           clearInterval(check);  // If the alert is worked the function is not called any more.
           animate(ctx,images,'isTheBoyIsOut',null);
           document.getElementById('demo').disabled = true // And the jump button is also not worked.So i have to disable tha button.
       }
    },6000 // here i set the timer
    )
});

// the playerAnimation variable is use to check the load the images in that
let playerAniamation = null; 

// the count is use to increse the game score.
let count = 0;

// here i set a font size
ctx.font = "50px Arial";

// why i would set the text is out of the is,When i was start the game the game do not have a score the score is '0' thats why i have that here.
ctx.fillText(("Score"+count),05,35)

loadImages((images) => playerAniamation = images); 


// The jumpFunction is use to load a images.
function jumpFunction(){    
    isJumpPressed = true;  
    if(count%2 === 0)  // here i have a two kind of images if the boy come and hit the girl's left side the if condion is work
    { 
        animate(ctx,playerAniamation,'theBoyComeLeft',null)
        count = count + 1; // if the girl jump over the boy. then only the count is increse other wise no.
    }
    else // other wise the else part is work.
    {
        animate(ctx,playerAniamation,'theBoyComeRight',null)
        count = count + 1; // if the girl jump over the boy. then only the count is increse other wise no.
  
    }
     
    ctx.font = "50px Arial";
    ctx.fillText(("Score"+count),05,35 );  // here i dispaly the score.
    
}