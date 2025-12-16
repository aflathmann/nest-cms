import { Injectable } from '@nestjs/common';
import { EmailService } from './email/email.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly emailService: EmailService) {}

  /**
   * Sends a welcome notification to a newly registered user
   */
  async sendWelcomeNotification(
    email: string,
    firstName: string,
  ): Promise<void> {
    await this.emailService.sendWelcomeEmail(email, firstName);
    // In the future, you could also send SMS, push notifications, etc.
  }

  /**
   * Sends a password reset notification
   */
  async sendPasswordResetNotification(
    email: string,
    resetToken: string,
  ): Promise<void> {
    await this.emailService.sendPasswordResetEmail(email, resetToken);
  }

  /**
   * Sends an email verification notification
   */
  async sendVerificationNotification(
    email: string,
    verificationToken: string,
  ): Promise<void> {
    await this.emailService.sendVerificationEmail(email, verificationToken);
  }
}
