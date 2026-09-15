const optionContainer = document.querySelector(".wrapper")
const canvasContainer = document.querySelector(".container")

// sliders and labels
let gridInputWidth = document.getElementById("grid-width")
let gridWidthLabel = document.getElementById("width-label")

let gridInputHeight = document.getElementById("grid-height")
let gridHeightLabel = document.getElementById("height-label")

// buttons
let createButton = document.getElementById("create-canvas")
let colorIn = document.getElementById("color-picker")
let ersBtn = document.getElementById("erase")
let pntBtn = document.getElementById("paint")
let fillBtn = document.getElementById("fill-canvas")
let fillBucketBtn = document.getElementById("fill-bucket")

// variables
let erase = false;
let draw = false;
let fill = false;

// functions on document load
window.addEventListener('load', (event) => {
    pntBtn.classList.add("active")
    gridHeightLabel.textContent = gridInputHeight.value
    gridWidthLabel.textContent = gridInputWidth.value
})

// Event Listener to update slider value to display
gridInputWidth.addEventListener("input", ()=>{
    gridWidthLabel.textContent = gridInputWidth.value
})
gridInputHeight.addEventListener("input", ()=>{
    gridHeightLabel.textContent = gridInputHeight.value
})

document.addEventListener("mouseup", ()=>{
    draw = false;
})

// button event listeners
createButton.addEventListener("click", ()=>{
    createGrid()
}) 
ersBtn.addEventListener("click", ()=>{
    erase = true;
    fill = false;
    ersBtn.classList.add("active")
    pntBtn.classList.remove("active")
    fillBucketBtn.classList.remove("active");
})
pntBtn.addEventListener("click", ()=>{
    erase = false;
    fill = false;
    pntBtn.classList.add("active")
    ersBtn.classList.remove("active")
    fillBucketBtn.classList.remove("active");
})
fillBucketBtn.addEventListener("click", () => {
    fill = true;
    erase = false
    fillBucketBtn.classList.add("active");
    pntBtn.classList.remove("active");
    ersBtn.classList.remove("active");
});
fillBtn.addEventListener("click", () =>{
    let gridboxes = document.querySelectorAll(".gridbox")
    gridboxes.forEach((e) => {
        e.style.backgroundColor = colorIn.value
    })
})

// function to create canvas grid
function createGrid(){
    let height = Number(gridInputHeight.value);
    let width = Number(gridInputWidth.value);

    // clear and set canvas for new size
    canvasContainer.textContent = "";
    canvasContainer.style.gridTemplateColumns =
     `repeat(${width}, 20px)`;
    canvasContainer.style.gridTemplateRows =
     `repeat(${height}, 20px)`;

    // canvas grid
    for(let row = 0; row<height; row++){

        for(let col = 0; col<width; col++){

            const gridbox = document.createElement("div");
            gridbox.classList.add("gridbox");
            gridbox.style.backgroundColor = "white"

            gridbox.dataset.row = row;
            gridbox.dataset.col = col

            canvasContainer.appendChild(gridbox);
        }
    }
}

// function to color box
function colorDiv(elem){
    if(draw && !erase){
        elem.style.backgroundColor = colorIn.value;
    }else if( draw && erase){
        elem.style.backgroundColor = "transparent";
    }
}

// flood fill function
// uses BFS algorithm to fill the cells with color
function floodFill(startRow, startCol){
    const boxes = document.querySelectorAll(".gridbox")

    const startBox = [...boxes].find((box) => {
       return(
        Number(box.dataset.row) === startRow &&
        Number(box.dataset.col) === startCol
       )
    });
  
    const targetColor = startBox.style.backgroundColor;
    const newColor = colorIn.value;

    if(targetColor === newColor){
        return;
    }

    const queue = [];
    queue.push([startRow,startCol]);
    const visited = new Set();

    while(queue.length > 0){

        const [row,col] = queue.shift();


        const key = `${row},${col}`;


        if(visited.has(key)){
            continue;
        }
        visited.add(key);

        const cell = [...boxes].find(c =>
            Number(c.dataset.row) === row &&
            Number(c.dataset.col) === col
        );

        if(!cell){
            continue;
        }

        if(cell.style.backgroundColor !== targetColor){
            continue;
        }

        cell.style.backgroundColor = newColor;

        queue.push([row+1,col]);
        queue.push([row-1,col]);
        queue.push([row,col+1]);
        queue.push([row,col-1]);
    }
}

// event delegation
// event listener on canvas container to check draw
canvasContainer.addEventListener("mousedown", (event)=>{
    if(event.target.classList.contains("gridbox")){
        if(fill){
            const row = Number(event.target.dataset.row);
            const col = Number(event.target.dataset.col);

            floodFill(row,col);
            return;
        }
        draw = true
        colorDiv(event.target)
    }
})
canvasContainer.addEventListener("mousemove", (event)=>{
    if(event.target.classList.contains("gridbox")){
        colorDiv(event.target)
    }
})
