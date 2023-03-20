// ctrlFn
function select_init_class(obj){
    let class_name = obj.value;
    if (class_name == "") return;
    let attr = init_class_map()[class_name].attr;

    // Update v_init_class (Model part)
    let i = 0;
    for (const key in attr){
        v_init_class[i] = attr[key];
        i++;
    }

    calculate_v_total();

    // Update the table display (View part)
    let cols = obj.parentElement.parentElement.children;
    for(let i = 1, j = 0; i <= 8; i++, j++){
        cols[i].innerText = v_init_class[j];
    }
    
    display_row_total();
}

// ctrlFn
// If there is 1 rows, just erase the data
function rm_row(obj){
    
    let rows = document.querySelectorAll(".item_row"); 
    if ( rows.length == 1 ) {

        // Model part
        if (mat.length == 1){
            mat = [
                [0,0,0,0,0,0,0,0]
            ];
        }
        else{
            console.log("Error");
        }
        calculate_v_total();

        // View part
        let tds = document.querySelectorAll(".item_row:last-of-type > td");
        for (let i = 0; i < tds.length; i++){
            switch(i){
                case 0:
                    tds[0].children.item(0).value = "";
                case 9:
                    break;
                default:
                    tds[i].innerText = "";
            }
        }

        display_row_total();
        
    }
    else{
        let index = Array.from(rows).indexOf(obj.parentElement.parentElement);

        // Model part
        mat.splice(index, 1);
        calculate_v_total();

        // View part
        obj.parentElement.parentElement.remove();
        display_row_total();
    }
}


// ctrlFn
function select_item(obj){

    let name_of_item = obj.value;
    if (name_of_item == "") return;
    let row = obj.parentElement.parentElement;
    var requires = Object.values(item_map()[name_of_item].requires);
    requires = requires.map( x => parseInt(x) );

    // Model Part
    let rows = document.querySelectorAll(".item_row"); 
    let index = Array.from(rows).indexOf(row);
    mat[index] = [0,0,0].concat(requires);
    calculate_v_total()

    // View part
    let tds = row.children;
    for (let i = 4, j = 0; 4 <= i && i <= 8; i++, j++){
        tds[i].innerText = requires[j];
    }
    display_row_total();

}

// ctrlFn
function ad_row(){

    // Model part
    mat.push( [0,0,0,0,0,0,0,0] );

    // View part
    // insert new row from the last row
    let row = document.querySelector("tbody").insertRow(-1);
    row.classList.add("item_row");
    row.innerHTML = item_selection_row_html;
    document.querySelector(".item_row:last-of-type > td > datalist#items").value = "";
}

// ctrlFn
function change_addi(obj){
    // Model part
    let objs = Array.from(document.querySelectorAll("input[type='number'"));
    let index = objs.indexOf(obj);
    v_add[index] = parseInt(obj.value);
    calculate_v_total();

    // View part
    display_row_total();
    obj.max = 99 - v_req[index] - v_init_class[index];

}


// Aux Compute
function elementwise_replace(v_target, v_other){
    for (let i = 0; i < v_target.length; i++){
        v_target[i] = v_target[i] < v_other[i] ? v_other[i] : v_target[i];
    }
}

// Aux Compute
function vector_add(v1, v2){
    let v3 = [];
    for (let i = 0; i < v1.length; i++){
        v3.push(v1[i] + v2[i]);
    }
    return v3;
}

// DataProcessFn
function calculate_v_req(){
    v_req = [0,0,0,0,0,0,0,0];

    // Calculate the maximum of the items
    mat.forEach(
        v => elementwise_replace(v_req, v)
    );

    for (let i = 0; i < v_req.length; i++){
        v_req[i] = v_init_class[i] >= v_req[i] ? 0 : v_req[i] - v_init_class[i];
    }
}

// DataProcessFn
function calculate_v_total(){
    calculate_v_req();
    v_total = [0,0,0,0,0,0,0,0];
    v_total = vector_add([0,0,0,0,0,0,0,0], v_init_class);
    v_total = vector_add(v_total, v_req);
    v_total = vector_add(v_total, v_add);
    // elementwise_replace(v_total, v_init_class);
    // elementwise_replace(v_total, v_req);


}

// DataProcessFn
function display_row_max(){
    let tds = document.querySelectorAll("#row_max > td");
    for (let i = 1, j = 0; j < v_total.length; i++, j++){
        tds[i].innerText = v_req[j];
    }
}

// View
function display_row_total(){
    display_row_max();
    let tds = document.querySelectorAll("#row_total > td");
    for (let i = 1, j = 0; j < v_total.length; i++, j++){
        tds[i].innerText = v_total[j];
    }

    
    let init_class = document.querySelector("select[name=\"init_class\"]").value;
    if (init_class != '') {
        let level = init_class_map()[init_class].level;
        let requiresd_level = v_total.reduce((partialSum, a) => partialSum + a, 0);
        requiresd_level -= v_init_class.reduce((partialSum, a) => partialSum + a, 0);
        requiresd_level += parseInt(level);
        document.querySelector("#mesg").innerText = "You need to be Level " + requiresd_level;
    }

}