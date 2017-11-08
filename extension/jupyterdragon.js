/*
 Add this file to $(ipython locate)/nbextensions/sageDragon.js
 And load it with:
*/ 
 require(["nbextensions/jupyterDragon"], function (jupyterDragon_extension) {
 	console.log('jupyterDragon extension loaded');
 	alert("GetStared");
 	jupyterDragon_extension.load_ipython_extension();
 });
 
