class Board
{
    constructor(targetID="none", sizeY=0, sizeX=0)
    {
        //Dimensions
        this._sizeX = sizeX;
        this._sizeY = sizeY;

        //Private array for the board coordinates
        this._board = new Array;

        //console.log("Board was created!");
        this._target = document.getElementById(targetID);
        if(this._target)
            console.log("The game board has been created successfully!");
        else
            console.log("Unable to find element with that id."); //TODO throw new error

        //Fill the board using sizeX and sizeY
        for(let i=0; i<this._sizeY; i++)
        {
            this._board.push(new Array);
            for(let ii=0; ii<this._sizeX; ii++)
                this._board[i].push(0);
        }

        this._target.addEventListener("click", function()
        {
            console.log("Hello world!");
        });
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

    //Render the board on the screen
    render()
    {
        let result = "";
        //<div><span>O</span><span>X</span><span>X</span></div>
        for(let i=0; i<this._sizeY; i++)
        {
            result += "<div>";
            for(let ii=0; ii<this._sizeX; ii++)
            {
                result += "<span>";
                result += this._board[i][ii];
                result += "</span>";
            }
            result += "</div>";
        }

        this._target.innerHTML = result;
    }

    //Return array by value rather than reference
    getState()
    {
        return this._board.slice(0);
    }

    //Return true if the move is successful or false if the spot is already taken
    makeMove(playerObj)
    {
        if(playerObj instanceof PlayerBase)
        {
            //PlayerBase is responsible for input validation
            let playerMove = playerObj.getMove();

            let row = Math.ceil(playerMove / this._sizeX);
            let column = this._sizeX - (row*this._sizeX - playerMove);
            row--;
            column--;

            if(this._board[row][column] == 0)
            {
                this._board[row][column] = playerObj.id;
                return true;
            }
            else
                return false;
        }
        else
            throw new Error("Board.makeMove\'s 1st argument (playerObj) must be an instance of PlayerBase!");
    }
}
