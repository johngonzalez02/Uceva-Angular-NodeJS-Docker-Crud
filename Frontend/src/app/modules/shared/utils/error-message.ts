import { HttpErrorResponse } from '@angular/common/http';

export function getErrorMessage(error: HttpErrorResponse, defaultMessage: string): string {
  return error?.error?.error ?? defaultMessage;
}
