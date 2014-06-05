using UnityEngine;
using System.Collections;

public class GUITimerScript : MonoBehaviour {

	bool finished;
	double time;
	int minutes; 
	int seconds;
	int miliseconds;

	string minutesString;
	string secondsString;

	public UILabel minutesLabel;
	public UILabel secondsLabel;
	public UILabel milisecondsLabel;

	// Use this for initialization
	void Start () {
		finished = false;
		time = 0;
		minutes = 0;
		seconds = 0;
		miliseconds = 0;
	}
	
	// Update is called once per frame
	void Update () {
		if (!finished) {
			time += Time.smoothDeltaTime;
			translateTime ();	
		}
	}

	void translateTime (){
		miliseconds = (int)(time * 1000) % 1000;
		seconds = (int)(time - (miliseconds / 1000)) % 60;
		minutes = (int)(time - seconds - (miliseconds / 1000)) / 60;

		minutesString = minutes.ToString();
		if (minutesString.Length == 1)
			minutesString = "0" + minutesString;

		secondsString = seconds.ToString ();
		if (secondsString.Length == 1)
			secondsString = "0" + secondsString;

		minutesLabel.text = minutesString + ":";
		secondsLabel.text = secondsString + ":";
		milisecondsLabel.text = miliseconds.ToString ();

		//print ("Tiempo = " + minutes + ":" + seconds + ":" + miliseconds); 
	}

	public string getTimeString(){
		return (minutesString + ":" + secondsString + ":" + miliseconds.ToString ());
	}
}
