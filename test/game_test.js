var scene = new Phaser.Scene("game");

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: scene
};

var game = new Phaser.Game(config);

scene.init = function() {
    this.score = 0;
    this.lives = 3;
    this.speed = 1.5;
    this.dragon_move =1;
    this.score_ext;
    this.lives_text;

};

// scene.preload = function() {
//     this.load.image('background', 'images/tut/background.png');
// 	this.load.image('player', 'images/tut/');
// 	this.load.image('dragon', 'images/tut/pet_dragon_new.png');
// 	this.load.image('gold', 'images/tut/icon.png');

// };

scene.create = function() {
    //BACKGROUND 
    var bg= this.add.sprite(0, 0, 'background');
    bg.setOrigin(0,0);
    //score texte et game texte
    this.scoreText = this.add.text(100, 16, 'score: '+this.score, { fontSize: '32px', fill: '#000' });
    this.liveText = this.add.text(16, this.sys.game.config.height-50, 'Lives: ' + this.lives, {fontSize: '32px', fill: '#000'});
    //JOUEUR
    this.player= this.add.sprite(100, 150, 'player');
    this.player.setScale(0.3);
    //ajout de monstre
    this.dragon = this.add.sprite(350, 150, 'dragon');
    this.dragon.setScale;
    //GOLD
    this.gold= this.add.sprite(650,150,'gold');
    this.gold.setScale;
};

scene.update = function() {

};


scene.end = function() {

};