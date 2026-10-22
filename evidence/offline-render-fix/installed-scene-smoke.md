# Installed scene render smoke check

Date: 21 October 2026  
Environment: Codex in-app browser, loopback HTTP on 127.0.0.1:39624, desktop viewport 1280×720.  
Builds: installed generated offline entries from the Downloads repository.

| Scene | Route opened | Installed HTML SHA-256 | Browser errors | Capture |
| --- | --- | --- | ---: | --- |
| Syzygy | `offline-platforms/lunar-syzygy/index.html#/realms` | `14d5c2f35e950ec566feae29a3176362a914bfcfcf6a6dd6b23a4b782f50a39a` | 0 | `syzygy-rendering.png` |
| Gravity | `offline-platforms/lunar-gravity/index.html#/explore` | `94272e8fab0770ebea109963d3def7dedc7c4ef5fe06a25b0d9162a582c5c8ad` | 0 | `gravity-rendering.png` |
| Astrolabe | `offline-platforms/lunar-astrolabe/index.html#/explore` | `e72eef8f5d0c72854765dd9b5ea292446d3dac95bbb3e04ecf1515ca7273913a` | 0 | `astrolabe-rendering.png` |

Observed result: all three live WebGL scenes rendered their principal 3D subjects and visible scene controls. Each page loaded with no browser console errors. The Syzygy capture also confirms the restored glass HOLD control and current headline overlay experiment.

Syzygy interaction spot-check: held `HOLD TO TRIGGER PARADOX` for 2.5 seconds in the same local browser session. The opening reached 100%, replaced the checkbox with `REJOIN FRACTURE`, and exposed `SCROLL TO INSPECT · R TO REJOIN`. Clicked `REJOIN FRACTURE`; the control entered `REJOINING`, then returned to the unchecked HOLD control with opening at 0%. This confirms the basic joined → latched-open → rejoining → joined path once; it does not establish repeated-cycle stability, camera-corridor acceptance, or fracture realism.

Limitations: this was a static browser render smoke check served over loopback. It did not extract or validate ZIP archives, disable external network, verify SQLite/settings workflows, test direct `file://`, benchmark sustained performance, or establish final visual acceptance. It is not Q013 or Q014 acceptance evidence.

Backend boundary observed: the static server returned HTTP 404 for `/api/health?scene=syzygy`, `/api/health?scene=gravity`, `/api/health?scene=astrolabe` and `/api/content`. The visual pages still rendered, but live health/content endpoints are not available from this static launch. Do not describe these routes as backed by a running service.
