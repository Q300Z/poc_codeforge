# Table

## 🎯 Objectif
Le composant **Table** permet d'afficher des données structurées de manière tabulaire. Il génère un HTML sémantique (`<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`) et supporte des fonctions d'accessibilité comme la légende (`caption`).

## ⚙️ Propriétés (Meta)
| Propriété | Type | Description |
| :--- | :--- | :--- |
| `headers` | `Array` | Liste des libellés de la première ligne (en-têtes). |
| `rows` | `Array` | Matrice de données (un tableau de tableaux de chaînes). |
| `caption` | `string` | Légende descriptive du tableau (pour l'accessibilité). |

## 🎨 Design Tokens (Style)
| Token | Description |
| :--- | :--- |
| `table-border` | Couleur des bordures du tableau et des cellules. |
| `table-header-bg` | Couleur de fond de la ligne d'en-tête. |
| `table-header-text`| Couleur du texte des en-têtes. |
| `table-row-even-bg`| Couleur de fond des lignes paires (effet zébré). |

## 🛠 Déclaration avec Builder
```typescript
const table = new TableBuilder("stats-table")
  .withHeaders(["Mois", "Ventes"])
  .withRows([
    ["Janvier", "1200€"],
    ["Février", "1500€"]
  ])
  .withCaption("Statistiques de ventes 2026")
  .build();
```

## 📄 Déclaration JSON
```json
{
  "id": "stats-table",
  "type": "Table",
  "meta": {
    "headers": ["Mois", "Ventes"],
    "rows": [["Janvier", "1200€"], ["Février", "1500€"]],
    "caption": "Statistiques de ventes 2026"
  }
}
```

## 🌐 Sortie HTML
```html
<div id="stats-table" class="table-container">
  <table class="table-base">
    <caption>Statistiques de ventes 2026</caption>
    <thead>
      <tr><th>Mois</th><th>Ventes</th></tr>
    </thead>
    <tbody>
      <tr><td>Janvier</td><td>1200€</td></tr>
      <tr><td>Février</td><td>1500€</td></tr>
    </tbody>
  </table>
</div>
```
