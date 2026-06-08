# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

## **4. ML Detection**

- **Machine learning** phishing classifier: a dedicated component that scores incoming emails/pages for phishing risk using extracted features and a trained model.
- **Random Forest** model: a robust, interpretable ensemble classifier (sklearn.ensemble.RandomForestClassifier) used for initial prototyping. Persist the trained model with `joblib` or `pickle`.
- **Feature extraction**: extract features from the email, headers and URLs such as suspicious URL tokens, domain age/entropy, presence of urgency words, number of links, grammar & spelling error counts, and sender header anomalies. Implement feature functions in `backend/ai/features.py`.
- **Phishing score**: normalize classifier output to a 0-100% risk score for display in the UI.
- **Confidence level**: use the model's probability estimates (e.g. `predict_proba`) to present a confidence metric alongside the score.
- **Feature importance** explanation: surface per-prediction explanations using the Random Forest `feature_importances_` for global insights, and shap or LIME for per-sample explanations if stronger interpretability is needed.
- **Real-time prediction**: add an API endpoint `POST /api/ml/predict` that accepts the email payload or URL, runs feature extraction, and returns `{ score: number, confidence: number, top_features: [...] }`.

Suggested files and locations:

- `backend/ai/features.py` — feature extraction utilities and quick heuristics.
- `backend/ai/classifier.py` — model train/load/predict helpers (train, save_model, load_model, predict_with_explanation).
- `backend/api/routes/ml.py` — API route exposing `POST /api/ml/predict` for real-time scoring.
- `data/ml/` — store training artifacts, datasets, and exported model files (e.g. `rf_model.joblib`).

Quick example (API request):

POST /api/ml/predict
Body: `{ "subject": "...", "body": "...", "from": "...", "links": [...] }`

Response: `{ "score": 87, "confidence": 0.92, "top_features": [{"name":"url_entropy","value":7.4,"importance":0.21}, ...] }`

Notes:

- Start simple: implement deterministic feature extraction and a Random Forest baseline. Iterate to add more signals (NLP embeddings, URL reputation).
- Train models offline (not on every request) and load a serialized model in the API for real-time use.
- For production: add input validation, rate-limiting, and caching of predictions for repeated inputs.
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
