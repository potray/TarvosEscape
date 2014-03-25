#pragma strict

function Start () {

}

function Update () {

}

function OnMouseDown() {
	print("Nuevo juego.");
	// Transicion a pantalla inicial -> Historia, carga del nivel, si es necesario.
	Application.LoadLevel("Level 1");
}