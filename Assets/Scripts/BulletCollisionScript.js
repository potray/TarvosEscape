#pragma strict

var playerController : FPSInputController;
var playerCC : CharacterController;
var player : GameObject;
var playerCM : CharacterMotor;
var playerML : MouseLook;
var playerAudio : PlayerAudioScript;
var playerInventory : PlayerInventoryScript;
		
function Start () {
	
}

function Update () {
	
}

function OnTriggerEnter (hit : Collider) {
	if (hit.tag == "Player"){
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
		}
		else
			player.GetComponent.<PlayerInventoryScript>().endShield();
	}
	else if (hit.tag == "Enemy"){
		print("Bala impactada contra enemigo");
	}
	
	Destroy(gameObject);
}
