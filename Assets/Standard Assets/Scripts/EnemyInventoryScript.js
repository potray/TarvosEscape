#pragma strict

static var enemyCoins : int = 0;
static var enemyItem : ItemType;
var animPlayer : Animator;

// the tag to search for (set this value in the inspector)
var searchTag = "PCoin";

// the frequency with which to re-scan for new nearest target in seconds
// (set in inspector)
var scanFrequency = 1.0;

// the current target
private var target : Transform;


function Start() {
	// set up repeating scan for new targets:
	InvokeRepeating("ScanForTarget", 0, scanFrequency );
	enemyCoins = 0;
}

function Update() {
	// we rotate to look at the target every frame (if there is one)
	if (target != null) {
		transform.LookAt(target);
		
		//  Hacemos que ande hacia el objeto mas cercano.
		var dist = (target.transform.position - transform.position).sqrMagnitude;
		
	if (dist  > 0.2) {
			animPlayer.SetFloat("Walk", 0.2);
		}
		else
			animPlayer.SetFloat("Walk", 0);

	}
}

function ScanForTarget() {
	// this should be called less often, because it could be an expensive
	// process if there are lots of objects to check against
	target = GetNearestTaggedObject();
}

function GetNearestTaggedObject() : Transform {
	// and finally the actual process for finding the nearest object:

	var nearestDistanceSqr = Mathf.Infinity;
	var taggedGameObjects = GameObject.FindGameObjectsWithTag(searchTag);
	var nearestObj : Transform = null;

	// loop through each tagged object, remembering nearest one found
	for (var obj : GameObject in taggedGameObjects) {
		var objectPos = obj.transform.position;
		var distanceSqr = (objectPos - transform.position).sqrMagnitude;

		if (distanceSqr < nearestDistanceSqr) {
			nearestObj = obj.transform;
			nearestDistanceSqr = distanceSqr;
		}
	}

	return nearestObj;
}

function setItem (newItem : ItemType){
	if (newItem == ItemType.Coin) {
			enemyCoins++;
			print("Monedas (enemigo): " + enemyCoins);
		}
	else
		enemyItem = newItem;
}

