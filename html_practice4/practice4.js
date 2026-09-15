
const submitBtn = document.querySelector("#form-submit");

submitBtn.addEventListener("click", (e)=> {
    e.preventDefault();

    let userIn = document.querySelector("#formIn").value;

    userIn = userIn.trim().charAt(0).toUpperCase() + 
            userIn.trim().slice(1).toLowerCase();

    console.log(userIn);
})

let obj = {
    name: 'User 1',
    age: 20,
    employeed: true
}

let objStr = JSON.stringify(obj, null, 2)

console.log(objStr)

