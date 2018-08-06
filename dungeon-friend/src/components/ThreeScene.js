import React, { Component } from 'react';
import * as THREE from 'three';



class ThreeScene extends Component {
	componentDidMount() {
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
		this.camera.position.z = 5;

		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize( window.innerWidth / 4, window.innerHeight / 4 );
		this.mount.appendChild(this.renderer.domElement)

		let geometry = new THREE.IcosahedronGeometry(2.5);
		let wireframe = new THREE.WireframeGeometry( geometry );
		let material = new THREE.LineBasicMaterial( {
			color: 0x222222,
			linewidth: 1,
			linecap: 'round', //ignored by WebGLRenderer
			linejoin:  'round' //ignored by WebGLRenderer
		} );

		this.line = new THREE.LineSegments( wireframe, material );

		this.line.material.depthTest = true;
		this.line.material.opacity = 1;
		this.line.material.transparent = true;

		this.scene.add( this.line );

		// this.material = new THREE.MeshPhongMaterial({ color: 0x000000 });
		// this.iso = new THREE.Mesh( geometry, this.material );
		// this.scene.add( this.iso );
		//
		// this.spotLight = new THREE.SpotLight( 0xffffff,1 );
		// this.spotLight.position.set( 0, 0, 10 );
		// this.scene.add( this.spotLight );

		this.start()
	}

	componentWillUnmount() {
		this.stop()
		this.mount.removeChild(this.renderer.domElement)
	}

	start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

	stop = () => {
    cancelAnimationFrame(this.frameId)
  }

	animate = () => {
		// this.iso.rotation.x += 0.008;
		// this.iso.rotation.y += 0.008;
		this.line.rotation.x += 0.008;
		this.line.rotation.y += 0.008;



		this.renderScene()
 		this.frameId = window.requestAnimationFrame(this.animate)
	}

	renderScene = () => {
		this.renderer.render(this.scene, this.camera)
	}

	render() {
		return(
      <div ref={(mount) => { this.mount = mount }} className="dice"/>
		)
	}
}

export default ThreeScene
