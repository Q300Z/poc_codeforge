# 📄 Spécification du Format JSON CodeForge

Ce document détaille la structure attendue pour les fichiers JSON traduits par **CodeForge**.

---

## 🏗️ Structure Globale

Le moteur accepte deux types de structures :
1.  **SiteNode** (Multi-page) : La structure recommandée pour un site complet.
2.  **Node** (Composant unique) : Utilisé pour le rendu direct de fragments.

### Node (L'atome de base)
Chaque élément de la page suit cette structure :
| Propriété | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` | Identifiant unique (requis pour l'A11y et le suivi). |
| `type` | `string` | Nom du composant (ex: "Button", "Stack"). |
| `meta` | `Object` | Paramètres spécifiques et métadonnées de versioning. |
| `style` | `Object` | Propriétés visuelles et Design Tokens. |
| `children` | `Array` | (Optionnel) Tableau d'objets `Node` enfants. |

#### Métadonnées Obligatoires dans `meta`
Chaque nœud doit inclure ces champs pour assurer la traçabilité et l'accessibilité :
- `version` : Version du composant utilisé (ex: `"1.2.0"`).
- `createdAt` : Date d'ajout du composant au format ISO (ex: `"2026-01-26T14:30:00Z"`).
- `audioDescription` : Description textuelle pour les lecteurs d'écran (A11y). Sera traduit en `aria-label`.

---

## 🎨 Système de Style & Responsive

- **Nombres** : Traduits en `px` (ex: `"width": 300` -> `300px`).
- **Chaînes** : Unités libres (ex: `"width": "50%"` -> `50%`).
- **Suffixes** : `-md`, `-lg` pour le responsive (ex: `"section-py-md": 80`).

---

## 🧱 Schémas des Composants

### AppBar
Barre de navigation supérieure.
- **meta.title** : Le titre de l'application affiché à gauche.
- **meta.links** : Tableau d'objets `{ label: string, href: string }` pour la navigation.
```json
{
  "id": "nav-main",
  "type": "AppBar",
  "meta": {
    "version": "1.0.0",
    "createdAt": "2026-01-26T10:00:00Z",
    "title": "CodeForge",
    "links": [
      { "label": "Accueil", "href": "index.html" },
      { "label": "Docs", "href": "docs.html" }
    ]
  }
}
```

### Hero
Bandeau d'accueil à fort impact.
- **meta.title** : Titre principal (H1).
- **meta.subtitle** : Texte de description.
```json
{
  "id": "hero-home",
  "type": "Hero",
  "meta": {
    "version": "1.1.0",
    "createdAt": "2026-01-26T10:00:00Z",
    "title": "Bienvenue sur CodeForge",
    "subtitle": "Le futur du rendu déclaratif."
  },
  "style": {
    "hero-bg": "#f8fafc",
    "hero-text": "var(--brand-primary)"
  }
}
```

### Button
Élément interactif servant de bouton ou de lien.
- **meta.label** : Le texte affiché sur le bouton.
- **meta.action** : Si commence par `/`, `http`, `mailto:` ou finit par `.html` -> **Lien**. Sinon -> **Code JS**.
```json
{
  "id": "btn-cta",
  "type": "Button",
  "meta": {
    "version": "1.2.0",
    "createdAt": "2026-01-26T10:00:00Z",
    "label": "Commencer",
    "action": "/get-started"
  },
  "style": {
    "btn-bg": "var(--brand-secondary)"
  }
}
```

### Grid
Conteneur de mise en page en grille responsive.
- **meta.cols** : Nombre de colonnes sur desktop (1 à 12).
- **meta.gap** : Espacement entre les colonnes (0, 2, 4, 6, 8, 10, 12, 16).
```json
{
  "id": "features-grid",
  "type": "Grid",
  "meta": {
    "version": "1.0.0",
    "createdAt": "2026-01-26T10:00:00Z",
    "cols": 3,
    "gap": 8
  },
  "children": []
}
```

### Stack
Moteur d'espacement utilisant Flexbox.
- **meta.direction** : Orientation : `'vertical'` ou `'horizontal'`.
- **meta.align** : Alignement des items (start, center, end, stretch).
- **meta.justify** : Justification du contenu (start, center, end, between).
- **meta.gap** : Espacement entre les items (0 à 16).
```json
{
  "id": "footer-stack",
  "type": "Stack",
  "meta": {
    "version": "1.0.0",
    "createdAt": "2026-01-26T10:00:00Z",
    "direction": "horizontal",
    "justify": "between",
    "align": "center"
  },
  "children": []
}
```

### Section
Unité structurelle horizontale pleine largeur.
- **style.section-bg** : Couleur de fond de la section.
- **style.section-py** : Padding vertical (espacement intérieur).
```json
{
  "id": "main-section",
  "type": "Section",
  "meta": {
    "version": "1.0.0",
    "createdAt": "2026-01-26T10:00:00Z"
  },
  "style": {
    "section-bg": "#ffffff",
    "section-py": 40
  },
  "children": []
}
```

### Container
Conteneur qui centre son contenu avec une largeur maximale.
- **style.container-width** : Largeur maximale (ex: 1200, "80rem").
```json
{
  "id": "centered-cont",
  "type": "Container",
  "meta": {
    "version": "1.0.0",
    "createdAt": "2026-01-26T10:00:00Z"
  },
  "style": {
    "container-width": 1200
  },
  "children": []
}
```

### Box
Bloc de couleur simple pour le prototypage.
- **style.bg-color** : Couleur de fond.
- **style.border-radius** : Rayon des angles.
```json
{
  "id": "color-box",
  "type": "Box",
  "meta": {
    "version": "1.0.0",
    "createdAt": "2026-01-26T10:00:00Z"
  },
  "style": {
    "bg-color": "#e5e7eb",
    "width": 100,
    "height": 100,
    "border-radius": 8
  }
}
```

---

## 🔄 Exemple de Positionnement Absolu
```json
{
  "id": "absolute-item",
  "type": "Box",
  "meta": { "version": "1.0.0", "createdAt": "2026-01-26T10:00:00Z" },
  "style": {
    "position": "absolute",
    "top": 50,
    "left": 100,
    "z-index": 10,
    "bg-color": "#ef4444",
    "width": 50,
    "height": 50
  }
}
```
