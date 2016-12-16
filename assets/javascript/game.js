	// character class
// healthPoints, baseAttackPower, attackPower, counterAttackPower

// game class
// GAME_STATES - Character Select, Defender Select, In Battle, Victory, Game Over
// initialize() - create characters, set game state
// resolveAttack(character1, character2)
// player (character)
// defenders[] (character)

// BEGIN Character //

function Character(id, name, healthPoints, baseAttackPower, counterAttackPower, imgHeadshot, imgFull) {
	this.id = id;
	this.healthPoints = healthPoints;
	this.baseAttackPower = baseAttackPower;
	this.attackPower = baseAttackPower;
	this.counterAttackPower = counterAttackPower;
	this.imgHeadshot = imgHeadshot;
	this.imgFull = imgFull;
	this.name = name;
}

Character.prototype.isDead = function {
	return (this.healthPoints < 1);
}

// END Character //

// BEGIN Game //

function Game() {
	var STATE_CHARACTER_SELECT = 0;
	var STATE_DEFENDER_SELECT = 1;
	var STATE_IN_BATTLE = 2;
	var STATE_VICTORY = 3;
	var STATE_GAME_OVER = 4;

	var gameState;

	var characters = [];
	var player;
	var defender;	
}

Game.prototype.setup = function() {
	// create characters - id, name, hp, atk, counter, imgHeadshot, imgFull
	//todo: imgFull
	characters.push(new Character(0, 'Luke', 10, 4, 5, 'luke-headshot.png', ''));
	characters.push(new Character(1, 'Darth Vader', 20, 3, 4, 'vader-headshot.png', ''));
	characters.push(new Character(2, 'Boba Fett', 30, 2, 3, 'boba-headshot.png', ''));
	characters.push(new Character(3, 'Yoda', 40, 1, 2, 'yoda-headshot.png', ''));

	// reset player
	player = null;

	// reset defender
	defender = null;

	// reset gameState
	gameState = STATE_CHARACTER_SELECT;
}

Game.prototype.resolveAttack = function(char1, char2) {
	char2.healthPoints -= char1.attackPower;
	char1.healthPoints -= char2.counterAttackPower;
	char1.attackPower += char1.baseAttackPower;

	updateGameState();
}

Game.prototype.selectPlayer = function(characterId) {
	//todo: set player variable
	player 
	//todo: remove player variable from characters
	//todo: set gameState to select defender
}

Game.prototype.selectDefender = function(characterId) {
	//todo: set defender variable
	//todo: remove defender variable from characters
	//todo: set gameState to inBattle
}

Game.prototype.updateGameState = function() {
	if (player.healthPoints < 1){
		// todo: player is dead
		// todo: set gameState to gameOver
	}

	if (defender.healthPoints < 1) {
		// current defender is dead
		if (characters.length < 1) {
			// todo: player wins
			// todo: set gameState to victory
		} else {
			// todo: re-enable defender select
			// todo: set gameState to selectDefender
		}
	}
}

var game;

$(document).ready(function() {
	console.log('document ready');

	game = new Game();
	game.setup();

	buildUi();

	updateUi();
});

function buildUi() {
	//todo: draw character panels in character select row
	var charSelect = $('#character-select');

	for (i in game.characters) {
		var panel = buildCharacterPanel(game.characters[i]);
		charSelect.append(panel);
	}

	console.log('end buildUi');
}

function buildCharacterPanel(character) {
	var img = $('<img>');
	img.addClass('headshot');
	img.attr('src', 'assets/images/' + character.imgHeadshot);

	var panel = $('<div>');
	panel.id = character.id;
	panel.addClass('col-md-3 col-sm-3 col-xs-3');
	panel.append(img);
}

function updateUi(){
	switch(game.gameState){
		case game.STATE_VICTORY:
			//todo: show victory message and reset button
			break;
		case game.STATE_GAME_OVER:
			//show failure message and reset button
			break;
		case game.STATE_IN_BATTLE:
			break;
		case game.STATE_DEFENDER_SELECT:
			//todo: hide character select row
			break;
		case game.STATE_CHARACTER_SELECT:
			//todo: show character select row
			$('#character-select').show();
			break;
		default:
			console.log('how did we get here?');
			break;
	}
}

