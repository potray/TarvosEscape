#pragma strict

var speed : float;

function Start () {
	speed = Random.Range(0.1,0.3);
}

function Update () {
/*
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
*/	
	if(transform.position.x > 12) {
		transform.position = Vector3(-18,transform.position.y,transform.position.z);
	}
	
	//transform.Rotate(Random.Range(0.15,0.2),0,0);
	transform.Translate(transform.right * Time.deltaTime*speed);
}