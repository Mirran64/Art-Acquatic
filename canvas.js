const canvas = document.getElementById("canvas");
const ctx =  canvas.getContext("2d");

//size
let width = document.getElementById("tableWidth").value;
let height =document.getElementById("tableHeight").value;

//style
let color = "rgba(0,0,0,1)"
let opacity = document.getElementById("Opacity").value
const lineCap = ['round', 'square'];
let lc = lineCap[1];

//Undo array
let undo_array = [];
let index = -1;


//settingFunction
function setWidth(value){
    width = value;
    canvas.width = value;
}

function setHeight(value){
    height = value;
    canvas.height = value;
}

function setColor(r,g,b){
color = "rgba("+r+","+g+","+b+","+opacity+")";
}

let lineWidth = document.getElementById("lineWidth").ariaValueMax;

function setColorHex(hex, opacity){
    color ='rgba(' + (hex = hex.replace('#', ''))
                    .match(new RegExp('(.{' + hex.length/3 + '})', 'g'))
                    .map(function(l) { return parseInt(hex.length%2 ? l+l : l, 16) })
                    .concat(isFinite(opacity) ? opacity : 1).join(',') + ')';    
}

function setOpacity(value){
    opacity = value;
    let arr = color.split(",");
    arr[3] = value + ")";
    let result = "";
    for(str in arr){
        if(str == 0) result =result.concat(arr[str]);
        if(str != 0) result =result.concat(",",arr[str]);
    }
    console.log(result)
    color = result;
}

function setOneNumberDecimal(event){
    this.value =parseFloat(this.value).toFixed(1);
}

function setCap(value){
    if(value == 0){lc = lineCap[0]}
    else{lc =lineCap[1]}
}

//Clear/undo function

function clearTable(){
    ctx.fillStyle= "white";
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function undoLast(){
    if(index < 0) {clearTable();}
    else if(index ==0){
        undo_array.pop();
        clearTable();
        index -=1;
    }
    else{
        index -=1 ;
        undo_array.pop();
        ctx.putImageData(undo_array[index], 0, 0);
    }

}




window.addEventListener("load", ()=>{

    canvas.height = height;
    canvas.width = width;

    let painting = false;

    function startPosition(e)
    { 
        painting= true;
        paint(e);
    }

    function finishedPosition(e)
    {
        painting= false;
        ctx.beginPath();
        
        if(e.type  != "mouseout"){
            undo_array.push(ctx.getImageData(0,0,canvas.width,canvas.height));
            
        }
        index+=1;
    }

    function paint(e){
        if(!painting)return;
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.lineCap =lc;
        ctx.lineJoin = lc;
        var bounds = canvas.getBoundingClientRect();
        let x = e.pageX - bounds.left - scrollX;
        let y = e.pageY - bounds.top - scrollY;
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x,y);
    }
    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", finishedPosition);
    canvas.addEventListener("mousemove", paint);
});