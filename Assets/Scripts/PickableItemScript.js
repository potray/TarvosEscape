#pragma strict

enum ItemType{Empty, Gun, Shield, Gravigun, Knife, Wings};
var item : ItemType;
var playerInventoryScript : PlayerInventoryScript;

function Start () {

}

function Update () {
	this.gameObject.transform.Rotate (Vector3.up * Time.deltaTime * 100);
}

function OnTriggerEnter (coll : Collider){
	if (coll.tag == "Player"){
		playerInventoryScript.setItem(item);
		Destroy(this.gameObject);
	}
}