#pragma strict

//Arrays de objectos
var pickableObjects : GameObject[];
var pickableObjectsVisited : boolean[];
var coins : GameObject[];
var coinsVisited : boolean[];
var targets : GameObject[];
var targetsVisited : boolean[];

//Distancias
var closestCoinIndex : int;
var closestCoinDistance : double;
var closestPickableObjectIndex : int;
var closestPickableObjectDistance : double;
var closestTargetIndex : int;
var closestTargetDistance : double;

//Parametros de seleccion de nuevo objetivo
var stopTracking : boolean;
var pickableObjectDetectionRange : double;
var coinDetectionRange : double;
var targetDetectionRange : double;

//Componentes
var navAgent : NavMeshAgent;
var rigid : Rigidbody;

//Variables auxiliares
var navDestinationObject : GameObject;
var navDestinationObjectType : String;

function Start () {
	findPickableObjects();
	findCoins();
	findTargets();
	stopTracking = false;
	getComponents();
	selectBestTarget();
}

function Update () {
	if (!stopTracking){
		if (isTargetCloseEnough()){
			print ("He llegado a mi objetivo");
			switch (navDestinationObjectType){
				case "Target":
					targetsVisited[closestTargetIndex] = true;
					//Compruebo el tipo de objetivo y actuo en consecuencia.
					var mark = targets[closestTargetIndex].GetComponent.<EnemyMarkScript>();
					var markType = mark.type;
					switch (markType){
						case enemyMarkType.Jump :	
							jump(mark.jumpParameters);				
						break;
						case enemyMarkType.Walk :
						break;
					}
				break;
				case "PickableObject":
					pickableObjectsVisited[closestPickableObjectIndex] = true;
				break;
				case "Coin": 
					coinsVisited[closestCoinIndex] = true;
				break;
			}
			//Necesito una doble comprobacion.
			if (!stopTracking)
				selectBestTarget();
		}
	}		
}

/*************************************************
FUNCIONES DE INICIALIZACION
*************************************************/

function findPickableObjects(){
	pickableObjects = GameObject.FindGameObjectsWithTag("PickableObject");
	pickableObjectsVisited = new boolean[pickableObjects.length];
	
	for (var i = 0; i < pickableObjects.length; i++){
		pickableObjectsVisited[i] = false;
	}
}

function findCoins(){
	coins = GameObject.FindGameObjectsWithTag("PCoin");
	coinsVisited = new boolean[coins.length];
	
	for (var i = 0; i < coins.length; i++){
		coinsVisited[i] = false;
	}
}

function findTargets(){
	targets = GameObject.FindGameObjectsWithTag("EnemyMark");
	targetsVisited = new boolean[targets.length];
	
	for (var i = 0; i < targets.length; i++){
		targetsVisited[i] = false;
	}
}

function getComponents(){	
	navAgent = GetComponent.<NavMeshAgent>();
	rigid = GetComponent.<Rigidbody>();
}

/*************************************************
FUNCIONES DE TOMA DE DECISIONES
*************************************************/

function selectBestTarget (){
	searchClosestPickableObject();
	searchClosestCoin();
	searchClosestTarget();
	
	if (closestTargetDistance - targetDetectionRange < closestPickableObjectDistance - pickableObjectDetectionRange){
		 navDestinationObject = targets[closestTargetIndex];
		 navDestinationObjectType = "Target";
		 print ("Voy hacia el target en " + targets[closestTargetIndex].transform.position);
	}
 	else{
 		if (closestPickableObjectDistance - pickableObjectDetectionRange < closestCoinDistance - coinDetectionRange){ 			
 			navDestinationObject = pickableObjects[closestPickableObjectIndex];
		 	navDestinationObjectType = "PickableObject";
 			print ("Voy hacia el objeto en " + pickableObjects[closestPickableObjectIndex].transform.position);
 		}
 		else{
 			navDestinationObject = coins[closestCoinIndex];
			navDestinationObjectType = "Coin";
 			print ("Voy hacia el objeto en " + coins[closestCoinIndex].transform.position); 			
 		}
	}
	
	navAgent.SetDestination(navDestinationObject.transform.position);
}

function searchClosestPickableObject(){
	var closestDistance : double = Mathf.Infinity;
	var distance : double;

	for (var i = 0; i < pickableObjects.length; i++){
		distance = Mathf.Abs((transform.position - pickableObjects[i].transform.position).magnitude);
		if (distance < closestDistance && !pickableObjectsVisited[i]){
			closestDistance = distance;
			closestPickableObjectIndex = i;
		}		
	}	
	
	closestPickableObjectDistance = closestDistance;
}

function searchClosestCoin(){
	var closestDistance : double = Mathf.Infinity;
	var distance : double;

	for (var i = 0; i < coins.length; i++){
		distance = Mathf.Abs((transform.position - coins[i].transform.position).magnitude);
		if (distance < closestDistance && !coinsVisited[i]){
			closestDistance = distance;
			closestCoinIndex = i;
		}		
	}	
	
	closestCoinDistance = closestDistance;
}

function searchClosestTarget(){
	var closestDistance : double = Mathf.Infinity;
	var distance : double;

	for (var i = 0; i < targets.length; i++){
		distance = Mathf.Abs((transform.position - targets[i].transform.position).magnitude);
		if (distance < closestDistance && !targetsVisited[i]){
			closestDistance = distance;
			closestTargetIndex = i;
		}		
	}	
	
	closestTargetDistance = closestDistance;
}

/*************************************************
FUNCIONES DE MOVIMIENTO
*************************************************/

function jump(parameters : Vector3){	
	navAgent.enabled = false;    
    rigid.isKinematic = false;
    rigid.useGravity = true;
	rigid.AddForce (parameters.x, parameters.y, parameters.z, ForceMode.Impulse);
	stopTracking = true;
	print ("stopTracking");
}

/*function isGrounded(): boolean {
	return (Physics.Raycast(transform.position, -Vector3.up, rayHit, distToGround+0.1) && jumping);
}*/

/*************************************************
FUNCIONES AUXILIARES
*************************************************/

function isTargetCloseEnough (){
	var xOffset = 0.1;
	var yOffset = 3;
	var zOffset = 0.1;
	
	var xDistance = Mathf.Abs(transform.position.x - navDestinationObject.transform.position.x);
	var yDistance = Mathf.Abs(transform.position.y - navDestinationObject.transform.position.y);
	var zDistance = Mathf.Abs(transform.position.z - navDestinationObject.transform.position.z);
	
	return (xDistance <= xOffset && yDistance <= yOffset && zDistance <= zOffset); 
}