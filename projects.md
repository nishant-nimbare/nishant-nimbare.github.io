---
layout: default
title: "Projects"
permalink: /projects/
---

# Projects

{% for project in site.data.projects %}
## [{{ project.name }}]({{ project.link }})
{% endfor %}
