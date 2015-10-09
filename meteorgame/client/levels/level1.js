preload_level1 = function(game) {
  game.load.image('platform', 'assets/sprites/platform.png');
}

load_level1 = function(game) {
  var platforms = game.add.group();

  platforms.enableBody = true;

  var platform_array = [
    platforms.create(500, 150, 'platform'),
    platforms.create(-200, 300, 'platform'),
    platforms.create(400, 450, 'platform')
  ]
  _.each(platform_array, function(platform) {
    platform.body.immovable = true;
    platform.body.allowGravity = false;
  });

  return platforms;
}
