#pragma strict

enum ItemType{Empty, Gun, RocketLauncher, Shield, Gravigun, Knife, Wings, Coin};
var item : ItemType;
var playerInventoryScript : PlayerInventoryScript;
var enemyInventoryScript : EnemyInventoryScript;
var pickupClip: AudioClip;

function Start () {
	enemyInventoryScript = GameObject.Find("EnemyCharacter").GetComponent.<EnemyInventoryScript>();
}

function Update () {
	this.gameObject.transform.Rotate (Vector3.up * Time.deltaTime * 100);
}

function OnTriggerEnter (coll : Collider){
	//print("TAG: "+coll.tag);
	if (coll.tag == "Player"){
		playerInventoryScript.setItem(item);	
		AudioSource.PlayClipAtPoint(pickupClip, transform.position);
		Destroy(this.gameObject);
	}
	else if (coll.tag == "Enemy") {
		enemyInventoryScript.setItem(item);
		AudioSource.PlayClipAtPoint(pickupClip, transform.position);
		Destroy(this.gameObject);
	}
}