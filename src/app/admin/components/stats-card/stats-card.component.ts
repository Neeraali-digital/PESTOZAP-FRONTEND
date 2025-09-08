import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-card.component.html'
})
export class StatsCardComponent {
  @Input() title = '';
  @Input() value: number = 0;
  @Input() icon = '';
  @Input() color: 'blue' | 'green' | 'orange' | 'purple' | 'red' = 'blue';
  @Input() trend?: number;
  @Input() trendLabel = '';

  get colorClasses() {
    const colors = {
      blue: 'bg-blue-500 text-blue-600 bg-blue-50',
      green: 'bg-green-500 text-green-600 bg-green-50',
      orange: 'bg-orange-500 text-orange-600 bg-orange-50',
      purple: 'bg-purple-500 text-purple-600 bg-purple-50',
      red: 'bg-red-500 text-red-600 bg-red-50'
    };
    return colors[this.color];
  }

  getIconClasses() {
    const colors = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      orange: 'bg-orange-500',
      purple: 'bg-purple-500',
      red: 'bg-red-500'
    };
    return colors[this.color];
  }
}