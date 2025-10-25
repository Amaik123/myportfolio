import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const palettes = [
  ["#FC1FF9", "#BC0EEF", "#443061", "#E42536", "#FC5E31"],
  ["#00F891", "#00D61C", "#021307", "#0346F4", "#05E9E7"],
  ["#FF5BFF", "#D34DEE", "#BF4BF8", "#2AC9F9", "#56F1FF"],
  ["#FE02FF", "#DF21FF", "#8407CE", "#5F03BD", "#2F0049"],
  ["#B6FFFE", "#48FDFE", "#F20BF8", "#150390", "#1E0C2D"],
];

class Tetrahedron extends THREE.Object3D {
  constructor() {
    super();
    this.vertices = [
      new THREE.Vector3(Math.sqrt(8 / 9), 0, -(1 / 3)),
      new THREE.Vector3(-Math.sqrt(2 / 9), Math.sqrt(2 / 3), -(1 / 3)),
      new THREE.Vector3(-Math.sqrt(2 / 9), -Math.sqrt(2 / 3), -(1 / 3)),
      new THREE.Vector3(0, 0, 1),
    ];
    this.index = [0, 1, 0, 2, 0, 3, 1, 2, 2, 3, 3, 1];
    this.userData = {
      color: 2,
      rotInit: new THREE.Euler().setFromVector3(
        new THREE.Vector3().random().multiplyScalar(Math.PI * 2)
      ),
      rotSpeed: new THREE.Euler().setFromVector3(
        new THREE.Vector3()
          .random()
          .multiplyScalar(
            (0.2 + Math.random() * 0.2) *
              Math.PI *
              Math.sign(Math.random() - 0.5)
          )
      ),
      position: new THREE.Vector3().random().subScalar(0.5).multiplyScalar(10),
    };
    this.position.copy(this.userData.position);
    this.rotation.copy(this.userData.rotInit);
    this.scale.setScalar((Math.random() * 0.5 + 0.5) * 1.5);
    this.mediators = { v: new THREE.Vector3() };
  }

  draw(ctx, camera, time) {
    const ud = this.userData;
    const v = this.mediators.v;
    ctx.strokeStyle = this.ctxColor;
    ctx.lineWidth = this.ctxLineWidth;
    ctx.lineCap = "round";
    ctx.beginPath();
    for (let i = 0; i < this.index.length; i += 2) {
      this.projectToScreen(i, v);
      ctx.moveTo(v.x, v.y);
      this.projectToScreen(i + 1, v);
      ctx.lineTo(v.x, v.y);
    }
    ctx.stroke();
  }

  projectToScreen(idx, v) {
    v.copy(this.vertices[this.index[idx]]).applyMatrix4(this.matrixWorld);
    v.project(this.camera);
    v.x *= this.unit * 50;
    v.y *= -this.unit * 50;
  }
}

export default function Scene() {
  const canvasRef = useRef(null);
  const offscreenCanvasRef = useRef(null);
  const sceneRef = useRef(new THREE.Scene());
  const cameraRef = useRef(new THREE.PerspectiveCamera(60, 1, 1, 100));
  const controlsRef = useRef(null);
  const tetrahedraRef = useRef([]);
  const ringsRef = useRef([]);
  const [palette, setPalette] = useState(palettes[0]);
  const unitRef = useRef(0);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    offscreenCanvasRef.current = document.createElement("canvas");
    const offCtx = offscreenCanvasRef.current.getContext("2d");
    const ctx = canvas.getContext("2d");
    const clock = new THREE.Clock();

    // Camera and controls setup
    cameraRef.current.position.set(0, 0, 15);
    controlsRef.current = new OrbitControls(cameraRef.current, canvas);
    controlsRef.current.enableDamping = true;
    controlsRef.current.enablePan = false;
    controlsRef.current.autoRotate = true;
    controlsRef.current.autoRotateSpeed *= 5;
    controlsRef.current.minDistance = 10;
    controlsRef.current.maxDistance = 20;

    // Create tetrahedra
    tetrahedraRef.current = Array.from({ length: 20 }, () => {
      const tetra = new Tetrahedron();
      sceneRef.current.add(tetra);
      return tetra;
    });

    // Initial setup
    const resize = () => {
      canvas.height = window.innerHeight * 0.95;
      canvas.width = window.innerHeight * 0.95;
      offscreenCanvasRef.current.height = canvas.height;
      offscreenCanvasRef.current.width = canvas.width;
      unitRef.current = canvas.height * 0.01;

      canvas.style.border = `${unitRef.current * 1}px solid ${palette[3]}`;
      canvas.style.borderRadius = `${unitRef.current * 27.2}px`;
      drawHole(offCtx);
    };

    const setRingColors = () => {
      ringsRef.current.forEach((ring, idx) => {
        const color = palette[THREE.MathUtils.randInt(0, palette.length - 1)];
        const c = new THREE.Color(color).multiplyScalar(256);
        const a = (1 - idx / (25 - 1)) * 0.875;
        ring.color = `rgba(${c.r}, ${c.g}, ${c.b}, ${a})`;
      });
    };

    // Initialize rings
    ringsRef.current = Array.from({ length: 25 }, (_, idx) => {
      const size = 90 - idx;
      return {
        size,
        hSize: size * 0.5,
        radii: Array.from({ length: 4 }, () => Math.random()),
        radiiUnit: new Array(4).fill(0),
        rotation:
          Math.PI *
          (0.1 + Math.random() * 0.4) *
          Math.sign(Math.random() - 0.5) *
          0.5,
        rotationInit: Math.PI * 2 * Math.random(),
        color: "",
      };
    });
    setRingColors();

    // Animation loop
    const animate = () => {
      const dt = Math.min(clock.getDelta(), 1 / 60);
      tRef.current += dt;

      controlsRef.current.update();

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update tetrahedra
      tetrahedraRef.current.forEach((tetra) => {
        const ud = tetra.userData;
        tetra.rotation.copy(ud.rotInit);
        tetra.rotation.x += ud.rotSpeed.x * tRef.current;
        tetra.rotation.y += ud.rotSpeed.y * tRef.current;
        tetra.rotation.z += ud.rotSpeed.z * tRef.current;
      });
      sceneRef.current.updateMatrixWorld();

      // Draw elements
      ctx.save();
      ctx.translate(unitRef.current * 50, unitRef.current * 50);
      tetrahedraRef.current.forEach((tetra) =>
        tetra.draw(ctx, cameraRef.current, tRef.current)
      );
      ctx.restore();

      // Draw hole and background
      ctx.drawImage(offscreenCanvasRef.current, 0, 0);
      drawBackgroundGradient(ctx, palette);

      // Draw rings
      ctx.save();
      ctx.translate(unitRef.current * 50, unitRef.current * 50);
      ringsRef.current.forEach((ring) => {
        ctx.save();
        ctx.rotate(ring.rotationInit + ring.rotation * tRef.current);
        ctx.strokeStyle = ring.color;
        ctx.lineWidth = unitRef.current * 4;
        ctx.beginPath();
        ring.radii.forEach((r, idx) => {
          const posSine =
            Math.sin((r + tRef.current * 0.15) * Math.PI * 2) * 0.5 + 0.5;
          ring.radiiUnit[idx] =
            unitRef.current * (1 - posSine * 0.1) * ring.hSize;
        });
        ctx.roundRect(
          -unitRef.current * ring.hSize,
          -unitRef.current * ring.hSize,
          unitRef.current * ring.size,
          unitRef.current * ring.size,
          ring.radiiUnit
        );
        ctx.stroke();
        ctx.restore();
      });
      ctx.restore();

      requestAnimationFrame(animate);
    };

    // Event handlers
    const handleResize = () => {
      resize();
      drawHole(offCtx);
      setRingColors();
    };

    const handleDoubleClick = (event) => {
      const bcr = canvas.getBoundingClientRect();
      const y = event.clientY - bcr.top;
      const palIdx = Math.floor(y / unitRef.current / (100 / palettes.length));
      setPalette(palettes[palIdx]);
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("dblclick", handleDoubleClick);
    resize();
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("dblclick", handleDoubleClick);
      controlsRef.current.dispose();
    };
  }, [palette]);

  return <canvas ref={canvasRef} />;
}

// Helper functions
function drawHole(context) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  const gradient = context.createRadialGradient(
    context.canvas.width / 2,
    context.canvas.height / 2,
    context.canvas.width * 0.2,
    context.canvas.width / 2,
    context.canvas.height / 2,
    context.canvas.width * 0.35
  );
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  context.globalCompositeOperation = "source-out";
}

function drawBackgroundGradient(context, palette) {
  const gradient = context.createLinearGradient(0, 0, 0, context.canvas.height);
  gradient.addColorStop(0, palette[0]);
  gradient.addColorStop(1, palette[4]);
  context.fillStyle = gradient;
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
}
