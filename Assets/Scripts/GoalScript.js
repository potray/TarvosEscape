#pragma strict

var playerController : FPSInputController;
var playerCC : CharacterController;
var player : GameObject;
var playerCM : CharacterMotor;
var playerML : MouseLook;
var playerAudio : PlayerAudioScript;

var enemy : GameObject;

var winMultiplier : float;
var loseDivider : float;

var playerInventory : PlayerInventoryScript;
var isTrainingGoal : boolean = false;

var loseLabel : GameObject;
var winLabel : GameObject;

var camY : MouseLook;

function Start () {
	player = GameObject.Find("Player");
	playerController = player.GetComponent.<FPSInputController>();
	playerCC = player.GetComponent.<CharacterController>();
	playerCM = player.GetComponent.<CharacterMotor>();
	playerML = player.GetComponent.<MouseLook>();
	playerInventory = player.GetComponent.<PlayerInventoryScript>();
	playerAudio = player.GetComponent.<PlayerAudioScript>();		
	
	enemy = GameObject.Find("EnemyCharacter");
	
	camY = GameObject.Find("Main Camera").GetComponent.<MouseLook>();
	
	winLabel = GameObject.Find("Win Label");
	loseLabel = GameObject.Find("Lose Label");
}

function Update () {

}

function OnTriggerEnter (coll : Collider){
	print ("Se ha llegado en " + Time.time);
	if (!isTrainingGoal){								
		//Hago como si el juego estuviera pausado.
		Screen.showCursor = true;
		Time.timeScale = 0;
		playerML.enabled = false;
		playerCM.enabled = false;
		playerController.enabled = false;				
		playerCC.enabled = false;
		camY.enabled = false;				
		playerAudio.shouldPlay = false;
		
		//Le sumo al inventario del jugador las monedas correspondientes
		var enemyPerfectTime = 2000;
		//TODO: descomentar lo de abajo
		//var enemyPerfectTime = GameObject.Find("EnemyCharacter").GetComponent.<EnemyMovementScript>().getPerfectTime();
						
		switch (coll.name){
			case "Player":
				print ("Jugador ha llegado antes");		
				
				playerInventory.extraCoins = (enemyPerfectTime - Mathf.Ceil(Time.time)) * winMultiplier;
				//Desactivo el letrero de perder
				loseLabel.SetActive(false);
			break;
			case "EnemyCharacter":
				print ("Enemigo ha llegado antes");
				
				playerInventory.extraCoins =  (enemyPerfectTime * winMultiplier) / loseDivider;
				
				//Desactivo el letrero de ganar
				winLabel.SetActive(false);
			break;
		}	
		
		//El script de PlayerInventory controla que el juego se haya terminado
		playerInventory.finished = true;
		
		addMoney (playerInventory.extraCoins + playerInventory.getPlayerCoins());
	}
	else{
		var em : EnemyMovementScript = enemy.GetComponent.<EnemyMovementScript>();
		//em.saveParameters();
	}		
}

function addMoney(money : int){
	var currentMoney : int = getMoney();
	currentMoney += money;
	PlayerPrefs.SetInt("Money", currentMoney);
}

function getMoney(){
	var money : int = PlayerPrefs.GetInt("Money");
	return money;
}