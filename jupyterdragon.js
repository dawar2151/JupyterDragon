define(['base/js/namespace' ], function(Jupyter) {
     //developpe les formules
    //simplifie les formules
    var simplify = function (cell) 
    {
        //On récupère ce qu'il y dans l'input de la cellule
        var text = cell.get_text();
        //si l'input est vide on indique que le formule n'est pas valide
        if(text.trim()!="")
        {
            console.log(text);
            //formatage de la chaine en fonction de l'opération à effectuer
            var operation = "simplify("+text+")"
            //Création des variables
                create_var(cell);
            //si l'output n'est pas vide, on le vide
                if(cell.output_area.outputs[0]!=undefined){
                    cell.output_area.clear_output();
        }
        //vérification de la formule et exécution de la commande    
        check_and_execute_formule(cell, operation); 
        }else{
                alert("Formule non valide");
        }
    };
    var getCellSelectCellText = function(){   
        $('.MathJax').click(function(){ 
            alert(window.getSelection().toString());
        });
    };
    getCellSelectCellText();
     /*
        Cette fonction prend en paramètre une cellule et une opération. L’opération contient ce qu’il faut exécuter avec le kernel, 
        et elle est définie auparavant dans les différente fonctions qui appeleront check_and_execute. 
    */
    var check_and_execute_formule = function (cell, operation)
    {
        //Exécute une commande "opération" via le kernel
        //cell.get_callbacks() permet de récupérer le résultat et de le mettre dans l'output de la cellule
        Jupyter.notebook.kernel.execute(operation, cell.get_callbacks(), {silent:false} );
        //On attend le résultat
             setTimeout(function(){
            //si output contient une erreur on vide l'output et on indique que la formule n'est pas valide
            if(cell.output_area.outputs[0].traceback != undefined){         
                cell.output_area.clear_output();
                alert("Formule non valide");        
            }   
        }, 200);
    }
    //Créé les variables inséré dans l'input
    var create_var = function (){
        var cell = arguments[0];
        var text = cell.get_text();
        var valide_function_to_factor = /([^a-zA-Z])/g;
        var resultat = text.replace(valide_function_to_factor, "").split('');
        console.log('hello'+resultat);    
        for (var iter = 0; iter < resultat.length; iter++) 
        {
            var new_var = resultat[iter] + "=var('"+resultat[iter]+"')";

            Jupyter.notebook.kernel.execute(new_var);
        }
        return resultat;
    };   
    function load_ipython_extension() {
        Jupyter.notebook.kernel.execute("%display latex");
        var handler = function () {
            var cell = Jupyter.notebook.get_cell(Jupyter.notebook.get_selected_cells_indices());
            simplify(cell);
        };
        console.log('hello world from jupyterDragon');
        var action = {
            icon: 'fa-comment-o', // a font-awesome class used on buttons, etc
            help    : 'jupyterDragon button',
            help_index : 'zz',
            handler : handler
        };
        var prefix = 'jupyterDragon';
        var action_name = 'show-alert-usr';

        var full_action_name = Jupyter.actions.register(action, action_name, prefix); // returns 'my_extension:show-alert'
        Jupyter.toolbar.add_buttons_group([full_action_name]);
    }
    return {
        load_ipython_extension: load_ipython_extension
    }; 
});
