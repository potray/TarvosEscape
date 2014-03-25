#pragma strict

enum ItemType{Empty, Gun, Shield, Gravigun, Knife, Wings};
var itemType : ItemType;
var playerInventoryScript : PlayerInventoryScript;

function Start () {

}

function Update () {
}

function OnTriggerEnter (){
	playerInventoryScript.setItem(itemType);
}
