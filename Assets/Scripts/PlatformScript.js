#pragma strict

var deathScript : DeathScript;
var movingSpeed : float;
var startTime : float;
var anim : Animation = null;
var isTriggered : boolean = false;


function Start () {
	//Si la plataforma es animada, retraso la animacion y le cambio la velocidad.
	if (anim != null){
		if (movingSpeed != 0)
			animation[anim.clip.name].speed = movingSpeed;
		yield WaitForSeconds(startTime);
		if (!isTriggered)
			anim.Play();
	}
}

function Update () {
}

function OnTriggerExit(){
	//print("Salido de plataforma");
	var playerObject = GameObject.Find("Player");
	var playerPosition : Vector3 = playerObject.transform.position;
	deathScript.setReturnPosition(playerPosition);	
}

function OnTriggerEnter(){
	if (isTriggered){
		yield WaitForSeconds(startTime);
		anim.Play();
	}
}