class WaveOne extends Phaser.Scene{
    rabbitsGone;
    counter = 0;
    healthText;
    constructor(){
        super("waveOne");

        this.my = {sprite: {}, text: {}};
    }
    preload(){
        this.load.setPath("./assets/");
        //enemy sprites
        this.load.image("rabbit", "rabbit.png");
        this.load.image("carrot", "carrot.png");

        //player sprites
        this.load.image("player", "female_back.png");
        this.load.image("donut", "donut.png");

        //background sprites
        this.load.image("houseGrayAlt2", "houseGrayAlt2.png");

        //sound
        this.load.audio("dadada", "jingles_NES13.ogg");




        
    }
    create(){

        let my = this.my;

        this.my.sprite.bullet = [];   
        this.my.sprite.rabbit = [];
        this.my.sprite.rabbitBullet = [];
        this.maxBullets = 10;  
        this.health = 5;
        this.rabbitsGone = false; // Flag to check if all rabbits are gone
        document.getElementById('description').innerHTML = '<h2>WaveOne.js</h2>'
        //this.healthText = this.add.text(70, 20, "Health: " + this.health, {fontSize: 20}).setOrigin(0.5, 0.5);


        this.add.tileSprite(0,0,1280,720, "houseGrayAlt2").setOrigin(0,0);
        my.sprite.player = this.add.sprite(game.config.width/2, game.config.height - 60, "player").setOrigin(0.5, 0.5);
        
        //spawns one rabbit every 2 seconds up until there have been 10 rabbits, pushes to sprite.rabbit
        //when all are gone, this.rabbitsGone = true;
        
        this.rabbitSpawnEvent = this.time.addEvent({
                delay: 2500,
                callback: () => {
                    // Spawn a new rabbit at a random x position
                    if (this.my.sprite.rabbit.length < 10) { // Ensure we don't exceed the limit of rabbits
                        let randomX = Phaser.Math.Between(50, game.config.width - 50);
                        let newRabbit = this.add.sprite(randomX, 80, "rabbit");
                        newRabbit.direction = "left"; // Initial direction
                        newRabbit.setScale(0.20);
                        newRabbit.visible = true; // Show the rabbit
                        this.my.sprite.rabbit.push(newRabbit); // Add to the array of rabbits
                    } else {
                        this.rabbitsGone = true;
                    }
                
                },
                callbackScope: this,
                loop: true
            });


        //when rabbit is visible, spawn carrot bullet every 2 seconds
       
        this.carrotSpawnEvent = this.time.addEvent({

            delay: 2500,
            callback: () => {
                for (let rabbit of this.my.sprite.rabbit){
                    console.log(this.my.sprite.rabbitBullet.length);
                    if (rabbit.visible == true){
                        let newCarrot = this.add.sprite(rabbit.x, rabbit.y + (rabbit.displayHeight/2), "carrot");
                        newCarrot.setScale(0.20);
                        this.my.sprite.rabbitBullet.push(newCarrot); // Add to the array of rabbit bullets
                    }
                }
            },
            callbackScope: this,
            loop: true
        });
        
        
        // Create key objects for player controls   
        this.left = this.input.keyboard.addKey("A");
        this.right = this.input.keyboard.addKey("D");
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.nextScene = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);



    }
    update(){
        let my = this.my;
        //this.healthText = this.add.text(70, 20, "Health: " + this.health, {fontSize: 20}).setOrigin(0.5, 0.5);

        if (this.left.isDown){
            // Check to make sure the sprite can actually move left
            if (this.my.sprite.player.x > (this.my.sprite.player.displayWidth/2)) {
                this.my.sprite.player.x -= 5; // Adjust speed as needed
            }
        }
        
        if (this.right.isDown) {
            // Check to make sure the sprite can actually move right
            if (this.my.sprite.player.x < (game.config.width - (this.my.sprite.player.displayWidth/2))) {
                this.my.sprite.player.x += 5; // Adjust speed as needed
            }
        }
        //shoot donut bullet when space is pressed, makes sure you don't exceed max bullets
        if (Phaser.Input.Keyboard.JustDown(this.space)) {
            if (this.my.sprite.bullet.length < this.maxBullets){
                this.my.sprite.bullet.push(this.add.sprite( this.my.sprite.player.x, this.my.sprite.player.y - (this.my.sprite.player.displayHeight/2), "donut"));
                this.my.sprite.bullet[my.sprite.bullet.length-1].setScale(2.0);
            }
        }

        if (this.health <= 0){
            if (this.rabbitSpawnEvent) {
                this.rabbitSpawnEvent.remove(); // Stop spawning rabbits if health is 0
                this.rabbitSpawnEvent = null;
            }
            if (this.carrotSpawnEvent) {
                this.carrotSpawnEvent.remove(); // Stop spawning carrots if health is 0
                this.carrotSpawnEvent = null;
            }
            for (let rabbit of this.my.sprite.rabbit) {
                rabbit.visible = false; // Hide all rabbits
            }
            this.add.text(400, 300, "Game Over! You were caught by a rabbit!\nPress Enter to return to Home Screen.", {fontSize: 20}).setOrigin(0.5, 0.5)
            if (Phaser.Input.Keyboard.JustDown(this.nextScene)) {
                this.scene.start("homeScreen");
            }
        }
        //checks to see if player bullet is off the top of the screen
        my.sprite.bullet = my.sprite.bullet.filter((bullet) => bullet.y > -(bullet.displayHeight/2));
        //checks to see if rabbit bullet is off the bottom of the screen
        my.sprite.rabbitBullet = my.sprite.rabbitBullet.filter((bullet) => bullet.y < game.config.height + (bullet.displayHeight/2));
        

        for (let bullet of this.my.sprite.bullet){
            for (let rabbit of this.my.sprite.rabbit){
                if (this.collides(rabbit, bullet)){
                    bullet.y = -100;
                    rabbit.visible = false;
                    this.sound.play("dadada", {
                        volume: 1   // Can adjust volume using this, goes from 0 to 1
                    });
                    this.counter++;
                    //console.log(this.counter);
                    rabbit.x = -100;
                    //this.my.sprite.rabbit.pop(rabbit);
                    //this.my.sprite.rabbit.destroy();
                    //console.log(rabbit);
                    break;
                    }
            }
        }
        for (let bullet of this.my.sprite.rabbitBullet){
            if (this.collides(my.sprite.player, bullet)){
                bullet.y = -100;
                my.sprite.rabbitBullet.splice(my.sprite.rabbitBullet.indexOf(bullet), 1);
                this.health--;
                console.log("Health: " + this.health);
            }
        }
        for (let rabbit of this.my.sprite.rabbit){
            if (this.collides(my.sprite.player, rabbit)){ 
                console.log("Game Over! You were caught by a rabbit!\nPress Enter to return to Home Screen.");
                this.add.text(400, 300, "Game Over! You were caught by a rabbit!\nPress Enter to return to Home Screen.", {fontSize: 20}).setOrigin(0.5, 0.5)
                if (Phaser.Input.Keyboard.JustDown(this.nextScene)) {
                    this.scene.start("homeScreen");
                }
            }
        }

        //try to make the rabbits follow a path
        for (let rabbit of this.my.sprite.rabbit){
            if (rabbit.visible == true){
                if (rabbit.direction === "left"){
                    rabbit.x -= 2; // Move rabbit left
                    if (rabbit.x <= 80){
                        rabbit.direction = "right";
                        rabbit.y += 60;
                    }
                } else if (rabbit.direction === "right"){
                    rabbit.x += 2; //move rabbit right
                    if (rabbit.x >= game.config.width - 80){
                        rabbit.direction = "left";
                        rabbit.y += 60;
                    }
                }
            }
        }
       
        //bullet move up for player
        for (let bullet of my.sprite.bullet) {
            bullet.y -= 5;
        }
        //bullet move down for rabbits
        for (let bullet of my.sprite.rabbitBullet){
            bullet.y += 5;
        }
       
        if (this.rabbitsGone == true && this.counter == 10){
            this.add.text(400, 300, "Not even animals can resist the donut!\nPress Enter to continue!", {fontSize: 20}).setOrigin(0.5, 0.5)
            //console.log("All rabbits gone, moving to next scene!");
            if (Phaser.Input.Keyboard.JustDown(this.nextScene)) {
                this.scene.start("waveTwo");
            }
        }
    }

    
    //code taken from professor Jim Whitehead's ArrayBoom.js example
    collides(a, b) {
        if (Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
        if (Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }

    
    
}