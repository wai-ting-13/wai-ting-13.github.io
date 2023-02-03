/***********************************preload images***********************************/
function preload() {
    Images[0] = loadImage("./image/NAND_Gate.png");
    Images[1] = loadImage("./image/Variable.png");
    Images[2] = loadImage("./image/Output.png");
    Images[3] = loadImage("./image/NOT_Gate.png");
    Images[4] = loadImage("./image/AND_Gate.png");
    Images[5] = loadImage("./image/OR_Gate.png");
    Images[6] = loadImage("./image/NOR_Gate.png");
    Images[7] = loadImage("./image/XOR_Gate.png");
    Images[8] = loadImage("./image/XNOR_Gate.png");
    Images[9] = loadImage("./image/Const_In1.png");
    Images[10] = loadImage("./image/Const_In0.png");
    Images[11] = loadImage("./image/Half_Adder.png");
    Images[12] = loadImage("./image/Full_Adder.png")
  }

/********************************* Empty Input *********************************/
class Empty_In {
    static Instance = new Empty_In();

    constructor() {
        this.getOutput = function (index) {
            return "n";
        }
    }

    static getInstance() {
        return this.Instance;
    }
}
const empty_in = Empty_In.getInstance();

/*********************************Define Logic Elements*********************************/

//Define abstract prototype of Logic_Element (gate, in, out, constant)
class Logic_Element {
    constructor(label, x, y, imagefile, numOfIn, numOfOut) {
        if (this.constructor == Logic_Element) {
            throw new Error("FYI: Instance of Abstract class cannot be instantiated");
        }
        this.label = label;
        this.x = x;
        this.y = y;
        this.r = 40;
        this.imagefile = imagefile;
        this.numOfIn = numOfIn;
        this.numOfOut = numOfOut;
        this.dragging = false;
        this.toBeConnected = false;
        this.toBeDisconnected = false;


        this.getNumOfIn = function () {
            return this.numOfIn;
        }

        this.getNumOfOut = function () {
            return this.numOfOut;
        }

        this.getLabel = function () {
            return this.label;
        }

        this.display = function () {
            if (this.dragging) {
                this.x = mouseX;
                this.y = mouseY;
            }
            //Draw Gate
            imageMode(CENTER);
            image(this.imagefile, this.x, this.y);
            fill(0);
            textAlign(CENTER);
            text(this.label, this.x, this.y - 25);

            //Draw Line
            for(let i = 0; this._parent != null && i < this._parent.length; i++){
                if(this._parent[i] != empty_in){
                    strokeWeight(2);
                    line(this.x - 75/2, 
                        this.y - 50/2 + 50/(this.numOfIn + 1) * (i + 1), 
                        this._parent[i].x + 75/2, 
                        this._parent[i].y - 50/2 + 50/(this._parent[i].getNumOfOut() + 1) * (this._index[i] + 1));
                }
            }

        }
        
        this.notPressed = function () {
            this.dragging = false;
        }

        this.selected = function () {

            let d = dist(mouseX, mouseY, this.x, this.y);

            //Mouse Cursor is in object
            if (d < this.r / 2) {
                if (mode == "View") {
                    this.dragging = true;
                } else if (mode == "Connect") {
                    this.toBeConnected = true;
                }
                else if(mode == "Disconnect"){
                    this.toBeDisconnected = true;
                }
            }
        }

        //Define Connectivity
        this.connect = function(parent, myIndex, parentIndex){
            this._parent[myIndex] = parent;
            this._index[myIndex] = parentIndex;
        }

        this.disconnect = function (myIndex) {
            this._parent[myIndex] = empty_in;
            this._index[myIndex] = 0;
        }
        
    }



}

//Define In and Out
class Vari_In extends Logic_Element {
    //value;
    constructor(label, x, y) {
        super(label, x, y, Images[1], 0, 1);
        this.value = "1";
        this.getOutput = function (index) {
            return this.value;
        }
        this.assign = function (value) {
            this.value = value;
        }
    }
}

class Desired_Out extends Logic_Element {

    constructor(label, x, y, expectation) {
        super(label, x, y, Images[2], 1, 0);
        this.imagefile = Images[2];

        this._parent = [empty_in];

        this._index = [0];

        this.getExpected = expectation;

        this.getActual = function () {
            return this._parent[0].getOutput(this._index[0])
        }
    }
}

class Const_In0 extends Logic_Element {
    constructor(x, y) {
        super("Constant 0", x, y, Images[10], 0, 1);
        this.getOutput = function (index) {
            return "0";
        }
    }
}

class Const_In1 extends Logic_Element {
    constructor(x, y) {
        super("Constant 1", x, y, Images[9], 0, 1);
        this.getOutput = function (index) {
            return "1";
        }
    }
}

class Logic_Gate extends Logic_Element {
    constructor(label, x, y, imagefile, numOfIn, numOfOut, parent, index) {
        super(label, x, y, imagefile, numOfIn, numOfOut);
        if (this.constructor == Logic_Gate) {
            throw new Error("FYI: Instance of Abstract class cannot be instantiated");
        }
        this._parent = parent;
        this._index = index;
    }
}

/******************Define Concrete Logic Gate*****************/


class NOT extends Logic_Gate {
    constructor(x, y) {
        super("NOT", x, y, Images[3], 1, 1, [empty_in], [0]);
        this.getOutput = function (index) {
            let in1 = this._parent[0].getOutput(this._index[0]);
            return op.not(in1);
        }
    }
}

class AND extends Logic_Gate {
    constructor(x, y) {
        super("AND", x, y, Images[4], 2, 1, [empty_in, empty_in], [0, 0]);
        this.getOutput = function (index) {
            let in1 = this._parent[0].getOutput(this._index[0]);
            let in2 = this._parent[1].getOutput(this._index[1]);
            return op.and(in1, in2);
        }
    }
}

class OR extends Logic_Gate {
    constructor(x, y) {
        super("OR", x, y, Images[5], 2, 1, [empty_in, empty_in], [0, 0]);
        this.getOutput = function (index) {
            let in1 = this._parent[0].getOutput(this._index[0]);
            let in2 = this._parent[1].getOutput(this._index[1]);
            return op.or(in1, in2);
        }
    }
}

class NAND extends Logic_Gate {
    constructor(x, y) {
        super("NAND", x, y, Images[0], 2, 1, [empty_in, empty_in], [0, 0]);
        this.getOutput = function (index) {
            /*
            let in1 = this._parent[0].getOutput(this._index[0]);
            let in2 = this._parent[1].getOutput(this._index[1]);
            */
            return op.nand(this._parent[0].getOutput(this._index[0]), this._parent[1].getOutput(this._index[1]));
            
        }
    }
}

class NOR extends Logic_Gate {
    constructor(x, y) {
        super("NOR", x, y, Images[6], 2, 1, [empty_in, empty_in], [0, 0]);
        this.getOutput = function (index) {
            
            let in1 = this._parent[0].getOutput(this._index[0]);
            let in2 = this._parent[1].getOutput(this._index[1]);
            return op.nor(in1, in2);
            
        }
    }
}

class XOR extends Logic_Gate {
    constructor(x, y) {
        super("XOR", x, y, Images[7], 2, 1, [empty_in, empty_in], [0, 0]);
        this.getOutput = function (index) {
            let in1 = this._parent[0].getOutput(this._index[0]);
            let in2 = this._parent[1].getOutput(this._index[1]);
            return op.xor(in1, in2);
        }
    }
}

class XNOR extends Logic_Gate {
    constructor(x, y) {
        super("XNOR", x, y, Images[8], 2, 1, [empty_in, empty_in], [0, 0]);
        this.getOutput = function (index) {
            let in1 = this._parent[0].getOutput(this._index[0]);
            let in2 = this._parent[1].getOutput(this._index[1]);
            return op.xnor(in1, in2);
        }
    }
}

class Half_Adder extends Logic_Gate{
    constructor(x, y){
        super("Half_Adder", x, y, Images[11], 2, 2, [empty_in, empty_in], [0,0]);
        this.getOutput = function (index) {
            let in1 = this._parent[0].getOutput(this._index[0]);
            let in2 = this._parent[1].getOutput(this._index[1]);
            if(index==0){
                return op.xor(in1,in2);
            }
            else{
                return op.and(in1,in2);
            }
        }
    }
}

class Full_Adder extends Logic_Gate{
    constructor(x, y){
        super("Full_Adder", x, y, Images[12], 3, 2, [empty_in, empty_in, empty_in], [0,0,0]);
        this.getOutput = function (index) {
            let in1 = this._parent[0].getOutput(this._index[0]);
            let in2 = this._parent[1].getOutput(this._index[1]);
            let in3 = this._parent[2].getOutput(this._index[2]);
            if(index==0){
                return op.xor(op.xor(in1,in2),in3);
            }
            else{
                let l = op.and(in1,in2);
                let r = op.and(op.xor(in1,in2), in3)
                return op.or(l,r);
            }
        }
    }
}