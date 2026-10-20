# Physical and optical models — final project revision, 17 October 2026

These three independent environments run real Three.js geometry and WebGL2
shaders. Reference screenshots guide the camera and design; no reference image
is used as a backdrop or a substitute for the models.

## Syzygy

A normalized, externally driven cohesive interface controls opening. Before
failure its traction is T=(1-D) Kc q. Damage follows irreversible maximum
separation: no damage below d0=.085; linear softening to zero at df=.44.
Kc=86, actuator stiffness Ka=196, mass=1, damping=28. Complete separation
dissipates Gc=Kc*d0*df/2=1.6082 normalized energy units.

Steps at most 1/240 second use midpoint kinetic/damping terms and a discrete
gradient of cohesive potential plus fracture dissipation. Moving-actuator work
is tracked explicitly. CPU checks execute the actual production integrator:
joined startup, held opening, release, bounded damage, deterministic repeat,
60/240 Hz convergence, and energy balance for the isolated interface.

240 instanced fragments receive authored impulses linked to release energy,
then integrate central acceleration. Dust, material shading, fracture shelves,
rim scattering and optical flare are live effects. Rejoining/resetting the
bonds is an externally imposed interactive reset. This is not a calibrated
whole-planet elastic/thermal fracture model. The interface energy check excludes
ejecta and is not a conservation claim for the complete visual scene.

## Gravity

Mercury density 13545.9 kg/m3, surface tension .485 N/m, kinematic viscosity
1.15e-7 m2/s and effective inverted gravity .62 m/s2 define finite-depth
linear surface-wave dispersion:
omega^2=(g*k + sigma*k^3/rho)*tanh(k*h), with h=.65 m.
Six geometric modes and 28 normal-field modes carry individual frequencies.
The prescribed spectrum is maintained externally.

160 GPU-instanced droplets follow analytic constant acceleration. Their
volume-preserving l=2 shape oscillation uses omega^2=8*sigma/(rho*r^3).
Surface impacts launch expanding dispersive packets with viscous attenuation
plus an explicit phenomenological loss envelope. These effects do not solve
Navier–Stokes, collisions, coalescence or the stability of a suspended ocean.

A mirrored camera and oblique clip plane rasterize the actual nearby geometry
into a reflection target. Alpha separates physical near-field coverage from
far-field environment illumination. Reflection updates are capped at 20/30 Hz
by resolution; ripples and main rendering update independently. Surface normal
distortion approximates the curved reflection. This is not ray tracing.

## Astrolabe

The crescent is a closed custom swept mesh with sculpted impact relief,
lunar albedo, crater normals and fine stone normals. An organic shared boundary
discards solid rock while revealing actual triangulated wire geometry.
Independent ring transforms change occlusion and respond to camera movement.

A finite spherical corona uses fourteen ray samples, shell emissivity,
Beer–Lambert attenuation and geometric eclipse occultation. A narrow real 3D
limb supplements it. Scene materials use raster PBR, environment illumination,
shadow maps, HDR bloom and tone mapping. There is no full spectral
multiple-scattering/path-traced light transport or astronomical plasma solver.

## Audio, accuracy and verification scope

Audio is authored procedural sonification, muted until a user gesture.
It is not an original soundtrack or literal sound propagation through vacuum.
Images cannot establish original sound, speed or trajectories.

Photogrammetry material maps provide fine rock surface data; large geometry,
camera, light placement and animation remain authored. Models and lighting
still differ from the reference renders. Photographic equivalence and a 100%
visual match have not been achieved. Actual GPU, responsive layout, frame
pacing and packaging observations are recorded separately in VALIDATION.md.

## Governing-law references

- MIT OpenCourseWare, 18.357 Interfacial Phenomena, Lecture 19, Water waves:
  https://ocw.mit.edu/courses/18-357-interfacial-phenomena-fall-2010/229785489c81648500f89044a97c0e51_MIT18_357F10_Lecture19.pdf
  Supports the finite-depth linear gravity/capillary-wave relation; it does not
  establish the physical stability of this fictional inverted environment.
- Abaqus documentation, traction-separation cohesive elements:
  https://abaqus.uclouvain.be/English/SIMACAEELMRefMap/simaelm-c-cohesivebehavior.htm
  Background on linear elastic response, damage and softening; this project
  implements its own scalar normalized interface, not the Abaqus solver.
- Exploring droplet oscillation dynamics in surface tension measurements,
  Experiments in Fluids (2024), DOI 10.1007/s00348-024-03926-6:
  https://link.springer.com/article/10.1007/s00348-024-03926-6
  Background on the second-mode Rayleigh frequency and limits of the ideal
  spherical-droplet approximation.

## Static material optimization in the current revision

The fixed 24-impact material relief is sampled from an offline generated RG16
2048x1024 spherical height atlas with linear interpolation, instead of repeatedly
evaluating the impact loop in each fragment. The original seeded branching
fault paths and gradients are rasterized into a 4K texture before launch.
These are material fields on live geometry, not pre-rendered scene imagery.
Fracture displacement, shard motion, dynamic emission and camera lighting
continue to run in real time. Approximation errors and startup milestones are
reported in VALIDATION.md; this change does not certify sustained frame pacing.

## Current art-direction calibration

The Syzygy cohesive generalized opening q remains normalized. The rendered
center gap estimate is .29*q + 3*sin(.032*q), using shared shell/interior-wall
displacement and matching light offsets. It is an authored visual calibration,
not a physical lunar distance measurement. Gravity terrain self-shadows use a
matching perimeter in the light depth pass. Distant fog uses six sampled
in-scattering steps plus a stated aerial extinction envelope. These changes
improve geometric/optical consistency without adding full physical solvers.
