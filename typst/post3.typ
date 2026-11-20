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
  #text(size: 20pt, weight: "bold")[How life compresses information]

  _26th January 2026 — DNA, proteins, and the engineering of biology_
]

\

== Introduction
This is not a course. I am not trained in structural biology or molecular biology. But over the past months, I have encountered this field repeatedly: at a hackathon (Boltz Hackathon by MIT), through research labs (Inria), at events on synthetic biology or even in a bioML class at school...and each encounter raised more questions than it answered. The more I learned, the more I realized how deeply this field challenges intuitions about structure, information, and computation. Therefore, this post is an attempt to document what I have learned so far.

\

== The DNA Paradox: Information at impossible scales
Before diving into structure, let's start with something concrete: the sheer improbability of how life stores and compresses information.

The human genome (the complete genetic blueprint for a human being) can be stored in approximately 3 gigabytes of data. A gigabyte is a unit we encounter daily: a movie, a large photo collection, a few video files. Three gigabytes is small.

But there is another way to think about DNA. If we took all the DNA in a single human cell; all the helices, unraveled them into a single line; that line would be about 2 meters long. Two meters. The height of a tall human. All the genetic information that built your entire body, if stretched out, would fit in a room.

Yet this 2-meter-long molecule does not float freely. it's compressed into the nucleus of a cell. The nucleus is a sphere with a diameter of about 6 micrometers.

How do you fit 2 meters of DNA into something 0.000006 meters across?

The answer is: structure. DNA does not store information as a simple line. It winds, coils, folds upon itself at multiple levels. This is not random crumpling. This is hierarchical, organized, architectural compression.

The paradox raises a deeper question: if information can be compressed so efficiently, how is it done? What are the rules? And can we learn them, reverse them, or design our own?

This question sits at the intersection of three disciplines: molecular biology (what is DNA?), structural biology (what shapes does it take?), and machine learning (can we predict or design these shapes?). The past decades have seen remarkable progress on all three fronts, culminating in breakthroughs like AlphaFold and Boltz. But the story starts earlier, with the basics of how life encodes information.

\

== From molecules to meaning: The hierarchy of life
Life is hierarchical. Understanding structural biology means understanding the levels at which this hierarchy operates:

$ "Atoms" > "Molecules" > "Proteins" > "Cells" > "Organisms" $

At the atomic scale, we find the basic building blocks of matter: carbon, nitrogen, oxygen, hydrogen, sulfur. These elements are nothing special. They are common, found throughout the universe. What makes them special is _how they are arranged_.

Molecules are groups of atoms bonded together. Water is a molecule: two hydrogen atoms bonded to one oxygen atom. But chemistry is not about abundance, it's about _pattern_.

Proteins are molecules of breathtaking complexity: thousands of atoms : carbons, hydrogens, oxygens, nitrogens, sulfurs...linked into intricate structures. But proteins aren't random. They're _encoded_.

\

== DNA and RNA: Information channels
#underline[DNA] (deoxyribonucleic acid) is the molecule that stores genetic information. It consists of two strands twisted into a double helix, formed by a sequence of _nucleotides_.

There are four nucleotides in DNA:
$ #underline[A] ("Adenine") , #underline[T] ("Thymine"), #underline[C] ("Cytosine"), #underline[G] ("Guanine") $

A nucleotide is a unit of information. With four symbols, DNA encodes information much like binary code uses two symbols (0 and 1). These nucleotides pair specifically: A with T, and C with G. This pairing is crucial for DNA replication and transcription.

#underline[RNA] (ribonucleic acid) is similar to DNA but acts as a messenger. Where DNA stores the blueprint, RNA carries the message. RNA is usually single-stranded and contains #underline[U] (uracil) instead of thymine.

The flow of information is directional:
- #underline[Transcription]: DNA -> RNA
- #underline[Translation]: RNA -> Protein

A gene is a region of DNA. When a cell needs a protein, it transcribes that gene into messenger RNA (mRNA). The mRNA is then read by ribosomes which translate it into a protein by assembling amino acids in the correct sequence.

\

== Amino acids and proteins: The alphabet of life
There are 20 standard amino acids. Each one is a small molecule with the same basic structure:
- An amino group (nitrogen-based)
- A carboxyl group (acid-based)
- An R group—the variable part that makes each amino acid unique

#align(center)[                                           
  #image("data/image0.png", width: 50%)                                   
]

Examples:
- A : Alanine (Ala) (R is formed by a methyl group -CH3)
- C : Cysteine (Cys)
- D : Aspartate (Asp)
- E : Glutamate (Glu)
- P : Proline (Pro)
- ...and 15 more

Think of amino acids as letters in an alphabet. Proteins are sentences written in this 20-letter alphabet.

A _peptide_ is a short chain of amino acids. Longer chains are called _proteins_.

Proteins are the workers of the cell. They catalyze reactions, transport molecules, transmit signals, provide structure, and defend against pathogens. Every function that keeps an organism alive involves proteins. And every protein is built by assembling amino acids in a specific sequence.

This is crucial: the _sequence_ of amino acids determines everything. A protein with 100 amino acids chosen from an alphabet of 20 letters can theoretically be arranged in 20^100 different ways. That is an astronomically large number, vastly larger than the number of atoms in the observable universe which is approximately 10^80.

Yet life is not random. Life is a small subset of all possible sequences. How small? When computed, researchers found that for a protein chain of 100 amino acids, only about 10^300 distinct protein sequences exist in nature. This is still enormous, but it's a tiny fraction of the theoretical 20^100 possibilities.

This tells us something profound: proteins are not random. They are _constrained_ by physics and evolution. These constraints are what allow life to work.

\

== The four dimensions of protein structure
A protein's structure exists on multiple scales:
There are four levels of protein structure, each adding a new layer of complexity. The sequence of amino acids (1D) folds into local patterns (2D), which then fold into a complete 3D shape (3D), and finally, proteins assemble into complexes and exhibit dynamic behavior over time (4D). In 1D, it's just a string of letters. By 4D, it's a complex, moving machine.

In 4D, we can observes complexes of proteins interacting with each other, changing shape, and performing functions over time.

Here is the central mystery: given only the sequence (1D), how does it fold into the correct 3D shape? The cell does this automatically, with high fidelity, billions of times per second.

For decades, this was an unsolved problem in biology. Researchers could determine protein structures through expensive techniques like X-ray crystallography, but predicting structure from sequence alone seemed impossible.

\

== Why ?
I do not study this field formally. But I have found myself drawn to it repeatedly. \

> A hackathon organized by MIT's Jameel Clinic challenged me to work with antibody-antigen complexes using the Boltz model. \

> I was invited to visit INRIA with one of my professor, whose team study molecular dynamics. For example, they introduced me to work on ppIRIS, a tool for predicting protein-protein interactions using a deep learning approach. \

> In bioML class, I worked on the reimplementation of toxipep, a deep learning framework using BiGRU and transformers for toxicity prediction for peptides. \

> I also went at an event at Nucleate in Paris to talk about synthetic biology.

And in March, I'm invited to attend a PhD defense on RNA structure and dynamics.

These encounters share a common thread: they all recognize that understanding life means understanding _structure_. Not structure in the abstract, but structure as information, computation, and design.

\

== How the folding problem was solved
For fifty years, biologists could determine protein structures experimentally—using X-ray crystallography, cryo-electron microscopy, and other expensive techniques—but they could not _predict_ structure from sequence. The problem seemed insurmountable. Given only the amino acid sequence, how could one reverse-engineer the 3D shape?

Then, in 2018, David Baker's lab at the University of Washington demonstrated that neural networks could predict protein structures with surprising accuracy. This was followed in 2020 by #underline[AlphaFold2], developed at DeepMind. AlphaFold did something remarkable: it solved the structure prediction problem using deep learning, combining sequence data with evolutionary information from multiple sequence alignments.

This was not incremental progress. This was a breakthrough that closed a fifty-year gap in our ability to understand proteins.

AlphaFold's success opened the door to a natural question: if we can predict _single_ protein structures, can we predict _complexes_? Can we predict how an antibody binds to an antigen? How a protein binds to a drug molecule?

The answer came in 2024 with #underline[Boltz-1], developed at MIT's Jameel Clinic. Boltz extends the approach to predict protein-protein interactions, antibody-antigen complexes and protein-ligand binding. A ligand is a small molecule that binds to a protein, often modulating its function. 

This is not just engineering. This is a shift in what is computationally possible. The folding problem was not _solved_ in the sense of finding a closed-form equation. It was _learned_—encoded in the weights of a neural network trained on the vast database of known protein structures.

And now that we can predict structure, we can ask new questions: Can we predict function? Can we design new proteins with novel functions? Can we design peptides that are safe, stable, and effective as therapeutics?

These questions are already being pursued. The tools exist. The barriers are falling.

\

= pLM (protein Language Models)
Just as large language models (LLMs) like GPT-4 learn the structure of human language from vast amounts of text, protein language models (pLMs) learn the structure of biological sequences from millions of protein sequences. We can make an analogy between LLMs and pLMs:
LLMs are trained on text data (words, sentences) to learn grammar, syntax, and semantics. Whereas pLMs are trained on protein sequences (amino acid chains) to learn biological patterns, motifs, and structures.

\
= ToxiPep Reimplementation
During a bioML class, I worked on reimplementing ToxiPep, a model for predicting peptide toxicity from amino acid sequences. The motivating question is simple: given only the sequence (ACDEFG...), can we predict whether a peptide will be toxic to cells?

\
Peptides are short chains of amino acids, as said earlier, that can become therapeutic drugs: they can deliver precise signals, target specific diseases, avoid some side effects that larger proteins might cause. But some peptide sequences are toxic. They damage cells. Identifying toxic peptides computationally, before running expensive lab experiments, could save time and resources while enabling safer drug design.

\
The challenge is that toxicity is not determined by a single amino acid. It emerges from the _pattern_ of the sequence: how do these amino acids interact? What properties do they create when arranged in this particular order?

\
The original ToxiPep approach learned an embedding directly from the training data and the pipeline was : sequence -> learned embedding -> BiGRU -> Transformer -> prediction with MLP. A reasonable approach, but limited by the amount of labeled data available.

\
Our reimplementation took a different strategy. Instead of learning embeddings from scratch, we leveraged pre-trained protein language models: ESM-2 and ProstT5. These are large neural networks trained on millions of unlabeled protein sequences, learning rich representations of sequence patterns.

\
ESM-2 learns through masked language modeling: mask an amino acid and predict what was hidden. This captures evolutionary patterns and conservation. ProstT5 learns through sequence reconstruction: corrupt a sequence and predict the original. This captures contextual, sequential information. The two models capture different aspects of sequence structure.

#align(center)[
  #image("data/image2.png", width: 90%)
]

Our approach concatenated their embeddings (480 dimensions from ESM-2 + 1024 from ProstT5 = 1504 total), then projected this combined representation down (1504 ->512 dimensions), added positional encoding, passed through a transformer block, (mean) pooled the results, and finally fed them into a simple MLP classifier to predict toxicity or safety.

#align(center)[
  #image("data/image1.png", width: 90%)
]

The intuition is straightforward: by combining two complementary pre-trained models, we get a richer, more informative representation of the peptide than either could provide alone.