const Board = function(id="none", sizeX=0, sizeY=0)
{
    checkInstance(this, Board);
    //TODO write checks for constructor properties

    let _board = new Array;

    //Constructor
    this.Board = function()
    {
        //console.log("Board was created!");
        let target = document.getElementById(id);
        if(target)
            console.log("I have been created!");
        else
            console.log("Unable to find element with that id.");

        //Fill the board using sizeX and sizeY
        for(let i=0; i<sizeY; i++)
        {
            _board.push(new Array);
            for(let ii=0; ii<sizeX; ii++)
                _board[i].push(0);
        }        
    };

    //TODO Make sure when you return a copy of this that it is NOT a reference!
    this.getState = function()
    {
        return _board;
    };

    //Checking for valid entries will be done by an external function. Return 0 if spot is taken, return -1 if out of bounds
    this.setMove = function(playerID, x, y)
    {
        //TODO actually do validation: playerID and x/y must be whole numbers above 0 and within board boundaries

        if(x >= 0 && x < sizeX && y >= 0 && y < sizeY)
        {
            if(board[y][x] == 0)            
                board[y][x] = playerID;            
            else
                return 0; //This spot is taken
        }
        else
            return -1; //Out of bounds
    }

    //run constructor
    this.Board();
};