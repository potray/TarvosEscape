#pragma strict

var isPause = false;
var font : Font;
var inputController : FPSInputController;
var camX : MouseLook;
var camY : MouseLook;

function quitMenu () {
	Time.timeScale = 1;
	(inputController as MonoBehaviour).enabled = true;
	camX.enabled = true;
	camY.enabled = true;
	isPause = false;
}

 
function Update () {

	if(Input.GetKeyDown(KeyCode.Escape))
	{
		isPause = !isPause;
		if(isPause) {
			Time.timeScale = 0;
			(inputController as MonoBehaviour).enabled = false;
			camX.enabled = false;
			camY.enabled = false;

		}
		else {
			quitMenu();
		}
	}
	
}

function OnGUI() {

	if (isPause) {
	 	GUI.skin.label.font = GUI.skin.button.font = GUI.skin.box.font = font;
		GUI.skin.label.fontSize = GUI.skin.box.fontSize = GUI.skin.button.fontSize = 16;
		
		if (GUI.Button(Rect(Screen.width/2-30,Screen.height/2-70,100,30),"Resume")) {
			// Boton de vuelta a la partida.
			print("Resume.");
			quitMenu();
		}
		if (GUI.Button(Rect(Screen.width/2-30,Screen.height/2-20,100,30),"Options")) {
			// Boton de opciones.
			print("Options.");
		}
		if (GUI.Button(Rect(Screen.width/2-30,Screen.height/2+30,100,30),"Main Menu")) {
			// Boton de salir al menu principal.
			print("Main Menu.");
			Application.LoadLevel(0);
			quitMenu();
		}
	}
}

 
function Start () {
	
}
