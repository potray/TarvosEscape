#pragma strict

var deathScript : DeathScript;
enum PlatformType{normal, upDown, leftRight, rotating};
var platformType : PlatformType;
var initialPosition : Vector3;
var mode : boolean = true;


function Start () {
	initialPosition = this.gameObject.transform.position;
}

function Update () {
	switch (platformType){
		case PlatformType.upDown:
			//Mode: true -> arriba, false -> abajo.
			var directionVector : Vector3;
			if (this.gameObject.transform.position.y > initialPosition.y + 10)		
				mode = false;	
			else if (this.gameObject.transform.position.y < initialPosition.y)	
				mode = true;
				
			if (mode)
				directionVector = Vector3.up;
			else
				directionVector = Vector3.down;
				
			this.gameObject.transform.Translate (directionVector * Time.deltaTime * 5);
		break;
		case PlatformType.normal: break;
	}
}

function OnTriggerExit(){
	//print("Salido de plataforma");
	var playerObject = GameObject.Find("Player");
	var playerPosition : Vector3 = playerObject.transform.position;
	deathScript.setReturnPosition(playerPosition);	
}