---
title: "Java Quick Reference"
categories:
  - Reference
tags:
  - Reference
  - java
---

## Encapsulation
In normal terms Encapsulation is defined as wrapping up of data and information under a single unit. In Object Oriented Programming, Encapsulation is defined as binding together the data and the functions that manipulates them.

## Abstraction
Data Abstraction is the property by virtue of which only the essential details are displayed to the user and we hide complexity. The trivial or the non-essentials units are not displayed to the user. Ex: A car is viewed as a car rather than its individual components.

> Consider a real-life example of a man driving a car. The man only knows that pressing the accelerators will increase the speed of car or applying brakes will stop the car but he does not know about how on pressing the accelerator the speed is actually increasing, he does not know about the inner mechanism of the car or the implementation of accelerator, brakes etc in the car. This is what abstraction is.


[polymorphism](https://www.geeksforgeeks.org/polymorphism-in-java/)

## Interfaces

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

## Immutable
Immutable class means that once an object is created, we cannot change its content. In Java, all the wrapper classes (like Integer, Boolean, Byte, Short) and String class is immutable. We can create our own immutable class as well.

Following are the requirements:
- The class must be declared as final (So that child classes can’t be created)
- Data members in the class must be declared as final (So that we can’t change the value of it after object creation)
- Getter method for all the variables in it
- No setters(To not have the option to change the value of the instance variable)

https://dzone.com/articles/how-to-create-an-immutable-class-in-java


## Garbage Collection
When JVM starts up, it creates a heap area which is known as runtime data area. This is where all the objects (instances of class) are stored. Since this area is limited, it is required to manage this area efficiently by removing the objects that are no longer in use. The process of removing unused objects from heap memory is known as Garbage collection and this is a part of memory management in Java.

Languages like C/C++ don’t support automatic garbage collection, however in java, the garbage collection is automatic.

Garbage collection is done when
1. when the object is no longer reachable
```java
BeginnersBook obj = new BeginnersBook();  
obj = null;
```
reference obj was pointing to the object of class BeginnersBook but since we have assigned a null value to it, this is no longer pointing to that object

2. When one reference is copied to another reference
```java
BeginnersBook obj1 = new BeginnersBook();
BeginnersBook obj2 = new BeginnersBook();
obj2 = obj1;
```
the instance (object) pointed by (referenced by) obj2 is not reachable


3. By anonymous object: 
``` java
 new Employee(); 
```

_you can request to JVM for garbage collection by calling System.gc() method_


#### finalize Method

It is a method that the Garbage Collector always calls just before the deletion/destroying the object which is eligible for Garbage Collection, so as to perform clean-up activity. Clean-up activity means closing the resources associated with that object like Database Connection, Network Connection or we can say resource de-allocation

Since Object class contains the finalize method hence finalize method is available for every java class since Object is the superclass of all java classes. Since it is available for every java class hence Garbage Collector can call finalize method on any java object

``` java
public class JavaExample{   
   public static void main(String args[]){  
        /* Here we are intentionally assigning a null 
         * value to a reference so that the object becomes
         * non reachable
         */
	JavaExample obj=new JavaExample();  
	obj=null;  
		
        /* Here we are intentionally assigning reference a 
         * to the another reference b to make the object referenced
         * by b unusable.
         */
	JavaExample a = new JavaExample();
	JavaExample b = new JavaExample();
	b = a;
	System.gc();  
   }  
   protected void finalize() throws Throwable //will be called twice
   {
        System.out.println("Garbage collection is performed by JVM");
   }
}
```