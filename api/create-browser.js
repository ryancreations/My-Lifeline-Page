```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Videos • My Lifeline</title>

  <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

  <style>
    :root {
      --primary: #00bcd4;
      --accent: #ff9ff3;
      --bg-light: linear-gradient(135deg, #fff8f0 0%, #e0f7ff 100%);
      --card: #ffffff;
      --text: #2c3e50;
      --muted: #667788;
      --box: #f7f7ff;
      --border: rgba(0, 188, 212, 0.18);
      --shadow: rgba(0, 0, 0, 0.12);
      --nav-bg: rgba(135, 206, 235, 0.97);
    }

    [data-theme="dark"] {
      --bg-light: linear-gradient(135deg, #0f1c2e 0%, #2c1e3a 100%);
      --card: #2c3e50;
      --text: #e0f2f1;
      --muted: #b7c7d1;
      --box: #34495e;
      --border: rgba(79, 195, 247, 0.2);
      --shadow: rgba(0, 0, 0, 0.4);
      --primary: #4fc3f7;
      --accent: #ff79c6;
      --nav-bg: rgba(26, 38, 57, 0.97);
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Quicksand', sans-serif;
      background: var(--bg-light);
      color: var(--text);
      min-height: 100vh;
      transition: background 0.5s ease;
    }

    .hidden {
      display: none !important;
    }

    /* =========================
       LOGIN
    ========================= */

    #loginScreen {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 25px;
    }

    .login-box {
      width: 100%;
      max-width: 430px;
      background: var(--card);
      padding: 45px 30px;
      border-radius: 28px;
      text-align: center;
      box-shadow: 0 20px 50px var(--shadow);
    }

    .login-box h1 {
      color: var(--primary);
      font-size: 2.4rem;
      margin-bottom: 8px;
    }

    .login-box p {
      color: var(--muted);
      margin-bottom: 22px;
    }

    .login-box input {
      width: 100%;
      padding: 14px 16px;
      margin: 7px 0;
      border: 2px solid var(--border);
      border-radius: 14px;
      background: var(--box);
      color: var(--text);
      font-size: 1rem;
      outline: none;
    }

    .login-button {
      width: 100%;
      margin-top: 14px;
      padding: 14px;
      background: var(--primary);
      color: white;
      border: none;
      border-radius: 999px;
      font-weight: 700;
      font-size: 1.05rem;
      cursor: pointer;
    }

    /* =========================
       NAVIGATION
    ========================= */

    nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: var(--nav-bg);
      backdrop-filter: blur(12px);
      z-index: 1000;
      padding: 14px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 6px 20px var(--shadow);
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 1.5rem;
      font-weight: 700;
    }

    .nav-menu {
      display: flex;
      gap: 10px;
      align-items: center;
      flex-wrap: wrap;
    }

    .nav-menu.hidden {
      display: none;
    }

    .nav-btn {
      background: white;
      color: var(--primary);
      border: none;
      padding: 9px 15px;
      border-radius: 30px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 12px var(--shadow);
    }

    [data-theme="dark"] .nav-btn {
      background: #3b5065;
      color: #dff8ff;
    }

    .dropdown {
      position: relative;
    }

    .dropdown-content {
      display: none;
      position: absolute;
      top: calc(100% + 8px);
      left: 0;
      min-width: 220px;
      background: var(--card);
      border-radius: 16px;
      box-shadow: 0 15px 35px var(--shadow);
      padding: 8px 0;
      z-index: 1001;
    }

    .dropdown:hover .dropdown-content {
      display: block;
    }

    .dropdown-content a {
      display: block;
      padding: 11px 18px;
      color: var(--text);
      text-decoration: none;
      font-weight: 500;
    }

    .dropdown-content a:hover {
      background: rgba(0, 188, 212, 0.12);
    }

    .nav-right {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .lock-btn {
      background: #e74c3c !important;
      color: white !important;
    }

    .logout-btn {
      background: #ff6b6b !important;
      color: white !important;
    }

    .hamburger {
      display: none;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 6px 10px;
    }

    /* =========================
       LOCKDOWN
    ========================= */

    #lockdown {
      display: none;
      position: fixed;
      inset: 0;
      background: #111;
      z-index: 9999;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: white;
      text-align: center;
      padding: 30px;
    }

    #lockdown h1 {
      font-size: 2.8rem;
      margin-bottom: 12px;
    }

    #unlockKey {
      padding: 14px 22px;
      width: 90%;
      max-width: 320px;
      border-radius: 999px;
      border: none;
      font-size: 1.1rem;
      text-align: center;
      margin: 16px 0;
    }

    .unlock-btn {
      padding: 12px 36px;
      background: #27ae60;
      color: white;
      border: none;
      border-radius: 999px;
      font-weight: 700;
      cursor: pointer;
    }

    /* =========================
       FLOATING BESTIE
    ========================= */

    .floating-bestie {
      position: fixed;
      right: 22px;
      bottom: 22px;
      width: 64px;
      height: 64px;
      background: var(--accent);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      cursor: pointer;
      z-index: 900;
      box-shadow: 0 8px 25px rgba(255, 159, 243, 0.5);
    }

    /* =========================
       MAIN
    ========================= */

    main {
      max-width: 1050px;
      margin: 0 auto;
      padding: 110px 20px 60px;
    }

    .hero {
      background: linear-gradient(135deg, #00bcd4, #a8e6cf);
      color: white;
      padding: 42px 28px;
      border-radius: 28px;
      text-align: center;
      margin-bottom: 28px;
      box-shadow: 0 12px 35px rgba(0, 188, 212, 0.3);
    }

    .hero h1 {
      font-size: 2.4rem;
      margin-bottom: 8px;
    }

    .section {
      background: var(--card);
      padding: 26px;
      border-radius: 22px;
      margin-bottom: 22px;
      box-shadow: 0 8px 25px var(--shadow);
    }

    .section-title {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 6px;
    }

    .section-title h2 {
      font-size: 1.45rem;
    }

    .section-description {
      color: var(--muted);
      margin-bottom: 16px;
      line-height: 1.5;
    }

    .action-btn {
      border: none;
      padding: 12px 20px;
      border-radius: 999px;
      background: var(--primary);
      color: white;
      font-weight: 700;
      cursor: pointer;
      font-family: inherit;
    }

    .action-btn.secondary {
      background: #ff6b9d;
    }

    /* =========================
       VIDEOS
    ========================= */

    .video-card {
      background: var(--box);
      border: 1px solid var(--border);
      padding: 18px;
      border-radius: 18px;
      margin-top: 14px;
      position: relative;
    }

    .video-card h3 {
      margin-bottom: 12px;
      padding-right: 36px;
    }

    .video-wrapper {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      border-radius: 14px;
      overflow: hidden;
      background: #111;
    }

    .video-wrapper iframe {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      border: none;
    }

    .delete-video-btn {
      position: absolute;
      top: 14px;
      right: 14px;
      background: #ff6b6b;
      color: white;
      border: none;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      cursor: pointer;
    }

    /* =========================
       CUSTOM VIDEO INPUT
    ========================= */

    .custom-input {
      width: 100%;
      padding: 12px 14px;
      border-radius: 12px;
      border: 2px solid var(--border);
      background: var(--box);
      color: var(--text);
      font-family: inherit;
      font-size: 1rem;
      outline: none;
    }

    /* =========================
       STREAMING
    ========================= */

    .link-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }

    .comfort-link {
      background: var(--box);
      border: 1px solid var(--border);
      padding: 16px;
      border-radius: 16px;
      text-decoration: none;
      color: var(--text);
      text-align: center;
      font-weight: 700;
    }

    .comfort-link span {
      display: block;
      font-size: 1.6rem;
      margin-bottom: 4px;
    }

    /* =========================
       HYPERBEAM BROWSER
    ========================= */

    #browser-screen {
      display: none;
      position: fixed;
      inset: 0;
      background: #111;
      z-index: 3000;
      flex-direction: column;
    }

    #browser-header {
      min-height: 56px;
      background: #1c1c1e;
      color: white;
      display: flex;
      align-items: center;
      padding: 8px 12px;
      gap: 8px;
      flex-wrap: wrap;
    }

    #browser-title {
      flex: 1;
      min-width: 130px;
      font-weight: 600;
    }

    .browser-button {
      padding: 8px 14px;
      border-radius: 8px;
      border: none;
      color: white;
      font-weight: 600;
      cursor: pointer;
      font-family: inherit;
    }

    .browser-new {
      background: #007aff;
    }

    .browser-home {
      background: #5856d6;
    }

    .browser-close {
      background: #ff3b30;
    }

    #browser-container {
      flex: 1;
      width: 100%;
      background: #000;
      min-height: 0;
      position: relative;
    }

    .browser-loading {
      color: white;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 12px;
      padding: 20px;
      text-align: center;
    }

    .browser-spinner {
      width: 38px;
      height: 38px;
      border: 4px solid rgba(255,255,255,0.25);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    .browser-error {
      color: white;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 12px;
      padding: 30px;
      text-align: center;
    }

    .browser-error button {
      padding: 10px 20px;
      border-radius: 8px;
      border: none;
      background: #007aff;
      color: white;
      cursor: pointer;
      font-weight: 600;
    }

    /* =========================
       FOOTER
    ========================= */

    footer {
      text-align: center;
      padding: 28px;
      color: var(--muted);
    }

    /* =========================
       MOBILE
    ========================= */

    @media (max-width: 900px) {
      .nav-menu {
        display: none;
      }

      .nav-menu:not(.hidden) {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 70px;
        left: 0;
        right: 0;
        background: var(--card);
        padding: 14px;
        box-shadow: 0 10px 30px var(--shadow);
      }

      .hamburger {
        display: block;
      }

      .link-grid {
        grid-template-columns: 1fr;
      }

      .browser-button {
        padding: 7px 10px;
        font-size: 0.9rem;
      }
    }
  </style>
</head>

<body data-theme="light">

  <!-- LOGIN -->
  <div id="loginScreen">
    <div class="login-box">
      <div style="font-size:3rem; margin-bottom:8px;">🎬</div>
      <h1>My Lifeline</h1>
      <p>Enter your personal key</p>

      <input
        type="text"
        id="username"
        placeholder="Username"
        autocomplete="username"
      >

      <input
        type="password"
        id="password"
        placeholder="Password"
        autocomplete="current-password"
      >

      <button class="login-button" onclick="checkLogin()">
        Enter Safe Space
      </button>
    </div>
  </div>


  <!-- MAIN -->
  <div id="mainContent" class="hidden">

    <!-- NAVIGATION -->
    <nav>

      <div class="logo">
        <span>🫂</span>
        My Lifeline
      </div>

      <div class="nav-menu" id="navMenu">

        <button class="nav-btn" onclick="navigateTo('index.html')">
          🏠 Dashboard
        </button>

        <div class="dropdown">
          <button class="nav-btn">
            🛡️ Support
          </button>

          <div class="dropdown-content">
            <a href="emergency.html">🚨 Emergency</a>
            <a href="bestie.html">🫂 AI Bestie</a>
            <a href="onebreath.html">😮‍💨 Breathing</a>
          </div>
        </div>

        <div class="dropdown">
          <button class="nav-btn">
            🧠 Tools
          </button>

          <div class="dropdown-content">
            <a href="mental.html">🧠 Mental Tools</a>
            <a href="reflect.html">📝 Reflect</a>
            <a href="reframe.html">💭 Reframe</a>
            <a href="emotion-radar.html">📡 Emotion Radar</a>
            <a href="selfcare.html">🧘 Selfcare</a>
            <a href="selfcare-planner.html">📓 Planner</a>
          </div>
        </div>

        <div class="dropdown">
          <button class="nav-btn">
            🌈 Comfort
          </button>

          <div class="dropdown-content">
            <a href="music.html">🎵 Music</a>
            <a href="lofiroom.html">🌙 Lofi Room</a>
            <a href="videos.html">📺 Videos</a>
            <a href="virtualpet.html">🐾 Virtual Pet</a>
          </div>
        </div>

        <div class="dropdown">
          <button class="nav-btn">
            📖 Journal
          </button>

          <div class="dropdown-content">
            <a href="letters.html">✉️ Letters</a>
            <a href="goodthings.html">🌱 Good Things</a>
            <a href="todayistayed.html">📌 Today I Stayed</a>
            <a href="yourenough.html">💙 You're Enough</a>
          </div>
        </div>

        <button class="nav-btn" onclick="navigateTo('2048.html')">
          🎮 2048
        </button>

        <button class="nav-btn" onclick="navigateTo('chatroom.html')">
          💬 Chat Room
        </button>

      </div>

      <div class="nav-right">

        <button
          onclick="toggleDarkMode()"
          class="nav-btn"
          title="Toggle dark mode"
        >
          🌗
        </button>

        <button
          onclick="activateLockdown()"
          class="nav-btn lock-btn"
          title="Lock"
        >
          🔒
        </button>

        <button
          onclick="logout()"
          class="nav-btn logout-btn"
        >
          Logout
        </button>

        <span
          class="hamburger"
          onclick="toggleMobileMenu()"
        >
          ☰
        </span>

      </div>
    </nav>


    <!-- LOCKDOWN -->
    <div id="lockdown">

      <h1>🛡️ Lockdown Active</h1>

      <p>
        Everything hidden. You are safe.
      </p>

      <input
        id="unlockKey"
        type="password"
        placeholder="Enter key"
      >

      <button
        class="unlock-btn"
        onclick="deactivateLockdown()"
      >
        Return
      </button>

    </div>


    <!-- FLOATING BESTIE -->
    <div
      class="floating-bestie"
      onclick="location.href='bestie.html'"
    >
      🫂
    </div>


    <main>

      <!-- HERO -->
      <section class="hero">

        <div style="font-size:2.6rem; margin-bottom:6px;">
          🌐
        </div>

        <h1>
          Videos + Browse Anything
        </h1>

        <p>
          Watch comfort videos or open a shared cloud browser
        </p>

      </section>


      <!-- =========================
           BROWSE ANYTHING
      ========================= -->

      <section class="section">

        <div class="section-title">
          <span style="font-size:1.7rem;">🌐</span>
          <h2>Browse Anything</h2>
        </div>

        <p class="section-description">
          Open a shared cloud browser. Search Google, visit websites,
          watch videos, and browse the web through the cloud browser.
        </p>

        <div
          style="display:flex; gap:12px; flex-wrap:wrap;"
        >

          <button
            class="action-btn"
            onclick="openSharedBrowser()"
          >
            🚀 Open Shared Browser
          </button>

          <button
            class="action-btn secondary"
            onclick="forceNewBrowser()"
          >
            🔄 New Session
          </button>

        </div>

      </section>


      <!-- =========================
           ADD CUSTOM VIDEO
      ========================= -->

      <section class="section">

        <div class="section-title">
          <span style="font-size:1.7rem;">➕</span>
          <h2>Add Your Own Video</h2>
        </div>

        <p class="section-description">
          Paste a direct video link such as an MP4 or Archive.org video.
        </p>

        <div
          style="display:flex; flex-direction:column; gap:10px;"
        >

          <input
            type="text"
            id="customTitle"
            class="custom-input"
            placeholder="Video title (optional)"
          >

          <div
            style="display:flex; gap:10px; flex-wrap:wrap;"
          >

            <input
              type="url"
              id="customUrl"
              class="custom-input"
              placeholder="Paste video link..."
              style="flex:1; min-width:180px;"
            >

            <button
              class="action-btn"
              onclick="addCustomVideo()"
            >
              Add Video
            </button>

          </div>

        </div>

        <div id="customVideos"></div>

      </section>


      <!-- =========================
           COMFORT TV
      ========================= -->

      <section class="section">

        <div class="section-title">
          <span style="font-size:1.7rem;">🎞️</span>
          <h2>Comfort TV</h2>
        </div>


        <div class="video-card">

          <h3>
            🏎️ Dukes of Hazzard – Season 1-6
          </h3>

          <div class="video-wrapper">

            <iframe
              src="https://archive.org/details/bitchute_-_classictelevisionseries_2020/20200711+-+IMIohbw2D3pN+-+The+Dukes+Of+Hazzard+-+Season+4+-+Episode+1+(Mrs.+Daisy+Hogg)/20200711+-+IMIohbw2D3pN+-+The+Dukes+Of+Hazzard+-+Season+4+-+Episode+1+(Mrs.+Daisy+Hogg).mp4"
              allowfullscreen
              loading="lazy"
            ></iframe>

          </div>

        </div>


        <div class="video-card">

          <h3>
            🏎️ Dukes of Hazzard – Season 7
          </h3>

          <div class="video-wrapper">

            <iframe
              src="https://archive.org/details/bitchute_-_classictelevisionseries_2021/20210103+-+2ZpQKubDsGeL+-+The+Dukes+Of+Hazzard+-+Season+7+-+Episode+3+(Dr.+Jekyll+And+Mr.+Duke)/20210103+-+2ZpQKubDsGeL+-+The+Dukes+Of+Hazzard+-+Season+7+-+Episode+3+(Dr.+Jekyll+And+Mr.+Duke).mp4"
              allowfullscreen
              loading="lazy"
            ></iframe>

          </div>

        </div>

      </section>


      <!-- =========================
           STREAMING SERVICES
      ========================= -->

      <section class="section">

        <div class="section-title">
          <span style="font-size:1.7rem;">🍿</span>
          <h2>Streaming Services</h2>
        </div>

        <div class="link-grid">

          <a
            class="comfort-link"
            href="https://www.netflix.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>🔴</span>
            Netflix
          </a>

          <a
            class="comfort-link"
            href="https://www.hulu.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>🟢</span>
            Hulu
          </a>

          <a
            class="comfort-link"
            href="https://www.primevideo.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>🔵</span>
            Prime Video
          </a>

          <a
            class="comfort-link"
            href="https://www.tubitv.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>📺</span>
            Tubi
          </a>

          <a
            class="comfort-link"
            href="https://www.pluto.tv"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>🪐</span>
            Pluto TV
          </a>

        </div>

      </section>

    </main>


    <footer>
      My Lifeline • Watch + Browse freely 💙
    </footer>

  </div>


  <!-- =========================
       SHARED BROWSER OVERLAY
  ========================= -->

  <div id="browser-screen">

    <div id="browser-header">

      <span id="browser-title">
        🌐 Shared Browser
      </span>

      <button
        class="browser-button browser-home"
        onclick="goBrowserHome()"
      >
        🏠 Google
      </button>

      <button
        class="browser-button browser-new"
        onclick="forceNewBrowser()"
      >
        🔄 New Session
      </button>

      <button
        class="browser-button browser-close"
        onclick="closeSharedBrowser()"
      >
        ✕ Close
      </button>

    </div>

    <div id="browser-container"></div>

  </div>


  <!-- =========================
       JAVASCRIPT
  ========================= -->

  <script type="module">

    /* =========================
       FIREBASE
    ========================= */

    const firebaseConfig = {
      apiKey: "AIzaSyCNDM2yeyVTWMU_pOQoUt6-uNOQAzHPkik",
      authDomain: "chatroomnew-739f4.firebaseapp.com",
      databaseURL: "https://chatroomnew-739f4-default-rtdb.firebaseio.com",
      projectId: "chatroomnew-739f4",
      storageBucket: "chatroomnew-739f4.firebasestorage.app",
      messagingSenderId: "552292977529",
      appId: "1:552292977529:web:b04e2bc662668847ba7da8"
    };

    import {
      initializeApp
    } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";

    import {
      getDatabase,
      ref,
      set,
      get,
      remove
    } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

    import Hyperbeam from "https://unpkg.com/@hyperbeam/web@latest/dist/index.js";


    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    let hbClient = null;


    /* =========================
       THEME
    ========================= */

    window.toggleDarkMode = () => {

      const isDark =
        document.documentElement.getAttribute("data-theme") === "dark";

      document.documentElement.setAttribute(
        "data-theme",
        isDark ? "light" : "dark"
      );

      localStorage.setItem(
        "lifeline-theme",
        isDark ? "light" : "dark"
      );

    };


    if (
      localStorage.getItem("lifeline-theme") === "dark"
    ) {
      document.documentElement.setAttribute(
        "data-theme",
        "dark"
      );
    }


    /* =========================
       NAVIGATION
    ========================= */

    window.navigateTo = (page) => {
      location.href = page;
    };


    window.toggleMobileMenu = () => {

      const menu =
        document.getElementById("navMenu");

      menu.classList.toggle("hidden");

    };


    /* =========================
       LOCKDOWN
    ========================= */

    window.activateLockdown = () => {

      document.getElementById(
        "lockdown"
      ).style.display = "flex";

    };


    window.deactivateLockdown = () => {

      const key =
        document.getElementById(
          "unlockKey"
        ).value.trim();

      if (key.length > 0) {

        document.getElementById(
          "lockdown"
        ).style.display = "none";

        document.getElementById(
          "unlockKey"
        ).value = "";

      }

    };


    /* =========================
       LOGIN
    ========================= */

    window.checkLogin = () => {

      const user =
        document.getElementById(
          "username"
        ).value.trim().toLowerCase();

      const pass =
        document.getElementById(
          "password"
        ).value.trim();

      const valid =
        (user === "ryan" && pass === "ITSmf420") ||
        (user === "guest" && pass === "guest") ||
        (user === "visitor" && pass === "welcome") ||
        (user === "friend" && pass === "lifeline") ||
        (user === "nc" && pass === "boone");

      if (valid) {

        localStorage.setItem(
          "lifelineAuthenticated",
          "true"
        );

        document.getElementById(
          "loginScreen"
        ).classList.add("hidden");

        document.getElementById(
          "mainContent"
        ).classList.remove("hidden");

        renderCustomVideos();

      } else {

        alert(
          "Incorrect username or password."
        );

      }

    };


    window.logout = () => {

      localStorage.removeItem(
        "lifelineAuthenticated"
      );

      location.reload();

    };


    /* =========================
       AUTO LOGIN
    ========================= */

    if (
      localStorage.getItem(
        "lifelineAuthenticated"
      ) === "true"
    ) {

      document.getElementById(
        "loginScreen"
      ).classList.add("hidden");

      document.getElementById(
        "mainContent"
      ).classList.remove("hidden");

    }


    /* =========================
       HYPERBEAM
    ========================= */

    function showBrowserLoading(message) {

      const container =
        document.getElementById(
          "browser-container"
        );

      container.innerHTML = `

        <div class="browser-loading">

          <div class="browser-spinner"></div>

          <div>
            ${escapeHtml(message)}
          </div>

          <div style="font-size:14px;opacity:.65;">
            Please wait a moment...
          </div>

        </div>

      `;

    }


    function showBrowserError(message) {

      const container =
        document.getElementById(
          "browser-container"
        );

      container.innerHTML = `

        <div class="browser-error">

          <div style="font-size:2rem;">
            ⚠️
          </div>

          <div style="font-size:18px;font-weight:700;">
            Browser couldn't load
          </div>

          <div style="max-width:600px;opacity:.75;">
            ${escapeHtml(message)}
          </div>

          <button onclick="openSharedBrowser()">
            Try Again
          </button>

        </div>

      `;

    }


    function escapeHtml(value) {

      return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

    }


    /*
      Opens the shared browser.

      It first checks Firebase for an existing
      session. If none exists, it asks the
      server-side /api/create-browser endpoint
      to create one.
    */

    window.openSharedBrowser = async () => {

      const screen =
        document.getElementById(
          "browser-screen"
        );

      screen.style.display = "flex";

      showBrowserLoading(
        "Looking for shared browser..."
      );


      try {

        /*
          Check Firebase for existing session.
        */

        const snapshot =
          await get(
            ref(
              db,
              "active-browser-session"
            )
          );

        const existing =
          snapshot.exists()
            ? snapshot.val()
            : null;


        /*
          If an active Hyperbeam session
          already exists, use it.
        */

        if (
          existing &&
          existing.embed_url
        ) {

          await loadHyperbeam(
            existing.embed_url,
            existing.admin_token
          );

          return;

        }


        /*
          No active session.
          Ask our secure server endpoint
          to create a Hyperbeam VM.

          IMPORTANT:
          The Hyperbeam API key stays
          server-side in create-browser.js.
        */

        showBrowserLoading(
          "Starting shared browser..."
        );


        const response =
          await fetch(
            "/api/create-browser",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json"
              },
              body: JSON.stringify({})
            }
          );


        /*
          Read the response safely.
        */

        const responseText =
          await response.text();

        let data = null;

        try {

          data =
            JSON.parse(responseText);

        } catch {

          throw new Error(
            "The browser server returned an invalid response."
          );

        }


        if (!response.ok) {

          const serverError =
            data?.error ||
            data?.message ||
            "The browser server could not create a session.";

          throw new Error(
            serverError
          );

        }


        /*
          Hyperbeam normally returns
          the session information here.
        */

        const embedUrl =
          data.embed_url ||
          data.embedUrl;

        const adminToken =
          data.admin_token ||
          data.adminToken;

        const sessionId =
          data.session_id ||
          data.sessionId ||
          data.id;


        if (!embedUrl) {

          console.error(
            "Unexpected Hyperbeam response:",
            data
          );

          throw new Error(
            "Hyperbeam did not return an embed URL."
          );

        }


        /*
          Save the shared session to Firebase.
        */

        await set(
          ref(
            db,
            "active-browser-session"
          ),
          {
            embed_url: embedUrl,
            admin_token: adminToken || null,
            session_id: sessionId || null,
            createdAt: Date.now(),
            createdBy: "Videos Page"
          }
        );


        /*
          Load the browser.
        */

        await loadHyperbeam(
          embedUrl,
          adminToken
        );

      } catch (err) {

        console.error(
          "Shared browser error:",
          err
        );

        showBrowserError(
          err?.message ||
          "An unknown error occurred while starting the browser."
        );

      }

    };


    /*
      Load Hyperbeam into the browser container.
    */

    async function loadHyperbeam(
      embedUrl,
      adminToken
    ) {

      const container =
        document.getElementById(
          "browser-container"
        );

      showBrowserLoading(
        "Loading shared browser..."
      );


      try {

        /*
          Destroy any previous client.
        */

        if (hbClient) {

          try {
            hbClient.destroy();
          } catch (e) {}

          hbClient = null;

        }


        container.innerHTML = "";


        /*
          Build Hyperbeam options.

          adminToken is only supplied when
          the server actually returned one.
        */

        const options = {};

        if (adminToken) {
          options.adminToken =
            adminToken;
        }


        /*
          Start Hyperbeam.
        */

        hbClient =
          await Hyperbeam(
            container,
            embedUrl,
            options
          );


        /*
          Give the browser a moment to render.
        */

        setTimeout(() => {

          if (
            container.children.length === 0
          ) {

            showBrowserError(
              "The browser session started, but the browser window did not render."
            );

          }

        }, 5000);


      } catch (err) {

        console.error(
          "Hyperbeam load error:",
          err
        );

        showBrowserError(
          err?.message ||
          "Hyperbeam could not load the browser."
        );

      }

    }


    /*
      New session.
    */

    window.forceNewBrowser = async () => {

      try {

        if (hbClient) {

          try {
            hbClient.destroy();
          } catch (e) {}

          hbClient = null;

        }


        showBrowserLoading(
          "Creating a brand-new browser..."
        );


        /*
          Remove the old shared session.
        */

        await remove(
          ref(
            db,
            "active-browser-session"
          )
        );


        /*
          Create a new session.
        */

        await openSharedBrowser();

      } catch (err) {

        console.error(
          "New browser error:",
          err
        );

        showBrowserError(
          err?.message ||
          "Unable to create a new browser session."
        );

      }

    };


    /*
      Go to Google inside the cloud browser.

      This does NOT open Google in the user's
      normal browser. It navigates the Hyperbeam
      browser itself.
    */

    window.goBrowserHome = async () => {

      try {

        if (
          hbClient &&
          typeof hbClient.goTo === "function"
        ) {

          await hbClient.goTo(
            "https://www.google.com/"
          );

          return;

        }


        /*
          Some Hyperbeam versions expose
          navigation differently.

          If goTo isn't available, show a
          helpful message instead of crashing.
        */

        alert(
          "The browser is loaded, but this Hyperbeam version does not expose direct navigation controls."
        );

      } catch (err) {

        console.error(
          "Browser navigation error:",
          err
        );

        alert(
          "Google could not be opened inside the shared browser."
        );

      }

    };


    /*
      Close browser.
    */

    window.closeSharedBrowser = () => {

      if (hbClient) {

        try {
          hbClient.destroy();
        } catch (e) {}

        hbClient = null;

      }

      document.getElementById(
        "browser-screen"
      ).style.display = "none";

      document.getElementById(
        "browser-container"
      ).innerHTML = "";

    };


    /* =========================
       CUSTOM VIDEOS
    ========================= */

    function getCustomVideos() {

      try {

        return JSON.parse(
          localStorage.getItem(
            "lifelineCustomVideos"
          ) || "[]"
        );

      } catch {

        return [];

      }

    }


    function saveCustomVideos(list) {

      localStorage.setItem(
        "lifelineCustomVideos",
        JSON.stringify(list)
      );

    }


    window.addCustomVideo = () => {

      let title =
        document.getElementById(
          "customTitle"
        ).value.trim() ||
        "Custom Video";

      let url =
        document.getElementById(
          "customUrl"
        ).value.trim();


      if (!url) {

        alert(
          "Paste a video link first."
        );

        return;

      }


      if (
        !url.startsWith("http://") &&
        !url.startsWith("https://")
      ) {

        url =
          "https://" + url;

      }


      try {

        new URL(url);

      } catch {

        alert(
          "Please enter a valid web address."
        );

        return;

      }


      const list =
        getCustomVideos();


      list.unshift({

        id: Date.now(),

        title,

        url

      });


      saveCustomVideos(list);


      document.getElementById(
        "customTitle"
      ).value = "";

      document.getElementById(
        "customUrl"
      ).value = "";


      renderCustomVideos();

    };


    window.deleteCustomVideo = (id) => {

      if (
        !confirm(
          "Remove this video?"
        )
      ) {
        return;
      }


      saveCustomVideos(
        getCustomVideos().filter(
          v => v.id !== id
        )
      );


      renderCustomVideos();

    };


    function renderCustomVideos() {

      const container =
        document.getElementById(
          "customVideos"
        );

      if (!container) {
        return;
      }


      const list =
        getCustomVideos();


      container.innerHTML =
        list.map(v => `

          <div class="video-card">

            <button
              class="delete-video-btn"
              onclick="deleteCustomVideo(${Number(v.id)})"
              title="Remove video"
            >
              ×
            </button>

            <h3>
              ${escapeHtml(v.title)}
            </h3>

            <div class="video-wrapper">

              <iframe
                src="${escapeHtml(v.url)}"
                allowfullscreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>

            </div>

          </div>

        `).join("");

    }


    /* =========================
       INITIAL RENDER
    ========================= */

    if (
      localStorage.getItem(
        "lifelineAuthenticated"
      ) === "true"
    ) {

      renderCustomVideos();

    }


    /* =========================
       KEYBOARD SHORTCUTS
    ========================= */

    document.addEventListener(
      "keydown",
      (event) => {

        /*
          Escape closes the browser overlay.
        */

        if (
          event.key === "Escape" &&
          document.getElementById(
            "browser-screen"
          ).style.display === "flex"
        ) {

          closeSharedBrowser();

        }

      }
    );

  </script>

</body>
</html>
```
