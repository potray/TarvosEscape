#pragma strict

var targetAnimationIn : Animation;
var targetAnimationOut : Animation;
var animationNameIn : String;
var animationNameOut : String;
var isActive : boolean = true;
var otherButton : ShowPanelScript;

function Start () {

}

function Update () {

}

function OnClick (){
	if (isActive){		
		targetAnimationIn.Play(animationNameIn);
		targetAnimationOut.Play(animationNameOut);
		isActive = false;
		otherButton.activate();
	}
}

function activate(){
	isActive = true;
}