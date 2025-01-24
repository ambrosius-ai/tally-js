import { TallyForm, CreateFormRequest, UpdateFormRequest } from '../types/tally.types';

export class TallyFormService {
  constructor(private readonly blockId: string) {}

  /**
   * Create a new form
   * @param request The create form request
   * @returns Promise with the created form
   */
  async createForm(request: CreateFormRequest): Promise<TallyForm> {
    throw new Error('Not implemented');
  }

  /**
   * Get a form by ID
   * @param id The form ID
   * @returns Promise with the form
   */
  async getForm(id: string): Promise<TallyForm> {
    throw new Error('Not implemented');
  }

  /**
   * List all forms for the current block
   * @returns Promise with an array of forms
   */
  async listForms(): Promise<TallyForm[]> {
    throw new Error('Not implemented');
  }

  /**
   * Update a form
   * @param id The form ID to update
   * @param request The update request
   * @returns Promise with the updated form
   */
  async updateForm(id: string, request: UpdateFormRequest): Promise<TallyForm> {
    throw new Error('Not implemented');
  }

  /**
   * Delete a form
   * @param id The form ID to delete
   * @returns Promise<void>
   */
  async deleteForm(id: string): Promise<void> {
    throw new Error('Not implemented');
  }
}