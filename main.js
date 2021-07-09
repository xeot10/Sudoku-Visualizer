const solve = document.querySelector("#solve");
const clear = document.querySelector("#clear");
const grid = document.querySelector("#grid");

let animationSpeed=30;
document.getElementById("slow").onclick = function(){
    animationSpeed=200;
    document.getElementById("navbarDropdown").innerHTML = "Slow";
};
document.getElementById("medium").onclick = function(){
    animationSpeed=30;
    document.getElementById("navbarDropdown").innerHTML = "Medium";
};
document.getElementById("fast").onclick = function(){
    animationSpeed=1;
    document.getElementById("navbarDropdown").innerHTML = "Fast";
};

clear.addEventListener('click', clickedClear);
solve.addEventListener('click', clickedSolve);

function clickedClear(e){
    clearmatrix();
}
function clearmatrix(){
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            grid.rows[i].cells[j].firstChild.value = "";
        }
    }
}

/*helper functions for backtracking*/
function makematrix(){
    let matrix = new Array(9);
    for(let i = 0; i < 9; i++){
        matrix[i] = new Array(10);
        for(let j = 0; j < 10; j++){
            matrix[i][j] = 0;
        }
    }
    return matrix;
}

function markit(i,j,k,flag,row,col,box){
    row[i][k]=flag;
    col[j][k]=flag;
    var boxno=(Math.floor(i/3))*3+Math.floor(j/3);
    box[boxno][k]=flag;
}
function issafe(i,j,k,row,col,box){
    var boxno=(Math.floor(i/3))*3+Math.floor(j/3);
    if(row[i][k]==1) return 0;
    if(col[j][k]==1) return 0;
    if(box[boxno][k]==1) return 0;
    return 1;
}

function util(i,j,matrix,row,col,box,animatearray){
    console.log(i,j);
    if(j==9) {i++;j=0;}
    if(i==9){
        console.log("solution found");
        return 1;
    }
    if(matrix[i][j]!=0){
        var f=util(i,j+1,matrix,row,col,box,animatearray);
        if(f==1) {return 1;}
    }else{
        for(var k=1;k<=9;k++){
            if(issafe(i,j,k,row,col,box)==1){
                animatearray.push([i,j,k]);
                matrix[i][j]=k;
                markit(i,j,k,1,row,col,box);
                var f=util(i,j+1,matrix,row,col,box,animatearray);
                if(f==1) {return 1;}
                matrix[i][j]=0;
                markit(i,j,k,0,row,col,box);
            }
        }
    }
    return 0;
}
/*helper function ends*/
function clickedSolve(e)
{
    var correctinp=removeclicks();
    if(correctinp==0) {return;}
    let matrix=readValue();
    let row=makematrix();
    let col=makematrix();
    let box=makematrix();
    for(var i=0;i<9;i++){
        for(var j=0;j<9;j++){
            if(matrix[i][j]!=0){
                if(issafe(i,j,matrix[i][j],row,col,box)==1){
                    markit(i,j,matrix[i][j],1,row,col,box);
                }else{
                    alertNoSolution();
                    clearmatrix();
                    setclicks();
                    return;
                }
            }
        }
    }
    let animatearray=[];
    var f=util(0,0,matrix,row,col,box,animatearray);
    doanimations(animatearray);
    for(var i=0;i<9;i++){
        for(var j=0;j<9;j++){
            matrix[i][j]=0;
        }
    }
    for(var i=0;i<9;i++){
        for(var j=0;j<10;j++){
            row[i][j]=0;col[i][j]=0;box[i][j]=0;
        }
    }
}

/*helper functions ends */
function doanimations(animatearray){
    if(animatearray.length==0){
        setclicks();
    }
    for(var i=0;i<animatearray.length;i++){
        animatearrayhelper(animatearray,i);
    }
}
function animatearrayhelper(animatearray,ii){
    setTimeout(function(){
        if(ii==animatearray.length-1){
            setclicks();
        }
        var i = animatearray[ii][0];
        var j = animatearray[ii][1];
        var val = animatearray[ii][2];
        grid.rows[i].cells[j].firstChild.value=val;
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < animationSpeed);

    }, 0.1);
}
function removeclicks(){
    solve.style.cursor = "not-allowed";// Change cursor mode
    clear.style.cursor = "not-allowed";
    // solve.removeEventListener('click', clickedSolve);// Remove function when click
    clear.removeEventListener('click', clickedClear);
}
function setclicks(){
    solve.setAttribute("style", "cursor: pointer"); // Allow to click solve button
    clear.setAttribute("style", "cursor: pointer"); // Allow to click clear button
    solve.addEventListener('click', clickedSolve);
    clear.addEventListener('click', clickedClear);
}

// Read value from web board to 2d array
function readValue()
{
    let matrix = new Array(9);
    for(let i = 0; i < 9; i++){
        matrix[i] = new Array(9);
        for(let j = 0; j < 9; j++){
            var val = grid.rows[i].cells[j].firstChild.value;
            if(val!="") {matrix[i][j]=parseInt(val);}
            else {matrix[i][j]=0;}
        }
    }
    return matrix;
}

function alertNoSolution()
{
    alert("No Solution!");
}

function printBoardOnWeb(matrix){
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            if(matrix[i][j] == 0)
                grid.rows[i].cells[j].firstChild.value = "";
            else
                grid.rows[i].cells[j].firstChild.value = matrix[i][j];
        }
    }
}
