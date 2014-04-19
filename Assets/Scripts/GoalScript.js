#pragma strict

var playerInventory : PlayerInventoryScript;

function Start () {

}

function Update () {

}

function OnTriggerEnter (coll : Collider){
	print("El jugador " + coll.name + " ha ganado");
	//Mostrar pantalla de fin de juego
	
	addMoney (playerInventory.playerCoins);
	
	//TEMPORAL
	Application.LoadLevel(1);
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