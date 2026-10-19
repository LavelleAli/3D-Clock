"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import createNebula from "./CreateNebula";

const Main = () => {
  const mountRef = useRef(null);

  useEffect(() => {

    // const controls = new OrbitControls( camera, rendererReference.domElement );
    // const loader = new GLTFLoader();

    const mount = mountRef.current;

    const scene = new THREE.Scene();
    const nebula = createNebula(scene);
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    // The Object:
    const geometry = new THREE.SphereGeometry(1, 32, 16);
    const material = new THREE.MeshBasicMaterial({ color: 'skyblue' });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    camera.position.z = 5;

    function animate(time) {
      sphere.rotation.x = time / 2000;
      sphere.rotation.y = time / 2000;
      renderer.render(scene, camera);
      nebula.update();
    }
    renderer.setAnimationLoop(animate);
    return () => {
        renderer.setAnimationLoop(null);
        nebula.destroy();
        renderer.dispose();
        mount.removeChild(renderer.domElement)
    }
  }, []);

  return <div ref={mountRef}></div>;
};

export default Main;
