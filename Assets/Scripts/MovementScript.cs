using UnityEngine;
using System.Collections;

public class MovementScript : MonoBehaviour {

	public Animator _animPlayer;
	public float _axisY;
	public float _axisH;

	void Update(){
		// Teclas W,S (Y) y A,D (H). Ejes de las flechas de direccion.
		_axisY = Input.GetAxis("Vertical");
		_axisH = Input.GetAxis("Horizontal");

		// Dependiendo de lo que pulsemos o de la situacion de W y S, andamos o corremos.
		if(_axisY > 0.1){

			_animPlayer.SetFloat("Walk", _axisY);
		}

		if(_axisY < 0.1){
			
			_animPlayer.SetFloat("Walk", _axisY);
		}

		if(Input.GetButton("Fire1")){

			_animPlayer.SetBool("Run", true);
		}
		else{

			_animPlayer.SetBool("Run", false);
		}

		if (_axisH >= 0.1 || _axisH <= -0.1){

			_animPlayer.SetFloat("Turn", _axisH);
		}

		if(_axisH == 0){

			_animPlayer.SetFloat("Turn", _axisH);
		}

	}
}
