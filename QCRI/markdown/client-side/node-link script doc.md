# Nodelink Script Documentation

### Note: To make it easier for the maintainer to debug any bug that happens with selecting a branch later on, the '*console.log()*' calls were not removed.

### node_default_opts Object
Holds the default options that are to be used in the '*nodelink()*' to customize the attributes of the elements

 * sizeScale() Function : scales the size passed to it according to its ratio from '*minSize*' to '*maxSize*' attributes

 * color_func() Function : maps a certain attribute of a node to a color based on the value of '*colorScale*'. It is there for a default setting, but is not the one the actual one being used, it works if the colors of the nodes were not set manually

 * radius_func() Function : based on the size of the node (the number of elements its cluster contains), the function gives that node a propr radius to represent it. In fact it maps the area to work better with big numbers but the equation is rearranged to give the radius

### clear_selection() Function
resets the selection array of a graph, and resets the elements in an SVG to their normal settings (resets the visual representation of a selected branch)

## Nodelink Structure
#### Parameters:
  * graph : The graph which has the nodes and the edges to be visualized
  * clusters : An array of the clusters that correspond to the nodes of the graph
  * element ID : The array of the div where the SVG will be added
  * SVG ID : The ID of the SVG that will be created
  * opts (options) : A set of options that define the settings of the nodes (has to be in the same format as '*node_default_opts*')
  * force : A boolean value that determines whether the diagram will rely on the default force-directed placement of the nodes (true) or the positions will be the same as the ones given by a dimensionality reduction algorithm

#### Settings:
  * change_mode() : switches between the 'select' mode and the 'drag' mode
  * change_scale() : swicthes between radius scaling modes. If 'true', it applies the '*radius_fuc()*' of the given '*options*'
  * set_threshold() : filters the displayed edges based on the weight of that edge in '*graph*'
  * set_colors() : maps the value of a grade feature of each cluster into a color for the node that represents it

#### Nodes & Labels
Note that the labels are drawn above the nodes, so that every label is above every other node. This makes it easier for the user to determine whether a node is covering a smaller one behind it or not, if that is not needed then they should be combined into one group ('g' element) to make manipulating them easier.

### node_click() Event Handler
Handles selecting the nodes when the SVG has the attribute '*mode*' set to 'select'. Does not just do the selection visually, it calls the given graph to find a selection, then based on the result from the call of the function it selects the points.  
It uses '*safeBranch()*' to find the branch between two points, previously it used '*branch()*' then when it fails it also checks '*inverseBranch()*' to find another way. After utilizing '*safeBranch()*' the other case should not be included, unless the graph was mean to be directed.

### node_drag() Behavior & Its Functions
refer to [D3 Drag Behavior](https://github.com/mbostock/d3/wiki/Drag-Behavior) for detailed documentation of how it works

### force_start() Event Handler
The handler is only called once, that is when D3 starts to draw the elements. At that stage D3 assigns values to the positions of the nodes (d.{x, y}) and their links (d.{source, target}.{x,  y}). In the case of force-directed graph ('*force*' is set to be true), the handler does not forcefully set the value for D3, it leaves the value D3 assigned the way it is.
In the case of not wanting a force-directed graph, the handler calls '*force.stop()*', since there is no point in recalculating the positions again. However, with the force-directed graph, it lets D3 continue its caluclations.

### force_tick() Event Handler
A normal classic tick handler, it just repositions the nodes, edges, and labels based on their location if it was changed from the previous one.

### force_end() Event Handler
Pretty much the same as the '*force_tick()*' handler, but is to be called when either D3 stops changing the position of the points, or when the '*force.stop()*' function is called.

### zoom Behavior
Refer to [SVG Geometric Zooming Example](http://bl.ocks.org/mbostock/3680999)


## Bugs & Errors :
1- After zooming, the nodes are both scaled and shifted based on the focal points. However, the tooltip does not go with that, therefore after scaling the position of the tooltip will not be the same as the hovered node.  
Failed attempt: using '*d3.mouse(this)*' inside the event handler for '*hovered*' event did not work.
Suggested action: remove the focal point and always zoom into one certain point, in this case it is fairly to locate the new position of the node.

2- Sometimes after doing some work with the large scatter plots, the node-link SVG disappears either partially or entirely. The causes of the bug are unknown, and attempts to reporoduce it intentionally to find a scenario where this bug occurs failed.

## Suggestions :
1- Instead of going through the hassle of trying to locate the hovered node and position the tooltip accordingly, it might be a good idea to have a small box in one of the corners, it serves as a tooltip but it doesn't move based on the node's position. The box might be draggable as well to make it more convenient to the user.
