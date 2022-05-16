import { React, Component, Fragment } from "react";
import './DropdownListWithModels.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import ModelCreator from "../../classes/ModelCreator.js";

    
    //#region Dropdown list -------------------------------------------------
    let dropdownListWidth; 
    let dropdownListHeight;
    
    let focusedScene;
    let canvas;
    
    let lastFocusedDiv;
    
    let objectsList = [];
    
    const scenes = [];
    const renderers = []
    const lights = []

    class DropdownListWithModels extends Component {

        dropdownListInit(){
            dropdownListWidth = window.innerWidth/100 * (30)
            dropdownListHeight = window.innerHeight 
        
            const content = document.getElementById( 'content' );
        
            for ( let i = 0; i < objectsList.length; i ++ ) {
        
                const scene = new THREE.Scene();
        
                // make a list item
                const element = document.createElement( 'div' );
                element.width = 400;
                element.height = 400;
                element.className = 'list-item';
                element.id = 'warehouseScene-div';
        
                if (i == 0) {
                    lastFocusedDiv = element 
                    lastFocusedDiv.style.background = 'bisque'
                    this.onPointerDown2(scene, 0, objectsList[i], element)
                }
                
                // the element that represents the area we want to render the scene
        
                const canvas = document.createElement('canvas')
                canvas.className = 'c';
                canvas.width = 200;
                canvas.height = 200;
                element.appendChild(canvas)
        
                const descriptionElement = document.createElement( 'div' );
                descriptionElement.innerText = `${objectsList[i].CommodityName}`;
                element.appendChild( descriptionElement );
        
                content.appendChild( element );
        
                const geometry = objectsList[i].geometry;
                const material = objectsList[i].material;
        
                const voxel = new THREE.Mesh( geometry, material);
                //console.log("Pos: " + voxel.position.x + ";" + voxel.position.y + ";" + voxel.position.z )
        
                voxel.position.set(voxel.position.x, voxel.position.y, voxel.position.z)
        
                const camera = new THREE.PerspectiveCamera();
                camera.position.z = 150;
                camera.position.x = 1;
                camera.position.y = 1; 
                camera.depth = 1000;
        
                scene.userData.camera = camera;
        
                const controls = new OrbitControls( scene.userData.camera, canvas );
                controls.minDistance = 0;
                controls.maxDistance = 1000;
                controls.enablePan = false;
                controls.enableZoom = true;
                scene.userData.controls = controls;
        
                scene.add(voxel);
                
                scene.add( new THREE.HemisphereLight( 0xaaaaaa, 0x444444 ) );
        
                let light = new THREE.PointLight( 0xffffff, 0.5 );
                light.position.set( 5, 10, 5 ).normalize();
                scene.add( camera );
                scene.userData.camera.add(light)
                console.log(scene)
                
                lights.push(light)
                scenes.push(scene);
                
                let dropdownListRenderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );
                dropdownListRenderer.setClearColor( 0xffffff, 1 );
                dropdownListRenderer.setPixelRatio( window.devicePixelRatio );
        
                renderers.push(dropdownListRenderer)
        
                canvas.addEventListener( 'pointerdown', ()=>{this.onPointerDown2(scene, i, element)});
            }
        
            document.addEventListener( 'pointerup', ()=>{this.onPointerUp2()});
        
            var body = document.getElementById('content')
            var btn = document.getElementById('btn_models')
        
            btn.addEventListener('pointerdown', ()=>{this.onPointerUp3(body)})
            //window.addEventListener( 'resize', this.onDropdownListWindowResize() );
        }
        
        onPointerDown2(scene, num, element){
            focusedScene = num
    
            lastFocusedDiv.style.background = 'transparent'
        //   element.style.background = 'bisque'
            lastFocusedDiv = element
            
            this.props.setModel(objectsList[num])
        }
        
        onPointerUp2(){ 
            focusedScene = -1
        }
        
        //#region DropdownListRender -------------------------------------------------
        dropdownListRender() {
        
            //canvas.style.transform = `translateY(${window.scrollY}px)`;
            var iter = 0;
            // console.log(renderers)
            scenes.forEach( function ( scene ) {
        
                renderers[iter].setClearColor( 0xffffff ); // Задний фон правого блока
                renderers[iter].setScissorTest( false );
                renderers[iter].clear();
        
                renderers[iter].setClearColor( 0xe0e0e0 );
                renderers[iter].setScissorTest( true );
        
                // so something moves
                if (iter != focusedScene) scene.children[ 0 ].rotation.y =  scene.children[ 0 ].rotation.y + 0.01;
        
                // get the element that is a place holder for where we want to
                
                // get its position relative to the page's viewport
        
        
                // const rect = new DOMRect(ref.clientX, ref.clientY, ref.width, ref.height);
                ////console.log(toString(rect))
                            // check if it's offscreen. If so skip it
                            // if ( rect.bottom < 0 || rect.top > renderer.domElement.clientHeight ||
                            //      rect.right < 0 || rect.left > renderer.domElement.clientWidth ) {
                            //     console.log("ClientWidth = " + renderer.domElement.clientWidth)
                            //     return; // it's off screen
        
                            // }
                //const ref = document.getElementById( 'warehouseScene' )
                // set the viewport
                const dropdownListWidth = 200;
                const dropdownListHeight = 200;
                const left = 0;
                const bottom = 0;
        
                renderers[iter].setViewport( left, bottom, dropdownListWidth, dropdownListHeight );
                renderers[iter].setScissor( left, bottom, dropdownListWidth, dropdownListHeight );
        
                const camera = scene.userData.camera;
        
                //camera.aspect = width / height; // not changing in this example
                //camera.updateProjectionMatrix();
        
                //scene.userData.controls.update();
                //console.log(renderer)
                renderers[iter].render( scene, camera );
                iter++
            });
        }
        //#endregion
        
        onDropdownListWindowResize() {
            if (document.getElementById('modelsList').offsetWidth <= 650) {
                dropdownListWidth = 400
                dropdownListHeight = 400
            }
            else {
                dropdownListWidth = 200
                dropdownListHeight = 200
            }
    
            // renderers.forEach( function ( render ){
            //     // const width = canvas.clientWidth;
            //     // const height = canvas.clientHeight;
            //     render.setViewport( 0, 0, dropdownListWidth, height2 );
            //     render.setScissor( 0, 0, dropdownListWidth, height2 );
            //     render.setSize( dropdownListWidth, height2 );
            //     console.log(render.width)
            // }) 
            
            // scenes.forEach( function (scene){
                
            // })
        }
    
        dropdownListAnimate() {
            var iter = 0;
            lights.forEach( function (light) {
                light.position.copy( scenes[iter].userData.camera.position );
                iter++;
            })
    
            //render();
            //requestAnimationFrame( this.dropdownListAnimate() );
        }  
    
        // render() {
        //     renderer.render( scene, camera );
        // }
          
        onPointerUp3(body){
    
            if (body.style.display == "") {
                body.style.display = "block"
                var warehouseScene = document.getElementById('warehouseScene')
                //console.log(warehouseScene.style.height)
                body.style = {display:"block", height:"500px"}
                // console.log(warehouseScene.style.height)
                // console.log(body.style.height)
            }else {
                body.style.display = ""
            }
    
        }
        
        //#endregion
        
        fillObjects(){
            let modelCreator = new ModelCreator()
            objectsList[0] = modelCreator.createCube("Маленький товар", 0x885aaa, 30, 30, 30, new THREE.Vector3(0, -5, 0))
            objectsList[1] = modelCreator.createCube("Большой товар", 0x885aaa, 35, 80, 35, new THREE.Vector3(0, -5, 0))
            objectsList[2] = modelCreator.createShelter("Маленькая полка", 0x885aaa, 50, 50, 50, 5, new THREE.Vector3(0, 0, 0))
            objectsList[3] = modelCreator.createShelter("Высокая полка", 0x885aaa, 50, 100, 50, 5, new THREE.Vector3(0, 0, 0))
            objectsList[4] = modelCreator.createShelter("Большая полка", 0x885aaa, 150, 100, 50, 5, new THREE.Vector3(0, 0, 0))
            objectsList[5] = modelCreator.createShelter("Широкая полка", 0x885aaa, 150, 50, 50, 5, new THREE.Vector3(0, 0, 0))
        }

        constructor(props){
            super();
            super.constructor(props);
            this.props = props
            // let modelCreator = new ModelCreator()
            // props.setModel(modelCreator.createShelter("Маленькая полка", 0x885aaa, 50, 50, 50, 5, new THREE.Vector3(0, 0, 0)))

            
        }

        componentDidMount(){
            this.fillObjects()
            this.dropdownListInit()
            this.dropdownListRender()
            this.dropdownListAnimate()
        }

        render(){
            return (
                <div id="modelsList">
                    <div id="content"></div>
                </div>
            )
        }
    }

    export default DropdownListWithModels
