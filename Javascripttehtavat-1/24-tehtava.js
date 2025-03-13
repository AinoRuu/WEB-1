function askAndEditName(){
    let name = prompt("What is your name?");
    if (name != null) {
       let result= name.toUpperCase();

    let pElement = document.createElement("p")
    pElement.textContent = result;

    document.body.appendChild(pElement);
    }
}

askAndEditName();

