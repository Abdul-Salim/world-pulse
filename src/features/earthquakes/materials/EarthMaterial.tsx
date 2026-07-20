"use client";

import { useMemo } from "react";
import * as THREE from "three";

import useEarthTextures from "@/features/earthquakes/hooks/useEarthTextures";
import { SUN_DIRECTION } from "@/lib/sun";

export default function EarthMaterial() {
    const textures = useEarthTextures();

    const uniforms = useMemo(
        () => ({
            dayTexture: { value: textures.day },
            nightTexture: { value: textures.night },
            normalTexture: { value: textures.normal },
            // specularTexture: { value: textures.specular },
            sunDirection: { value: SUN_DIRECTION },
            ambientStrength: { value: 0.12 },
        }),
        [textures]
    );

    return (
        <shaderMaterial
            uniforms={uniforms}
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
        />
    );
}

const vertexShader = `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;

void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);

    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;

    gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
`;

const fragmentShader = `
uniform sampler2D dayTexture;
uniform sampler2D nightTexture;
uniform sampler2D normalTexture;
uniform sampler2D specularTexture;
uniform vec3 sunDirection;
uniform float ambientStrength;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;

mat3 cotangentFrame(vec3 N, vec3 p, vec2 uv) {
    vec3 dp1 = dFdx(p);
    vec3 dp2 = dFdy(p);
    vec2 duv1 = dFdx(uv);
    vec2 duv2 = dFdy(uv);

    vec3 dp2perp = cross(dp2, N);
    vec3 dp1perp = cross(N, dp1);
    vec3 T = dp2perp * duv1.x + dp1perp * duv2.x;
    vec3 B = dp2perp * duv1.y + dp1perp * duv2.y;

    float invmax = inversesqrt(max(dot(T, T), dot(B, B)));
    return mat3(T * invmax, B * invmax, N);
}

void main() {
    vec3 geometryNormal = normalize(vNormal);

    vec3 normalSample = texture2D(normalTexture, vUv).xyz * 2.0 - 1.0;
    mat3 tbn = cotangentFrame(geometryNormal, -vWorldPosition, vUv);
    vec3 N = normalize(tbn * normalSample);

    float sunDot = dot(N, sunDirection);
    float dayAmount = smoothstep(-0.2, 0.15, sunDot);

    vec3 dayColor = texture2D(dayTexture, vUv).rgb;
    vec3 nightColor = texture2D(nightTexture, vUv).rgb;
    float oceanMask = texture2D(specularTexture, vUv).r;

    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    vec3 halfDir = normalize(sunDirection + viewDir);
    float specAngle = max(dot(N, halfDir), 0.0);
    float specular = pow(specAngle, 60.0) * oceanMask * dayAmount;

    vec3 litSide = dayColor * (ambientStrength + dayAmount)
        + vec3(1.0, 0.98, 0.92) * specular * 0.7;

    vec3 darkSide = nightColor * 1.6 + dayColor * ambientStrength * 0.4;

    vec3 color = mix(darkSide, litSide, dayAmount);

    gl_FragColor = vec4(color, 1.0);
}
`;