# 📄 Spécification du Format JSON CodeForge

Ce document détaille la structure attendue pour les fichiers JSON traduits par **CodeForge**.

---

## 🏗️ Structure Globale

Le moteur accepte deux types de structures :
1.  **SiteNode** (Multi-page) : La structure recommandée pour un site complet.
2.  **ScreenDraft** (Auto-détecté) : Format tiers automatiquement transformé par le moteur.
3.  **Node** (Composant unique) : Utilisé pour le rendu direct de fragments.

### SiteNode (Le Site Complet)
| Propriété | Type | Description |
| :--- | :--- | :--- |
| `meta` | `Object` | Métadonnées globales (`appName`, `version`, `createdAt`). |
| `style` | `Object` | Tokens de design globaux hérités par toutes les pages. |
| `layout` | `Object` | Composants partagés (`header`, `footer`) affichés sur chaque page. |
| `pages` | `Array` | Liste des pages du site avec leur `slug` et leur `content`. |

### Node (L'atome de base)
Chaque élément de la page suit cette structure :
| Propriété | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` | **OBLIGATOIRE**. Identifiant unique. |
| `type` | `string` | **OBLIGATOIRE**. Nom du composant (ex: "Button", "Stack"). |
| `meta` | `Object` | **OBLIGATOIRE**. Paramètres spécifiques et métadonnées. |
| `style` | `Object` | (Optionnel) Propriétés visuelles. **Omis si vide.** |
| `children` | `Array` | (Optionnel) Enfants. **Omis si vide.** |

---

## ♿ Accessibilité (A11y)

CodeForge intègre l'accessibilité nativement. Ces clés dans `meta` sont traduites en attributs HTML standards :
- `audioDescription` : Traduit en `aria-label`. Description lue par les lecteurs d'écran.
- `ariaRole` : Traduit en `role`. Définit la fonction de l'élément (ex: "alert").
- `ariaHidden` : Traduit en `aria-hidden="true"`. Pour cacher les éléments décoratifs.

---

## 🎨 Système de Style

CodeForge supporte des propriétés de mise en page natives et des Design Tokens.

### Propriétés de Layout (Héritées par tous)
Ces propriétés sont directement mappées vers des styles CSS `px` ou natifs :
`width`, `height`, `min-width`, `max-width`, `position`, `top`, `left`, `right`, `bottom`, `z-index`, `opacity`, `border-radius`.

**Nouveauté :** Support des coordonnées `x` et `y` (alias de `left` et `top`) pour faciliter le positionnement absolu.

👉 **[Consulter le Guide de Style Complet (STYLE_GUIDE.md)](./STYLE_GUIDE.md)**

---

## 🧱 Schémas des Composants

### Page (Racine)
Composant racine de chaque page générée.

**Propriétés Spécifiques (`meta`)**
| Propriété | Type | Requis | Description |
| :--- | :--- | :--- | :--- |
| `appName` | `string` | Oui | Nom de l'application (balise `<title>`). |
| `debug` | `boolean` | Non | Active les contours en pointillés pour le débogage visuel. |

**Exemple**
```json
{
  "id": "home-page",
  "type": "Page",
  "meta": {
    "appName": "Mon Portfolio",
    "debug": true,
    "version": "1.0.0",
    "createdAt": "2026-01-27T10:00:00Z"
  }
}
```

### AppBar (Navigation)
Barre de navigation fixe en haut de page.

**Propriétés Spécifiques (`meta`)**
| Propriété | Type | Requis | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | Non | Titre affiché à gauche (Logo textuel). |
| `links` | `Array<{label, href}>` | Non | Liens de navigation. |

**Exemple**
```json
{
  "id": "nav",
  "type": "AppBar",
  "meta": {
    "title": "CodeForge",
    "links": [
      { "label": "Accueil", "href": "/" },
      { "label": "Services", "href": "/services" }
    ]
  },
  "style": { "appbar-bg": "#ffffff" }
}
```

### Hero (Bannière)
Section d'introduction avec titre et sous-titre.

**Propriétés Spécifiques (`meta`)**
| Propriété | Type | Requis | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | Oui | Titre principal (H1). |
| `subtitle` | `string` | Non | Sous-titre ou slogan. |

**Exemple**
```json
{
  "id": "hero-1",
  "type": "Hero",
  "meta": {
    "title": "Bienvenue",
    "subtitle": "Créez des interfaces rapidement."
  },
  "style": { "hero-bg": "#f3f4f6", "hero-text": "#111827" }
}
```

### Title (Titre)
Titre sémantique (H1-H6).

**Propriétés Spécifiques (`meta`)**
| Propriété | Type | Requis | Description |
| :--- | :--- | :--- | :--- |
| `content` | `string` | Oui | Texte du titre. |
| `level` | `number` | Non | Niveau hiérarchique (1 à 6). Défaut : 1. |

**Exemple**
```json
{
  "id": "t1",
  "type": "Title",
  "meta": {
    "content": "Nos Services",
    "level": 2
  },
  "style": { "title-text": "#2563eb", "text-align": "center" }
}
```

### Text (Paragraphe)
Bloc de texte simple.

**Propriétés Spécifiques (`meta`)**
| Propriété | Type | Requis | Description |
| :--- | :--- | :--- | :--- |
| `content` | `string` | Oui | Contenu textuel. |
| `tag` | `string` | Non | Balise HTML (`p`, `span`, `div`). Défaut : `p`. |

**Exemple**
```json
{
  "id": "txt-1",
  "type": "Text",
  "meta": {
    "content": "Lorem ipsum dolor sit amet.",
    "tag": "p"
  },
  "style": { "font-size": "1.1rem", "text-color": "#4b5563" }
}
```

### Button (Bouton)
Élément interactif (lien ou action).

**Propriétés Spécifiques (`meta`)**
| Propriété | Type | Requis | Description |
| :--- | :--- | :--- | :--- |
| `label` | `string` | Oui | Libellé du bouton. |
| `action` | `string` | Non | URL ou script JS. |

**Exemple**
```json
{
  "id": "btn-cta",
  "type": "Button",
  "meta": {
    "label": "Contactez-nous",
    "action": "/contact",
    "audioDescription": "Aller à la page contact"
  },
  "style": { "btn-bg": "#dc2626", "btn-text": "#ffffff", "font-size": "18px" }
}
```

### Image
Affichage d'image simple.

**Propriétés Spécifiques (`meta`)**
| Propriété | Type | Requis | Description |
| :--- | :--- | :--- | :--- |
| `src` | `string` | Oui | URL de l'image. |
| `alt` | `string` | Oui | Texte alternatif pour l'accessibilité. |

**Exemple**
```json
{
  "id": "img-1",
  "type": "Image",
  "meta": {
    "src": "/assets/photo.jpg",
    "alt": "Photo de l'équipe"
  },
  "style": { "border-radius": "8px", "object-fit": "cover" }
}
```

### Video
Lecteur vidéo HTML5 accessible.

**Propriétés Spécifiques (`meta`)**
| Propriété | Type | Requis | Description |
| :--- | :--- | :--- | :--- |
| `src` | `string` | Oui | URL de la vidéo. |
| `poster` | `string` | Non | Image d'aperçu. |
| `controls` | `boolean` | Non | Affiche les contrôles (Défaut: true). |
| `autoplay` | `boolean` | Non | Lecture automatique (Défaut: false). |
| `muted` | `boolean` | Non | Coupe le son (Requis pour autoplay). |
| `loop` | `boolean` | Non | Lecture en boucle. |
| `tracks` | `Array` | Non | Sous-titres : `{ src, kind, label, srclang }`. |

**Exemple**
```json
{
  "id": "vid-1",
  "type": "Video",
  "meta": {
    "src": "presentation.mp4",
    "controls": true,
    "tracks": [
      { "kind": "captions", "src": "subs.vtt", "label": "Français", "srclang": "fr" }
    ]
  },
  "style": { "width": "100%", "border-radius": "12px" }
}
```

### Carousel
Diaporama d'images.

**Propriétés Spécifiques (`meta`)**
| Propriété | Type | Requis | Description |
| :--- | :--- | :--- | :--- |
| `items` | `Array` | Oui | Liste : `{ src, alt, title }`. |
| `autoPlay` | `boolean` | Non | Défilement automatique (Défaut: false). |
| `interval` | `number` | Non | Temps en ms entre chaque slide (Défaut: 5000). |

**Exemple**
```json
{
  "id": "slider",
  "type": "Carousel",
  "meta": {
    "autoPlay": true,
    "interval": 3000,
    "items": [
      { "src": "slide1.jpg", "alt": "Vue 1" },
      { "src": "slide2.jpg", "alt": "Vue 2" }
    ]
  },
  "style": { "height": "400px", "carousel-color": "#ffffff" }
}
```

### Box (Conteneur Générique)
Div simple pour le style ou le positionnement. Pas de props spécifiques.

**Exemple**
```json
{
  "id": "box-1",
  "type": "Box",
  "meta": {},
  "style": { "width": "100px", "height": "100px", "box-bg": "red" }
}
```

### Container (Conteneur Centré)
Conteneur avec largeur maximale et marges automatiques. Pas de props spécifiques.

**Exemple**
```json
{
  "id": "cont-1",
  "type": "Container",
  "meta": {},
  "children": []
}
```

### Section (Section)
Bloc sémantique de haut niveau avec padding vertical. Pas de props spécifiques.

**Exemple**
```json
{
  "id": "sect-1",
  "type": "Section",
  "meta": {},
  "style": { "section-bg": "#fafafa", "section-py": "60px" }
}
```

### Grid (Grille)
Mise en page en grille.

**Propriétés Spécifiques (`meta`)**
| Propriété | Type | Requis | Description |
| :--- | :--- | :--- | :--- |
| `cols` | `number` | Non | Nombre de colonnes (Défaut: 2). |
| `gap` | `number` | Non | Espacement entre les éléments (Défaut: 8). |

**Exemple**
```json
{
  "id": "grid-1",
  "type": "Grid",
  "meta": { "cols": 3, "gap": 4 },
  "children": []
}
```

### Stack (Flex)
Mise en page flexible linéaire.

**Propriétés Spécifiques (`meta`)**
| Propriété | Type | Requis | Description |
| :--- | :--- | :--- | :--- |
| `direction` | `string` | Non | `vertical` ou `horizontal`. |
| `align` | `string` | Non | Alignement transversal (`center`, `start`, ...). |
| `justify` | `string` | Non | Alignement principal (`between`, `center`, ...). |
| `gap` | `number` | Non | Espacement. |

**Exemple**
```json
{
  "id": "stack-1",
  "type": "Stack",
  "meta": { "direction": "horizontal", "align": "center", "gap": 4 },
  "children": []
}
```

---

## 🔌 Importation Tierce (Adaptateurs)

CodeForge détecte automatiquement si le JSON fourni provient d'un outil externe.

### Format ScreenDraft
Si le moteur détecte une structure contenant une clé `components` à la racine (au lieu de `pages`), il applique automatiquement l'adaptateur ScreenDraft pour convertir les positions absolues et les types de composants.