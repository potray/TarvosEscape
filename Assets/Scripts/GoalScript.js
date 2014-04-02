#pragma strict

function Start () {

}

function Update () {

}

function OnTriggerEnter (coll : Collider){
	print("El jugador " + coll.name + " ha ganado");
	//Mostrar pantalla de fin de juego
	
	//TEMPORAL
	Application.LoadLevel("MainMenu");
}