# Video

## 🎯 Objectif
Le composant **Video** est un lecteur HTML5 complet et accessible. Il supporte toutes les options natives (contrôles, autoplay, muet, boucle) ainsi que l'ajout de pistes de sous-titres (`<track>`).

## ⚙️ Propriétés (Meta)
| Propriété | Type | Description |
| :--- | :--- | :--- |
| `src` | `string` | URL de la source vidéo (mp4, webm, etc.). |
| `poster` | `string` | Image d'aperçu affichée avant la lecture. |
| `controls` | `boolean` | Affiche les boutons de contrôle (défaut: true). |
| `tracks` | `Array` | Liste de sous-titres `{ src, kind, label, srclang }`. |
| `autoplay` / `muted` | `boolean` | Options de lecture (le muet est requis pour l'autoplay). |

## 🎨 Design Tokens (Style)
| Token | Description |
| :--- | :--- |
| `object-fit` | Mode de redimensionnement (`cover`, `contain`). |

## 🛠 Déclaration avec Builder
```typescript
const video = new VideoBuilder("intro-vid")
  .withSrc("presentation.mp4")
  .withPoster("thumb.jpg")
  .addTrack({ src: "subs.vtt", kind: "captions", label: "Français", srclang: "fr" })
  .withOptions({ controls: true, muted: true })
  .build();
```

## 📄 Déclaration JSON
```json
{
  "id": "intro-vid",
  "type": "Video",
  "meta": {
    "src": "presentation.mp4",
    "poster": "thumb.jpg",
    "controls": true,
    "tracks": [
      { "src": "subs.vtt", "kind": "captions", "label": "Français", "srclang": "fr" }
    ]
  }
}
```

## 🌐 Sortie HTML
```html
<video src="presentation.mp4" poster="thumb.jpg" controls muted id="intro-vid" class="w-full h-auto ...">
  <track kind="captions" src="subs.vtt" label="Français" srclang="fr" />
  Votre navigateur ne supporte pas la lecture de vidéos.
</video>
```
