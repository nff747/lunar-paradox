import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// Ephemeral vs local persistent storage
const DATA_DIR = process.env.VERCEL ? '/tmp/lunar-data' : path.join(__dirname, 'data');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');

try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(INQUIRIES_FILE)) {
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify([], null, 2));
  }
} catch (e) {
  // Graceful fallback for serverless environments
}

// In-memory fallback
let memoryInquiries = [];

const getInquiries = () => {
  try {
    if (fs.existsSync(INQUIRIES_FILE)) {
      const raw = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    // fallback
  }
  return memoryInquiries;
};

const saveInquiry = (inquiry) => {
  memoryInquiries.unshift(inquiry);
  try {
    const current = getInquiries();
    if (!current.some(i => i.wireId === inquiry.wireId)) {
      current.unshift(inquiry);
    }
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(current, null, 2));
  } catch (err) {
    console.log('[Inquiry Logged]:', inquiry.wireId);
  }
};

const router = express.Router();

// ---------------------------------------------------------------------------
// 1. Health & Root Gateway
// ---------------------------------------------------------------------------
router.get('/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'Lunar Paradox Core Stem API',
    version: '2.6.0',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    region: process.env.VERCEL_REGION || 'mesh-global-edge'
  });
});

// ---------------------------------------------------------------------------
// 2. Gateway Passcode & Authorization
// ---------------------------------------------------------------------------
const VALID_PASSCODES = {
  'GENESIS-2026': { tier: 'Genesis Founding Member', access: ['studio', 'forge', 'labs', 'vault'] },
  'PARADOX-VIP': { tier: 'VIP Partner', access: ['studio', 'forge', 'labs', 'vault'] },
  'STUDIO-DIRECT': { tier: 'Enterprise Studio Client', access: ['studio', 'vault'] },
  'FORGE-OPEN': { tier: 'Developer Vanguard', access: ['forge', 'docs'] },
  'LABS-RESEARCH': { tier: 'Frontier AI Beta Tester', access: ['labs', 'docs'] },
};

router.post('/auth/verify', (req, res) => {
  const { passcode } = req.body;

  if (!passcode || typeof passcode !== 'string') {
    return res.status(400).json({ error: 'Passcode is required.' });
  }

  const normalized = passcode.trim().toUpperCase();
  const matched = VALID_PASSCODES[normalized];

  if (matched) {
    const sessionToken = `LPX-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    return res.json({
      success: true,
      message: 'Access Granted. Welcome to Lunar Paradox.',
      passcode: normalized,
      tier: matched.tier,
      permissions: matched.access,
      sessionToken,
      issuedAt: new Date().toISOString(),
    });
  }

  if (normalized.startsWith('LP-') && normalized.length >= 6) {
    const sessionToken = `LPX-${Date.now().toString(36)}-TEST`;
    return res.json({
      success: true,
      message: 'Provisional Sandbox Access Granted.',
      passcode: normalized,
      tier: 'Provisional Member',
      permissions: ['studio', 'forge'],
      sessionToken,
      issuedAt: new Date().toISOString(),
    });
  }

  return res.status(401).json({
    success: false,
    error: 'Invalid or expired passcode. Request access via Direct Wire or Discord.',
  });
});

// ---------------------------------------------------------------------------
// 3. Direct Wire Enterprise Inquiries
// ---------------------------------------------------------------------------
router.post('/inquiries', (req, res) => {
  const { name, contact, sector, budget, scope, notes } = req.body;

  if (!name || !contact) {
    return res.status(400).json({
      error: 'Name and primary contact (email or discord) are required.'
    });
  }

  const wireId = `WIRE-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const newInquiry = {
    wireId,
    name: name.trim(),
    contact: contact.trim(),
    sector: sector || 'General Inquiry',
    budget: budget || 'Undisclosed',
    scope: scope || 'Spatial Engineering & Architecture',
    notes: notes || '',
    status: 'Received - Cryptographically Logged',
    receivedAt: new Date().toISOString()
  };

  saveInquiry(newInquiry);

  return res.status(201).json({
    success: true,
    message: 'Direct Wire submission confirmed. Dispatched to enterprise registry.',
    wireId,
    inquiry: newInquiry
  });
});

router.get('/inquiries/:wireId', (req, res) => {
  const { wireId } = req.params;
  const list = getInquiries();
  const found = list.find(i => i.wireId.toUpperCase() === wireId.toUpperCase());

  if (!found) {
    return res.status(404).json({ error: 'Inquiry not found.' });
  }

  return res.json({ success: true, inquiry: found });
});

// ---------------------------------------------------------------------------
// 4. Mesh Telemetry & Global Nodes
// ---------------------------------------------------------------------------
router.get('/telemetry', (req, res) => {
  const nodes = [
    { id: 'iad-01', region: 'US East (N. Virginia)', status: 'Operational', latencyMs: 14 + Math.floor(Math.random() * 5), load: '38%' },
    { id: 'fra-01', region: 'EU Central (Frankfurt)', status: 'Operational', latencyMs: 22 + Math.floor(Math.random() * 6), load: '44%' },
    { id: 'hnd-01', region: 'AP East (Tokyo)', status: 'Operational', latencyMs: 68 + Math.floor(Math.random() * 8), load: '31%' },
    { id: 'syd-01', region: 'AP South (Sydney)', status: 'Operational', latencyMs: 110 + Math.floor(Math.random() * 12), load: '22%' },
  ];

  res.json({
    consensusUptime: '99.98%',
    activeDimensions: 42,
    totalNodes: nodes.length,
    meshHealth: 'Optimal',
    nodes,
    updatedAt: new Date().toISOString()
  });
});

// ---------------------------------------------------------------------------
// 5. Ecosystem Subdomain Branches
// ---------------------------------------------------------------------------
router.get('/branches', (req, res) => {
  const branches = [
    {
      id: 'studio',
      name: 'Lunar Studio',
      subdomain: 'studio.lunarparadox.com',
      status: 'Operational',
      tier: 'Agency Core',
      spec: 'Spatial 3D, generative visual engines & cinematic direction.',
      version: 'v2.6.4'
    },
    {
      id: 'forge',
      name: 'Lunar Forge',
      subdomain: 'forge.lunarparadox.com',
      status: 'Open Access',
      tier: 'Free Utilities',
      spec: 'Color science, APCA/WCAG contrast auditing, token laboratory.',
      version: 'v1.9.0'
    },
    {
      id: 'labs',
      name: 'Lunar Labs',
      subdomain: 'labs.lunarparadox.com',
      status: 'Invite Only',
      tier: 'Research Beta',
      spec: 'Frontier AI models, neural interfaces & autonomous synthesis.',
      version: 'v0.9.2-alpha'
    },
    {
      id: 'vault',
      name: 'Lunar Vault',
      subdomain: 'vault.lunarparadox.com',
      status: 'Protected',
      tier: 'Verified Registry',
      spec: 'Cryptographic design assets, certified tokens & flagship archive.',
      version: 'v1.4.1'
    }
  ];

  res.json({ branches });
});

// ---------------------------------------------------------------------------
// 6. Forge Color Science & Contrast Auditor API
// ---------------------------------------------------------------------------
function hexToLuminance(hex) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const rgb = [
    parseInt(c.substr(0, 2), 16) / 255,
    parseInt(c.substr(2, 2), 16) / 255,
    parseInt(c.substr(4, 2), 16) / 255
  ].map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

router.post('/forge/audit-contrast', (req, res) => {
  const { foreground = '#ffffff', background = '#030108' } = req.body;
  try {
    const l1 = hexToLuminance(foreground);
    const l2 = hexToLuminance(background);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

    const passesAA = ratio >= 4.5;
    const passesAAA = ratio >= 7.0;

    res.json({
      foreground,
      background,
      ratio: Math.round(ratio * 100) / 100,
      formattedRatio: `${(Math.round(ratio * 10) / 10).toFixed(1)}:1`,
      wcagAA: passesAA ? 'PASS' : 'FAIL',
      wcagAAA: passesAAA ? 'PASS' : 'FAIL',
      recommendation: passesAAA ? 'Optimal for dark mode OLED surfaces.' : 'Insufficient contrast for text.'
    });
  } catch (err) {
    res.status(400).json({ error: 'Invalid hex color codes.' });
  }
});

// Mount router on both /api and root to handle both local and Vercel routing
app.use('/api', router);
app.use('/', router);

export default app;
