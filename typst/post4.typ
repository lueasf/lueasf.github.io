#set page(
  width: 21cm,
  height: auto,
  margin: (x: 2cm, y: 2cm),
  fill: none
)

#set text(
  font: "New Computer Modern", 
  size: 12pt
)
#set text(font: "New Computer Modern", size: 12pt)


#align(center)[
  #text(size: 20pt, weight: "bold")[Complex Systems Intuitively]

  _8th March 2026 - Complex Systems Intuitively_
]

How do we truly learn? By deconstructing. By doing something unexpected or something that demands pure creativity.

\

I recently read a Springer textbook. I came across randomly but I can assure it changed the way I see the world : 'An Introduction to Complex Systems : Making Sense of a Changing World' by Joe Tranquillo, Professor at Bucknell University. Just by reading the 30-pages introduction, I knew I found a book that would amaze me.

\

It inspired me to create some random things, to explore.

I built a #underline[#link("https://github.com/lueasf/webtree")[random-walk web crawler]], because why not. It's not usefull and that's the whole purpose. It's nearly art. The more it's useless, the more it's art. It's a bot that goes from website to website and jumps on a random link on the current website with some constraints. We can see patterns emerging.

Constraints : we can't go on a domaine that has been visited X times, not funny otherwise, a bit of change is better. the bot is allowed to backtrack if it reaches a dead end. And we avoid some pages such as login, privacy, support, contact etc.

This is a simple exemple of how random structures can emerge with nearly nothing. I love this. I think theses could be showed to some kids to have them develop intuition about internet, randomness and complex systems.

When reading the book of Tranquillo, I understood that : everything can be mapped with the framework of complex systems.

\

I’ve since started other "weird" projects. I’m proud of their uselessness. they are intentionally purposeless, which, paradoxically, is what makes them valuable to me. 

Take my project #underline[#link("https://github.com/lueasf/weathee")[weathee]]. It generates visuals based on live meteorological data and random matrix theory. It’s a bit simple, but there’s a certain magic in it when you don't know the underlying mechanics.

By building these, I want to sharpen my intuition and see how interdisciplinary fields collide: computer networks, evolutionnary algorithms, stochastic process, art, and physics. I originally wanted to use a physical thermometer with a Raspberry Pi to bridge the digital and the physical, but I did not had time, so I settled for a weather API.