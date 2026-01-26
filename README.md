# 🚀 CodeForge - Traducteur JSON → HTML

![Tests Status](https://github.com/Q300Z/poc_codeforge/actions/workflows/test.yml/badge.svg)

## 🎯 Objectif
CodeForge est une bibliothèque minimaliste dont la mission est de **traduire une structure de données JSON en code HTML sémantique et accessible.** Elle agit comme une couche de projection pure qui transforme un arbre déclaratif (le "Quoi") en un document web structuré (le "Comment"), en utilisant la puissance native du navigateur (Cascade CSS et Variables CSS).

---

## 🛠 Utilisation

### Installation
```bash
npm install @q300z/codeforge
```

### En tant que bibliothèque (Lib)
Vous pouvez intégrer CodeForge dans n'importe quel projet Node.js pour transformer des données en fragments ou sites complets.

#### 1. Traduction directe (String HTML)
```typescript
import { render, setupRegistry, Node } from "@q300z/codeforge";

// Initialisation du dictionnaire de composants
setupRegistry();

const myNode: Node = {
  id: "hero-1",
  type: "Hero",
  meta: { title: "Bienvenue" }
};

const html = render(myNode);
```

#### 2. Génération de site (SSG)
Pour générer un dossier complet avec HTML optimisé et CSS Tailwind compilé.
```typescript
import { buildSite } from "@q300z/codeforge";

// Prend un JSON de site et génère le dossier /generated
await buildSite("./structure.json", "./generated");
```

### En tant qu'outil (CLI)
Idéal pour les scripts de build ou l'automatisation.
```bash
npx codeforge ./data/site.json ./generated
```

---

## 💻 Développement

### Prérequis
- **Node.js** : version 20 ou supérieure.
- **NPM** : version 9 ou supérieure.

### Installation locale
```bash
git clone https://github.com/Q300Z/poc_codeforge.git
cd poc_render_engine
npm install
```

---

## ⌨️ Commandes

| Commande | Description |
| :--- | :--- |
| `npm run dev` | Lance le serveur de dev avec Hot-Reload (observe `data/site.json`). |
| `npm run build:lib` | Compile la bibliothèque TypeScript dans le dossier `dist/`. |
| `npm run clean` | Supprime les builds, les dossiers générés et les rapports. |
| `npm run lint` | Vérifie et corrige automatiquement le style du code. |

---

## 🧱 Ajout d'un composant

Le traducteur est extensible. Vous pouvez ajouter vos propres règles de traduction.

```typescript
import { createComponent, registry } from "@q300z/forge-engine";

export const CustomBox = createComponent({
  name: "CustomBox",
  authorizedTokens: ["bg-color"],
  template: (meta, children, styleVars, a11yAttrs, id) => `
    <div id="${id}" style="${styleVars}" class="p-4" ${a11yAttrs}>
      ${meta.content}
      ${children.join("")}
    </div>
  `,
});

// Enregistrement dans le dictionnaire
registry.CustomBox = CustomBox;
```

---

## 🧪 Tests

```bash
# Tests unitaires et couverture (Cœur à 100%)
npm test
npx vitest run --coverage

# Tests End-to-End (Playwright)
npm run test:e2e
```

> **Note :** Le fichier `data/site.json` est utilisé par les tests E2E. Sa modification peut nécessiter une mise à jour des fichiers dans `e2e/`.