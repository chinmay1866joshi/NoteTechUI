import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // Mode selection: 'signin' | 'signup'
  readonly activeTab = signal<'signin' | 'signup'>('signin');

  // Form fields (UI-only state, no API integration)
  readonly email = signal('');
  readonly password = signal('');
  readonly fullName = signal('');
  readonly rememberMe = signal(true);
  readonly agreeTerms = signal(false);

  // UI state toggles
  readonly showPassword = signal(false);
  readonly isSubmitting = signal(false);
  readonly feedbackMessage = signal<string | null>(null);
  readonly feedbackType = signal<'success' | 'info' | 'error'>('info');
  readonly isForgotPasswordOpen = signal(false);
  readonly forgotEmail = signal('');
  readonly forgotSubmitted = signal(false);

  // Switch between Sign In and Sign Up tabs
  switchTab(tab: 'signin' | 'signup') {
    this.activeTab.set(tab);
    this.feedbackMessage.set(null);
  }

  // Toggle password visibility
  toggleShowPassword() {
    this.showPassword.update(v => !v);
  }

  // Quick UI demo autofill
  fillDemoCredentials() {
    this.email.set('alex.mercer@notetech.io');
    this.password.set('•SilverObsidian2026•');
    this.showFeedback('Demo credentials filled into form', 'info');
  }

  // Handle Sign In submission (Pure UI simulation, strictly no backend API)
  handleSignIn(event: Event) {
    event.preventDefault();

    if (!this.email().trim()) {
      this.showFeedback('Please enter your email or username', 'error');
      return;
    }

    if (!this.password().trim()) {
      this.showFeedback('Please enter your password', 'error');
      return;
    }

    this.isSubmitting.set(true);
    this.feedbackMessage.set(null);

    // Simulate authenticating for UX demonstration
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.showFeedback('UI Preview: Authentication simulated successfully! (API disabled)', 'success');
    }, 1200);
  }

  // Handle Sign Up submission (Pure UI simulation)
  handleSignUp(event: Event) {
    event.preventDefault();

    if (!this.fullName().trim() || !this.email().trim() || !this.password().trim()) {
      this.showFeedback('Please fill out all registration fields', 'error');
      return;
    }

    this.isSubmitting.set(true);
    this.feedbackMessage.set(null);

    setTimeout(() => {
      this.isSubmitting.set(false);
      this.showFeedback('UI Preview: Account creation simulated! (API disabled)', 'success');
    }, 1200);
  }

  // Social login button click (UI only)
  handleSocialLogin(provider: string) {
    this.showFeedback(`UI Preview: ${provider} OAuth flow clicked (No API configured)`, 'info');
  }

  // Forgot Password modal controls
  openForgotPassword() {
    this.isForgotPasswordOpen.set(true);
    this.forgotSubmitted.set(false);
    this.forgotEmail.set(this.email());
  }

  closeForgotPassword() {
    this.isForgotPasswordOpen.set(false);
    this.forgotSubmitted.set(false);
  }

  handleForgotSubmit(event: Event) {
    event.preventDefault();
    if (!this.forgotEmail().trim()) return;

    this.forgotSubmitted.set(true);
  }

  private showFeedback(message: string, type: 'success' | 'info' | 'error') {
    this.feedbackMessage.set(message);
    this.feedbackType.set(type);

    setTimeout(() => {
      if (this.feedbackMessage() === message) {
        this.feedbackMessage.set(null);
      }
    }, 4500);
  }
}

