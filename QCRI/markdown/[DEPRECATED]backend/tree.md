# Tree API Documentation

This file documents the tree generation API. 
###Import
To use the tree generation algorithm, first import the module by ```var Tree = require('file-path-of-tree.js');```

###Usage
The algorithm can be used in this way, `var results = Tree.genTree(distances, numK);`

The parameters are the following: 

- `distances` = 2D array containing the distances between each point and all the clusters  
- `numK` = number of prototypes

`genTree` returns an array with the following: 
```Javascript
    Tree.genTree(distances, numK) = [   {w: q1, n: [4,5]},
                                        {w: q2, n: [1,2]},
                                        ...
    ];
```
The function `genTree` will return an array edges, each edge will have the weight, `w`, and which two nodes it connects, `n`. 
