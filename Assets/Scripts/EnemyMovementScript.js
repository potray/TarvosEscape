#pragma strict

var agent : NavMeshAgent ;
var targetPoint : Vector3;
var baseDistance : float;
var rigid : Rigidbody;
var jumpX : double;
var jumpY : double;
var jumpZ : double;
var waitTime : double;

function Start () {
	baseDistance = 1;
	agent = GetComponent.<NavMeshAgent>();
	//targetPoint = new Vector3 (-515, 500.5, -500);
	rigid = GetComponent("Rigidbody");
	agent.SetDestination(targetPoint);
	//agent.Stop(true);

}

function Update () {
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
		
}

function jmp () {
    rigid.isKinematic = false;
    rigid.useGravity = true;
    rigid.AddRelativeForce(new Vector3(0,3,3.5),ForceMode.Impulse);
	//agent.Stop(true);
	agent.enabled = false;
}