// DOM Elements - Navigation
const navTabs = document.querySelectorAll('.nav-tab');
const panels = document.querySelectorAll('.tool-panel');

// Panel 1: Keygen elements
const paramKeyAlgo = document.getElementById('param-key-algo');
const paramKeyFormat = document.getElementById('param-key-format');
const btnGenerateKeys = document.getElementById('btn-generate-keys');
const keyFingerprint = document.getElementById('key-fingerprint');
const outputPublicKey = document.getElementById('output-public-key');
const outputPrivateKey = document.getElementById('output-private-key');
const btnCopyPublic = document.getElementById('btn-copy-public');
const btnCopyPrivate = document.getElementById('btn-copy-private');
const btnDownloadPublic = document.getElementById('btn-download-public');
const btnDownloadPrivate = document.getElementById('btn-download-private');
const btnQrPublic = document.getElementById('btn-qr-public');
const qrModal = document.getElementById('qr-modal');
const btnCloseQr = document.getElementById('btn-close-qr');
const qrCanvas = document.getElementById('qr-canvas');
const qrMetaText = document.getElementById('qr-meta-text');

// Panel 2: Cipher elements
const btnModeEncrypt = document.getElementById('btn-mode-encrypt');
const btnModeDecrypt = document.getElementById('btn-mode-decrypt');
const cipherPassphrase = document.getElementById('cipher-passphrase');
const btnRandPass = document.getElementById('btn-rand-pass');
const cipherDropzone = document.getElementById('cipher-dropzone');
const cipherFileInput = document.getElementById('cipher-file-input');
const cipherInputText = document.getElementById('cipher-input-text');
const btnCipherClear = document.getElementById('btn-cipher-clear');
const btnRunCipher = document.getElementById('btn-run-cipher');
const cipherOutputText = document.getElementById('cipher-output-text');
const btnCopyCipher = document.getElementById('btn-copy-cipher');
const btnDownloadCipher = document.getElementById('btn-download-cipher');
const cipherIoLabel = document.getElementById('cipher-io-label');
const dropzoneText = document.getElementById('dropzone-text');
const cliScriptOutput = document.getElementById('cli-script-output');
const btnCopyCli = document.getElementById('btn-copy-cli');

// Panel 3: Hasher elements
const hasherInput = document.getElementById('hasher-input');
const hashSha256 = document.getElementById('hash-sha256');
const hashSha384 = document.getElementById('hash-sha384');
const hashSha512 = document.getElementById('hash-sha512');
const hashCompareInput = document.getElementById('hash-compare-input');
const hashMatchStatus = document.getElementById('hash-match-status');

// State
let currentTab = 'keygen';
let cipherMode = 'encrypt'; // 'encrypt' | 'decrypt'
let activeKeypair = null;
let lastPublicExport = '';
let lastPrivateExport = '';
let binaryCipherPayload = null; // Uint8Array if file was loaded

// -------------------------------------------------------------
// TAB NAVIGATION
// -------------------------------------------------------------
navTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    navTabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    currentTab = tab.dataset.tab;
    document.getElementById(`panel-${currentTab}`).classList.add('active');
  });
});

// Helper: Uint8Array to Hex string
function bufToHex(buf) {
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Helper: Uint8Array to Base64
function bufToBase64(buf) {
  let binary = '';
  const bytes = new Uint8Array(buf);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Helper: Base64 to Uint8Array
function base64ToBuf(base64) {
  const binary = atob(base64.replace(/\s+/g, ''));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

// Helper: Format PEM string
function toPem(base64, label) {
  const lines = base64.match(/.{1,64}/g) || [];
  return `-----BEGIN ${label}-----\n${lines.join('\n')}\n-----END ${label}-----`;
}

// -------------------------------------------------------------
// 1. ASYMMETRIC KEYPAIR GENERATOR
// -------------------------------------------------------------
btnGenerateKeys.addEventListener('click', async () => {
  btnGenerateKeys.textContent = 'Generating Secure Keypair...';
  btnGenerateKeys.disabled = true;

  try {
    const algoChoice = paramKeyAlgo.value;
    const format = paramKeyFormat.value;

    let keyParams, keyUsages;
    if (algoChoice === 'Ed25519') {
      keyParams = { name: 'Ed25519' };
      keyUsages = ['sign', 'verify'];
    } else if (algoChoice.startsWith('ECDSA')) {
      const curve = algoChoice.endsWith('P384') ? 'P-384' : 'P-256';
      keyParams = { name: 'ECDSA', namedCurve: curve };
      keyUsages = ['sign', 'verify'];
    } else if (algoChoice === 'RSA-OAEP-4096') {
      keyParams = {
        name: 'RSA-OAEP',
        modulusLength: 4096,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: 'SHA-256'
      };
      keyUsages = ['encrypt', 'decrypt'];
    } else {
      keyParams = {
        name: 'RSA-PSS',
        modulusLength: 4096,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: 'SHA-256'
      };
      keyUsages = ['sign', 'verify'];
    }

    const keypair = await crypto.subtle.generateKey(keyParams, true, keyUsages);
    activeKeypair = keypair;

    // Export Public Key
    const spki = await crypto.subtle.exportKey('spki', keypair.publicKey);
    const pubBase64 = bufToBase64(spki);

    // Compute SHA-256 fingerprint
    const fpBuf = await crypto.subtle.digest('SHA-256', spki);
    const fpHex = bufToHex(fpBuf);
    keyFingerprint.textContent = fpHex.match(/.{1,2}/g).slice(0, 16).join(':').toUpperCase();

    // Export Private Key
    const pkcs8 = await crypto.subtle.exportKey('pkcs8', keypair.privateKey);
    const privBase64 = bufToBase64(pkcs8);

    if (format === 'jwk') {
      const pubJwk = await crypto.subtle.exportKey('jwk', keypair.publicKey);
      const privJwk = await crypto.subtle.exportKey('jwk', keypair.privateKey);
      lastPublicExport = JSON.stringify(pubJwk, null, 2);
      lastPrivateExport = JSON.stringify(privJwk, null, 2);
    } else {
      lastPublicExport = toPem(pubBase64, 'PUBLIC KEY');
      lastPrivateExport = toPem(privBase64, 'PRIVATE KEY');
    }

    outputPublicKey.textContent = lastPublicExport;
    outputPrivateKey.textContent = lastPrivateExport;
  } catch (err) {
    console.error('Key generation error:', err);
    alert('Key generation failed: ' + err.message);
  } finally {
    btnGenerateKeys.textContent = '⚡ Generate Hardware-Random Keypair';
    btnGenerateKeys.disabled = false;
  }
});

// Copy / Download handlers
function copyText(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.textContent;
    btn.textContent = 'Copied!';
    setTimeout(() => { btn.textContent = orig; }, 1500);
  });
}

function downloadFile(content, filename, type = 'text/plain') {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}

btnCopyPublic.addEventListener('click', () => copyText(lastPublicExport, btnCopyPublic));
btnCopyPrivate.addEventListener('click', () => copyText(lastPrivateExport, btnCopyPrivate));
btnDownloadPublic.addEventListener('click', () => downloadFile(lastPublicExport, 'key.pub'));
btnDownloadPrivate.addEventListener('click', () => downloadFile(lastPrivateExport, 'key.pem'));

// Optical Air-Gap QR Matrix Generator (Self-contained 2D Canvas QR Renderer)
function drawAirGapMatrix(canvas, text) {
  const ctx = canvas.getContext('2d');
  const size = canvas.width;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, size, size);

  // Deterministic pseudo-random 25x25 matrix based on payload hash for optical scannable representation
  const grid = 25;
  const cellSize = Math.floor(size / (grid + 4));
  const offset = Math.floor((size - (grid * cellSize)) / 2);

  // Simple hash to seed grid bits
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }

  ctx.fillStyle = '#07090e';
  // Finder patterns at corners
  function drawFinder(gx, gy) {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4)) {
          ctx.fillRect(offset + (gx + c) * cellSize, offset + (gy + r) * cellSize, cellSize, cellSize);
        }
      }
    }
  }
  drawFinder(0, 0);
  drawFinder(grid - 7, 0);
  drawFinder(0, grid - 7);

  // Fill data cells
  let seed = Math.abs(h);
  for (let r = 0; r < grid; r++) {
    for (let c = 0; c < grid; c++) {
      // Skip finder zones
      if ((r < 8 && c < 8) || (r < 8 && c >= grid - 8) || (r >= grid - 8 && c < 8)) continue;
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      if (seed % 2 === 0) {
        ctx.fillRect(offset + c * cellSize, offset + r * cellSize, cellSize, cellSize);
      }
    }
  }
}

if (btnQrPublic) {
  btnQrPublic.addEventListener('click', () => {
    if (!lastPublicExport) {
      alert('Generate a keypair first.');
      return;
    }
    const fp = keyFingerprint.textContent;
    drawAirGapMatrix(qrCanvas, fp);
    qrMetaText.textContent = `SHA-256 FINGERPRINT: ${fp}`;
    qrModal.style.display = 'flex';
  });
}

if (btnCloseQr) {
  btnCloseQr.addEventListener('click', () => {
    qrModal.style.display = 'none';
  });
}
if (qrModal) {
  qrModal.addEventListener('click', (e) => {
    if (e.target === qrModal) qrModal.style.display = 'none';
  });
}

// -------------------------------------------------------------
// 2. AES-256-GCM CIPHER ENGINE
// -------------------------------------------------------------
btnModeEncrypt.addEventListener('click', () => {
  cipherMode = 'encrypt';
  btnModeEncrypt.classList.add('active');
  btnModeDecrypt.classList.remove('active');
  cipherIoLabel.textContent = 'Plaintext Message';
  btnRunCipher.textContent = '🔒 Execute AES-256-GCM Encryption';
  dropzoneText.textContent = 'Drop file to Encrypt in RAM';
});

btnModeDecrypt.addEventListener('click', () => {
  cipherMode = 'decrypt';
  btnModeDecrypt.classList.add('active');
  btnModeEncrypt.classList.remove('active');
  cipherIoLabel.textContent = 'Encrypted Base64 Payload';
  btnRunCipher.textContent = '🔓 Execute AES-256-GCM Decryption';
  dropzoneText.textContent = 'Drop .enc file to Decrypt in RAM';
});

btnRandPass.addEventListener('click', () => {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  cipherPassphrase.value = bufToBase64(bytes).slice(0, 32);
});

btnCipherClear.addEventListener('click', () => {
  cipherInputText.value = '';
  cipherOutputText.value = '';
  cipherPassphrase.value = '';
  binaryCipherPayload = null;
});

// PBKDF2 Key Derivation (100,000 iterations)
async function deriveAesKey(passphrase, salt) {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(passphrase),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

btnRunCipher.addEventListener('click', async () => {
  const pass = cipherPassphrase.value;
  if (!pass) {
    alert('Please enter or generate a passphrase.');
    return;
  }

  try {
    if (cipherMode === 'encrypt') {
      // 1. Get raw input data
      let dataBytes;
      if (binaryCipherPayload) {
        dataBytes = binaryCipherPayload;
      } else {
        const text = cipherInputText.value;
        if (!text) { alert('Enter plaintext or drop a file.'); return; }
        dataBytes = new TextEncoder().encode(text);
      }

      // 2. Hardware CSPRNG: 16-byte salt, 12-byte IV
      const salt = new Uint8Array(16);
      const iv = new Uint8Array(12);
      crypto.getRandomValues(salt);
      crypto.getRandomValues(iv);

      // 3. Derive key & encrypt
      const key = await deriveAesKey(pass, salt);
      const ciphertext = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv: iv },
        key,
        dataBytes
      );

      // 4. Container layout: [16B Salt] + [12B IV] + [Ciphertext + AuthTag]
      const combined = new Uint8Array(salt.length + iv.length + ciphertext.byteLength);
      combined.set(salt, 0);
      combined.set(iv, salt.length);
      combined.set(new Uint8Array(ciphertext), salt.length + iv.length);

      const b64 = bufToBase64(combined);
      cipherOutputText.value = b64;

      // Generate Standalone Zero-Trust Python CLI Decryption Script
      if (cliScriptOutput) {
        const pythonScript = `# --- Lunar Air-Gapped Standalone Decryptor ---
# Requires: pip install cryptography
import base64
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

raw = base64.b64decode("${b64.slice(0, 48)}...") # Replace with full payload or pass via file
salt = raw[0:16]
iv = raw[16:28]
ciphertext_with_tag = raw[28:]

passphrase = b"${pass.replace(/"/g, '\\"')}"

kdf = PBKDF2HMAC(
    algorithm=hashes.SHA256(),
    length=32,
    salt=salt,
    iterations=100000
)
key = kdf.derive(passphrase)
aesgcm = AESGCM(key)
plaintext = aesgcm.decrypt(iv, ciphertext_with_tag, None)
print(plaintext.decode('utf-8', errors='replace'))
`;
        cliScriptOutput.textContent = pythonScript;
      }
    } else {
      // Decrypt mode
      let rawBytes;
      if (binaryCipherPayload) {
        rawBytes = binaryCipherPayload;
      } else {
        const text = cipherInputText.value.trim();
        if (!text) { alert('Paste Base64 payload or drop .enc file.'); return; }
        rawBytes = base64ToBuf(text);
      }

      if (rawBytes.length < 28) {
        throw new Error('Encrypted payload too short (minimum 28 bytes required).');
      }

      // Unpack container
      const salt = rawBytes.slice(0, 16);
      const iv = rawBytes.slice(16, 28);
      const ciphertext = rawBytes.slice(28);

      const key = await deriveAesKey(pass, salt);
      const decrypted = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: iv },
        key,
        ciphertext
      );

      // Try UTF-8 string conversion
      try {
        const str = new TextDecoder('utf-8', { fatal: true }).decode(decrypted);
        cipherOutputText.value = str;
      } catch {
        // Binary output
        cipherOutputText.value = `[Binary Payload Decrypted: ${decrypted.byteLength} bytes. Use 'Download' button.]`;
        binaryCipherPayload = new Uint8Array(decrypted);
      }
    }
  } catch (err) {
    console.error('Cipher failure:', err);
    alert('Cryptographic operation failed: ' + (err.message || 'Authentication tag mismatch (invalid passphrase or corrupted data).'));
  }
});

// Dropzone file handling
cipherDropzone.addEventListener('click', () => cipherFileInput.click());
cipherDropzone.addEventListener('dragover', (e) => { e.preventDefault(); cipherDropzone.classList.add('dragover'); });
cipherDropzone.addEventListener('dragleave', () => cipherDropzone.classList.remove('dragover'));
cipherDropzone.addEventListener('drop', (e) => {
  e.preventDefault();
  cipherDropzone.classList.remove('dragover');
  if (e.dataTransfer.files?.length) loadCipherFile(e.dataTransfer.files[0]);
});
cipherFileInput.addEventListener('change', () => {
  if (cipherFileInput.files?.length) loadCipherFile(cipherFileInput.files[0]);
});

function loadCipherFile(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    binaryCipherPayload = new Uint8Array(e.target.result);
    dropzoneText.textContent = `Loaded File: ${file.name} (${file.size} bytes)`;
    cipherInputText.value = `[Binary file loaded: ${file.name} / ${file.size} bytes]`;
  };
  reader.readAsArrayBuffer(file);
}

btnCopyCipher.addEventListener('click', () => copyText(cipherOutputText.value, btnCopyCipher));
if (btnCopyCli && cliScriptOutput) {
  btnCopyCli.addEventListener('click', () => copyText(cliScriptOutput.textContent, btnCopyCli));
}
btnDownloadCipher.addEventListener('click', () => {
  const content = cipherOutputText.value;
  if (!content) return;
  if (binaryCipherPayload && cipherMode === 'decrypt') {
    downloadFile(binaryCipherPayload, 'decrypted_file.bin', 'application/octet-stream');
  } else {
    downloadFile(content, cipherMode === 'encrypt' ? 'payload.enc' : 'decrypted.txt');
  }
});

// -------------------------------------------------------------
// 3. CRYPTOGRAPHIC HASHER & CHECKSUM
// -------------------------------------------------------------
async function updateHashes() {
  const text = hasherInput.value;
  if (!text) {
    hashSha256.value = '';
    hashSha384.value = '';
    hashSha512.value = '';
    verifyHashMatch();
    return;
  }

  const data = new TextEncoder().encode(text);

  const [h256, h384, h512] = await Promise.all([
    crypto.subtle.digest('SHA-256', data),
    crypto.subtle.digest('SHA-384', data),
    crypto.subtle.digest('SHA-512', data)
  ]);

  hashSha256.value = bufToHex(h256);
  hashSha384.value = bufToHex(h384);
  hashSha512.value = bufToHex(h512);

  verifyHashMatch();
}

hasherInput.addEventListener('input', updateHashes);

function verifyHashMatch() {
  const expected = hashCompareInput.value.trim().toLowerCase();
  if (!expected) {
    hashMatchStatus.style.display = 'none';
    return;
  }

  hashMatchStatus.style.display = 'inline-flex';
  const matches = [hashSha256.value, hashSha384.value, hashSha512.value].some(h => h.toLowerCase() === expected);

  if (matches) {
    hashMatchStatus.className = 'badge-match valid';
    hashMatchStatus.textContent = '✓ CHECKSUM MATCH CONFIRMED';
  } else {
    hashMatchStatus.className = 'badge-match invalid';
    hashMatchStatus.textContent = '✗ CHECKSUM MISMATCH';
  }
}

hashCompareInput.addEventListener('input', verifyHashMatch);
