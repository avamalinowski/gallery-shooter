class HomeScreen extends Phaser.Scene {
    constructor(){
        super("homeScreen");

        this.my = {sprite: {}, text: {}};

    }
    preload(){
        this.load.setPath("./assets/");
        this.load.bitmapFont("rocketSquare", "KennyRocketSquare_0.png", "KennyRocketSquare.fnt");
        this.load.image("houseGrayAlt2", "houseGrayAlt2.png");
    }
    create(){
        let my = this.my;
        
        this.add.tileSprite(0,0,1280,720, "houseGrayAlt2").setOrigin(0,0);
        this.nextScene = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.Two = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);
        this.add.text(400,300, "After a freak accident, your animals have gone crazy!\nYour last hope to calm them down is\nfeeding them your leftover birthday cake...\nHurry before things get worse!", {fontSize:20}).setOrigin(0.5, 0.5);
        this.add.text(400, 500, "Press Enter to start", 
            { fontFamily: 'Times, serif', fontSize: 36 }).setOrigin(0.5, 0.5);
        
        document.getElementById('description').innerHTML = '<h2>HomeScreen.js</h2>'
    }
    update(){
        if (Phaser.Input.Keyboard.JustDown(this.nextScene)){
            console.log("do these buttons work?");
            this.scene.start("waveOne");
        }
        if (Phaser.Input.Keyboard.JustDown(this.Two)) {
            console.log("does this button work?");
            this.scene.start("waveThree");
        }
        
    }
}