#pragma strict

var agent : NavMeshAgent ;
var targetPoint : Vector3;
var rigid : Rigidbody;
var jumpX : double;
var jumpY : double;
var jumpZ : double;
var jumping : boolean;
var distToGround : float;

var jumpTime: float;
var waitTime: float;

function Start () {
	agent = GetComponent.<NavMeshAgent>();
<<<<<<< HEAD
	rigid = GetComponent("Rigidbody");
=======
	//targetPoint = new Vector3 (-515, 500.5, -500);
	rigid = GetComponent.<Rigidbody>();
>>>>>>> 7eddd0890171d842edf1ae072a1bc9a292e3bc2f
	agent.SetDestination(targetPoint);
	jumping = false;
	distToGround = collider.bounds.extents.y;			// Get the distance to the ground.
	waitTime = 2;
	targetPoint = new Vector3 (-485, 500.5, -510);
}

function Update () {

	if (agent.enabled == true) {

		if (detectEdge()) {
			//calculateJumpParameters();
			jmp();
		}
	}
	else {
		// If the enemy is jumping, we wait until he reaches the floor.
		// We need to wait while the character makes the jump in order to give him time to be in the air.
		if (isGrounded() && (Time.time - jumpTime) > waitTime)
			keepRunning();
	}

}

function jmp () {
	agent.enabled = false;
    rigid.isKinematic = false;
    rigid.useGravity = true;
//	var g = Physics.gravity.magnitude; // get the gravity value
//	var vSpeed = Mathf.Sqrt(2 * g * maxHeight); // calculate the vertical speed
//	var totalTime = 2 * vertSpeed / g; // calculate the total time
//	var hSpeed = maxDistance / totalTime; // calculate the horizontal speed
	rigid.velocity = Vector3(10, 10, 0); // launch the projectile!
	
    //rigid.AddRelativeForce(new Vector3(0,2.5,2.5),ForceMode.Impulse);
	//agent.Stop(true);
	
	jumpTime = Time.time;
	jumping = true;


}

function detectEdge (): boolean {
	
	var hit : NavMeshHit;
	agent.FindClosestEdge(hit);
	
	// Hay que diferenciar casos, para buscar precipicios en x, -x, z y -z.
	
	if (hit.position == transform.position || Mathf.Abs(hit.position.x - transform.position.x) < 0.1) {
		return true;
	}
	else	
		return false;
}

function keepRunning() {

	jumping = false;
	rigid.isKinematic = true;
	rigid.useGravity = false;
	agent.enabled = true;
	agent.SetDestination(targetPoint);
}

// Using a raycast we can check if the enemy has landed.
function isGrounded(): boolean {
	return (Physics.Raycast(transform.position, -Vector3.up, distToGround + 0.1) && jumping);
}


// What we had before trying to upgrade the code.

/*
	if (Input.GetKeyDown(KeyCode.J))
		jmp();
	if (Input.GetKeyDown(KeyCode.K)){
		//agent.ResetPath();
		agent.enabled = true;
		agent.SetDestination(targetPoint);
		//agent.Resume();
	}
	
	if (Input.GetKeyDown(KeyCode.H))
		agent.CompleteOffMeshLink();
	*/

