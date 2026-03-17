export function decodeJwt(token: string): string {
  try {
    const parts = token.trim().split('.');
    if (parts.length !== 3) {
      return 'Error: Invalid JWT format. A JWT must have 3 parts separated by dots.';
    }

    const decodeBase64Url = (str: string): string => {
      let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
      while (base64.length % 4) {
        base64 += '=';
      }
      return decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
    };

    const header = JSON.parse(decodeBase64Url(parts[0]));
    const payload = JSON.parse(decodeBase64Url(parts[1]));

    return [
      '=== HEADER ===',
      JSON.stringify(header, null, 2),
      '',
      '=== PAYLOAD ===',
      JSON.stringify(payload, null, 2)
    ].join('\n');
  } catch {
    return 'Error: Unable to decode JWT. Please check that the token is valid.';
  }
}
