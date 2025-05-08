class WaveThree extends Phaser.Scene{
    rabbitsGone;
    pandasGone;
    monkeysGone;
    rabbitCounter = 0;
    pandaCounter = 0;
    monkeyCounter = 0;
    constructor(){
        super("waveThree");

        this.my = {sprite: {}, text: {}};
    }
    preload(){
        this.load.setPath("./assets/");
        //enemy sprites
        this.load.image("rabbit", "rabbit.png");
        this.load.image("carrot", "carrot.png");
        this.load.image("panda", "panda.png");
        this.load.image("cactus", "cactus.png");
        this.load.image("monkey", "monkey.png");
        this.load.image("spike", "spike_bottom.png");

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
        this.my.sprite.panda = [];
        this.my.sprite.monkey = [];
        this.my.sprite.rabbitBullet = [];
        this.my.sprite.pandaBullet = [];
        this.my.sprite.monkeyBullet = [];

        this.maxBullets = 10;  
        this.health = 5;
        this.rabbitsGone = false; // Flag to check if all rabbits are gone
        this.pandasGone = false;
        this.monkeysGone = false;
        document.getElementById('description').innerHTML = '<h2>WaveThree.js</h2>'

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
                        console.log(this.rabbitsGone);
                    }
                
                },
                callbackScope: this,
                loop: true
            });
        this.monkeySpawnEvent = this.time.addEvent({
            delay: 4000,
            callback: () => {
                if (this.my.sprite.monkey.length < 7){
                    let randomX = Phaser.Math.Between(50, game.config.width - 50);
                    let newMonkey = this.add.sprite(randomX, 80, "monkey");
                    newMonkey.direction = "left";
                    newMonkey.setScale(0.20);
                    newMonkey.visible = true; // Show the rabbit
                    this.my.sprite.monkey.push(newMonkey); // Add to the array of rabbits
                } else {
                    this.monkeysGone = true;
                    console.log(this.monkeysGone);
                }
            },
            callbackScope: this,
            loop: true
        });
        this.pandaSpawnEvent = this.time.addEvent({
            delay: 4000,
            callback: () => {
                // Spawn a new rabbit at a random x position
                if (this.my.sprite.panda.length < 5) { // Ensure we don't exceed the limit of rabbits
                    let randomX = Phaser.Math.Between(50, game.config.width - 50);
                    let newPanda = this.add.sprite(randomX, 80, "panda");
                    //newPanda.direction = "left"; // Initial direction
                    newPanda.setScale(0.20);
                    newPanda.visible = true; // Show the rabbit
                    this.my.sprite.panda.push(newPanda); // Add to the array of rabbits
                } else {
                    console.log(this.my.sprite.panda.length);
                    this.pandasGone = true;
                    console.log(this.pandasGone);
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
        this.cactusSpawnEvent = this.time.addEvent({
            delay: 4000,
            callback: () => {
                for (let panda of this.my.sprite.panda){
                    if (panda.visible == true){
                        let newCactus = this.add.sprite(panda.x, panda.y + (panda.displayHeight/2), "cactus");
                        newCactus.setScale(0.20);
                        this.my.sprite.pandaBullet.push(newCactus); // Add to the array of rabbit bullets
                    }
                }
            },
            callbackScope: this,
            loop: true
        });
        this.spikeSpawnEvent = this.time.addEvent({
            delay: 1500,
            callback: () => {
                for (let monkey of this.my.sprite.monkey){
                    if (monkey.visible == true){
                        let newSpike = this.add.sprite(monkey.x, monkey.y + (monkey.displayHeight/2), "spike");
                        newSpike.setScale(0.20);
                        this.my.sprite.monkeyBullet.push(newSpike); // Add to the array of rabbit bullets
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

        if ((this.rabbitsGone == true && this.rabbitCounter >= 10) && (this.pandasGone == true && this.pandaCounter >= 5) && (this.monkeysGone == true && this.monkeyCounter >= 7)){
            console.log("was everything true?");
                this.add.text(400, 300, "World Class Vet!! You saved all your animals :D\nPress Enter to restart!", {fontSize: 20}).setOrigin(0.5, 0.5)
                if (Phaser.Input.Keyboard.JustDown(this.nextScene)) {
                    this.scene.start("homeScreen");
                }
            
        }
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
            if (this.rabbitSpawnEvent || this.carrotSpawnEvent || this.pandaSpawnEvent) {
                this.rabbitSpawnEvent.remove(); // Stop spawning rabbits if health is 0
                this.rabbitSpawnEvent = null;
                this.carrotSpawnEvent.remove(); // Stop spawning carrots if health is 0
                this.carrotSpawnEvent = null;
                this.pandaSpawnEvent.remove(); // Stop spawning pandas if health is 0  
                this.pandaSpawnEvent = null;
                this.monkeySpawnEvent.remove(); // Stop spawning pandas if health is 0 
                this.monkeySpawnEvent = null;
            }
            //if (this.carrotSpawnEvent) {
            //    this.carrotSpawnEvent.remove(); // Stop spawning carrots if health is 0
            //    this.carrotSpawnEvent = null;
            //}
            //if (this.pandaSpawnEvent) {
            //    this.pandaSpawnEvent.remove(); // Stop spawning pandas if health is 0
            //    this.pandaSpawnEvent = null;
            //}
            //if ()
            for (let rabbit of this.my.sprite.rabbit) {
                rabbit.visible = false; // Hide all rabbits
            }
            for (let panda of this.my.sprite.panda){
                panda.visible = false; // Hide all pandas
            }
            this.add.text(400, 300, "Game Over! Your animals got to you!\nPress Enter to return to Home Screen.", {fontSize: 20}).setOrigin(0.5, 0.5)
            if (Phaser.Input.Keyboard.JustDown(this.nextScene)) {
                this.scene.start("homeScreen");
            }
        }
        //checks to see if player bullet is off the top of the screen
        my.sprite.bullet = my.sprite.bullet.filter((bullet) => bullet.y > -(bullet.displayHeight/2));
        //checks to see if rabbit bullet is off the bottom of the screen
        my.sprite.rabbitBullet = my.sprite.rabbitBullet.filter((bullet) => bullet.y < game.config.height + (bullet.displayHeight/2));
        my.sprite.pandaBullet = my.sprite.pandaBullet.filter((bullet) => bullet.y < game.config.height + (bullet.displayHeight/2));
        my.sprite.monkeyBullet = my.sprite.monkeyBullet.filter((bullet) => bullet.y < game.config.height + (bullet.displayHeight/2));

        for (let bullet of this.my.sprite.bullet){
            for (let rabbit of this.my.sprite.rabbit){
                if (this.collides(rabbit, bullet)){
                    bullet.y = -100;
                    rabbit.visible = false;
                    this.sound.play("dadada", {
                        volume: 1   // Can adjust volume using this, goes from 0 to 1
                    });
                    this.rabbitCounter++;
                    rabbit.x = -100;
                    break;
                    }
            }
            for (let panda of this.my.sprite.panda){
                if (this.collides(panda, bullet)){
                    bullet.y = -100;
                    panda.visible = false;
                    this.sound.play("dadada", {
                        volume: 1   // Can adjust volume using this, goes from 0 to 1
                    });
                    this.pandaCounter++;
                    console.log("Panda Counter: " + this.pandaCounter);
                    panda.x = -100;
                    break;
                }
            }
            for (let monkey of this.my.sprite.monkey){
            if (this.collides(monkey, bullet)){
                bullet.y = -100;
                monkey.visible = false;
                this.sound.play("dadada", {
                    volume: 1   // Can adjust volume using this, goes from 0 to 1
                });
                this.monkeyCounter++;
                console.log("Monkey Counter: " + this.monkeyCounter);
                monkey.x = -100;
                break;
                }
            }
        }
        
        //check for collision between player and rabbit bullet
        for (let bullet of this.my.sprite.rabbitBullet){
            if (this.collides(my.sprite.player, bullet)){
                bullet.y = -100;
                my.sprite.rabbitBullet.splice(my.sprite.rabbitBullet.indexOf(bullet), 1);
                this.health--;
                console.log("Health: " + this.health);
            }
        }
        //check for collision between player and panda bullet
        for (let bullet of this.my.sprite.pandaBullet){
            if (this.collides(my.sprite.player, bullet)){
                bullet.y = -100;
                my.sprite.pandaBullet.splice(my.sprite.pandaBullet.indexOf(bullet), 1);
                this.health--;
                console.log("Health: " + this.health);
            }
        }
        for (let bullet of this.my.sprite.monkeyBullet){
            if (this.collides(my.sprite.player, bullet)){
                bullet.y = -100;
                my.sprite.monkeyBullet.splice(my.sprite.monkeyBullet.indexOf(bullet), 1);
                this.health--;
                console.log("Health: " + this.health);
            }
        }
        //check for collision between player and rabbit
        for (let rabbit of this.my.sprite.rabbit){
            if (this.collides(my.sprite.player, rabbit)){ 
                console.log("Game Over! You were caught by a rabbit!\nPress Enter to return to Home Screen.");
                this.add.text(400, 300, "Game Over! You were caught by a rabbit!\nPress Enter to return to Home Screen.", {fontSize: 20}).setOrigin(0.5, 0.5)
                if (Phaser.Input.Keyboard.JustDown(this.nextScene)) {
                    this.scene.start("homeScreen");
                }
            }
        }
        for (let panda of this.my.sprite.panda){
            if (this.collides(my.sprite.player, panda)){ 
                console.log("Game Over! You were caught by a panda!\nPress Enter to return to Home Screen.");
                this.add.text(400, 300, "Game Over! You were caught by a panda!\nPress Enter to return to Home Screen.", {fontSize: 20}).setOrigin(0.5, 0.5)
                if (Phaser.Input.Keyboard.JustDown(this.nextScene)) {
                    this.scene.start("homeScreen");
                }
            }
        }
        for (let monkey of this.my.sprite.monkey){
            if (this.collides(my.sprite.player, monkey)){ 
                console.log("Game Over! You were caught by a monkey!\nPress Enter to return to Home Screen.");
                this.add.text(400, 300, "Game Over! You were caught by a monkey!\nPress Enter to return to Home Screen.", {fontSize: 20}).setOrigin(0.5, 0.5)
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
        for (let monkey of this.my.sprite.monkey){
            if (monkey.visible == true){
                if (monkey.direction === "left"){
                    monkey.x -= 5; // Move rabbit left
                    if (monkey.x <= 80){
                        monkey.direction = "right";
                        monkey.y += 60;
                    }
                } else if (monkey.direction === "right"){
                    monkey.x += 5; //move rabbit right
                    if (monkey.x >= game.config.width - 80){
                        monkey.direction = "left";
                        monkey.y += 60;
                    }
                }
            }
        }
        //move the panda towards the player
        for (let panda of this.my.sprite.panda){
            if (panda.visible == true){
                let dx = my.sprite.player.x - panda.x;
                let dy = my.sprite.player.y - panda.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance > 1){
                    panda.x += (dx / distance) * 1; //1 is speed
                    panda.y += (dy / distance) * 1; //1 is speed
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
        for (let bullet of my.sprite.pandaBullet){
            bullet.y += 5;
        }
        for (let bullet of my.sprite.monkeyBullet){
            bullet.y += 5;
        }
    }
    //code taken from professor Jim Whitehead's ArrayBoom.js example
    collides(a, b) {
        if (Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
        if (Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }

    
    
}