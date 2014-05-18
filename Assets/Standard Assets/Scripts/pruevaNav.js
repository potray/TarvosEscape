#pragma strict

var agent  : NavMeshAgent ;
var targetPoint : Vector3;

function Start () {
	agent = GetComponent.<NavMeshAgent>();
	targetPoint = new Vector3 (-20, 0, 220);
}

function Update () {
	agent.SetDestination(targetPoint);

}