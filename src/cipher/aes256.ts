import crypto from 'crypto';

const algo = 'aes-256-gcm';
const secretKey = process.env.SECRET_KEY || '';
const iv = process.env.CIPHER_IV || '';

/**
 * Encrypt string with AES-256
 *
 * @param plainText string to encrypt
 * @returns encrypted string
 */
export const encrypt = (plainText: string) => {
  const cipher = crypto.createCipheriv(
    algo,
    Buffer.from(secretKey, 'hex'),
    Buffer.from(iv, 'hex')
  );
  const encrypted = Buffer.concat([cipher.update(plainText), cipher.final()]);
  return encrypted.toString('hex');
};

/**
 * Decrypt string with AES-256
 *
 * @param encrypted string to decrypt
 * @returns decrypted string
 */
export const decrypt = (encrypted: string) => {
  const decipher = crypto.createDecipheriv(
    algo,
    Buffer.from(secretKey, 'hex'),
    Buffer.from(iv, 'hex')
  );
  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(encrypted, 'hex')),
  ]);
  return decrpyted.toString();
};
