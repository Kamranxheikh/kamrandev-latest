# Hero reel screenshots

One `.webp` per project, named after its slug in `src/lib/site.ts`.
`src/app/page.tsx` only puts a project in the reel once its file exists here,
so a missing screenshot shortens the reel rather than rendering a broken frame.

Reel order:

| # | slug                          | file                                | status  |
|---|-------------------------------|-------------------------------------|---------|
| 1 | `citygate-financial-planning` | citygate-financial-planning.webp    | present |
| 2 | `ai-tool-camp`                | ai-tool-camp.webp                   | present |
| 3 | `huckleberrys-restaurant`     | huckleberrys-restaurant.webp        | present |
| 4 | `rose-wealth`                 | rose-wealth.webp                    | present |
| 5 | `prophero-real-estate-crm`    | prophero-real-estate-crm.webp       | present |

## Spec

880 x 1320 (2:3), cropped from the very top of a 1920-wide full-page capture —
hero plus the section beneath it. The reel scrolls each image by -50%, which is
what reveals that second screenful. Encoded with sharp:

    .extract({ left: 0, top: 0, width: 1920, height: 2880 })
    .resize(880, 1320, { fit: 'fill' })
    .webp({ quality: 76, effort: 6 })

## Note on rose-wealth and prophero

These two were recovered from a chat transcript, where the originals had
already been downscaled to 464px and 427px wide. They are upscaled ~2x to reach
880 and are visibly softer than the other three, which came from full 1920-wide
captures. Re-cut them from the originals if you still have them.
