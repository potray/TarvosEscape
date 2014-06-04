using UnityEngine;
using System.Collections;

public class EndGamePanelScript : MonoBehaviour {
	PlayerInventoryScript inventory;
	GameObject panel;

	// Use this for initialization
	void Start () {
		inventory = GameObject.Find ("Player").GetComponent<PlayerInventoryScript>();
		panel = transform.Find("Panel").gameObject;
		panel.SetActive (false);
	}
	
	// Update is called once per frame
	void Update () {
		if (inventory.finished) {
				print ("Termino");
		}
	}
}
