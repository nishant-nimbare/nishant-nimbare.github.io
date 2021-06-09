---
title: "SE Reference"
last_modified_at: 2021-06-08T11:00:00
categories:
  - Reference
tags:
  - Reference
  - se
---

- TOC
{:toc}

## Cohesion
Signifies the togetherness of components of module. high cohesion is good, it makes modules reusable and readable.

_**low cohesion**_
```java
class calculator{
  input();
  add();
  multiply();
  display();
}
```


_**high cohesion**_
```java
class calculator{
  add();
  multiply();
}

class display{
  input();
  display();
}
```


## Coupling
Signifies dependency of module on other modules. Low coupling is good. 

https://www.youtube.com/watch?v=-XJk27254KA

# Cyclomatic Complexity
Used to measure complexity of program, calculated with a help of control flow diagram.

```
Cyclomatic complexity = E - N + 2*P 
where,
  E = number of edges in the flow graph.
  N = number of nodes in the flow graph.
  P = number of nodes that have exit points
```
Lower the Program's cyclomatic complexity, lower the risk to modify and easier to understand

[sauce](https://www.tutorialspoint.com/software_testing_dictionary/cyclomatic_complexity.htm)


# SOLID 

## Single Responsibility 
Every class should only have a single responsibility. e.g calculator class in low cohesion example has 2 responsibilities - calculating stuff and displaying results.

## Open Close 
Classes should be open for extension but closed for modification. We should avoid  changing an old class.

## Liskov's Substitution Principle
Instances of any subtype of a parent type, should be replacable / substitutable with instance of parent type not just syntactically but also semantically (logically) . 

e.g if there's a class fish and its child class star-fish.
fish class has a method swim. but star fish doesn't swim. so this voilates Liskov's principle.    

## Interface Segregation
Interface should not be bulky. class should not implement interfaces that consists of methods they(classes)  don't need.
Common methods should be seperated in a root interface and other interfaces should extend this root interface.

## Dependency Inversion 
High lvl modules should not depend on low level modules . rather both should depend on abstraction (interfaces). this reduces coupling.