# Form

## 🎯 Objectif
Le composant **Form** est un conteneur `<form>` qui regroupe des champs de saisie. Il gère l'aspect visuel global (fond, ombre, espacement) et fournit un bouton de soumission intégré.

## ⚙️ Propriétés (Meta)
| Propriété | Type | Description |
| :--- | :--- | :--- |
| `buttonText` | `string` | Texte affiché sur le bouton de soumission (défaut: "Envoyer"). |
| `action` | `string` | URL de destination des données (attribut `action`). |
| `method` | `string` | Méthode HTTP (`POST` ou `GET`). |

## 🎨 Design Tokens (Style)
| Token | Description |
| :--- | :--- |
| `form-bg` | Couleur de fond du formulaire. |
| `form-btn-bg` | Couleur de fond du bouton de soumission. |

## 🛠 Déclaration avec Builder
```typescript
const form = new FormBuilder("contact-form")
  .withButtonText("Envoyer le message")
  .withAction("/api/contact")
  .addChild(fieldName)
  .addChild(fieldEmail)
  .build();
```

## 📄 Déclaration JSON
```json
{
  "id": "contact-form",
  "type": "Form",
  "meta": {
    "buttonText": "Envoyer le message",
    "action": "/api/contact"
  },
  "children": [...]
}
```

## 🌐 Sortie HTML
```html
<form id="contact-form" action="/api/contact" method="POST" class="form-base ...">
  <div class="form-fields space-y-4">
    <!-- Champs enfants -->
  </div>
  <div class="form-actions pt-4">
    <button type="submit" class="w-full btn-base">Envoyer le message</button>
  </div>
</form>
```
