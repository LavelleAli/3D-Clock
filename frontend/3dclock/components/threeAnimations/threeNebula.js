import React from 'react';
import * as THREE from 'three';
import System, {
    SpriteRenderer,
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
} from 'three-nebula';

const threeNebula = () => {

    const system = new System();
    const renderer = new SpriteRenderer(threeScene, THREE);
    const emitter = new Emitter();

    emitter
    .setRate(new Rate(new Span(4, 16), new Span(0, 0.1)))
    .setInitializers([
        new Position(new PointZone(0,0)),
        new Mass(1),
        new Life(3),
        new RadialVelocity(45, new Vector3D(0, 1, 0), 180),
    ])
    .setBehaviours([
        new Alpha(1, 0),
        new Scale(0.1, 1.3),
        new Color(new THREE.Color(0xff0000), new THREE.Color(0x0000ff)),
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

    const animate = () => {

        system.update();
        requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

  return (
    <div>threeNebula</div>
  )
}

export default threeNebula