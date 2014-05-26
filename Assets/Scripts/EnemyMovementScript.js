#pragma strict

var agent : NavMeshAgent ;
var targetPoint : Vector3;
var baseDistance : float;
var rigid : Rigidbody;

function Start () {
	baseDistance = 1;
	agent = GetComponent.<NavMeshAgent>();
	targetPoint = new Vector3 (-515, 500.5, -500);
	rigid = GetComponent.<Rigidbody>();
	agent.SetDestination(targetPoint);
	//agent.Stop(true);

}

function Update () {
	if (Input.GetKeyDown(KeyCode.J))
		jmp();
}

function jmp () {
	agent.Stop(true);
    rigid.isKinematic = false;
    rigid.useGravity = true;
    rigid.AddForce(new Vector3(0,20,0),ForceMode.Impulse);
    
    print("H");
}