---
title: "Setting up ssl with Dockerized Nginx & Letsencrypt"
categories:
  - Deployment
tags:
  - docker, nginx, ssl, letsencrypt, certbot
---

So you decided to dockerize your side-project / freelance project, but now its deployment time and you don't know how to get a ssl certificate and to get it to work with the a dockerized Nginx server. Don't worry, this article is for you.

We will look into how to get a free ssl cert with LetsEncrypt (certbot) and also how to setup auto renewal.

For the uninitiated, below is taken from their [website](https://certbot.eff.org/about/) ...
>Certbot is a free, open source software tool for automatically using Let’s Encrypt certificates on manually-administrated websites to enable HTTPS.

So basically certbot is a cli-tool that talk to LetsEncrypt to issue and renew ssl certificate[s].

# Dissecting the Bot
There are 2 things at play here, Certbot (client) and LetsEncrypt . Long story short, to get a ssl certificate certbot needs to prove LetsEncrypt that the claimed domain does actually belongs to us, i.e. the server that is resolved/reached by that domain is indeed ours. To prove this, LetsEncrypt gives us a challenge .
There are 2 types of challenges:
- Provisioning a DNS record under
- Provisioning an HTTP resource

We need to fulfill any one of them, the second one is more common I guess.

Consider it like this, LetsEncrypt tell the client to create a HTTP resource (read file), that should be reachable under a well-known  path. LetsEncrypt then tries to get this resource through public internet, if it's found voila. This actually is not entirely correct, there are some finer details about signatures, nonce, etc. But this basic understanding should work for now.

Read more about this [in the offical documentation](https://letsencrypt.org/how-it-works/).

# Ways to get a certificate
There are 3 ways which are important for us to understand.

1. nginx plugin: the simplest of them all. certbot manages all the stuff here, right from fulfilling challenges & getting the certs to modifying the nginx-config for https and even automatic renewal. 

2. standalone: Aim to be used when you don't have a server running, atleast not on ports 80 & 443. certbot spins up a server for you to complete the challenge.

3. webroot: Here we are telling certbot that we have our server running and the path `/.well-known/` on server points to a certain directory (also know as webroot). So when LetsEncrypt gives a challenge to make a http resource, certbot creates in the `webroot` directory, which would be served under `/.well-known/` path by our server. Needless to say, for this to work you will need to manually add a location block for `/.well-known/` in nginx-conf. 

One thing to remember here is that, whichever method you choose the default renewal process will follow the same method. 

# Infinite elixir - Renewal

LetsEncrypt ssl certificates are valid for 90 days, after that we need to renew them or get new onces. `certbot renew`

luckily certbot can handle automatic cert renewals for us. A default timer service is given to us, which runs twice a day to check for renewals : `systemctl status certbot.timer`.

we can also specify pre & post hooks directly in the renew command or by creating a executable file in `/etc/letsencrypt/renewal-hooks/`, name of the file doesn't matter. for e.g : `/etc/letsencrypt/renewal-hooks/post/reload-nginx.sh`

we can also have different method for initially getting certs and while renewal, by explicitly mentioning in the renew command.

But here's the catch, the default certbot timer initiates a normal default certbot renew which will follow the same method used for getting certs. Now you can technically also change that but that is not easy nor recommended. Better would be to create a cron job with your custom renew command.

sauce : [https://certbot.eff.org/docs/using.html](https://certbot.eff.org/docs/using.html)

----------------

So all of this is great but how do we get it to work with docker.
Below are 3 ways, which I found after intense searching (_\*cough\*... one google search ...\*cough\*_). 

# 1 Certbot in a independent container

source : [https://medium.com/@pentacent/nginx-and-lets-encrypt-with-docker-in-less-than-5-minutes-b4b8a60d3a71](https://medium.com/@pentacent/nginx-and-lets-encrypt-with-docker-in-less-than-5-minutes-b4b8a60d3a71)

I 100% recommend to read the original article as it explains everything in detail. To give you a gist, you run certbot in a independent container, with 2 common shared volumes between them, one for storing the certs and another for http resource of challenge. Didn't try this one but it looks like it works on the webroot method. There's just one catch, which the author explains under `The Chicken or the Egg?`, basically nginx won't start without ssl certs and certbot won't get certs without nginx - since we are using webroot, so you will need to run a script that does this ....
> Create a dummy certificate, start nginx, delete the dummy and request the real certificates.

# 2 Certbot in the same container as Nginx

source : [https://medium.com/@vshab/nginx-with-lets-encrypt-in-docker-container-e549d18c00d7](https://medium.com/@vshab/nginx-with-lets-encrypt-in-docker-container-e549d18c00d7)

Easier than the previous one in my opinion. Here, the author installs & runs certbot in same container as Nginx. But don't forget to attach a bind-mount or volume to `/etc/letsencrypt` so that the certificate persist even after container is removed, though it will work even without that. To avoid the chicken & egg problem mentioned above, the author here uses an entrypoint script to get the certificates in standalone mode before nginx starts, thus by the time nginx is running the ssl certs will be in place and nginx won't complain. 

Since the renewal method is different from the initial one you'll need a cron job for automatic renewal.

I may be wrong, but I think one could also do this with certbot nginx plugin and let certbot handle everything, might work. Try this out and also tell me if it does indeed work 

# 3 Certbot on host machine

This is kind of hacky, but this is what I ended up doing. 
Simplest of them all, install certbot on the docker host and bind-mount 2 directories
```
/etc/letsencrypt (certs will live here)
/var/lib/certbot (html resource challenge webroot)
``` 

We will need to change nginx conf mid-way and manually.
- Start off by **NOT** having `ssl_certificate` & `ssl_certificate_key` directves in nginx config. 
- Have a location block for LetsEncrypt challenge
```
   # Certbot
    location /.well-known/ {
      alias /var/lib/certbot/.well-known/;
    }
```

- start the container & run the following on host
```
certbot certonly --webroot -w /var/lib/certbot/ -d <yourDomain.com> -d <anotherDomain.com> --email <your@email.com> --agree-tos 
```

- If everything goes well, certs should be now available inside `/etc/letsencrypt/live/`

- Add ssl directives to nginx config 
```
ssl_certificate /etc/letsencrypt/live/<yourDomain.com>/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/<yourDomain.com>/privkey.pem;
```

- now for renewal to be automatic, we need a post renewal hook to restart nginx, so that it can pick up the changed certs. for this create a file `/etc/letsencrypt/renewal-hooks/post/reload-nginx.sh`

```
#!/bin/sh
docker exec -d <Nginx-container> nginx -s reload
```

- check if renewal works by `certbot renew --dry-run`

Why I used this :

1. The certificates are independent of containers which means I can bring up and down the containers any number of times without requesting for new certs everytime & without worrying about [LetsEncrypt rate limits](https://letsencrypt.org/docs/rate-limits/).

2. Don't have to write custom cron job as the default certbot.timer will be enough.


## [Checkout the sample nginx conf for the above method](https://gist.github.com/nishant-nimbare/812e2a5c408b19f03f8318ac757fa1fd)