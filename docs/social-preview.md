# OVAMO sharing preview

## Deliverable

- **Image:** [`assets/ovamo-share-v1.jpg`](../assets/ovamo-share-v1.jpg)
- **Export:** 1,200 × 630 pixels, RGB JPEG, 190,478 bytes.
- **Public URL:** <https://tomislavrupic.github.io/ovamo/assets/ovamo-share-v1.jpg>
- **Pages:** the landing page and `concepts.html` each have their own title, description and canonical URL, with the same branded image.

The banner uses the cream, plum and coral identity, the lowercase OVAMO wordmark, “Male stvari. Dobar dan.”, and a generated shop concept. The scene does not depict confirmed company premises.

## Implementation

Open Graph metadata is authored directly in each HTML `<head>`: title, description, website type, canonical URL, locale, site name, public image URL, MIME type, dimensions and alternative text. The image URL is absolute and HTTPS. A `summary_large_image` card and matching title, description, image and alternative text are also included for consumers of Twitter Card metadata.

The [Open Graph protocol](https://ogp.me/) defines the image property and its structured width, height, type and alternative-text fields. These tags are available before JavaScript runs. The public preview retains its search-engine `noindex` instruction.

This configures the site's preview information; each receiving service decides when to fetch it, how to crop it and whether to retain an earlier preview. An already-sent message is not a verification of the newly deployed metadata. Verify the public image and page source, then compose a fresh share in the intended service. No messages are sent automatically by this project.

## Image provenance and generation prompt

Generated on 21 October 2026 with the **built-in image-generation tool**. The original generated PNG was exported as a smaller JPEG without cropping. A neutral cream one-pixel margin preserves the full composition at the sharing dimensions.

Final prompt:

> Use case: ads-marketing. Asset type: the official social link-sharing banner for the OVAMO design-prototype website. Create a polished wide landscape banner at a 1.91:1 aspect ratio, ideally 1200x630 composition. Brand: OVAMO, a welcoming Croatian convenience, premium snack and souvenir retail concept for Classic Shop. Color palette exactly warm cream #FFF5E7, deep plum #342638, coral #F47850. Composition: generous cream negative space on the left 58%; beautifully art-directed photorealistic miniature storefront vignette on the right 42%, warm Croatian limestone shop entrance, cream and coral awning, wooden displays with neutral soft-drink cans, chocolate boxes and a canvas tote, soft Mediterranean sunlight. Large bold lowercase geometric sans-serif wordmark 'ovamo' in plum, with a small elegant coral northeast arrow after the wordmark. Below it, clean prominent dark-plum two-line Croatian tagline exactly: 'Male stvari.' and 'Dobar dan.' Small secondary line at lower left exactly: 'Trgovine. Aplikacije. Povezano poslovanje.' The storefront fascia also says 'ovamo', simple and crisp. Crisp professional editorial design, confident spacing, premium approachable feel, restrained detail, high contrast, readable as a small WhatsApp preview. All key text and the full logo comfortably inside a central safe area with at least 10% margin from image edges. This is one finished flat banner, no device frame, no multi-panel board, no social-network UI, no invented address, no phone number, no third-party logos, no tobacco, no alcohol, no watermarks. Keep the exact words accurate.

