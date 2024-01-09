
let btn=document.getElementById("submit");

let board = [[0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0,0]
            ]




function solveBoard (row,col){
    
    if (row==9){
        return true;
    }
    let nextRow=row;
    let nextCol=col+1;
    if (col+1==9){
        nextRow=row +1;
        nextCol = 0;
    }
    if (board[row][col] != 0){
        return solveBoard(nextRow, nextCol);
    }else {
        for (let dig=1;dig<=9;dig++){
            if (isSafe(row,col,parseInt(dig))){
                board[row][col]=parseInt(dig);
                if (solveBoard(nextRow,nextCol)){
                    return true;
                }
            }
            board[row][col]=0;
        }
    }
    
    return false;
}
function isSafe(row,col,dig){
    if (board[row][col]<0 || board[row][col]>9){
        return false;
    }
    for (let i=0;i<=8;i++){
        if (i==row){
            continue;
        }
        if(board[i][col]==parseInt(dig))
        return false;
    }
    for (let i=0;i<=8;i++){
        if (i==col){
            continue;
        }
        if(board[row][i]==parseInt(dig))
        return false;
    }
    let sr= parseInt((row/3));
        sr = sr*3;
    let sc=parseInt((col/3));
        sc = sc*3;
    for (let i=sr;i<sr+3;i++){
        for (let j=sc;j<sc+3;j++){
            if (i==row && j==col){
                continue;
            }
            if(board[i][j]==parseInt(dig))
            return false;
        }
    }
    return true;
}


btn.addEventListener('click',()=>{
    let valuesBoard=document.querySelectorAll(".box");
    let idx=0;
   for (let i=1;i<=9;i++){
       for (let j=1;j<=9;j++){
        if (valuesBoard[idx].value!=''){
            if (parseInt(valuesBoard[idx].value)>9 || parseInt(valuesBoard[idx].value)<0  || parseInt(valuesBoard[idx].value)==NaN){
                alert("tum Chutiye ho");
            }
        }
           if (valuesBoard[idx].value==''){
            board[i-1][j-1]=0;
           }else {
            board[i-1][j-1]=parseInt(valuesBoard[idx].value);
           }
           idx++;
       }
   }
   
   if (validboard()){
       solveBoard(0,0);
    let idx=0;
    for (let i=1;i<=9;i++){
        for (let j=1;j<=9;j++){
            valuesBoard[idx].value=board[i-1][j-1];
            idx++;
        }
   }
}
    
   else {
       alert("invalid Sudoku");
   }




});

function validboard () {
    
    for (let i=0;i<9;i++){
        for (let j=0;j<9;j++){
            if (board[i][j]!=0){
                if (!isSafe(i,j,board[i][j])){
                    return false;
                }
            }
        }
    }return true;
}

