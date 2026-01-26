# 🚀 POC Render Engine (JSON → HTML)

![Tests Status](https://github.com/Q300Z/poc_codeforge/actions/workflows/test.yml/badge.svg)

Un moteur de rendu ultra-léger, performant et accessible, conçu pour transformer une structure déclarative JSON en une page web moderne. Ce projet implémente un **Design System piloté par les tokens** et une architecture **Mobile-First**.

## 🎯 Objectifs

- **Performance brute** : Pas de framework lourd, pas de runtime JS complexe. Le navigateur gère la cascade de styles.
- **SOLID & KISS** : Une architecture propre où chaque composant est autonome et facile à comprendre.
- **Accessibilité Native** : Gestion automatique des attributs ARIA et respect de la sémantique HTML.
- **Design System Cascading** : Utilisation de variables CSS pour un theming flexible (White-label ready).

## 🛠 Stack Technique

- **Langage** : TypeScript (Strongly Typed, zero `any` policy)
- **Styles** : Tailwind CSS + CSS Variables
- **Moteur** : Node.js (ESM)
- **Tests** : Vitest + JSDOM + Testing Library + Axe-core (A11y)
- **Qualité** : ESLint + Prettier

---

## 📖 Tutoriel : Ajouter un nouveau composant

Grâce à la **Component Factory**, ajouter un composant se fait en quelques étapes simples.

### 1. Créer le fichier du composant
Créez un fichier dans `src/components/MonComposant.ts`.

### 2. Définir le composant avec la Factory
Utilisez `createComponent` pour bénéficier de la validation automatique et de l'accessibilité.

```typescript
import { createComponent } from "../utils/factory.js";

export const Alert = createComponent({
  name: "Alert",
  // 1. Définissez les tokens autorisés pour ce composant
  authorizedTokens: ["alert-bg", "alert-text"],
  
  // 2. Définissez le template HTML
  template: (props, children, styleVars, a11yAttrs) => `
    <div 
      role="alert" 
      style="${styleVars}" 
      class="p-4 rounded border bg-[var(--alert-bg,theme(colors.blue.50))] text-[var(--alert-text,theme(colors.blue.900))]"
      ${a11yAttrs}
    >
      <strong class="font-bold">${props.title || "Info"} :</strong>
      <span>${props.message}</span>
    </div>
  `,
});
```

### 3. Enregistrer le composant
Ajoutez-le au registre dans `src/index.ts` :

```typescript
import { Alert } from "./components/Alert.js";

export function setupRegistry() {
  registry.Page = Page;
  registry.Hero = Hero;
  registry.Button = Button;
  registry.Alert = Alert; // <-- Ajoutez-le ici
}
```

### 4. Utiliser le composant dans le JSON
Vous pouvez maintenant l'utiliser dans `data/page.json` :

```json
{
  "type": "Alert",
  "props": {
    "title": "Attention",
    "message": "Ceci est une alerte personnalisée",
    "id": "main-alert"
  },
  "style": {
    "alert-bg": "#fef2f2",
    "alert-text": "#991b1b"
  }
}
```

---

## 🚀 Lancer le projet

```bash
# Installer les dépendances
npm install

# Lancer la génération de la page
npm start

# Lancer les tests et vérifier la couverture
npm test
npm run lint
```

La page générée sera disponible dans `output.html`.
