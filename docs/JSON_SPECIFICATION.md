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
- **meta.appName** : Nom de l'application.
- **meta.debug** : `true` pour activer le mode debug visuel.
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
- **meta.title** : Titre affiché.
- **meta.links** : Liste de `{ "label": string, "href": string }`.
```json
{
  "id": "nav",
  "type": "AppBar",
  "meta": {
    "title": "CodeForge",
    "links": [{ "label": "Contact", "href": "contact.html" }],
    "version": "1.1.0",
    "createdAt": "2026-01-26T14:00:00Z"
  }
}
```

### Hero (Bannière)
- **meta.title** : Titre principal.
- **meta.subtitle** : Sous-titre.
```json
{
  "id": "hero",
  "type": "Hero",
  "meta": {
    "title": "Hello",
    "subtitle": "World",
    "version": "1.3.0",
    "createdAt": "2026-01-26T14:00:00Z"
  }
}
```

### Title (Titre)
- **meta.content** : Texte.
- **meta.level** : Niveau `1` (H1) à `6` (H6).
```json
{
  "id": "t1",
  "type": "Title",
  "meta": {
    "content": "Titre",
    "level": 2,
    "version": "1.1.0",
    "createdAt": "2026-01-26T14:00:00Z"
  }
}
```

### Text (Paragraphe)
- **meta.content** : Texte.
- **meta.tag** : Balise (`p`, `span`, `div`).
```json
{
  "id": "txt1",
  "type": "Text",
  "meta": {
    "content": "Texte de description.",
    "tag": "p",
    "version": "1.0.0",
    "createdAt": "2026-01-26T14:00:00Z"
  }
}
```

### Button (Bouton)
- **meta.label** : Texte.
- **meta.action** : URL ou JS.
```json
{
  "id": "btn",
  "type": "Button",
  "meta": {
    "label": "Clic ici",
    "action": "/",
    "audioDescription": "Retourner à l'accueil",
    "version": "1.3.0",
    "createdAt": "2026-01-26T14:00:00Z"
  }
}
```

### Grid (Grille)
- **meta.cols** : Colonnes desktop (1-12).
- **meta.gap** : Espacement (0-16).
```json
{
  "id": "g1",
  "type": "Grid",
  "meta": {
    "cols": 3,
    "gap": 8,
    "version": "1.1.0",
    "createdAt": "2026-01-26T14:00:00Z"
  }
}
```

### Stack (Alignement)
- **meta.direction** : `"vertical"` ou `"horizontal"`.
- **meta.align** : `"start"`, `"center"`, `"end"`, `"stretch"`.
- **meta.gap** : Espacement (0-16).
```json
{
  "id": "s1",
  "type": "Stack",
  "meta": {
    "direction": "horizontal",
    "align": "center",
    "gap": 4,
    "version": "1.1.0",
    "createdAt": "2026-01-26T14:00:00Z"
  }
}
```