let gameScene = new Phaser.Scene('Game');

let config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 620,
    scene: gameScene
};

let game = new Phaser.Game(config);

gameScene.init = function() {
    this.playerSpeed = 2;
    this.enemyMaxY = 280;
    this.enemyMinY = 80;

}

gameScene.preload = function() {
    this.load.image('background', 'images/tut/background.png');
    this.load.image('player', 'images/tut/player.png');
    this.load.image('dragon', 'images/tut/pet_dragon_new.png');
    this.load.image('treasure', 'images/tut/gold.png');
};

gameScene.create = function() {
  let bg = this.add.sprite(0, 0, 'background');
  bg.setOrigin(0,0);
  this.player = this.add.sprite(40, this.sys.game.config.height / 1.61, 'player');
  this.player.setScale(0.20);

  
  this.treasure = this.add.sprite(this.sys.game.config.width - 20, this.sys.game.config.height / 2, 'treasure');
  this.treasure.setScale(0.05);

  this.enemies = this.add.group({ 
      key: 'dragon',
      repeat: 4,
      setXY: {
          x: 110,
          y: 300,
          stepX: 180,
          stepY: 35 
      },
  });

  
    this.enemies.width = 40;
    Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.8, -0.8 );
    
    //Je definis la vitesse de l'enemie
    Phaser.Actions.Call(this.enemies.getChildren(), function(enemy){
        enemy.speed = Math.random() * 2 + 1;
        
        
    }, this);
   // this.physics.add.collider(enemies, player);

    
    

    this.isPlayerAlive = true;
    this.cameras.main.resetFX();

};


gameScene.update = function() {
    if(!this.isPlayerAlive) {
        return;
    }

    if(this.input.activePointer.isDown) {
        //faire en sorte que player marche
        this.player.x += this.playerSpeed;
    }
    if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.treasure.getBounds()))
    {
        this.gameOver();

    }

    let enemies = this.enemies.getChildren();
    let numEnemies = enemies.lenght;

    for(let i = 0; i < numEnemies; i++) {
        
        enemies[i].y += enemies[i].speed;

        if(enemies[i].y >= this.enemyMaxY && enemies[i].speed > 0)
        {
            enemies[i].speed *= -1;
        } else if (enemies[i].y <= this.enemyMinY && enemies[i].speed < 0)
        {
            enemies[i].speed *= -1;
        }
        if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), enemies[i].getBounds()))
        {
            this.gameOver();
            break;
        }
    }
};

gameScene.gameOver = function() {

    this.isPlayerAlive = false;
    //ajout shake camera effect
    this.cameras.main.shake(500);

    this.time.delayedCall(500, function() {
        this.scene.restart();
    }, [], this);
    

};

gameScene.gameWin = function() {
    this.isPlayerAlive = false;
    this.camera.main.shake(500);

   // this.sprite.on('animationstart', listener);

    this.add.text(50, 50, 'WINNER, "Goudy Bookletter 1911", Times, serif' );

}