import { React, Component, Fragment } from "react";
import './StorekeeperVirtualWarehouse.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import DropdownListWithModels from "../../components/DropdownListWithModels/DropdownListWithModels";
import ModelCreator from "../../classes/ModelCreator/ModelCreator.js";
import { Vector3 } from "three";


const styles = {

  }

//ширина и длинна склада задаются в см


let warehouseSettings = {
    width:1000,
    length:1000,

}



//#region Scene settings -------------------------------------------------

//#region Variables
let camera, scene, renderer;
let plane;
let pointer, raycaster; 

let editingMod = "viewing"

let hintModel = undefined;
let model = undefined;

let lockedModels = ["Mesh", ""]

function setModel(value){
    model = value
    if (scene!=undefined) createHint();
}

let width, height;

const objects = [];

let sceneMarginTop = 0;

let lastX;
let lastY;

//#endregion

function init() {  
    sceneMarginTop = document.getElementById('toolbar').offsetTop + document.getElementById('toolbar').offsetHeight -1

    width =  window.innerWidth
    height = window.innerHeight - sceneMarginTop - 4

    camera = new THREE.PerspectiveCamera( 45, width/ height, 1, 10000 );
    camera.position.set( 500, 800, 1300 );
    // camera.lookAt( 0, 0, 0 );

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );
    //   scene.background = new THREE.Color( 0xc3d2d5 );

    //SetModel_shelder(50, 50, 50, 5);
    //SetModel_cube(40, 40, 40)

    // grid
    const gridHelper = new THREE.GridHelper( Math.max(warehouseSettings.width, warehouseSettings.length), Math.max(warehouseSettings.width, warehouseSettings.length) );
    scene.add( gridHelper );

    //Позволяет отслеживать движение и нажатие мыши
    raycaster = new THREE.Raycaster();
    pointer = new THREE.Vector2();

    const geometry = new THREE.PlaneGeometry( 10000, 10000 );
    geometry.rotateX( - Math.PI / 2 );

    plane = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { visible: false } ) );
    plane.name = "Mesh"
    scene.add( plane );

    objects.push( plane );

    // lights
    const ambientLight = new THREE.AmbientLight( 0x606060 );
    scene.add( ambientLight );

    const directionalLight = new THREE.DirectionalLight( 0xffffff );
    directionalLight.position.set( 1, 0.75, 0.5 ).normalize();
    scene.add( directionalLight );

    var factor = 0.8; // percentage of the screen
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( width, height );

    var warehouseScene = document.getElementById("warehouseScene")
    warehouseScene.appendChild( renderer.domElement );

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.update()

    document.addEventListener( 'keydown', onDocumentKeyDown );
    document.addEventListener( 'keyup', onDocumentKeyUp );
    window.addEventListener( 'resize', onWindowResize );
}

//#region Listeners -------------------------------------------------

function getScreenX(X){
    return ( X / width ) * 2 - 1
}

function getScreenY(Y){
    return -((Y - sceneMarginTop) / height) * 2 + 1 
}

function onPointerDown( event ) {
    pointer.set(getScreenX(event.clientX), getScreenY(event.clientY));
    raycaster.setFromCamera( pointer, camera );
    const intersects = raycaster.intersectObjects( objects );
    
    if (intersects.length > 0) {
        const intersect = intersects[0];
        //event.button === 2
        if (editingMod == "deleting" && !lockedModels.includes(intersect.object.name)) {
            if ( intersect.object !== plane ) {
                scene.remove( intersect.object );
                objects.splice( objects.indexOf( intersect.object ), 1 );
            }
        }
        
        if (editingMod == "adding") {        
            const voxel = new THREE.Mesh(model.geometry, model.material)
            voxel.position.copy( intersect.point ).add( intersect.face.normal );
            voxel.position.divideScalar( 1 ).floor().multiplyScalar( 1 ).addScalar( 1 );
            voxel.position.set(
                voxel.position.x + model.translation.x, 
                voxel.position.y + model.translation.y, 
                voxel.position.z + model.translation.z)
            voxel.name = model.name;
            scene.add( voxel );
            objects.push( voxel );
        }

        render();
    }
}

function createHint(){
    if (hintModel != undefined) {
        scene.remove(hintModel.mesh)
        hintModel = undefined
    }
    

    if (editingMod == "adding") {
        hintModel = {
            name: "Hint", 
            modelName: "Hint",
            material: new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } ), 
            geometry: model.geometry, 
            mesh: new THREE.Mesh( 
                model.geometry, 
                new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } )
            ), 
            translation: model.translation,
        }
        hintModel.mesh.visible = false
        scene.add( hintModel.mesh );
    }
    if (editingMod == "deleting") {
        pointer.set(getScreenX(lastX), getScreenY(lastY));
        raycaster.setFromCamera( pointer, camera );
        const intersects = raycaster.intersectObjects( objects );
        const intersect = intersects[0];

        if (intersect != undefined && !lockedModels.includes(intersect.object.name)) {
            console.log(intersect)
            hintModel = {
                name: "Hint", 
                modelName: "Hint",
                material: new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } ), 
                geometry: intersect.object.geometry, 
                mesh: new THREE.Mesh( 
                    intersect.object.geometry, 
                    new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } )
                ), 
                translation: new Vector3(0,0,0),
            }
            hintModel.mesh.visible = false
            scene.add( hintModel.mesh );
        }
    }
    animateHint()
}

function animateHint() {
    pointer.set(getScreenX(lastX), getScreenY(lastY));
    raycaster.setFromCamera( pointer, camera );
    const intersects = raycaster.intersectObjects( objects );
    const intersect = intersects[0];
    console.log(editingMod)
    if (intersect!=undefined && hintModel != undefined && editingMod != "viewing") {
        //hintMesh.visible = true;
        
        
        hintModel.mesh.position.copy( intersect.point ).add( intersect.face.normal );
        hintModel.mesh.position.divideScalar(1).floor().multiplyScalar(1).addScalar( 1 );
        if (editingMod == "adding"){
            hintModel.mesh.position.set(
                hintModel.mesh.position.x + hintModel.translation.x, 
                hintModel.mesh.position.y + hintModel.translation.y, 
                hintModel.mesh.position.z + hintModel.translation.z
            )
        }
        if (editingMod == "deleting"){
            hintModel.mesh.position.set(
                intersect.object.position.x, 
                intersect.object.position.y, 
                intersect.object.position.z
            )
        }
        hintModel.mesh.visible = true
        scene.add( hintModel.mesh );
    } 
    render();
}

function setModelOnCoordinates(coordinates, model){
    const voxel = new THREE.Mesh( model.geometry, model.material);
    voxel.position.divideScalar( 1 ).floor().multiplyScalar( 1 ).addScalar( 1 );
    voxel.position.set(coordinates.x + model.translation.x, coordinates.y + model.translation.y, coordinates.z + model.translation.z)
    voxel.name = model.name;
    scene.add( voxel );
    objects.push( voxel );
}

//#region Controls
let isShiftDown = false
let isCtrlDown = false

function onDocumentKeyDown( event ) {
    switch ( event.keyCode ) {
        case 16: isShiftDown = true; changeEditingMod(); createHint(); break;
        case 17: isCtrlDown = true; changeEditingMod(); createHint(); break;
    }
}

function onDocumentKeyUp( event ) {
    switch ( event.keyCode ) {
        case 16: isShiftDown = false; changeEditingMod(); createHint(); break;
        case 17: isCtrlDown = false; changeEditingMod(); createHint(); break;
    }
}

function changeEditingMod(){
    if (!isShiftDown && !isCtrlDown || isShiftDown && isCtrlDown) editingMod = "viewing"
    else if (isShiftDown && !isCtrlDown) editingMod = "adding"
    else if (!isShiftDown && isCtrlDown) editingMod = "deleting"
}

//#endregion

function onWindowResize() {
    width =  window.innerWidth
    height = window.innerHeight - sceneMarginTop - 4

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize( width, height);
}

function onPointerMove(event) {
    lastX = event.clientX;
    lastY = event.clientY;
    animateHint();
}

//#endregion

//#region Render -------------------------------------------------
    function render() {
        renderer.render( scene, camera );
    }
//#endregion

/* Зона бесполезного кода

  function setCorrectTranslation(intersect, ObjName) {
      console.log("Clicked obj: " + intersect.object.name + "; Placed obj: " + ObjName)

      switch(String(intersect.object.name)){
          case "Shelter": switch(ObjName){ 
                  case "Cube": switch(intersect.faceIndex){ 
                      case (31||25||27||29): SetModel_cube(30, 30, 30, 0, -5, 0); break;
                      default: SetModel_cube(40, 40, 40, 0, -5, 0); break;
                  }break;
                  case "Shelter": switch(intersect.faceIndex){  
                      default: SetModel_shelter(50, 50, 50, 5, 0, -25, -25); break;
                  }break;
          }break;

          case "Cube": switch(ObjName){ 
                  case "Cube": switch(intersect.faceIndex){ 
                      case 5: SetModel_cube(40, 40, 40, 0, -15, 0); break;
                      default: SetModel_cube(40, 40, 40, 0, -5, 0); break;
                  }break;
                  case "Shelter": switch(intersect.faceIndex){  
                      default: break;
                  }break;
          }break;

          case "Mesh": switch(ObjName){ 
                  default: SetModel_shelter(50, 50, 50, 5, 0, -25, -25); break;
          }break;

          default: SetModel_cube(40, 40, 40, 0, -5, 0); break;
      }
  }

  */
 //#endregion
  
  function warehouseGeneration(warehouseSettings){
    let color = 0x885aaa
        
    let floor = {
        name: "Floor", 
        material: new THREE.MeshLambertMaterial( { color: color}), 
        geometry: new THREE.BoxBufferGeometry(warehouseSettings.length, 4, warehouseSettings.width), 
        translation: new Vector3(0,-2,0),
    }
    lockedModels.push("Floor")
    setModelOnCoordinates(new Vector3(0,0,0), floor)
  }

  

class StorekeeperVirtualWarehouse extends Component {

    componentDidMount(){
        init()
        render()
        let modelCreator = new ModelCreator()

        model = modelCreator.createCube("Маленький товар", 0x885aaa, 16, 16, 16, new THREE.Vector3(0,8-2,0))
        //model = modelCreator.createCube("Большой товар", 0x885aaa, 30, 80, 36, new THREE.Vector3(0, (80/2-1), 0))
        // model = modelCreator.createShelter("Маленькая полка", 0x885aaa, 50, 50, 50, 5, new THREE.Vector3(0, -25, -25))
        // model = modelCreator.createShelter("Высокая полка", 0x885aaa, 50, 100, 50, 5, new THREE.Vector3(0, -25, -25))
        // model = modelCreator.createShelter("Большая полка", 0x885aaa, 150, 100, 50, 5, new THREE.Vector3(0, -25, -25))
        // model = modelCreator.createShelter("Широкая полка", 0x885aaa, 150, 50, 50, 5, new THREE.Vector3(0, -1, -25))
        createHint()
        warehouseGeneration(warehouseSettings)
    }

    render(){
        return (
            <>
                <div id="toolbar" style={{display: "table"}}>
                    <div style={{display: "table-cell", height: "auto"}}>
                        <strong>click</strong>: add voxel, <br/>
                        <strong>shift + click</strong>: remove voxel
                    </div>

                    <div style={{display: "table-cell", width: "auto", height: "auto", verticalAlign: "middle"}}>
                        <button id="btn_models" type="button" className="collapsible" style={{width: "80px", height: "28px"}}>Модели</button>
                    </div>
                </div>

                <div id="warehouseScene"
                    onPointerMove={onPointerMove}
                    onPointerDown={onPointerDown}
                />

                <DropdownListWithModels setModel={setModel}/>
                
        </>
        )
    }
}

export default StorekeeperVirtualWarehouse