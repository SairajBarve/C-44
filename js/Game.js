class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
        if (gameState === 0) {
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form()
            form.display();
        }
        car1 = createSprite(100,200);
        car1.addImage("car1",car1_img);
        
        car2 = createSprite(400,width/2);
        car2.addImage("player2", car2_img);
        cars=[car1,car2];
    }
    
    play(){
        
        form.hide();

        Player.getPlayerInfo();
        
        if(allPlayers ! == undefined) {
        image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
        var x =100;
        var y;
        var index =0;
        

        for(var plr in allPlayers){
        
            index = index+1;
            x = x + 200;
           y = displayHeight - allPlayers[plr].distance;
            
            cars[index -1].x = x;
            cars[index - 1].y = y;

            if(index === player.index){   
                fill("black");
                textSize(25);
                text(allPlayers[plr].name ,x-25,y+25); 
            }
           
            // Add code to diplay the scores of both 
            // the players on the screen
            textSize(25)
            fill("white")
            text("player1  : "+ allPlayers.player1.score,50,50)
           
            text("player2  : "+ allPlayers.player2.score,50,100)
        }

        }

        if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 3860){
      gameState = 2;
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
  }
}
