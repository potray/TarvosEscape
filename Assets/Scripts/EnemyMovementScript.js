#pragma strict

var agent : NavMeshAgent ;
var targetPoint : Vector3;
var baseDistance : float;

function Start () {
	baseDistance = 1;
	agent = GetComponent.<NavMeshAgent>();
	targetPoint = new Vector3 (-515, 500.5, -500);
}

function Update () {
	agent.SetDestination(targetPoint);

}