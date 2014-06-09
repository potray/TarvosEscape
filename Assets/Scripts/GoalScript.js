#pragma strict

var playerController : FPSInputController;
var playerCC : CharacterController;
var player : GameObject;
var playerCM : CharacterMotor;
var playerML : MouseLook;
var playerAudio : PlayerAudioScript;

var enemy : GameObject;

var extraMoney : int;
var timePenalization : int;

var playerInventory : PlayerInventoryScript;

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
	if (coll.name == "Player" || coll.name == "EnemyCharacter"){
		print ("Se ha llegado en " + Time.time);				
		//Hago como si el juego estuviera pausado.
		Screen.showCursor = true;
		Time.timeScale = 0;
		playerML.enabled = false;
		playerCM.enabled = false;
		playerController.enabled = false;				
		playerCC.enabled = false;
		camY.enabled = false;				
		playerAudio.shouldPlay = false;
		
		
						
		switch (coll.name){
			case "Player":
				print ("Jugador ha llegado antes");		
				
				playerInventory.extraCoins = Math.Abs(extraMoney / (Time.time /timePenalization));
				//Desactivo el letrero de perder
				loseLabel.SetActive(false);
			break;
			case "EnemyCharacter":
				print ("Enemigo ha llegado antes");
				
				var looseMoney = extraMoney - Mathf.Abs((enemy.transform.position - player.transform.position).magnitude / (Time.time / timePenalization));
				
				if (looseMoney < 0)
					looseMoney = 0;
				
				playerInventory.extraCoins = looseMoney;
				
				//Desactivo el letrero de ganar
				winLabel.SetActive(false);
			break;
		}	
		
		//El script de PlayerInventory controla que el juego se haya terminado
		playerInventory.finished = true;
		
		addMoney (playerInventory.extraCoins + playerInventory.getPlayerCoins());
		
		//Si el jugador tenia un jetpack o un escudo se los quito
		playerInventory.endShield();
		playerInventory.endFlight();
	
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