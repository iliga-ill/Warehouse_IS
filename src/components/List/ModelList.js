import { React, Component, Fragment } from "react";
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

let page = undefined
let font = null

function init(width, minWidth, spaceBetweenItems, models){
    let elmWidth = (width - (parseInt(width/minWidth)+1)*spaceBetweenItems)/parseInt(width/minWidth)

    let modelFrame = document.createElement( 'div' );
    modelFrame.width = `${elmWidth}px`;
    modelFrame.height = `${elmWidth}px`;
    modelFrame.style = {display: "inline-block", verticalAlign: "top", border: "1px solid darkgray", marginLeft:`${spaceBetweenItems}px`};

    // models.map(model=>{
    //     let frame = modelFrame.cloneNode(true)

    //     //scene
    //     const scene = new THREE.Scene();
    //     scene.background = new THREE.Color( 0xffffff );

    //     //camera
    //     let camera = new THREE.PerspectiveCamera( 45, 1, 1, 10000 );
    //     camera.position.set( elmWidth*2, elmWidth*2, elmWidth*2 );
    //     camera.lookAt( 0, 0, 0 );
    //     scene.add( camera );

    //     //model
    //     const voxel = model
    //     voxel.position.set(0, 0, 0)
    //     scene.add(voxel);

    //     //controls
    //     controls = new OrbitControls( camera, frame );
    //     controls.update()

    //     // lights
    //     scene.add( new THREE.AmbientLight( 0x606060 ) );

    //     const directionalLight = new THREE.DirectionalLight( 0xffffff );
    //     directionalLight.position.set( 1, 0.75, 0.5 ).normalize();
    //     scene.add( directionalLight );

    //     //renderer
    //     let renderer = new THREE.WebGLRenderer( { antialias: true } );
    //     renderer.setPixelRatio( window.devicePixelRatio );
    //     renderer.setSize( elmWidth, elmWidth );

    //     frame.appendChild( renderer.domElement );

    // })
}

// function render() {
//     if (renderer!=undefined)
//         renderer.render( scene, camera );
// }


class ModelList extends Component {

    constructor(props){
        super(props)
        page = this;
        this.state={
            models:props.models,
            width:props.width,
            minWidth:props.minWidth,
            spaceBetweenItems:props.spaceBetweenItems,

        }
    }

    componentDidMount(){
        var manager = new THREE.LoadingManager();
        manager.onLoad = () => { // when all resources are loaded
            init(this.state.width, this.state.minWidth, this.state.spaceBetweenItems, this.state.models)
            // render()
            // /*
            // let modelCreator = new ModelCreator()
            // model = modelCreator.createCube("Пиксель", 0x885aaa, 2, 2, 2, new THREE.Vector3(-1,-1,-1))
            // model = modelCreator.createCube("Пиксель", 0x885aaa, 1, 1, 1, new THREE.Vector3(-0.5,-0.5,-0.5))
            // model = modelCreator.createCube("Маленький товар", 0x885aaa, 16, 16, 16, new THREE.Vector3(0,8-2,0))
            // model = modelCreator.createCube("Большой товар", 0x885aaa, 30, 80, 36, new THREE.Vector3(0, (80/2-1), 0))
            // model = modelCreator.createShelter("Маленькая полка", 0x885aaa, 50, 50, 50, 5, new THREE.Vector3(0, -25, -25))
            // model = modelCreator.createShelter("Высокая полка", 0x885aaa, 50, 100, 50, 5, new THREE.Vector3(0, -25, -25))
            // model = modelCreator.createShelter("Большая полка", 0x885aaa, 150, 100, 50, 5, new THREE.Vector3(0, -25, -25))
            // model = modelCreator.createShelter("Широкая полка", 0x885aaa, 150, 50, 50, 5, new THREE.Vector3(0, -1, -25))
            // */
            // render()
        }
        let fontWeight = 'regular';
        //fontWeight = 'bold';
        let fontName = 'helvetiker' // helvetiker, optimer, gentilis, droid sans, droid serif
        var loader = new FontLoader(manager);
        loader.load('https://threejs.org/examples/fonts/droid/droid_serif_bold.typeface.json', function(response) {
            font = response;
        });
    }

    componentDidUpdate(){
        
    }

    render(){
        return (
            <div style={{width:"100%", height:"100%"}}>


            </div>
        )
    }
}

export default ModelList