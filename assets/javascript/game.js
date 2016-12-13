// character class
// healthPoints, baseAttackPower, attackPower, counterAttackPower

// game class
// GAME_STATES - Character Select, Defender Select, In Battle, Victory, Game Over
// initialize() - create characters, set game state
// resolveAttack(character1, character2)
// player (character)
// defenders[] (character)

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

	function setup() {
		// create characters - id, hp, atk, counter
		characters.push(new Character(0, 10, 4, 5));
		characters.push(new Character(1, 20, 3, 4));
		characters.push(new Character(2, 30, 2, 3));
		characters.push(new Character(3, 40, 1, 2));

		// reset player
		player = null;

		// reset defender
		defender = null;

		// reset gameState
		gameState = STATE_CHARACTER_SELECT;
	}

	function resolveAttack(char1, char2) {
		char2.healthPoints -= char1.attackPower;
		char1.healthPoints -= char2.counterAttackPower;
		char1.attackPower += char1.baseAttackPower;

		updateGameState();
	}

	function selectPlayer(characterId) {
		//todo: set player variable
		//todo: remove player variable from characters
		//todo: set gameState to select defender
	}

	function selectDefender(characterId) {
		//todo: set defender variable
		//todo: remove defender variable from characters
		//todo: set gameState to inBattle
	}

	function updateGameState() {
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
}

function Character(id, healthPoints, baseAttackPower, counterAttackPower) {
	this.id = id;
	this.healthPoints = healthPoints;
	this.baseAttackPower = baseAttackPower;
	this.attackPower = baseAttackPower;
	this.counterAttackPower = counterAttackPower;
}