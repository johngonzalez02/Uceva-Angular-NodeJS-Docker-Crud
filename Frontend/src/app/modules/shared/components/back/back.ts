import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonConfig } from '../../interfaces/button';
import { Button } from '../button/button';

@Component({
  selector: 'app-back',
  imports: [Button],
  template: `
    <div class="d-flex justify-content-end">
      <app-button [config]="configBackButton" (onClick)="goBack()" />
    </div>
  `,
})
export class Back {

  location = inject(Location);

  configBackButton: ButtonConfig = {
    id: 'back-button',
    title: 'Back',
    type: 'secondary',
    icon: 'arrow-left',
  }

  goBack() {
    this.location.back();
  }

}
