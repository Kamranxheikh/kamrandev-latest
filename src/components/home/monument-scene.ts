import * as THREE from "three";
import gsap from "gsap";
import {
  FontLoader,
  type Font,
  type FontData,
} from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/* "THE MONUMENT" — the name as giant silver letterforms under a single
   overhead lamp: the light snaps on, a soft beam falls onto the word,
   the monuments rise out of the floor, the camera pulls back. Letters
   lift when the cursor touches them.

   The reflection is deliberately fake: mirrored copies of the letters,
   rough + near-transparent, fading with distance. That reads like a
   real damped sheen on dark stone (a live Reflector was both too crisp
   and rendered the whole scene twice per frame).

   Client-only; imported dynamically inside HeroMonument's effect. The
   font JSON is fetched in parallel with this chunk and passed in.      */

const ACCENT = 0xff8a3d;
const WORD = "KAMRAN";

export type MonumentScene = {
  intro(): gsap.core.Timeline;
  dispose(): void;
};

export function createMonumentScene(
  canvas: HTMLCanvasElement,
  reduced: boolean,
  fontData: unknown,
): MonumentScene {
  const dpr = Math.min(window.devicePixelRatio, 2);
  const renderer = new THREE.WebGLRenderer({
    canvas,
    // at 2x density the pixels already smooth the edges; skipping MSAA
    // there makes GPU init and every frame meaningfully cheaper
    antialias: dpr < 2,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(0x080605, 1);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.98;

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x080605, 15, 34);

  /* ————— night sky: two layers of stars, far behind the stage ————— */

  const starLayer = (count: number, size: number, opacity: number) => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 150;
      pos[i * 3 + 1] = 3 + Math.random() * 55;
      pos[i * 3 + 2] = -22 - Math.random() * 48;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({
      color: 0xdceef7,
      size,
      sizeAttenuation: false, // pixel-sized pinpricks, like a real sky
      transparent: true,
      opacity,
      depthWrite: false,
      fog: false, // the scene fog would swallow them at this distance
    });
    const stars = new THREE.Points(geo, mat);
    scene.add(stars);
    return mat;
  };
  const starsFaint = starLayer(380, 1.5, 0.55);
  const starsBright = starLayer(60, 2.6, 0.85);

  // studio reflections for the silver letters
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.06).texture;
  pmrem.dispose();

  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 80);
  const CAM_REST = new THREE.Vector3(0, 2.35, 14.8);
  const CAM_START = new THREE.Vector3(-5.2, 1.05, 7.2);
  const LOOK_AT = new THREE.Vector3(0, 1.55, 0);
  camera.position.copy(reduced ? CAM_REST : CAM_START);

  /* ————— floor ————— */

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(90, 90),
    new THREE.MeshStandardMaterial({
      color: 0x07090b,
      metalness: 0.45,
      roughness: 0.6,
      envMapIntensity: 0.2,
    }),
  );
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  // distance fade laid over the floor so sheen + reflection die out
  const dim = new THREE.Mesh(
    new THREE.PlaneGeometry(90, 90),
    new THREE.MeshBasicMaterial({ color: 0x080605, transparent: true, opacity: 0.66 }),
  );
  dim.rotation.x = -Math.PI / 2;
  dim.position.y = 0.012;
  dim.renderOrder = 2;
  scene.add(dim);

  const grid = new THREE.GridHelper(90, 90, 0x1c3d47, 0x0d181d);
  (grid.material as THREE.Material).transparent = true;
  (grid.material as THREE.Material).opacity = 0.14;
  grid.position.y = 0.024;
  grid.renderOrder = 3;
  scene.add(grid);

  /* ————— lights (start dark; intro powers them on) ————— */

  const ambient = new THREE.AmbientLight(0x2c3d44, 0);
  scene.add(ambient);

  // THE lamp: one cool key light hung directly above the word. Close and
  // fully feathered so the letter tops burn bright and the faces fall off
  // into darker silver — visibly lit from overhead.
  const key = new THREE.SpotLight(0x9fd8ff, 0, 60, 0.55, 1, 1.35);
  key.position.set(0, 10.8, 2.2);
  key.target.position.set(0, 0.8, 0);
  scene.add(key, key.target);

  // faint frontal fill so the faces stay silver, not silhouettes
  const fill = new THREE.DirectionalLight(0xbfd6e2, 0);
  fill.position.set(0, 3.4, 16);
  scene.add(fill);

  const rim = new THREE.SpotLight(ACCENT, 0, 60, 0.6, 0.7, 1.1);
  rim.position.set(-10, 6, -6);
  scene.add(rim, rim.target);

  const glow = new THREE.PointLight(ACCENT, 0, 26, 1.6);
  glow.position.set(0, 2.6, -4.5);
  scene.add(glow);

  const KEY_I = 400;
  const RIM_I = 120;
  const GLOW_I = 14;
  const AMB_I = 0.4;
  const FILL_I = 0.4;
  const LETTER_ENV = 0.5;

  /* ————— the visible light: lamp glow, beam cone, floor pool ————— */

  const gradTex = (
    draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void,
    w = 128,
    h = 256,
  ) => {
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    draw(c.getContext("2d")!, w, h);
    return new THREE.CanvasTexture(c);
  };

  // beam: brightest at the source, fading to nothing by the floor — and
  // fading OUT toward the cone's sides (|cos| across the wrap, peaking at
  // the faces toward/away from camera), so the silhouette has no hard
  // left/right edge lines
  const beamTex = (() => {
    const w = 256;
    const h = 256;
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    const ctx = c.getContext("2d")!;
    const img = ctx.createImageData(w, h);
    for (let y = 0; y < h; y++) {
      const vert = Math.pow(1 - y / (h - 1), 1.5);
      for (let x = 0; x < w; x++) {
        const side = Math.pow(Math.abs(Math.cos((2 * Math.PI * x) / w)), 1.6);
        const i = (y * w + x) * 4;
        img.data[i] = 255;
        img.data[i + 1] = 255;
        img.data[i + 2] = 255;
        img.data[i + 3] = Math.round(255 * 0.72 * vert * side);
      }
    }
    ctx.putImageData(img, 0, 0);
    const t = new THREE.CanvasTexture(c);
    t.wrapS = THREE.RepeatWrapping;
    return t;
  })();
  const LAMP_Y = 8.1;
  const beam = new THREE.Mesh(
    new THREE.CylinderGeometry(0.42, 6.9, LAMP_Y, 64, 1, true),
    new THREE.MeshBasicMaterial({
      map: beamTex,
      color: 0x8fc4e8, // cool blue, never white

      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
      fog: false,
    }),
  );
  beam.position.set(0, LAMP_Y / 2, 0.5);
  beam.scale.x = 1.3;
  beam.renderOrder = 8;
  scene.add(beam);

  // the lamp itself: a hot little core at the beam's apex
  const lampTex = gradTex(
    (ctx, w, h) => {
      const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.25, "rgba(255,214,186,0.55)");
      g.addColorStop(1, "rgba(255,214,186,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    },
    128,
    128,
  );
  const lamp = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: lampTex,
      color: 0xdff2ff,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
    }),
  );
  lamp.position.set(0, LAMP_Y + 0.1, 0.5);
  lamp.scale.setScalar(2.6);
  lamp.renderOrder = 9;
  scene.add(lamp);

  // where the light lands: a soft elliptical pool under the word
  const poolTex = gradTex(
    (ctx, w, h) => {
      const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
      g.addColorStop(0, "rgba(255,255,255,0.55)");
      g.addColorStop(0.55, "rgba(255,255,255,0.16)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    },
    256,
    256,
  );
  const pool = new THREE.Mesh(
    new THREE.CircleGeometry(6.5, 48),
    new THREE.MeshBasicMaterial({
      map: poolTex,
      color: 0x47799a, // desaturated slate blue — a hint, not a glow

      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
    }),
  );
  pool.rotation.x = -Math.PI / 2;
  pool.position.set(0, 0.03, 0.5);
  pool.scale.set(1.15, 0.45, 1);
  pool.renderOrder = 4;
  scene.add(pool);

  const BEAM_O = 0.1;
  const LAMP_O = 0.7;
  const POOL_O = 0.055;
  const lampPow = { v: reduced ? 1 : 0 };
  const applyLamp = () => {
    beam.material.opacity = BEAM_O * lampPow.v;
    lamp.material.opacity = LAMP_O * lampPow.v;
    pool.material.opacity = POOL_O * lampPow.v;
  };
  applyLamp();

  if (reduced) {
    ambient.intensity = AMB_I;
    key.intensity = KEY_I;
    rim.intensity = RIM_I;
    glow.intensity = GLOW_I;
    fill.intensity = FILL_I;
  } else {
    // opening state: the word stands in the dark — barely readable, dull —
    // and the key light starts as a narrow pencil that the intro spreads
    ambient.intensity = 0.07;
    fill.intensity = 0.05;
    key.angle = 0.12;
  }

  /* ————— the monuments ————— */

  const font: Font = new FontLoader().parse(fontData as FontData);

  // silver: mid-grey base so the overhead lamp draws the gradient — hot
  // tops, darker faces. Env kept modest or the metal washes out to white.
  const letterMat = new THREE.MeshStandardMaterial({
    color: 0xaab2b9,
    metalness: 1.0,
    roughness: 0.26,
    // dark-dull before the lamp opens; the intro raises it to LETTER_ENV.
    // (metal shows env reflections even with every light off, so a truly
    // unlit-looking word means starting the env low too)
    envMapIntensity: reduced ? LETTER_ENV : 0.08,
  });

  const word = new THREE.Group();
  const letters: THREE.Mesh[] = [];
  const SIZE = 2.35;
  const TRACK = 0.24;
  let cursor = 0;

  for (const ch of WORD) {
    const geo = new TextGeometry(ch, {
      font,
      size: SIZE,
      depth: 0.72,
      curveSegments: 14,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.034,
      bevelSegments: 5,
    });
    geo.computeBoundingBox();
    const bb = geo.boundingBox!;
    const w = bb.max.x - bb.min.x;
    geo.translate(-bb.min.x, 0, 0); // left edge at local 0, baseline on floor

    const mesh = new THREE.Mesh(geo, letterMat);
    mesh.position.x = cursor;
    mesh.userData.homeX = cursor;
    letters.push(mesh);
    word.add(mesh);
    cursor += w + TRACK;
  }
  const rowWidth = cursor - TRACK;

  // subtle editorial stagger: alternate depth + micro-rotation
  letters.forEach((m, i) => {
    m.position.z = (i % 2 === 0 ? 1 : -1) * 0.08 * ((i % 3) + 1) * 0.5;
    m.rotation.y = (i % 2 === 0 ? -1 : 1) * 0.022;
    m.userData.homeZ = m.position.z;
    m.userData.homeRotY = m.rotation.y;
  });

  word.position.x = -rowWidth / 2;
  scene.add(word);

  /* ————— the fake reflection: mirrored letters, rough and faint ————— */

  const MIRROR_O = 0.16;
  const mirrorMat = new THREE.MeshStandardMaterial({
    color: 0x9aa1a7,
    metalness: 1.0,
    roughness: 0.62, // rough = the reflected shading goes soft/blurry
    envMapIntensity: 0.6,
    transparent: true,
    opacity: reduced ? MIRROR_O : 0,
    depthTest: false, // lives under the opaque floor; painted over it
    depthWrite: false,
  });
  const mirrorWord = new THREE.Group();
  const mirrors: THREE.Mesh[] = [];
  letters.forEach((src) => {
    const m = new THREE.Mesh(src.geometry, mirrorMat);
    m.position.copy(src.position);
    m.rotation.copy(src.rotation);
    m.renderOrder = 1;
    mirrors.push(m);
    mirrorWord.add(m);
  });
  scene.add(mirrorWord);

  const syncMirror = () => {
    for (let i = 0; i < letters.length; i++) {
      const s = letters[i];
      const m = mirrors[i];
      // clamp: while a monument is still sunken there is nothing to reflect
      m.position.set(s.position.x, Math.max(s.position.y, 0), s.position.z);
      m.rotation.copy(s.rotation);
    }
  };
  syncMirror();

  // the brand mark: a copper diamond as the full stop
  const dot = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.3),
    new THREE.MeshStandardMaterial({
      color: ACCENT,
      emissive: ACCENT,
      emissiveIntensity: 0.85,
      metalness: 0.2,
      roughness: 0.3,
    }),
  );
  dot.position.set(rowWidth / 2 + 0.75, 0.36, 0.4);
  const dotPop = { v: reduced ? 1 : 0 };
  scene.add(dot);

  const dotLight = new THREE.PointLight(ACCENT, 9, 7, 1.8);
  dotLight.position.copy(dot.position);
  scene.add(dotLight);

  /* ————— dust drifting through the beam ————— */

  const N = 160;
  const pts = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    pts[i * 3] = (Math.random() - 0.5) * 30;
    pts[i * 3 + 1] = Math.random() * 8;
    pts[i * 3 + 2] = (Math.random() - 0.5) * 18;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute("position", new THREE.BufferAttribute(pts, 3));
  const dust = new THREE.Points(
    dustGeo,
    new THREE.PointsMaterial({
      color: 0x9adfef,
      size: 0.035,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    }),
  );
  scene.add(dust);

  /* ————— layout / responsiveness ————— */

  let fitScale = 1;

  function layout() {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();

    if (camera.aspect >= 0.9) {
      // fit word + diamond into ~84% of the visible width, measured at
      // the letters' front faces (they sit ~1.2 units nearer the camera)
      const dist = CAM_REST.z - 1.2;
      const visW =
        2 * dist * Math.tan((camera.fov * Math.PI) / 360) * camera.aspect;
      fitScale = Math.min(1, (visW * 0.84) / (rowWidth + 1.8));
      // aim lower so the word rides higher in the frame — less empty sky
      LOOK_AT.y = -0.32;
    } else {
      // portrait: a giant cropped close-up above the copy
      fitScale = 0.52;
      LOOK_AT.y = 0.05;
    }

    word.scale.setScalar(fitScale);
    word.position.x = (-rowWidth / 2) * fitScale;
    mirrorWord.scale.set(fitScale, -fitScale, fitScale);
    mirrorWord.position.x = word.position.x;
    dot.position.x = (rowWidth / 2 + 0.75) * fitScale;
    dot.scale.setScalar(fitScale * dotPop.v);
    dotLight.position.x = dot.position.x;
  }
  layout();
  window.addEventListener("resize", layout);

  /* ————— pointer: camera parallax + letter hover ————— */

  const pointer = { x: 0, y: 0 };
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  let hovered: THREE.Mesh | null = null;

  function setHover(mesh: THREE.Mesh | null) {
    if (hovered === mesh) return;
    if (hovered) {
      gsap.to(hovered.position, {
        y: 0,
        z: hovered.userData.homeZ,
        duration: 0.9,
        ease: "power3.out",
      });
      gsap.to(hovered.rotation, {
        x: 0,
        y: hovered.userData.homeRotY,
        duration: 0.9,
        ease: "power3.out",
      });
    }
    hovered = mesh;
    if (mesh) {
      gsap.to(mesh.position, {
        y: 0.34,
        z: mesh.userData.homeZ + 0.25,
        duration: 0.55,
        ease: "power3.out",
      });
      gsap.to(mesh.rotation, { x: -0.06, duration: 0.55, ease: "power3.out" });
    }
    canvas.style.cursor = mesh ? "pointer" : "default";
  }

  const onPointer = (e: PointerEvent) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    ndc.set(pointer.x, -pointer.y);
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects(letters, false)[0];
    setHover((hit?.object as THREE.Mesh) ?? null);
  };
  if (!reduced && matchMedia("(pointer: fine)").matches) {
    window.addEventListener("pointermove", onPointer, { passive: true });
  }

  /* ————— frame loop ————— */

  const clock = new THREE.Clock();
  let raf = 0;
  let running = true;
  let pageVisible = !document.hidden;
  let inView = true;
  let introDone = reduced;

  // The hero must never tax scrolling of the rest of the page: once the
  // canvas leaves the viewport the render loop stops entirely, and wakes
  // a little before it scrolls back in.
  const updateRunning = () => {
    const should = pageVisible && inView;
    if (should === running) return;
    running = should;
    if (running) {
      clock.start();
      tick();
    } else {
      cancelAnimationFrame(raf);
    }
  };
  const io =
    typeof IntersectionObserver === "undefined"
      ? null
      : new IntersectionObserver(
          ([entry]) => {
            inView = entry.isIntersecting;
            updateRunning();
          },
          { rootMargin: "120px" },
        );
  io?.observe(canvas);

  function tick() {
    if (!running) return;
    raf = requestAnimationFrame(tick);
    const t = clock.getElapsedTime();

    if (!reduced && introDone) {
      // idle drift + clamped cursor parallax
      const tx = Math.sin(t * 0.1) * 0.7 + pointer.x * 1.15;
      const ty = CAM_REST.y + Math.cos(t * 0.13) * 0.12 - pointer.y * 0.5;
      camera.position.x += (tx - camera.position.x) * 0.04;
      camera.position.y += (ty - camera.position.y) * 0.04;
      // a real lamp is never perfectly steady
      beam.material.opacity = BEAM_O * (0.92 + Math.sin(t * 1.3) * 0.08);
    }
    if (!reduced) {
      // barely-there twinkle
      starsFaint.opacity = 0.5 + Math.sin(t * 0.6) * 0.07;
      starsBright.opacity = 0.8 + Math.sin(t * 0.9 + 2) * 0.09;
    }
    camera.lookAt(LOOK_AT);

    syncMirror();

    if (!reduced) {
      dot.rotation.y = t * 0.9;
      dot.rotation.x = Math.sin(t * 0.6) * 0.3;
      dot.position.y = (0.42 + Math.sin(t * 1.1) * 0.09) * fitScale;
      dot.scale.setScalar(fitScale * dotPop.v);
      dotLight.position.y = dot.position.y;

      const arr = dustGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < N; i++) {
        arr[i * 3 + 1] += 0.0035;
        arr[i * 3] += Math.sin(t * 0.4 + i) * 0.0009;
        if (arr[i * 3 + 1] > 8) arr[i * 3 + 1] = 0;
      }
      dustGeo.attributes.position.needsUpdate = true;
    }

    renderer.render(scene, camera);
  }
  tick();

  const onVis = () => {
    pageVisible = !document.hidden;
    updateRunning();
  };
  document.addEventListener("visibilitychange", onVis);

  /* ————— public api ————— */

  return {
    intro() {
      const tl = gsap.timeline();
      if (reduced) {
        return tl;
      }

      /* The word stands in the dark, dull and barely there. Then the lamp
         wakes with a flicker and the light OPENS — the beam and the actual
         spotlight cone spread from the centre out to the sides, sweeping
         the letters from silhouette to lit silver. */
      beam.scale.set(0.06, 1, 0.06);
      pool.scale.set(0.12, 0.05, 1);

      // a beat of darkness so the dull word registers, then the lamp wakes
      tl.to(
        lampPow,
        {
          keyframes: [
            { v: 0.35, duration: 0.12 },
            { v: 0.12, duration: 0.09 },
            { v: 1, duration: 0.65, ease: "power2.out" },
          ],
          onUpdate: applyLamp,
        },
        0.4,
      )
        // the visible beam and its floor pool spread centre → sides
        .to(beam.scale, { x: 1.3, z: 1, duration: 1.6, ease: "power2.inOut" }, 0.5)
        .to(pool.scale, { x: 1.15, y: 0.45, duration: 1.6, ease: "power2.inOut" }, 0.5)
        // ...and so does the real light: the spot's cone widens with it
        .to(key, { angle: 0.55, duration: 1.6, ease: "power2.inOut" }, 0.5)
        .to(
          key,
          {
            keyframes: [
              { intensity: KEY_I * 0.3, duration: 0.14 },
              { intensity: KEY_I * 0.12, duration: 0.09 },
              { intensity: KEY_I, duration: 1.15, ease: "power2.inOut" },
            ],
          },
          0.45,
        )
        // the letters wake out of dullness as the light reaches them
        .to(letterMat, { envMapIntensity: LETTER_ENV, duration: 1.4, ease: "power2.inOut" }, 0.55)
        .to(ambient, { intensity: AMB_I, duration: 1.2 }, 0.8)
        .to(fill, { intensity: FILL_I, duration: 1.0 }, 0.9)
        .to(rim, { intensity: RIM_I, duration: 0.9 }, 1.0)
        .to(glow, { intensity: GLOW_I, duration: 1.0, ease: "power2.out" }, 1.2);

      // the reflection blooms in with the light
      tl.to(mirrorMat, { opacity: MIRROR_O, duration: 1.1 }, 1.0);

      // camera pulls back to the wide shot
      tl.to(
        camera.position,
        { x: CAM_REST.x, y: CAM_REST.y, z: CAM_REST.z, duration: 2.3, ease: "power3.inOut" },
        0.12,
      );

      // the brand diamond pops in and the idle drift takes over
      tl.to(dotPop, { v: 1, duration: 0.7, ease: "back.out(2.2)" }, 1.9)
        .add(() => {
          introDone = true;
        }, 2.4);

      return tl;
    },

    dispose() {
      running = false;
      io?.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", layout);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVis);
      renderer.dispose();
    },
  };
}
