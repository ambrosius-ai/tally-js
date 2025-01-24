export interface Options {
  authToken: string;
  blockId: string; // UUID
  name: string;
}

export interface TallyForm {
  id: string;
  blockId: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFormRequest {
  name: string;
  description?: string;
}

export interface UpdateFormRequest {
  name?: string;
  description?: string;
}
