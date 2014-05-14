#pragma strict

//He descubirto que tiene que ser estatica si o si, si no no funciona.
static var Item : ItemType;
static var playerCoins : int = 0;
var bulletPrefab : GameObject;
var rocketPrefab : GameObject;
var bulletInitialSpeed : float = 20f;
var knifeClip : AudioClip;
var rocketLauncherClip : AudioClip;
var gunClip : AudioClip;

// Para que las monedas se guarden entre niveles:
// var playerInventoryScript : PlayerInventoryScript;
// Y referenciar usando playerInventoryScript.playerCoins


function Start () {
	Item = ItemType.Empty;
	playerCoins = 0;
}

function getPlayerCoins(){
	return playerCoins;
}

function Update () {

	if (Input.GetButtonDown("Fire1")){
		switch(Item){
			case ItemType.Gun:			
				print("Usado gun");
				//Lo lanzo hacia donde apunte la camara
				var cam : Camera = Camera.main;
				var bullet : GameObject = Instantiate(bulletPrefab, cam.transform.position + cam.transform.forward, cam.transform.rotation);
				bullet.rigidbody.AddForce(cam.transform.forward * bulletInitialSpeed, ForceMode.Impulse);
				AudioSource.PlayClipAtPoint(gunClip, Camera.main.transform.position);					
				break;
			case ItemType.RocketLauncher:
				print("Usado lanzacohetes");
				var camRocketLauncher : Camera = Camera.main;
				var rocket : GameObject = Instantiate(rocketPrefab, camRocketLauncher.transform.position + camRocketLauncher.transform.forward, camRocketLauncher.transform.rotation);
				rocket.rigidbody.AddForce(camRocketLauncher.transform.forward * bulletInitialSpeed * 2, ForceMode.Impulse);
				AudioSource.PlayClipAtPoint(rocketLauncherClip, Camera.main.transform.position);	
				break;
			case ItemType.Shield:
				//Temporal
				print("Usado escudo");
				break;
			case ItemType.Gravigun:
				//Temporal
				print("Usado gravigun");
				break;
			case ItemType.Knife:
				//Temporal
				print("Usado cuchillo");				
				AudioSource.PlayClipAtPoint(knifeClip, Camera.main.transform.position);	
				break;
			case ItemType.Wings:
				//Temporal
				print("Usado alas");
				break;
		}
		emptyItem();
	}
}

function setItem (newItem : ItemType){
	if (newItem == ItemType.Coin) {
			playerCoins++;
			print("Monedas: " + playerCoins);
		}
	else 
		Item = newItem;
}

function emptyItem (){
	Item = ItemType.Empty;
}