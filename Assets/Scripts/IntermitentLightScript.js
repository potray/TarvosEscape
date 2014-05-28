#pragma strict

var frequency : double;
var myLight : Light;
var shouldIFlick : boolean;

function Start () {
	myLight = GetComponent.<Light>();
	shouldIFlick = true;
}

function Update () {	
	flick();	
}

function flick (){
	if (shouldIFlick){
		myLight.enabled = !myLight.enabled;	
		shouldIFlick = false;
		yield WaitForSeconds(frequency);
		shouldIFlick = true;
	}
}