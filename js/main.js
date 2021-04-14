
(() => {

const instrumentIcons = document.querySelectorAll(".instruments"), 
	loops = document.querySelectorAll(".loops"), 
	playBoard = document.querySelectorAll(".dropzones"), 
	playBoardContainer = document.querySelector("#dropzone_container"),
	liveGIF = document.querySelector("#midi_img");
	footerSounds = document.querySelectorAll(".bot_instruments"),
	playButton = document.querySelector("#play"),
	pauseButton = document.querySelector("#pause"),
	resetButton =document.querySelector("#reset"),
	startOverButton = document.querySelector("#startOver"),
	volUp = document.querySelector('#volUp'),
	volDown = document.querySelector('#volDown');

//Click & Held onto an icon
function picked(event){
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
	audio.volume = 0.5;
}

function imageSwap(event){
	event.preventDefault();
	document.getElementById("midi_img").src="images/music_playing.gif";
}

//Use when a new track is added, or they hit the restart button
function restartTrack(event){
	event.preventDefault();
	let track = document.querySelectorAll('.playing');
	console.log("restarting track");
	track.forEach(track => track.currentTime = 0);
}

//Restart Button
function startOver(event){
	window.location.reload();
}

//Pause Button
function pauseTrack(event){
	event.preventDefault();
	let songs = document.querySelectorAll('.playing');
	console.log("pausing track");
	songs.forEach(song => song.pause());
}

//Play Button
function playTrack(event){
	event.preventDefault();
	let track = document.querySelectorAll('.playing');
	console.log("resuming track");
	track.forEach(track => track.play());
}

// Volume max (could not figure out how to do it in steps 0.50, 0.75, 1.0)
function volumeUp(event){
	console.log("Full Volume");
	let track = document.querySelectorAll('.playing');
	track.forEach(track => track.volume = 1.0);
}

// Volume low (could not figure out how to do it in steps 0.75, 0.50, 0.25)
function volumeDown(event){
	console.log("Half Volume");
	let track = document.querySelectorAll('.playing');
	track.forEach(track => track.volume = 0.25);
}

//Event Handling at the bottom
instrumentIcons.forEach(piece => piece.addEventListener("dragstart", picked));
footerSounds.forEach(piece => piece.addEventListener("dragstart", picked));
playBoard.forEach(zone => {
	zone.addEventListener("dragover", draggedOver);
	zone.addEventListener("drop", chosen);
	zone.addEventListener("drop", restartTrack);
	zone.addEventListener("drop", imageSwap);	
});
playButton.addEventListener("click", playTrack);
pauseButton.addEventListener("click", pauseTrack);
resetButton.addEventListener("click", restartTrack);
startOverButton.addEventListener("click", startOver);
volUp.addEventListener("click", volumeUp);
volDown.addEventListener("click", volumeDown);
window.addEventListener("drop", playSound);

})();
