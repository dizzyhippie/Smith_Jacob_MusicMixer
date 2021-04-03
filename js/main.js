
(() => {

const instrumentIcons = document.querySelectorAll(".instruments"), 
	loops = document.querySelectorAll(".loops"), 
	playBoard = document.querySelectorAll(".dropzones"), 
	playBoardContainer = document.querySelector("#dropzone_container");



//Click & Held onto an icon
function dragStart(){
	console.log('You have chosen an Instrument');

	//Reparent the instrument to the drop zone
	event.dataTransfer.setData("savedID", this.id);

}

//Dragged over the playboard
function draggedOver(event){
	event.preventDefault();
	console.log("dragged over playboard");
}

//Dropped onto the playboard
function dropped(event){
	event.preventDefault();
	console.log("dropped");
	let targetID = event.dataTransfer.getData("savedID");
	console.log("I chose this one", targetID);

	//Move the icon into the selected "drop" container
	event.target.appendChild(document.querySelector(`#${targetID}`));
}


//Event Handling at the bottom
instrumentIcons.forEach(piece => piece.addEventListener("dragstart", dragStart));
playBoard.forEach(zone => {
	zone.addEventListener("dragover", draggedOver);
	zone.addEventListener("drop", dropped);

})

})();


