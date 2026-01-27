# 🚀 CodeForge - Traducteur JSON → HTML

![Tests Status](https://github.com/Q300Z/poc_codeforge/actions/workflows/test.yml/badge.svg)

## 🎯 Objectif
CodeForge est une bibliothèque robuste dont la mission est de **traduire une structure de données JSON en code HTML sémantique et accessible.** Elle agit comme une couche de projection pure qui transforme un arbre déclaratif (le "Quoi") en un document web structuré (le "Comment"), en utilisant la puissance native du navigateur (Cascade CSS et Variables CSS).

---

## ✨ Fonctionnalités Clés

- **🔌 Adaptateur Intelligent** : Détecte et transforme automatiquement les formats tiers (ex: **ScreenDraft**) en structure native CodeForge.
- **🎨 Système de Style Hybride** : Supporte les Design Tokens (via CSS Variables) et les propriétés de mise en page natives (`width`, `height`, `z-index`, etc.).
- **📍 Positionnement Absolu** : Support natif des coordonnées `x` et `y` pour un rendu de type "Canvas".
- **♿ Accessibilité (A11y) Native** : Injection automatique des rôles ARIA, descriptions audio et gestion des balises sémantiques.
- **📦 Sortie Autonome** : Option pour injecter le CSS directement dans le HTML (`--inline`) pour des fichiers 100% portables.

---

## 🛠 Utilisation

### Installation
```bash
npm install @q300z/codeforge
```

### En tant que bibliothèque (Lib)
#### 1. Génération de site (SSG)
```typescript
import { buildSite } from "@q300z/codeforge";

// Génère un site complet avec CSS inline
await buildSite("./structure.json", "./dist", { inlineCss: true });
```

#### 2. Utilisation des Builders (Design Pattern)
```typescript
import { SiteBuilder, PageBuilder, HeroBuilder, ButtonBuilder } from "@q300z/codeforge";

const site = new SiteBuilder("Mon App")
  .addPage("index", new PageBuilder("home")
    .addChild(new HeroBuilder("h1").withTitle("Hello World"))
    .addChild(new ButtonBuilder("b1").withLabel("Cliquez-ici").withXY(50, 100))
  )
  .build();
```

### En tant qu'outil (CLI)
```bash
# Utilisation standard
npx codeforge ./data/site.json ./generated

# Avec auto-détection ScreenDraft et CSS inline
npx codeforge ./data/screendraft.json ./dist --inline

# Mode surveillance (Watch)
npx codeforge ./data/site.json ./generated --watch
```

---

## ⌨️ Commandes

| Commande | Description |
| :--- | :--- |
| `npm run dev` | Lance le build lib + génération + serveur Vite. |
| `npm run build` | Compile la lib et génère le showcase complet. |
| `npm run lint` | Vérifie le code TypeScript (ESLint) et CSS (Stylelint). |
| `npm run test:a11y` | Lance l'audit d'accessibilité automatisé avec **pa11y-ci**. |
| `npm run test:screendraft` | Teste le pipeline complet d'import ScreenDraft → Rendu. |

---

## 🧪 Qualité & Tests

Le projet suit des standards de qualité industriels :
- **Tests Unitaires** : Couverture globale > 80% (Composants > 95%).
- **Tests E2E** : Validation des scénarios de navigation et du rendu visuel avec Playwright.
- **Accessibilité** : Validation WCAG 2.0 AA sur toutes les pages générées.
- **Style CSS** : Validation et formatage automatique via Stylelint.

```bash
npm test              # Tests unitaires
npm run test:e2e      # Tests Playwright
npm run test:a11y     # Audit Accessibilité
```

---

## 🏗 Architecture (SOLID)

CodeForge est construit sur des principes modulaires :
1. **Registry** : Dictionnaire centralisé des composants.
2. **Factory** : Création typée et sécurisée de nouveaux composants.
3. **Builders** : Interface fluide pour construire des structures JSON sans erreurs.
4. **Adapters** : Couche de compatibilité pour les sources de données externes.

---

> **Note :** Le fichier `data/site.json` sert de référence pour les tests. Toute modification majeure doit être répercutée dans les tests E2E.
