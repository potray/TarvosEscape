using UnityEngine;
using System.Collections;

public class InGameCoinLabelScript : MonoBehaviour {

	public PlayerInventoryScript inventory;
	UILabel label;
	int previousAmmount;
	int currentAmmount;

	// Use this for initialization
	void Start () {	
		previousAmmount = -1;
		currentAmmount = 0;
		label = GetComponent <UILabel> ();
		
	}
	
	// Update is called once per frame
	void Update () {	
		currentAmmount = inventory.getPlayerCoins();
		if (currentAmmount > previousAmmount) {
			label.text = currentAmmount.ToString();
			previousAmmount = currentAmmount;
		}
	}
}
