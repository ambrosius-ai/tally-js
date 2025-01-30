
![logo](https://github.com/user-attachments/assets/b35d0e42-858a-4c9a-8488-e1769269dbd0)

# tally-ts

A type-safe and developer-friendly TypeScript wrapper for the tally.so API.

## Installation

```bash
npm install tally-ts
```

## Core Concepts

This wrapper uses a three-layer architecture for maximum type safety and flexibility:

1. **DTOs** (Data Transfer Objects)

   - Raw API response types
   - Match the exact structure of the API responses
   <!-- - Example: `FormDTO` with `created_at` as string -->

2. **Domain Interfaces**

   - Enhanced types for better developer experience
   - Transformed properties (e.g., string dates to Date objects)
   - Defined relationships between types
   <!-- - Example: `User` interface with `createdAt` as Date -->

3. **Models**
   - Concrete implementations of domain interfaces
   - Handle DTO to domain model transformation
   - Provide additional functionality
   - Example: `FormModel` with methods like `addBlock()`

## Quick Start (work in progress)

```typescript
import { TallyClient } from 'tally-ts'

const tally = new TallyClient({
  apiKey: 'your-api-key',
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

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)

## Directory Structure

```
tally-ts/
├── src/
│   ├── lib/
│   │   └── constants.ts
│   └── README.md
```
