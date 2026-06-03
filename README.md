# VideoAgent — project page

Public project page for **VideoAgent: Multimodal Visual Reasoning with Agentic RL for Video Generation**.

Live site: <https://andyca111.github.io/VideoGen_Agent/> (enable GitHub Pages on `main` branch / root)

## Structure

```
.
├── index.html        # main page
├── css/style.css     # styling (single file, no JS dependencies)
├── images/method.png # method overview figure (converted from PDF)
└── videos/<cat>/     # sample baseline videos per task category
```

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Enable GitHub Pages

In repo Settings → Pages: set source to `main` branch / `/ (root)`. The site will be live at
`https://andyca111.github.io/VideoGen_Agent/` within a minute.

## TODO

- Add arXiv link once the paper is posted.
- Fill in author list + affiliations.
- Populate VideoAgent columns in the gallery once agent-generated videos are finalised.
- Update per-category results table as runs complete.
