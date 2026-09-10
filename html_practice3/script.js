console.log("k")

// Form
const form = document.querySelector("#task-form")
const input = document.querySelector("#input-task")

form.addEventListener("submit", (event) => {
    event.preventDefault();

      const inValue = input.value.trim();

    if(!inValue){
        input.focus();
        return;
    }
    addCard(inValue);
    form.reset();
});

function addCard(text){

    const card = document.createElement("div");

    const btn = document.createElement("button");
    btn.classList.add("card-btn-rmv");
    btn.textContent = "Remove";

    card.classList.add('card');
    card.textContent = text;
    card.appendChild(btn);

    const div = document.querySelector('#target-div');
    div.append(card);
}

const cardContainer = document.querySelector("#target-div");
cardContainer.addEventListener("click", (event) => {
    if(event.target.classList.contains("card-btn-rmv")){
        event.target.closest(".card").remove();
    }
})
