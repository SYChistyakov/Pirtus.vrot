const teamData = {
  comparison: [
    { label: "Hero damage", team: 287056, opponent: 287510, compact: true },
    { label: "Siege", team: 560230, opponent: 460165, compact: true },
    { label: "Structures", team: 44538, opponent: 139443, compact: true },
    { label: "Healing", team: 75432, opponent: 62393, compact: true },
    { label: "XP", team: 84919, opponent: 87515, compact: true },
    { label: "Deaths", team: 35, opponent: 26, compact: false },
  ],
  radar: [
    { label: "ROLE COVERAGE", value: 92 },
    { label: "DAMAGE", value: 76 },
    { label: "MACRO", value: 88 },
    { label: "SURVIVAL", value: 42 },
    { label: "CONVERSION", value: 32 },
  ],
  players: [
    {
      name: "Сергей",
      hero: "Ragnaros",
      role: "MACRO / OFFLANE",
      tier: "TIER B",
      monogram: "RA",
      stats: { KP: "58%", KDA: "15 / 8", Hero: "72.8K", Siege: "324.6K", XP: "35.0K", Dead: "315s" },
      bars: { "Макро": 96, "Урон": 78, "Выживаемость": 46 },
      verdict: "Главный источник макро-давления: №1 в команде по siege и XP. Продвигать в расширенный просмотр, отдельно проверить позиционирование — 8 смертей и 5 outnumbered deaths.",
      tags: ["#1 SIEGE", "#1 XP", "LAVA WAVE", "POSITION REVIEW"],
    },
    {
      name: "DavidKimChi",
      hero: "Arthas",
      role: "TANK / ENGAGE",
      tier: "TIER A",
      monogram: "AR",
      stats: { KP: "81%", KDA: "21 / 7", Hero: "61.4K", Soak: "85.6K", CC: "777", Dead: "261s" },
      bars: { "Контроль": 96, "Участие": 92, "Выживаемость": 66 },
      verdict: "Лучший командный коннектор в выборке: 81% kill participation, 21 takedown и выдающийся объём контроля. Приоритетный tryout как фронтлайн и потенциальный secondary caller.",
      tags: ["PRIORITY", "81% KP", "ROOT LEADER", "CALLING UPSIDE"],
    },
    {
      name: "saybb",
      hero: "Genji",
      role: "FINISHER / FLEX DPS",
      tier: "TIER B",
      monogram: "GE",
      stats: { KP: "62%", KDA: "16 / 8", Hero: "81.9K", TF: "62.9K", Kills: "6", Dead: "414s" },
      bars: { "Механика": 91, "Урон": 94, "Выживаемость": 35 },
      verdict: "Самый высокий hero и teamfight damage в составе, сильный финишерский потолок. Главный вопрос — availability: 414 секунд вне карты, худший показатель команды.",
      tags: ["#1 HERO DMG", "#1 TF DMG", "6 KILLS", "HIGH VARIANCE"],
    },
    {
      name: "Linatan",
      hero: "Ana",
      role: "SUPPORT / BACKLINE",
      tier: "TIER A",
      monogram: "AN",
      stats: { KP: "77%", KDA: "20 / 5", Heal: "75.4K", TFH: "12.9K", Camps: "2", Dead: "244s" },
      bars: { "Поддержка": 97, "Участие": 89, "Выживаемость": 78 },
      verdict: "Самый чистый инвестиционный сигнал: высокий KP, минимум смертей и healing advantage команды. Приоритетный tryout; проверить стабильность skillshots и коммуникацию под dive.",
      tags: ["PRIORITY", "HEAL LEADER", "LOWEST DEATHS", "STABLE CORE"],
    },
    {
      name: "Comrade",
      hero: "Malthael",
      role: "BRUISER / PVE",
      tier: "TIER C",
      monogram: "MA",
      stats: { KP: "46%", KDA: "12 / 7", Hero: "45.7K", Siege: "74.4K", Camps: "4", Dead: "343s" },
      bars: { "PvE": 82, "Урон": 54, "Связность": 39 },
      verdict: "Полезен в PvE и лидирует по лагерям, но вклад в командный контакт ниже остальных: 46% KP. Hold до расширенной выборки и проверки синхронизации с фронтлайном.",
      tags: ["4 CAMPS", "PVE VALUE", "46% KP", "EXTENDED SAMPLE"],
    },
  ],
  clusters: [
    { time: 243, label: "Первый парный провал", casualties: 2, players: "saybb + DavidKimChi" },
    { time: 494, label: "Тройной размен в центре", casualties: 3, players: "Linatan + DavidKimChi + Сергей" },
    { time: 624, label: "Цепочка на верхней стороне", casualties: 3, players: "Comrade + DavidKimChi + saybb" },
    { time: 708, label: "Потеря фронта и PvE", casualties: 2, players: "DavidKimChi + Comrade" },
    { time: 954, label: "Разорванный контакт", casualties: 2, players: "Сергей + Linatan" },
    { time: 1232, label: "Два изолированных пика", casualties: 2, players: "Linatan + Comrade" },
    { time: 1297, label: "Тройная потеря в late game", casualties: 3, players: "DavidKimChi + saybb + Comrade" },
    { time: 1503, label: "Финальный коллапс", casualties: 4, players: "Сергей + Linatan + DavidKimChi + saybb", final: true },
  ],
};

const formatValue = (value, compact = false) => {
  if (compact && value >= 1000) return `${(value / 1000).toFixed(value >= 100000 ? 0 : 1)}K`;
  return new Intl.NumberFormat("ru-RU").format(value);
};

const formatTime = (seconds) => `${Math.floor(seconds / 60)}:${String(Math.round(seconds % 60)).padStart(2, "0")}`;

function renderComparison() {
  const root = document.querySelector("#conversion-chart");
  if (!root) return;
  root.innerHTML = teamData.comparison.map((metric) => {
    const max = Math.max(metric.team, metric.opponent);
    return `
      <div class="comparison-row">
        <span class="comparison-label">${metric.label}</span>
        <div class="bar-pair">
          <div class="bar-track"><div class="bar-fill core" data-width="${(metric.team / max) * 100}%"></div></div>
          <div class="bar-track"><div class="bar-fill opp" data-width="${(metric.opponent / max) * 100}%"></div></div>
        </div>
        <span class="comparison-values"><b>${formatValue(metric.team, metric.compact)}</b><br>${formatValue(metric.opponent, metric.compact)}</span>
      </div>`;
  }).join("");
}

function renderRadar() {
  const root = document.querySelector("#signal-radar");
  if (!root) return;
  const cx = 150;
  const cy = 150;
  const radius = 98;
  const count = teamData.radar.length;
  const pointAt = (index, value = 100) => {
    const angle = -Math.PI / 2 + (Math.PI * 2 * index) / count;
    const r = radius * value / 100;
    return [cx + Math.cos(angle) * r, cy + Math.sin(angle) * r];
  };
  const polygon = (value) => teamData.radar.map((_, index) => pointAt(index, value).join(",")).join(" ");
  const shape = teamData.radar.map((item, index) => pointAt(index, item.value).join(",")).join(" ");
  const axes = teamData.radar.map((_, index) => {
    const [x, y] = pointAt(index);
    return `<line class="radar-axis" x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" />`;
  }).join("");
  const labels = teamData.radar.map((item, index) => {
    const [x, y] = pointAt(index, 126);
    const anchor = x < cx - 10 ? "end" : x > cx + 10 ? "start" : "middle";
    return `<text class="radar-label" x="${x}" y="${y}" text-anchor="${anchor}">${item.label} <tspan class="radar-value">${item.value}</tspan></text>`;
  }).join("");
  const points = teamData.radar.map((item, index) => {
    const [x, y] = pointAt(index, item.value);
    return `<circle class="radar-point" cx="${x}" cy="${y}" r="2.8" />`;
  }).join("");
  root.innerHTML = `
    <svg viewBox="0 0 300 300" role="img" aria-label="Профиль: роли 92, урон 76, макро 88, выживаемость 42, конверсия 32">
      <polygon class="radar-grid" points="${polygon(25)}" />
      <polygon class="radar-grid" points="${polygon(50)}" />
      <polygon class="radar-grid" points="${polygon(75)}" />
      <polygon class="radar-grid" points="${polygon(100)}" />
      ${axes}
      <polygon class="radar-shape" points="${shape}" />
      ${points}
      ${labels}
    </svg>`;
}

function renderPlayers() {
  const tabs = document.querySelector("#player-tabs");
  if (!tabs) return;
  tabs.innerHTML = teamData.players.map((player, index) => `
    <button class="player-tab" type="button" role="tab" id="player-tab-${index}" aria-selected="${index === 0}" aria-controls="player-profile" data-player="${index}">
      <span>0${index + 1} · ${player.tier}</span>
      <b>${player.name}</b>
      <small>${player.hero}</small>
    </button>`).join("");

  tabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-player]");
    if (!button) return;
    selectPlayer(Number(button.dataset.player));
  });

  tabs.addEventListener("keydown", (event) => {
    if (!["ArrowRight", "ArrowLeft"].includes(event.key)) return;
    const current = teamData.players.findIndex((_, index) => tabs.children[index].getAttribute("aria-selected") === "true");
    const next = (current + (event.key === "ArrowRight" ? 1 : -1) + teamData.players.length) % teamData.players.length;
    tabs.children[next].focus();
    selectPlayer(next);
  });
  selectPlayer(0, false);
}

function selectPlayer(index, animate = true) {
  const player = teamData.players[index];
  const profile = document.querySelector("#player-profile");
  if (!profile) return;
  document.querySelectorAll(".player-tab").forEach((tab, tabIndex) => tab.setAttribute("aria-selected", tabIndex === index));
  profile.querySelector(".profile-index").textContent = `PLAYER 0${index + 1}`;
  profile.querySelector(".hero-monogram").textContent = player.monogram;
  profile.querySelector(".profile-role").textContent = player.role;
  profile.querySelector(".profile-name").textContent = player.name;
  profile.querySelector(".profile-hero").textContent = player.hero;
  profile.querySelector(".tier-badge").textContent = player.tier;
  profile.querySelector(".profile-stats").innerHTML = Object.entries(player.stats).map(([label, value]) => `
    <div class="stat-box"><span>${label.toUpperCase()}</span><b>${value}</b></div>`).join("");
  profile.querySelector(".profile-bars").innerHTML = Object.entries(player.bars).map(([label, value]) => `
    <div class="profile-bar">
      <div class="profile-bar-head"><span>${label}</span><b>${value}</b></div>
      <div class="profile-bar-track"><i data-width="${value}%"></i></div>
    </div>`).join("");
  profile.querySelector("blockquote").textContent = player.verdict;
  profile.querySelector(".verdict-tags").innerHTML = player.tags.map((tag) => `<span>${tag}</span>`).join("");
  profile.querySelectorAll(".profile-bar-track i").forEach((bar) => requestAnimationFrame(() => { bar.style.width = bar.dataset.width; }));
  if (animate) {
    profile.animate([{ opacity: 0.55, transform: "translateY(5px)" }, { opacity: 1, transform: "none" }], { duration: 260, easing: "ease-out" });
  }
}

function renderTimeline() {
  const root = document.querySelector("#death-timeline");
  if (!root) return;
  root.innerHTML = teamData.clusters.map((cluster, index) => `
    <button
      type="button"
      class="timeline-tick${cluster.final ? " final" : ""}"
      style="left:${(cluster.time / 1545) * 100}%"
      data-cluster="${index}"
      data-count="−${cluster.casualties}"
      aria-label="${formatTime(cluster.time)}: ${cluster.label}, ${cluster.casualties} потери"
      aria-pressed="${index === teamData.clusters.length - 1}">
    </button>`).join("");
  root.addEventListener("click", (event) => {
    const button = event.target.closest("[data-cluster]");
    if (!button) return;
    selectCluster(Number(button.dataset.cluster));
  });
  selectCluster(teamData.clusters.length - 1);
}

function selectCluster(index) {
  const cluster = teamData.clusters[index];
  document.querySelectorAll(".timeline-tick").forEach((tick, tickIndex) => tick.setAttribute("aria-pressed", tickIndex === index));
  const detail = document.querySelector("#cluster-detail");
  detail.innerHTML = `
    <span class="cluster-time">${formatTime(cluster.time)}</span>
    <div><h3>${cluster.label}</h3><p>${cluster.players}</p></div>
    <span class="cluster-loss">${cluster.casualties} PLAYERS DOWN</span>`;
  detail.animate([{ opacity: 0.4 }, { opacity: 1 }], { duration: 220 });
}

function initReveal() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const items = document.querySelectorAll(".reveal");
  items.forEach((item) => item.style.setProperty("--delay", `${item.dataset.delay || 0}ms`));
  if (reduced || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("in-view"));
    document.querySelectorAll("[data-width]").forEach((bar) => { bar.style.width = bar.dataset.width; });
    return;
  }
  const revealItem = (item, observer) => {
    item.classList.add("in-view");
    item.querySelectorAll("[data-width]").forEach((bar) => requestAnimationFrame(() => { bar.style.width = bar.dataset.width; }));
    observer?.unobserve(item);
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      revealItem(entry.target, observer);
    });
  }, { threshold: 0.13 });
  const revealPassedContent = () => {
    items.forEach((item) => {
      if (item.classList.contains("in-view")) return;
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight * 1.08) revealItem(item, observer);
    });
  };
  items.forEach((item) => observer.observe(item));
  revealPassedContent();
  window.addEventListener("hashchange", () => requestAnimationFrame(revealPassedContent));
  window.setTimeout(revealPassedContent, 2400);
}

function initCounters() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const counters = document.querySelectorAll("[data-counter]");
  const run = (element) => {
    const target = Number(element.dataset.counter);
    if (reduced) { element.textContent = formatValue(target); return; }
    const start = performance.now();
    const duration = 1100;
    const frame = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = formatValue(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      run(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.8 });
  counters.forEach((counter) => observer.observe(counter));
}

function initHeader() {
  const header = document.querySelector("[data-header]");
  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  const update = () => header.classList.toggle("scrolled", window.scrollY > 18);
  update();
  window.addEventListener("scroll", update, { passive: true });
  menu.addEventListener("click", () => {
    const open = menu.getAttribute("aria-expanded") !== "true";
    menu.setAttribute("aria-expanded", open);
    nav.classList.toggle("open", open);
  });
  nav.addEventListener("click", (event) => {
    if (!event.target.closest("a")) return;
    menu.setAttribute("aria-expanded", "false");
    nav.classList.remove("open");
  });
}

function initDialog() {
  const dialog = document.querySelector("#methodology-dialog");
  document.querySelector("[data-open-methodology]")?.addEventListener("click", () => dialog.showModal());
  dialog?.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    if (outside) dialog.close();
  });
}

function initEpicMotion() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const progress = document.querySelector(".scroll-progress i");
  const heroVisual = document.querySelector(".hero-visual");
  const root = document.documentElement;

  if (!reduced) {
    document.body.classList.add("intro-active");
    root.classList.add("motion-ready");
    window.setTimeout(() => {
      document.body.classList.add("intro-complete");
      document.body.classList.remove("intro-active");
    }, 2250);
  }

  const updateProgress = () => {
    const available = document.documentElement.scrollHeight - window.innerHeight;
    const value = available > 0 ? Math.min(1, window.scrollY / available) : 0;
    progress.style.transform = `scaleX(${value})`;
  };
  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });

  if (reduced || !window.matchMedia("(pointer: fine)").matches) return;

  let pointerFrame = 0;
  window.addEventListener("pointermove", (event) => {
    if (pointerFrame) cancelAnimationFrame(pointerFrame);
    pointerFrame = requestAnimationFrame(() => {
      root.style.setProperty("--mouse-x", `${event.clientX}px`);
      root.style.setProperty("--mouse-y", `${event.clientY}px`);
      document.body.classList.add("pointer-active");
      if (heroVisual) {
        const x = ((event.clientX / window.innerWidth) - 0.5) * 18;
        const y = ((event.clientY / window.innerHeight) - 0.5) * 12;
        heroVisual.style.setProperty("--parallax-x", `${x}px`);
        heroVisual.style.setProperty("--parallax-y", `${y}px`);
      }
    });
  }, { passive: true });
  document.addEventListener("mouseleave", () => document.body.classList.remove("pointer-active"));

  document.querySelectorAll(".world-profile").forEach((profile) => {
    profile.addEventListener("pointermove", (event) => {
      const rect = profile.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 6;
      profile.style.setProperty("--profile-x", `${x}px`);
      profile.style.setProperty("--profile-y", `${y}px`);
    }, { passive: true });
    profile.addEventListener("pointerleave", () => {
      profile.style.setProperty("--profile-x", "0px");
      profile.style.setProperty("--profile-y", "0px");
    });
  });
}

function initCanvas() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const canvas = document.querySelector("#signal-canvas");
  const context = canvas.getContext("2d");
  let particles = [];
  let comets = [];
  let width = 0;
  let height = 0;
  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    particles = Array.from({ length: Math.min(52, Math.floor(width / 22)) }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      r: Math.random() * 1.4 + 0.3,
      violet: Math.random() > 0.72,
    }));
    comets = Array.from({ length: width > 800 ? 3 : 1 }, (_, index) => ({
      x: Math.random() * width,
      y: -80 - index * 240,
      speed: 1.1 + Math.random() * 0.8,
      delay: index * 180,
    }));
  };
  const draw = () => {
    context.clearRect(0, 0, width, height);
    const glow = context.createRadialGradient(width * 0.72, height * 0.38, 0, width * 0.72, height * 0.38, Math.min(width, height) * 0.42);
    glow.addColorStop(0, "rgba(98,246,211,.025)");
    glow.addColorStop(0.45, "rgba(129,117,255,.018)");
    glow.addColorStop(1, "rgba(7,11,19,0)");
    context.fillStyle = glow;
    context.fillRect(0, 0, width, height);
    particles.forEach((particle, index) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      if (particle.x < 0 || particle.x > width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > height) particle.vy *= -1;
      context.beginPath();
      context.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
      context.fillStyle = particle.violet ? "rgba(129,117,255,.42)" : "rgba(98,246,211,.3)";
      context.fill();
      for (let next = index + 1; next < particles.length; next += 1) {
        const other = particles[next];
        const distance = Math.hypot(particle.x - other.x, particle.y - other.y);
        if (distance > 115) continue;
        context.beginPath();
        context.moveTo(particle.x, particle.y);
        context.lineTo(other.x, other.y);
        context.strokeStyle = `rgba(98,246,211,${0.055 * (1 - distance / 115)})`;
        context.stroke();
      }
    });
    comets.forEach((comet) => {
      comet.delay -= 1;
      if (comet.delay > 0) return;
      comet.x += comet.speed * 0.48;
      comet.y += comet.speed;
      const trail = context.createLinearGradient(comet.x - 75, comet.y - 125, comet.x, comet.y);
      trail.addColorStop(0, "rgba(98,246,211,0)");
      trail.addColorStop(1, "rgba(98,246,211,.5)");
      context.beginPath();
      context.moveTo(comet.x - 75, comet.y - 125);
      context.lineTo(comet.x, comet.y);
      context.strokeStyle = trail;
      context.lineWidth = 1;
      context.stroke();
      context.beginPath();
      context.arc(comet.x, comet.y, 1.8, 0, Math.PI * 2);
      context.fillStyle = "rgba(220,255,247,.9)";
      context.fill();
      if (comet.y > height + 140) {
        comet.x = Math.random() * width * 0.8;
        comet.y = -160;
        comet.delay = 260 + Math.random() * 420;
      }
    });
    requestAnimationFrame(draw);
  };
  resize();
  window.addEventListener("resize", resize);
  draw();
}

renderComparison();
renderRadar();
renderPlayers();
renderTimeline();
initReveal();
initCounters();
initHeader();
initDialog();
initEpicMotion();
initCanvas();
