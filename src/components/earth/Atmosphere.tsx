"use client";

import * as THREE from "three";

export default function Atmosphere() {
    return (
        <mesh scale={1.03}>
            <sphereGeometry args={[2, 128, 128]} />

            <shaderMaterial
                transparent
                depthWrite={false}
                side={THREE.BackSide}
                blending={THREE.AdditiveBlending}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
            />
        </mesh>
    );
}

const vertexShader = `
varying vec3 vNormal;
varying vec3 vWorldPosition;

void main() {

    vNormal = normalize(normalMatrix * normal);

    vec4 worldPosition = modelMatrix * vec4(position,1.0);

    vWorldPosition = worldPosition.xyz;

    gl_Position =
        projectionMatrix *
        viewMatrix *
        worldPosition;
}
`;

const fragmentShader = `
varying vec3 vNormal;
varying vec3 vWorldPosition;

void main(){

    vec3 viewDirection =
        normalize(cameraPosition - vWorldPosition);

    float fresnel =
        pow(1.0 - dot(viewDirection, vNormal), 3.5);

    vec3 atmosphereColor = vec3(0.06, 0.35, 0.75);

    gl_FragColor =
            vec4(atmosphereColor * fresnel, fresnel * 0.22);
}
`;