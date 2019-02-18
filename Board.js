class Board
{
    //Constructor
    constructor(targetID="none", sizeY=0, sizeX=0)
    {
        this._sizeX = sizeX;
        this._sizeY = sizeY;
        this._board = new Array;

        //console.log("Board was created!");
        this._target = document.getElementById(targetID);
        if(this._target)
            console.log("I have been created!");
        else
            console.log("Unable to find element with that id."); //throw new error

        //Fill the board using sizeX and sizeY
        for(let i=0; i<this._sizeY; i++)
        {
            this._board.push(new Array);
            for(let ii=0; ii<this._sizeX; ii++)
                this._board[i].push(0);
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

    //Checking for valid entries will be done by an external function. Return 0 if spot is taken, return -1 if out of bounds, -2 if data passed is invalid, true otherwise
    setMove(playerID, y, x)
    {
        //TODO actually do validation: playerID and x/y must be whole numbers above 0 and within board boundaries            

        if(x >= 0 && x < this._sizeX && y >= 0 && y < this._sizeX)
        {
            if(this._board[y][x] == 0)    
            {
                this._board[y][x] = playerID;            
                return true;
            }        
            else
                return 0; //This spot is taken
        }
        else
            return -1; //Out of bounds
    }
}
