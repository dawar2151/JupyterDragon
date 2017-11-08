# Jupyter_module
JupyterDragon est une extension qui permet d'ameliorer l'interface Jupyter.
# Display latex expression
%display latex

# add code in notenook/templates/notebook.js

<!-- Include header sageDragon ---------------------------->
{% include base_url + "/sageDragon/templates/header.html" %}
<!--------------------------------------------------------->

#add module jupyterDragon

import notebook.nbextensions
notebook.nbextensions.install_nbextension('Extension Js Path', user=True)


<!--activer le script-->

%%javascript
Jupyter.utils.load_extensions('jupyterDragon')



