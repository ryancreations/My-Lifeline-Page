// ========== SHARED BROWSER (Fast Hyperbeam) ==========
let hbClient = null;

window.openSharedBrowser = async () => {
  document.getElementById('context-menu')?.style.setProperty('display', 'none');
  
  // Show the browser screen immediately
  const screen = document.getElementById('browser-screen');
  if (screen) screen.style.display = 'flex';

  const container = document.getElementById('browser-container');
  container.innerHTML = `
    <div style="color:white;height:100%;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:14px;">
      <div style="font-size:18px;">Looking for active session...</div>
      <div style="font-size:14px;opacity:0.7;">Joining instantly if one exists</div>
    </div>
  `;

  try {
    // 1. First try to join an existing session (this is the fast path)
    const snapshot = await get(ref(db, 'active-browser-session'));
    const existing = snapshot.val();

    if (existing && existing.embed_url) {
      // Session already exists → join immediately
      await loadHyperbeam(existing.embed_url, existing.admin_token);
      return;
    }

    // 2. No session found → create one (only happens once)
    container.innerHTML = `
      <div style="color:white;height:100%;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:14px;">
        <div style="font-size:18px;">Starting shared browser...</div>
        <div style="font-size:14px;opacity:0.7;">This only happens the first time</div>
      </div>
    `;

    const response = await fetch('/api/create-browser', {
      method: 'POST'
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to create session');
    }

    const data = await response.json();

    // Save so everyone else can join instantly
    await set(ref(db, 'active-browser-session'), {
      embed_url: data.embed_url,
      admin_token: data.admin_token,
      session_id: data.session_id,
      createdAt: Date.now(),
      createdBy: auth.currentUser?.displayName || 'Someone'
    });

    await loadHyperbeam(data.embed_url, data.admin_token);

  } catch (err) {
    console.error(err);
    container.innerHTML = `
      <div style="color:white;height:100%;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:14px;padding:20px;text-align:center;">
        <div style="font-size:18px;">Failed to start browser</div>
        <div style="font-size:14px;opacity:0.7;">${err.message}</div>
        <button onclick="openSharedBrowser()" style="margin-top:16px;padding:10px 22px;border-radius:10px;border:none;background:#007aff;color:white;cursor:pointer;font-weight:600;">
          Try Again
        </button>
      </div>
    `;
  }
};

async function loadHyperbeam(embedUrl, adminToken) {
  const container = document.getElementById('browser-container');
  container.innerHTML = '';

  try {
    hbClient = await Hyperbeam(container, embedUrl, {
      adminToken: adminToken
    });
    console.log('Hyperbeam connected');
  } catch (err) {
    console.error('Hyperbeam load error:', err);
    container.innerHTML = `
      <div style="color:white;height:100%;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:12px;">
        <div>Failed to load browser</div>
        <button onclick="openSharedBrowser()" style="padding:10px 20px;border-radius:8px;border:none;background:#007aff;color:white;cursor:pointer;">
          Try Again
        </button>
      </div>
    `;
  }
}

window.forceNewBrowser = async () => {
  if (hbClient) {
    try { hbClient.destroy(); } catch(e) {}
    hbClient = null;
  }
  await remove(ref(db, 'active-browser-session'));
  openSharedBrowser();
};

window.closeSharedBrowser = () => {
  if (hbClient) {
    try { hbClient.destroy(); } catch(e) {}
    hbClient = null;
  }
  const screen = document.getElementById('browser-screen');
  if (screen) screen.style.display = 'none';
  const container = document.getElementById('browser-container');
  if (container) container.innerHTML = '';
};