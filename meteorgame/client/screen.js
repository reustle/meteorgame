Template.screen.onCreated(function() {
	
  var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', {
    preload: preload, create: create, update: update, render: render
  });

  var bg;

  var playerByGamepadId = {};
  var playerCollissionGroup;
  var platformCG;

  var createPlayer = function(newPad) {
    var player = game.add.sprite(32, 32, 'dude');
	
	var colormap = {
		'red': 0xff0000,
		'orange': 0xff9900,
		'yellow': 0xffff00,
		'green': 0x00ff00,
		'blue': 0x0000ff,
		'purple': 0x9900cc,
		'white': 0xffffff,
		'gray': 0xa3a3a3
	}
	
	player.tint = colormap[newPad.color];
	
    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.body.bounce.y = 0.2;
    player.body.collideWorldBounds = true;
    player.body.setSize(20, 32, 5, 16);

    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('turn', [4], 20, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    player._jumpTimer = 0;
    player._facing = "left";
    return player;
  }

  Gamepad.find().observe({
    added: function(newPad) {
      var player = createPlayer(newPad);
      playerByGamepadId[newPad._id] = player;
      playerCollissionGroup.add(player);
    },
    removed: function(dyingPad) {
      var player = playerByGamepadId[dyingPad._id];
      delete playerByGamepadId[dyingPad._id]
      playerCollissionGroup.remove(player);
      player.destroy();
    }
  });

  function preload() {
      game.load.spritesheet('dude', 'assets/games/starstruck/dude.png', 32, 48);
      game.load.image('background', 'assets/games/starstruck/background2.png');
      game.stage.disableVisibilityChange = true;
      preload_level1(game);
  }

  function create() {
      game.physics.startSystem(Phaser.Physics.ARCADE);
      game.time.desiredFps = 30;
      bg = game.add.tileSprite(0, 0, 800, 600, 'background');
      game.physics.arcade.gravity.y = 250;
      playerCollissionGroup = game.add.physicsGroup();
      platformCG = load_level1(game);
  }

  function update() {
      _.each(playerByGamepadId, function(player, padId) {
          var playerGamepad = Gamepad.findOne(padId);
          player.body.velocity.x = 0;

          if (playerGamepad.dpad == "left") {
              player.body.velocity.x = -150;

              if (player._facing != 'left') {
                  player.animations.play('left');
                  player._facing = 'left';
              }
          }
          else if (playerGamepad.dpad == "right") {
              player.body.velocity.x = 150;

              if (player._facing != 'right') {
                  player.animations.play('right');
                  player._facing = 'right';
              }
          } else {
              if (player._facing != 'idle')
              {
                  player.animations.stop();

                  if (player._facing == 'left')
                  {
                      player.frame = 0;
                  }
                  else
                  {
                      player.frame = 5;
                  }

                  player._facing = 'idle';
              }
          }

          if (playerGamepad.btnA && game.time.now > player._jumpTimer) {
              player.body.velocity.y = -250;
              player._jumpTimer = game.time.now + 750;
          }
          game.physics.arcade.collide(player, platformCG);
      });

      game.physics.arcade.collide(playerCollissionGroup, playerCollissionGroup);
  }

  function render () {
      game.debug.text(game.time.suggestedFps, 32, 32);

      // game.debug.text(game.time.physicsElapsed, 32, 32);
      // game.debug.body(player);
      // game.debug.bodyInfo(player, 16, 24);
  }
});

