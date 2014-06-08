#pragma strict

static var enemyCoins : int = 0;
static var enemyItem : ItemType;
var animPlayer : Animator;
var player : GameObject;

var bulletInitialSpeed : float = 100f;
var bulletPrefab : GameObject;

//Clips de audio
var gunClip : AudioClip;

function Start() {
	enemyCoins = 0;
	enemyItem = ItemType.Empty;
	player = GameObject.Find("Player");
}

function Update() {
	//Control con el teclado para debug.
	if (Input.GetKeyDown(KeyCode.K)){
		shoot();
	}

	if (enemyItem != ItemType.Empty){
		switch (enemyItem){
			case ItemType.Gun:
				shoot();
			break;
		}
		setItem (ItemType.Empty);
	}
}

function shoot(){
	//Rotar hacia el jugador
	var target = player.transform;
	var duration : float = 0.35;
	var startRot : Quaternion = transform.rotation;
	for (var t=0.0;t<duration;t+=Time.deltaTime) {
		var targetRot : Quaternion = Quaternion.LookRotation(target.position - transform.position); //recalculate every frame because it can change over the course of the jump
		transform.rotation = Quaternion.Slerp(startRot, targetRot, t / duration);
		yield;
	}
	print ("Apuntado");
	//Disparar
	
	var bullet : GameObject = Instantiate(bulletPrefab, player.transform.position/* + transform.forward + Vector3(0,1,0)*/, transform.rotation);
	//bullet.transform.Rotate(0, -90, 0);
	bullet.GetComponent.<BulletTypeScript>().whoShooted = "Enemy";
	//bullet.rigidbody.AddForce(transform.forward * bulletInitialSpeed, ForceMode.Impulse);
	//Debug.DrawRay(transform.position, transform.forward, Color.green, 100);
	AudioSource.PlayClipAtPoint(gunClip, transform.position, 100);		
}


function setItem (newItem : ItemType){
	if (newItem == ItemType.Coin) {
			enemyCoins++;
			print("Monedas (enemigo): " + enemyCoins);
		}
	else
		enemyItem = newItem;
}

