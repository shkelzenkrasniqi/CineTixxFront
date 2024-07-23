/**
 * Decodes a base64 encoded string.
 * @param {string} str - The base64 encoded string.
 * @returns {string} The decoded string.
 */
function base64Decode(str) {
    return decodeURIComponent(atob(str).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }
  
  /**
   * Decodes a JWT token and returns the payload.
   * @param {string} token - The JWT token.
   * @returns {Object} The decoded payload.
   */
  function decodeToken(token) {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token');
    }
  
    const payload = parts[1];
    const decodedPayload = base64Decode(payload);
    return JSON.parse(decodedPayload);
  }
  
  /**
   * Extracts the user role from a JWT token.
   * @param {string} token - The JWT token.
   * @returns {string | null} The role of the user, or null if the token is invalid.
   */
  export function getRoleFromToken(token) {
    try {
      const decodedToken = decodeToken(token);
      return decodedToken.role;
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }
  