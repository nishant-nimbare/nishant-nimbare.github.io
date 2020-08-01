---
title: "Java Quick Reference"
categories:
  - Reference
tags:
  - Reference
  - java
---



[polymorphism](https://www.geeksforgeeks.org/polymorphism-in-java/)

### interfaces

Used for multiple inhertance in java

Note: Interface can hold constants but is not recommended. If a subclass implements two interfaces with conflicting constants, the compiler will flag out a compilation error.

>What it means basically that in Object Oriented world there are things unrelated but they CAN come under same umbrella based on their behavior and property.
>
>Interface works as an umbrella for those unrelated things.
>
>Let us say there is a Fruit Class, it can have many child classes like Mango, Pear, Watermelon etc.
>
>Now there is Pizza class, there could be many kinds of Pizza.
>
>Now is Pizza anyway related to Fruit? Not really fruit are grown on trees, pizzas are magically prepared. Fruits have seed, pizzas have toppings, crusts etc.
>
>Basically there is no similarity and they are unrelated.
>
>But think if there is are Employee who have been provided Tiffin, now Tiffin can be someday pizza, other day Fruits, Let’s say some day you get Rice and Curry.
>
>Now if you have a Tiffin class, how would you put all these stuff which are different but behave similar on some level.
>
>Let’s create an Interface Eatable, now Fruit is Eatable, Pizza is also Eatable, Rice is also Eatable and Curry is also Eatable.
>
>So I can say my Tiffin consists of List of Eatables.

[sauce](https://www.quora.com/What-is-the-need-of-interface-in-Java)
,[ more sauce](https://stackoverflow.com/questions/3528420/why-do-we-need-interfaces-in-java)

### immutable
Immutable class means that once an object is created, we cannot change its content. In Java, all the wrapper classes (like Integer, Boolean, Byte, Short) and String class is immutable. We can create our own immutable class as well.

Following are the requirements:
- The class must be declared as final (So that child classes can’t be created)
- Data members in the class must be declared as final (So that we can’t change the value of it after object creation)
- Getter method for all the variables in it
- No setters(To not have the option to change the value of the instance variable)

https://dzone.com/articles/how-to-create-an-immutable-class-in-java


