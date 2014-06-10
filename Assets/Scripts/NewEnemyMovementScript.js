#pragma strict

//Arrays de objetos
var pickableObjects : GameObject[];
var pickableObjectsVisited : boolean[];
var coins : GameObject[];
var coinsVisited : boolean[];
var targets : GameObject[];
var targetsVisited : boolean[];

//Objetos necesarios
var player : GameObject;
var goal : GameObject;

//Distancias a objetos
var closestCoinIndex : int;
var closestCoinDistance : double;
var closestPickableObjectIndex : int;
var closestPickableObjectDistance : double;
var closestTargetIndex : int;
var closestTargetDistance : double;
var playerDistanceToGoal : double;
var enemyDistanceToGoal : double;

//Parametros de seleccion de nuevo objetivo
var stopTracking : boolean;
var pickableObjectDetectionRange : double;
var coinDetectionRange : double;
var targetDetectionRange : double;
var criticalPlayerDistanceToGoal : double;

//Componentes
var navAgent : NavMeshAgent;
var rigid : Rigidbody;

//Variables auxiliares
var navDestinationObject : GameObject;
var navDestinationObjectType : String;
var playerPriority : boolean;
var enemyCheated : boolean;

//Variables de salto
var distToGround : double;	

function Update () {
	if (!stopTracking){
		//Si llega a un objetivo, hace lo que tenga que hacer.
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
				selectBestTarget("Normal");
		}
		
		//Si el jugador esta demasiado cerca, recalcula.
		if (((playerDistanceToGoal + criticalPlayerDistanceToGoal) <= enemyDistanceToGoal) && !playerPriority){
			playerPriority = true;
			selectBestTarget("Target");
			print ("Enemigo se ha quedado retrasado, corriendo al objetivo!!");
			//Trampa
			enemyCheated = true;
			navAgent.speed *= 4;
		}
		if (playerDistanceToGoal + (criticalPlayerDistanceToGoal / 2) > enemyDistanceToGoal && enemyCheated){
			enemyCheated = false;
			navAgent.speed /= 4;			
			playerPriority = false;
			//selectBestTarget("Normal");
			print("Peligro finalizado");
		}
	}		
}

/*************************************************
FUNCIONES DE INICIALIZACION
*************************************************/
function Start () {
	findPickableObjects();
	findCoins();
	findTargets();
	
	playerPriority = false;
	enemyCheated = false;
	distToGround = collider.bounds.extents.y;	
	getComponents();
	player = GameObject.Find ("Player");
	goal = GameObject.Find ("Goal");
	
	InvokeRepeating("calculateDistancesToGoal", 0, 0.2);
	
	selectBestTarget("Normal");
}

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

function selectBestTarget (options : String){
	searchClosestPickableObject();
	searchClosestCoin();
	searchClosestTarget();
	
	if (closestTargetDistance - targetDetectionRange < closestPickableObjectDistance - pickableObjectDetectionRange || options == "Target"){
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
 			print ("Voy hacia la moneda en " + coins[closestCoinIndex].transform.position); 			
 		}
	}
	
	navAgent.SetDestination(navDestinationObject.transform.position);
}

function searchClosestPickableObject(){
	var closestDistance : double = Mathf.Infinity;
	var distance : double;

	for (var i = 0; i < pickableObjects.length; i++){
		if (pickableObjects[i] != null){
			distance = Mathf.Abs((transform.position - pickableObjects[i].transform.position).magnitude);
			if (distance < closestDistance && !pickableObjectsVisited[i]){
				closestDistance = distance;
				closestPickableObjectIndex = i;
			}	
		}	
	}	
	
	closestPickableObjectDistance = closestDistance;
}

function searchClosestCoin(){
	var closestDistance : double = Mathf.Infinity;
	var distance : double;

	for (var i = 0; i < coins.length; i++){
		if (coins[i] != null){
			distance = Mathf.Abs((transform.position - coins[i].transform.position).magnitude);
			if (distance < closestDistance && !coinsVisited[i]){
				closestDistance = distance;
				closestCoinIndex = i;
			}		
		}
	}	
	
	closestCoinDistance = closestDistance;
}

function searchClosestTarget(){
	var closestDistance : double = Mathf.Infinity;
	var distance : double;

	for (var i = 0; i < targets.length; i++){
		if (targets[i] != null){
			distance = Mathf.Abs((transform.position - targets[i].transform.position).magnitude);
			if (distance < closestDistance && !targetsVisited[i]){
				closestDistance = distance;
				closestTargetIndex = i;
			}		
		}
	}	
	
	closestTargetDistance = closestDistance;
}

function calculateDistancesToGoal (){
	playerDistanceToGoal = Mathf.Abs((player.transform.position - goal.transform.position).magnitude);
	enemyDistanceToGoal = Math.Abs((transform.position - goal.transform.position).magnitude);
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
	
	yield WaitForSeconds (1);	
	
	var grounded : boolean = isGrounded();
	
	while (!grounded){
		yield WaitForSeconds (0.1);
		grounded = isGrounded();
	}
	
	print ("Estoy en el suelo!");
	
	navAgent.enabled = true;
    rigid.isKinematic = true;
    rigid.useGravity = false;	
	stopTracking = false;
	
	selectBestTarget("Normal");
}

function isGrounded() : boolean{
	var rayHit : RaycastHit;
	var isOnFloor : boolean = Physics.Raycast(transform.position, -Vector3.up, rayHit, distToGround+0.1);
	return (isOnFloor && rayHit.collider.gameObject.layer == 8);
}

/*************************************************
FUNCIONES AUXILIARES
*************************************************/

function isTargetCloseEnough (){

	//Controlo si el objeto ha sido recogido.
	if (navDestinationObject == null)
		return true;

	var xOffset = 0.1;
	var yOffset = 3;
	var zOffset = 0.1;
	
	var xDistance = Mathf.Abs(transform.position.x - navDestinationObject.transform.position.x);
	var yDistance = Mathf.Abs(transform.position.y - navDestinationObject.transform.position.y);
	var zDistance = Mathf.Abs(transform.position.z - navDestinationObject.transform.position.z);
	
	return (xDistance <= xOffset && yDistance <= yOffset && zDistance <= zOffset); 
}