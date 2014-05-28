#pragma strict

enum upgradeTypes {Gun, Knife, Gravigun, Shield, Wings, RocketLauncher, Jump, CoinValue, Magnet, Stun};
enum buttonTypes {Upgrade, Exit, FreeCoins};

var upgrade : int = 0;
var firstUpgradePrice : int;
var secondUpgradePrice : int;
var thirdUpgradePrice : int;
var fourthUpgradePrice : int;
var maxUpgrades : int = 3;

var infoFirstUpgrade : String;
var infoSecondUpgrade : String; 
var infoThirdUpgrade : String;
var infoFourthUpgrade : String;

//Para buscar automaticamente los cuadrados.
var searchForNames : boolean = true;

var upgradeType : upgradeTypes;
var buttonType : buttonTypes = buttonTypes.Upgrade;

var firstUpgrade_no : GameObject;
var firstUpgrade_yes : GameObject;
var secondUpgrade_no : GameObject;
var secondUpgrade_yes : GameObject;
var thirdUpgrade_no : GameObject;
var thirdUpgrade_yes : GameObject;
var fourhtUpgrade_no : GameObject;
var fourhUpgrade_yes : GameObject;

var prices : int [];
var upgradeYes : GameObject[];
var upgradeNo : GameObject[];
var infoUpgrades : String [];

function Start () {
	if (buttonType == buttonTypes.Upgrade){
		//Busco los cuadritos por nombres.
		if (searchForNames){
			firstUpgrade_no = transform.Find("Upgrade1_No").gameObject;
			firstUpgrade_yes = transform.Find("Upgrade1_Yes").gameObject;
			secondUpgrade_no = transform.Find("Upgrade2_No").gameObject;
			secondUpgrade_yes = transform.Find("Upgrade2_Yes").gameObject;
			thirdUpgrade_no = transform.Find("Upgrade3_No").gameObject;
			thirdUpgrade_yes = transform.Find("Upgrade3_Yes").gameObject;
		}

		//Meto los precios en un array.
		prices = new int[maxUpgrades];
		prices[0] = (firstUpgradePrice);
		prices[1] = (secondUpgradePrice);
		prices[2] = (thirdUpgradePrice);
		
		//Meto las descripciones en un array		
		infoUpgrades = new String [maxUpgrades];
		infoUpgrades[0] = infoFirstUpgrade;
		infoUpgrades[1] = infoSecondUpgrade;
		infoUpgrades[2] = infoThirdUpgrade;
		
		//Meto los cuadraditos en dos arrays.
		upgradeYes = new GameObject[maxUpgrades];	
		upgradeNo = new GameObject[maxUpgrades];
		
		upgradeYes[0] = (firstUpgrade_yes);
		upgradeYes[1] = (secondUpgrade_yes);
		upgradeYes[2] = (thirdUpgrade_yes);
		
		upgradeNo[0] = (firstUpgrade_no);
		upgradeNo[1] = (secondUpgrade_no);
		upgradeNo[2] = (thirdUpgrade_no);
		
		
		//Enlazo las variables del cuarto cuadrito si es necesario.
		if (maxUpgrades == 4){
			if (searchForNames){
				fourhtUpgrade_no = transform.Find("Upgrade4_No").gameObject;
				fourhUpgrade_yes = transform.Find("Upgrade4_Yes").gameObject;
			}
			prices[3] = fourthUpgradePrice;
			upgradeYes[3] = fourhUpgrade_yes;
			upgradeNo[3] = fourhtUpgrade_no;	
			infoUpgrades[3] = infoFourthUpgrade;
		}
			
		//Cargo la upgrade y actualizo los cuadraditos en consecuencia.
		upgrade = PlayerPrefs.GetInt(upgradeType.ToString());
		
		for (var i = 0; i < upgrade; i++){		
			upgradeYes[i].SetActive(true);
			upgradeNo[i].SetActive(false);
		}		
	}
}

function Update () {
	
}

function getPrices (){
	return prices;
}

function OnClick (){
	switch (buttonType){
		case buttonTypes.Upgrade:
			var currentMoney : int = PlayerPrefs.GetInt("Money");
			if (upgrade < maxUpgrades)
				//No se puede anidar porque se accede a un array cuyo indice se va a salir de su rango.
				if (currentMoney >= prices[upgrade] && upgrade != maxUpgrades){
					//Activo y desactivo los cuadraditos pertinentes
					upgradeYes[upgrade].SetActive(true);
					upgradeNo[upgrade].SetActive(false);
					
					//Actualizo el dinero del jugador
					currentMoney -= prices[upgrade];
					PlayerPrefs.SetInt("Money", currentMoney);
					
					//Actualizo la mejora
					upgrade ++;			
						
					PlayerPrefs.SetInt(upgradeType.ToString(), upgrade);						
				}
			break;
		case buttonTypes.Exit:
			Application.LoadLevel(0);
			break;
		case buttonTypes.FreeCoins:
			PlayerPrefs.SetInt("Money", PlayerPrefs.GetInt("Money") + 1000);
			break;
	}

}