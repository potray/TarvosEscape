using UnityEngine;
using System.Collections;

public class PriceLabelScript : MonoBehaviour {

	UpgradeButtonScript upgradeScript;
	UILabel label;
	int currentUpgrade, lastUpgrade = -1;

	// Use this for initialization
	void Start () {
		upgradeScript = (UpgradeButtonScript) transform.parent.gameObject.GetComponent("UpgradeButtonScript");
		label = GetComponent <UILabel> ();
	}
	
	// Update is called once per frame
	void Update () {
		currentUpgrade = upgradeScript.upgrade;
		if (lastUpgrade != currentUpgrade)
			updateText ();
	}

	void updateText(){
		lastUpgrade = currentUpgrade;
		if (currentUpgrade != upgradeScript.maxUpgrades)
			label.text = upgradeScript.getPrices () [currentUpgrade].ToString ();
		else
			label.text ="Max!";
	}
}
