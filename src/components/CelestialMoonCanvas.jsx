import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CelestialMoonCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 8.5;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    mount.appendChild(renderer.domElement);

    // 2. Photorealistic Moon Texture (USGS / NASA Equirectangular High-Res)
    const textureLoader = new THREE.TextureLoader();
    const moonTexture = textureLoader.load('/textures/moon_1024.jpg');
    moonTexture.colorSpace = THREE.SRGBColorSpace;

    // 3. Moon Mesh (3D Sphere) — shrunk slightly to float elegantly in the galaxy core
    const baseMoonY = 0.0;
    const moonRadius = 1.48; // Elegantly proportioned
    const moonGeo = new THREE.SphereGeometry(moonRadius, 64, 64);
    const moonMat = new THREE.MeshStandardMaterial({
      map: moonTexture,
      bumpMap: moonTexture,
      bumpScale: 0.045,
      roughness: 0.82,
      metalness: 0.05,
    });
    const moon = new THREE.Mesh(moonGeo, moonMat);
    moon.position.y = baseMoonY;
    scene.add(moon);

    // 4. Atmospheric Corona Glow Shader (Fresnel Rim)
    const coronaGeo = new THREE.SphereGeometry(moonRadius * 1.055, 48, 48);
    const coronaMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.68 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(0.82, 0.90, 1.0, 1.0) * intensity * 1.3;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const corona = new THREE.Mesh(coronaGeo, coronaMat);
    corona.position.y = baseMoonY;
    scene.add(corona);

    // 5. Outer Ethereal Halo (Billboard Sprite)
    const haloCanvas = document.createElement('canvas');
    haloCanvas.width = 256;
    haloCanvas.height = 256;
    const hCtx = haloCanvas.getContext('2d');
    const hGrad = hCtx.createRadialGradient(128, 128, 30, 128, 128, 128);
    hGrad.addColorStop(0, 'rgba(215, 230, 255, 0.55)');
    hGrad.addColorStop(0.35, 'rgba(165, 195, 255, 0.18)');
    hGrad.addColorStop(0.7, 'rgba(130, 150, 245, 0.04)');
    hGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    hCtx.fillStyle = hGrad;
    hCtx.fillRect(0, 0, 256, 256);

    const haloTexture = new THREE.CanvasTexture(haloCanvas);
    const haloMaterial = new THREE.SpriteMaterial({
      map: haloTexture,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.75,
    });
    const haloSprite = new THREE.Sprite(haloMaterial);
    haloSprite.scale.set(5.8, 5.8, 1.0);
    haloSprite.position.y = baseMoonY;
    scene.add(haloSprite);

    // 6. Celestial Lighting (Signature Cyan Rim + Key Light)
    const ambientLight = new THREE.AmbientLight(0x404565, 1.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(4.5, 3.0, 5.0);
    scene.add(keyLight);

    // Signature cyan rim light on the lower left
    const rimLight = new THREE.DirectionalLight(0x80d8ff, 2.2);
    rimLight.position.set(-5.0, -2.5, -2.0);
    scene.add(rimLight);

    // 7. Animation & Resize Handling
    const handleResize = () => {
      if (!mount) return;
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      const aspect = width / height;
      camera.aspect = aspect;
      if (aspect < 0.8) {
        camera.position.z = 10.6;
      } else if (aspect < 1.2) {
        camera.position.z = 9.6;
      } else {
        camera.position.z = 8.5;
      }
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth real-time axial spin
      moon.rotation.y += 0.0016;
      corona.rotation.y += 0.0016;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      moonGeo.dispose();
      moonMat.dispose();
      coronaGeo.dispose();
      coronaMat.dispose();
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden" 
    />
  );
}
