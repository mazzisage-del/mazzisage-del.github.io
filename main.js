// mazzi portfolio. plain js, no build step, no libraries.
(() => {
  "use strict";

  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasMouse = matchMedia("(hover: hover) and (pointer: fine)").matches;

  // ---------------------------------------------------------------- projects
  // first one is the featured panel, the rest fill the grid in this order.
  // a project with more than one clip gets clip tabs in the viewer.
  const projects = [
    {
      id: "strategy", title: "Blocks of Iron", tag: "Grand strategy", cats: ["games", "systems"],
      blurb: "Ancient-world grand strategy on a 3D globe.",
      desc: "A grand-strategy game set in the ancient world, played on a fully interactive 3D globe. Pick a great power like the Roman Republic or the Seleucid Empire, then manage territory, diplomacy and politics across the whole map.",
      built: ["Interactive 3D globe with smooth orbit-to-province zoom", "Province map with nation ownership and labels", "Nation select screen with great powers", "Diplomacy and elections menus", "Live nation stats sidebar", "Space skybox and atmosphere"],
    },
    {
      id: "dash", title: "Sandevistan", tag: "Cyberpunk 2077 inspired", cats: ["combat"],
      blurb: "Slow the world down and leave afterimages behind.",
      desc: "An ability inspired by the Sandevistan from Cyberpunk 2077. The world slows to a crawl while you keep moving at full speed, and you leave a trail of colour-shifting afterimages behind you.",
      built: ["Time slows down for everything but the player", "Afterimages left behind as you move", "Afterimage colours shift as the trail grows", "Screen tint while the ability is active", "Cooldown shown on the HUD"],
    },
    {
      id: "ocean", title: "Custom Ocean", tag: "Gerstner waves", cats: ["world", "systems"],
      blurb: "Rolling swells you can swim over and dive under.",
      desc: "An open ocean built from scratch with Gerstner wave math: big rolling swells you can swim across, ride over and dive beneath.",
      built: ["Gerstner wave simulation, made from scratch", "Large rolling swells with tunable height and length", "Swimming that rides the wave surface", "Diving with an underwater view", "Sun glints and foam on the crests", "Smooth performance on huge water areas"],
    },
    {
      id: "arena", title: "Ability Arena", tag: "Round-based PvP", cats: ["games", "combat"],
      blurb: "Rounds, stages and abilities that cost you something.",
      desc: "A round-based battle game where players fight across multiple stages, each with its own map and lighting, using abilities that trade risk for power.",
      built: ["Intermission → stage → results loop with timers", "Stage transitions (Desert → Forest)", "Ability system with costs like \"the price is paid\"", "Cinematic ability callouts and VFX", "Capture zones and hold objectives", "Shop and mount support"],
    },
    {
      id: "monster", title: "Dynamax Addition to PBB Copy", tag: "Pokémon Brick Bronze", cats: ["games", "systems"],
      blurb: "A Dynamax mechanic added to a Pokémon Brick Bronze copy.",
      desc: "A Dynamax mechanic I added to a copy of Pokémon Brick Bronze (PBB). In a wild battle you can Dynamax your Pokémon in the middle of the fight. It grows, gets a boosted look, and its moves are swapped for Max Moves.",
      built: ["Dynamax option added to the battle menu", "Pokémon grows and changes colour when it Dynamaxes", "Moves swap to Max Moves (Max Strike, Max Geyser, Max Phantasm)", "Dynamax announcement in the battle text box", "Stat boosts and battle messages", "Works inside the existing PBB battle system"],
    },
    {
      id: "turrets", title: "Sentry Turrets", tag: "Enemy AI", cats: ["combat", "systems"],
      blurb: "Turrets with bullet gravity and an overheat system.",
      desc: "Enemy turrets for a shooter sandbox. They track the player and open fire, and their bullets are affected by gravity, so shots drop over distance. A turret that fires too long overheats and has to cool down.",
      built: ["Turrets that track and fire at the player", "Bullet gravity, so shots arc and drop over distance", "Overheat system that makes turrets cool down", "Muzzle flash and impact debris", "Damage vignette and health bar feedback", "Knockdown and ragdoll when the player goes down"],
      clips: [{ id: "turret-a", label: "Sentry Turrets" }],
    },
    {
      id: "turret-b", title: "Quickhack", tag: "Cyberpunk 2077 inspired", cats: ["combat", "systems"],
      blurb: "Hack a turret from range and take it out.",
      desc: "A quickhack ability inspired by Cyberpunk 2077. Instead of shooting, you hack a sentry turret from a distance and take it out, leaving a burning wreck behind.",
      built: ["Hack an enemy from range", "Takes a turret out without a shot", "Burning wreck and smoke left behind", "Works alongside the turret AI"],
    },
    {
      id: "boom", title: "Explosion", tag: "VFX", cats: ["combat"],
      blurb: "A huge blast that ends in a wall of fire.",
      desc: "A large explosion effect from my combat sandbox. It starts with a charge-up, then a huge blast with fire and smoke that lingers after the hit.",
      built: ["Ground marker and charge-up glow", "Huge blast with chained explosions", "Fire and smoke that linger", "Screen flash on the hit"],
    },
    {
      id: "grab", title: "Finisher", tag: "Ability + explosion", cats: ["combat"],
      blurb: "A long-range grab that ends in a blast of red.",
      desc: "A finisher ability. It reaches out and grabs the target from range, pulls them in, then ends with a heavy punch, a white screen flash and an explosion of red particles.",
      built: ["Long-range grab that pulls the target in", "Heavy punch on arrival", "Impact frames and a white screen flash", "Explosion of red particles on the hit"],
    },
    {
      id: "rpg", title: "Open-World RPG", tag: "RPG framework", cats: ["games", "systems"],
      blurb: "Races, training, gathering and climbing.",
      desc: "The core of an open-world RPG: choose a race, train your character and head out into the world to gather, climb and explore.",
      built: ["Race selection (Human, Equines, Abyssal) with stats", "Training system with completion feedback", "Resource gathering with breakable rocks and debris", "Wall climbing and traversal", "Hotbar inventory and health HUD", "Full settings menu"],
    },
    {
      id: "horror", title: "Night Shift", tag: "Story horror", cats: ["games"],
      blurb: "A cutscene intro, security cameras and a power meter.",
      desc: "A story-driven horror game: walk in through a foggy intro with subtitled narration, then survive the night shift at Ace Co. Pizzeria.",
      built: ["Scripted intro cutscene with subtitles", "Security camera system", "Power meter and night clock", "Atmospheric lighting and fog", "Office controls and interactables"],
    },
    {
      id: "combat", title: "Combat & Summons", tag: "Combat framework", cats: ["combat"],
      blurb: "Summoned fighters, combos and a time stop.",
      desc: "A combat framework built around summonable fighters, combos and big moves, tested against dummies in a sandbox.",
      built: ["Summon / stand-style fighters that follow the player", "Combos, blocking and hit reactions", "Time-stop effect with world desaturation", "Projectile and charged abilities", "Training dummies for balancing", "Cooldown and move-list HUD"],
    },
    {
      id: "build", title: "Build Mode", tag: "Building system", cats: ["systems", "world"],
      blurb: "Drag out walls that join with clean corners.",
      desc: "A placement system for building walls piece by piece. A ghost preview shows where the piece will land, walls stretch as you drag, and corners join with clean mitered edges.",
      built: ["Ghost preview before you place", "Drag to stretch a wall to any length", "Corners join with mitered edges", "Pieces connect end to end"],
    },
    {
      id: "horse", title: "Horse Riding", tag: "Mount system", cats: ["world", "systems"],
      blurb: "A mount with real acceleration and a speed readout.",
      desc: "A mount system with smooth acceleration, gallop animations and a live speed readout.",
      built: ["Mount and dismount flow", "Acceleration and top-speed handling", "Gallop, turn and jump animations", "Live speed indicator"],
    },
    {
      id: "access", title: "Resident Access", tag: "Interaction system", cats: ["systems", "world"],
      blurb: "Doors that check if you actually live there.",
      desc: "Apartment and facility doors that check whether the player is allowed in, with a civic registry lookup and clear feedback.",
      built: ["Resident-only doors with access checks", "Registry lookup with \"resident not found\" feedback", "Animated, interactive doors", "Readable on-screen prompts"],
    },
    {
      id: "island", title: "Island Hub", tag: "Lobby & queues", cats: ["systems", "world"],
      blurb: "Dock queue pads with player counts and timers.",
      desc: "An island lobby with dock queue pads that fill up and count down, plus swimming in calm, tuned water.",
      built: ["Queue pads with player capacity (0/4, 0/1)", "Countdown timers per pad", "Swimming and water tuning", "Hub layout with boats and docks"],
    },
  ];
  for (const p of projects) p.clips ??= [{ id: p.id, label: p.title }];
  const byId = Object.fromEntries(projects.map((p) => [p.id, p]));
  const order = projects.map((p) => p.id);

  $("#count").dataset.to = projects.length;
  $("#count").textContent = projects.length;
  $("#year").textContent = new Date().getFullYear();

  // ---------------------------------------------------------------- grid
  const grid = $("#grid");
  grid.innerHTML = projects.slice(1).map((p) => `
    <a class="card rise" href="#${p.id}" data-clip="${p.clips[0].id}" data-cats="${p.cats.join(" ")}">
      <div class="card-in">
        <div class="shot">
          <img src="media/${p.clips[0].id}.webp" alt="${p.title} preview" loading="lazy" decoding="async">
          <span class="cap">${p.tag}</span>
          ${p.clips.length > 1 ? `<span class="n-clips">${p.clips.length} clips</span>` : ""}
        </div>
        <div class="meta"><h3>${p.title}</h3><p>${p.blurb}</p></div>
      </div>
    </a>`).join("");
  const cards = $$(".card", grid);

  // lay the panels out like a comic page: rows of 2 and 3, never one panel on its own
  function layout() {
    const shown = cards.filter((c) => !c.hidden);
    let i = 0, pair = true, flip = false;
    while (i < shown.length) {
      const left = shown.length - i;
      let n = Math.min(pair ? 2 : 3, left);
      if (left - n === 1) n = left;
      const spans = n === 1 ? [7] : n === 2 ? (flip ? [5, 7] : [7, 5]) : n === 3 ? [4, 4, 4] : [3, 3, 3, 3];
      const h = n <= 2 ? 300 : n === 3 ? 232 : 196;
      shown.slice(i, i + n).forEach((card, k) => {
        card.style.setProperty("--span", spans[k]);
        card.style.setProperty("--h", h + "px");
        card.style.setProperty("--d", k * 70 + "ms");
      });
      if (n === 2) flip = !flip;
      pair = !pair;
      i += n;
    }
  }
  layout();

  // filters
  const filterNames = { all: "All", combat: "Combat", systems: "Systems", world: "World", games: "Full games" };
  const filters = $("#filters");
  filters.innerHTML = Object.entries(filterNames).map(([key, name]) => {
    const n = key === "all" ? cards.length : cards.filter((c) => c.dataset.cats.split(" ").includes(key)).length;
    return `<button class="filter${key === "all" ? " on" : ""}" data-filter="${key}" aria-pressed="${key === "all"}">${name}<sup>${n}</sup></button>`;
  }).join("");
  filters.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn || btn.classList.contains("on")) return;
    for (const b of $$(".filter", filters)) {
      b.classList.toggle("on", b === btn);
      b.setAttribute("aria-pressed", b === btn);
    }
    const key = btn.dataset.filter;
    for (const c of cards) c.hidden = !(key === "all" || c.dataset.cats.split(" ").includes(key));
    layout();
    cards.filter((c) => !c.hidden).forEach((c, k) => {
      c.classList.add("in");
      if (!calm) c.animate([{ opacity: 0, transform: "translateY(12px)" }, { opacity: 1, transform: "none" }], { duration: 320, delay: k * 28, easing: "cubic-bezier(.16,1,.3,1)", fill: "backwards" });
    });
  });

  // ---------------------------------------------------------------- what i do
  const moves = [
    { t: "Combat & abilities", d: "Hitboxes, combos, cooldowns, dashes and finishers, with the damage checked on the server.", to: "dash", peek: "dash" },
    { t: "Enemies & AI", d: "Enemies that track you, shoot, take damage and go down properly.", to: "turrets", peek: "turret-a" },
    { t: "Game loops", d: "Rounds, intermissions, stages, queues and win conditions.", to: "arena", peek: "arena" },
    { t: "World systems", d: "Oceans, mounts, building tools and doors that know who you are.", to: "ocean", peek: "ocean" },
    { t: "UI & menus", d: "Character select, HUDs, battle menus and settings screens.", to: "monster", peek: "monster" },
    { t: "Data & saving", d: "Inventories, currency and progress saved with DataStores." },
    { t: "Tools & Python", d: "Scripts that automate the boring parts outside of Studio." },
  ];
  $("#moves").innerHTML = moves.map((m, i) => {
    const inner = `<span class="n">${String(i + 1).padStart(2, "0")}</span><span class="t">${m.t}</span><span class="d">${m.d}</span>`;
    return m.to
      ? `<li class="rise"><a class="move" href="#${m.to}" data-peek="${m.peek}">${inner}<span class="go">see it <span aria-hidden="true">→</span></span></a></li>`
      : `<li class="rise"><div class="move">${inner}<span class="go"></span></div></li>`;
  }).join("");

  // thumbnail that trails the cursor over rows that have a clip
  if (hasMouse) {
    const peek = $("#peek"), img = $("img", peek), list = $("#moves");
    let x = 0, y = 0, tx = 0, ty = 0, raf = 0, shown = "";
    const follow = () => {
      x += (tx - x) * 0.22; y += (ty - y) * 0.22;
      peek.style.transform = `translate3d(${x + 26}px, ${y - 190}px, 0) rotate(-2deg)`;
      raf = peek.classList.contains("on") || Math.abs(tx - x) > 0.5 ? requestAnimationFrame(follow) : 0;
    };
    list.addEventListener("pointermove", (e) => {
      const row = e.target.closest("a.move");
      tx = e.clientX; ty = e.clientY;
      if (!row) return peek.classList.remove("on");
      if (shown !== row.dataset.peek) { shown = row.dataset.peek; img.src = `media/${shown}.webp`; }
      if (!peek.classList.contains("on")) { x = tx; y = ty; peek.classList.add("on"); }
      if (!raf) raf = requestAnimationFrame(follow);
    }, { passive: true });
    list.addEventListener("pointerleave", () => peek.classList.remove("on"));
    addEventListener("scroll", () => peek.classList.remove("on"), { passive: true });
  }

  // ---------------------------------------------------------------- reveal on scroll
  const reveal = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add("in"); reveal.unobserve(e.target); }
  }, { rootMargin: "0px 0px -7% 0px", threshold: 0.08 });
  $$(".rise").forEach((el) => reveal.observe(el));
  $$(".hero .rise").forEach((el, i) => el.style.setProperty("--d", i * 80 + "ms"));
  $$("#moves .rise").forEach((el, i) => el.style.setProperty("--d", i * 45 + "ms"));

  // progress line across the top, plus a little parallax on the OC (both just transforms, one rAF)
  let heroInView = true;
  const bar = $("#bar"), artWrap = $("#art").parentElement;
  let scrollQueued = false;
  const onScroll = () => {
    scrollQueued = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
    if (!calm && heroInView) artWrap.style.transform = `translate3d(0, ${(scrollY * -0.06).toFixed(1)}px, 0)`;
  };
  addEventListener("scroll", () => { if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(onScroll); } }, { passive: true });
  addEventListener("resize", onScroll);

  // nav gets its border once you leave the top
  const nav = $("#nav");
  new IntersectionObserver(([e]) => nav.classList.toggle("stuck", !e.isIntersecting)).observe($("#top-mark"));

  // stop the looping animations when they're off screen
  const tape = $(".tape"), hero = $(".hero");
  new IntersectionObserver(([e]) => tape.classList.toggle("off", !e.isIntersecting)).observe(tape);
  new IntersectionObserver(([e]) => { heroInView = e.isIntersecting; hero.classList.toggle("off", !heroInView); }).observe(hero);

  // ---------------------------------------------------------------- the eye
  // the pupil is a tiny element sitting over the art. with a mouse it looks at the cursor.
  const pupil = $("#pupil"), art = $("#art");
  if (pupil && !calm && CSS.supports("width", "1cqw")) {
    if (hasMouse) {
      let px = 0, py = 0, queued = false, reach = art.clientWidth * 0.0062;
      new ResizeObserver(() => { reach = art.clientWidth * 0.0062; }).observe(art);
      const look = () => {
        queued = false;
        const r = pupil.parentElement.getBoundingClientRect();
        const dx = px - (r.left + r.width / 2), dy = py - (r.top + r.height / 2);
        const dist = Math.hypot(dx, dy) || 1;
        const pull = Math.min(1, dist / 240) * reach;
        pupil.style.transform = `translate(${(dx / dist) * pull}px, ${(dy / dist) * pull * 0.8}px)`;
      };
      addEventListener("pointermove", (e) => {
        if (!heroInView || e.pointerType !== "mouse") return;
        px = e.clientX; py = e.clientY;
        if (!queued) { queued = true; requestAnimationFrame(look); }
      }, { passive: true });
    } else {
      pupil.classList.add("idle"); // no cursor to follow, so it just glances around
    }
  }

  // ---------------------------------------------------------------- clip previews
  // nothing loads or decodes until it is needed, and only one preview plays at a time.
  const viewer = $("#viewer");
  const pool = []; // preview videos for the grid, oldest first
  let playing = null;
  function startPreview(host) {
    if (calm || viewer.open) return;
    if (playing && playing !== host) stopPreview(playing);
    const shot = $(".shot", host);
    let v = $("video", shot);
    if (v && host !== feat) pool.push(pool.splice(pool.indexOf(v), 1)[0]);
    if (!v) {
      v = document.createElement("video");
      Object.assign(v, { muted: true, loop: true, playsInline: true, preload: "auto", src: `media/${host.dataset.clip}-loop.mp4` });
      v.setAttribute("aria-hidden", "true");
      v.addEventListener("playing", () => v.classList.add("on"));
      shot.append(v);
      if (host !== feat) {
        pool.push(v);
        if (pool.length > 3) { const old = pool.shift(); old.removeAttribute("src"); old.load(); old.remove(); }
      }
    }
    playing = host;
    v.play().catch(() => {});
  }
  function stopPreview(host) {
    const v = $("video", host);
    if (v) { v.pause(); v.classList.remove("on"); }
    if (playing === host) playing = null;
  }

  const feat = $("#feat");
  feat.dataset.clip = "strategy";
  let featInView = false;

  if (hasMouse) {
    // desktop: preview on hover, with a small delay so sweeping across the grid doesn't start six videos
    for (const host of [feat, ...cards]) {
      let timer = 0;
      host.addEventListener("pointerenter", () => { timer = setTimeout(() => startPreview(host), 90); });
      host.addEventListener("pointerleave", () => {
        clearTimeout(timer);
        if (host === feat && featInView) return; // the featured one keeps playing while it's on screen
        stopPreview(host);
        if (featInView && !playing) startPreview(feat);
      });
      host.addEventListener("focus", () => startPreview(host));
      host.addEventListener("blur", () => { if (!(host === feat && featInView)) stopPreview(host); });
    }
    new IntersectionObserver(([e]) => {
      featInView = e.isIntersecting;
      if (featInView) { if (!playing) startPreview(feat); } else stopPreview(feat);
    }, { threshold: 0.5 }).observe(feat);
  } else {
    // touch: whichever panel is in the middle of the screen plays
    const mid = new IntersectionObserver((entries) => {
      for (const e of entries) e.isIntersecting ? startPreview(e.target) : stopPreview(e.target);
    }, { rootMargin: "-42% 0px -42% 0px" });
    for (const host of [feat, ...cards]) mid.observe(host);
  }
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) { if (playing) stopPreview(playing); }
    else if (featInView && !viewer.open) startPreview(feat);
  });

  // ---------------------------------------------------------------- project viewer
  // every project has its own link (…/#ocean), so a clip can be sent straight to someone.
  const vVideo = $("#vVideo"), vClips = $("#vClips");
  let current = null;

  function setClip(i) {
    const clip = current.clips[i];
    vVideo.style.aspectRatio = "";
    vVideo.poster = `media/${clip.id}.webp`;
    vVideo.src = `media/${clip.id}-full.mp4`;
    vVideo.play().catch(() => {}); // blocked when opened from a link without a click, the controls are right there
    $$(".clip", vClips).forEach((b, k) => { b.classList.toggle("on", k === i); b.setAttribute("aria-selected", k === i); });
  }
  vVideo.addEventListener("loadedmetadata", () => { vVideo.style.aspectRatio = `${vVideo.videoWidth} / ${vVideo.videoHeight}`; });

  function show(id) {
    const p = byId[id];
    current = p;
    $("#vTag").textContent = p.tag;
    $("#vTitle").textContent = p.title;
    $("#vDesc").textContent = p.desc;
    $("#vBuilt").innerHTML = p.built.map((b) => `<li>${b}</li>`).join("");
    vClips.innerHTML = p.clips.length > 1 ? p.clips.map((c, k) => `<button class="clip" role="tab" data-i="${k}">${c.label}</button>`).join("") : "";
    if (playing) stopPreview(playing);
    if (!viewer.open) viewer.showModal();
    $(".viewer-in", viewer).scrollTop = 0;
    setClip(0);
  }
  function step(dir) {
    const next = order[(order.indexOf(current.id) + dir + order.length) % order.length];
    history.replaceState(null, "", "#" + next);
    show(next);
  }
  function route() {
    const id = decodeURIComponent(location.hash.slice(1));
    if (byId[id]) show(id);
    else if (viewer.open) viewer.close();
  }

  vClips.addEventListener("click", (e) => { const b = e.target.closest(".clip"); if (b) setClip(+b.dataset.i); });
  $("#vPrev").addEventListener("click", () => step(-1));
  $("#vNext").addEventListener("click", () => step(1));
  $("#vClose").addEventListener("click", () => viewer.close());
  $("#vLink").addEventListener("click", () => copy(location.origin + location.pathname + "#" + current.id, "Link to this project copied"));
  viewer.addEventListener("click", (e) => { if (e.target === viewer) viewer.close(); }); // click outside the box
  viewer.addEventListener("keydown", (e) => {
    if (e.target === vVideo) return; // arrows scrub the video when it has focus
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
  viewer.addEventListener("close", () => {
    vVideo.pause();
    vVideo.removeAttribute("src");
    vVideo.load();
    if (byId[location.hash.slice(1)]) history.replaceState(null, "", location.pathname + location.search);
    if (featInView) startPreview(feat);
  });
  addEventListener("hashchange", route);
  route();

  // ---------------------------------------------------------------- copy + toast
  const toast = $("#toast");
  let toastTimer = 0;
  function say(msg) {
    toast.textContent = msg;
    toast.classList.add("on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("on"), 2400);
  }
  async function copy(text, msg) {
    try { await navigator.clipboard.writeText(text); say(msg); }
    catch { say("Couldn't copy, here it is: " + text); }
  }
  for (const b of $$("[data-copy]")) {
    b.addEventListener("click", () => copy(b.dataset.copy, `Copied "${b.dataset.copy}". Add me on Discord!`));
  }

  // ---------------------------------------------------------------- code samples
  const samples = {
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

  // tiny luau highlighter, good enough for three snippets
  const KEYWORDS = new Set("local function end if then else elseif return for in do while repeat until break true false nil not and or export type continue".split(" "));
  const GLOBALS = new Set("game workspace task math os string table Vector3 Vector2 CFrame Instance typeof print warn pairs ipairs".split(" "));
  const TYPES = new Set("number string boolean Player State Wave Bucket unknown".split(" "));
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const paint = (src) => src.split("\n").map((line, i) => {
    const out = line.replace(/(--.*$)|("(?:[^"\\]|\\.)*")|(\b\d+(?:\.\d+)?\b)|([A-Za-z_]\w*)(\s*\()?|([^A-Za-z_"\-\d]+|-)/g,
      (m, comment, str, num, word, call, other) => {
        if (comment) return `<span class="t-c">${esc(comment)}</span>`;
        if (str) return `<span class="t-s">${esc(str)}</span>`;
        if (num) return `<span class="t-n">${num}</span>`;
        if (word) {
          const tail = call ? esc(call) : "";
          if (KEYWORDS.has(word)) return `<span class="t-k">${word}</span>${tail}`;
          if (GLOBALS.has(word)) return `<span class="t-b">${word}</span>${tail}`;
          if (TYPES.has(word)) return `<span class="t-t">${word}</span>${tail}`;
          if (call) return `<span class="t-f">${word}</span>${tail}`;
          return word;
        }
        return esc(other ?? m);
      });
    return `<span class="ln">${i + 1}</span>${out}`;
  }).join("\n");

  const codeView = $("#codeView");
  function showTab(name) {
    codeView.innerHTML = paint(samples[name]);
    codeView.parentElement.scrollTop = 0;
    for (const t of $$(".tab")) { t.classList.toggle("on", t.dataset.tab === name); t.setAttribute("aria-selected", t.dataset.tab === name); }
  }
  for (const t of $$(".tab")) t.addEventListener("click", () => showTab(t.dataset.tab));
  showTab("waves");

  // numbers count up the first time they scroll into view
  if (!calm) {
    const counter = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        counter.unobserve(e.target);
        const el = e.target, to = +el.dataset.to, t0 = performance.now(), dur = 900;
        const tick = (t) => {
          const k = Math.min(1, (t - t0) / dur);
          el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
          if (k < 1) requestAnimationFrame(tick);
        };
        el.textContent = "0";
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.6 });
    $$("[data-to]").forEach((el) => counter.observe(el));
  }

  // buttons lean toward the cursor a little
  if (hasMouse && !calm) {
    for (const b of $$(".btn")) {
      b.addEventListener("pointermove", (e) => {
        const r = b.getBoundingClientRect();
        b.style.translate = `${((e.clientX - r.left) / r.width - 0.5) * 8}px ${((e.clientY - r.top) / r.height - 0.5) * 6}px`;
      });
      b.addEventListener("pointerleave", () => { b.style.translate = ""; });
    }
  }

  console.log("%cMAZZI%c  looking for a scripter? discord: mazzisagedev", "font: 700 18px sans-serif; color: #74b3ec", "color: inherit");
})();
