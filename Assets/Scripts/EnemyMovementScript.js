import System;
import System.IO;
import SimpleJSON;


var agent : NavMeshAgent ;
var rigid : Rigidbody;
var targetPoint : Vector3;
var jumping : boolean;
var distToGround : float;

var rayHit : RaycastHit;

var jumpTime: float;
var waitTime: float;

var jumpParametersLearned : boolean;
var readjustJumpParameters: boolean;
var actualParameters: int;

// jumpParameters will store the jumping force needed by the enemy to jump through the level.
// jumpCoordinates are the objective point for every jump.
// waypoints store the control points that guide the enemy through the map.
var jumpParameters : Vector3[];
var needToLearn : boolean[];
var jumpCoordinates: Vector3[];
var waypoints : Transform[];

var justStarted : boolean = true;

var actualWaypoint: int;

var level: String;								// This variable stores the level being played actually.
var training : boolean;						// If we are training the enemy, we set this to true (default).

/* For each level we have to add:
	-- Waypoints
	-- Jump coordinates
*/

var fileData;

function Start () {
	initializeScriptComponents();
	initializeJumpCoordinates();
	initializeJumpParameters();
}

function Update () {

	// If navmesh is enabled it means that the enemy is running, not in the air.
	/*if (agent.enabled == true) {
		if (detectEdge()) {
			//if (needToLearn[actualParameters])
				learnJumpParameters();
			jmp();
			
		}
	}
	else {
		if (isGrounded() && (Time.time - jumpTime) > waitTime || justStarted) {
			justStarted = false;
			print ("Rayo impactado en: " + rayHit.collider.transform.position + " se llama " + rayHit.collider.name);
			keepRunning();	
		}
	
	}*/
	
	// If the enemy passes through the objective coordinates in a jump, we can store the jump parameters learned.
		if (enemyPositionOk(jumpCoordinates[actualParameters]) && isJustGrounded()) {
			print("LLEGAMOS, almacenamos "+ jumpParameters[actualParameters] + ", es la tripleta " +actualParameters);
			saveParameters (actualParameters);
			actualParameters++;
		}
		
		// If the enemy is passing thorugh a waypoint we can focus on the next one.
		if (enemyPositionOk(waypoints[actualWaypoint].position) && isJustGrounded()) {
			//saveParameters (actualParameters);
			//actualParameters++;
			actualWaypoint++;
			print ("Siguiente objetivo" + waypoints[actualWaypoint].position);
			agent.SetDestination(waypoints[actualWaypoint].position);
			readjustJumpParameters = false;
		}

}

function saveParameters (i : int){
	//if (i >= fileData["jumps"].AsInt){	
		//Aumento los saltos
		if (i > fileData["jumps"].AsInt)
		fileData["jumps"].AsInt = i;
		
		//Guardo el salto
		fileData["jumpParameters"][i.ToString()]["x"].AsDouble = jumpParameters[i].x;
		fileData["jumpParameters"][i.ToString()]["y"].AsDouble = jumpParameters[i].y;
		fileData["jumpParameters"][i.ToString()]["z"].AsDouble = jumpParameters[i].z;
		
		//Guardo los datos en el fichero
		saveFileData(level);
		
	//}
}

// This function returns true if the enemy is on an edge.
function detectEdge (): boolean {
	
	var hit : NavMeshHit;
	agent.FindClosestEdge(hit);
	
	if (hit.position.x == transform.position.x  && hit.position.z == transform.position.z) 
		return true;
	else 
		return false;
}

function jmp () {
	agent.enabled = false;
    
    rigid.isKinematic = false;
    rigid.useGravity = true;
	//rigid.velocity = Vector3(jumpParameters[actualParameters].x, jumpParameters[actualParameters].y, jumpParameters[actualParameters].z);
	rigid.AddForce (jumpParameters[actualParameters].x, jumpParameters[actualParameters].y, jumpParameters[actualParameters].z, ForceMode.Impulse);
	print ("Saltando con fuerza = " + jumpParameters[actualParameters]);
	jumpTime = Time.time;
	jumping = true;
}

// After jumping, the enemy starts running again.
function keepRunning() {
	jumping = false;
	rigid.isKinematic = true;
	rigid.useGravity = false;
	agent.enabled = true;
	agent.SetDestination(waypoints[actualWaypoint].position);
	
			print ("Siguiente objetivo" + waypoints[actualWaypoint].position);
}

// Using a raycast we can check if the enemy has landed.
function isGrounded(): boolean {
	return (Physics.Raycast(transform.position, -Vector3.up, rayHit, distToGround+0.1) && jumping);
}

function isJustGrounded(): boolean {
	return (Physics.Raycast(transform.position, -Vector3.up, rayHit, distToGround+0.1));
}


// This function measures if the enemy is in a certain position.
function enemyPositionOk (coord: Vector3):boolean {

	var condition : boolean;
	var offset : int = 5;
	
	condition = (Mathf.Abs(coord.x - transform.position.x) <= offset) && (Mathf.Abs(coord.y - transform.position.y) <= offset) && (Mathf.Abs(coord.z - transform.position.z) <= offset);
		
//	print ("Distancia X = " + Mathf.Abs(coord.x - transform.position.x) + ", distancia y = " + Mathf.Abs(coord.y - transform.position.y) + ", distancia z = " + Mathf.Abs(coord.z - transform.position.z));
		
	return (condition);
}

// Here we insert the jump destinations for every edge the enemy has to jump.
// This coordinates are needed to adjuste the jump parameters.

// Para hacerlo mas dinamico podemos usar un enfoque basado en tags: Las plataformas sobre las que el enemigo va a aterrizar en cada salto
// tendran todas un tag comun: Empezaremos recogiendo la primera de ellas y luego se iran buscando las demas por cercania a la anterior.
function initializeJumpCoordinates () {
	if (level == "L1" && training) {
		jumpCoordinates[0] = (new Vector3(-515,502,-500));
		jumpCoordinates[1] = (new Vector3(-485,502,-547));
		jumpCoordinates[2] = (new Vector3(-462.5,502,-547));
		jumpCoordinates[3] = (new Vector3(-420,502,-590));
		jumpCoordinates[4] = (new Vector3(-420,502,-618));
		jumpCoordinates[5] = (new Vector3(-420,646,-635));
		//jumpCoordinates[6] = (new Vector3(-420,502,-618));
	}
	else if (level == "L2" && training) {
		jumpCoordinates[0] = (new Vector3(-85.45547,170.8522,79.6062));
		jumpCoordinates[1] = (new Vector3(-515,500.5,-500));
		jumpCoordinates[2] = (new Vector3(-485,500.5,-547.5));
		jumpCoordinates[3] = (new Vector3(-472.5,500.5,-547.5));
		jumpCoordinates[4] = (new Vector3(-460,500.5,-547.5));
		jumpCoordinates[4] = (new Vector3(-420,500.5,-547.5));
		jumpCoordinates[5] = (new Vector3(-420,500.5,-589));
		jumpCoordinates[5] = (new Vector3(-420,500.5,-618.5));	
	}
}

// The jump parameters need to be learned from the enemy when he faces the scenary.
// This is why we initialize them to 1 (in x and y, the only parameters used to jump, these are default values) and a 0 in z
function initializeJumpParameters () {
	for (var i : int = 0; i < jumpCoordinates.Length; i++) {
	
		if (fileData["jumps"].AsInt >= i){
			//Cargo desde el fichero
			needToLearn[i] = false;
			jumpParameters[i] = new Vector3 (fileData["jumpParameters"][i.ToString()]["x"].AsDouble,
											fileData["jumpParameters"][i.ToString()]["y"].AsDouble,
											fileData["jumpParameters"][i.ToString()]["z"].AsDouble);
		}
		else{
			// The initial jump parameters are crucial for the learning process, and they depend on the current map.
			needToLearn[i] = true;
			if (level == "L2")
				jumpParameters[i] = (new Vector3 (0,5,5));
			else if (level == "L1")
				jumpParameters[i] = (new Vector3 (0,0,0));
		}
	}
}

function learnJumpParameters() {
	print ("Aprendiendo "+actualParameters);
	if (readjustJumpParameters) {
		// print ("Previos : " + jumpParameters[actualParameters]);
		
		// We need to diferentiate between adding a jump force in x or giving it in z.
		// To do this we can use the waypoints, because this coordinates are placed
		// strategically to detect the type of the jump.
		if (actualWaypoint == 0 || waypoints[actualWaypoint-1].position.z == waypoints[actualWaypoint].position.z)
			learnJumpInX();
		else
			learnJumpInZ();
  	}
}

// We will need to add force in X always, because the maps where the enemy moves don't have backflips.
function learnJumpInX() {
		jumpParameters[actualParameters].x += 0.2;
		jumpParameters[actualParameters].y += 0.1;
		//Si la plataforma esta al mismo nivel o mas alta aumento la y aun mas.
		if (jumpCoordinates[actualParameters].y + 5 >= transform.position.y)
			jumpParameters[actualParameters].y += 0.2;
		jumpParameters[actualParameters].z = 0;
		print("PARAM ACTUAL (X): "+ jumpParameters[actualParameters]);
}

// In Z we always substract force, so the -Z axis is the one that allows the enemy to jump in Z coordinates.
function learnJumpInZ () {
		jumpParameters[actualParameters].z -= 0.2;
		jumpParameters[actualParameters].y += 0.1;
		//Si la plataforma esta al mismo nivel o mas alta aumento la y aun mas.
		if (jumpCoordinates[actualParameters].y + 5 >= transform.position.y)
			jumpParameters[actualParameters].y += 0.2;
		jumpParameters[actualParameters].x = 0;
		print("PARAM ACTUAL (Z): "+ jumpParameters[actualParameters]);
}

// If the enemy falls, we need to readjust the jump parameters.
function OnTriggerEnter (coll : Collider){
	//print ("Colisionado en " + coll.name);		
	if (coll.name != "Square Platform") {
		readjustJumpParameters = true;
		//print("Reajuste");
	}
}

// For each map we have to get the right waypoints to the enemy agent.
// These waypoints are set on the scene, giving the name w+i to the
// floor parts that we are considering to guide the enemy through the map.
function initializeWaypoints () {
	var i :int;
	var wp :GameObject;
	
	wp = GameObject.FindGameObjectWithTag("waypoint0");
	i = 0;
	
	while(wp != null) {
		waypoints[i]	= wp.transform;
		i++;
		wp = GameObject.FindGameObjectWithTag("waypoint"+i);
	}
}

// This function sets the variable level to the level that is currently being played.
function whichLevel() {
	//TODO: esto lo he tenido que cambiar para que construya el proyecto.
	var path : String /*[]*/ = /*EditorApplication.currentScene.Split(char.Parse("/"))*/"";
	
	switch(path[1]) {
	
		case "Level1":
			level = "L1";
			
		case "Level2":
			level = "L2";
		
		// Por ahora, que estamos en el editor, entrenamos con el nivel 2.
		default:
			level = "L1";
	}
}

function setCurrentJumpParameters(param : Vector3){
	jumpParameters[actualParameters] = param;
	print ("Parametros cambiados cuando actualParameters = " + actualParameters);
}


// Here are the initial values needed for the variables of the script.
function initializeScriptComponents () {
	agent = GetComponent.<NavMeshAgent>();
	rigid = GetComponent.<Rigidbody>();
	rigid = GetComponent.<Rigidbody>();
	
	jumping = false;
	distToGround = collider.bounds.extents.y;			// Get the distance to the ground.
	waitTime = 2;												// We need to wait while the character makes the jump in order to give him time to be in the air.										
	jumpParametersLearned = false;						// This variable will be true when the enemy is ready to face the entire map.
	readjustJumpParameters = false;
	actualParameters = 0;
	actualWaypoint = 0;
	jumpParameters = new Vector3 [20];
	needToLearn = new boolean [20];
	jumpCoordinates = new Vector3 [20];
	waypoints = new Transform[20];
	initializeWaypoints();
	whichLevel();
	training = true;
	agent.SetDestination(waypoints[actualWaypoint].position);
			print ("Siguiente objetivo" + waypoints[actualWaypoint].position);
	
	fileData = readFileToJSON(level);
	print (fileData["jumps"].AsInt);
}

function saveFileData (file : String){
	var fd = File.CreateText(file + ".json");
	fd.WriteLine(fileData.ToString());
	fd.Close();
	print ("Datos guardados");
}

// This is the code that allows us to read a file.
function readFileToJSON (file : String)
{  
	if(File.Exists(file + ".json"))
	{
		  var sr = File.OpenText(file + ".json");
		  return JSON.Parse(sr.ReadToEnd());
		  
	}
	else{
		var newFileString = "{\"jumps\":\"-1\"}";
		var newFile = File.CreateText(file + ".json");
		newFile.Write(newFileString);
		newFile.Close();
	}
}

