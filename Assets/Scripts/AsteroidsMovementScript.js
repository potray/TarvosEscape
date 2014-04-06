#pragma strict

var speed : float;

function Start () {
}

function Update () {

	switch (name){
		case "Big Asteroids":
			speed = 0.15;
			break;
		case "Big Asteroids 2":
			speed = 0.2;
			break;
		case "Medium Asteroids":
			speed = 0.3;
			break;
		case "Medium Asteroids 2":
			speed = 0.35;
			break;
		case "Small Asteroids":
			speed = 0.6;
			break;
		case "Small Asteroids 2":
			speed = 0.65;
			break;	
	}
	
	transform.Translate(Vector3.right * Time.deltaTime*speed);
}