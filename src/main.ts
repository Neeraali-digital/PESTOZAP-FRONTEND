import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations()
  ]
}).catch(err => {
  console.error('Error starting app:', err);
  document.body.innerHTML = `<div style="padding: 20px; color: red;">Error loading application: ${err.message}</div>`;
});