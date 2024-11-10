function tsp_hk(distance_matrix) {
    const numCities = distance_matrix.length; //num Cities = n
    const memo = new Map();

    //Helper function to find shortest distance with Help-Karp
    //FST = Find Shortest Tour
    function FST(unvisitedCities, currentCity) { 
        const citiesKey = unvisitedCities.String();

        //Check if sub has been solved
        if (memo.has(citiesKey)) {
            return memo.get(citiesKey);
        }

        //Base case: if only two cities return
        if (unvisitedCities.length === 2) { 
            const nextCity = unvisitedCities.find(city => city !== currentCity); 
            return distance_martix[currentCity][nextCity]; 
        } 

        let minCost = Infinity; 

        //Recursive case: find the minimum tour cost
        for (const nextCity of unvisitedCities) { 
            if (nextCity !== currentCity) {
                const remainingCities = unvisitedCities.filter(city => city !== currentCity); 
                const cost = FST(remainingCities, nextCity) + distance_matrix[currentCity][nextCity]; 
                minCost = Math.min(minCost, cost);
            }
        }

        //Store the result
        memo.set(citiesKey, minCost);
        return minCost; 
    }

    // Initilize the memorization code
    memo.clear(); 

    // Find the shortest path starting from each City. 
    //MTL = minimum Tour Length
    let MTL = Infinity;
    for (let startCity = 0; startCity < numCities; startCity++) { 
        const allCities = Array.from({ length: numCities }, (_, i) => i); // All Cities
        MTL = Math.min(MTL, FST(allCities, startCity));
    }
    
    return MTL;
}
