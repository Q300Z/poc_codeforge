# Page

## 🎯 Objectif
Le composant **Page** est le composant racine indispensable de chaque fichier généré. Il est responsable de l'injection de la structure HTML5 complète (`<html>`, `<head>`, `<body>`), de l'import des styles CSS globaux, ainsi que de l'affichage du header et du footer.

## ⚙️ Propriétés (Meta)
| Propriété | Type | Description |
| :--- | :--- | :--- |
| `appName` | `string` | Titre de l'onglet du navigateur (balise `<title>`). |
| `defaultTheme`| `string` | Thème par défaut (`light`, `dark` ou `system`). |
| `debug` | `boolean` | Active les contours en pointillés sur tous les blocs. |

## ♿ Accessibilité (Native)
Le composant Page injecte automatiquement un **lien d'évitement** ("Passer au contenu principal") invisible par défaut mais accessible au clavier via `TAB` pour faciliter la navigation des utilisateurs de lecteurs d'écran.

## 🎨 Design Tokens (Style)
Le composant Page accepte tous les styles globaux et les tokens de marque :
| Token | Description |
| :--- | :--- |
| `brand-primary` | Couleur principale de la marque. |
| `brand-secondary`| Couleur secondaire. |
| `section-py` | Espacement vertical par défaut des sections. |

## 🛠 Déclaration avec Builder
```typescript
const page = new PageBuilder("home")
  .withAppName("Mon Nouveau Site")
  .withDebug(true)
  .addChild(hero)
  .addChild(content)
  .build();
```

## 📄 Déclaration JSON
```json
{
  "id": "home",
  "type": "Page",
  "meta": {
    "appName": "Mon Nouveau Site",
    "debug": true
  },
  "children": [...]
}
```

## 🌐 Sortie HTML
```html
<!DOCTYPE html>
<html lang="fr" class="h-full">
<head>
    <title>Mon Nouveau Site</title>
    <link rel="stylesheet" href="style.css">
</head>
<body class="site-wrapper h-full" data-debug-theme="true">
    <header>...</header>
    <main>...</main>
    <footer>...</footer>
</body>
</html>
```
