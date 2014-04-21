#pragma strict

var font : Font;

function Start () {


}

function Update () {

}
function OnGUI() {
 	GUI.skin.label.font = GUI.skin.button.font = GUI.skin.box.font = font;
	GUI.skin.label.fontSize = GUI.skin.box.fontSize = GUI.skin.button.fontSize = 16;
	
	if (GUI.Button(Rect(Screen.width/2-30,Screen.height/2-70,100,30),"Load Game")) {
		// Boton de carga de partida.
		print("Load game.");
		//TEMPORAL: Carga el primer nivel
		Application.LoadLevel(1);
	}
	if (GUI.Button(Rect(Screen.width/2-30,Screen.height/2-20,100,30),"New Game")) {
		// Boton de nuevo juego.
		print("New Game.");
		//TEMPORAL: Carga el primer nivel
		Application.LoadLevel(1);
		
		//Reseteo las monedas		
		PlayerPrefs.SetInt("Money", 0);	
		
		//Reseteo los upgrades
		var t = typeof(upgradeTypes);
		var enums = upgradeTypes.GetValues(t);
	
		for (var i = 0; i < enums.Length; i++){
			PlayerPrefs.SetInt(enums[i].ToString(), 0);
		}

		
	}
	if (GUI.Button(Rect(Screen.width/2-30,Screen.height/2+30,100,30),"Options")) {
		// Boton de opciones.
		print("Options.");
	}
	if (GUI.Button(Rect(Screen.width/2-30,Screen.height/2+80,100,30),"Exit")) {
		// Boton de salir.
		print("Exit.");
		Application.Quit();
	}
}
