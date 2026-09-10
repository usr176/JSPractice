console.log("hello")


let colors2 = {
    "white": "black",
    "black": "white"
}

// function chngColor() {
//     const boxes = document.querySelectorAll(".box")
//     let size = boxes.length

//     boxes.forEach((e) => {
//         let num = Math.random() * 2;
//         num = Math.round(num);
//         let key = Object.keys(colors2)[num]
//         console.log(key)

//         e.style.backgroundColor = key;
//         e.style.color = colors2[key];
//     })
// }
function randColor(){

    var color = "#";

    const letters = "0123456789ABCDEF"
    for(var i = 0; i < 6; i++){
        color += letters[Math.floor(Math.round(Math.random() * 16))];
    }
    return color;

}

function chngColor() {
    const boxes = document.querySelectorAll(".box");

    boxes.forEach((box) => {
        const background = randColor();
        box.style.backgroundColor = background;

        // Convert hex to RGB
        const r = parseInt(background.slice(1, 3), 16);
        const g = parseInt(background.slice(3, 5), 16);
        const b = parseInt(background.slice(5, 7), 16);

        // Calculate brightness
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;

        box.style.color = brightness > 128 ? "black" : "white";
    });
}