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





## Static
Static can be applied to: blocks, variables, methods, nested classes

When a member is declared static, it can be accessed before any objects of its class are created, and without reference to any object

A single copy of variable is created and shared among all objects at class level.

If you need to do computation in order to initialize your static variables, you can declare a static block that gets executed exactly once, when the class is first loaded
``` java
// static variable 
  static int a = 10; 
  static int b; 
    
  // static block 
  static { 
      System.out.println("Static block initialized."); 
      b = a * 4; 
  } 
```

Methods declared as static have several restrictions:
- They can only directly call other static methods.
- They can only directly access static data.
- They cannot refer to this or super in any way

## Upcast / Downcast
- Upcasting: Upcasting is the typecasting of a child object to a parent object. Upcasting can be done implicitly. Upcasting gives us the flexibility to access the parent class members but it is not possible to access all the child class members using this feature. Instead of all the members, we can access some specified members of the child class. For instance, we can access the overridden methods.
- Downcasting: Similarly, downcasting means the typecasting of a parent object to a child object. Downcasting cannot be implicitly.

downcasting is only happen when the instance actually contains a type of child ( it may have been referenced by parent variable)
```java
Object o = getSomeObject(),
String s = (String) o; // this is allowed because o could reference a String
```
if it fails at runtime a ClassCastException is thrown

[more on downcasting](https://stackoverflow.com/a/380828/12613203)



## == vs Equals
== operators for reference comparison (address comparison) and .equals() method for content comparison
- .equals(...) will only compare what it is written to compare, no more, no less.
- If a class does not override the equals method, then it defaults to the equals(Object o) method of the closest parent class that has overridden this method.
- If no parent classes have provided an override, then it defaults to the method from the ultimate parent class, Object, and so you're left with the Object#equals(Object o) method. Per the Object API this is the same as ==; that is, it returns true if and only if both variables refer to the same object, if their references are one and the same. Thus you will be testing for object equality and not functional equality.
- Always remember to override hashCode if you override equals so as not to "break the contract". As per the API, the result returned from the hashCode() method for two objects must be the same if their equals methods show that they are equivalent. The converse is not necessarily true.

[sauce](https://www.geeksforgeeks.org/difference-equals-method-java/), [more sauce](https://stackoverflow.com/questions/7520432/what-is-the-difference-between-and-equals-in-java), [more on hashcode](https://www.geeksforgeeks.org/override-equalsobject-hashcode-method/)

## Strings and String pool
Strings in java are immutable. i.e changing any string actually creates a new instance of string (and then the variable points to that instance)

When we declare a string, an object of type String is created in the stack, while an instance with the value of the string is created in the heap. On standard assignment of a value to a string variable, the variable is allocated stack, while the value is stored in the heap in the string constant pool
``` java
String str1 = "Hello";
String str2 = "Hello";
```



The ‘new’ keyword forces a new instance to always be created regardless of whether the same value was used previously or not. Using ‘new’ forces the instance to be created in the heap outside the string constant pool 
```java
String str1 = new String("John");
String str2 = new String("Doe");
```

|![str_pool](/assets/images/str_pool.png) | ![str_new](/assets/images/str_new_alloc.png) |
|:---------------------------------------:|:--------------------------------------------:|
| direct assignment			  |  With new					 |

[more](https://stackoverflow.com/a/36424446/12613203)

### StringBuilder / StringBuffer
They are mutable unlike strings

StringBuffer is similar to StringBuilder except one difference that StringBuffer is thread safe, i.e., multiple threads can use it without any issue. The thread safety brings a penalty of performance.


## Immutable
Immutable class means that once an object is created, we cannot change its content. In Java, all the wrapper classes (like Integer, Boolean, Byte, Short) and String class is immutable. We can create our own immutable class as well.

Following are the requirements:
- The class must be declared as final (So that child classes can’t be created)
- Data members in the class must be declared as final (So that we can’t change the value of it after object creation)
- Getter method for all the variables in it
- No setters(To not have the option to change the value of the instance variable)

https://dzone.com/articles/how-to-create-an-immutable-class-in-java


## AutoBoxing / UnBoxing
__Autoboxing__ : Converting a primitive value into an object of the corresponding wrapper class is called autoboxing.
Applies when,
- Passed as a parameter to a method that expects an object of the corresponding wrapper class.
- Assigned to a variable of the corresponding wrapper class.

__Unboxing__ : Converting an object of a wrapper type to its corresponding primitive value is called unboxing.
Applies when,
- Passed as a parameter to a method that expects a value of the corresponding primitive type.
- Assigned to a variable of the corresponding primitive type.

[great ans here](https://stackoverflow.com/a/29139595/12613203)

## Exceptions
- An __exception__ is an unwanted or unexpected event, which occurs during the execution of a program i.e at run time, that disrupts the normal flow of the program’s instructions.
- Error: An Error indicates serious problem that a reasonable application should not try to catch.

![exceptions](/assets/images/Exception-in-java.png)

1. __Checked__: are the exceptions that are checked at compile time. If some code within a method throws a checked exception, then the method must either handle the exception or it must specify the exception using throws keyword. (for custom unchecked expection extend the Exception class.)

2. __Unchecked__ : are the exceptions that are not checked at compiled time. e.g. NullPointerException, IllegalArgumentException, IllegalStateException. (for custom unchecked expection you need to extend the RuntimeException class)


- The __Throw__ keyword in Java is used to explicitly throw an exception from a method or any block of code. We can throw either checked or unchecked exception. The throw keyword is mainly used to throw custom exceptions.
- __Throws__ is a keyword in Java which is used in the signature of method to indicate that this method might throw one of the listed type exceptions. The caller to these methods has to handle the exception using a try-catch block.
`type method_name(parameters) throws exception_list`

 To display the message override the toString() method in custom exception.


>When Overridding Methods, the new  method cannot throw (throws) a broader/new Exception other than the old (overridden) method apart from unchecked exceptions 


### Assertions
An assertion allows testing the correctness of any assumptions that have been made in the program.
Assertion is achieved using the assert statement in Java. While executing assertion, it is believed to be true. If it fails, JVM throws an error named AssertionError. It is mainly used for testing purposes during development.
The assert statement is used with a Boolean expression and can be written in two different ways.
``` java
assert expression;
assert expression1 : expression2;
```
By default, assertions are disabled. We need to run the code as given.
```
java –ea Test
java –enableassertions Test
```
Here, Test is the file name.

## Threads
Threads can be created by using two mechanisms :
1. Extending the Thread class
2. Implementing the Runnable Interface

```java
class MultithreadingDemo1 extends Thread { 
	public void run() { 
    // thread code
	} 
} 

class MultithreadingDemo2 implements Runnable { 
    public void run() { 
      // thread code 
    } 
} 

// Main Class 
public class Multithread 
{ 
	public static void main(String[] args) 
	{ 

    MultithreadingDemo1 threadObject = new MultithreadingDemo1(); 
    threadObject.start(); // starts run 

    Thread runnableObject = new Thread(new MultithreadingDemo2()); 
    runnableObject.start(); // starts run
		 
	} 
} 

```

Thread.currentThread() gives reference to current threads 

- getId()
- getPrority()
- setPrority (1 .... 10) [ 1 = min , 10=max ] 
- yeild()   //give importance to other threads
- sleep ( milliseconds, nanoseconds)
- join ( milliseconds )             // wait for (atmost ms) this thread to end
- isAlive() //bool

[about main thread](https://www.geeksforgeeks.org/main-thread-java/)

ExecutorService is used to create a thread pool and execute tasks. It uses a blocking queue internally.
```java 
ExecutorService service = new ExecutorService( /*number of actual threads */ 10 );

service.execute( /*runnable */);

```

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

Note that it's entirely possible that an object never gets garbage collected (and thus finalize is never called). This can happen when the object never becomes eligible for gc (because it's reachable through the entire lifetime of the JVM) or when no garbage collection actually runs between the time the object become eligible and the time the JVM stops running (this often occurs with simple test programs) [more](https://stackoverflow.com/a/171961/12613203)


## Syntax

#### arrays
``` java
int myNum[] = {10, 20, 30, 40};
int intArray[] = new int[20];
myNum.length
```

#### List
``` java
List<Integer> l1  = new ArrayList<Integer>(); 

l1.add(0, 1);       // Adds 1 at 0 index 
l1.addAll(1, l2);   //add list l2 from 1 index   
l1.remove(1);       // Removes element from index 1 
.set(1, "For");  //changing elems
.get(i)


```

#### HashMap
```java
Map<Integer, String> hm1 = new HashMap<>();
hm1.put(1, "Geeks"); 
hm1.remove(new Integer(4)); 

.containsKey()
.containsvalue()
.clear()


//iterating
for (Map.Entry mapElement : hm1.entrySet()) {

    int key  = (int)mapElement.getKey();  
    String value = (String)mapElement.getValue(); 

} 
```

