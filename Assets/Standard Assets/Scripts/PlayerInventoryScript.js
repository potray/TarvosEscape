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

static var gunUpgrade : int;
static var bullets : int;

var bullet1 : GameObject;
var bullet2 : GameObject;
var bullet3 : GameObject;

// Para que las monedas se guarden entre niveles:
// var playerInventoryScript : PlayerInventoryScript;
// Y referenciar usando playerInventoryScript.playerCoins


function Start () {
	Item = ItemType.Empty;
	playerCoins = 0;
	gunUpgrade = PlayerPrefs.GetInt("Gun");
}

function getPlayerCoins(){
	return playerCoins;
}

function updateBullets(){
	print ("Bullets = " + bullets);
	switch (bullets){
		case 2:
			bullet3.SetActive(false);
		break;
		case 1:
			bullet2.SetActive(false);
			break;
		case 0:
			bullet1.SetActive(false);
			emptyItem();
			break;	
	}
}

function Update () {

	if (Input.GetButtonDown("Fire1")){
		switch(Item){
			case ItemType.Gun:			
				print("Usado gun");
				//Lo lanzo hacia donde apunte la camara
				var cam : Camera = Camera.main;
				var bullet : GameObject = Instantiate(bulletPrefab, cam.transform.position + cam.transform.forward, cam.transform.rotation);
				bullet.transform.Rotate(0, -90, 0);
				bullet.rigidbody.AddForce(cam.transform.forward * bulletInitialSpeed, ForceMode.Impulse);
				AudioSource.PlayClipAtPoint(gunClip, Camera.main.transform.position);	
				bullets --;
				updateBullets();				
				break;
			case ItemType.RocketLauncher:
				print("Usado lanzacohetes");
				var camRocketLauncher : Camera = Camera.main;
				var rocket : GameObject = Instantiate(rocketPrefab, camRocketLauncher.transform.position + camRocketLauncher.transform.forward, camRocketLauncher.transform.rotation);
				rocket.rigidbody.AddForce(camRocketLauncher.transform.forward * bulletInitialSpeed * 2, ForceMode.Impulse);
				AudioSource.PlayClipAtPoint(rocketLauncherClip, Camera.main.transform.position);	
				emptyItem();
				break;
			case ItemType.Shield:
				//Temporal
				print("Usado escudo");
				emptyItem();
				break;
			case ItemType.Gravigun:
				//Temporal
				print("Usado gravigun");
				emptyItem();
				break;
			case ItemType.Knife:
				//Temporal
				print("Usado cuchillo");				
				AudioSource.PlayClipAtPoint(knifeClip, Camera.main.transform.position);	
				emptyItem();
				break;
			case ItemType.Wings:
				//Temporal
				print("Usado alas");
				emptyItem();
				break;
		}
	}
}
//enum ItemType{Empty, Gun, RocketLauncher, Shield, Gravigun, Knife, Wings, Coin};
function setItem (newItem : ItemType){
	switch (newItem){
		case ItemType.Coin:
			playerCoins++;
		break;
		case ItemType.Gun:
			print ("gunUpgrade = " + gunUpgrade);
			if (gunUpgrade == 0 || gunUpgrade == 2){
				bullets = 1;
			}
			else{
				bullets = 3;
			}
			print ("Nueva pistola, bullets = " + bullets);
			Item = newItem;
		break;
		case ItemType.RocketLauncher:
		case ItemType.Shield:
		case ItemType.Gravigun:
		case ItemType.Knife:
		case ItemType.Wings:
			Item = newItem;
		break;
		
	}
}

function emptyItem (){
	Item = ItemType.Empty;
}