#pragma strict

var speed : float;

function Start () {
	speed = Random.Range(0.1,0.3);
}

function Update () {

	if(transform.position.x > 12) {
		transform.position = Vector3(-18,transform.position.y,transform.position.z);
	}
	
	//transform.Rotate(Random.Range(0.15,0.2),0,0);
	transform.Translate(transform.right * Time.deltaTime*speed);
}