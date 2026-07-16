import * as THREE from "three";
import { useTexture } from "@react-three/drei";

export function useEarthTextures() {
    const textures = useTexture({
        day: "/textures/earth_day.jpg",
        night: "/textures/earth_night.jpg",
        normal: "/textures/earth_normal.png",
        specular: "/textures/earth_specular.png",
        clouds: "/textures/earth_clouds.jpg",
    });

    Object.values(textures).forEach((texture) => {
        texture.anisotropy = 16;
    });

    textures.day.colorSpace = THREE.SRGBColorSpace;
    textures.night.colorSpace = THREE.SRGBColorSpace;
    textures.clouds.colorSpace = THREE.SRGBColorSpace;

    return textures;
}