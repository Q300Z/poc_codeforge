# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - navigation [ref=e3]:
      - generic [ref=e5]:
        - generic [ref=e7]: CodeForge
        - generic [ref=e8]:
          - link "Showcase" [ref=e9] [cursor=pointer]:
            - /url: index.html
          - link "Layouts" [ref=e10] [cursor=pointer]:
            - /url: layouts.html
          - link "Canvas" [ref=e11] [cursor=pointer]:
            - /url: canvas.html
          - link "Media" [ref=e12] [cursor=pointer]:
            - /url: media.html
          - link "Carte" [ref=e13] [cursor=pointer]:
            - /url: map.html
          - link "Contact" [ref=e14] [cursor=pointer]:
            - /url: contact.html
  - main [ref=e15]:
    - generic [ref=e17]:
      - heading "Bienvenue" [level=1] [ref=e18]
      - paragraph [ref=e20]: Découvrez la puissance des Builders typés.
    - link "Naviguer vers la page layouts" [ref=e23] [cursor=pointer]:
      - /url: layouts.html
      - text: Voir les Layouts
  - contentinfo [ref=e24]:
    - generic [ref=e27]:
      - heading "CodeForge POC" [level=3] [ref=e28]
      - paragraph [ref=e29]: © 2026 - Le futur du rendu JSON.
```