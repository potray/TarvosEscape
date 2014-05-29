using UnityEngine;
using System.Collections;

public class UpgradeButtonOverScript : MonoBehaviour {
	UpgradeButtonScript upgradeScript;
	string commonInfo = "move mouse over an upgrade to see it's effect";

	// Use this for initialization
	void Start () {				
		upgradeScript = (UpgradeButtonScript) gameObject.GetComponent("UpgradeButtonScript");
	}

	void OnHover (bool isOver){
		if (isOver) {
			if (upgradeScript.upgrade == upgradeScript.maxUpgrades)				
				UITooltip.ShowText (upgradeScript.infoUpgrades [upgradeScript.maxUpgrades - 1]);
			else
				UITooltip.ShowText (upgradeScript.infoUpgrades [upgradeScript.upgrade]);
		}
		else
			UITooltip.ShowText(commonInfo);
	}

	void OnClick (){			
		if (upgradeScript.upgrade == upgradeScript.maxUpgrades)				
			UITooltip.ShowText (upgradeScript.infoUpgrades [upgradeScript.maxUpgrades - 1]);
		else
			UITooltip.ShowText (upgradeScript.infoUpgrades [upgradeScript.upgrade]);
	}
}
