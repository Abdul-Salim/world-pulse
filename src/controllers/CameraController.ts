import * as THREE from "three";
import type { OrbitControls } from "three-stdlib";
import gsap from "gsap";

import { latLngToVector } from "@/utils/latLngToVector";

interface FlyToOptions {
  distance?: number;
  duration?: number;
}

const FORWARD = new THREE.Vector3(0, 0, 1);
const ORIGIN = new THREE.Vector3(0, 0, 0);

class CameraController {
  private camera: THREE.PerspectiveCamera | null = null;
  private controls: OrbitControls | null = null;
  private currentTween: gsap.core.Tween | null = null;
  private restoreClamps: (() => void) | null = null;

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

  /**
   * Enable/disable OrbitControls. Mutates the instance held on this class
   * (set via registerControls), never a value obtained from a hook — those
   * are deep-frozen in dev by React Compiler and throw on mutation.
   */
  setControlsEnabled(enabled: boolean) {
    if (!this.controls) return;
    this.controls.enabled = enabled;
  }

  /** Lerp controls.target toward `point` by `alpha`. Same rationale as above. */
  lerpControlsTarget(point: THREE.Vector3, alpha: number) {
    if (!this.controls) return;
    this.controls.target.lerp(point, alpha);
    this.controls.update();
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

    // Kill any in-flight tween first, and put its clamps back, so we never
    // capture the relaxed values below and restore them permanently.
    this.currentTween?.kill();
    this.restoreClamps?.();
    this.restoreClamps = null;

    // The target may be sitting on a satellite (follow mode) rather than at
    // the origin. Snapping it home would whip the camera round in one frame,
    // so interpolate it alongside the position.
    const startTarget = controls.target.clone();

    // While the target is off-origin, OrbitControls' min/maxDistance are
    // measured against it and would clamp mid-tween. Relax them until done.
    const minDistance = controls.minDistance;
    const maxDistance = controls.maxDistance;
    controls.minDistance = 0;
    controls.maxDistance = Infinity;

    const restore = () => {
      controls.minDistance = minDistance;
      controls.maxDistance = maxDistance;
      this.restoreClamps = null;
    };

    this.restoreClamps = restore;

    const state = { t: 0 };

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
        this.controls.target.lerpVectors(startTarget, ORIGIN, t);
        this.controls.update();
      },
      onComplete: () => {
        restore();
        controls.target.set(0, 0, 0);
        controls.update();
        this.currentTween = null;
      },
      onInterrupt: restore,
    });
  }
}

export const cameraController = new CameraController();