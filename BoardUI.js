class BoardUI
{
    constructor(targetID="none", sizeY=0, sizeX=0)
    {
        //Dimensions
        this._sizeX = sizeX;
        this._sizeY = sizeY;

        //Private array to hold the board and its elements
        this._board = new Array;

        //Private member that holds most recent move as an array
        this._lastMove = null;

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
                    console.log("Element: ["+i+"]["+ii+"] was clicked!");
                    instance.pushMove(i, ii);
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

    //Set this._lastMove to the last move that was clicked
    pushMove(y, x)
    {
        this._lastMove = {"y":y, "x":x};
    }

    //Get the last move, then set the last move to null
    pullMove()
    {
        //Store current move
        let move = this._lastMove;

        //Reset move back to null;
        this._lastMove = null;

        return move;
    }

    writeMove(y,x, contents)
    {
        this._board[y][x].innerText = contents;
    }
}
