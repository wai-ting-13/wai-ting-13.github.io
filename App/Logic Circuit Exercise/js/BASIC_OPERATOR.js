class BASIC_OPERATOR {
    //define this class as a quasi-Singleton pattern
    static instance = new BASIC_OPERATOR(); //Constant

    constructor(){
        //Should not be visted
    }

    static getInstance(){
        return this.instance;
    }

    not(in1) {
        if (in1 == "n") {
            return "n";
        }
        else if (in1 == "0") {
            return "1"
        }
        return "0";
    }

    or(in1, in2) {
        if(in1 == "1" || in2 == "1"){
            return "1";
        }
        else if(in1 == "n" || in2 == "n"){
            return "n";
        }
        else{
            return "0";
        }
        /*
        let code = { "0": 0, "1": 1, "n": 0.5 };
        let revCode = { 0: "0", 1: "1", 0.5: "n" };
        return revCode[Math.max(code[in1], code[in2])];*/
    }

    and(in1, in2) {
        /*
        let code = { "0": 0, "1": 1, "n": 0.5 };
        let revCode = { 0: "0", 1: "1", 0.5: "n" };
        return revCode[Math.min(code[in1], code[in2])];*/
        if(in1 == "0" || in2 == "0"){
            return "0";
        }
        else if(in1 == "n" || in2 == "n"){
            return "n";
        }
        else{
            return "1";
        }
    }

    nand(in1, in2) {
        return this.not(this.and(in1, in2));
    }

    nor(in1, in2) {
        return this.not(this.or(in1, in2));
    }

    xor(in1, in2) {
        return this.and(this.or(in1, in2), this.not(this.and(in1, in2)));
    }

    xnor(in1, in2) {
        return this.not(this.xor(in1, in2));
    }
}

const op = BASIC_OPERATOR.getInstance();