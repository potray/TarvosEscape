#pragma strict

var agent : NavMeshAgent ;
var targetPoint : Vector3;

function Start () {
	agent = GetComponent.<NavMeshAgent>();
	targetPoint = new Vector3 (-10, 6, 110);
}

function Update () {
	agent.SetDestination(targetPoint);

}