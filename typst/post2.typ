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
  #text(size: 20pt, weight: "bold")[Noise as structure]

  _19th January 2026 — uncertainty, dynamics & stochasticity_
]

\

== Introduction 
Noise is not a residual term to be minimized, but an integral part of the model itself.

When I was a child, I wanted to understand physics. Even before learning mathematics properly, I had the intuition that everything could be described by equations or numbers at least. At first, one learns simple equations: linear laws, ordinary differential equations, clean deterministic systems.

But as soon as we try to understand physics more deeply, not just to model simplified or idealized systems, we inevitably enter a deeper territory: stochastic processes and randomness.

_Uncertainty_ does not only appear in physics. It's central to biology (exploration, robustness), to artificial intelligence (diffusion models, Bayesian reinforcement learning), and to neuroscience, where neuronal variability is not a bug but a defining feature of neural computation.

In textbooks, stochasticity often appears as a technical afterthought: just add a Wiener term to the equation and you are done. The random term is usually presented as a nuisance, something intimidating but ultimately secondary.

Yet this stochastic term often structures the entire model. It shapes the _dynamics_, the stationary distributions, the stability properties, and even what can be learned or inferred from data. In many systems, removing noise does not reveal the “true” behavior, it destroys it.

\

== Deterministic models: when ODEs are enough

Let us start with the simplest setting: deterministic ordinary differential equations. Consider a basic RC electrical circuit. If $V(t)$ is the voltage across the capacitor, the dynamics are governed by $ R C dot (d V(t))/(d t) + V(t) = V_(i n) (t). $

This model works remarkably well under strong assumptions:
- the components are ideal,
- the environment is perfectly controlled,
- the initial condition V(0) is known exactly.

Under these conditions, the system is fully deterministic: given an initial condition, the trajectory is uniquely determined. For some engineering problems, this is more than sufficient.

But this apparent success hides a deeper issue: real systems are never perfectly isolated, and their initial conditions are never known exactly.

\

== Adding noise: stochastic differential equations

As soon as uncertainty becomes intrinsic to the system, deterministic ODEs are no longer adequate.
A canonical example comes from quantitative finance. In option pricing, asset prices are not just unknown, they are fundamentally random. The standard model for a stock price $S_t$ is not an ODE but a stochastic differential equation (SDE): $ d S_t = mu S_t d t + sigma S_t d W_t, $ where $mu$ is the drift (expected growth), $sigma$ is the volatility  and $W_t$ is a Wiener process (Brownian motion).

Here, the noise term does not represent measurement error. It's the market. This equation already reveals a crucial idea: the drift encodes structure while the diffusion encodes uncertainty, both are equally fundamental.

At this point, a subtle but important distinction appears: Itô vs Stratonovich calculus.
While equivalent in many physical limits, they correspond to different assumptions about how noise interacts with the system, and they can lead to different effective dynamics.
Indeed, Itô calculus assumes that noise is uncorrelated with the current state, while Stratonovich calculus assumes some correlation, leading to additional drift terms upon conversion. If curious, read books on stochastic calculus for more details.

\

== From trajectories to distributions: the Fokker–Planck equation

When dealing with stochastic systems, a single trajectory is rarely meaningful. Instead of asking “where is the particle?”, we ask: What is the probability that the particle is at position $x$ at time $t$ ?
For an SDE of the form $ d x_t = f(x_t) d t + g(x_t) d W_t, $ the evolution of the probability density $ p(x,t) $ is governed by the Fokker–Planck equation:
$ (partial p(x, t))/(partial t) = - nabla dot f(x) p(x,t) + 1/2 nabla^2 (g^2(x) p(x,t)) $

This equation shifts the perspective: _dynamics_ are no longer about trajectories, they are about _probability flows_. Stationary distributions, metastability, and long-term behavior are often invisible at the trajectory level but become clear at the _distribution_ level.

\

== Counter-intuitive effects: when noise helps

Once noise is taken seriously, surprising phenomena emerge. One example is escape from local minima.
In a deterministic system, a particle trapped in a potential well remains there forever. With noise, escape becomes possible, with rates described by Kramers’ theory.

Another striking phenomenon is _stochastic resonance_, where adding noise enhances the response of a system to weak signals. In such cases, noise does not obscure structure, it reveals it.
These effects show that noise is not merely tolerated by systems, it can be actively exploited.

\

== Learning under uncertainty: Bayesian filtering

To quickly introduce this section, consider time series with hidden states.

In learning and inference, uncertainty often comes from hidden states. A general state-space model is written as:
$ x_(t + 1) = f(x_t) + epsilon_t $ $ y_t = h(x_t) + eta_t, $
where $x_t$ is latent and only indirect observations $y_t$ are available.

Bayesian filtering aims to estimate the belief distribution: $ p(x_t | y_(1:t)). $

Kalman filters solve this exactly for linear-Gaussian systems. Particle filters approximate it for nonlinear or non-Gaussian cases.

Here, a crucial distinction appears: \
> aleatoric uncertainty: irreducible randomness inherent to the system (the $epsilon_t$ and $eta_t$ terms), \
> epistemic uncertainty: uncertainty due to lack of knowledge about the hidden state $x_t$.

The goal of filtering is precisely to reduce epistemic uncertainty by incorporating observations, turning ignorance into _structure_.

\

== Modern diffusion models: learning by reversing noise

Today, diffusion models generate images, audio, and text by learning how to invert a diffusion process. The key insight is simple: if we know how to gradually destroy structure by adding noise, we can learn to reverse this process, recovering structure from pure randomness.
A simple forward process adds noise: $d x_t = sqrt(beta(t)) d W_t$, gradually destroying structure until only noise remains.

The model learns the reverse dynamics: $ d x_t = [f(x_t,t) - beta(t) nabla log p_t(x_t)] d t + beta(t) d W_t, $ where $nabla log p_t(x_t)$ is the score function (the gradient of the log-density at time $t$).

Generation is thus a controlled descent through noise, structure emerging from randomness. This is not a metaphor: it's literally stochastic dynamics run backward in time. 

\

== Conclusion: noise is the model

Across physics, finance, biology, and neuroscience, the same lesson appears:

Noise defines what is stable, what is learnable, and what is possible.
In many systems, removing noise does not reveal the truth, it removes the phenomenon itself.