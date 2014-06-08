#pragma strict

var levelToLoad : int;

function Start () {

}

function Update () {

}

function OnClick (){
	Application.LoadLevel(levelToLoad);
	
	//Necesario para que el boton de volver al menu cuando se pierde/gana funcione
	Time.timeScale = 1;
}