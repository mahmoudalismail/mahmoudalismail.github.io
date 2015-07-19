# Graph Script Documentation

### Note: To make it easier for the maintainer to debug any bug that happens with selecting a branch later on, the '*console.log()*' calls were not removed.

**Vector3 & Vector2**
  * Plain vector definitions, nothing fancy in them

**Cluster**
  * Represents a cluster sent from the server
  * The data is a reference to the array of the points which the cluster contains
  * The centroid is the value of the center of the cluster, should be an array of any length (N-dimensions)
  * The grade values is an object representing the grade values of this cluster for each grade feature

**Node**
  * Refers to a cluster, but is the one used in the graph structure

**Weighted Edge**
  * Represents an edge between two nodes (or clusters)
  * Is directed in structure (with respect to the naming of source & target), but the connection can be reversed anytime
  * Has the weight, and holds the distance between the two nodes in their original n-dimensional space

## Graph Structure

**Nodes & Edges** : Array of nodes and edges for the graph (refer to their documentation for more information).

**Selection** : An array of the indices of the selected nodes in the graph, represent a selected branch.

**Threshold** : The value that will be used to filter out some edges; if their weight is less than the threshold they will not be considered edges.

**N-L Map** : The node-link map, used as a lookup table for the connected edges.
  * Is some sort of a hashmap to make retrieving data faster
  * JavaScript does not have an implementation of a hashmap, but its objects can serve as hashmaps due to their structure and the way they operate
  * Is formatted as follows { node key : [ [ [the index of a child, the weight of the edge], ... ], [ [the index of a parent, the weight of the edge], ... ] ], node key : ... }

### addNode() Function
Given a node, the function assigns a new index to it which is its index in the '*nodes*' array. Then it creates a new key in the '*nlMap*' which is going to be the index of that node.

### addEdge() Function
Adds the edge passed as an argument. Adds the target as a child of the source in '*nlMap*', and vise versa.

### findChildren() Function
Gets the list of children of a certain node from '*nlMap*'  given its index. Then the children are filtered after the weights of their edges are tested against the threshold, leaving only the ones that are greater than or equal to the threshold value.

### findParents() Function
The same as '*findChildren()*' but works in the other direction.

### findEdge() Function()
Loops through the array of edges to find an edge between that node having the index of '*_source_index*' and the one having the index of '*_target_index*'. The indices are interchangable, it does not matter in which order they are passed. Should use '*nlMap*' instead of '*edges*' array.

**Visited** : An array of the previously visited nodes. It was made to avoid infinite loops that happen because of revisiting the same nodes multiple times.

### Note: The '*visited*' array must be reset after each call for any of the branch functions, but not inside the functions. Finding branchs is recursive, it can be defined and reset inside the functions but that will require some changes to them, having the list outside the function and reseting it independently is more convenient and safer.

### All Branch Functions (differences explained below)
#### Parameters:
  * *source index* : The index of the node from which the function should start searching
  * *target index* : The index of the node which the function should stop when reached

Given the source and the target, the function tries to find a set of nodes that link those two nodex. The functions use breadth-first search to find the nodes that make the branch. The functions were implemented first as depth-first but then BFS was found to be more approperiate, therefore, the implementation is not a good BFS but rather a DFS with one step before it.

### safeBranch() Function
Puts the children and the parents in one array and branches based on that (direction does not matter)

### branch() Function
Gets only the list of children (goes in one direction where the target is a child or a grandchild of the source)

### inverseBranch() Function
Gets only the list of parents (goes in one direction where the target is a parent or a grandparent of the source)

#### Examples :
Find the branch between A(source) and E(target)
  * A -> B -> C -> D -> E : '*branch()*' finds its way as it scans the children and E is a grandchild of A and can be reached by going in one direction. '*inverseBranch()*' will fail to find a path between A and E in this case
  * A <- B <- C <- D <- E : '*branch()*' will fail to find a path since E cannot be reached by a series of children from A. However, '*inverseBranch()*' will work fine
  * A -> B -> C <- D <- E : both '*branch()*' and '*inverseBranch()*'will fail in this case since the connection between A and E does not go in one direction.  

'*safeBranch()*' works for all of the three cases.
