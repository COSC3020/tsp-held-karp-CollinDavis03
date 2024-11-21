# Traveling Salesperson Problem -- Held-Karp Algorithm

This exercise is about the Traveling Salesperson Problem I mentioned in the
lecture on NP-hard problems -- given a set of cities, determine the length of
the shortest tour that visits all of them. We can get from any city to any other
city, i.e. the graph of cities is completely connected. We consider the version
of the Traveling Salesperson Problem that finds the shortest tour to visit $n$
cities, starting at a city and ending at the $n$ th city; it *does not* go
back to the start. The start city may be any of the cities. Remember that the
graph for a TSP is undirected, i.e. the cost is the same in either direction.

The Held-Karp algorithm for solving the Traveling Salesperson Problem is a
recursive algorithm that considers every subset of cities and finds shortest
tours within them. It takes advantage of the fact that every subroute of a route
of minimum length is of minimum length itself. The main idea is that to solve
the problem of finding the shortest route for $n$ cities, we first solve the
problem of finding the shortest route for $n-1$ cities, and then find the
shortest route from the $n-1$st city to the $n$th city. The pseudocode for the
algorithm is as follows:

```javascript
// cities is the set of cities not visited so far, including start
heldKarp(cities, start)
  if |cities| == 2
    return length of tour that starts at start, goes directly to other city in cities
  else
    return the minimum of
      for each city in cities, unless the city is start
        // reduce the set of cities that are unvisited by one  (the old start), set the new start, add on the distance from old start to new start
        heldKarp(cities - start, city) + distance from start to city
```

Implement a dynamic programming version (which could use memoization) of the
Held-Karp algorithm. If you use memoization, make sure that the cache is reset
every time the function is called such that multiple calls do not end up using
old and incorrect values. Start with the template I provided in `code.js`.

The function takes a distance matrix (the adjacency matrix for the graph where
the values in the cells are the distances between the corresponding cities) and
returns the length of the shortest tour (not the tour itself).

Test your new function; I've provided some basic testing code in `code.test.js`.

## Runtime Analysis

What is the worst-case asymptotic time complexity of your implementation? What
is the worst-case asymptotic memory complexity? Add your answer, including your
reasoning, to this markdown file.

## Answer
Looking back at my code. Using this piece of code for the explanation. 

```javascript
for (let nextCity = 0; nextCity < numCities; nextCity++) { 
    if (!(unvisitedCities & (1 << nextCity))) {
        const remainingCities = unvisitedCities | (1 << nextCity); 
        const cost = distance_matrix[currentCity][nextCity] + FST(remainingCities, nextCity); 
        minCost = Math.min(minCost, cost);
    }
}
```

We have the state representation. Which are the unvisitedCities and the currentCity. With the unvisitedCities, you will get $2^{n}$ possible subsets where n will represent the number of cities. Then you will have subsets of the cities which will give you n for the possible cities from currentCity. Number of States will be ($2^{n}$ * n) 

With the recursive call, the nextCity will give up to n values. The reason is because it is from the state iterating over the nextCity. 

Combining the two will give you $O(2^{n} * n * n)$. This will reduce down too $O(2^{n} * n^{2})$ as the worst-case runtime.


## Sources 
I looked at tlaceby repo after I wrote all my code because my return values were passing all the tests except for the 13-value one. I had to return FST(1, 0) at the end of my code because I had messed up the MTL function and needed to change it a bit before I finalized it. I had to change the names I was calling. I had unvisistedCity in there instead of startCity. Once I changed that after looking at tlaceby repo and realized that I had the wrong variable in there, I changed the return value to MTL it passed the test. I did not borrow any code from this repo. I looked over the repo and studied how all the functions and variables interacted.  

## Plagarism Statement
“I certify that I have listed all sources used to complete this exercise, including the use of any Large Language Models. All of the work is my own, except where stated otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is suspected, charges may be filed against me without prior notice.”
