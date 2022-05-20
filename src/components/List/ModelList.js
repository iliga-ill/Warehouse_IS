import { React, Component, Fragment } from "react";
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let page = undefined
let font = null
let frameInnerMargin = 10
let ModelNameHeight = 15

function init(width, minWidth, spaceBetweenItems, models){
    var listBlock = document.getElementById("listBlock")
    let elmWidth = (width - (parseInt(width/minWidth)+1)*spaceBetweenItems)/parseInt(width/minWidth)

    let modelFrame = document.createElement( 'div' );
    modelFrame.style.listStyle = "none";
    modelFrame.style.width = `${elmWidth}px`;
    modelFrame.style.height = `${elmWidth + frameInnerMargin + ModelNameHeight}px`;
    modelFrame.style.display = "inline-block";
    modelFrame.style.verticalAlign = "top";
    modelFrame.style.border = "1px solid darkgray";
    modelFrame.style.marginLeft = `${spaceBetweenItems}px`;
    modelFrame.style.marginTop = `${spaceBetweenItems}px`;
    modelFrame.style.borderRadius = `5%`;
    let canvasWrap = document.createElement( 'div' );
    canvasWrap.style.id = "canvasWrap"
    canvasWrap.style.width = `${elmWidth-frameInnerMargin*2}px`;
    canvasWrap.style.height = `${elmWidth-frameInnerMargin*2}px`;
    canvasWrap.style.margin = `${frameInnerMargin}px`;
    canvasWrap.style.border = "1px solid darkgray";
    modelFrame.appendChild(canvasWrap);
    let modelName = document.createElement( 'div' );
    modelName.style.id = "modelName"
    modelName.style.width = `${elmWidth-frameInnerMargin*2}px`;
    modelName.style.height = `${ModelNameHeight}px`;
    modelName.style.margin = `${frameInnerMargin}px`;
    modelName.style.marginTop = `-${frameInnerMargin/3}px`;
    //modelName.style.border = "1px solid darkgray";
    modelName.style.fontSize = `${ModelNameHeight}px`;
    modelName.style.alignItems = "center";
    modelFrame.appendChild(modelName);

    models.map(model=>{
        let frame = modelFrame.cloneNode(true)
        let canvasWrap = frame.firstChild
        let modelName = frame.lastChild
        
        modelName.innerHTML = `Полка id ${model.name}`;
        //scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color( 0xffffff );

        //camera
        let camera = new THREE.PerspectiveCamera( 45, 1, 1, 10000 );
        camera.position.set( Math.max(model.width, model.depth)*2, model.height, Math.max(model.width, model.depth)*2 );
        camera.lookAt( 0, model.height/2, 0 );
        scene.add( camera );

        //grid
        const gridHelper = new THREE.GridHelper( Math.max(model.width, model.depth) + model.gridBorder, Math.max(model.width, model.depth) + model.gridBorder );
        scene.add( gridHelper );

        const geometry = new THREE.PlaneGeometry( Math.max(model.width, model.depth), Math.max(model.width, model.depth) );
        geometry.rotateX( - Math.PI / 2 );

        let plane = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { visible: false } ) );
        plane.name = "Mesh"

        scene.add( plane );

        //model
        const voxel = model.mesh
        voxel.position.set(model.translation.x, model.translation.y, model.translation.z)
        scene.add(voxel);

        //controls
        let controls = new OrbitControls( camera, canvasWrap );
        controls.update()
        camera.lookAt( 0, model.height/2, 0 );

        // lights
        scene.add( new THREE.AmbientLight( 0x606060 ) );

        const directionalLight = new THREE.DirectionalLight( 0xffffff );
        directionalLight.position.set( 1, 0.75, 0.5 ).normalize();
        scene.add( directionalLight );

        //renderer
        let renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( elmWidth-frameInnerMargin*2, elmWidth-frameInnerMargin*2 );

        canvasWrap.appendChild( renderer.domElement );
        listBlock.appendChild(frame);
        renderer.render( scene, camera );

        frame.addEventListener('mousemove', ()=>{renderer.render( scene, camera );})
        frame.addEventListener('mouseover', ()=>{if (page.state.selectedModel != model) frame.style.backgroundColor="rgba(137, 196, 244, 1)"})
        frame.addEventListener('mouseout', ()=>{if (page.state.selectedModel != model) frame.style.backgroundColor="white"})
        frame.addEventListener('pointerdown', ()=>{
            if (page.state.selectedModel != model){
                frame.style.backgroundColor="rgba(137, 196, 244, 0.4)"
                if (page.state.lastFrame != undefined) {
                    page.state.lastFrame.style.backgroundColor="white"
                }
                page.state.selectedModel = model
                page.props.setModel(model)
                page.state.lastFrame = frame
            }
        })
    })
}

class ModelList extends Component {

    renderTimer=undefined

    constructor(props){
        super(props)
        page = this;
        this.state={
            models:props.models,
            width:props.width,
            minWidth:props.minWidth,
            spaceBetweenItems:props.spaceBetweenItems,
            selectedModel:undefined,
            lastFrame:undefined,
        }
    }

    //setSelectedModel = (value)=>{this.setState({isSideBlockOpened: value});}    //табы выезжающей панельки

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
            <div id="listBlock" style={{width:"100%", height:"100%"}}>


            </div>
        )
    }
}

export default ModelList