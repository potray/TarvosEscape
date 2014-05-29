#pragma strict

static var returnPosition : Vector3;
enum PlayerType {Player, Enemy};
var player : PlayerType;

function Start () {

}

function Update () {
}

function OnTriggerEnter (){
	//print ("Trigger de prueba: se reinicia el nivel");	
	var stringToLook : String;
	
	if (player == PlayerType.Player)
		stringToLook = "Player";
	else
		stringToLook = "Enemy";
		
	var playerObject = GameObject.Find(stringToLook);
	//print ("Moviendo jugador a: " + returnPosition);
	playerObject.transform.position = returnPosition;
}

function setReturnPosition(newReturnPosition : Vector3){
	returnPosition = newReturnPosition;
	//print ("Nueva posicion de retorno: " + returnPosition);
}
