---
title: "C++ Quick Reference"
categories:
  - Reference
tags:
  - Reference
  - c++
---


## Inhertance

```c++
// C++ Implementation to show that a derived class 
// doesn’t inherit access to private data members. 
// However, it does inherit a full parent object 
class A 
{ 
public: 
	int x; 
protected: 
	int y; 
private: 
	int z; 
}; 

class B : public A 
{ 
	// x is public 
	// y is protected 
	// z is not accessible from B 
}; 

class C : protected A 
{ 
	// x is protected 
	// y is protected 
	// z is not accessible from C 
}; 

class D : private A // 'private' is default for classes 
{ 
	// x is private 
	// y is private 
	// z is not accessible from D 
}; 

```

![inhertance-table](/assets/images/cppInhertance.png)


[polymorphism](https://www.geeksforgeeks.org/polymorphism-in-c/)

### virtual
Runtime polymorphism
```
class Base{
    public : 
        virtual void show(){ cout<<"base"; }
}

class Derived : Base{
    public : 
        void show(){ cout<<"derived"; }
}

int main(){
    Base * b = new Derived();
    b->show();      // "derived"
}

```

```
class base1
{
  public:
     void someFunction( )
     { .... ... .... }  
};
class base2
{
    void someFunction( )
     { .... ... .... } 
};
class derived : public base1, public base2
{
    
};

int main()
{
    derived obj;

    obj.someFunction() // Error!  
}

```

There are 2 ways to avoid ambiguity:

1. Use scope resolution operator     // multiple inhertance
2. Use virtual base class            // multipath inhertance


- [The Virtual table / vtable](https://www.learncpp.com/cpp-tutorial/125-the-virtual-table/) :

To implement virtual functions, C++ uses a special form of late binding known as the virtual table. The virtual table is a lookup table of functions used to resolve function calls in a dynamic/late binding manner. The virtual table sometimes goes by other names, such as “vtable”, “virtual function table”, “virtual method table”, or “dispatch table”.


- [Matric multiplication with multi-threading](https://www.geeksforgeeks.org/multiplication-of-matrix-using-threads/)






## Exception
In C++, all exceptions are unchecked, so it is not forced by the compiler to either handle or specify the exception. 


## Threading and Fork

use std::thread for multithreading

``` c++
void foo(param) 
{ 
	// Do something 
} 

// The parameters to the function are put after the comma 
std::thread thread_obj(foo, params); 


//we can also override () operator and pass 
class fn_object_class { 
    // Overload () operator 
    void operator()(params) 
    { 
        // Do Something 
    } 
} 
std::thread thread_object(fn_class_object(), params) 

t1.join(); // wait for t1 to finish
```


fork() call is used to create a new __process__. all instructions after the call are executed in both parent and child processes.
In parent fork() return pid of child process or -ve number if failed
In child fork() returns zero
 
## Mutex

https://stackoverflow.com/a/5154174/12613203

```c++
#include <iostream>
#include <thread>
#include <mutex>

std::mutex m;//you can use std::lock_guard if you want to be exception safe
int i = 0;

void makeACallFromPhoneBooth() 
{
    m.lock();//man gets a hold of the phone booth door and locks it. The other men wait outside
      //man happily talks to his wife from now....
      std::cout << i << " Hello Wife" << std::endl;
      i++;//no other thread can access variable i until m.unlock() is called
      //...until now, with no interruption from other men
    m.unlock();//man lets go of the door handle and unlocks the door
}

int main() 
{
    //This is the main crowd of people uninterested in making a phone call

    //man1 leaves the crowd to go to the phone booth
    std::thread man1(makeACallFromPhoneBooth);
    //Although man2 appears to start second, there's a good chance he might
    //reach the phone booth before man1
    std::thread man2(makeACallFromPhoneBooth);
    //And hey, man3 also joined the race to the booth
    std::thread man3(makeACallFromPhoneBooth);

    man1.join();//man1 finished his phone call and joins the crowd
    man2.join();//man2 finished his phone call and joins the crowd
    man3.join();//man3 finished his phone call and joins the crowd
    return 0;
}
```

## Free and Delete
delete operator should only be used either for the pointers pointing to the memory allocated using new operator or for a NULL pointer, and free() should only be used either for the pointers pointing to the memory allocated using malloc() or for a NULL pointer.
- When the delete operator destroys the allocated memory, then it calls the destructor of the class in C++, whereas the free() function does not call the destructor; it only frees the memory from the heap.
- The delete operator is faster than the free() function.


<br>
<br>
<br>
<br>


## Syntax
input ` cin>>x;`
output ` cout<<x;`

##### Arrays
```c++
int a[10];
int arr[] = {1,2,3,4};  //creates arr of size 4
int arr[6] = { 10, 20, 30, 40 };    //creates an array of size 6, initializes first 4 elements 
```

#### STL DataStructures

##### Vector
```c++
vector<int> vec;

.push_back()    //append
.pop_back()     //remove last
.back()         //get last ele
.front()        //get first ele
.clear()        //removes all : o(n)
.resize(int capacity, int val)  
.erase(iterator)    // removes 1 ele : o(n)
.erase(fromItr, toItr)  //   remove range of ele : o(n)
```

##### Lists
non contiguous
```c++
list <int> mlist;

.push_back()    //append
.pop_back()     //remove last
.push_front()    
.pop_front()
.back()         //get last ele
.front()        //get first ele
.clear()        //removes all : o(n)
.resize(int capacity, int val)  
.erase(iterator)    // removes 1 ele : o(n)
.erase(fromItr, toItr)  //   remove range of ele : o(n)
```

##### Maps

```c++
unordered_map<string, int> umap; 
map<int, int> gquiz1;

.insert({first,second})     // o(1) / o(logn) 
.erase(key)                 // o(1) / o(logn)
.find(key)  return itr      // o(1) / o(logn)

```

##### Sets
```c++
unordered_set <string> stringSet ;
set <int, greater <int> > s1 // default increasing;

.insert({first,second})     // o(1) / o(logn) 
.erase(key)                 // o(1) / o(logn)
.find(key)  return itr      // o(1) / o(logn)

```


#### Files
```c++
fstream myfile("./input.txt", ios_base::in | ios_base::out);
ios_base::app // append mode
```