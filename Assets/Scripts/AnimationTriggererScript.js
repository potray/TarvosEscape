#pragma strict

var anim : Animation;
var rewindTime : float;

enum TriggerType {Normal, Activated};

var type : TriggerType = TriggerType.Normal;
var animated = false;
var activationAudio : AudioClip;
var activationAudioSource : AudioSource;

function Start () {
}

function Update () {
}

function OnTriggerEnter (){
	switch (type){
		case TriggerType.Normal :
			anim.Play();
			yield WaitForSeconds(rewindTime);
			//Le cambio la velocidad y el tiempo del clip de la animacion y luego la animo.
			anim.animation[anim.animation.clip.name].speed = -0.1;
			anim.animation[anim.animation.clip.name].time = anim.animation[anim.animation.clip.name].length;
			anim.Play();		
		break;			
	}	
}

function OnTriggerStay (){	
	switch (type){
		case TriggerType.Activated:
			var actionPressed = Input.GetKeyDown(KeyCode.E);			
			if (actionPressed && !animated){
				anim.Play();
				if (activationAudio != null)
					activationAudioSource.Play();
				animated = true;
			}				
		break;
	}
}