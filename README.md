# Website

python3 -m http.server 3001

typst compile typst/post0.typ posts/post0.svg

si #pagebreak(), les enlever, compiler et les remttre pour le PDF.

## Typst
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
  #text(size: 20pt, weight: "bold")[Titre]

  _Date 2026 — keywords_
]

\