# Kmeans API Documentation

###Import
To use the Kmeans algorithm, first import the module by ```var Kmeans = require('file-path-of-kmeans.js');```

###Usage
The algorithm can be used in this way, `var results = Kmeans.kmeans(data, K, dim);`

The parameters are the following: 

- `data` = points/data to be processed
- `K` = number of prototypes
- `dim` = dimention of the data

`kmeans` returns a Javascript object with the following:

```Javascript
    Kmeans.kmeans(data, K, dim) = { "centers": [c1, c2,...,ck],
                "clusters": [ [pi, pi+1,...],...,[pi+4, pi+n,...] ],
                "dist2Clusters": [ [{cIndex: 1, dis: distance},...,{cIndex: k, dis: distance}],...]
               };
```

* `centers` = The coordinates of the centers of the clusters/prototypes
* `clusters` = 2D array containing the points closest to each cluster (which points belong to which cluster)
* `dist2Clusters` = 2D array containing the distances between each point and all clusters
