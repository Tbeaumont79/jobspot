import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ITokenService } from '../../shared/types/auth';

@Injectable({
  providedIn: 'root',
})
export class TokenService implements ITokenService {
  private readonly BEARER_COOKIE = 'BEARER';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  hasValidToken(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    return this.getCookieValue(this.BEARER_COOKIE) !== null;
  }

  clearToken(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.document.cookie = `${this.BEARER_COOKIE}=; Max-Age=0; path=/; domain=.jobspot.wip`;
  }

  private getCookieValue(name: string): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    const cookies = this.document.cookie.split(';');
    for (const cookie of cookies) {
      const [key, value] = cookie.trim().split('=');
      if (key === name) {
        return value;
      }
    }
    return null;
  }
}
