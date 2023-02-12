const ProjectList = [
    {
        title : "Logic Circuit Exercise (Web Game)",
        url : "./App/Logic Circuit Exercise/index.html",
        description: "Logic Circuit Exercise for beginners",
    },
    {
        title : "Elden Ring Arc (using Plain JS)",
        url : "App/Elden Ring Arc/index.html",
        description: "Do you have trouble when you don't know how many level and attributes you need for all weapons you want? Here is a calculator which help you to calculate the requirement. Using Desktop is recommended",
    },
    {
        title : "Nygaard's Game (Web Game)",
        url : "App/Nygaards Game/index.html",
        description: "A numeric Tic-Tac-Toe variant. A winner of the game must complete either sum of 15 or same colours of 3 numbers in a horizontal, vertical, or diagonal row. Using Desktop is recommended",
    },

    {
        title : "Coming Soon",
        url : "index.html",
        description: "",
    },


];


function init(){
    let table = document.querySelector("#right");

    ProjectList.forEach(
        (data) => {
            let newDiv = document.createElement("div");
            newDiv.classList.add("info");

            let newtitle = document.createElement("p");
            newtitle.classList.add("title");
            newtitle.appendChild( document.createTextNode(data.title) );
            newDiv.appendChild(newtitle);

            let newContent = document.createElement("p");
            newContent.classList.add("description");
            newContent.appendChild( document.createTextNode(data.description) );
            newDiv.appendChild(newContent);

            newDiv.addEventListener("click", function(){ location.href=data.url });

            table.appendChild(newDiv);
        }
    )
}
