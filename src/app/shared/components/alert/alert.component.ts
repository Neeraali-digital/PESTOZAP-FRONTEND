import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export interface AlertData {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  template: `
    <div class="alert-container" [class]="'alert-' + data.type">
      <mat-icon class="alert-icon">{{ getIcon() }}</mat-icon>
      <span class="alert-message">{{ data.message }}</span>
      <button mat-icon-button (click)="dismiss()" class="alert-close">
        <mat-icon>close</mat-icon>
      </button>
    </div>
  `,
  styles: [`
    .alert-container {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      border-radius: 8px;
      min-width: 300px;
      max-width: 500px;
    }
    .alert-success { background: #d4edda; color: #155724; }
    .alert-error { background: #f8d7da; color: #721c24; }
    .alert-warning { background: #fff3cd; color: #856404; }
    .alert-info { background: #d1ecf1; color: #0c5460; }
    .alert-icon { margin-right: 12px; }
    .alert-message { flex: 1; font-weight: 500; }
    .alert-close { margin-left: 8px; }
  `]
})
export class AlertComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<AlertComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: AlertData
  ) {}

  getIcon(): string {
    switch (this.data.type) {
      case 'success': return 'check_circle';
      case 'error': return 'error';
      case 'warning': return 'warning';
      case 'info': return 'info';
      default: return 'info';
    }
  }

  dismiss(): void {
    this.snackBarRef.dismiss();
  }
}