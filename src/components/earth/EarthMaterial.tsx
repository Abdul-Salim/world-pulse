import useEarthTextures from "@/hooks/useEarthTextures";

export default function EarthMaterial() {
    const textures = useEarthTextures();

    return (
        <meshStandardMaterial
            map={textures.day}
            normalMap={textures.normal}
            metalness={0}
            roughness={1}
        />
    );
}