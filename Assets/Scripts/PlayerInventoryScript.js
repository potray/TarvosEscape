#pragma strict

//He descubirto que tiene que ser estatica si o si, si no no funciona.
static var Item : ItemType;
var bulletPrefab : GameObject;
var bulletInitialSpeed : float = 20f;

function Start () {
	Item = ItemType.Empty;
}

function Update () {

	if (Input.GetButtonDown("Fire1")){
		switch(Item){
			case ItemType.Gun:			
				print("usado gun");
				//Lo lanzo hacia donde apunte la camara
				var cam : Camera = Camera.main;
				var bullet : GameObject = Instantiate(bulletPrefab, cam.transform.position + cam.transform.forward, cam.transform.rotation);
				bullet.rigidbody.AddForce(cam.transform.forward * bulletInitialSpeed, ForceMode.Impulse);
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
	Item = newItem;
}

function emptyItem (){
	Item = ItemType.Empty;
}