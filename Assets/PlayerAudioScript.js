#pragma strict

var jumpClip : AudioClip;
var runSource : AudioSource;

var vertical : boolean;
var horizontal : boolean;

var characterMotor : CharacterMotor;
var pauseMenu : PauseMenu;

function Start () {

}

function Update () {
	if (!pauseMenu.isPause){
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
}