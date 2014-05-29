﻿#pragma strict

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

function OnTriggerExit(coll : Collider){
	//print("Salido de plataforma");
	if (coll.name == "Player")
		deathScript.setReturnPosition(coll.transform.position, PlayerType.Player);	
	else if (coll.name == "EnemyCharacter")
		deathScript.setReturnPosition(coll.transform.position, PlayerType.Enemy);
}

function OnTriggerEnter(){
	if (isTriggered){
		yield WaitForSeconds(startTime);
		anim.Play();
	}
}