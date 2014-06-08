#pragma strict

var playerController : FPSInputController;
var playerCC : CharacterController;
var player : GameObject;
var playerCM : CharacterMotor;
var playerML : MouseLook;
var playerAudio : PlayerAudioScript;
var playerInventory : PlayerInventoryScript;

var enemy : GameObject;

var whoShooted : String;
		
function Start () {
	whoShooted = GetComponent.<BulletTypeScript>().whoShooted;
}

function Update () {
	
}

function OnTriggerEnter (hit : Collider) {
	print ("La bala la ha disparado " + whoShooted);
	if (hit.tag == "Player" && whoShooted == "Enemy"){
		player = GameObject.Find("Player");
		
		if (!player.GetComponent.<PlayerInventoryScript>().isShielded){
		
			playerController = player.GetComponent.<FPSInputController>();
			playerCC = player.GetComponent.<CharacterController>();
			playerCM = player.GetComponent.<CharacterMotor>();
			playerML = player.GetComponent.<MouseLook>();
			playerAudio = player.GetComponent.<PlayerAudioScript>();
			
			playerAudio.shouldPlay = false;
			playerML.enabled = false;
			playerCM.enabled = false;
			playerController.enabled = false;
			
			playerCC.enabled = false;
			
			playerAudio.ouch();
			yield WaitForSeconds(2);
			//Animacion / sonidos de recuperacion
			
			playerController.enabled = true;	
			playerCM.enabled = true;	
			playerML.enabled = true;
			playerAudio.shouldPlay = true;
			
			playerCC.enabled = true;
			
			print ("Activando player");
	
			//Necesario repetir esta linea porque la bala podria destruirse antes de que se ejecutara el codigo entero.
			Destroy(gameObject);
		}
		else{
			player.GetComponent.<PlayerInventoryScript>().endShield();		
			
			Destroy(gameObject);	
		}
	}
	else if (hit.tag == "Enemy" && whoShooted == "Player"){
		print ("Bala impactada en enemigo");
		playerAudio = GameObject.Find("Player").GetComponent.<PlayerAudioScript>();
		playerAudio.enemyOuch();
		enemy = gameObject.Find("EnemyCharacter");
		var enemyMovement = enemy.GetComponent.<NewEnemyMovementScript>();
		var enemyAgent = enemy.GetComponent.<NavMeshAgent>();
		enemyMovement.stopTracking = true;
		enemyAgent.enabled = false;
		
		
		
		yield WaitForSeconds (2);
		
		enemyAgent.enabled = true;
		enemyMovement.stopTracking = false;
		enemyMovement.selectBestTarget("BulletHit");
		
		
		Destroy(gameObject);
	}
}
