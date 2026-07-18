import * as THREE from "three";
import type { OrbitControls } from "three-stdlib";
import gsap from "gsap";

import { latLngToVector } from "@/utils/latLngToVector";

interface FlyToOptions {
  distance?: number;
  duration?: number;
}

class CameraController {
  private camera: THREE.PerspectiveCamera | null = null;
  private controls: OrbitControls | null = null;

  private readonly DEFAULT_DISTANCE = 3;
  private readonly DEFAULT_DURATION = 2;
  private readonly CAMERA_OFFSET = new THREE.Vector3(0.6, 0.3, 0);

  registerCamera(camera: THREE.PerspectiveCamera) {
    this.camera = camera;
  }

  registerControls(controls: OrbitControls) {
    this.controls = controls;
  }

  unregisterCamera() {
    this.camera = null;
  }

  unregisterControls() {
    this.controls = null;
  }

  flyToLatLng(
    lat: number,
    lon: number,
    options: FlyToOptions = {}
  ) {
    const target = latLngToVector(lat, lon);

    this.flyTo(target, options);
  }

  reset(duration = this.DEFAULT_DURATION) {
    this.animate(
      new THREE.Vector3(0, 0, 6),
      new THREE.Vector3(0, 0, 0),
      duration
    );
  }

  private flyTo(
    target: THREE.Vector3,
    options: FlyToOptions = {}
  ) {
    const {
      distance = this.DEFAULT_DISTANCE,
      duration = this.DEFAULT_DURATION,
    } = options;

    const destination = target
      .clone()
      .normalize()
      .multiplyScalar(distance)
      .add(this.CAMERA_OFFSET);

    this.animate(destination, target, duration);
  }

  private animate(
    cameraPosition: THREE.Vector3,
    lookAt: THREE.Vector3,
    duration: number
  ) {
    if (!this.camera || !this.controls) return;

    gsap.killTweensOf(this.camera.position);
    gsap.killTweensOf(this.controls.target);

    gsap.to(this.camera.position, {
      x: cameraPosition.x,
      y: cameraPosition.y,
      z: cameraPosition.z,
      duration,
      ease: "power2.inOut",
      onUpdate: () => this.controls?.update(),
    });

    gsap.to(this.controls.target, {
      x: lookAt.x,
      y: lookAt.y,
      z: lookAt.z,
      duration,
      ease: "power2.inOut",
      onUpdate: () => this.controls?.update(),
    });
  }
}

export const cameraController = new CameraController();