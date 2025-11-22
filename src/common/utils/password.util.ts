/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import * as bcrypt from 'bcrypt';

export class PasswordUtil {
  private static readonly SALT_ROUNDS = 12;

  static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.SALT_ROUNDS);
  }

  static async comparePassword(
    password: string,
    hashValue: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashValue);
  }

  static generateRandomPassword(length: number = 12): string {
    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';

    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    return password;
  }

  static validatePasswordStrength(password: string): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('Passwort muss mindestens 8 Zeichen lang sein');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Passwort muss mindestens einen Kleinbuchstaben enthalten');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Passwort muss mindestens einen Großbuchstaben enthalten');
    }

    if (!/\d/.test(password)) {
      errors.push('Passwort muss mindestens eine Zahl enthalten');
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Passwort muss mindestens ein Sonderzeichen enthalten');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
