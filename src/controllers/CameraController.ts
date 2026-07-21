import * as THREE from "three";
import type { OrbitControls } from "three-stdlib";
import gsap from "gsap";

import { latLngToVector } from "@/utils/latLngToVector";

interface FlyToOptions {
  distance?: number;
  duration?: number;
}

const FORWARD = new THREE.Vector3(0, 0, 1);

class CameraController {
  private camera: THREE.PerspectiveCamera | null = null;
  private controls: OrbitControls | null = null;
  private currentTween: gsap.core.Tween | null = null;

  private readonly DEFAULT_DISTANCE = 3;
  private readonly DEFAULT_DURATION = 1.6;
  private readonly RESET_DISTANCE = 6;

  registerCamera(camera: THREE.PerspectiveCamera) {
    this.camera = camera;
  }

  registerControls(controls: OrbitControls) {
    this.controls = controls;
    controls.target.set(0, 0, 0);
  }

  unregisterCamera() {
    this.camera = null;
  }

  unregisterControls() {
    this.controls = null;
  }

  flyToLatLng(lat: number, lon: number, options: FlyToOptions = {}) {
    const direction = latLngToVector(lat, lon, 1).normalize();
    this.flyTo(direction, options);
  }

  reset(duration = this.DEFAULT_DURATION) {
    if (!this.camera) return;
    const currentDir =
      this.camera.position.lengthSq() > 1e-6
        ? this.camera.position.clone().normalize()
        : FORWARD.clone();

    this.flyTo(currentDir, { distance: this.RESET_DISTANCE, duration });
  }

  private flyTo(direction: THREE.Vector3, options: FlyToOptions = {}) {
    if (!this.camera || !this.controls) return;

    const camera = this.camera;
    const controls = this.controls;

    const {
      distance = this.DEFAULT_DISTANCE,
      duration = this.DEFAULT_DURATION,
    } = options;

    const startDir =
      camera.position.lengthSq() > 1e-6
        ? camera.position.clone().normalize()
        : FORWARD.clone();
    const startDistance = camera.position.length();
    const endDistance = distance;

    const qStart = new THREE.Quaternion().setFromUnitVectors(FORWARD, startDir);
    const qEnd = new THREE.Quaternion().setFromUnitVectors(FORWARD, direction);

    controls.target.set(0, 0, 0);

    const state = { t: 0 };

    this.currentTween?.kill();
    this.currentTween = gsap.to(state, {
      t: 1,
      duration,
      ease: "power2.inOut",
      onUpdate: () => {
        if (!this.camera || !this.controls) return;

        const t = state.t;
        const dir = FORWARD.clone().applyQuaternion(qStart.clone().slerp(qEnd, t));
        const dist = THREE.MathUtils.lerp(startDistance, endDistance, t);

        this.camera.position.copy(dir.multiplyScalar(dist));
        this.controls.target.set(0, 0, 0);
        this.controls.update();
      },
      onComplete: () => {
        this.currentTween = null;
      },
    });
  }
}

export const cameraController = new CameraController();