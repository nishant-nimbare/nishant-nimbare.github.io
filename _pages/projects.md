---
title: "Projects"
permalink: /projects/
---

{% for project in site.data.projects %}
## [{{ project.name }}]({{ project.link }})
- {{ project.desc }}
- Stack : {{ project.stack }}
{% if project.result And project.result != "" And project.result != nil %} 
- {{ project.result }} {% endif %}
{% endfor %}
