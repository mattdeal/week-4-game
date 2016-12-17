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

Character.prototype.isDead = function() {
	return (this.healthPoints < 1);
}

// END Character //

// BEGIN Game //

function Game() {
	this.STATE_CHARACTER_SELECT = 0;
	this.STATE_DEFENDER_SELECT = 1;
	this.STATE_IN_BATTLE = 2;
	this.STATE_VICTORY = 3;
	this.STATE_GAME_OVER = 4;

	this.gameState;
	this.characters;
	this.player;
	this.defender;	

	this.maxHealthPoints;
	this.maxBaseAttackPower;
	this.maxCounterAttackPower;
}

Game.prototype.setup = function() {
	// create characters - id, name, hp, atk, counter, imgHeadshot, imgFull
	//todo: imgFull
	this.characters = [];
	this.characters.push(new Character(0, 'Luke', 10, 3, 3, 'luke-headshot.png', 'luke.jpg'));
	this.characters.push(new Character(1, 'Darth Vader', 20, 4, 4, 'vader-headshot.png', 'vader.jpg'));
	this.characters.push(new Character(2, 'Boba Fett', 30, 2, 5, 'boba-headshot.png', 'boba.jpg'));
	this.characters.push(new Character(3, 'Yoda', 40, 1, 2, 'yoda-headshot.png', 'yoda.jpg'));

	this.maxHealthPoints = 0;
	this.maxBaseAttackPower = 0;
	this.maxCounterAttackPower = 0;

	for (i in this.characters) {
		this.maxHealthPoints < this.characters[i].healthPoints ? this.maxHealthPoints = this.characters[i].healthPoints : null;
		this.maxBaseAttackPower < this.characters[i].attackPower ? this.maxBaseAttackPower = this.characters[i].attackPower : null;
		this.maxCounterAttackPower < this.characters[i].counterAttackPower ? this.maxCounterAttackPower = this.characters[i].counterAttackPower : null;
	}

	// console.log('maxHealthPoints = ' + this.maxHealthPoints);
	// console.log('maxBaseAttackPower = ' + this.maxBaseAttackPower);
	// console.log('maxCounterAttackPower = ' + this.maxCounterAttackPower);

	// reset player
	this.player = null;

	// reset defender
	this.defender = null;

	// reset gameState
	this.gameState = this.STATE_CHARACTER_SELECT;
}

Game.prototype.resolveAttack = function() {
	this.defender.healthPoints -= this.player.attackPower;
	this.player.healthPoints -= this.defender.counterAttackPower;
	this.player.attackPower += this.player.baseAttackPower;

	this.updateGameState();
}

Game.prototype.selectPlayer = function(characterId) {
	for (i in this.characters) {
		if (this.characters[i].id === characterId) {
			console.log('selected player ' + this.characters[i].name);

			// set player variable
			this.player = this.characters[i];

			// remove player from characters
			this.characters.splice(i, 1);

			// set gameState
			this.gameState = this.STATE_DEFENDER_SELECT;

			return;
		}
	}
}

Game.prototype.selectDefender = function(characterId) {
	for (i in this.characters) {
		if (this.characters[i].id === characterId) {
			console.log('selected defender ' + this.characters[i].name);

			// set defender variable
			this.defender = this.characters[i];

			// remove defender from characters
			this.characters.splice(i, 1);

			// set gameState
			this.gameState = this.STATE_IN_BATTLE;

			return;
		}
	}
}

Game.prototype.updateGameState = function() {
	if (this.player.healthPoints < 1) {
		this.gameState = this.STATE_GAME_OVER;
		console.log('You died.');
	}

	if (this.defender.healthPoints < 1) {
		if (this.characters.length < 1) {
			this.defender = null;
			this.gameState = this.STATE_VICTORY;
			console.log('VICTORY!!!');
		} else {
			console.log( this.player.name + ' defeated ' + this.defender.name);
			this.gameState = this.STATE_DEFENDER_SELECT;
		}
	}
}

// END Game

var game;

$(document).ready(function() {
	game = new Game();
	game.setup();

	buildUi();
	updateUi();

	$('.thumb-character-select').on('click', function() {
		switch(game.gameState){
			case game.STATE_DEFENDER_SELECT:
				game.selectDefender($(this).data('character-id'));
				break;
			case game.STATE_CHARACTER_SELECT:
				game.selectPlayer($(this).data('character-id'));
				buildPlayerPanel();				
				break;
			default:
				console.log('You are not supposed to be clicking that right now...');
				break;
		}

		updateUi();
	});

	$('#battle-btn').on('click', function() {
		game.resolveAttack();

		// animate the battle!
		var player = $($('.battle-pic')[0]);
		var defender = $($('.battle-pic')[1]);

		player.css('transform', 'rotate(-30deg)');
		defender.css('transform', 'rotate(30deg)');

		setTimeout(function() {
			defender.css('transform', 'rotate(-30deg)');
			player.css('transform', 'rotate(30deg)');
		} , 1000);
		
		// delay ui update
		setTimeout(updateUi, 2000);
	});
});

function buildUi() {
	// draw character panels in character select row
	var charSelect = $('#character-select');

	for (i in game.characters) {
		var panel = buildCharacterPanel(game.characters[i], 'thumb-character-select', 'col-md-3 col-sm-3 col-xs-3');
		charSelect.append(panel);
	}
}

function buildProgressBar(progressValue, progressType) {
	var progress = $('<div></div>');
	progress.addClass('progress');
	progress.html('<div class="progress"><div class="progress-bar ' 
		+ progressType 
		+ '" role="progressbar" aria-valuenow="' 
		+ progressValue 
		+ '" aria-valuemin="0" aria-valuemax="100" style="width: '
		+ progressValue 
		+ '%;"></div></div>');

	return progress;
}

function buildCharacterPanel(character, thumbClass, panelClass) {
	// headshot
	var img = $('<img>');
	img.addClass('headshot');
	img.attr('src', 'assets/images/' + character.imgHeadshot);

	var imgContainer = $('<a></a>');
	imgContainer.addClass('thumbnail');
	imgContainer.addClass(thumbClass);
	imgContainer.attr('href','#');
	imgContainer.data('character-id', character.id);
	imgContainer.append(img);

	// stat bars
	var healthPoints = buildProgressBar(character.healthPoints / game.maxHealthPoints * 100, 'progress-bar-success');
	var baseAttackPower = buildProgressBar(character.baseAttackPower / game.maxBaseAttackPower * 100, 'progress-bar-warning');
	var counterAttackPower = buildProgressBar(character.counterAttackPower / game.maxCounterAttackPower * 100, 'progress-bar-danger');

	// panel header
	var panelHeader = $('<div class="panel-heading"><h4>' + character.name + '</h4></div>');

	// panel body
	var panelBody = $('<div class="panel-body"></div>');
	panelBody.append(imgContainer);
	panelBody.append($('<div>Health</div>'));
	panelBody.append(healthPoints);
	panelBody.append($('<div>Attack</div>'));
	panelBody.append(baseAttackPower);
	panelBody.append($('<div>Counter</div>'));
	panelBody.append(counterAttackPower);

	// panel
	var panel = $('<div class="panel panel-default"></div>');
	panel.append(panelHeader);
	panel.append(panelBody);

	// col containing character
	var characterPanel = $('<div class="' + panelClass + '"></div>');
	characterPanel.append(panel);

	return characterPanel;
}

function buildPlayerPanel() {
	var playerPanel = $('#player-panel');
	playerPanel.empty();
	playerPanel.append(buildCharacterPanel(game.player, 'thumb-player', 'col-md-12 col-sm-12 col-xs-12'));
}

function buildDefenderSelect() {
	var defenderPanel = $('#defender-panel');
	defenderPanel.empty();

	for(i in game.characters) {
		defenderPanel.append(buildCharacterPanel(game.characters[i], 'thumb-defender-select', 'col-md-4 col-sm-4 col-xs-4'));
	}

	$('.thumb-defender-select').on('click', function() {
		switch(game.gameState){
			case game.STATE_DEFENDER_SELECT:
				game.selectDefender($(this).data('character-id'));
				break;
			case game.STATE_CHARACTER_SELECT:
				game.selectPlayer($(this).data('character-id'));
				buildPlayerPanel();				
				break;
			default:
				console.log('You are not supposed to be clicking that right now...');
				break;
		}

		updateUi();
	});
}

function buildBattleImage(character, thumbClass) {
	// full pic
	var img = $('<img>');
	img.addClass('battle-pic');
	img.attr('src', 'assets/images/' + character.imgFull);

	var imgContainer = $('<a></a>');
	imgContainer.addClass('thumbnail');
	imgContainer.addClass(thumbClass);
	imgContainer.attr('href','#');
	imgContainer.data('character-id', character.id);
	imgContainer.append(img);

	return imgContainer;
}

function buildBattle() {
	$('#player').empty().append(buildBattleImage(game.player, 'battle-pic-player'));
	$('#defender').empty().append(buildBattleImage(game.defender, 'battle-pic-defender'));
}

function updateUi(){
	switch(game.gameState){
		case game.STATE_VICTORY:
			//todo: show victory message and reset button
			$('#battle-info').html('<div class="alert alert-success">VICTORY!!!</div>');

			break;
		case game.STATE_GAME_OVER:
			//todo: show failure message and reset button
			$('#battle-info').html('<div class="alert alert-danger">You have died.</div>');

			break;
		case game.STATE_IN_BATTLE:
			//update battle
			buildBattle();

			// hide defender select
			$('#row-defenders').hide();

			// show battle button
			$('#row-battle').show();

			break;
		case game.STATE_DEFENDER_SELECT:
			// hide character select row
			$('#row-character-select').hide();

			// show battle area
			$('#row-defenders').show();

			// update defender select
			buildDefenderSelect();

			// show defender select
			$('#defender-panel').show();

			// hide battle area
			$('#row-battle').hide();

			break;
		case game.STATE_CHARACTER_SELECT:
			// show character select row
			$('#row-character-select').show();

			// hide defender select \
			$('#row-defenders').hide();

			// hide battle area
			$('#row-battle').hide();

			break;
		default:
			console.log('How did we get here?');
			break;
	}
}

