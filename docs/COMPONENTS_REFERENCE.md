# 📚 Référentiel des Composants CodeForge

Ce document sert d'index pour la bibliothèque de composants CodeForge. Chaque composant dispose d'une documentation détaillée incluant son objectif, ses paramètres, ses Design Tokens et des exemples de rendu.

---

## 🏗️ Navigation & Structure

| Composant | Description | Documentation |
| :--- | :--- | :--- |
| **Page** | Composant racine obligatoire pour chaque page. | [📄 Voir la doc](./components/Page.md) |
| **AppBar** | Barre de navigation supérieure fixe (Sticky) avec menu mobile. | [📄 Voir la doc](./components/AppBar.md) |
| **Section** | Unité structurelle horizontale pleine largeur. | [📄 Voir la doc](./components/Section.md) |
| **Container** | Conteneur centré avec largeur maximale réglable. | [📄 Voir la doc](./components/Container.md) |
| **Box** | Bloc de structure simple ou placeholder. | [📄 Voir la doc](./components/Box.md) |

---

## 🎨 Layout & Alignement

| Composant | Description | Documentation |
| :--- | :--- | :--- |
| **Grid** | Système de grille responsive Mobile-First (1-12 colonnes). | [📄 Voir la doc](./components/Grid.md) |
| **Stack** | Moteur d'alignement Flexbox (Vertical/Horizontal). | [📄 Voir la doc](./components/Stack.md) |

---

## 🔘 Éléments Interactifs & Formulaires

| Composant | Description | Documentation |
| :--- | :--- | :--- |
| **Button** | Bouton d'action ou lien de navigation dynamique. | [📄 Voir la doc](./components/Button.md) |
| **Form** | Conteneur de formulaire stylisé avec bouton intégré. | [📄 Voir la doc](./components/Form.md) |
| **FormField** | Champ de saisie (input/textarea) avec label et accessibilité. | [📄 Voir la doc](./components/FormField.md) |
| **Select** | Liste déroulante sémantique accessible. | [📄 Voir la doc](./components/Select.md) |
| **Textarea** | Zone de saisie multi-lignes spécialisée. | [📄 Voir la doc](./components/Textarea.md) |

---

## 📝 Contenu & Typographie

| Composant | Description | Documentation |
| :--- | :--- | :--- |
| **Title** | Titre sémantique (H1-H6) avec typographie fluide. | [📄 Voir la doc](./components/Title.md) |
| **Text** | Paragraphe de texte courant ou bloc simple. | [📄 Voir la doc](./components/Text.md) |

---

## 🖼️ Médias & Composants Avancés

| Composant | Description | Documentation |
| :--- | :--- | :--- |
| **Image** | Affichage d'image optimisé (lazy loading, responsive). | [📄 Voir la doc](./components/Image.md) |
| **Video** | Lecteur vidéo HTML5 accessible avec sous-titres. | [📄 Voir la doc](./components/Video.md) |
| **Map** | Carte interactive haute performance (Streaming GeoJSON). | [📄 Voir la doc](./components/Map.md) |
| **Carousel** | Diaporama d'images interactif et accessible. | [📄 Voir la doc](./components/Carousel.md) |
| **Table** | Tableau de données sémantique et accessible. | [📄 Voir la doc](./components/Table.md) |

---

## 🌓 Système de Thème Natif

Tous les composants CodeForge supportent nativement le mode sombre via deux mécanismes :

1.  **styleDark** : Vous pouvez passer un objet de style spécifique pour le mode sombre. Ces tokens surchargeront le thème clair uniquement quand la classe `.dark` est active.
2.  **Auto-Dark Generation** : Si vous ne fournissez pas de `styleDark`, le moteur calcule automatiquement une version sombre cohérente (inversion de luminance) pour garantir que votre site reste lisible sans effort supplémentaire.

👉 **[Voir la Spécification JSON pour plus de détails](./JSON_SPECIFICATION.md)**