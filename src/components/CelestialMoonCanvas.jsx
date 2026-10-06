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

    // 3. Moon Mesh (3D Sphere) — calibrated to fully cover video moon
    const baseMoonY = 0.55;
    const moonRadius = 2.02;
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

    // 4. Subtle Rim Shader (blends seamlessly with video's natural glow)
    const coronaGeo = new THREE.SphereGeometry(moonRadius * 1.015, 48, 48);
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
          float intensity = pow(0.55 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
          gl_FragColor = vec4(0.75, 0.82, 0.95, 1.0) * intensity * 0.45;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const corona = new THREE.Mesh(coronaGeo, coronaMat);
    corona.position.y = baseMoonY;
    scene.add(corona);

    // 6. Lighting (warm, cinematic)
    const ambientLight = new THREE.AmbientLight(0x404050, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff8f0, 3.0);
    keyLight.position.set(4.5, 3.0, 5.0);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x8090a0, 1.2);
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
