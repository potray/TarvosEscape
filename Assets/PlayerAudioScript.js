#pragma strict

var jumpClip : AudioClip;
var runSource : AudioSource;

var vertical : boolean;
var horizontal : boolean;

var characterMotor : CharacterMotor;

function Start () {

}

function Update () {
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
	if (Input.GetButtonDown("Jump"))
		AudioSource.PlayClipAtPoint(jumpClip, transform.position);		
}