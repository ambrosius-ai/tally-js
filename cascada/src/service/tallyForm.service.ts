import { 
  TallyForm, 
  CreateFormRequest, 
  UpdateFormRequest,
  FormStatus,
  BlockType,
  FormBlock,
  FormSettings
} from '../types/tally.types';
import { BaseTallyApiService } from './baseTallyApi.service';

export class TallyFormService extends BaseTallyApiService {
  /**
   * List all forms
   * @returns Promise with an array of forms
   */
  async listForms(): Promise<TallyForm[]> {
    return this.makeRequest<TallyForm[]>('/forms');
  }

  /**
   * Get a form by ID
   * @param id The form ID
   * @returns Promise with the form
   */
  async getForm(id: string): Promise<TallyForm> {
    return this.makeRequest<TallyForm>(`/forms/${id}`);
  }

  /**
   * Create a new form
   * @param request The create form request
   * @returns Promise with the created form
   * @example
   * const request: CreateFormRequest = {
   *   status: FormStatus.BLANK,
   *   blocks: [{
   *     uuid: "3c90c3cc-0d44-4b50-8888-8dd25736052a",
   *     type: BlockType.FORM_TITLE,
   *     groupUuid: "3c90c3cc-0d44-4b50-8888-8dd25736052a",
   *     groupType: BlockType.FORM_TITLE,
   *     payload: {
   *       html: "<string>",
   *       button: { label: "Submit" }
   *     }
   *   }],
   *   settings: {
   *     isClosed: false,
   *     hasProgressBar: false,
   *     hasPartialSubmissions: false,
   *     pageAutoJump: false,
   *     saveForLater: true,
   *     hasSelfEmailNotifications: false,
   *     hasRespondentEmailNotifications: false
   *   }
   * };
   */
  async createForm(request: CreateFormRequest): Promise<TallyForm> {
    return this.makeRequest<TallyForm>('/forms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
  }

  /**
   * Update a form
   * @param id The form ID to update
   * @param request The update request
   * @returns Promise with the updated form
   */
  async updateForm(id: string, request: UpdateFormRequest): Promise<TallyForm> {
    return this.makeRequest<TallyForm>(`/forms/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
  }

  /**
   * Delete a form
   * @param id The form ID to delete
   * @returns Promise<void>
   */
  async deleteForm(id: string): Promise<void> {
    await this.makeRequest(`/forms/${id}`, {
      method: 'DELETE',
    });
  }
}