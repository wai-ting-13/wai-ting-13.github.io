
function computeT2() {

    //Fill truth table data
    for (let i = 0; i < numOfRow; i++) {
        let binString = i.toString(2).padStart(ArrayOfIn.length, "0");
        let j = 0;
        for (; j < ArrayOfIn.length; j++) {
            ArrayOfIn[j].assign(binString.charAt(j));
            TRUTH_TABLE[i][j] = ArrayOfIn[j].getOutput(0);
        }
        for (let k = 0; j < ArrayOfIn.length + ArrayOfOut.length; j++, k++) {
            try {
                TRUTH_TABLE[i][j] = ArrayOfOut[k].getActual();
            } catch (err) {
                TRUTH_TABLE[i][j] = 'Error';
            }
        }

        for (let k = 0; j < ArrayOfIn.length + 2 * ArrayOfOut.length; j++, k++) {
            TRUTH_TABLE[i][j] = ArrayOfOut[k].getExpected();
        }
    }

    //Compute whether match or not
    for (let i = 0; i < numOfRow; i++){
        for(let j = 0; j < ArrayOfOut.length; j++){
            if(TRUTH_TABLE[i][ArrayOfIn.length+j] != TRUTH_TABLE[i][ArrayOfIn.length + ArrayOfOut.length +j]){
                return false;
            }
        }
    }
    return true;
}