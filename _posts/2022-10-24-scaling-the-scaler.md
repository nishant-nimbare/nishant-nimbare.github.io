---
title: "Scaling the scaler"
categories:
  - Software Engineering
tags:
  - scalability
  - availability
  - single point of contact
  - load balancer
  - micro services
toc: true
---

## Services & Single Point of Failures

A [single point of failure (SPOF)](https://en.wikipedia.org/wiki/Single_point_of_failure) is a part of a system that, if it fails, will stop the entire system from working.

It is common practice to introduce multiple copies of service in order to increase availability & remove SPOF. Usually a Load Balancer (LB) is added in front of the services to distribute requests amongst the services.

But just by simply adding a load balancer doesn't fix SPOF because the load balancer (LB) itself is SPOF as all the traffic is moving through it. we have just pushed SPOF 1 layer up.
one can see that we need to have multipe LBs and distribute traffic amongst these LBs to resolve this.


TCP needs IP addresses to create a connection and tranfer data. so there are 2 ways to solve the above problem
1. we map multiple LBs (machines) to 1 single IP
2. we give multiple IPs to the client itself and hope that it tries a different ip on failure.


## Imaginary Numbers

The 1st way mentioned above uses a technique called Virtual IP (VIP). Here we assign a single IP (VIP) to a swarm of LB machines. At a given time only 1 machine receives all the traffic against that VIP and other machines are on standby. All machines constantly exchange heartbeat msgs with others to know about their health. If the active machine goes down it will stop responding to the heartbeats and another machine will become active.

This is a form of __active - passive__ redundancy, as only 1 machine is active and other machines are passive at a time.

VIP works at address resolution protocol (ARP) level. MAC address of the active machine is associated with VIP, when active goes down the router is given the mac of the successor machine and router diverts all traffic to successor. All tcp connections will be re-initiated.

## It's not all Numbers

The way to achieve 2nd solution is through Domain Name Service (DNS). Clients use DNS to resolve domains to ip addresses.
By adding multiple A records we can make DNS servers return a list of ip addresses to the client. Many DNS servers return a rotated list on subsequent call thus effectively sharing the load amongst LBs. This is called as Round Robin DNS. Modern browsers automatically retry with 2nd ip address if the 1st one gets timed out and so on.

This is a form of __active - active__ redundancy, as traffic gets distributed amongst all machines - all are active.

Some OP DNS services like AWS Route 53 can dynamically change the list of ip address. It can change response to DNS queries on the fly based on which machines are healthy. [sauce](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-configuring.html)

but 1 thing to consider there is that DNS records are cached at multiple levels so the failover will not be instantaneous.

## Closing

Cloud Providers offering load balancers possibly use both these methods to scale and increase availaliblity.
below is taken from [user guide of AWS ELB (elastic load balancer)](https://github.com/awsdocs/elb-user-guide/blob/master/doc_source/how-elastic-load-balancing-works.md#request-routing) 

>Before a client sends a request to your load balancer, it resolves the load balancer's domain name using a Domain Name System (DNS) server. The DNS entry is controlled by Amazon, because your load balancers are in the amazonaws.com domain. The Amazon DNS servers return one or more IP addresses to the client. These are the IP addresses of the load balancer nodes for your load balancer...
>
>As traffic to your application changes over time, Elastic Load Balancing scales your load balancer and updates the DNS entry. The DNS entry also specifies the time-to-live (TTL) of 60 seconds. This helps ensure that the IP addresses can be remapped quickly in response to changing traffic.
>
>The client determines which IP address to use to send requests to the load balancer. The load balancer node that receives the request selects a healthy registered target and sends the request to the target using its private IP address.
>
[Source](https://github.com/awsdocs/elb-user-guide/blob/master/doc_source/how-elastic-load-balancing-works.md#request-routing)


