import React, { Component } from 'react';
import * as THREE from 'three';

class ThreeScene extends Component {

	componentDidMount() {
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
		this.camera.position.z = 5;

		this.renderer = new THREE.WebGLRenderer({ alpha: true });
		this.renderer.setSize( window.innerWidth / this.props.sizeDivisor, window.innerHeight / this.props.sizeDivisor );
		this.renderer.setClearColor( 0x483263, 1);
		this.mount.appendChild(this.renderer.domElement)

		let geometry = new THREE.IcosahedronGeometry(2.5);
		let wireframe = new THREE.WireframeGeometry( geometry );
		let material = new THREE.LineBasicMaterial( {
			color: 0xffffff,
			linewidth: 1,
			linecap: 'round', //ignored by WebGLRenderer
			linejoin:  'round' //ignored by WebGLRenderer
		} );

		this.line = new THREE.LineSegments( wireframe, material );

		this.line.material.depthTest = true;
		this.line.material.opacity = 1;
		this.line.material.transparent = true;

	  this.scene.add( this.line );

		this.material = new THREE.MeshPhongMaterial({ color: 0xffffff });

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
		this.line.rotation.x += this.props.rotation[0];
		this.line.rotation.y += this.props.rotation[1];

		this.renderScene()
 		this.frameId = window.requestAnimationFrame(this.animate)
	}

	renderScene = () => {
		this.renderer.render(this.scene, this.camera)
	}

	render() {
		return(
      <div ref={(mount) => { this.mount = mount }} className="dice" />
		)
	}
}

export default ThreeScene
