![logo](https://github.com/user-attachments/assets/b35d0e42-858a-4c9a-8488-e1769269dbd0)

# tally-ts

A type-safe and developer-friendly TypeScript wrapper for the tally.so API.

> **Disclaimer**: The Tally.so API is currently in Private Beta and might be subject to change. You need to sign up for the Beta to get access.

## Installation

```bash
npm install tally-ts
```

## Core Concepts

- A tally client provides access to all endpoints of the Tally.so API by exposing services
- Service endpoints always return a response with

  ```javascript
  {
    data: TallyDTO | null,
    error: Error | null
  }
  ```

- This wrapper uses a three-layer architecture for maximum type safety and flexibility:

  1. **DTOs** (Data Transfer Objects)

     - Raw API response types
     - Match the exact structure of the API responses
     <!-- - Example: `FormDTO` with `created_at` as string -->

  2. **Domain Interfaces**

     - Enhanced types for better developer experience
     <!-- - Transformed properties (e.g., string dates to Date objects)
     - Defined relationships between types -->
     - Example: `TallyForm` interface with `addBlock` function

  3. **Models**

     - Concrete implementations of domain interfaces
     - Handle DTO to domain model transformation
     <!-- - Provide additional functionality
     - Example: `FormModel` with methods like `addBlock()` -->

## Quick Start

```typescript
import { TallyClient } from 'tally-ts'

const tally = new TallyClient({
  apiKey: 'your-api-key','https://api.tally.so'
})

// Access data
const { data: form, error } = await tally.forms.get('form-id')
console.log(form)
```

<!-- ## Type Safety

All API responses are fully typed:

```typescript
// DTOs match API response
interface FormDTO {
  id: string
  created_at: string // API returns date as string
}

// Domain interface for better DX
interface User {
  id: string
  createdAt: Date // Transformed to Date object
}

// Models implement domain interfaces
class UserModel implements User {
  // Implementation with additional methods
}
``` -->

## Examples

### Create new form from scratch

```typescript
// init client as described above

import {
  TallyFormModel,
  TallyFormStatus,
  TallyBlockTypes,
  initNewTallyBlock,
  TallyPayloadFormTitleDTO,
} from 'tally-ts'

const newForm = new TallyFormModel(
  [], // no blocks - starting from scratch
  TallyFormStatus.DRAFT,
  {}, // default settings
  'your-workspace-id',
)

const titleBlock = initNewTallyBlock(TallyBlockTypes.TITLE)
titleBlock.payload = {
  title: 'Official Title',
  html: 'Official Title',
} as TallyPayloadFormTitleDTO
// simple option for auto-completion without class instantiation

newForm.addBlock(titleBlock)

const { data: createdForm, error: createError } = await tally.forms.create(newForm)

console.log(createdForm.id, createError)
// should print the form id of the created form and null
```

### List Forms

```typescript
let forms = null
let currentPage = 0
do {
  currentPage += 1
  const { data, error } = await tally.forms.list(currentPage)
  if (!error && data) {
    forms = data
    forms.items.forEach((form) => {
      console.log(form.id)
    })
  }
} while (forms?.hasMore)
```

### Creating a webhook

```typescript
const { data, error } = await tally.webhooks.create({
  formId: createdForm?.id,
  url: 'https://webhook.site/1b1b1b1b',
  eventTypes: [TallyWebhookEventType.FORM_RESPONSE],
})
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)

## Directory Structure

````

tally-ts/
├── src/
│ ├── client.ts
│ ├── lib/
│ ├── models/
│ ├── services/
│ ├── types/
│ ├── util/
├── __tests__/

```

```
````
