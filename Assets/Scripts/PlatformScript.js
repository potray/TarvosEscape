#pragma strict

var deathScript : DeathScript;

function Start () {

}

function Update () {

}

function OnTriggerExit(){
	print("Salido de plataforma");
	var playerObject = GameObject.Find("Player");
	var playerPosition : Vector3 = playerObject.transform.position;
	deathScript.setReturnPosition(playerPosition);	
}