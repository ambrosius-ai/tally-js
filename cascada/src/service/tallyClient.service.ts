import { Options } from '../types/tally.types';
import { TallyFormService } from './tallyForm.service';

export class TallyClientService {
  private readonly options: Options;
  private readonly formService: TallyFormService;
  private readonly url: string = 'https://api.tally.so/v1';

  constructor(options: Options) {
    this.options = options;
    this.formService = new TallyFormService(options.token);
  }

  public get forms(): TallyFormService {
    return this.formService;
  }
}