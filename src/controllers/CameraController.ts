import * as THREE from "three";
import type { OrbitControls } from "three-stdlib";
import gsap from "gsap";

import { latLngToVector } from "@/utils/latLngToVector";
import { EARTH_RADIUS } from "@/lib/constants";

interface FlyToOptions {
  distance?: number;
  duration?: number;
}

const FORWARD = new THREE.Vector3(0, 0, 1);
const WORLD_UP = new THREE.Vector3(0, 1, 0);

const ARC_HEIGHT_FACTOR = 0.6;
const TILT_ANGLE = THREE.MathUtils.degToRad(35);

class CameraController {
  private camera: THREE.PerspectiveCamera | null = null;
  private controls: OrbitControls | null = null;

  private readonly DEFAULT_DISTANCE = 3;
  private readonly DEFAULT_DURATION = 2.2;

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

  flyToLatLng(lat: number, lon: number, options: FlyToOptions = {}) {
    const target = latLngToVector(lat, lon);
    this.flyTo(target, options);
  }

  reset(duration = this.DEFAULT_DURATION) {
    this.flyTo(new THREE.Vector3(0, 0, 0), {
      distance: 6,
      duration,
    });
  }

  private flyTo(target: THREE.Vector3, options: FlyToOptions = {}) {
    if (!this.camera || !this.controls) return;

    const camera = this.camera;
    const controls = this.controls;

    const {
      distance = this.DEFAULT_DISTANCE,
      duration = this.DEFAULT_DURATION,
    } = options;

    const isReset = target.lengthSq() < 1e-6;

    const startCamDir =
      camera.position.lengthSq() > 1e-6
        ? camera.position.clone().normalize()
        : FORWARD.clone();
    const startDistance = camera.position.length();

    const startTargetDir =
      controls.target.lengthSq() > 1e-6
        ? controls.target.clone().normalize()
        : startCamDir.clone();
    const startTargetRadius = controls.target.length();

    const endTargetDir = isReset ? FORWARD.clone() : target.clone().normalize();
    const endTargetRadius = isReset ? 0 : EARTH_RADIUS;
    const endCamDir = isReset ? endTargetDir.clone() : this.tiltedDirection(endTargetDir);
    const endDistance = distance;

    const qCamStart = new THREE.Quaternion().setFromUnitVectors(FORWARD, startCamDir);
    const qCamEnd = new THREE.Quaternion().setFromUnitVectors(FORWARD, endCamDir);

    const qTargetStart = new THREE.Quaternion().setFromUnitVectors(FORWARD, startTargetDir);
    const qTargetEnd = new THREE.Quaternion().setFromUnitVectors(FORWARD, endTargetDir);

    const peak =
      Math.max(startDistance, endDistance) +
      (Math.abs(endDistance - startDistance) + 2) * ARC_HEIGHT_FACTOR;

    const state = { t: 0 };
    gsap.killTweensOf(state);

    gsap.to(state, {
      t: 1,
      duration,
      ease: "power2.inOut",
      onUpdate: () => {
        if (!this.camera || !this.controls) return;

        const t = state.t;

        const camDir = FORWARD.clone().applyQuaternion(
          qCamStart.clone().slerp(qCamEnd, t)
        );
        const targetDir = FORWARD.clone().applyQuaternion(
          qTargetStart.clone().slerp(qTargetEnd, t)
        );

        const camDistance =
          (1 - t) * (1 - t) * startDistance +
          2 * (1 - t) * t * peak +
          t * t * endDistance;

        const lookAtRadius = (1 - t) * startTargetRadius + t * endTargetRadius;

        this.camera.position.copy(camDir.multiplyScalar(camDistance));
        this.controls.target.copy(targetDir.multiplyScalar(lookAtRadius));
        this.controls.update();
      },
    });
  }

  private tiltedDirection(targetDir: THREE.Vector3) {
    let north = WORLD_UP.clone().sub(
      targetDir.clone().multiplyScalar(targetDir.dot(WORLD_UP))
    );

    if (north.lengthSq() < 1e-6) {
      north = new THREE.Vector3(1, 0, 0);
    } else {
      north.normalize();
    }

    return targetDir
      .clone()
      .multiplyScalar(Math.cos(TILT_ANGLE))
      .addScaledVector(north, -Math.sin(TILT_ANGLE))
      .normalize();
  }
}

export const cameraController = new CameraController();