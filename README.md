# 🚀 ForgeEngine - Moteur de Rendu (JSON → HTML)

![Tests Status](https://github.com/Q300Z/poc_codeforge/actions/workflows/test.yml/badge.svg)

Un moteur de rendu industriel ultra-léger et accessible. Il transforme une structure déclarative JSON en sites web modernes, optimisés et multi-pages, en utilisant la puissance native du navigateur (Cascade CSS, CSS Variables).

## 🌟 Points Forts

- **Performance Maximale** : Rendu statique sans framework JS au runtime.
- **Support Multi-Page** : Génération de sites complets avec routage automatique via slugs.
- **Layout Global** : Définition centralisée du Header et Footer pour une cohérence parfaite.
- **Design System par Tokens** : Thémisation complète via variables CSS (White-label ready).
- **Component Factory** : Validation automatique, accessibilité native et isolation des styles.
- **Développement Moderne** : Hot Module Replacement (HMR) via Vite pour un feedback instantané.
- **Qualité Certifiée** : Couverture de tests de 100% sur le cœur et tests E2E multi-plateformes.

## 🛠 Stack Technique

- **Langage** : TypeScript (Strict typing, zero `any`)
- **Styles** : Tailwind CSS 4 + CSS Custom Properties
- **Build & Dev** : Vite + PostCSS
- **Tests** : Vitest (Unit) + Playwright (E2E) + Axe-core (Accessibilité)

---

## 📖 Développement

### Lancer le serveur de développement (HMR)
```bash
npm run dev
```

### Générer le site de production
Le site est généré par défaut dans le dossier `generated/`.
```bash
node dist/cli.js data/site.json generated
```

### Nettoyer le projet
Supprime les builds, dossiers générés et rapports de tests.
```bash
npm run clean
```

---

## ⚠️ Stabilité & E2E

Le fichier `data/site.json` est la **référence pour les tests End-to-End**. 
> **Note :** Si vous modifiez les IDs, le `appName` ou la structure de ce fichier, veillez à mettre à jour les tests dans `e2e/` pour éviter de casser la CI.

---

## 🧱 Architecture des Composants

### Exemple de création d'un composant
```typescript
export const MyComponent = createComponent({
  name: "MyComponent",
  authorizedTokens: ["my-bg", "my-text"],
  template: (meta, children, styleVars, a11yAttrs, id) => `
    <div id="${id}" style="${styleVars}" class="bg-[var(--my-bg)]" ${a11yAttrs}>
      ${meta.content}
    </div>
  `
});
```

---

## 🧪 Tests & Qualité

```bash
# Lancer les tests unitaires et la couverture
npm test
npx vitest run --coverage

# Lancer les tests E2E (nécessite un build préalable)
npm run test:e2e

# Linter et formater le code
npm run lint
```
