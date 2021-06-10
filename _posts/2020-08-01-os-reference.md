---
title: "Os Quick Reference"
categories:
  - Reference
tags:
  - Reference
  - os
toc: true
toc_sticky: true
---



https://medium.com/cracking-the-data-science-interview/the-10-operating-system-concepts-software-developers-need-to-remember-480d0734d710


process has 4 segments: stack, data, code, heap

each process has all these segments

threads share segments apart from stack and cpu segments.

![threads](/assets/images/processVthreads.jpg)


## Paging
process is divided into pages. Main memory is divided into frames. PageSize = frameSize. pages are loaded into frames when required.
Every process has it PageTable that maps its pages to memory's frames (where the pages are loaded).
memory management unit converts the logical address(that cpu generates ) to physical address (where the pages are actually loaded in memory)
no. of offset bits = log2(pageSize)

there are many page replacement policies : Fifo, Least recently used, least frequently used, optimal (requires future knowlege).

translation lookaside buffer (TLB) is a memory cache that is used to reduce the time taken to access a user memory location. It is a part of the chip's memory-management unit (MMU). The TLB stores the recent translations of virtual memory to physical memory and can be called an address-translation cache.

## Segmentation
Segmentation is a memory management technique in which, the memory is divided into the variable size parts. Each part is known as segment which can be allocated to a process. The details about each segment are stored in a table called as segment table.
every segment in segment table has :
1. Base address : address from where segment starts in memory
2. Limit : size of segment


Paging divides everything in same size. but since segments can be variable, hence we can have related data/code in the same segments (reduce page fault better execution time).

## fragmentation 
1. Internal Fragmentation :
Memory block assigned to process is bigger. Some portion of memory is left unused, as it cannot be used by another process. Happens with paging

2. External Fragmentation :
Total memory space is enough to satisfy a request or to reside a process in it, but it is not contiguous, so it cannot be used. Basically there are gaps in memory.  External fragmentation can be reduced by compaction or shuffle memory contents to place all free memory together in one large block. To make compaction feasible, relocation should be dynamic.

## Deadlock 
Deadlock is a situation where a set of processes are blocked because each process is holding a resource and waiting for another resource acquired by some other process.
Necessary conditions for deadlock
1. mutual exclusion : Only one process can use a resource at a time.
2. Hold and wait : process is holds some resource and waits for resources
3. no preemption : A resource cannot be taken from a process unless the process releases the resource. 
4. circular wait : A set of processes are waiting for each other in circular form.

### Handling deadlock
1. ignore : widely used (windows, linux)
2. prevention : remove at least one of the 4 conditions of deadlock 
3. avoidance : Banker's ALgo ,checks safe unsafe sequene.  requires future info
4. detection & recovery 

## Mutux and semaphore
Mutex is a locking mechanism that makes sure only one thread can acquire the Mutex at a time and enter the critical section. This thread only releases the Mutex when it exits the critical section.

Semaphore is a signalling mechanism and a thread that is waiting on a semaphore can be signaled by another thread. This is different than a mutex as the mutex can be signaled only by the thread that called the wait function

A Mutex is different than a semaphore as it is a locking mechanism while a semaphore is a signalling mechanism. A binary semaphore can be used as a Mutex but a Mutex can never be used as a semaphore.

Mutex has a concept of ownership - only the thread that acquires a lock can unlock it.
while seamaphore suffers from problem of "release without acquire" - this can happen due to faulty code.

also with semaphore, a thread my signal aquire while it is already in critical section - recursive lock. which may result in deadlock as thread would wait for itself to relase. 

[detailed video](https://www.youtube.com/watch?v=TDzQixSl73M)

## Linux cmds

- Sed : stream editor <br>
Searching , replacing, insertion, deletion
```
sed 's/findTxt/ReplaceTxt/g' filename 
sed -n '/findTxt/p' filename
```

- Awk : initials of people <br>
A mini programming language, with arrays loops if else etc
Can do alll things sed can do + analysis of text like counting, suming etc.

- du : gets space occupied on disk

- find : find files 
find [folderName] | [-name pattern] | [-prem 664] | [-exec -exec rm -i {} \ ] |

- free :  displays the total amount of free space available in main memory and swap

- nslookup : display ip of domain

- traceroute : is used to get the route of a packet . traceroute www.google.com

- host : get ip from domain or vice versa

- ifconfig(Interface Configuration) : is a utility in operating system that is used to set or display the IP address and netmask of a network interface. It also provides commands to enable or disable an interface. 

- chown : change ownership. chown [OWNER]:[GROUP] file

- chmod changes the permissions of each given file according to mode
`chmod 400 sample.txt`<br>
`chmod (u | g | o) [+ | -] (r | w | x) sample.txt `



