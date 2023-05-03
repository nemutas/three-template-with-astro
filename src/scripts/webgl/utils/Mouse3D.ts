import * as THREE from 'three'
import { gl } from '../core/WebGL'

class Mouse3D {
  private ray = new THREE.Ray()
  private mouse = new THREE.Vector2(0, 0)

  constructor() {
    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('touchmove', this.handleTouchMove)
  }

  get position() {
    gl.camera.updateMatrixWorld()
    this.ray.origin.setFromMatrixPosition(gl.camera.matrixWorld)
    this.ray.direction.set(this.mouse.x, this.mouse.y, 0.5).unproject(gl.camera).sub(this.ray.origin).normalize()
    const distance = this.ray.origin.length() / Math.cos(Math.PI - this.ray.direction.angleTo(this.ray.origin))
    this.ray.origin.add(this.ray.direction.multiplyScalar(distance * 1.0))
    return this.ray.origin
  }

  private handleMouseMove = (e: MouseEvent) => {
    this.mouse.x = ((e.pageX - window.scrollX) / window.innerWidth) * 2 - 1
    this.mouse.y = -((e.pageY - window.scrollY) / window.innerHeight) * 2 + 1
  }

  private handleTouchMove = (e: TouchEvent) => {
    const { pageX, pageY } = e.touches[0]
    this.mouse.x = ((pageX - window.scrollX) / window.innerWidth) * 2 - 1
    this.mouse.y = -((pageY - window.scrollY) / window.innerHeight) * 2 + 1
  }

  dispose = () => {
    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('touchmove', this.handleTouchMove)
  }
}

export const mouse3d = new Mouse3D()
