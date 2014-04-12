using UnityEngine;
using System.Collections;

public class CoinLabelScript : MonoBehaviour {

	// Use this for initialization
	void Start () {
		UILabel label = GetComponent <UILabel> ();
		label.text = PlayerPrefs.GetInt("Money").ToString();
	}
	
	// Update is called once per frame
	void Update () {
		UILabel label = GetComponent <UILabel> ();
		if (label.text != PlayerPrefs.GetInt("Money").ToString())
			label.text = PlayerPrefs.GetInt("Money").ToString();
	}
}
