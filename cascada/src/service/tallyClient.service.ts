import { Options } from '../types/tally.types';
import { TallyFormService } from './tallyForm.service';

export class TallyClientService {
  private readonly options: Options;
  private readonly formService: TallyFormService;

  constructor(options: Options) {
    this.options = options;
    this.formService = new TallyFormService(options.blockId);
  }

  public get forms(): TallyFormService {
    return this.formService;
  }
}