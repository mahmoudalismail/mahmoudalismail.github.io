# Scatter Script Documentation

### regression_params() Function
Calculates the slope (*m*) and the y-intercept (*b*) of the regression line equation for a set of points.

### regression_points() Function
Gets the parameters of the line by calling '*regression_params()*', then it calculates the starting and ending points of the regression line.  
The first point lies at *x = 0*, and by substituting in the line equation *y = b*. The other points is at '*x = _xLim*', while 'y = (m * _xLim) + b'.  

### merge_points() Function
As each point lies on a certain edge between two nodes, each point has its location relative to those two nodes. in order to deal with them, each point must be given a location relative to the starting and ending nodes only.
For more information about the parameter '*t*' that is being used to calculate the new location refer to the documentation of "Dataview data" for '*branch_axis()*' Function.

### scatter() Function
Plain D3 procedures, documentation embedded within the code.
