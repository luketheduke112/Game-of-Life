let main_canvas = document.getElementById("main-canvas")
let ctx = main_canvas.getContext("2d")

// [rows, columns]
size = [50,50]//You will be able to zoom in our out using the size feature in a later implementation.
ts = 10//Tile size
board = []

class Cell {
    constructor(x,y,life = 0) {
        this.x = x
        this.y = y
        this.life = life
    }

    make() {
        if(this.life == 0) {
            ctx.shadowBlur = 0
            ctx.strokeStyle = "rgb(94, 94, 94)"
            ctx.strokeRect(this.x,this.y,ts,ts)
        }else {
            ctx.shadowBlur = 5 //Add the white "glow effect" around each box
            ctx.shadowColor = "white"
            ctx.fillStyle = "rgb(255,255,255)"
            ctx.fillRect(this.x,this.y,ts,ts)
        }  
    }
}

function createGrid() {
    for(let i = 0; i < size[1]; i++){
        let row = []
        for(let i2 = 0; i2 < size[0]; i2++){
            let cell = new Cell(i*ts,i2*ts)//each time i call create board 
            row.push(cell)
        }
        board.push(row)
    }
}

function drawGrid() {//We need to split the drawing from the creation of the grid so that we can modify values in between.
    for(let i = 0; i < board.length; i++){
        for(let i2 = 0; i2 < board[0].length; i2++){
            board[i][i2].make()
        }
    }
}

console.log(board)

test_cell = new Cell(100,100)
createGrid()
let x = 1
function draw() {
    ctx.clearRect(0, 0, 1000, 1000); // clear canvas
    board[x][0].life = 1
    board[x-1][0].life = 0
    if(x <= board.length-2){
        x++
    }

    drawGrid()
    window.requestAnimationFrame(draw)
}
window.requestAnimationFrame(draw)