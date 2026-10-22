import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "../context/ThemeContext";

const Background3D = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const { isDarkMode } = useTheme();

  // Dynamic Fog & Theme Update
  useEffect(() => {
    if (sceneRef.current && sceneRef.current.fog) {
      sceneRef.current.fog.color.setHex(isDarkMode ? 0x0a0a0a : 0xf4f4f4);
    }
  }, [isDarkMode]);

  // Main 3D WebGL Canvas Scene Initialization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch (e) {
      console.warn("WebGL initialization failed:", e);
      return;
    }

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(isDarkMode ? 0x0a0a0a : 0xf4f4f4, 0.032);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 14);

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    // Lighting (Brand Green & Blue)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const greenLight = new THREE.PointLight(0x00c853, 2.5, 35);
    greenLight.position.set(4, 4, 4);
    scene.add(greenLight);

    const blueLight = new THREE.PointLight(0x0072ff, 2.5, 40);
    blueLight.position.set(-6, -4, 3);
    scene.add(blueLight);

    // Central Globe & Crystal Group
    const crystalGroup = new THREE.Group();
    scene.add(crystalGroup);

    // Central Glowing Octahedron
    const crystalGeo = new THREE.OctahedronGeometry(2.0, 1);
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0x00c853,
      emissive: 0x0072ff,
      emissiveIntensity: 0.22,
      roughness: 0.15,
      metalness: 0.1,
      flatShading: true,
      transparent: true,
      opacity: 0.22,
    });
    const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
    crystalGroup.add(crystalMesh);

    // Outer Geometric Wireframe Globe
    const wireGeo = new THREE.IcosahedronGeometry(2.55, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x0072ff,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    crystalGroup.add(wireMesh);

    // Orbital Planetary Ring
    const ringGeo = new THREE.TorusGeometry(4.1, 0.02, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00c853,
      transparent: true,
      opacity: 0.35,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2.3;
    crystalGroup.add(ringMesh);

    // 20 Floating Ambient Dodecahedron Shards
    const shards = [];
    const shardGeo = new THREE.DodecahedronGeometry(0.55, 0);
    const shardMat = new THREE.MeshStandardMaterial({
      color: 0x0072ff,
      roughness: 0.4,
      metalness: 0.1,
      flatShading: true,
      transparent: true,
      opacity: 0.28,
    });

    for (let i = 0; i < 20; i++) {
      const shard = new THREE.Mesh(shardGeo, shardMat);
      const angle = (i / 20) * Math.PI * 2;
      const radius = 5.5 + Math.random() * 8;
      shard.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 13,
        (Math.random() - 0.5) * 10 - 3
      );
      const scale = 0.35 + Math.random() * 0.85;
      shard.scale.set(scale, scale, scale);
      shard.userData = {
        rotX: (Math.random() - 0.5) * 0.012,
        rotY: (Math.random() - 0.5) * 0.012,
        offset: Math.random() * Math.PI * 2,
      };
      scene.add(shard);
      shards.push(shard);
    }

    let mouseX = 0;
    let mouseY = 0;
    let scrollY = window.scrollY || 0;

    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      crystalMesh.rotation.y = t * 0.3;
      crystalMesh.rotation.x = Math.sin(t * 0.4) * 0.2;
      wireMesh.rotation.y = -t * 0.18;
      ringMesh.rotation.z = t * 0.35;

      crystalGroup.position.y = Math.sin(t * 1.1) * 0.3;
      crystalGroup.position.x = THREE.MathUtils.lerp(
        crystalGroup.position.x,
        mouseX * 1.4,
        0.05
      );

      camera.position.z = THREE.MathUtils.lerp(
        camera.position.z,
        14 - Math.min(scrollY * 0.0015, 4),
        0.05
      );
      camera.position.y = THREE.MathUtils.lerp(
        camera.position.y,
        -mouseY * 0.7,
        0.05
      );

      shards.forEach((s) => {
        s.rotation.x += s.userData.rotX;
        s.rotation.y += s.userData.rotY;
        s.position.y += Math.sin(t + s.userData.offset) * 0.0025;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      crystalGeo.dispose();
      crystalMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      shardGeo.dispose();
      shardMat.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none z-0"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
};

export default Background3D;
