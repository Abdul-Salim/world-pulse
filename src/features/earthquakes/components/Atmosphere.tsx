"use client";

import * as THREE from "three";

export default function Atmosphere() {
    return (
        <mesh scale={1.04}>
            <sphereGeometry args={[2, 128, 128]} />

            <shaderMaterial
                transparent
                side={THREE.BackSide}
                depthWrite={false}
                depthTest={true}
                blending={THREE.AdditiveBlending}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
            />
        </mesh>
    );
}

const vertexShader = `
varying vec3 vNormal;

void main() {
    vNormal = normalize(normalMatrix * normal);

    gl_Position =
        projectionMatrix *
        modelViewMatrix *
        vec4(position,1.0);
}
`;

const fragmentShader = `
varying vec3 vNormal;

void main(){

    float intensity =
        pow(0.65 - dot(vNormal, vec3(0.0,0.0,1.0)), 4.0);

    gl_FragColor =
        vec4(0.25,0.6,1.0,1.0) * intensity;
}
`;