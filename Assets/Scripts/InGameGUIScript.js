#pragma strict

var playerInventoryScript : PlayerInventoryScript;
var currentItem : ItemType;
var playerItem : ItemType;
var GUIFloatingItem : GameObject;
var previousItem : GameObject;
var nextItem : GameObject;
var gun : GameObject;
var knife : GameObject;
var gravigun : GameObject;
var rocketlauncher : GameObject;

function Start () {
	//Busco el script en la jerarquia, lo tiene el padre.
	playerInventoryScript = this.transform.parent.gameObject.GetComponent(PlayerInventoryScript);
	currentItem = playerInventoryScript.Item;
	
	//Busco el objeto flotante para la rotacion
	GUIFloatingItem = this.gameObject.Find("PlayerItem");
	
	previousItem = null;
}

function Update () {
	//Miro si se ha cambiado el item y lo actualizo
	playerItem = playerInventoryScript.Item;
	if (playerItem != currentItem){	
		//Miro cual tengo que activar.		
		switch (playerItem){
			case ItemType.Gun:
				nextItem = gun;
				print("Activare gun");
				break;
			case ItemType.RocketLauncher:
				nextItem = rocketlauncher;
				break;
			case ItemType.Shield:
				break;
			case ItemType.Gravigun:
				nextItem = gravigun;
				break;
			case ItemType.Knife:
				nextItem = knife;
				break;
			case ItemType.Wings:
				break;		
			case ItemType.Empty:
				nextItem = null;
				break;
		}
		//Intercambio anterior con siguiente.
		if (nextItem != null)
			nextItem.SetActive(true);
		if (previousItem != null)
			previousItem.SetActive(false);
		previousItem = nextItem;
		
		currentItem = playerItem;
	}
	
	//Rotacion del item en la GUI
	GUIFloatingItem.transform.Rotate (Vector3.up * Time.deltaTime * 75);
}