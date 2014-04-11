#pragma strict

function Start () {

}

function Update () {

}

function OnCollisionEnter (hit : Collision) {

	// En caso de que el cohete colisione con un objeto, destruir tanto el cohete como dicho objeto.
	Destroy(gameObject);
	Destroy(hit.gameObject);
}