# 📄 Spécification du Format JSON CodeForge

Ce document détaille la structure attendue pour les fichiers JSON traduits par **CodeForge**.

---

## 🏗️ Structure Globale

Le moteur accepte deux types de structures :
1.  **SiteNode** (Multi-page) : La structure recommandée pour un site complet.
2.  **Node** (Composant unique) : Utilisé pour le rendu direct de fragments.

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

#### Métadonnées OBLIGATOIRES dans `meta`
- `version` : Version du composant (ex: `"1.2.0"`).
- `createdAt` : Date d'ajout du composant au format ISO.

---

## ♿ Accessibilité (A11y)

CodeForge intègre l'accessibilité nativement. Ces clés dans `meta` sont traduites en attributs HTML standards :
- `audioDescription` : Traduit en `aria-label`. Description lue par les lecteurs d'écran.
- `ariaRole` : Traduit en `role`. Définit la fonction de l'élément (ex: "alert").
- `ariaHidden` : Traduit en `aria-hidden="true"`. Pour cacher les éléments décoratifs.

---

## 🎨 Système de Style

### 1. Utilitaires de Layout (Disponibles partout)
S'appliquent directement en tant que styles CSS natifs :
- **Dimensions** : `width`, `height`, `min-width`, `min-height`, `max-width`, `max-height`.
- **Position** : `position` (ex: "absolute"), `top`, `left`, `right`, `bottom`, `z-index`, `transform`.
- **Comportement** : `overflow`, `overflow-x`, `overflow-y`, `flex-shrink`, `flex-grow`, `opacity`, `border-radius`.

### 2. Normalisation des Unités
- **Nombres** : Ajout automatique de `px` (ex: `250` -> `250px`).
- **Chaînes** : Unités libres (ex: `"50%"` ou `"2rem"`).

---

## 🧱 Schémas des Composants

### Page (Racine)
Composant parent obligatoire pour chaque page.

**Définition des props (`meta`)**
| Propriété | Type | Requis | Description |
| :--- | :--- | :--- | :--- |
| `appName` | `string` | Oui | Nom de l'application (balise `<title>`). |
| `debug` | `boolean` | Non | Active les contours en pointillés (debug visuel). |

**Exemple**
```json
{
  "id": "root-page",
  "type": "Page",
  "meta": {
    "appName": "Mon Projet",
    "debug": false,
    "version": "1.4.0",
    "createdAt": "2026-01-26T14:00:00Z"
  }
}
```

### AppBar (Navigation)
Barre de navigation supérieure (Sticky) avec support mobile.

**Définition des props (`meta`)**
| Propriété | Type | Requis | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | Non | Titre affiché à gauche (Défaut: "My App"). |
| `links` | `Array` | Non | Liste de liens `{ label: string, href: string }`. |

**Tokens de Style**
`appbar-bg`, `appbar-text`, `appbar-border`, `backdrop-filter`.

**Exemple**
```json
{
  "id": "nav",
  "type": "AppBar",
  "meta": {
    "title": "CodeForge",
    "links": [
      { "label": "Accueil", "href": "/" },
      { "label": "Contact", "href": "contact.html" }
    ],
    "version": "1.1.0",
    "createdAt": "2026-01-26T14:00:00Z"
  }
}
```

### Hero (Bannière)
Bandeau d'accueil sémantique à fort impact.

**Définition des props (`meta`)**
| Propriété | Type | Requis | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | Oui | Titre principal (H1). |
| `subtitle` | `string` | Non | Sous-titre descriptif. |

**Tokens de Style**
`hero-bg`, `hero-text`, `section-py`.

**Exemple**
```json
{
  "id": "hero",
  "type": "Hero",
  "meta": {
    "title": "Bienvenue",
    "subtitle": "Découvrez notre solution.",
    "version": "1.3.0",
    "createdAt": "2026-01-26T14:00:00Z"
  },
  "style": {
    "hero-bg": "#f3f4f6",
    "section-py": 80
  }
}
```

### Title (Titre)
Composant de titre sémantique (H1-H6) avec tailles responsives.

**Définition des props (`meta`)**
| Propriété | Type | Requis | Description |
| :--- | :--- | :--- | :--- |
| `content` | `string` | Oui | Le texte du titre (si pas d'enfants). |
| `level` | `number` | Non | Niveau sémantique 1 à 6 (Défaut: 1). |

**Tokens de Style**
`font-size`, `text-color`, `bg-color`, `font-weight`, `text-align`.

**Exemple**
```json
{
  "id": "t1",
  "type": "Title",
  "meta": {
    "content": "Mon Titre",
    "level": 2,
    "version": "1.2.0",
    "createdAt": "2026-01-26T14:00:00Z"
  },
  "style": {
    "text-align": "center",
    "text-color": "#1f2937"
  }
}
```

### Text (Paragraphe)
Bloc de texte courant.

**Définition des props (`meta`)**
| Propriété | Type | Requis | Description |
| :--- | :--- | :--- | :--- |
| `content` | `string` | Oui | Le contenu textuel. |
| `tag` | `string` | Non | Balise : "p", "span" ou "div" (Défaut: "p"). |

**Tokens de Style**
`font-size`, `text-color`, `line-height`.

**Exemple**
```json
{
  "id": "txt1",
  "type": "Text",
  "meta": {
    "content": "Ceci est un paragraphe de description.",
    "tag": "p",
    "version": "1.0.0",
    "createdAt": "2026-01-26T14:00:00Z"
  }
}
```

### Button (Bouton)
Élément interactif (lien ou bouton).

**Définition des props (`meta`)**
| Propriété | Type | Requis | Description |
| :--- | :--- | :--- | :--- |
| `label` | `string` | Oui | Texte du bouton. |
| `action` | `string` | Non | URL (lien) ou script JS (onclick). |

**Tokens de Style**
`btn-bg`, `btn-text`, `bg-color` (legacy), `text-color` (legacy).

**Exemple**
```json
{
  "id": "btn",
  "type": "Button",
  "meta": {
    "label": "En savoir plus",
    "action": "/about",
    "audioDescription": "Naviguer vers la page À propos",
    "version": "1.2.0",
    "createdAt": "2026-01-26T14:00:00Z"
  }
}
```

### Box (Bloc générique)
Div simple pour la structure ou le background.

**Tokens de Style**
`bg-color`, `width`, `height`, `border-radius`, `flex-shrink`.

**Exemple**
```json
{
  "id": "box1",
  "type": "Box",
  "meta": {
    "version": "1.1.0",
    "createdAt": "2026-01-26T14:00:00Z"
  },
  "style": {
    "width": 100,
    "height": 100,
    "bg-color": "#ff0000"
  }
}
```

### Container (Conteneur centré)
Bloc centré horizontalement avec largeur max.

**Tokens de Style**
`container-width`.

**Exemple**
```json
{
  "id": "cont1",
  "type": "Container",
  "meta": {
    "version": "1.1.0",
    "createdAt": "2026-01-26T14:00:00Z"
  },
  "children": []
}
```

### Section (Section pleine page)
Bloc structurel pour découper verticalement la page.

**Tokens de Style**
`section-bg`, `section-py`.

**Exemple**
```json
{
  "id": "sect1",
  "type": "Section",
  "meta": {
    "version": "1.1.0",
    "createdAt": "2026-01-26T14:00:00Z"
  },
  "style": {
    "section-bg": "#ffffff",
    "section-py": 60
  },
  "children": []
}
```

### Grid (Grille Responsive)
Système de colonnes CSS Grid.

**Définition des props (`meta`)**
| Propriété | Type | Requis | Description |
| :--- | :--- | :--- | :--- |
| `cols` | `number` | Non | Colonnes desktop (1-12, défaut 2). |
| `gap` | `number` | Non | Espacement Tailwind 0-16 (Défaut: 8). |

**Tokens de Style**
`grid-gap`, `grid-bg`.

**Exemple**
```json
{
  "id": "grid1",
  "type": "Grid",
  "meta": {
    "cols": 3,
    "gap": 6,
    "version": "1.1.0",
    "createdAt": "2026-01-26T14:00:00Z"
  },
  "children": []
}
```

### Stack (Flexbox)
Alignement vertical ou horizontal d'éléments.

**Définition des props (`meta`)**
| Propriété | Type | Requis | Description |
| :--- | :--- | :--- | :--- |
| `direction` | `string` | Non | "vertical" ou "horizontal" (Défaut: vertical). |
| `align` | `string` | Non | Cross-axis: "start", "center", "end", "stretch". |
| `justify` | `string` | Non | Main-axis: "start", "center", "end", "between". |
| `gap` | `number` | Non | Espacement Tailwind 0-16 (Défaut: 6). |

**Tokens de Style**
`stack-gap`.

**Exemple**
```json
{
  "id": "stack1",
  "type": "Stack",
  "meta": {
    "direction": "horizontal",
    "align": "center",
    "gap": 4,
    "version": "1.1.0",
    "createdAt": "2026-01-26T14:00:00Z"
  },
  "children": []
}
```

### Image
Affichage d'image optimisé.

**Définition des props (`meta`)**
| Propriété | Type | Requis | Description |
| :--- | :--- | :--- | :--- |
| `src` | `string` | Oui | URL de l'image. |
| `alt` | `string` | Oui | Texte alternatif (Accessibilité). |

**Tokens de Style**
`border-radius`, `object-fit`.

**Exemple**
```json
{
  "id": "img1",
  "type": "Image",
  "meta": {
    "src": "https://example.com/photo.jpg",
    "alt": "Description de l'image",
    "version": "1.0.0",
    "createdAt": "2026-01-26T14:00:00Z"
  },
  "style": {
    "border-radius": "8px"
  }
}
```

### Video
Lecteur vidéo HTML5.

**Définition des props (`meta`)**
| Propriété | Type | Requis | Description |
| :--- | :--- | :--- | :--- |
| `src` | `string` | Oui | URL de la vidéo. |
| `poster` | `string` | Non | Image de couverture. |
| `controls` | `boolean` | Non | Affiche les contrôles (Défaut: true). |
| `autoplay` | `boolean` | Non | Lecture auto (Défaut: false). |
| `loop` | `boolean` | Non | Boucle (Défaut: false). |
| `muted` | `boolean` | Non | Muet (Défaut: false). |

**Tokens de Style**
`border-radius`.

**Exemple**
```json
{
  "id": "vid1",
  "type": "Video",
  "meta": {
    "src": "video.mp4",
    "controls": true,
    "muted": true,
    "version": "1.0.0",
    "createdAt": "2026-01-26T14:00:00Z"
  }
}
```

### Carousel
Carrousel d'images interactif.

**Définition des props (`meta`)**
| Propriété | Type | Requis | Description |
| :--- | :--- | :--- | :--- |
| `items` | `Array` | Oui | Liste d'objets `{ src, alt, title }`. |
| `autoPlay` | `boolean` | Non | Défilement auto (Défaut: false). |
| `interval` | `number` | Non | Temps en ms (Défaut: 5000). |

**Tokens de Style**
`height`, `carousel-color`, `border-radius`.

**Exemple**
```json
{
  "id": "car1",
  "type": "Carousel",
  "meta": {
    "items": [
      { "src": "img1.jpg", "alt": "Slide 1", "title": "Titre 1" },
      { "src": "img2.jpg", "alt": "Slide 2" }
    ],
    "autoPlay": true,
    "interval": 3000,
    "version": "1.0.1",
    "createdAt": "2026-01-26T14:00:00Z"
  },
  "style": {
    "height": "400px",
    "carousel-color": "#ffffff"
  }
}
```
