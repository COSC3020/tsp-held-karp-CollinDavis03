function tsp_hk(distance_matrix) {
    const numCities = distance_matrix.length; //num Cities = n  
    if (numCities <= 1) return 0; //Case for 0 or 1
    
    const memo = new Map();

    //Helper function to find shortest distance with Help-Karp
    //FST = Find Shortest Tour  
    //'visitedCities' is used as a bitmask where it shows if it is visited (1) or not visited (0)
    //'currentCity' is the current city that is being processed
    function FST(visitedCities, currentCity) { 
        const citiesKey = `${visitedCities}-${currentCity}`; // Key to store the subset result 

        //Check if subset has been solved
        if (memo.has(citiesKey)) {
            return memo.get(citiesKey);
        }

        //Base case: If all cities have been visited. return distance to last.
        //'visitedCities === (1 << numCities) - 1' means all bits are set (all cities have been visited) 
        if (visitedCities === (1 << numCities) - 1) { 
            return distance_matrix[currentCity][numCities - 1] || 0; // return 0 if no connection exists
        } 

        let minCost = Infinity; 

        //Recursive case: explore next cities
        for (let nextCity = 0; nextCity < numCities; nextCity++) { 
            //If city has not been visited
            if (!(visitedCities & (1 << nextCity))) {
                //Add 'nextCity' to the visited set by setting it with a corresponding bit. 
                const remainingCities = visitedCities | (1 << nextCity); 
                //Will calculate the cost of the visiting 'nextCity' and continue the search 
                const cost = distance_matrix[currentCity][nextCity] + FST(remainingCities, nextCity); 
                minCost = Math.min(minCost, cost);
            }
        }

        //Store the result in the memoization table. 
        memo.set(citiesKey, minCost);
        return minCost; 
    }

    //MTL = Minimum Tour Length
    let MTL = Infinity; 
    //Calculate the minimum tour length
    for (let startCity = 0; startCity < numCities; startCity++) {
        //Start with only 'startCity' visited (bitmask '1 << startCity') 
        MTL = Math.min(MTL, FST(1 << startCity, startCity)); 
    }

    return MTL; 
}
