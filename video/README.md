# Standalone marketing drafts

Run `node video/render.mjs` with `FFMPEG_BIN` pointing to an FFmpeg executable with libx264 and drawtext support. `VIDEO_FONT` optionally selects an installed TrueType font; the Windows default is Segoe UI.

This renderer produces silent 15-second and 30-second 1080x1920 social drafts and a 60-second 1920x1080 brand draft at 30 fps. Photos retain their proportions inside a white editorial frame with short captions, restrained fades and a website end card. Source photos are not modified. Each output is decoded as a validation step and includes a poster plus `render-report.json`.

Outputs are in `video/exports/`; intermediate clips are in `video/.render/`. Both directories are ignored by Git, and no output is part of the website build or homepage. The source script is versioned for reproducibility. On this machine FFmpeg was obtained from pinned imageio-ffmpeg 0.6.0 into a temporary directory, without changing website dependencies.

The original edit plan is creative guidance. The renderer's selected shots, timings and silent audio policy describe these first exports. It excludes the structure/showroom-style image pending provenance confirmation, plus any staff/delivery imagery without evidence. Product photographs and supplied project references still need owner approval for public marketing use. No music, voice-over, customer identities, project locations, prices or stock claims are added.

Before publishing externally: approve photo usage rights, review all scenes and captions, and provide licensed music or approved voice-over if desired. These are first review exports, not automatically published campaigns.
