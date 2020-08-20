import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

export class TaskStatusValidationPip implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];
  transform(value: string): string {
    const UpperValue = value.toUpperCase();
    if (!this.isStatusValid(UpperValue)) {
      throw new BadRequestException(`${value} is invalid status`);
    }
    return UpperValue;
  }
  private isStatusValid(value): boolean {
    const idx = this.allowedStatuses.indexOf(value);
    return idx !== -1;
  }
}
