var c;
var ctx;
var drops = [];
var font_size=10;
var columns;
var logo = document.getElementById("logo");

var matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
//converting the string into an array of single characters
matrix = matrix.split("");

function draw()
{
    //Black BG for the canvas
    //translucent BG to show trail
    ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = "#21e6c1"; //green text
    ctx.font = font_size + "px arial";
    //looping over drops
    for( var i = 0; i < drops.length; i++ )
    {
        //a random chinese character to print
        var text = matrix[ Math.floor( Math.random() * matrix.length ) ];
        //x = i*font_size, y = value of drops[i]*font_size
        ctx.fillText(text, i * font_size, drops[i] * font_size);

        //sending the drop back to the top randomly after it has crossed the screen
        //adding a randomness to the reset to make the drops scattered on the Y axis
        if( drops[i] * font_size > c.height && Math.random() > 0.975 )
            drops[i] = 0;

        //incrementing Y coordinate
        drops[i]++;
    }

    ctx.drawImage(logo, 100, 200, 200, 200);
}

function init(){

  c = document.getElementById("myCanvas");
  ctx = c.getContext("2d");
         //making the canvas full screen
  // c.height = window.innerHeight;
  c.width = window.innerWidth;
// var logo = document.getElementById("logo");
  
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.fillRect(0, 0, c.width, c.height);

   columns = c.width / font_size;
  for(var x = 0; x < columns; x++)
    drops[x] = 1;


  window.setInterval(draw, 50);

}