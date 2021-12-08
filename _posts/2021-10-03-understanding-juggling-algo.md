---
title: "Understanding juggling Algorithm"
categories:
  - Algorithm
tags:
  - algo, cp, arrays, juggling_algo
toc: true
---

The juggling algorithm is one of the solutions to array rotation problem, given below

> given an array of integers, nums and a integer, k rotate the given array by k places <br>
> e.g nums : [1,2,3,4,5] & k = 2 <br>
>    ans [4,5,1,2,3]

the juggling algorithm that solves this is given as below

```java
   void jugglingAlgo(int arr[], int d)
    {
        int n = arr.length;
        /* To handle if d >= n */
        d = d % n;
        int i, j, k, temp;
        int g_c_d = gcd(d, n);
        for (i = 0; i < g_c_d; i++) {
            temp = arr[i];
            j = i;
            while (true) {
                k = (j + d)%n;
                if (k == i)
                    break;
                arr[j] = arr[k];
                j = k;
            }
            arr[j] = temp;
        }
    }
```

the 1st question that pops up in the mind on seeing this is : __why is there a gcd in array rotation problem?__

## Naive solution
A simple solution is to rotate the array 1 position at a time
> [1,2,3,4,5] --> [5,1,2,3,4] -->[4,5,1,2,3]

a much better way would be to move the numbers directly to there final position.

## Let's juggle

Imagine this like playing a game

- consider the integers as pool balls with numbers on them, place on there locations ( array positions ).
- you can pick up a ball &  put the ball only on one of the locations
- you can only have 1 ball in your hand at any moment

![juggling1](assets/images/juggling algo 1.svg)

so one would start moving the balls like this
![juggling1](assets/images/juggling algo 2.svg)
..

and similarly others
![juggling1](assets/images/juggling algo 2.svg)

here we observe 2 things 
- once we pick up a ball, we keep on rotating/replacing the balls to there final positions until we don't have any ball in hand
- if we don't have any ball in hand, and the array is not rotated completely, we pick up the ball next to ball that we started with in the last iteration.

In the algorithm code that we saw above, __the inner loop represents our 1st observation & the outer loop represents our 2nd observation__.

## Why gcd why

to understand how gcd come's into play we need to see how exact the inner loop works

For a moment instead of considering the array as circular, imagine the array as infinity long with array elements repeated
