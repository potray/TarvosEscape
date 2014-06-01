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
var jetpack : GameObject;
var shield : GameObject;

static var gunUpgrade : int;
var bullet1 : GameObject;
var bullet2 : GameObject;
var bullet3 : GameObject;
var bullets : int;

function Start () {
	//Busco el script en la jerarquia, lo tiene el padre.
	playerInventoryScript = this.transform.parent.gameObject.GetComponent(PlayerInventoryScript);
	currentItem = playerInventoryScript.Item;
	
	//Busco el objeto flotante para la rotacion
	GUIFloatingItem = this.gameObject.Find("PlayerItem");
	
	//Cargar mejoras del jugador
	gunUpgrade = PlayerPrefs.GetInt("Gun");
	
	previousItem = null;	

	//Ocultar ratón
	Screen.showCursor = false;

}

function hideBullets(){
	bullet1.SetActive(false);
	bullet2.SetActive(false);
	bullet3.SetActive(false);
}

function Update () {
	//Miro si se ha cambiado el item y lo actualizo
	playerItem = playerInventoryScript.Item;
	if (playerItem != currentItem){	
		hideBullets();
		//Miro cual tengo que activar.		
		switch (playerItem){
			case ItemType.Gun:
				print ("gunUpgrade en GUIScript = " + gunUpgrade);
				switch (gunUpgrade){
					case 0:		
						bullet1.SetActive(true);
					break;
					case 1:
						bullet1.SetActive(true);
						bullet2.SetActive(true);
						bullet3.SetActive(true);
					break;
					case 2:
						//Activar la pistola laser con una bala
					break;
					case 3:
						//Activar la pistola laser con 3 balas
					break;				
				}
				nextItem = gun;
				break;
			case ItemType.RocketLauncher:
				nextItem = rocketlauncher;
				break;
			case ItemType.Shield:
				nextItem = shield;
				break;
			case ItemType.Gravigun:
				nextItem = gravigun;
				break;
			case ItemType.Knife:
				nextItem = knife;
				break;
			case ItemType.Wings:
				nextItem = jetpack;
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