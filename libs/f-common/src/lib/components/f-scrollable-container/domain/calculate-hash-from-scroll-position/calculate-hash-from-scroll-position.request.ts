import { ITableOfContentItem } from '../../../f-table-of-content/domain/i-table-of-content-item';

export class CalculateHashFromScrollPositionRequest {
  constructor(
    public tocData: ITableOfContentItem[],
  ) {
  }
}
