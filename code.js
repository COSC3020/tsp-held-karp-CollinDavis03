function tsp_hk(distance_matrix) {
    const numCities = distance_matrix.length; //num Cities = n  
    if (numCities <= 1) return 0; //Case for 0 or 1
    
    const memo = new Map();

    //Helper function to find shortest distance with Help-Karp
    //FST = Find Shortest Tour
    function FST(unvisitedCities, currentCity) { 
        const citiesKey = `${unvisitedCities}-${currentCity}`;

        //Check if sub has been solved
        if (memo.has(citiesKey)) {
            return memo.get(citiesKey);
        }

        //Base case: If all cities have been visited. return distance to last.
        if (unvisitedCities === (1 << numCities) - 1) { 
            return distance_matrix[currentCity][numCities - 1] || 0;  
        } 

        let minCost = Infinity; 

        //Recursive case: explore next cities
        for (let nextCity = 0; nextCity < numCities; nextCity++) { 
            //If city hace not been visited
            if (!(unvisitedCities & (1 << nextCity))) {
                const remainingCities = unvisitedCities | (1 << nextCity); 
                const cost = distance_matrix[currentCity][nextCity] + FST(remainingCities, nextCity); 
                minCost = Math.min(minCost, cost);
            }
        }

        //Store the result
        memo.set(citiesKey, minCost);
        return minCost; 
    }

    return FST(1, 0); 
}
