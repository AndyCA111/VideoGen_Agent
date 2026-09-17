# Interactive trajectory demo

Open index.html after extracting the full archive, or run `python3 -m http.server 8000` in this folder.

## Changes
- Replaces the single MS composite teaser with six selectable recorded trajectories.
- Keeps the main VideoGen-Agent title and the original static figure.
- Left: SD1 and SD2 baseline slots, plus a task-specific single-pass limitation.
- Right: all original tool calls, references, intermediate artifacts, and final results from workflows.html.
- Play/pause, replay, direct step selection, keyboard task navigation, reduced-motion support and offscreen playback suspension.
- Default task is MS, the only task with both baseline videos supplied.

## Missing media
The archive contains SD2 baseline footage only for MS. PK, SI, MI, PS and CS show an explicit placeholder. Add the matching files and set each task's second `baseline` entry in js/demo-data.js; no layout change is needed. Never substitute an agent output for a baseline.

## Files to publish
index.html, css/trajectory-demo.css, js/demo-data.js, js/trajectory-demo.js and images/demo-posters/. Existing media and workflows.html remain required.

## Verification
JavaScript syntax checks passed. All six prompts and all 19 original tool calls were checked against workflows.html; all referenced local videos, images and posters exist. Actual browser and visual QA could not run because the browser binary download timed out in this environment.

The separate preview HTML embeds presentation code and posters but streams original videos and reference images from the public GitHub Pages site; it requires internet access. The complete website archive uses local assets.
