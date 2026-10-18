"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

const Main = () => {
  const mountRef = useRef(null);
  

  useEffect(() => {

    // const controls = new OrbitControls( camera, rendererReference.domElement );
    // const loader = new GLTFLoader();

    const mount = mountRef.current;

    const scene = new THREE.Scene();
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
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    function animate(time) {
        cube.rotation.x = time / 2000;
        cube.rotation.y = time / 2000;
      renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);
  }, []);

  return <div ref={mountRef}>
    
  </div>;
};

export default Main;
