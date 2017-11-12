define([
    'base/js/namespace' ], function(Jupyter) {
    function load_ipython_extension() {
        var handler = function () {
           /* get current cell contents */
            var cell = Jupyter.notebook.get_cell(Jupyter.notebook.get_selected_cells_indices());
            console.log(cell);
        };
        console.log('hello world from jupyterDragon');
        var action = {
            icon: 'fa-comment-o', // a font-awesome class used on buttons, etc
            help    : 'Show an alert',
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
