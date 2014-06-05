using UnityEngine;
using System.Collections;

public class EndGamePanelScript : MonoBehaviour {
	PlayerInventoryScript inventory;
	GameObject panel;
	bool panelShown;

	public GUITimerScript timer;

	public Camera mainCamera;
	public Camera otherCamera;

	public UILabel time;
	public UILabel coins;
	public UILabel coinsTotal;
	public UILabel coinsExtra;

	// Use this for initialization
	void Start () {
		inventory = GameObject.Find ("Player").GetComponent<PlayerInventoryScript>();
		panel = transform.Find("Panel").gameObject;
		panel.SetActive (false);
		panelShown = false;
		//otherCamera.gameObject.SetActive (false);
	}
	
	// Update is called once per frame
	void Update () {
		if (inventory.finished && !panelShown) {
			panelShown = true;
			panel.SetActive(true);
			mainCamera.gameObject.SetActive(false);
			otherCamera.gameObject.SetActive (true);

			time.text = timer.getTimeString();

			coins.text = inventory.getPlayerCoins().ToString();

		//	print ("monedas = " + inventory.getPlayerCoins());

			coinsExtra.text = inventory.extraCoins.ToString();

			coinsTotal.text = (inventory.getPlayerCoins() + inventory.extraCoins).ToString();



		}
	}
}
