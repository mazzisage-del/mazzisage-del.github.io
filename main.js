/* Portfolio — Mazzi */
(() => {
  "use strict";

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(pointer: fine)").matches;

  /* ---------------- project data ---------------- */
  const projects = {
    strategy: {
      title: "Blocks of Iron", tag: "Grand strategy", cat: "games systems",
      desc: "A grand-strategy game set in the ancient world, played on a fully interactive 3D globe. Pick a great power like the Roman Republic or the Seleucid Empire, then manage territory, diplomacy and politics across the whole map.",
      built: ["Interactive 3D globe with smooth orbit-to-province zoom", "Province map with nation ownership and labels", "Nation select screen with great powers", "Diplomacy and elections menus", "Live nation stats sidebar", "Space skybox and atmosphere"],
    },
    arena: {
      title: "Ability Arena", tag: "Round-based PvP", cat: "games combat",
      desc: "A round-based battle game where players fight across multiple stages, each with its own map and lighting, using abilities that trade risk for power.",
      built: ["Intermission → stage → results loop with timers", "Stage transitions (Desert → Forest)", "Ability system with costs like \"the price is paid\"", "Cinematic ability callouts and VFX", "Capture zones and hold objectives", "Shop and mount support"],
    },
    rpg: {
      title: "Open-World RPG", tag: "RPG framework", cat: "games systems",
      desc: "The core of an open-world RPG: choose a race, train your character and head out into the world to gather, climb and explore.",
      built: ["Race selection (Human, Equines, Abyssal) with stats", "Training system with completion feedback", "Resource gathering with breakable rocks and debris", "Wall climbing and traversal", "Hotbar inventory and health HUD", "Full settings menu"],
    },
    combat: {
      title: "Combat & Summons", tag: "Combat framework", cat: "combat",
      desc: "A combat framework built around summonable fighters, combos and big moves, tested against dummies in a sandbox.",
      built: ["Summon / stand-style fighters that follow the player", "Combos, blocking and hit reactions", "Time-stop effect with world desaturation", "Projectile and charged abilities", "Training dummies for balancing", "Cooldown and move-list HUD"],
    },
    horror: {
      title: "Night Shift", tag: "Story horror", cat: "games",
      desc: "A story-driven horror game: walk in through a foggy intro with subtitled narration, then survive the night shift at Ace Co. Pizzeria.",
      built: ["Scripted intro cutscene with subtitles", "Security camera system", "Power meter and night clock", "Atmospheric lighting and fog", "Office controls and interactables"],
    },
    ocean: {
      title: "Custom Ocean", tag: "Gerstner waves", cat: "world systems",
      desc: "An open ocean built from scratch with Gerstner wave math: big rolling swells you can swim across, ride over and dive beneath.",
      built: ["Gerstner wave simulation, made from scratch", "Large rolling swells with tunable height and length", "Swimming that rides the wave surface", "Diving with an underwater view", "Sun glints and foam on the crests", "Smooth performance on huge water areas"],
    },
    horse: {
      title: "Horse Riding", tag: "Mount system", cat: "world systems",
      desc: "A mount system with smooth acceleration, gallop animations and a live speed readout.",
      built: ["Mount and dismount flow", "Acceleration and top-speed handling", "Gallop, turn and jump animations", "Live speed indicator"],
    },
    access: {
      title: "Resident Access", tag: "Interaction system", cat: "systems world",
      desc: "Apartment and facility doors that check whether the player is allowed in, with a civic registry lookup and clear feedback.",
      built: ["Resident-only doors with access checks", "Registry lookup with \"resident not found\" feedback", "Animated, interactive doors", "Readable on-screen prompts"],
    },
    island: {
      title: "Island Hub", tag: "Lobby & queues", cat: "systems world",
      desc: "An island lobby with dock queue pads that fill up and count down, plus swimming in calm, tuned water.",
      built: ["Queue pads with player capacity (0/4, 0/1)", "Countdown timers per pad", "Swimming and water tuning", "Hub layout with boats and docks"],
    },
  };
  const gridOrder = ["arena", "rpg", "combat", "horror", "ocean", "horse", "access", "island"];

  /* ---------------- build grid ---------------- */
  const grid = document.getElementById("grid");
  grid.innerHTML = gridOrder.map((id, i) => {
    const p = projects[id];
    return `<article class="card reveal" data-id="${id}" data-cat="${p.cat}" tabindex="0" style="--d:${(i % 2) * 0.1}s">
      <div class="card-media">
        <video muted loop playsinline preload="none" poster="media/${id}.jpg" data-src="media/${id}-loop.mp4"></video>
        <span class="play-pill"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg> Watch</span>
      </div>
      <div class="card-body"><p class="tag">${p.tag}</p><h3>${p.title}</h3><p>${p.desc}</p></div>
      <span class="shine"></span>
    </article>`;
  }).join("");

  /* ---------------- reveal on scroll ---------------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal").forEach((el, i) => {
    if (el.closest(".hero")) el.style.setProperty("--d", `${0.1 + i * 0.12}s`);
    io.observe(el);
  });
  document.querySelectorAll(".services .svc, .steps .step").forEach((el, i) => el.style.setProperty("--d", `${(i % 3) * 0.1}s`));

  /* ---------------- videos: lazy-load + autoplay in view ---------------- */
  const loadVideo = (v) => { if (!v.src && v.dataset.src) v.src = v.dataset.src; };
  const vio = new IntersectionObserver((entries) => {
    entries.forEach(({ target: v, isIntersecting }) => {
      if (isIntersecting) { loadVideo(v); if (!reduceMotion) v.play().catch(() => {}); }
      else v.pause();
    });
  }, { threshold: 0.35 });
  document.querySelectorAll(".card video, .featured video").forEach((v) => vio.observe(v));

  /* ---------------- typer ---------------- */
  const typer = document.getElementById("typer");
  const words = ["combat frameworks.", "grand-strategy games.", "custom ocean physics.", "round-based PvP.", "horror experiences.", "clean, secure systems."];
  if (!reduceMotion) {
    let w = 0, c = words[0].length, del = true;
    const tick = () => {
      const word = words[w];
      c += del ? -1 : 1;
      typer.textContent = word.slice(0, c);
      let delay = del ? 35 : 70;
      if (!del && c === word.length) { del = true; delay = 1800; }
      else if (del && c === 0) { del = false; w = (w + 1) % words.length; delay = 300; }
      setTimeout(tick, delay);
    };
    typer.textContent = words[0];
    setTimeout(tick, 2200);
  } else typer.textContent = words[0];

  /* ---------------- counters ---------------- */
  const cio = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return;
      cio.unobserve(target);
      const to = +target.dataset.to, t0 = performance.now(), dur = 1400;
      const step = (t) => {
        const k = Math.min(1, (t - t0) / dur);
        target.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  });
  document.querySelectorAll(".count").forEach((el) => cio.observe(el));

  /* ---------------- skill bars ---------------- */
  const sio = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); sio.unobserve(e.target); }
  }), { threshold: 0.3 });
  document.querySelectorAll(".skills").forEach((el) => sio.observe(el));

  /* ---------------- nav, progress, cursor glow ---------------- */
  const nav = document.getElementById("nav");
  const bar = document.querySelector(".progress");
  const onScroll = () => {
    nav.classList.toggle("scrolled", scrollY > 30);
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");
  menuBtn.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
  });
  navLinks.addEventListener("click", (e) => {
    if (e.target.closest("a")) { navLinks.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); }
  });

  if (finePointer && !reduceMotion) {
    const glow = document.querySelector(".cursor-glow");
    let gx = 0, gy = 0, tx = 0, ty = 0, raf = 0;
    const loop = () => {
      gx += (tx - gx) * 0.12; gy += (ty - gy) * 0.12;
      glow.style.left = gx + "px"; glow.style.top = gy + "px";
      raf = Math.abs(tx - gx) + Math.abs(ty - gy) > 0.5 ? requestAnimationFrame(loop) : 0;
    };
    addEventListener("pointermove", (e) => { tx = e.clientX; ty = e.clientY; if (!raf) raf = requestAnimationFrame(loop); }, { passive: true });

    /* magnetic buttons */
    document.querySelectorAll(".magnetic").forEach((b) => {
      b.addEventListener("pointermove", (e) => {
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px, ${(e.clientY - r.top - r.height / 2) * 0.25}px)`;
      });
      b.addEventListener("pointerleave", () => { b.style.transform = ""; });
    });

    /* card tilt + shine */
    document.querySelectorAll(".card").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        card.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 5}deg) rotateY(${(x - 0.5) * 6}deg) translateY(-4px)`;
        card.style.setProperty("--mx", x * 100 + "%");
        card.style.setProperty("--my", y * 100 + "%");
      });
      card.addEventListener("pointerleave", () => { card.style.transform = ""; });
    });
  }

  /* ---------------- filters ---------------- */
  document.querySelectorAll(".filter").forEach((btn) => btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((b) => b.classList.toggle("active", b === btn));
    const f = btn.dataset.filter;
    grid.querySelectorAll(".card").forEach((card) => {
      const show = f === "all" || card.dataset.cat.split(" ").includes(f);
      card.classList.toggle("hide", !show);
      if (show) {
        card.classList.add("in");
        card.animate?.([{ opacity: 0, transform: "translateY(16px) scale(.98)" }, { opacity: 1, transform: "none" }], { duration: 450, easing: "cubic-bezier(.2,.8,.2,1)" });
      }
    });
  }));

  /* ---------------- modal ---------------- */
  const modal = document.getElementById("modal");
  const mVideo = document.getElementById("mVideo");
  let lastFocus = null;
  const openModal = (id) => {
    const p = projects[id];
    if (!p) return;
    lastFocus = document.activeElement;
    document.getElementById("mTag").textContent = p.tag;
    document.getElementById("mTitle").textContent = p.title;
    document.getElementById("mDesc").textContent = p.desc;
    document.getElementById("mBuilt").innerHTML = p.built.map((b) => `<li>${b}</li>`).join("");
    mVideo.poster = `media/${id}.jpg`;
    mVideo.src = `media/${id}-full.mp4`;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modal.querySelector(".modal-close").focus();
    mVideo.play().catch(() => {});
  };
  const closeModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    mVideo.pause();
    mVideo.removeAttribute("src"); mVideo.load();
    lastFocus?.focus();
  };
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".card, .featured");
    if (card) openModal(card.dataset.id);
    if (e.target.closest("[data-close]")) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
    if (e.key === "Enter" && e.target.matches?.(".card, .featured")) openModal(e.target.dataset.id);
  });

  /* ---------------- copy discord ---------------- */
  const toast = document.getElementById("toast");
  let toastT;
  const showToast = (msg) => {
    toast.textContent = msg; toast.classList.add("show");
    clearTimeout(toastT); toastT = setTimeout(() => toast.classList.remove("show"), 2200);
  };
  document.querySelectorAll(".copy-discord").forEach((b) => b.addEventListener("click", async () => {
    const name = b.dataset.discord;
    try { await navigator.clipboard.writeText(name); showToast(`Discord "${name}" copied, add me!`); }
    catch { showToast(`My Discord: ${name}`); }
  }));

  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------------- code viewer ---------------- */
  const snippets = {
    waves: `--!strict
-- Gerstner wave displacement, used for the ocean surface and swimming.
local Waves = {}

export type Wave = {
	direction: Vector2,
	steepness: number, -- 0..1, how sharp the crests are
	wavelength: number, -- studs
}

local TAU = 2 * math.pi

function Waves.displace(point: Vector3, waves: { Wave }, t: number): Vector3
	local offset = Vector3.zero

	for _, wave in waves do
		local k = TAU / wave.wavelength
		local speed = math.sqrt(workspace.Gravity / k)
		local dir = wave.direction.Unit
		local phase = k * (dir.X * point.X + dir.Y * point.Z - speed * t)
		local amplitude = wave.steepness / k

		offset += Vector3.new(
			dir.X * amplitude * math.cos(phase),
			amplitude * math.sin(phase),
			dir.Y * amplitude * math.cos(phase)
		)
	end

	return point + offset
end

function Waves.heightAt(x: number, z: number, waves: { Wave }, t: number): number
	return Waves.displace(Vector3.new(x, 0, z), waves, t).Y
end

return Waves`,
    remote: `--!strict
-- Token-bucket rate limiter for remotes. Every request costs one token.
local Players = game:GetService("Players")

local RateLimit = {}

type Bucket = { tokens: number, last: number }
local buckets: { [Player]: Bucket } = {}

function RateLimit.allow(player: Player, rate: number, burst: number): boolean
	local now = os.clock()
	local bucket = buckets[player]
	if not bucket then
		bucket = { tokens = burst, last = now }
		buckets[player] = bucket
	end

	bucket.tokens = math.min(burst, bucket.tokens + (now - bucket.last) * rate)
	bucket.last = now

	if bucket.tokens < 1 then
		return false
	end
	bucket.tokens -= 1
	return true
end

Players.PlayerRemoving:Connect(function(player)
	buckets[player] = nil
end)

return RateLimit

-- usage (server):
-- Remotes.UseAbility.OnServerEvent:Connect(function(player, id: unknown)
-- 	if typeof(id) ~= "string" or not Abilities[id] then return end
-- 	if not RateLimit.allow(player, 4, 6) then return end
-- 	Abilities[id]:Cast(player)
-- end)`,
    round: `--!strict
-- Simple round loop. Clients read the attributes to draw timers.
local RoundService = {}

type State = "Intermission" | "Stage" | "Results"

local DURATION: { [State]: number } = {
	Intermission = 20,
	Stage = 180,
	Results = 8,
}

local NEXT: { [State]: State } = {
	Intermission = "Stage",
	Stage = "Results",
	Results = "Intermission",
}

local changed = Instance.new("BindableEvent")
RoundService.Changed = changed.Event

local function enter(state: State)
	workspace:SetAttribute("RoundState", state)
	workspace:SetAttribute("RoundEndsAt", workspace:GetServerTimeNow() + DURATION[state])
	changed:Fire(state)
end

function RoundService.start()
	task.spawn(function()
		local state: State = "Intermission"
		while true do
			enter(state)
			task.wait(DURATION[state])
			state = NEXT[state]
		end
	end)
end

return RoundService`,
  };

  const KW = new Set("local function end if then else elseif return for in do while repeat until break true false nil not and or export type continue".split(" "));
  const BI = new Set("game workspace task math os string table Vector3 Vector2 CFrame Instance typeof print warn pairs ipairs".split(" "));
  const TY = new Set("number string boolean Player Vector3 Vector2 State Wave Bucket unknown".split(" "));
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const highlight = (src) => src.split("\n").map((line, i) => {
    const out = line.replace(/(--.*$)|("(?:[^"\\]|\\.)*")|(\b\d+(?:\.\d+)?\b)|([A-Za-z_]\w*)(\s*\()?|([^A-Za-z_"\-\d]+|-)/g,
      (m, com, str, num, id, call, other) => {
        if (com) return `<span class="t-c">${esc(com)}</span>`;
        if (str) return `<span class="t-s">${esc(str)}</span>`;
        if (num) return `<span class="t-n">${num}</span>`;
        if (id) {
          const rest = call ? esc(call) : "";
          if (KW.has(id)) return `<span class="t-k">${id}</span>${rest}`;
          if (BI.has(id)) return `<span class="t-b">${id}</span>${rest}`;
          if (TY.has(id)) return `<span class="t-t">${id}</span>${rest}`;
          if (call) return `<span class="t-f">${id}</span>${rest}`;
          return id;
        }
        return esc(other ?? m);
      });
    return `<span class="ln">${i + 1}</span>${out}`;
  }).join("\n");

  const codeView = document.getElementById("codeView");
  const showTab = (name) => {
    codeView.innerHTML = highlight(snippets[name]);
    codeView.classList.remove("code-in"); void codeView.offsetWidth; codeView.classList.add("code-in");
    document.querySelectorAll(".tab").forEach((t) => t.classList.toggle("active", t.dataset.tab === name));
  };
  document.querySelectorAll(".tab").forEach((t) => t.addEventListener("click", () => showTab(t.dataset.tab)));
  showTab("waves");
})();
