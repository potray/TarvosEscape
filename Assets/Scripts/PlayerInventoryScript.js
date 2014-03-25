#pragma strict

var Item : ItemType;

function Start () {

}

function Update () {
}

function setItem (newItem : ItemType){
	Item = newItem;
	print("El jugador ahora tiene un " + Item);
}

function emptyItem (){
	Item = ItemType.Empty;
}
