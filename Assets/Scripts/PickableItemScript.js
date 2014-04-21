#pragma strict

enum ItemType{Empty, Gun, RocketLauncher, Shield, Gravigun, Knife, Wings, Coin};
var item : ItemType;
var playerInventoryScript : PlayerInventoryScript;
var pickupClip: AudioClip;

function Start () {

}

function Update () {
	this.gameObject.transform.Rotate (Vector3.up * Time.deltaTime * 100);
}

function OnTriggerEnter (coll : Collider){
	if (coll.tag == "Player"){
		playerInventoryScript.setItem(item);	
		AudioSource.PlayClipAtPoint(pickupClip, transform.position);
		Destroy(this.gameObject);
	}
}