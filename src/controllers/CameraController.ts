import * as THREE from "three";
import type { OrbitControls } from "three-stdlib";
import gsap from "gsap";

class CameraController {
  private camera: THREE.PerspectiveCamera | null = null;
  private controls: OrbitControls | null = null;

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

  flyTo(target: THREE.Vector3) {
    if (!this.camera || !this.controls) return;

    const destination = target
    .clone()
    .normalize()
    .multiplyScalar(5);
  
    destination.x += 0.6;
    destination.y += 0.3;

    gsap.killTweensOf(this.camera.position);
    gsap.killTweensOf(this.controls.target);

    gsap.to(this.camera.position, {
      x: destination.x,
      y: destination.y,
      z: destination.z,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        this.controls?.update();
      },
    });

    gsap.to(this.controls.target, {
      x: target.x,
      y: target.y,
      z: target.z,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        this.controls?.update();
      },
    });
  }

  reset() {
    if (!this.camera || !this.controls) return;

    gsap.killTweensOf(this.camera.position);
    gsap.killTweensOf(this.controls.target);

    gsap.to(this.camera.position, {
      x: 0,
      y: 0,
      z: 6,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        this.controls?.update();
      },
    });

    gsap.to(this.controls.target, {
      x: 0,
      y: 0,
      z: 0,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        this.controls?.update();
      },
    });
  }
}

export const cameraController = new CameraController();