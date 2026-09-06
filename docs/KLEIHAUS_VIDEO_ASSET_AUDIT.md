# Kleihaus video asset audit

Audit date: 2026-09-06. Scope: repository assets only. No website code or deployment configuration was changed.

## Capability result

The environment can provide **storyboard/assets and a reproducible edit specification**. It cannot currently export MP4 because `ffmpeg`, `ffprobe`, ImageMagick and ExifTool are not installed. No video footage, voice-over audio or licensed music was found. The single capability required for final rendering is an FFmpeg-capable editing environment, followed by human review of crops, text timing and audio.

AI-generated footage was not used or produced. The package uses only genuine repository assets.

## Inventory

| Asset group | Count / status | Use in campaign |
| --- | --- | --- |
| Original raster image files | 62 | Source stills and fallback references |
| Optimized image groups | 62 | WebP, AVIF and fallback copies |
| Total image files including variants | 418 | Existing website library; not duplicated for video |
| Responsive groups | 59 of 62 | Use source/fallback at edit resolution |
| Oversized image groups over 2 MB | 0 | No source group exceeds the existing warning threshold |
| Unreadable raster files | 0 | All 62 inspected files opened successfully |
| Exact duplicate original files | 10 duplicate pairs | Repeated kitchen views under project and sanitaryware names; treat as one visual moment per pair |
| Orientation | 17 landscape, 23 portrait, 22 square | Landscape for 16:9; portrait/square for 9:16 with careful crop |
| Logo | Present | End card and restrained opening mark |
| Genuine business/showroom photograph | Kleihaus structure image present | Use only as a supplied structure/showroom-context image; do not add unsupported address or hours |
| Video footage | Missing | BUSINESS CONTENT REQUIRED if live motion is desired |
| Staff/team/delivery/warehouse footage | Missing | BUSINESS CONTENT REQUIRED |
| Voice-over audio | Missing | Record approved human voice-over |
| Music | Missing | Use licensed or commissioned music only |

## Sufficient imagery

Tiles, sanitaryware, kitchen sinks and mixers, paints, adhesives/grout, finishing tools, installation support and kitchen project references have enough still imagery for a restrained slideshow/motion-graphics campaign. The supplied project photographs support visual reference for kitchen finishes and materials supplied or supported by Kleihaus; they do not prove installation responsibility, customer identity, location, date or result.

## Low quality or excluded material

No file was unreadable. Low-resolution square or portrait images should not be stretched into a wide hero shot; use them as short portrait frames or crop only where the visible subject remains intact. Exact duplicate kitchen photographs were not assigned separate scenes. No image was deleted. Website-ready variants strip/avoid sensitive metadata according to the existing image workflow, but ExifTool was unavailable for an independent metadata read in this environment.

## Required approval before publication

Confirm the final use rights for every supplied photograph, approve the script and voice-over, verify the public website/contact wording, and approve any project involvement language. Do not add brands, pricing, stock, testimonials, awards, customer names, precise locations or delivery promises without evidence.
