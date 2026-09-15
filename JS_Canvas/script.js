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
let fillBtn = document.getElementById("fill")

// variables
let erase = false;
let draw = false;

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

// button event listeners
createButton.addEventListener("click", ()=>{
    createGrid()
}) 
ersBtn.addEventListener("click", ()=>{
    erase = true;
    ersBtn.classList.add("active")
    pntBtn.classList.remove("active")
})
pntBtn.addEventListener("click", ()=>{
    erase = false;
    pntBtn.classList.add("active")
    ersBtn.classList.remove("active")
})
fillBtn.addEventListener("click", () =>{
    let gridboxes = document.querySelectorAll(".gridbox")
    gridboxes.forEach((e) => {
        e.style.backgroundColor = colorIn.value
    })
})

document.addEventListener("mouseup", ()=>{
    draw = false;
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

// event delegation
// event listener on canvas container to check draw
canvasContainer.addEventListener("mousedown", (event)=>{
    if(event.target.classList.contains("gridbox")){
        draw = true
        colorDiv(event.target)
    }
})
canvasContainer.addEventListener("mousemove", (event)=>{
    if(event.target.classList.contains("gridbox")){
        colorDiv(event.target)
    }
})
