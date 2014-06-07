#pragma strict

var finished : boolean;

//He descubirto que tiene que ser estatica si o si, si no no funciona.
var Item : ItemType;
static var playerCoins : int = 0;
var extraCoins : int = 0;
var bulletPrefab : GameObject;
var rocketPrefab : GameObject;
var bulletInitialSpeed : float = 20f;

//Audioclips
var knifeClip : AudioClip;
var rocketLauncherClip : AudioClip;
var gunClip : AudioClip;
var stompClip : AudioClip;
var shieldExplosionClip : AudioClip;

var jetpackAudioSource : AudioSource;
var shieldAudioSource : AudioSource;

static var gunUpgrade : int;
static var wingsUpgrade : int;
static var shieldUpgrade : int;

static var bullets : int;

var bullet1 : GameObject;
var bullet2 : GameObject;
var bullet3 : GameObject;

//Parametros del jetpack
var speedMultiplier : float;
var accelerationMultiplier : float;
var jumpHeightMultiplier : float;
var flightDuration : float;

var jetpackFirstUpgradeSpeedAdd : float;
var jetpackSecondUpgradeTimeAdd : float;
var jetpackThirdUpgradeCanStomp : boolean;

var cm : CharacterMotor;
var isFlying : boolean;

//Parametros del escudo
var isShielded : boolean;
var shieldTime : int;
var playerShield : GameObject;


// Para que las monedas se guarden entre niveles:
// var playerInventoryScript : PlayerInventoryScript;
// Y referenciar usando playerInventoryScript.playerCoins


function Start () {
	finished = false;

	//Item = ItemType.Empty;
	playerCoins = 0;
	
	//Cargar mejoras
	gunUpgrade = PlayerPrefs.GetInt("Gun");
	wingsUpgrade = PlayerPrefs.GetInt("Wings");
	shieldUpgrade = PlayerPrefs.GetInt("Shield");
	
	cm  = GetComponent.<CharacterMotor>();
	isFlying = false;	
	isShielded = false;
	playerShield.SetActive(false);
	
	
	//Configurar la mejora de jetpack
	if (wingsUpgrade == 0)
		jetpackFirstUpgradeSpeedAdd = 0;
	
	if (wingsUpgrade < 2)
		jetpackSecondUpgradeTimeAdd = 0;
		
	if (wingsUpgrade == 3)
		jetpackThirdUpgradeCanStomp = true;
	else		
		jetpackThirdUpgradeCanStomp = false;
		
	//Configurar la mejora del escudo
	if (shieldUpgrade > 0)
		shieldTime = 4;
	else
		shieldTime = 2;
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

	//Controlo en este script el que el se este volando.
	if (isFlying && Input.GetButton("Jump")){
		cm.grounded = true;
		cm.ApplyGravityAndJumping (Vector3(0, 1, 0) + cm.movement.velocity);
		cm.ApplyInputVelocityChange (Vector3(0, 1, 0) + cm.movement.velocity);
	}
	
	if (isFlying && Input.GetKeyDown(KeyCode.LeftShift) && jetpackThirdUpgradeCanStomp){
		endFlight();
		stomp();
	}	

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
				shield();
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
				fly();
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

function shield(){
	isShielded = true;
	shieldAudioSource.Play();
	playerShield.SetActive(true);
	
	if (shieldUpgrade < 2){
		yield WaitForSeconds(shieldTime);
		endShield();
	}
}

function endShield(){
	if (isShielded){
		isShielded = false;
		shieldAudioSource.Stop();
		
		if (shieldUpgrade == 3)		
			shieldExplode();
		else			
			playerShield.SetActive(false);
	}
}

function shieldExplode(){
	AudioSource.PlayClipAtPoint(shieldExplosionClip, Camera.main.transform.position);	
	
	//Shield explosion animation
	
	playerShield.SetActive(false);
	
}

function endFlight(){
	if (isFlying){			
		jetpackAudioSource.Stop();
		cm.movement.maxForwardSpeed /= (speedMultiplier + jetpackFirstUpgradeSpeedAdd);	
		cm.movement.maxSidewaysSpeed /= (speedMultiplier + jetpackFirstUpgradeSpeedAdd);	
		cm.movement.maxBackwardsSpeed /= (speedMultiplier + jetpackFirstUpgradeSpeedAdd);	
		cm.movement.maxGroundAcceleration  /= (accelerationMultiplier + jetpackFirstUpgradeSpeedAdd);
		cm.movement.maxAirAcceleration /= (accelerationMultiplier + jetpackFirstUpgradeSpeedAdd);
		cm.jumping.baseHeight /= jumpHeightMultiplier;
		cm.jumping.extraHeight /= jumpHeightMultiplier;
		isFlying = false;
	}
}

function stomp(){
	cm.movement.gravity *= 50;
	cm.movement.maxFallSpeed *= 50;
	
	while (!cm.grounded){
		yield WaitForSeconds(0.1);
	}
	
	AudioSource.PlayClipAtPoint(stompClip, Camera.main.transform.position);	
	cm.movement.gravity /= 50;
	cm.movement.maxFallSpeed /= 50;
	print ("Stomped!!!");
}

function fly (){	
	
	jetpackAudioSource.Play();
	cm.movement.maxForwardSpeed *= (speedMultiplier + jetpackFirstUpgradeSpeedAdd);	
	cm.movement.maxSidewaysSpeed *= (speedMultiplier + jetpackFirstUpgradeSpeedAdd);	
	cm.movement.maxBackwardsSpeed *= (speedMultiplier + jetpackFirstUpgradeSpeedAdd);	
	cm.movement.maxGroundAcceleration  *= (accelerationMultiplier + jetpackFirstUpgradeSpeedAdd);
	cm.movement.maxAirAcceleration *= (accelerationMultiplier + jetpackFirstUpgradeSpeedAdd);
	cm.jumping.baseHeight *= jumpHeightMultiplier;
	cm.jumping.extraHeight *= jumpHeightMultiplier;
	isFlying = true;
	
	yield WaitForSeconds(flightDuration + jetpackSecondUpgradeTimeAdd);
	
	endFlight();


}

function emptyItem (){
	Item = ItemType.Empty;
}