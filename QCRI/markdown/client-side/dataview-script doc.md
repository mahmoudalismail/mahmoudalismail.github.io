# Dataview Script Documentation

### Note: There was a typo, 'centroids' was mistakenly typed 'centeroid' at some parts, and correcting it might not be a safe option.

### Note: For the documentation of the function 'each' refer to

**Visual Controls Options**  
  * Contains the values of the options that are used to control the visual behaviors of the node-link diagram

**Defined clusters, nodes, links, and grah **
  * Are meant to be just a sample of how to use and initialize the graph properly (refer to them to see how they are related to each other)

**Reduced Elements**
  * Contains the information that will be used to represent each of the reduced node-link diagrams after the dimenionality reduction of the original one

  * It is nessacry to have a copy for each one even if they share the same attributes, because of the changes that happen to them in the visualization stage (such as branch selection, dragging, .. etc)

**Reduction Functions**
  * Are just functions that take care of calling the reduction functions with their proper settings. To reduce the call and avoid mistakes and inconsistency, it is better to keep them this way so that changes the settings occurs only at one place

### get_centroids() Function
A function that gets the data (centers and average grade values) from the HTML file and creates the original non-reduced clusters and graph structure.

**jsonStr** : Not nesscary but added in cases of arrays just in case a browser fails to convert an array into a JSON object directly

### init_reduce() Function
Handles the dimensionality reduction of the original graph structure and creates a new graph for each reduction type.

For the details of how to properly initialize the graph to work with the node-link diagram refer to the example in the top of the script file.

### reconstruct() Function
#### Parameters:
  * *centroids* : An array of the centroids to which the graph will be drawn based on
  * *links* : An array of links that links the centroids
  * *clusters* : An array of the cluster set, is not used in the functionality of the function but is needed for the creation of the node-link diagram
  * *graph* : A reference to the graph that is to be reconstructed. Must be an existing graph
  * *SVG ID* : For the nodelink() function to be given to the created SVG

Given the above parameters the function resets and recalculates the nodes and the links of edges of the graph, then creates a new node-link diagram with the specified ID.

### changeDR() Function
#### Parameters:
  * *algorithm* : The name of the algorithm to which the view should be switched to
  * *reconstruct* : A boolean variable that determines whether the graph should be reconstructed due to changes in the parameters or not

Given the above parameters the function hides every SVG element in the view, the based on the specified '*algorithm*' it will show the SVG element that is associated with it. If the value of '*reconstruct*' was true, the function will call reconstruct() with the corresponding arguments.

**Normalized Array**  
  * Shows how to properly set the array that can be passed to a scatter plot
  * Also two examples on how to initialize a scatter plot are given but commented

### window.resize() Event Handler
Currently does not function, is meant to handle the changes in the sizes of the node-link diagram and scatter plots

**Features Arrays**
  * Hold the data of the features that will be read from the HTML

**Selected Features**
  * Hold the names of the selected features, both indicator and grade

-The rest of the AUTOCOMPLETE section is just some precedure to handle the autocomplete and selection prodecures

## Coloring Section
### Custom Colors Object
An object that has the attributes named after the corresponding color scaling types. Each attribute is an array of palletes, where each pallete is an array of colors.
  * Format { 'scale type 1' : [ ['color 1', 'color 2', ..], [..], .., [..] ], 'scale type 2' : [....] }

### colorscale() Constructor
#### Parameters:
  * *domain* : The minimum and the maximum values that will be scaled to match a color set
  * *color set* : An array of colors that will be used as the range of the scale

#### Functions:
  * *map()* : Maps a value that lies within the domain to and index to a color in the specified color set

**clrScale variable** :  the variable that will server as the global color scale

### init_colorScales() Function
Creates HTML elements (divs, radio buttons, and SVG) that will represent the color scales and pallets. It also creates the events of the radio buttons and handles hiding all the scaling types except for the first one (in that case it is the sequential scaling).

## Events Section
### kmeansUpdate.submit() Event Handler
Sends an AJAX request to the server to recalculate the K-means algorithm with a new number of clusters. Upon success, the it changes the attributes in the HTML element that holds the data of the graph, calls get_centroids() -documented previously- and init_reduce() -documented previously- to recalculate the whole thing

### switch_opts_algos(), switch_opts_red(), switch_clr_scales() Functions
Are used to show and hide certain elements based on their specified targets (called through the proper event handlers in the HTML file)

### window.load() Event Handler
Handles the opertains that should be executed once the page has been loaded

### btn_plot.click() Event Handler
Sends a request to the server to calculate a projection of data onto a branch. Upon success, the data will be displayed on a scatter plot based on the selected scatter plot.  
**params** : refer to the scatter script documentation  
**axis data** : refer to the example of how to intialize a scatter plot to know the format of the axis data

#### Note: changing the ID's of the divs in the HTML will require changing them accordingly in this function

### visual-params-lable.click() Event Handler
Only handles showing and hiding the Visual Parameters div

## Bugs & Errors
1- There is a bug in the server, it can only project the data for 'dataInit01' and 'dataInit02' indicator features, but not with the others.
