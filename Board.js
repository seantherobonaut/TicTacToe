class Board
{
    constructor(targetID="none", sizeY=0, sizeX=0)
    {
        //Dimensions
        this._sizeX = sizeX;
        this._sizeY = sizeY;

        //Private array to hold the board and its elements
        this._board = new Array;

        //Private member that holds most recent move
        this._lastMove = 0;

        //Check to see if the board can be created
        this._target = document.getElementById(targetID);
        if(!this._target)
            console.log("Unable to find element with that id."); //TODO throw new error
        else
        {
            this.create();
            console.log("The board has been created successfully!");
        }
    }

    //Setup the board visually on the screen and setup the event listenders
    create()
    {
        //Fill internal this._board array with span elements with event listeners
        for(let i=0; i<this._sizeY; i++)
        {
            this._board.push(new Array);
            for(let ii=0; ii<this._sizeX; ii++)
            {
                this._board[i].push(document.createElement("span"));
                this._board[i][ii].innerText = " ";
            }
        }

        //Add event listeners to all array elements
        let instance = this;
        for(let i=0; i<this._sizeY; i++)
        {
            for(let ii=0; ii<this._sizeX; ii++)
            {
                this._board[i][ii].addEventListener("click", function()
                {
                    console.log("Element: ["+(i+1)+"]["+(ii+1)+"] was clicked!");
                    instance.setLastMove((i+1), (ii+1)); //Add 1 to avoid result of 0
                });
            }
        }

        //Insert array contents into the target html element
        for(let i=0; i<this._sizeY; i++)
        {
            let row = document.createElement("div");
            this._target.appendChild(row);

            for(let ii=0; ii<this._sizeX; ii++)
                row.appendChild(this._board[i][ii]);
        }
    }

    //Getters and setters for board dimensions
    get sizeX()
    {
        return this._sizeX;
    }
    set sizeX(value)
    {
        console.log("Board.sizeX is read-only! Passed value of \""+value+"\" will be ignored.");
    }
    get sizeY()
    {
        return this._sizeY;
    }
    set sizeY(value)
    {
        console.log("Board.sizeY is read-only! Passed value of \""+value+"\" will be ignored.");
    }

    //Return an array as current state of the board
    getState()
    {
        //TODO create an array to return from the embedded object
    }

    //Set this._lastMove to the number that was clicked (convert [y][x] to a number)
    setLastMove(y, x)
    {
        //TODO make a check to ensure the values fit (it only checks data, does not + or - to make it fit)
        this._lastMove = ((y*this._sizeX) - (this._sizeX-x));
        console.log("Last move: "+this._lastMove);
    }

    //Get last move, then set the last move to 0
    getLastMove()
    {
        //Store current move
        let move = this._lastMove;

        //Reset move back to 0;
        this._lastMove = 0;

        return move;
    }

    //Return true if the move is successful or false if the spot is already taken
    makeMove(playerObj, move)
    {
        if(playerObj instanceof PlayerBase)
        {
            //convert move into x and y
            let row = Math.ceil(move / this._sizeX);
            let column = this._sizeX - (row*this._sizeX - move);
            row--;
            column--;
            if(this._board[row][column].innerText == 0)
            {
                this._board[row][column].innerText = playerObj.id;
                return true;
            }
            else
                return false;
        }
        else
            throw new Error("Board.makeMove\'s 1st argument (playerObj) must be an instance of PlayerBase!");
    }
}
