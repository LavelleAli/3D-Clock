# 3D-Clock

An interactive 3D scene built with [three.js](https://threejs.org) inside a [Next.js](https://nextjs.org) app. It's a work in progress: the clock itself isn't built yet. For now the scene has a spinning earth floating in a field of drifting particles.

**Live demo:** [3-d-clock-kappa.vercel.app](https://3-d-clock-kappa.vercel.app)

## Features

- **Textured earth:** a sphere wrapped in an equirectangular earth image, spinning on its vertical axis.
- **Mouse-follow camera:** the camera eases toward wherever your pointer is.
- **Idle drift:** after a second without mouse movement, the camera slowly circles the earth, starting from wherever the mouse last was.
- **Particle field:** colored particles from [three-nebula](https://github.com/creativelifeform/three-nebula) appear and fade inside a 20×20×20 box around the earth.

## Tech stack

| Tool | Version | Used for |
|---|---|---|
| Next.js (App Router) | 16.4.2 | App framework |
| React | 19.3.0 | UI |
| three.js | 0.186 | 3D rendering |
| three-nebula | 13.3 | Particle system |
| Tailwind CSS | 4 | Styling |

## Getting started

You need Node.js 20.9 or newer.

```bash
cd frontend/3dclock
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Other scripts, all run from `frontend/3dclock`:

| Command | What it does |
|---|---|
| `npm run build` | Builds for production |
| `npm start` | Serves the production build |
| `npm run lint` | Runs ESLint |

## Deployment

The app is deployed on [Vercel](https://vercel.com) at [3-d-clock-kappa.vercel.app](https://3-d-clock-kappa.vercel.app). The Next.js app lives in `frontend/3dclock`, so a Vercel project needs its **Root Directory** set to that folder.

## Project structure

```
frontend/3dclock/
├── app/
│   ├── layout.js               Root layout, fonts, page metadata
│   └── page.js                 Landing page; renders <Main />
├── components/
│   ├── threeAnimations/
│   │   ├── Main.js             Scene, camera, earth, animation loop, cleanup
│   │   └── CreateNebula.js     three-nebula particle system setup
│   └── notes/notes.txt         Personal learning notes
└── public/
    └── equirectangularEarth2-1.jpg   Earth texture
```

## How the scene works

All of the three.js code runs inside a `useEffect` in [`Main.js`](frontend/3dclock/components/threeAnimations/Main.js). The component is a Client Component (`"use client"`), and the setup only runs in the browser, after the component has mounted.

1. **Setup:** it creates a scene, camera and renderer, then attaches the renderer's canvas to a `<div>` through a ref.
2. **Earth:** `TextureLoader` loads the earth image and assigns it to the sphere material's `map`. The sphere's built-in UV coordinates line up with the image's longitude and latitude, so the map wraps around the sphere correctly.
3. **Animation loop:** `renderer.setAnimationLoop` runs every frame. Each frame it spins the earth, moves the camera a fraction of the way toward its target (the mouse position, or a point on the idle circle), and updates the particles.
4. **Cleanup:** when the component unmounts, it stops the loop, removes the pointer listener and the canvas, and frees GPU memory (renderer, geometry, material, texture). If the earth image finishes loading after cleanup has already run, the texture is disposed straight away instead of being put on the material.
