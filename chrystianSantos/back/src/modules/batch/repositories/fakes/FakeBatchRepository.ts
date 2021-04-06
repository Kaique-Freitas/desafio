import { ICreateBatchDTO } from '@modules/batch/dtos/ICreateBatchDTO';
import { Batch } from '@modules/batch/infra/typeorm/entities/Batch';
import { uuid } from 'uuidv4';
import { IBatchRepositories } from '../IBatchRepositories';

export class FakeBatchRepository implements IBatchRepositories {
  private arrBatch: Batch[] = [];

  async create({ name, description }: ICreateBatchDTO): Promise<Batch> {
    const batch = new Batch();
    Object.assign(batch, {
      name,
      description,
    });
    batch.id = uuid();
    return batch;
  }

  async save(data: Batch): Promise<Batch> {
    this.arrBatch.push(data);
    return this.arrBatch[this.arrBatch.length - 1];
  }

  async findNameBatch(name: string): Promise<Batch | undefined> {
    const batchExists = this.arrBatch.find(batch => batch.name === name);
    return batchExists;
  }
}
