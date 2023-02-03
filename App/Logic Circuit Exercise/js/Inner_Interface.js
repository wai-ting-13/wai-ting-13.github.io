//Changed 2021-Feb-16

function Logic_Element_Factory(name){
    let x = random(0.2*width, width*0.9);
    let y = random(height * 0.3, height - 50);
    switch(name){
        case "NAND":
            return new NAND(x,y);
        case "NOT":
            return new NOT(x,y);
        case "AND":
            return new AND(x,y);
        case "OR":
            return new OR(x,y);
        case "NOR":
            return new NOR(x,y);
        case "XOR":
            return new XOR(x,y);
        case "XNOR":
            return new XNOR(x,y);
        case "Const_In1":
            return new Const_In1(x,y);
        case "Const_In0":
            return new Const_In0(x,y);
        case "Half_Adder":
            return new Half_Adder(x,y);
        case "Full_Adder":
            return new Full_Adder(x,y);
    }
    return null;
}

function load_setting(index) {
    ArrayOfIn = [];
    ArrayOfOut = []
    ArrayOfEle = [];
    stack = [];

    //Add All LogicElements
    let setting = ProblemSet[index];

    setting.Inputs.forEach(name => {
        let x = random(50, (width / 10));
        let y = random(height*0.4, height - 100);
        ArrayOfIn.push(new Vari_In(name, x, y));
    })

    setting.Outputs.forEach(tuple => {
        let x = random(width * 9 / 10, width - 50);
        let y = random(50, height - 50);
        let name = tuple[0];
        let expectation = tuple[1];
        ArrayOfOut.push(new Desired_Out(name, x, y, expectation));
    })

    setting.Elements.forEach(name=>{
        let obj = Logic_Element_Factory(name);
        if(obj != null){
            ArrayOfEle.push(obj);
        }
    })

    //Create Turth Table
    numOfRow = Math.pow(2, ArrayOfIn.length);
    numOfCol = ArrayOfIn.length + 2 * ArrayOfOut.length;
    TRUTH_TABLE = Array(numOfRow);
    for (let i = 0; i < numOfRow; i++) {
        TRUTH_TABLE[i] = Array(numOfCol)
    }

}

function connect_Element(stack) {
    function orderOf(obj) {
        let name = obj.constructor.name;
        let dictionary = { "Logic_Element": 2, "Vari_In": 3, "Desired_Out": 1, "Const_In0": 3, "Const_In1": 3 };
        if(obj instanceof Logic_Gate){
            return 2;
        }
        return dictionary[name];
    }
    
    let arg1 = stack[0];
    let arg2 = stack[1];  
    let order1 = orderOf(arg1);
    let order2 = orderOf(arg2);

    if(order1 < order2 || (order1 == 2 && order1 == order2) ){
        //Connect: tell user to input index;
        //Get This index
        let thisIndex;
        if(arg1.getNumOfIn()==1){
            thisIndex = 0;
        }
        else{
            thisIndex = prompt(`Please select which input (1 to n) of ${arg1.getLabel()} you would like to be connected`);
            thisIndex = int(thisIndex) - 1;
            if(isNaN(thisIndex) || thisIndex < 0 || thisIndex >= arg1.getNumOfIn()){
                alert("Wrong Input");
                return;
            }
        }

        //Get Parent index
        let parentIndex;
        if(arg2.getNumOfOut()==1){
            parentIndex = 0;
        }else{
            parentIndex = prompt(`Please select which output (1 to n) of ${arg2.getLabel()} you would like to be connected`);
            parentIndex = int(parentIndex) - 1;
            if(isNaN(parentIndex) || parentIndex < 0 || parentIndex >= arg2.getNumOfOut()){
                alert("Wrong Input");
                return;
            }
        }
        arg1.connect(arg2, thisIndex, parentIndex);      
    }
}

function disconnect_Element(element){
    if(element.getNumOfIn() == 0){
    }else if(element.getNumOfIn() == 1){
        element.disconnect(0);
    }
    else{
        let index = prompt(`Please select which input of ${element.getLabel()} you would like to disconnect`);
        index = int(index) - 1;
        if(!isNaN(index) && index >= 0 && index < element.getNumOfIn() ){
            element.disconnect(index);
        }else{
            alert("Wrong Input");
        }
    }
    element.toBeDisconnected = false;  

}