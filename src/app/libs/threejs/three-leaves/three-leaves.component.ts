import {Component, ElementRef, Input, NgZone, OnInit, ViewChild} from '@angular/core';
import * as THREE from "three";
import WEBGL from "three/examples/jsm/capabilities/WebGL";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

interface Particle { object: THREE.Group, rotationSpeed: THREE.Euler, direction: THREE.Vector3, spawnTime: number }

@Component({
  selector: 'app-three-leaves',
  templateUrl: './three-leaves.component.html',
  styleUrls: ['./three-leaves.component.scss']
})
export class ThreeLeavesComponent implements OnInit {

  @ViewChild('rendererCanvas', {static: true})
  public rendererCanvas!: ElementRef<HTMLCanvasElement>;

  @Input() shouldAnimate: boolean = false;

  constructor(
    private ngZone: NgZone
  ) {
  }

  ngOnInit(): void {
    this.createScene(this.rendererCanvas)
      .then(() => {
        if (this.hasWebGlSupport()) {
          this.animate();
        } else {
          console.log('WEBGL is being lacked!');
        }
      })
  }

  private canvas!: HTMLCanvasElement;
  private renderer!: THREE.WebGLRenderer;
  private camera!: THREE.PerspectiveCamera;
  private scene!: THREE.Scene;
  private light!: THREE.AmbientLight;

  private frameId!: number;

  private leaves: THREE.Group[] = [];

  private particles: Particle[] = [];

  public ngOnDestroy(): void {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
    }
  }

  private async createScene(canvas: ElementRef<HTMLCanvasElement>): Promise<void> {

      // The first step is to get the reference of the canvas element from our HTML document
      this.canvas = canvas.nativeElement;

      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true, // smooth edges
        alpha: true // transparent background of canvas
      });

      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight;

      this.renderer.setSize(window.innerWidth, window.innerHeight);

      // create the group
      this.scene = new THREE.Scene();
      // this.scene.background = new THREE.Color(255, 255, 255);

      this.camera = new THREE.PerspectiveCamera(
        75, this.canvas.width / this.canvas.height, 0.1, 1000
      );

      this.camera.position.z = 10;
      this.scene.add(this.camera);

      // soft white light
      this.light = new THREE.AmbientLight(0xFFFFFF);
      this.scene.add(this.light);

      // For Testing Purposes Only - GreenBox
      // const geometry = new THREE.BoxGeometry( this.getWorldSize().width, 1, 0 );
      // const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
      // const cube = new THREE.Mesh( geometry, material );
      // this.scene.add( cube );


      Promise.all([
        this.loadModel("leaf1.glb"),
        this.loadModel("leaf2.glb"),
        this.loadModel("leaf3.glb"),
        this.loadModel("leaf4.glb")])
      .then((leaves: THREE.Group[]) => {
        this.leaves = leaves;
        this.spawn()
      })
  }

  // Gets the THREE.JS world size in THREE units
  private getWorldSize(): {width: number, height: number} {
    let vFOV = THREE.MathUtils.degToRad( this.camera.fov ); // convert vertical fov to radians
    let worldHeight = 2 * Math.tan( vFOV / 2 ) * this.camera.position.z; // visible height
    let worldWidth = worldHeight * this.camera.aspect;           // visible width

    return {width: worldWidth, height: worldHeight};
  }

  private loadModel(name: string) : Promise<THREE.Group> {
    return new Promise<THREE.Group>((resolve, _) => {
      const gltfLoader = new GLTFLoader();
      gltfLoader.load(`assets/models/${name}`, (gltf) => {
        resolve(gltf.scene);
      });
    });
  }

  private spawn(): void {
    if (this.leaves.length === 0) {
      return;
    }

    for (let i = 0; i < 100; i++) {
      let leaf = this.leaves[Math.floor(Math.random()*this.leaves.length)].clone();

      leaf.scale.set(1,1,1);
      let worldSize = this.getWorldSize();
      leaf.position.set(worldSize.width / 2, worldSize.height / 2, 0);

      let rotSpeedX = (Math.random() - 0.5) * 0.05
      let rotSpeedY = (Math.random() - 0.5) * 0.05
      let rotSpeedZ = (Math.random() - 0.5) * 0.05

      let direction = new THREE.Vector3(-0.1, -0.1, 0);

      let rotation: THREE.Euler = new THREE.Euler(rotSpeedX, rotSpeedY, rotSpeedZ);
      let particle = {object: leaf, rotationSpeed: rotation, direction: direction, spawnTime: new Date().getTime()};
      this.particles.push(particle);
      this.scene.add(leaf);
    }

    // animation is basically pre-ran so leaves don't just pop out of nowhere
    let preFrames = 60;
    for (let i = 0; i < preFrames; i++) {
      this.particles.forEach(p => {
        this.animateParticle(p)
      })
    }
  }

  private animateParticle(p: Particle):void{
    p.object.translateX(p.direction.x);
    p.object.translateY(p.direction.y);
    p.object.translateZ(p.direction.z);

    // let pX = p.object.position.x;
    // let pY = p.object.position.y;
    // let pZ = p.object.position.z;

    // console.log([pX, pY,pZ])

    let x = p.object.rotation.x + p.rotationSpeed.x
    let y = p.object.rotation.y + p.rotationSpeed.y
    let z = p.object.rotation.z + p.rotationSpeed.z;

    p.object.rotation.set(x,y,z);
  }

  private animate(): void {
    // We have to run this outside angular zones,
    // because it could trigger heavy changeDetection cycles.
    this.ngZone.runOutsideAngular(() => {
      if (document.readyState !== 'loading') {
        this.renderLoop();
      } else {
        window.addEventListener('DOMContentLoaded', () => {
          this.renderLoop();
        });
      }
    });
  }

  private animateParticleAppear(p: Particle, currentTime: number): void {
    const scaleAnimDuration = 5000;
    const opacityAnimDuration = 3000;
    let lifetimeMs = currentTime - p.spawnTime;
    if(lifetimeMs < scaleAnimDuration)
    {
      let scale = THREE.MathUtils.lerp(0, 1, lifetimeMs / scaleAnimDuration);
      p.object.scale.set(scale, scale, scale)
    }
    else {
      p.object.scale.set(1, 1, 1)
    }
    if(lifetimeMs < opacityAnimDuration){
      let opacity = THREE.MathUtils.lerp(0, 1, lifetimeMs / opacityAnimDuration);
      p.object.children.forEach(x => {
        // @ts-ignore
        x.material.opacity = opacity
      })
    }
    else{
      p.object.children.forEach(x => {
        // @ts-ignore
        x.material.opacity = 1
      })
    }
  }

  private animateParticleTooCloseToCamera(p: Particle): void {
    let distanceToCamera = p.object.position.distanceTo(this.camera.position)
    let minDistanceToCameraToStartFade = 20;
    if(distanceToCamera < minDistanceToCameraToStartFade){
      p.object.children.forEach(x => {
        // @ts-ignore
        x.material.opacity = THREE.MathUtils.lerp(0, 1, distanceToCamera / minDistanceToCameraToStartFade);
      })
    }
  }

  public renderLoop(): void {
    this.frameId = requestAnimationFrame(() => this.renderLoop());
    let currentTime = new Date().getTime()

    this.particles.forEach(p => {
      this.animateParticleAppear(p, currentTime)

      this.animateParticle(p)

      this.animateParticleTooCloseToCamera(p);
    });
    this.renderer.render(this.scene, this.camera);
  }

  public onWindowResize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  hasWebGlSupport(): boolean {
    return WEBGL.isWebGLAvailable();
  }
}
