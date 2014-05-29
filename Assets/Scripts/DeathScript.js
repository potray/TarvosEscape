#pragma strict

enum PlayerType {Player, Enemy};
static var playerRespawn : Vector3;
static var enemyRespawn : Vector3;

var enemyMovement : EnemyMovementScript;

function Start () {
	enemyMovement = GameObject.Find("EnemyCharacter").GetComponent.<EnemyMovementScript>();
}

function Update () {
}

function OnTriggerEnter (coll : Collider){		
	if (coll.name == "Player")
		coll.transform.position = playerRespawn;
	else if (coll.name == "EnemyCharacter"){
		coll.transform.position = enemyRespawn;
		enemyMovement.keepRunning();
	}
	else
		print("coll.name no esta reconocido:" + coll.name + ", " + coll.transform.position);
}

function setReturnPosition(newReturnPosition : Vector3, who : PlayerType){
	if (who == PlayerType.Player)
		playerRespawn = newReturnPosition;
	else
		enemyRespawn = newReturnPosition;
}
