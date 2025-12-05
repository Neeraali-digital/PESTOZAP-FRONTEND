import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,
    provideAnimations()
  ]
}).catch(err => {
  console.error('Error starting app:', err);
  document.body.innerHTML = `<div style="padding: 20px; color: red;">Error loading application: ${err.message}</div>`;
});