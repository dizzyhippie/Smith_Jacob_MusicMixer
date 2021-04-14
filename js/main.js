
(() => {

const instrumentIcons = document.querySelectorAll(".instruments"), 
	loops = document.querySelectorAll(".loops"), 
	playBoard = document.querySelectorAll(".dropzones"), 
	playBoardContainer = document.querySelector("#dropzone_container"),
	footerSounds = document.querySelectorAll(".bot_instruments"),
	playButton = document.querySelector("#play"),
	pauseButton = document.querySelector("#pause"),
	resetButton =document.querySelector("#reset"),
	startOverButton = document.querySelector("#startOver");

//Click & Held onto an icon
function picked(){
	console.log('You have chosen an Instrument');
	event.dataTransfer.setData("savedID", this.id);
	event.dataTransfer.setData("soundChoice", this.dataset.sound);
}

//Dragged over the playboard
function draggedOver(event){
	event.preventDefault();
	console.log("dragged over playboard");
}

//Dropped onto the playboard
function chosen(event){
	event.preventDefault();
	let targetID = event.dataTransfer.getData("savedID");
	console.log("I chose this", targetID);

	//Move the icon into the selected "drop" containers
	event.target.appendChild(document.querySelector(`#${targetID}`));
}

function playSound(event){
	let soundChoice = event.dataTransfer.getData("soundChoice");
	let audio = document.querySelector(`audio[data-sound="${soundChoice}"]`);
	audio.classList.add("playing");
	console.log("you chose", soundChoice);
	audio.currentTime = 0;
	audio.play();
}

//Use when a new track is added, or they hit the restart button
//This only seems to work for the first item in Faded Horizon?
function restartTrack(event){
	event.preventDefault();
	//The track needs to restart all audio playing, but when I change the below to querySelectorAll it doesn't work for any of them.
	let track = document.querySelector('audio');
	console.log("restarting track");
	track.currentTime = 0;
}

function startOver(event){
	window.location.reload();
}

//Also only seems to work for the first item in Faded Horizon, similiar documentQuerySelector issue
//All of these control functions (play pause rewind) only seem to work with the first item.
function pauseTrack(event){
	event.preventDefault();
	let song = document.querySelector('.playing')
	console.log("pausing track");
	song.pause();
}

//AUDIO VOLUME THING
// audio.volume = 0.5;

//Event Handling at the bottom
instrumentIcons.forEach(piece => piece.addEventListener("dragstart", picked));
footerSounds.forEach(piece => piece.addEventListener("dragstart", picked));
playBoard.forEach(zone => {
	zone.addEventListener("dragover", draggedOver);
	zone.addEventListener("drop", chosen);
	zone.addEventListener("drop", restartTrack);	
});
pauseButton.addEventListener("click", pauseTrack);
resetButton.addEventListener("click", restartTrack);
startOverButton.addEventListener("click", startOver);
window.addEventListener("drop", playSound);

})();


