import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonConfig } from '../../interfaces/button';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.html',
})
export class Button {
  @Input({ required: true }) config!: ButtonConfig;
  @Output() onClick = new EventEmitter<string>();

  click(){
    this.onClick.emit(this.config.id);
  }
}
