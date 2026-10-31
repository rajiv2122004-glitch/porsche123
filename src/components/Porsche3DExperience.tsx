import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RotateCw, Eye, Sparkles, ChevronDown, ChevronUp, ZoomIn, ZoomOut, Check, Info } from 'lucide-react';
import { Hotspot3D } from '../types/porsche';

const HOTSPOTS: Hotspot3D[] = [
  {
    id: 'rear-wing',
    name: 'Active Swan-Neck Rear Wing & DRS',
    position: [0, 1.45, -2.0],
    category: 'Aerodynamics',
    spec: '860 kg downforce at 285 km/h · Hydraulic DRS actuator',
    description: 'The swan-neck top-mounted wing allows undisturbed airflow beneath the wing blade, producing maximum negative lift with driver-actuated drag reduction.',
  },
  {
    id: 'brakes',
    name: 'Porsche Ceramic Composite Brakes (PCCB)',
    position: [1.15, 0.45, 1.3],
    category: 'Chassis & Braking',
    spec: '410 mm front / 390 mm rear internally vented ceramic rotors',
    description: '6-piston aluminum monobloc fixed calipers in signature racing yellow, offering zero brake fade under extreme continuous track punishment and 50% lower unsprung mass.',
  },
  {
    id: 'engine',
    name: '4.0L Naturally Aspirated Flat-6 Boxer',
    position: [0, 0.75, -1.3],
    category: 'Powertrain',
    spec: '525 PS @ 8,500 RPM · 9,000 RPM Redline · 465 Nm Torque',
    description: 'Direct motorsport transfer with individual throttle bodies, rigid valve drive without hydraulic clearance compensation, and dry-sump lubrication with 7 suction stages.',
  },
  {
    id: 'carbon-roof',
    name: 'CFRP Lightweight Contoured Roof',
    position: [0, 1.35, -0.1],
    category: 'Lightweight Construction',
    spec: 'Carbon Fiber Reinforced Plastic · Longitudinal aero groove',
    description: 'Lowers the center of gravity while the twin-bubble contour directs air directly into the central roof intake channels towards the rear wing.',
  },
  {
    id: 'front-axle',
    name: 'Motorsport Double-Wishbone Front Suspension',
    position: [0, 0.45, 1.6],
    category: 'Suspension',
    spec: 'Teardrop aerodynamic cross-sections producing 40 kg front downforce',
    description: 'Links directly bolted with ball joints without rubber elastokinematics for razor-sharp steering feedback and total stability during maximum trail-braking.',
  },
];

const PAINT_COLORS = [
  { id: 'guards-red', name: 'Guards Red', hex: 0xd50000, colorStr: '#d50000' },
  { id: 'gt-silver', name: 'GT Silver Metallic', hex: 0xa8b0b8, colorStr: '#a8b0b8' },
  { id: 'racing-yellow', name: 'Racing Yellow', hex: 0xfacc15, colorStr: '#facc15' },
  { id: 'shark-blue', name: 'Shark Blue', hex: 0x0284c7, colorStr: '#0284c7' },
  { id: 'obsidian-black', name: 'Deep Obsidian Black', hex: 0x111215, colorStr: '#111215' },
  { id: 'carrara-white', name: 'Carrara White', hex: 0xf5f5f7, colorStr: '#f5f5f7' },
];

const CAMERA_VIEWS = [
  { id: 'front-quarter', label: 'Front 3/4', pos: [3.4, 1.6, 3.8], target: [0, 0.5, 0] },
  { id: 'profile-side', label: 'Profile Side', pos: [5.2, 1.2, 0], target: [0, 0.5, 0] },
  { id: 'rear-aero', label: 'Rear Aero & Wing', pos: [-2.8, 1.8, -3.8], target: [0, 0.8, -1.0] },
  { id: 'cockpit-top', label: 'Top Down View', pos: [0.1, 5.8, 0.1], target: [0, 0.4, 0] },
];

export const Porsche3DExperience: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedColor, setSelectedColor] = useState(PAINT_COLORS[0]);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot3D | null>(HOTSPOTS[0]);
  const [activeView, setActiveView] = useState('front-quarter');
  const [autoRotate, setAutoRotate] = useState(true);
  const [isZenMode, setIsZenMode] = useState(false);

  // Mutable refs for Three.js scene
  const carPaintMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const targetCamPosRef = useRef<THREE.Vector3>(new THREE.Vector3(3.4, 1.6, 3.8));
  const targetLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0.5, 0));
  const controlsStateRef = useRef({
    isMouseDown: false,
    prevX: 0,
    prevY: 0,
    rotY: 0,
    rotX: 0.15,
    distance: 5.6,
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL guard
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x07080a);
    scene.fog = new THREE.FogExp2(0x07080a, 0.04);

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      50
    );
    camera.position.set(3.4, 1.6, 3.8);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.replaceChildren(renderer.domElement);

    // Studio Environment Reflections via PMREMGenerator
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const envRoom = new RoomEnvironment();
    scene.environment = pmremGenerator.fromScene(envRoom, 0.04).texture;
    pmremGenerator.dispose();

    // Studio Lighting Rig
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(4, 6, 4);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.shadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x90b0e0, 2.0);
    rimLight.position.set(-5, 4, -5);
    scene.add(rimLight);

    const fillLight = new THREE.HemisphereLight(0x222630, 0x050608, 1.2);
    scene.add(fillLight);

    // Ground Studio Floor & Contact Grounding Shadow
    const floorGeo = new THREE.PlaneGeometry(30, 30);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0a0b0e,
      roughness: 0.35,
      metalness: 0.8,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = !isSoftwareGl;
    scene.add(floor);

    // Contact shadow beneath car
    const shadowGeo = new THREE.PlaneGeometry(4.8, 2.4);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(64, 64, 10, 64, 64, 60);
      grad.addColorStop(0, 'rgba(0,0,0,0.85)');
      grad.addColorStop(0.5, 'rgba(0,0,0,0.4)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    shadowTex.colorSpace = THREE.SRGBColorSpace;
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.75,
    });
    const contactShadow = new THREE.Mesh(shadowGeo, shadowMat);
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.y = 0.01;
    scene.add(contactShadow);

    // ==========================================
    // PROCEDURAL PORSCHE 911 GT3 RS 3D MODEL
    // Built as a high-fidelity composite THREE.Group
    // ==========================================
    const carGroup = new THREE.Group();

    // High-performance Automotive Paint Material
    const paintMaterial = new THREE.MeshPhysicalMaterial({
      color: selectedColor.hex,
      metalness: 0.25,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.9,
    });
    carPaintMaterialRef.current = paintMaterial;

    const carbonMaterial = new THREE.MeshStandardMaterial({
      color: 0x16171b,
      roughness: 0.45,
      metalness: 0.6,
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x111622,
      metalness: 0.1,
      roughness: 0.05,
      transmission: isSoftwareGl ? 0 : 0.85,
      transparent: true,
      opacity: isSoftwareGl ? 0.4 : 1,
      ior: 1.52,
    });

    const alloyMaterial = new THREE.MeshStandardMaterial({
      color: 0x22242a,
      metalness: 0.92,
      roughness: 0.2,
    });

    const brakeBremboMaterial = new THREE.MeshStandardMaterial({
      color: 0xfacc15, // Yellow PCCB Ceramic Calipers
      roughness: 0.25,
      metalness: 0.5,
    });

    const brakeRotorMaterial = new THREE.MeshStandardMaterial({
      color: 0x6e727e,
      roughness: 0.35,
      metalness: 0.9,
    });

    const ledLightMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });

    const ledTailLightMaterial = new THREE.MeshBasicMaterial({
      color: 0xff1020,
    });

    // 1. Main Aerodynamic Lower Chassis & Sculpted Body
    const bodyShape = new THREE.Shape();
    // Profile silhouette of iconic 911 flyline
    bodyShape.moveTo(-2.1, 0.28);
    bodyShape.lineTo(-2.2, 0.48); // Rear bumper
    bodyShape.quadraticCurveTo(-2.15, 0.85, -1.6, 0.95); // Rear haunch
    bodyShape.quadraticCurveTo(-0.6, 1.25, 0.1, 1.28); // Roof peak
    bodyShape.quadraticCurveTo(0.9, 1.15, 1.3, 0.78); // Windshield slope
    bodyShape.quadraticCurveTo(1.9, 0.62, 2.2, 0.35); // Front hood slope
    bodyShape.lineTo(2.25, 0.22); // Front splitter
    bodyShape.lineTo(1.8, 0.22); // Front wheel arch cutout
    bodyShape.quadraticCurveTo(1.4, 0.55, 1.0, 0.22);
    bodyShape.lineTo(-0.8, 0.22); // Rocker panel
    bodyShape.quadraticCurveTo(-1.2, 0.55, -1.6, 0.22); // Rear wheel arch
    bodyShape.lineTo(-2.1, 0.28);

    const extrudeSettings = {
      steps: 2,
      depth: 1.6,
      bevelEnabled: true,
      bevelThickness: 0.12,
      bevelSize: 0.12,
      bevelSegments: 4,
    };

    const bodyGeo = new THREE.ExtrudeGeometry(bodyShape, extrudeSettings);
    bodyGeo.center();
    const bodyMesh = new THREE.Mesh(bodyGeo, paintMaterial);
    bodyMesh.rotation.y = Math.PI / 2;
    bodyMesh.position.y = 0.58;
    bodyMesh.castShadow = !isSoftwareGl;
    carGroup.add(bodyMesh);

    // 2. Glass Greenhouse / Cockpit Canopy
    const canopyShape = new THREE.Shape();
    canopyShape.moveTo(-1.1, 0.75);
    canopyShape.quadraticCurveTo(-0.5, 1.22, 0.1, 1.25);
    canopyShape.quadraticCurveTo(0.8, 1.12, 1.15, 0.75);
    canopyShape.lineTo(-1.1, 0.75);

    const canopyGeo = new THREE.ExtrudeGeometry(canopyShape, {
      steps: 1,
      depth: 1.36,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.04,
      bevelSegments: 2,
    });
    canopyGeo.center();
    const canopyMesh = new THREE.Mesh(canopyGeo, glassMaterial);
    canopyMesh.rotation.y = Math.PI / 2;
    canopyMesh.position.set(0, 0.65, -0.05);
    carGroup.add(canopyMesh);

    // 3. Exposed Carbon Fiber Roof with Aero Contours
    const roofGeo = new THREE.BoxGeometry(1.32, 0.04, 1.35);
    const roofMesh = new THREE.Mesh(roofGeo, carbonMaterial);
    roofMesh.position.set(0, 1.3, -0.05);
    roofMesh.castShadow = !isSoftwareGl;
    carGroup.add(roofMesh);

    // 4. Front Hood Vents & Radiator Air Extractors
    const ventGeo = new THREE.BoxGeometry(0.7, 0.05, 0.35);
    const ventMesh = new THREE.Mesh(ventGeo, carbonMaterial);
    ventMesh.position.set(0, 0.88, 1.2);
    ventMesh.rotation.x = 0.22;
    carGroup.add(ventMesh);

    // 5. Swan-Neck Active Rear Wing Assembly
    const wingGroup = new THREE.Group();
    // Main aerofoil wing blade
    const wingBladeGeo = new THREE.BoxGeometry(1.85, 0.04, 0.38);
    const wingBlade = new THREE.Mesh(wingBladeGeo, carbonMaterial);
    wingBlade.position.set(0, 1.45, -2.05);
    wingBlade.rotation.x = -0.08;
    wingBlade.castShadow = !isSoftwareGl;
    wingGroup.add(wingBlade);

    // Swan neck wing endplates
    const endplateGeo = new THREE.BoxGeometry(0.03, 0.35, 0.45);
    const leftPlate = new THREE.Mesh(endplateGeo, paintMaterial);
    leftPlate.position.set(-0.92, 1.45, -2.05);
    const rightPlate = new THREE.Mesh(endplateGeo, paintMaterial);
    rightPlate.position.set(0.92, 1.45, -2.05);
    wingGroup.add(leftPlate, rightPlate);

    // Swan-neck upright pylons (top-mounted goosenecks)
    const pylonShape = new THREE.Shape();
    pylonShape.moveTo(0, 0);
    pylonShape.quadraticCurveTo(0.08, 0.35, -0.08, 0.6);
    pylonShape.lineTo(-0.04, 0.6);
    pylonShape.quadraticCurveTo(0.12, 0.35, 0.04, 0);
    const pylonGeo = new THREE.ExtrudeGeometry(pylonShape, { depth: 0.03, bevelEnabled: false });

    const leftPylon = new THREE.Mesh(pylonGeo, carbonMaterial);
    leftPylon.position.set(-0.45, 0.95, -1.95);
    leftPylon.rotation.y = Math.PI / 2;
    const rightPylon = new THREE.Mesh(pylonGeo, carbonMaterial);
    rightPylon.position.set(0.45, 0.95, -1.95);
    rightPylon.rotation.y = Math.PI / 2;
    wingGroup.add(leftPylon, rightPylon);

    carGroup.add(wingGroup);

    // 6. Rear Diffuser & Titanium Dual Center Exhausts
    const diffuserGeo = new THREE.BoxGeometry(1.5, 0.18, 0.4);
    const diffuserMesh = new THREE.Mesh(diffuserGeo, carbonMaterial);
    diffuserMesh.position.set(0, 0.28, -2.15);
    carGroup.add(diffuserMesh);

    const pipeGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.15, 16);
    const pipeMat = new THREE.MeshStandardMaterial({ color: 0x444b58, metalness: 0.9, roughness: 0.2 });
    const leftPipe = new THREE.Mesh(pipeGeo, pipeMat);
    leftPipe.rotation.x = Math.PI / 2;
    leftPipe.position.set(-0.09, 0.32, -2.25);
    const rightPipe = new THREE.Mesh(pipeGeo, pipeMat);
    rightPipe.rotation.x = Math.PI / 2;
    rightPipe.position.set(0.09, 0.32, -2.25);
    carGroup.add(leftPipe, rightPipe);

    // 7. Full-width Continuous Rear LED Lightbar
    const tailLightGeo = new THREE.BoxGeometry(1.65, 0.03, 0.03);
    const tailLight = new THREE.Mesh(tailLightGeo, ledTailLightMaterial);
    tailLight.position.set(0, 0.82, -2.18);
    carGroup.add(tailLight);

    // 8. Front LED Matrix Headlights (Quad-point signature)
    const headlightGeo = new THREE.BoxGeometry(0.24, 0.1, 0.2);
    const leftHeadlight = new THREE.Mesh(headlightGeo, ledLightMaterial);
    leftHeadlight.position.set(-0.68, 0.72, 1.95);
    leftHeadlight.rotation.y = -0.25;
    const rightHeadlight = new THREE.Mesh(headlightGeo, ledLightMaterial);
    rightHeadlight.position.set(0.68, 0.72, 1.95);
    rightHeadlight.rotation.y = 0.25;
    carGroup.add(leftHeadlight, rightHeadlight);

    // 9. Wheels, Brake Discs & Calipers (4 Corners)
    const wheelPositions = [
      { x: -0.88, y: 0.35, z: 1.35 },  // Front Left
      { x: 0.88, y: 0.35, z: 1.35 },   // Front Right
      { x: -0.92, y: 0.37, z: -1.35 }, // Rear Left (wider)
      { x: 0.92, y: 0.37, z: -1.35 },  // Rear Right
    ];

    const tireGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.26, 32);
    tireGeo.rotateZ(Math.PI / 2);
    const tireMat = new THREE.MeshStandardMaterial({
      color: 0x18181c,
      roughness: 0.85,
      metalness: 0.1,
    });

    const rimGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.27, 24);
    rimGeo.rotateZ(Math.PI / 2);

    const discGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.03, 24);
    discGeo.rotateZ(Math.PI / 2);

    const caliperGeo = new THREE.BoxGeometry(0.08, 0.12, 0.14);

    wheelPositions.forEach((pos) => {
      const wheelAssembly = new THREE.Group();
      wheelAssembly.position.set(pos.x, pos.y, pos.z);

      // Rubber Tire
      const tire = new THREE.Mesh(tireGeo, tireMat);
      tire.castShadow = !isSoftwareGl;
      wheelAssembly.add(tire);

      // Multi-spoke Rim
      const rim = new THREE.Mesh(rimGeo, alloyMaterial);
      wheelAssembly.add(rim);

      // Ceramic Brake Disc
      const disc = new THREE.Mesh(discGeo, brakeRotorMaterial);
      wheelAssembly.add(disc);

      // Yellow PCCB Caliper
      const caliper = new THREE.Mesh(caliperGeo, brakeBremboMaterial);
      caliper.position.set(0, 0.12, 0.08);
      wheelAssembly.add(caliper);

      carGroup.add(wheelAssembly);
    });

    scene.add(carGroup);

    // Hotspot 3D Anchors Visuals (sleek glowing markers)
    const hotspotMarkers: THREE.Mesh[] = [];
    HOTSPOTS.forEach((hs) => {
      const markerGeo = new THREE.SphereGeometry(0.06, 16, 16);
      const markerMat = new THREE.MeshBasicMaterial({
        color: 0xd50000,
        wireframe: false,
      });
      const marker = new THREE.Mesh(markerGeo, markerMat);
      marker.position.set(...hs.position);
      scene.add(marker);
      hotspotMarkers.push(marker);
    });

    // Mouse & Touch Orbit Controls
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      controlsStateRef.current.isMouseDown = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      controlsStateRef.current.prevX = clientX;
      controlsStateRef.current.prevY = clientY;
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!controlsStateRef.current.isMouseDown) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - controlsStateRef.current.prevX;
      const deltaY = clientY - controlsStateRef.current.prevY;

      controlsStateRef.current.rotY += deltaX * 0.008;
      controlsStateRef.current.rotX = Math.max(
        0.05,
        Math.min(1.2, controlsStateRef.current.rotX + deltaY * 0.008)
      );

      controlsStateRef.current.prevX = clientX;
      controlsStateRef.current.prevY = clientY;
    };

    const handlePointerUp = () => {
      controlsStateRef.current.isMouseDown = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      controlsStateRef.current.distance = Math.max(
        3.2,
        Math.min(8.5, controlsStateRef.current.distance + e.deltaY * 0.004)
      );
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    domEl.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);
    domEl.addEventListener('wheel', handleWheel, { passive: false });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Render Loop
    let animId = 0;
    const clock = new THREE.Clock();

    const tick = () => {
      const dt = clock.getDelta();

      // Slow Auto-rotation if enabled
      if (autoRotate && !controlsStateRef.current.isMouseDown) {
        controlsStateRef.current.rotY += 0.25 * dt;
      }

      // Smooth camera interpolation towards target view / orbit coords
      const dist = controlsStateRef.current.distance;
      const rotY = controlsStateRef.current.rotY;
      const rotX = controlsStateRef.current.rotX;

      const camX = dist * Math.sin(rotY) * Math.cos(rotX);
      const camY = Math.max(0.4, dist * Math.sin(rotX));
      const camZ = dist * Math.cos(rotY) * Math.cos(rotX);

      // Damp current camera position towards target
      camera.position.x = THREE.MathUtils.damp(camera.position.x, camX, 6, dt);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, camY, 6, dt);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, camZ, 6, dt);

      camera.lookAt(targetLookAtRef.current);

      // Marker pulse animation
      const elapsed = clock.getElapsedTime();
      hotspotMarkers.forEach((m, idx) => {
        const s = 1 + Math.sin(elapsed * 4 + idx) * 0.2;
        m.scale.set(s, s, s);
      });

      renderer.render(scene, camera);
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      domEl.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      domEl.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
      domEl.removeEventListener('wheel', handleWheel);
      renderer.dispose();
    };
  }, [autoRotate]);

  // Color change sync
  useEffect(() => {
    if (carPaintMaterialRef.current) {
      carPaintMaterialRef.current.color.setHex(selectedColor.hex);
    }
  }, [selectedColor]);

  // View angle preset selection
  const handleViewSelect = (view: typeof CAMERA_VIEWS[0]) => {
    setActiveView(view.id);
    setAutoRotate(false);
    const [x, y, z] = view.pos;
    const dist = Math.sqrt(x * x + y * y + z * z);
    const rotY = Math.atan2(x, z);
    const rotX = Math.asin(y / dist);

    controlsStateRef.current.distance = dist;
    controlsStateRef.current.rotY = rotY;
    controlsStateRef.current.rotX = rotX;
    targetLookAtRef.current.set(...(view.target as [number, number, number]));
  };

  const handleZoom = (direction: 'in' | 'out') => {
    setAutoRotate(false);
    const delta = direction === 'in' ? -0.8 : 0.8;
    controlsStateRef.current.distance = Math.max(3.2, Math.min(8.5, controlsStateRef.current.distance + delta));
  };

  return (
    <section id="experience" className="py-24 px-6 sm:px-8 bg-[#07080a] relative border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="text-xs font-bold tracking-[0.3em] uppercase text-[#d50000] mb-3">
              INTERACTIVE 3D STUDIO
            </div>
            <h2
              className="text-3xl sm:text-5xl font-black text-white tracking-[-0.02em] uppercase leading-none"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              BEYOND THE ORDINARY
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-400">
            Rotate 360°, inspect race-derived aerodynamics, trigger interactive hotspots, and configure bespoke Porsche exterior finishes in real-time WebGL.
          </p>
        </div>

        {/* 3D Viewport Frame */}
        <div className="relative w-full aspect-[16/10] md:aspect-[21/10] bg-[#090a0d] border border-white/15 overflow-hidden shadow-2xl">
          {/* Isolated WebGL Mount Ref */}
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* Top Left Spec Badge & Active Model */}
          <div className="absolute top-5 left-5 z-20 pointer-events-none">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#d50000] block">
              911 GT3 RS · 992 ARCHITECTURE
            </span>
            <span
              className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              AERODYNAMIC SHOWROOM
            </span>
          </div>

          {/* Top Right Zoom & Auto-Rotate Controls */}
          <div className="absolute top-5 right-5 z-20 flex items-center gap-2">
            <button
              onClick={() => handleZoom('in')}
              className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 hover:border-white/50 text-white transition-all"
              title="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleZoom('out')}
              className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 hover:border-white/50 text-white transition-all"
              title="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`p-2.5 rounded-full backdrop-blur-md border transition-all ${
                autoRotate
                  ? 'bg-[#d50000] border-[#d50000] text-white'
                  : 'bg-black/60 border-white/20 text-neutral-300 hover:text-white'
              }`}
              title="Toggle 360 auto rotation"
            >
              <RotateCw className={`w-4 h-4 ${autoRotate ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* Interactive Hotspot Card Overlay (If Selected) */}
          {selectedHotspot && (
            <div className="absolute top-20 left-5 max-w-xs sm:max-w-sm z-20 bg-black/85 backdrop-blur-md border border-white/20 p-4 shadow-xl">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#d50000]">
                  {selectedHotspot.category}
                </span>
                <button
                  onClick={() => setSelectedHotspot(null)}
                  className="text-neutral-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              </div>
              <h4 className="text-sm font-bold text-white mb-1.5">{selectedHotspot.name}</h4>
              <p className="text-xs text-neutral-300 leading-relaxed mb-2">{selectedHotspot.description}</p>
              <div className="text-[11px] font-mono text-neutral-400 pt-2 border-t border-white/10">
                {selectedHotspot.spec}
              </div>
            </div>
          )}

          {/* Unified Collapsible Bottom Dock (Zero Viewport Occlusion Discipline) */}
          <div
            className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-4xl transition-all duration-300 ${
              isZenMode ? 'translate-y-[calc(100%-36px)]' : 'translate-y-0'
            }`}
          >
            {/* Collapse / Expand Toggle Button */}
            <div className="flex justify-center -mb-[1px]">
              <button
                onClick={() => setIsZenMode(!isZenMode)}
                className="px-4 py-1 text-[11px] font-semibold tracking-wider uppercase bg-[#14151b] border-t border-x border-white/20 text-neutral-300 hover:text-white flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                {isZenMode ? (
                  <>
                    <ChevronUp className="w-3.5 h-3.5 text-[#d50000]" />
                    <span>SHOW 3D CONTROLS</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3.5 h-3.5 text-[#d50000]" />
                    <span>ZEN VIEW MODE</span>
                  </>
                )}
              </button>
            </div>

            {/* Dock Content Panel */}
            <div className="bg-[#14151b]/95 backdrop-blur-xl border border-white/20 p-4 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                {/* 1. Camera Angle Presets */}
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5">
                    <Eye className="w-3 h-3 text-[#d50000]" /> VIEW ANGLES
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {CAMERA_VIEWS.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => handleViewSelect(v)}
                        className={`py-1.5 px-2 text-[10px] font-bold uppercase tracking-wider transition-all border ${
                          activeView === v.id
                            ? 'bg-white text-black border-white'
                            : 'bg-black/40 text-neutral-300 border-white/10 hover:border-white/30'
                        }`}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Exterior Paint Swatches */}
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#d50000]" /> EXTERIOR FINISH: {selectedColor.name}
                  </div>
                  <div className="flex items-center gap-2">
                    {PAINT_COLORS.map((col) => (
                      <button
                        key={col.id}
                        onClick={() => setSelectedColor(col)}
                        style={{ backgroundColor: col.colorStr }}
                        className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 flex items-center justify-center ${
                          selectedColor.id === col.id ? 'border-white scale-110 shadow-lg' : 'border-neutral-700'
                        }`}
                        title={col.name}
                      >
                        {selectedColor.id === col.id && (
                          <Check className={`w-3.5 h-3.5 ${col.id === 'carrara-white' || col.id === 'racing-yellow' ? 'text-black' : 'text-white'}`} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Hotspot Selector Pills */}
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5">
                    <Info className="w-3 h-3 text-[#d50000]" /> INSPECT HOTSPOT
                  </div>
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                    {HOTSPOTS.map((hs) => (
                      <button
                        key={hs.id}
                        onClick={() => setSelectedHotspot(hs)}
                        className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${
                          selectedHotspot?.id === hs.id
                            ? 'bg-[#d50000] text-white border-[#d50000]'
                            : 'bg-black/40 text-neutral-300 border-white/10 hover:border-white/30'
                        }`}
                      >
                        {hs.category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
