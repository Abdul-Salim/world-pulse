import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function useEarthTextures() {
    const textures = useTexture({
        day: "/textures/earth_day.jpg",
        night: "/textures/earth_night.jpg",
        clouds: "/textures/earth_clouds.jpg",
        normal: "/textures/earth_normal.png",
        specular: "/textures/earth_specular.png",
    });

    textures.day.colorSpace = THREE.SRGBColorSpace;
    textures.night.colorSpace = THREE.SRGBColorSpace;
    textures.clouds.colorSpace = THREE.SRGBColorSpace;

    Object.values(textures).forEach((texture) => {
        texture.anisotropy = 16;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
    });

    return textures;
}