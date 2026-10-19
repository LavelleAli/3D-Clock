import * as THREE from "three";
import System, {
  SpriteRenderer,
  MeshRenderer,
  Emitter,
  Rate,
  Span,
  Position,
  Mass,
  Radius,
  Life,
  RadialVelocity,
  Vector3D,
  Alpha,
  Scale,
  Color,
  PointZone,
  Texture,
  Body,
  Rotate,
  Gravity,
  
} from "three-nebula";

function createNebula(scene) {
  const system = new System();
  const renderer = new MeshRenderer(scene, THREE);
  const emitter = new Emitter();

  // Color Scheme: 
  const YELLOW_200 = '#fef08a';
  const SKYBLUE_200 = '#bae6fd';
  const RED_200 = '#fecaca'



  const geometry = new THREE.SphereGeometry(0.1, 8, 6);
  const material = new THREE.MeshBasicMaterial({ color: "skyblue" });
  const sphere = new THREE.Mesh(geometry, material);

  emitter
    .setRate(new Rate(new Span(4, 16), new Span(0, 0.1)))
    .setInitializers([
      new Position( new PointZone(0, 0,) ),
      new Mass( .5 ),
      new Life( 1, 10 ),
      new RadialVelocity( 3, new Vector3D(0, -1, -1), 180),
      new Body(sphere),
    ])
    .setBehaviours([
      new Alpha(1, 0),
      new Scale(0.1, 0),
      new Color([
        new THREE.Color(YELLOW_200),
        new THREE.Color(SKYBLUE_200),
        new THREE.Color(RED_200),
        new THREE.Color('white'),
      ],
      new THREE.Color('random')
      ),
      new Rotate('random'),
      
    ])
    .emit();

  system
    .addRenderer(renderer)
    .addEmitter(emitter)
    .emit({
      onStart: () => {},
      onUpdate: () => {},
      onEnd: () => {},
    });

  return system;
}

export default createNebula;
