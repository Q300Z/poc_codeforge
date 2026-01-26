# 🚀 POC Render Engine (JSON → HTML)

![Tests Status](https://github.com/Q300Z/poc_codeforge/actions/workflows/test.yml/badge.svg)

Un moteur de rendu industriel ultra-léger, performant et accessible. Il transforme une structure déclarative JSON en une page web moderne en utilisant la puissance native du navigateur (Cascade CSS, CSS Variables).

## 🌟 Points Forts

- **Performance Maximale** : Pas de framework JS au runtime. Le rendu est statique et les styles sont résolus par le moteur CSS du navigateur.
- **Design System par Tokens** : Architecture de thémisation complète basée sur l'héritage des variables CSS (White-label ready).
- **Component Factory** : Une usine à composants qui gère automatiquement la validation, les styles et l'accessibilité.
- **Mobile-First & Responsive** : Système de grille intelligent et composants interactifs (menu burger) sans dépendances.
- **Développement Moderne** : Intégration Vite avec **Hot Module Replacement (HMR)** pour un feedback instantané.
- **Qualité Certifiée** : Couverture de tests de 100% sur le cœur du moteur et les utilitaires.

## 🛠 Stack Technique

- **Langage** : TypeScript (Strict typing, zero `any`)
- **Styles** : Tailwind CSS + CSS Custom Properties
- **Build & Dev** : Vite + PostCSS
- **Tests** : Vitest + JSDOM + Axe-core (Accessibilité)
- **CI/CD** : GitHub Actions

---

## 📖 Développement

### Lancer le serveur de développement (HMR)
Le serveur recharge automatiquement la page dès que vous modifiez le JSON ou un composant.
```bash
npm run dev
```

### Générer le bundle de production
```bash
npm run build
```

---

## 🧱 Architecture des Composants

Tous les composants sont créés via la `Component Factory`. Cela garantit :
1. **Validation** : Seuls les tokens de design autorisés sont acceptés.
2. **Accessibilité** : Les attributs `aria-*`, `role` et `id` sont injectés automatiquement.
3. **Styles** : Les variables CSS sont isolées par composant.

### Exemple de création d'un composant
```typescript
export const MyComponent = createComponent({
  name: "MyComponent",
  authorizedTokens: ["my-bg", "my-text"],
  template: (props, children, styleVars, a11yAttrs) => `
    <div style="${styleVars}" class="bg-[var(--my-bg)]" ${a11yAttrs}>
      ${props.content}
    </div>
  `
});
```

---

## ♿ Accessibilité (A11y)

Le projet intègre `vitest-axe` pour valider que chaque composant respecte les normes WCAG. Les composants interactifs (comme l'AppBar) gèrent nativement le focus et les états ARIA.

## 🧪 Tests

```bash
# Lancer tous les tests
npm test

# Vérifier la couverture
npx vitest run --coverage
```

Le cœur du moteur (`renderer.ts`) et les utilitaires de style/validation sont maintenus à **100% de couverture**.