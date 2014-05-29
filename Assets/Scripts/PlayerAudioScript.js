#pragma strict

var jumpClip : AudioClip;
var runSource : AudioSource;
var ouchClip : AudioClip;

var vertical : boolean;
var horizontal : boolean;

var characterMotor : CharacterMotor;
var pauseMenu : PauseMenu;

var shouldPlay : boolean;

function Start () {
	shouldPlay = true;
}

function Update () {
	if (!pauseMenu.isPause && shouldPlay){
		//Corriendo
		vertical = Input.GetButton("Vertical");
		horizontal = Input.GetButton("Horizontal");
		
		if((vertical || horizontal) && characterMotor.grounded && !runSource.isPlaying){
			runSource.Play();
		}
			
		if(!characterMotor.grounded || (!vertical && !horizontal)){
			runSource.Stop();
		}
		
		//Saltar
		if (Input.GetButtonDown("Jump") && characterMotor.grounded)
			AudioSource.PlayClipAtPoint(jumpClip, transform.position);		
	}
	
	else{
		runSource.Stop();
	}
}

function ouch(){
	AudioSource.PlayClipAtPoint(ouchClip, transform.position);		
}