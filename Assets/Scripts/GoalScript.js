#pragma strict

var playerController : FPSInputController;
var playerCC : CharacterController;
var player : GameObject;
var playerCM : CharacterMotor;
var playerML : MouseLook;

var playerInventory : PlayerInventoryScript;
var isTrainingGoal : boolean = false;

var camY : MouseLook;

function Start () {
	player = GameObject.Find("Player");
	playerController = player.GetComponent.<FPSInputController>();
	playerCC = player.GetComponent.<CharacterController>();
	playerCM = player.GetComponent.<CharacterMotor>();
	playerML = player.GetComponent.<MouseLook>();
	
	camY = GameObject.Find("Main Camera").GetComponent.<MouseLook>();
}

function Update () {

}

function OnTriggerEnter (coll : Collider){
	print ("Se ha llegado en " + Time.time);
	if (!isTrainingGoal){
		
		//Mostrar pantalla de fin de juego
		switch (coll.name){
			case "Player":
				print ("Jugador ha llegado antes");						
				
				//Hago como si el juego estuviera pausado.
				Screen.showCursor = true;
				Time.timeScale = 0;
				playerML.enabled = false;
				playerCM.enabled = false;
				playerController.enabled = false;				
				playerCC.enabled = false;
				camY.enabled = false;
				
				//El script de PlayerInventory controla que el juego se haya terminado
				playerInventory.finished = true;
				
				addMoney(playerInventory.playerCoins);	
			break;
			case "EnemyCharacter":
				print ("Enemigo ha llegado antes");
			break;
		}	
	}
	else{
		var em : EnemyMovementScript = GameObject.Find("EnemyCharacter").GetComponent.<EnemyMovementScript>();
		//em.saveParameters();
	}		
}

function addMoney(money : int){
	var currentMoney : int = getMoney();
	currentMoney += money;
	PlayerPrefs.SetInt("Money", currentMoney);
	print("Ahora tengo " + currentMoney + " monedas");
}

function getMoney(){
	var money : int = PlayerPrefs.GetInt("Money");
	return money;
}