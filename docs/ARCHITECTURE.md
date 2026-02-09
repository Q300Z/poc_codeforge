# 🏗️ Architecture Technique de CodeForge

CodeForge est un moteur de rendu déclaratif conçu selon les principes **SOLID**. Il transforme un arbre de données JSON en un document HTML sémantique et accessible.

## 1. Vue d'Ensemble du Flux de Rendu

Le processus de transformation suit un flux unidirectionnel où les données brutes traversent plusieurs couches de traitement avant de devenir du HTML.

### A. Flux de Génération (Builder vs JSON Direct)

CodeForge propose deux points d'entrée principaux pour générer une interface.

```mermaid
graph LR
    subgraph "Entrée Programmathique"
        A[Code TypeScript] --> B[SiteBuilder / PageBuilder]
        B --> C[Structure JSON Native]
    end

    subgraph "Entrée Données"
        D[Fichier .json] --> E{isScreenDraft?}
        E -- "Non" --> C
        E -- "Oui" --> F[ScreenDraftAdapter]
        F --> C
    end

    subgraph "Moteur de Rendu"
        C --> G[render]
        G --> H[HTML Sémantique]
    end
```

### B. Cycle de Vie du Rendu (Séquence)

```mermaid
sequenceDiagram
    participant User as Développeur / CLI
    participant Adapt as ScreenDraftAdapter
    participant Renderer as render
    participant Registry as registry
    participant Factory as createComponent

    User->>Adapt: Fichier JSON (Detection)
    opt Si Format ScreenDraft
        Adapt-->>User: JSON SiteNode
    end
    
    User->>Renderer: Appel render(node)
    Renderer->>Registry: lookup(node.type)
    Registry-->>Renderer: ComponentFn
    
    loop Pour chaque enfant
        Renderer->>Renderer: Appel render(child)
    end

    Renderer->>Factory: ComponentFn(meta, children, style)
    Factory->>Factory: validateTokens & getStyleVariables
    Factory-->>Renderer: Fragment HTML
    Renderer-->>User: Page Complète
```

## 2. Les Piliers du Système

### A. Le Renderer (Moteur de Rendu)
Le `Renderer` (`src/renderer.ts`) est une fonction récursive simple. Sa seule responsabilité est de parcourir l'arbre et d'orchestrer l'appel aux composants. Il garantit que les parents sont rendus *autour* de leurs enfants.

### B. Le Registry & La Factory
- **Registry** (`src/registry.ts`) : Un dictionnaire centralisé qui fait le lien entre une chaîne de caractères (ex: "Button") et une fonction de rendu. C'est le point d'extension unique du système.
- **Factory** (`src/utils/factory.ts`) : La fonction `createComponent` est le cœur du système. Elle agit comme un **Decorator** (Design Pattern) qui enveloppe chaque template spécifique pour injecter automatiquement les fonctionnalités transverses.

```mermaid
graph TD
    subgraph "Couche de Transformation"
        A[JSON Node] --> B{Factory / createComponent}
        B --> C[Validateur de Tokens]
        B --> D[Générateur de Variables CSS]
        B --> E[Injecteur Accessibilité]
    end
    
    subgraph "Couche de Sortie"
        E --> F[Template Spécifique]
        F --> G[HTML Sémantique]
    end
```

## 3. Système de Style Hybride

CodeForge sépare la structure de l'esthétique via deux types de propriétés dans l'objet `style` :

1. **Layout Utilities** : Propriétés universelles (`width`, `x`, `y`, `z-index`, etc.) directement mappées sur des styles CSS standards.
2. **Design Tokens** : Variables spécifiques au composant (ex: `btn-bg`) injectées comme **Variables CSS** (`--btn-bg`) et consommées par le template via `var(--btn-bg, fallback)`.

## 4. Accessibilité (A11y) "Zero-Config"

L'accessibilité n'est pas une option mais un composant de base. La `Factory` effectue le mapping suivant :
- `meta.audioDescription` → `aria-label`
- `meta.ariaRole` → `role`
- `meta.ariaHidden` → `aria-hidden="true"`
- Support natif de tous les autres attributs `aria-*` passés dans `meta`.

## 5. Modèle de Données et Builders

Pour faciliter la création de structures JSON complexes sans erreurs, CodeForge utilise des **Builders**.

```mermaid
classDiagram
    class NodeBuilder {
        +id: string
        +type: string
        +withMeta(meta)
        +withStyle(style)
        +addChild(child)
        +build() Node
    }
    
    class SiteBuilder {
        +appName: string
        +withHeader(node)
        +withFooter(node)
        +addPage(slug, page)
        +build() SiteNode
    }

    class SiteNode {
        +meta: Object
        +layout: Object
        +pages: Page[]
    }

    SiteBuilder --> SiteNode : "instancie"
    NodeBuilder ..> SiteBuilder : "fournit les nodes"
```
