class Board
{
    //Constructor
    constructor(targetID="none", sizeX=0, sizeY=0)
    {
        this._board = new Array;
        this._sizeX = sizeX;
        this._sizeY = sizeY;

        //console.log("Board was created!");
        let target = document.getElementById(targetID);
        if(target)
            console.log("I have been created!");
        else
            console.log("Unable to find element with that id.");

        //Fill the board using sizeX and sizeY
        for(let i=0; i<this._sizeY; i++)
        {
            this._board.push(new Array);
            for(let ii=0; ii<this._sizeX; ii++)
                this._board[i].push(0);
        }        
    }

    //TODO Make sure when you return a copy of this that it is NOT a reference!
    getState()
    {
        return this._board;
    }

    //Checking for valid entries will be done by an external function. Return 0 if spot is taken, return -1 if out of bounds
    setMove(playerID, x, y)
    {
        //TODO actually do validation: playerID and x/y must be whole numbers above 0 and within board boundaries
        //TODO maybe convert input to reverse "y" and subtract by offset? or willl that just confuse the AI? 
        //TODO remember to add "1" to input values

        if(x >= 0 && x < this._sizeX && y >= 0 && y < this._sizeX)
        {
            if(this._board[y][x] == 0)            
                this._board[y][x] = playerID;            
            else
                return 0; //This spot is taken
        }
        else
            return -1; //Out of bounds
    }
}
