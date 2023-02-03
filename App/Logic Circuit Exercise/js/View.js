/***********************************Global Variable***********************************/
//Game flow control
let Stage = -1;
let mode;

//Prerequired files
let Images = [];

//HTML Element
window.onload = main_buttons_init;

//Variables of Inner_Structure
let ArrayOfIn = [];
let ArrayOfOut = []
let ArrayOfEle = [];
let stack = [];
let numOfRow;
let numOfCol;
let TRUTH_TABLE;



/*------------------------------End Of Global Variable------------------------------*/



/*-------------------------------End of preload images-------------------------------*/

/***********************************Global function***********************************/
//Event Listeners of submit button
let nextStage = function () { clear(); setup(); };

function updateArrayOfALL() {
  let returnArray = [];
  returnArray = returnArray.concat(ArrayOfIn);
  returnArray = returnArray.concat(ArrayOfOut);
  returnArray = returnArray.concat(ArrayOfEle);
  return returnArray;
}

function showTruthTable() {
  let k1 = 0;
  let k2 = 1;
  for(let i = 0; i < ArrayOfIn.length; i++, k1++){
    text(ArrayOfIn[i].getLabel(),20 + k1 * 40 ,k2 * 20);
  }
  for(let i = 0; i < ArrayOfOut.length; i++, k1++){
    text("Actual " + ArrayOfOut[i].getLabel(),20 + k1 * 80, k2 * 20);
  }
  for(let i = 0; i < ArrayOfOut.length; i++, k1++){
    text("Expected " + ArrayOfOut[i].getLabel(),20 + k1 * 100, k2 * 20);
  }
  k2++;
  
  for(let i = 0; i < TRUTH_TABLE.length; i++, k2++){
    let k1 = 0;
    let j = 0;
    for(; j < ArrayOfIn.length; j++, k1++){
      text(TRUTH_TABLE[i][j], 20 + k1 * 40, k2 * 20);
    }
    for(; j < ArrayOfIn.length + ArrayOfOut.length; j++, k1++){
      text(TRUTH_TABLE[i][j], 20 + k1 * 80, k2 * 20);
    }
    for(; j < ArrayOfIn.length + 2 * ArrayOfOut.length; j++, k1++){
      text(TRUTH_TABLE[i][j], 20 + k1 * 100, k2 * 20);
    }
  }
}

function main_buttons_init() {
  //Load Button From HTML File    
  var main_buttons = document.querySelectorAll("#main_buttons > button");

  //Defalt mode is "View"
  main_buttons[0].style.color = "black";
  main_buttons[0].style.backgroundColor = "white";
  mode = main_buttons[0].innerText;



  //AddEventListener for each buttons
  main_buttons.forEach(b => {
      b.addEventListener("click", button_clicked);
  })


  //This is button's EventListener
  function button_clicked() {
      //Clear style of all button
      main_buttons.forEach(b => {
          b.style.color = "white";
          b.style.backgroundColor = "rgba(50, 57, 66, 0.952)";
      })

      //Select button
      this.style.color = "black";
      this.style.backgroundColor = "white";
      mode = this.innerText;
  }

}

function checkGameStatus(){
  let submit_Button = document.querySelector("#Submit_Button");
  let isCompleted = computeT2();
  if (isCompleted == true) {
    submit_Button.innerText = "Success!";
    submit_Button.style.color = "#fff";
    submit_Button.style.backgroundColor = "#1ECD97";
    submit_Button.style.borderColor = "#fff";
    isCompleted = false;
  }
}

//control Relationship of Element
function ctrlRelation(){
  if(mode=="View"){
    stack = [];
  }

  let arr = updateArrayOfALL();
  arr.filter(element=>element.toBeDisconnected==true).forEach(element=>{
    disconnect_Element(element);
  });

  let element = arr.filter(element=>element.toBeConnected==true)[0];
  if (element != null){
    element.toBeConnected = false;
    stack.push(element);
  }

  if(stack.length == 2){
    connect_Element(stack);
    stack = [];
  }

}

//Print Stack contents
function printStack(){
  if(stack.length > 0){
    let str = "";
    stack.forEach(element=>{
      str = `You Have Selected ${str} ${element.getLabel()}`
    })
    text(str, width/2, 20);
  }
}
/*-------------------------------End of Global function-------------------------------*/


/***********************************P5.js Part***********************************/
//setup canvas
function setup() {
  
  //Draw Canvas
  let myWidth = windowWidth * 0.95;
  let myHeight = windowHeight * 0.90;
  let cnv = createCanvas(myWidth, myHeight);
  cnv.position((windowWidth - width) / 2, windowHeight - height - 15, 'fixed');

  //Control Flow of Game
  Stage++;
  if (Stage < ProblemSet.length) {
    
    load_setting(Stage);
  } else {
    ArrayOfIn = [];
    ArrayOfOut = [];
    ArrayOfEle = [];
    stack = [];
  }

  //Define Submit_Button Behaviour
  let submit_Button = document.querySelector("#Submit_Button"); //Move to upper
  submit_Button.innerText = "Next";
  submit_Button.style = submit_Button.style;
  submit_Button.removeEventListener("click", nextStage); //Register Listener only once;
  submit_Button.addEventListener("click", nextStage);
  
}


//Loop drawing
function draw() {
  
  background(245, 245, 245);

  //Keep Display All Elements
  updateArrayOfALL().forEach(ele => { ele.display(); });

  if (Stage >= ProblemSet.length) {
    textSize(64);
    fill(0, 102, 153);
    text("Game End, Thanks", width / 2, height / 2);
    
  } else {
    text(ProblemSet[Stage].Message, width - 100, 20);
    checkGameStatus();
    showTruthTable();
    ctrlRelation();
    printStack();
  }
}
/*-------------------------------End of P5.js part-------------------------------*/


/***********************************P5.js Event Handler***********************************/
function mousePressed() {
  let ArrayOfALL = updateArrayOfALL();
  ArrayOfALL.forEach(a => {
    a.selected();
  });
}

function mouseReleased() {
  let ArrayOfALL = updateArrayOfALL();
  ArrayOfALL.forEach(a => {
    a.notPressed();
  });
}

/*-------------------------------P5.js Event Handler-------------------------------*/