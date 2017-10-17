(function(data){
	var checkForm = document.getElementById("checkForm");
	var inputBox = document.getElementById("input");
	var info = document.getElementById("info");
	checkForm.addEventListener("submit",(e)=>{
		console.log(inputBox.value);
		info.innerText = data[inputBox.value];
		e.preventDefault();
	});
	/*var inputBox = document.getElementById("input");
	inputBox.addEventListener('input',function(){
		console.log("hi");
	});*/
}(nameData));