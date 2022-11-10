const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.append(canvas);
window.onresize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
const context = canvas.getContext('2d');
context.fillStyle = "#000";
context.fillRect(0, 0, canvas.width, canvas.height);
context.strokeStyle = "#eee"
context.lineWidth = 2;

let mousedown = false;
let c = [];
let d = [];
let i = -1;

let r1 = [];
let r2 = [];

let colours = 
{
    "w": "#eee",
    "g": "#8f7",
    "b": "#7bf",
    "r": "#f88",
    "y": "#fff382",
    "p": "#fb82ff",
    "b": "#000"
};
let history = [context.getImageData(0, 0, canvas.width, canvas.height)];

canvas.addEventListener('mousedown', m => { c[0] = r1[0] = m.clientX; c[1] = r1[1] = m.clientY; mousedown = 1; });
canvas.addEventListener('mouseup', m => { mousedown = 0; save(); r2[0] = m.clientX; r2[1] = m.clientY });
canvas.addEventListener('mousemove', m =>  { if(mousedown) {
d[0] = m.clientX; d[1] = m.clientY; draw(); c[0] = m.clientX; c[1] = m.clientY; }});
document.addEventListener('keydown', k => { short(k.key); width(k.key) });

function draw()
{
    context.beginPath();
    context.moveTo(c[0], c[1]);
    context.lineTo(d[0], d[1]);
    context.stroke();
}

function save() { history.push(context.getImageData(0, 0, canvas.width, canvas.height)); i++; }

function undo()
{
    if(i > -1)
    {
        context.clearRect(0, 0, canvas.width, canvas.height); context.putImageData(history[i], 0, 0);
        history.splice(i, 1); i--; 
    }
}

function width(k)
{
    if(k != NaN)
    {
        context.lineWidth = parseInt(k);
    }
}

function remove()
{
    console.log(r1[0], r1[1], r2[0], r2[1]);
    context.clearRect(r1[0], r1[1], r2[0], r2[1])
    history.push(context.getImageData(0, 0, canvas.width, canvas.height)); i++;
}

function short(k)
{
    if(k === "z")
    {
        undo();
    } else if(k === "d")
    {
        remove();
    } else if(colours[k] != undefined)
    {
        context.strokeStyle = colours[k];
    }
}