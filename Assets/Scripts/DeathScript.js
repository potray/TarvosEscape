#pragma strict

static var returnPosition : Vector3;
var platformScript : PlatformScript;

function Start () {

}

function Update () {
}

function OnTriggerEnter (){
	print ("Trigger de prueba: se reinicia el nivel");	
	var playerObject = GameObject.Find("Player");
	print ("Moviendo jugador a: " + returnPosition);
	playerObject.transform.position = returnPosition;
}

function setReturnPosition(newReturnPosition : Vector3){
	returnPosition = newReturnPosition;
	print ("Nueva posicion de retorno: " + returnPosition);
}