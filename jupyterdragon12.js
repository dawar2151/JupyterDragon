/*
 Add this file to $(ipython locate)/nbextensions/jupyterDragon.js
 And load it with:
*/ 
 require(["nbextensions/jupyterDragon"], function (jupyterDragon_extension) {
 	console.log('jupyterDragon extension loaded');
 	load_ipython_extension();
 });
 define( function () {
	var boolean = false; // permet de connaitre l'état de notre module ( actvé, désactivé)
	//Créé les variables inséré dans l'input
  	var create_var = function (){
	            var cell = arguments[0];
	            var text = cell.get_text();
	            var valide_function_to_factor = /([^a-zA-Z])/g;
	            var resultat = text.replace(valide_function_to_factor, "").split('');

	            for (var iter = 0; iter < resultat.length; iter++) 
	            {
	                var new_var = resultat[iter] + "=var('"+resultat[iter]+"')";
	                Jupyter.notebook.kernel.execute(new_var);
	            }
		return resultat;
	};
	// Fonction pour factoriser
	var factor = function (cell) 
	{
		//On récupère ce qu'il y dans l'input de la cellule
		var text = cell.get_text();
		//si l'input est vide on indique que le formule n'est pas valide
		if(text.trim()!="")
		{
			//formatage de la chaine en fonction de l'opération à effectuer			
			var operation = "factor("+text+");";
			//Création des variables
	        	create_var(cell);
			//si l'output n'est pas vide, on le vide
	        	if(cell.output_area.outputs[0]!=undefined){
	        		cell.output_area.clear_output();
			}	
		//vérification de la formule et exécution de la commande
		check_and_execute_formule(cell, operation);	
	        }
	 	else
	 	{
	        	alert("Formule non valide");
	 	}
	};
	var solve = function (cell) 
	{	
	        var valide_function_to_solve = /^([a-z]|([0-9]*)+)(([+\-*\/]([a-z]|([0-9]*)+))*)?/g;
		
		// contenu input
	        var text = cell.get_text();
	        var valide = text.replace(valide_function_to_solve, "");
		if(text.trim()!="")
		{
			var vars; // variables en string
			var input; // l'input de la cellule
			var inputTab =[]; // cellule Unique dans un tab
			var find; // permet de savoir si la variable est unique ou pas
			var buttons = {} ;//Stocker les boutons dans la boite de dialog


			/*Création des variables*/
			    vars = create_var(cell);
				if(cell.output_area.outputs[0]!=undefined){
	        			cell.output_area.clear_output();
				}
			/*Propositions des variables*/
			 inputTab = variablesUnique(vars);

			// On créé notre input
			input = "<div class ='col-xs-12'><b>Choose the variable in order to solve :<br><center>"+text+"</center></b></div>";
		
			// création des boutons

			var val = [];
			for(i = 0 ; i < inputTab.length; i ++){
				val[i] = inputTab[i];
				buttons[val[i]] = factoryButtons(val[i],text,cell);	 
			}

			// creation de la boite de dialog
			var options = {height: 'auto',width: 'auto', buttons:buttons}
			createDialog("Choose your variable",input,options);
		}else{
	        	alert("Formule non valide");
		}
	};
	/*Display input cel*/
	var click_on_button = function(){
			//Permet de rafraichir le DOM et d'ajouter nos fonctionnalités
	$("body").on('click','button[title =\"jupyterButtonFactor\"]', function() {
			var cell = Jupyter.notebook.get_cell(Jupyter.notebook.get_selected_cells_indices());

			//On factorise notre entrée
			factor(cell);
		});
		// On écoute sur le bouton solve
		$("body").on('click','button[title =\"jupyterButtonSolve\"]', function() {
			var cell = Jupyter.notebook.get_cell(Jupyter.notebook.get_selected_cells_indices());

			//On factorise notre entrée
			solve(cell);
		});		
		// On écoute sur le bouton Plot
		$("body").on('click','button[title =\"jupyterButtonPlot\"]', function() {
			var cell = Jupyter.notebook.get_cell(Jupyter.notebook.get_selected_cells_indices());

			//On plot notre entrée
			plot(cell);
		});
			// On écoute sur le bouton Diff
		$("body").on('click','button[title =\"jupyterButtonDiff\"]', function() {
			var cell = Jupyter.notebook.get_cell(Jupyter.notebook.get_selected_cells_indices());

			//On diff notre entrée
			diff(cell);
		});
		// On écoute sur le bouton simplify
		$("body").on('click','button[title =\"jupyterButtonSimplify\"]', function() {
			var cell = Jupyter.notebook.get_cell(Jupyter.notebook.get_selected_cells_indices());

			//On simplify notre entrée
			simplify(cell);
		});
			// On écoute sur le bouton Expand
		$("body").on('click','button[title =\"jupyterButtonExpand\"]', function() {
			var cell = Jupyter.notebook.get_cell(Jupyter.notebook.get_selected_cells_indices());

			//On Expand notre entrée
			expand(cell);
		});
	};
	/*Ajouter un bouton jupyterDragon*/
    	var jupyterDragon_button = function () {
			if (!IPython.toolbar) {
			    $([IPython.events]).on("app_initialized.NotebookApp", jupyterDragon_button);
			    return;
			}
			if ($("#jupyterDragon_notebook").length === 0) {
			    IPython.toolbar.add_buttons_group([
			        {
			            'label': 'Use jupyterDragon',
			            'icon': 'fa-play-circle',
			            'callback': jupyterDragon_notebook,
			            'id': 'jupyterDragon_notebook'
			        },
			    ]);
			}
    	};
	var load_ipython_extension = function () {
		var kernel = IPython.notebook.kernel;
		/*Activer le module*/
		jupterDragon_button();
		/*Activer l'extension*/
		activate_extension(self);
		alert("updated");
	};
	var activate_extension = function (self) {
		//Install JS extensions
			path = os.path.abspath(os.path.join.dirname("notebook", os.path.padir));
			install_nbextension(path, overwrite = True, user = True);
			js_cm = ConfigManager();
			// activer l'extension
			js_cm.update('notebook', {"load_extensions": {'jupyterDragon/static/js/notebook ': True}})
	};
	return {
		load_ipython_extension: load_ipython_extension
	};
});