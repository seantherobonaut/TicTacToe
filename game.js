const Board = function(id="none", sizeX=0, sizeY=0)
{
    checkInstance(this, Board);
    //TODO write checks for constructor properties

    //Constructor
    this.Board = function()
    {
        //console.log("Board was created!");
        let target = document.getElementById(id);
        console.log("I have been created!");
    };

    this.getState = function()
    {

    };

    //run constructor
    this.Board();
};