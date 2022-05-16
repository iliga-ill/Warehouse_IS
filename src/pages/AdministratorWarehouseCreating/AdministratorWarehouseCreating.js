import { React, Component, Fragment } from "react";
import './AdministratorWarehouseCreating.css';
import * as THREE from 'three';
import { MapControls, OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import SideBlock from "../../components/SideBlock/SideBlock";
import UniversalTabHolder from '../../components/TabHolders/UniversalTabHolder/UniversalTabHolder';
import { TableComponent } from "../../components/Table/TableComponent";
import InputText from "../../components/InputText/InputText";
import ExpandListInputRegular from "../../components/ExpandListInput/ExpandListInputRegular/ExpandListInputRegular";
import AlertMessagebox from "../../components/Messagebox/AlertMessagebox.js";
import ModelList from "../../components/List/ModelList";

import DropdownListWithModels from "../../components/DropdownListWithModels/DropdownListWithModels";
import ModelCreator from "../../classes/ModelCreator.js";
import Colors from "../../classes/Colors.js";
import { MOUSE, Vector2, Vector3 } from "three";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

import AuxiliaryMath from "../../classes/AuxiliaryMath.js";
import WarehouseSettingsModel from "../../classes/WarehouseSettingsModel.js";
import FirstPersonControls from "../../classes/FirstPersonControls.js";
import zIndex from "@material-ui/core/styles/zIndex";


const styles = {

  }

let modelCreator = new ModelCreator()
let colors = new Colors()
let auxMath = new AuxiliaryMath()

let warehouseSettingsModel = new WarehouseSettingsModel()

let page



//#region Scene settings -------------------------------------------------

//#region Variables

const clock = new THREE.Clock();
let font = null

//is mouse button pressed
let mouseLeftButton = false
let mouseRightButton = false

//mouse last x and y
let lastX;
let lastY;


//scene variables
let width, height;
let sceneMarginTop = 0;

let camera, scene, renderer;
let plane;
let pointer, raycaster; 

//let editingMod = "viewing" //viewing, adding, deleting /change mode of interacting with models

let selectionLockedModels = [""] //models locked for selecting them
let hintLockedModels = [""] //models locked for creating hint fore them

let hintModel = undefined; //currently placed hint model
let zoneHintMesh = undefined; //currently placed hint model
let rackHintMesh = undefined; //currently placed hint model


let viewMod = "observasion" //observasion, first-person /change mode of viewing
let controls

let player = {
    height: 70,
    turnSpeed: 0.2,
    speed: 10,
    jumpHeight: .2,
    gravity: 0,
    velocity: 0,
    jump:false
  }; //characteristics of first-person viewMod

//first-person view mod variables
let onPointerDownMouseX = 0
let onPointerDownMouseY = 0
let lon = 0
let lat = 0
let onPointerDownLon = 0
let onPointerDownLat = 0
let phi = 0
let theta = 0
let lookedPoint

//#endregion

function init(warehouseSettings) { 
    sceneMarginTop = document.getElementById('toolbar').offsetTop + document.getElementById('toolbar').offsetHeight -1
    width =  window.innerWidth
    height = window.innerHeight - sceneMarginTop - 4

    raycaster = new THREE.Raycaster();
    pointer = new THREE.Vector2();

    //scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );

    const geometry = new THREE.PlaneGeometry( 10000, 10000 );
    geometry.rotateX( - Math.PI / 2 );

    plane = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { visible: false } ) );
    plane.name = "Mesh"
    selectionLockedModels.push("Mesh")
    hintLockedModels.push("Mesh")
    scene.add( plane );

    // lights
    const ambientLight = new THREE.AmbientLight( 0x606060 );
    scene.add( ambientLight );

    const directionalLight = new THREE.DirectionalLight( 0xffffff );
    directionalLight.position.set( 1, 0.75, 0.5 ).normalize();
    scene.add( directionalLight );

    //renderer
    var factor = 0.8; // percentage of the screen
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( width, height );

    setObservationViewMod()

    //addingSceneOnScreen
    var warehouseScene = document.getElementById("warehouseScene")
    warehouseScene.appendChild( renderer.domElement );

    //setListeners
    setListeners()
}

function render() {
    if (viewMod == "first-person" && mouseRightButton) {
        lon += 0.1;
        updatelookedPoint()
        camera.lookAt(lookedPoint);
    }
    if (renderer!=undefined)
        renderer.render( scene, camera );
}


function getScreenX(X){
    return ( X / width ) * 2 - 1
}

function getScreenY(Y){
    return -((Y - sceneMarginTop) / height) * 2 + 1 
}

//#region Listeners 

function setListeners(){
    var warehouseScene = document.getElementById("warehouseScene")

    //listenets for saving mouse button
    warehouseScene.addEventListener('mousedown', onMouseDown)
    warehouseScene.addEventListener('mouseup', onMouseUp)

    //connecting key listeners when mouse over scene
    warehouseScene.addEventListener('mouseover', connectKeyListeners)
    warehouseScene.addEventListener('mouseout', disconnectKeyListeners)

    //listener for resizing
    window.addEventListener( 'resize', onWindowResize );

    //listener for saving mouse coordinates and animating model hint
    warehouseScene.addEventListener('pointermove', onPointerMove)

    //listener for creating a model on click
    warehouseScene.addEventListener('pointerdown', onPointerDown)

    //listener for flicking view mod
    warehouseScene.addEventListener( 'mousemove', onMouseMoveControls );
    warehouseScene.addEventListener( 'wheel', onSceneMouseWheel );

    //panel testing
    //btnPanel.addEventListener('pointerup', onPanel)
}

function connectKeyListeners(){
//listener for shift and ctrl and creating model hint
    document.addEventListener( 'keydown', onDocumentKeyDown );
    document.addEventListener( 'keyup', onDocumentKeyUp );
}

function disconnectKeyListeners(){
    //listener for shift and ctrl and creating model hint
    document.removeEventListener( 'keydown', onDocumentKeyDown );
    document.removeEventListener( 'keyup', onDocumentKeyUp );
}

//#region flicking view mod
function onChangeViewMode(){
    switch (viewMod){
        case "observasion": setFirstPersonViewMod(); break;
        case "first-person": setObservationViewMod(); break;
    }
}

function setObservationViewMod(){
    viewMod = "observasion"
    
    camera = new THREE.PerspectiveCamera( 45, width/ height, 1, 10000 );
    camera.position.set( 500, 800, 1300 );
    // camera.lookAt( 0, 0, 0 );

    controls = new OrbitControls( camera, renderer.domElement );
    controls.update()
    controls.enabled = true;

    render()
}

function setFirstPersonViewMod(){
    viewMod = "first-person"
    if (controls != undefined)
        controls.enabled = false;

    camera = new THREE.PerspectiveCamera( 45, width/ height, 1, 10000 );
    camera.position.set(0, player.height, 0);

    lookedPoint = auxMath.translatePoint(camera.position, {x:1,y:0,z:0})
    camera.lookAt(lookedPoint);

    // firstPersonControls = new FirstPersonControls( camera, renderer.domElement )
    // firstPersonControls.connect()
    // firstPersonControls.refreshControls()

    onPointerDownMouseX = 0
    onPointerDownMouseY = 0
    lon = 0
    lat = 0
    onPointerDownLon = 0
    onPointerDownLat = 0
    phi = 0
    theta = 0
    updatelookedPoint()

    render()
}

function onMouseDown(e){
    if (e.button == 0) mouseLeftButton = true
    if (e.button == 2) {
        mouseRightButton = true
        if ( e.isPrimary === false ) return;

        onPointerDownMouseX = e.clientX;
        onPointerDownMouseY = e.clientY;

        onPointerDownLon = lon;
        onPointerDownLat = lat;
    }
}
function onMouseUp(e){
    if (e.button == 0) mouseLeftButton = false
    if (e.button == 2) {
        mouseRightButton = false
        if ( e.isPrimary === false ) return;
    }
}

function onMouseMoveControls(event){
    if (viewMod == "first-person" && mouseRightButton) {
        if ( event.isPrimary === false ) return;
        lon = ( onPointerDownMouseX - event.clientX ) * player.turnSpeed + onPointerDownLon;
        lat = ( event.clientY - onPointerDownMouseY ) * player.turnSpeed + onPointerDownLat;
    }
}

function onSceneMouseWheel( event ) {
    const fov = camera.fov + event.deltaY * 0.05;
    camera.fov = THREE.MathUtils.clamp( fov, 10, 100 );
    camera.updateProjectionMatrix();
}

function updatelookedPoint(){
    lat = Math.max( - 85, Math.min( 85, lat ) );
    phi = THREE.MathUtils.degToRad( 90 - lat );
    theta = THREE.MathUtils.degToRad( lon );

    const x = 500 * Math.sin( phi ) * Math.cos( theta );
    const y = 500 * Math.cos( phi );
    const z = 500 * Math.sin( phi ) * Math.sin( theta );
    lookedPoint = new Vector3(x,y,z)
}

//#endregion

//#region controls and creating model hint
let isShiftDown = false
let isCtrlDown = false
let pressedKeys = []

function onDocumentKeyDown( event ) {
    event.preventDefault()
    if (!pressedKeys.includes(event.keyCode))
        pressedKeys.push(event.keyCode)

    // switch ( event.keyCode ) {
    //     case 16: isShiftDown = true; changeEditingMod(); createHint(); break;
    //     case 17: isCtrlDown = true; changeEditingMod(); createHint(); break;
    // }
}

function onDocumentKeyUp( event ) {
    event.preventDefault()
    if (pressedKeys.includes(event.keyCode))
        pressedKeys.splice(pressedKeys.indexOf(event.keyCode), 1);

    // switch ( event.keyCode ) {
    //     case 16: isShiftDown = false; changeEditingMod(); createHint(); break;
    //     case 17: isCtrlDown = false; changeEditingMod(); createHint(); break;
    // }
}

// function changeEditingMod(){
//     if (!isShiftDown && !isCtrlDown || isShiftDown && isCtrlDown) editingMod = "viewing"
//     else if (isShiftDown && !isCtrlDown) editingMod = "adding"
//     else if (!isShiftDown && isCtrlDown) editingMod = "deleting"
// }

let keyListener = setTimeout(onKeyPressed, 10);
function onKeyPressed(){

    if (pressedKeys.includes(87)){// w
        if (viewMod == "first-person" && lookedPoint!=undefined) {
            var vector = lookedPoint.multiplyScalar( player.speed/1000, player.speed/1000, player.speed/1000 );
            camera.position.x += vector.x;
            camera.position.y += vector.y;
            camera.position.z += vector.z;
            lookedPoint.x += vector.x;
            lookedPoint.y += vector.y;
            lookedPoint.z += vector.z;
            updatelookedPoint()
            render()
        }
    }
    if (pressedKeys.includes(83)){// s
        if (viewMod == "first-person" && lookedPoint!=undefined) {
            var vector = lookedPoint.multiplyScalar( player.speed/1000 * -1, player.speed/1000, player.speed/1000 * -1 );
            camera.position.x += vector.x;
            camera.position.y += vector.y;
            camera.position.z += vector.z;
            lookedPoint.x += vector.x;
            lookedPoint.y += vector.y;
            lookedPoint.z += vector.z;
            updatelookedPoint()
            render()
        }
    }
    if (pressedKeys.includes(65)){// a
        if (viewMod == "first-person" && lookedPoint!=undefined) {
            let point = new Vector3(lookedPoint.x, camera.position.y, lookedPoint.z )
            var distinct = auxMath.rotatePointAroundAxis(
                point, 
                auxMath.translatePoint(camera.position, {x:0,y:-1,z:0}),
                auxMath.translatePoint(camera.position, {x:0,y:1,z:0}), 
                90 * Math.PI / 180
            )

            var vector = distinct.multiplyScalar( player.speed/1000, 0, player.speed/1000 );
            camera.position.x += vector.x;
            //camera.position.y += vector.y;
            camera.position.z += vector.z;
            lookedPoint.x += vector.x
            lookedPoint.z += vector.z
            updatelookedPoint()
            render()
        }
    }
    if (pressedKeys.includes(68)){// d
        if (viewMod == "first-person" && lookedPoint!=undefined) {
            let point = new Vector3(lookedPoint.x, camera.position.y, lookedPoint.z )
            var distinct = auxMath.rotatePointAroundAxis(
                point, 
                auxMath.translatePoint(camera.position, {x:0,y:-1,z:0}),
                auxMath.translatePoint(camera.position, {x:0,y:1,z:0}), 
                -90 * Math.PI / 180
            )
            var vector = distinct.multiplyScalar( player.speed/1000, 0, player.speed/1000 );
            camera.position.x += vector.x;
            //camera.position.y += vector.y;
            camera.position.z += vector.z;
            lookedPoint.x += vector.x
            lookedPoint.z += vector.z
            updatelookedPoint()
            render()
        }
    }
    if (pressedKeys.includes(18)){// left alt
        if (viewMod == "first-person" && lookedPoint!=undefined) {
            var vector = camera.position.multiplyScalar( 1, player.speed/1000, 1 );
            camera.position.y -= vector.y/50;

            vector = lookedPoint.multiplyScalar( 1, player.speed/1000, 1 );
            lookedPoint.y -= vector.y/50;
        }
        render()
    }
    if (pressedKeys.includes(32)){// space
        if (viewMod == "first-person" && lookedPoint!=undefined){
            var vector = camera.position.multiplyScalar( 1, player.speed/1000, 1 );
            camera.position.y += vector.y/50;

            vector = lookedPoint.multiplyScalar( 1, player.speed/1000, 1 );
            lookedPoint.y += vector.y/50;
        }
        render()
    }
    keyListener = setTimeout(onKeyPressed, 10);
}

function createHint(mesh){
    if (hintModel != undefined) {
        scene.remove(hintModel.mesh)
        hintModel = undefined
    }
    // pointer.set(getScreenX(lastX), getScreenY(lastY));
    // raycaster.setFromCamera( pointer, camera );
    // const intersects = raycaster.intersectObjects( scene.children );
    // const intersect = intersects[0];

    if (mesh != undefined && !selectionLockedModels.includes(mesh.name) && !mouseRightButton && !mouseLeftButton &&
    (page.state.selectedZone==undefined || page.state.selectedZone.name!=mesh.name) &&
    (page.state.selectedRack==undefined || page.state.selectedRack.name!=mesh.name)
    ) {
        hintModel = {
            name: "Hint", 
            modelName: "Hint",
            material: new THREE.MeshBasicMaterial( { color: 0x90EE90, opacity: 0.1, transparent: true } ), 
            geometry: mesh.geometry, 
            mesh: new THREE.Mesh( 
                mesh.geometry, 
                new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } )
            ), 
            translation: new Vector3(0,0,0),
        }
        hintModel.mesh.rotation.set(mesh.rotation.x, mesh.rotation.y, mesh.rotation.z)
        hintModel.mesh.visible = false
        scene.add( hintModel.mesh );
    }
    // }
    
}
//#endregion

//#region window resize
function onWindowResize() {
    width =  window.innerWidth
    height = window.innerHeight - sceneMarginTop - 4

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize( width, height);
}
//#endregion

//#region saving mouse coordinate and animating model hint
function onPointerMove(event) {
    lastX = event.clientX;
    lastY = event.clientY;

    if (!mouseRightButton || !mouseLeftButton){
        pointer.set(getScreenX(lastX), getScreenY(lastY));
        raycaster.setFromCamera( pointer, camera );
        const intersects = raycaster.intersectObjects( scene.children );
        const intersect = intersects[0];

        if (intersect!=undefined) {
            createHint(intersect.object);
            if (hintModel != undefined)
                animateHint(intersect.object);
        }
    }
    render();
}

function animateHint(mesh) {
    // pointer.set(getScreenX(lastX), getScreenY(lastY));
    // raycaster.setFromCamera( pointer, camera );
    // const intersects = raycaster.intersectObjects( scene.children );
    // const intersect = intersects[0];
    if (mesh!=undefined && hintModel != undefined && mesh.type !="Line") {
        //hintMesh.visible = true;
        // hintModel.mesh.position.copy( intersect.point ).add( intersect.face.normal );
        // hintModel.mesh.position.divideScalar(1).floor().multiplyScalar(1).addScalar( 1 );
        hintModel.mesh.position.set(
            mesh.position.x, 
            mesh.position.y, 
            mesh.position.z
        )
        hintModel.mesh.visible = true
        //scene.add( hintModel.mesh );
    } 
}
//#endregion

//#region create a model on click
function onPointerDown( event ) {
    pointer.set(getScreenX(event.clientX), getScreenY(event.clientY));
    raycaster.setFromCamera( pointer, camera );
    const intersects = raycaster.intersectObjects( scene.children );
    
    if (intersects.length > 0 && hintModel!=undefined) {
        const intersect = intersects[0];

        if (intersect.object.type == "zone"){
            scene.remove(zoneHintMesh)
            scene.remove(rackHintMesh)

            zoneHintMesh = addHintOnScene(intersect.object)

            page.setSelectedZone(undefined)
            page.state.selectedZoneName = intersect.object.userData.name
            page.state.selectedZoneCenterX = intersect.object.userData.centerPoint.x
            page.state.selectedZoneCenterZ = intersect.object.userData.centerPoint.z
            page.state.selectedZoneRotation = intersect.object.userData.rotation.y
            page.state.selectedZoneTypeId = {value:intersect.object.userData.zoneTypeId}

            page.state.selectedRackName = undefined
            page.state.selectedRackCenterX = undefined
            page.state.selectedRackCenterZ = undefined
            page.state.selectedRackRotation = undefined
            page.setSelectedZone(intersect.object)
            page.setSelectedRack(undefined)
        }
        
        if (intersect.object.type == "rack"){
            scene.remove(rackHintMesh)

            rackHintMesh = addHintOnScene(intersect.object)

            page.setSelectedRack(undefined)
            page.state.selectedRackName = intersect.object.userData.name
            page.state.selectedRackCenterX = intersect.object.userData.centerPoint.x
            page.state.selectedRackCenterZ = intersect.object.userData.centerPoint.z
            page.state.selectedRackRotation = intersect.object.userData.rotation.y
            page.state.selectedRackTypeId = {value:intersect.object.userData.racksTypeId}
            page.setSelectedRack(intersect.object)
        }

        //page.setState({tableList: shelfSpace});
        //page.flickPanel()
        
        render();
    }
}

function addHintOnScene(mesh){
    const voxel = new THREE.Mesh( mesh.geometry, new THREE.MeshBasicMaterial( { color: 0x90EE90, opacity: 0.1, transparent: true } ));
    // voxel.position.copy( intersect.point ).add( intersect.face.normal );
    // voxel.position.divideScalar( 1 ).floor().multiplyScalar( 1 ).addScalar( 1 );
    voxel.position.set(
        mesh.position.x, 
        mesh.position.y, 
        mesh.position.z)
    voxel.name = mesh.name;
    voxel.userData = mesh.userData
    voxel.rotation.set(mesh.rotation.x, mesh.rotation.y, mesh.rotation.z)
    scene.add( voxel );
    return voxel
}
//#endregion

//#region work with models and scene

function setModelOnCoordinates(model, coordinates, type){
    const voxel = model.mesh;
    voxel.position.divideScalar( 1 ).floor().multiplyScalar( 1 ).addScalar( 1 );
    voxel.position.set(coordinates.x + model.translation.x, coordinates.y + model.translation.y, coordinates.z + model.translation.z)
    voxel.name = model.name;
    if (type!=undefined) voxel.type = type
    scene.add( voxel );
}

function warehouseGeneration(warehouseSettings, zonesType, racksType, goodsType){
    addFloorOnScene(warehouseSettings)
    //zones
    warehouseSettings.zones.map(zone=>{
        addZoneOnScene(zone, zonesType)
        //racks
        zone.racks.map(rack=>{
            let rackType = racksType[`rack_${rack.racksTypeId}`]
            addRackWithGoodsOnScene(zone, rack, racksType, goodsType)
        })
    })
    render()
}

function addFloorOnScene(warehouseSettings){
    //grid
    const gridHelper = new THREE.GridHelper( Math.max(warehouseSettings.width, warehouseSettings.length), Math.max(warehouseSettings.width, warehouseSettings.length) );
    scene.add( gridHelper );

    let floorModel = modelCreator.createFloor("Floor", 0x808080, warehouseSettings.width, warehouseSettings.length, 4, new Vector3(0,-2,0))
    setModelOnCoordinates(floorModel, new Vector3(0,0,0), "floor")
    selectionLockedModels.push(floorModel.name)
    hintLockedModels.push(floorModel.name)
}

function addZoneOnScene(zone, zonesType){
    let zoneType = zonesType[`zone_${zone.zoneTypeId}`]
    let zoneBorderModel = modelCreator.createZoneBorder(zone.name, zoneType.color, zoneType.width, zoneType.length, zoneType.lineWidth, zoneType.chamferLendth, zoneType.message, zoneType.messageAlighment, font, zoneType.textSize, zoneType.gapLengthX, zoneType.gapLengthY, new Vector3(0,0,0))
    let zoneFillModel = modelCreator.zoneFillModel(`${zone.name}_fillament`, zoneType.color, zoneType.width, zoneType.length, zoneType.lineWidth, zoneType.chamferLendth, new Vector3(0,0,0))
    zoneBorderModel.mesh = auxMath.rotateMeshOnAllAxis(zoneBorderModel.mesh, zone.rotation)
    zoneFillModel.mesh = auxMath.rotateMeshOnAllAxis(zoneFillModel.mesh, zone.rotation)
    zoneFillModel.mesh.userData = zone
    zoneFillModel.mesh.userData.borderModel = zoneBorderModel.mesh
    setModelOnCoordinates(zoneBorderModel, zone.centerPoint, zone.type)
    setModelOnCoordinates(zoneFillModel, zone.centerPoint, zone.type)
    selectionLockedModels.push(zone.name)
    hintLockedModels.push(zone.name)
    hintLockedModels.push(`${zone.name}_fillament`)
    return zoneFillModel.mesh
}

function addRackWithGoodsOnScene(zone, rack, racksType, goodsType){
    let rackType = racksType[`rack_${rack.racksTypeId}`]
    let rackModel = modelCreator.createRack(rack.name+" "+rack.id, rackType.color, rackType.shelfWidth, rackType.shelfHeight, rackType.depth, rackType.columsAmount, rackType.rowsAmount, rackType.borderWidth, rackType.translation)
    let rackCenterGlobalCoordinate = new Vector3(
        zone.centerPoint.x + rack.centerPoint.x, 
        zone.centerPoint.y + rack.centerPoint.y, 
        zone.centerPoint.z + rack.centerPoint.z
    )
    rackModel.mesh = auxMath.rotateMeshOnAllAxis(rackModel.mesh, auxMath.sumRotations([zone.rotation, rack.rotation]))
    let rotatedRackCenterGlobalCoordinate = auxMath.rotatePointAroundAxisMass(
        rackCenterGlobalCoordinate.clone(), 
        auxMath.translatePoint(zone.centerPoint.clone(), {x:-rackType.translation.x,y:-rackType.translation.y,z:-rackType.translation.z}), 
        zone.rotation
    )
    rackModel.mesh.userData = rack
    rackModel.mesh.userData.goodsModels = []
    //shelfs
    rack.shelfs.map(shelf=>{
        if (shelf.space != ""){
            let rackCenterGlobalCoordinate = new Vector3(
                zone.centerPoint.x + rack.centerPoint.x, 
                zone.centerPoint.y + rack.centerPoint.y, 
                zone.centerPoint.z + rack.centerPoint.z
            )
            let rotatedRackCenterGlobalCoordinate = auxMath.rotatePointAroundAxisMass(
                rackCenterGlobalCoordinate.clone(), 
                auxMath.translatePoint(zone.centerPoint.clone(), {x:-rackType.translation.x,y:-rackType.translation.y,z:-rackType.translation.z}), 
                zone.rotation
            )

            let good = shelf.space[0]
            let goodType = goodsType[`good_${good.goodTypeId}`]
            let goodModel = modelCreator.createCube(good.name, goodType.color, goodType.width, goodType.height, goodType.depth, goodType.translation)
            goodModel.mesh.userData.space = shelf.space
            
            let firstShelfCenterGlobalCoordinate = new Vector3(
                rackCenterGlobalCoordinate.x-((rackType.shelfWidth*rackType.columsAmount + rackType.borderWidth*(rackType.columsAmount+1))/2 - (rackType.shelfWidth/2 + rackType.borderWidth) ),
                rackCenterGlobalCoordinate.y + rackType.borderWidth*2,
                rackCenterGlobalCoordinate.z
            )
            let shiftedFirstShelfCenterGlobalCoordinate = new Vector3(
                firstShelfCenterGlobalCoordinate.x + (rackType.shelfWidth  + rackType.borderWidth)*rackType.shelfs[`shelf_${shelf.number}`].column,
                firstShelfCenterGlobalCoordinate.y + (rackType.shelfHeight + rackType.borderWidth)*rackType.shelfs[`shelf_${shelf.number}`].row,
                firstShelfCenterGlobalCoordinate.z
            )
            goodModel.mesh = auxMath.rotateMeshOnAllAxis(goodModel.mesh, auxMath.sumRotations([zone.rotation, rack.rotation]))
            let rotatedZoneShiftedFirstShelfCenterGlobalCoordinate = auxMath.rotatePointAroundAxisMass(shiftedFirstShelfCenterGlobalCoordinate.clone(), zone.centerPoint.clone(), zone.rotation)
            let rotatedRackShiftedFirstShelfCenterGlobalCoordinate = auxMath.rotatePointAroundAxisMass(
                rotatedZoneShiftedFirstShelfCenterGlobalCoordinate.clone(), 
                auxMath.translatePoint(rotatedRackCenterGlobalCoordinate.clone(), {x:rackType.translation.x,y:rackType.translation.y,z:rackType.translation.z}),
                rack.rotation
            )
            rackModel.mesh.userData.goodsModels.push(goodModel.mesh)
            setModelOnCoordinates(
                goodModel, 
                rotatedRackShiftedFirstShelfCenterGlobalCoordinate,
                good.type
            )
            selectionLockedModels.push(good.name)
            hintLockedModels.push(good.name)
        }
    })
    setModelOnCoordinates(
        rackModel, 
        rotatedRackCenterGlobalCoordinate,
        rack.type
    )
    selectionLockedModels.push(rack.name+" "+rack.id)
    return rackModel.mesh
}
//#endregion

class AdministratorWarehouseCreating extends Component {

    isSideBlockOpened = false
    prevSearchTerm
    allGoods = undefined
    warehouseSettings = undefined
    selectedRackTypeIdBuf = undefined
    selectedRackTypeIdLast = undefined

    // componentWillMount(){
    //     this.sideBlock = new SideBlock({isOpened:this.isSideBlockOpened, onRightClosed:"-497px", onRightOpened:"-1px", styles:{top:"100px",width:"500px", height:"100%"}})
    // }
    constructor(props){
        super(props)
        page = this
        this.state={
            reload:0,
            //настройки склада
            zonesType: warehouseSettingsModel.getZonesType(),
            racksType: warehouseSettingsModel.getRacksType(),
            goodsType: warehouseSettingsModel.getGoodsType(),
            warehouseSettings: warehouseSettingsModel.getWarehouseSettings(),
            //табы toolbar'a
            tabs:[
                {id:0, title:"Вид", func:()=>{onChangeViewMode()}, selection:false, style:{fontSize:"15px", height:"20px"}},
                // {id:1, title:"Тест панельки", func:()=>{this.flickPanel()}, selection:false, style:{fontSize:"15px", height:"20px"}}
            ],
            selTab: {id:0},
            //табы выезжающей панельки
            panelTabs:[
                {id:0, title:"Характеристики", func:()=>{}, selection:true, style:{fontSize:"15px", height:"20px"}},
                {id:1, title:"Добавление зоны", func:()=>{}, selection:true, style:{fontSize:"15px", height:"20px"}},
                {id:2, title:"Добавление стеллажа", func:()=>{}, selection:true, style:{fontSize:"15px", height:"20px"}}
            ],
            panelSelTab: {id:0},
            isSideBlockOpened:false,
            warehouseWidth:undefined, //хар-ки склада
            warehouseLength:undefined, //хар-ки склада
            selectedZone:undefined, //выделенная зона склада
            selectedZoneName:undefined, //хар-ки выделенной зоны склада
            selectedZoneCenterX:undefined, //хар-ки выделенной зоны склада
            selectedZoneCenterZ:undefined, //хар-ки выделенной зоны склада
            selectedZoneRotation:undefined, //хар-ки выделенной зоны склада
            zoneTypeIdExpandList: Object.keys(warehouseSettingsModel.getZonesType()).map(zoneType=>{return {value: zoneType.split("_")[1]}}), //хар-ки выделенной зоны склада
            selectedZoneTypeId: {value: "0001"},//хар-ки выделенной зоны склада
            selectedRack:undefined, //выделенный стеллаж
            selectedRackName:undefined, //хар-ки выделенного стеллажа
            selectedRackCenterX:undefined, //хар-ки выделенного стеллажа
            selectedRackCenterZ:undefined, //хар-ки выделенного стеллажа
            selectedRackRotation:undefined, //хар-ки выделенного стеллажа
            rackTypeIdExpandList: Object.keys(warehouseSettingsModel.getRacksType()).map(rackType=>{return {value: rackType.split("_")[1]}}), //хар-ки выделенного стеллажа
            selectedRackTypeId: {value: "0001"},//хар-ки выделенного стеллажа
            isAlertMessageboxOpened: false
        }
    }

    setReload = ()=>{this.setState({reload: this.state.reload+1});}
    setTableHeaders = (value)=>{this.setState({tableHeaders: value});}  //таблица с содержимым полки на панельке
    setTableList = (value)=>{this.setState({tableList: value});}        //таблица с содержимым полки на панельке
    setSelectedItem = (value)=>{this.setState({selectedItem: value});}  //таблица с содержимым полки на панельке
    setSelTab = (value)=>{this.setState({selTab: value});}              //табы toolbar'a
    setPanelSelTab = (value)=>{this.setState({panelSelTab: value});}                //табы выезжающей панельки
    setIsSideBlockOpened = (value)=>{this.setState({isSideBlockOpened: value});}    //табы выезжающей панельки

    setWarehouseWidth = (value)=>{this.state.warehouseSettings.width = Number(value); this.setState({warehouseWidth: Number(value)});this.recreateFloor()} //хар-ки склада
    setWarehouseLength = (value)=>{this.state.warehouseSettings.length = Number(value); this.setState({warehouseLength: Number(value)});this.recreateFloor()} //хар-ки склада

    setSelectedZone = (value)=>{this.setState({selectedZone: value});}       //выделенная зона
    setSelectedZoneName = (value)=>{this.state.selectedZone.userData.name = value; this.setState({selectedZoneName: value});this.recreateZone()}       //хар-ки выделенной зоны
    setSelectedZoneCenterX = (value)=>{this.state.selectedZone.userData.centerPoint.x = Number(value); this.setState({selectedZoneCenterX: Number(value)});this.recreateZone()}     //хар-ки выделенной зоны
    setSelectedZoneCenterZ = (value)=>{this.state.selectedZone.userData.centerPoint.z = Number(value); this.setState({selectedZoneCenterZ: Number(value)});this.recreateZone()}     //хар-ки выделенной зоны
    setSelectedZoneRotation = (value)=>{this.state.selectedZone.userData.rotation.y = Number(value); this.setState({selectedZoneRotation: Number(value)});this.recreateZone()}   //хар-ки выделенной зоны
    setZoneTypeIdExpandList = (value)=>{this.setState({zoneTypeIdExpandList: value});}       //хар-ки выделенной зоны
    setSelectedZoneTypeId = (value)=>{this.state.selectedZone.userData.zoneTypeId = value; this.setState({selectedZoneTypeId: value});this.recreateZone()}       //хар-ки выделенной зоны

    setSelectedRack = (value)=>{this.setState({selectedRack: value});}       //выделенный стеллаж
    setSelectedRackName = (value)=>{this.state.selectedRack.userData.name = value; this.setState({selectedRackName: value});this.recreateRack(false)}       //хар-ки выделенного стеллажа
    setSelectedRackCenterX = (value)=>{this.state.selectedRack.userData.centerPoint.x = Number(value); this.setState({selectedRackCenterX: Number(value)});this.recreateRack(false)}     //хар-ки выделенного стеллажа
    setSelectedRackCenterZ = (value)=>{this.state.selectedRack.userData.centerPoint.z = Number(value); this.setState({selectedRackCenterZ: Number(value)});this.recreateRack(false)}     //хар-ки выделенного стеллажа
    setSelectedRackRotation = (value)=>{this.state.selectedRack.userData.rotation.y = Number(value); this.setState({selectedRackRotation: Number(value)});this.recreateRack(false)}   //хар-ки выделенного стеллажа
    setRackTypeIdExpandList = (value)=>{this.setState({rackTypeIdExpandList: value});}   //хар-ки выделенного стеллажа
    
    setSelectedRackTypeId = (value)=>{
        this.selectedRackTypeIdBuf = value; 
        this.selectedRackTypeIdLast = this.state.selectedRackTypeId; 
        this.setState({selectedRackTypeId: value}); 
        this.setState({isAlertMessageboxOpened: true});
    }       //хар-ки выделенного стеллажа
    setSelectedRackTypeIdFromBuf = ()=>{ 
        this.state.selectedRack.userData.racksTypeId = this.selectedRackTypeIdBuf; 
        this.recreateRack(true)
    }       //хар-ки выделенного стеллажа

    recreateFloor=()=>{
        let floorModel = undefined
        let gridHelper = undefined
        scene.children.map(mesh=>{
            if (mesh.type == "floor") floorModel = mesh
            if (mesh.type == "GridHelper") gridHelper = mesh
        })
        scene.remove(floorModel)
        scene.remove(gridHelper)
        addFloorOnScene(this.state.warehouseSettings)
        render()
    }

    recreateZone=()=>{
        let newZoneMesh = undefined
        let newRackMesh = undefined
        this.state.warehouseSettings.zones.map(zone=>{
            if (zone.id === this.state.selectedZone.userData.id && zone.type === "zone"){
                let newZoneObj = this.getSceneElmByIdAndType(zone.id, "zone")
                let newZone = newZoneObj.userData
                scene.remove(newZoneObj)
                scene.remove(newZone.borderModel)
                newZone.racks.map(rack=>{
                        let rackObj = this.getSceneElmByIdAndType(rack.id, "rack")
                        rackObj.userData.goodsModels.map(goodObj=>{
                            scene.remove(goodObj)
                        })
                        scene.remove(rackObj)
                        addRackWithGoodsOnScene(zone, rack, this.state.racksType, this.state.goodsType)
                })
                
                newZoneMesh = addZoneOnScene(newZone, this.state.zonesType)
                return newZone
            }
            return zone
        })

        scene.remove(zoneHintMesh)
        zoneHintMesh = addHintOnScene(newZoneMesh)
        
        if (rackHintMesh!=undefined && this.state.selectedRack!=undefined){
            newRackMesh=this.getSceneElmByIdAndType(this.state.selectedRack.userData.id, "rack")
            scene.remove(rackHintMesh)
            rackHintMesh = addHintOnScene(newRackMesh)
        }
        render()
    }

    recreateRack=(isTypeChanged)=>{
        this.state.warehouseSettings.zones.map(zone=>{
            if (zone.id === this.state.selectedZone.userData.id && zone.type === "zone"){
                let newZoneObj = this.getSceneElmByIdAndType(zone.id, "zone")
                let newZone = newZoneObj.userData
                newZone.racks = newZone.racks.map(rack=>{
                    if (rack.id === this.state.selectedRack.userData.id && rack.type === "rack"){
                        let newRackObj = this.getSceneElmByIdAndType(rack.id, "rack")
                        let newRack = newRackObj.userData
                        newRackObj.userData.goodsModels.map(goodObj=>{
                            scene.remove(goodObj)
                        })
                        scene.remove(newRackObj)
                        if (!isTypeChanged)
                            addRackWithGoodsOnScene(zone, newRack, this.state.racksType, this.state.goodsType)
                        else {
                            newRack.shelfs = this.generateShelfsByRackType(newRack.racksTypeId, this.state.racksType, this.getLastShelfIdByType(scene)+1)
                            console.log(newRack)
                            addRackWithGoodsOnScene(zone, newRack, this.state.racksType, this.state.goodsType)
                        }
                        return newRack
                    }
                    return rack
                })
                return newZone
            }
            return zone
        })
        let newRackMesh=this.getSceneElmByIdAndType(this.state.selectedRack.userData.id, "rack")
        scene.remove(rackHintMesh)
        rackHintMesh = addHintOnScene(newRackMesh)
        render()
    }

    generateShelfsByRackType=(racksTypeId, racksType, startShelfId)=>{
        let rackType = racksType[`rack_${racksTypeId}`]
        let newShelf = []
        Object.keys(rackType.shelfs).map(function(shelfKey,i){
            newShelf.push({name:`Полка ${i+1}`, number:i+1, id: startShelfId+i, space:[]})
        })
        return newShelf
    }

    getLastIdByType=(scene, type)=>{
        let maxId = -1
        scene.children.map(mesh=>{
            if (mesh.type == type && mesh.userData.id>maxId)
                maxId = mesh.userData.id
        })
        return maxId
    }

    getLastShelfIdByType=(scene)=>{
        let maxId = -1
        scene.children.map(mesh=>{
            if (mesh.type == "rack")
                mesh.userData.shelfs.map(shelf=>{
                    if (shelf.id > maxId)
                        maxId = shelf.id
                })
        })
        return maxId
    }

    getSceneElmByIdAndType=(id, type)=>{
        let buf = undefined
        scene.children.map(obj=>{
            if (obj.userData.id == id && obj.type == type) buf = obj;
        })
        return buf
    }
    
    componentDidMount(){
        var manager = new THREE.LoadingManager();
        manager.onLoad = () => { // when all resources are loaded
            init(this.state.warehouseSettings)
            createHint()
            warehouseGeneration(this.state.warehouseSettings, this.state.zonesType, this.state.racksType, this.state.goodsType)
            this.allGoods = []
            this.state.warehouseSettings.zones.map(zone=>{
                zone.racks.map(rack=>{
                    rack.shelfs.map(shelf=>{
                        shelf.space.map(good=>{
                            this.allGoods.push(good)
                        })
                    })
                })
            })
            let buf = structuredClone(this.allGoods).map(function(good,i){
                let goodBuf = good
                goodBuf.goodId = good.id
                goodBuf.id = i
                goodBuf.number = i+1
                goodBuf.goodsType = good.name
                goodBuf.weight = good.weight
                return goodBuf
            })
            this.state.tableList1 = buf
            this.state.warehouseWidth = this.state.warehouseSettings.width
            //this.state.warehouseLength = this.state.warehouseSettings.length
            this.setWarehouseLength(this.state.warehouseSettings.length)
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
        console.log("DidUpdate")
        if (this.state.isSideBlockOpened==true){
            this.setState({isSideBlockOpened: !this.state.isSideBlockOpened})
        }
        if (this.state.selectedItem!=undefined && this.state.id!=this.state.selectedItem.goodId){
            this.state.good = this.state.selectedItem.goodsType
            this.state.id = this.state.selectedItem.goodId
            this.state.category = this.state.selectedItem.category
            this.state.subCategory = this.state.selectedItem.subCategory
            this.state.cost = this.state.selectedItem.cost
            this.state.weight = this.state.selectedItem.weight
            this.state.goodCharacteristics = this.state.selectedItem.goodCharacteristics
            this.setReload()
        }
        if (this.state.selectedZone!=undefined && this.state.selectedZone.userData != undefined){
            this.state.warehouseSettings.zones.map(zone=>{
                zone.racks.map(rack=>{
                    if (!selectionLockedModels.includes(rack.name+" "+rack.id))
                        selectionLockedModels.push(rack.name+" "+rack.id)
                })
            })
            this.state.selectedZone.userData.racks.map(rack=>{
                selectionLockedModels.splice(selectionLockedModels.indexOf(rack.name+" "+rack.id),1)
            })
        }
    }

    sortListByKey=(list, key, searchTerm)=>{
        return list.filter(item => {
            return String(item[key]).toLowerCase().includes(String(searchTerm).toLowerCase())
        })
    }

    // componentWillUnmount() {
    //     clearInterval(keyListener);
    // }

    render(){
        return (
            <>
                <div id="toolbar" style={{display: "table", width:"100%"}}>
                    <UniversalTabHolder tabs={this.state.tabs} setTab={this.setSelTab} selTab={this.state.selTab}/>
                </div>
                
                <div id="warehouseSceneWrap">
                    <div id="warehouseScene" onContextMenu={(e)=> e.preventDefault()}/>
                    <SideBlock isOpened={this.isSideBlockOpened} onRightClosed="-497px" onRightOpened="-1px" styles={{top:"100px",width:"500px", height:"100%"}}>
                        <UniversalTabHolder tabs={this.state.panelTabs} style={{marginLeft:"1px" }} setTab={this.setPanelSelTab} selTab={this.state.panelSelTab}/>
                        {this.state.panelSelTab.id==0&&(
                            <>
                                <div className="header_text">Хар-ки склада</div>
                                <InputText styles = "row_with_item_wide" Id={1}  label="Длинна&nbsp;склада&nbsp;(см)&nbsp;"       placeholder="длинна склада"           defValue={this.state.warehouseLength}            set={this.setWarehouseLength}/> 
                                <InputText styles = "row_with_item_wide" Id={2}  label="Ширина&nbsp;склада&nbsp;(см)&nbsp;"       placeholder="ширина склада"           defValue={this.state.warehouseWidth}             set={this.setWarehouseWidth}/>

                                {this.state.selectedZone==undefined
                                ?<div>Выберите зону склада</div>
                                :<>
                                    <div className="header_text">Хар-ки выделенной зоны</div>
                                    <InputText styles = "row_with_item_wide" Id={3}  label="Название&nbsp;зоны&nbsp;"               placeholder="название зоны"         defValue={this.state.selectedZoneName}      set={this.setSelectedZoneName}/> 
                                    <InputText styles = "row_with_item_wide" Id={4}  label="Центр&nbsp;зоны&nbsp;по&nbsp;x&nbsp;"   placeholder="центр зоны по x"       defValue={this.state.selectedZoneCenterX}   set={this.setSelectedZoneCenterX}/> 
                                    <InputText styles = "row_with_item_wide" Id={5}  label="Центр&nbsp;зоны&nbsp;по&nbsp;y&nbsp;"   placeholder="центр зоны по y"       defValue={this.state.selectedZoneCenterZ}   set={this.setSelectedZoneCenterZ}/> 
                                    <InputText styles = "row_with_item_wide" Id={6}  label="Угол&nbsp;поворота&nbsp;зоны&nbsp;"     placeholder="угол поворота зоны"    defValue={this.state.selectedZoneRotation}  set={this.setSelectedZoneRotation}/> 
                                    <div className="low_text row_with_item_equal" style={{width:"140px"}}><div>Тип&nbsp;зоны&nbsp;</div><ExpandListInputRegular width={100} list={this.state.zoneTypeIdExpandList} defValue={this.state.selectedZoneTypeId} func={this.setSelectedZoneTypeId}/></div>
                                    {this.state.selectedRack==undefined
                                    ?<div>Выберите стеллаж</div>
                                    :<>
                                        <div className="header_text">Хар-ки выделенного стеллажа</div>
                                        <InputText styles = "row_with_item_wide" Id={3}  label="Название&nbsp;стеллажа&nbsp;"               placeholder="название стеллажа"         defValue={this.state.selectedRackName}      set={this.setSelectedRackName}/> 
                                        <InputText styles = "row_with_item_wide" Id={4}  label="Центр&nbsp;стеллажа&nbsp;по&nbsp;x&nbsp;относительно&nbsp;центра&nbsp;зоны&nbsp;"   placeholder="центр стеллажа по x"       defValue={this.state.selectedRackCenterX}   set={this.setSelectedRackCenterX}/> 
                                        <InputText styles = "row_with_item_wide" Id={5}  label="Центр&nbsp;стеллажа&nbsp;по&nbsp;y&nbsp;относительно&nbsp;центра&nbsp;зоны&nbsp;"   placeholder="центр стеллажа по y"       defValue={this.state.selectedRackCenterZ}   set={this.setSelectedRackCenterZ}/> 
                                        <InputText styles = "row_with_item_wide" Id={6}  label="Угол&nbsp;поворота&nbsp;стеллажа&nbsp;"     placeholder="угол поворота стеллажа"    defValue={this.state.selectedRackRotation}  set={this.setSelectedRackRotation}/> 
                                        <div className="low_text row_with_item_equal" style={{width:"140px"}}><div>Тип&nbsp;стеллажа&nbsp;</div><ExpandListInputRegular width={100} list={this.state.rackTypeIdExpandList} defValue={this.state.selectedRackTypeId} func={this.setSelectedRackTypeId}/></div>
                                    </>
                                    }
                                </>
                                }
                                {/* <div style={{width:"350px", display: "inline-block"}}/><button className="bt_send" style={{width:"120px"}} onClick={this.btn_send_1}>Смоделировать склад</button> */}
                            </>
                        )}
                        {this.state.panelSelTab.id==1&&(
                            <>
                                <div className="header_text">Доступные зоны</div>
                                <ModelList models={[]} width={490} minWidth={100} spaceBetweenItems={10} setModel={()=>{}}/>
                            </>
                        )}
                        {this.state.panelSelTab.id==2&&(
                            <>
                                
                            </>
                        )}
                    </SideBlock>
                </div>
                <AlertMessagebox
                    title={"Внимание!"}
                    message={"Вы действительно хотите изменить тип полки? В таком случае товары на ней станут считаться нераспределенными."}
                    isOpened={this.state.isAlertMessageboxOpened} 
                    onAccept={()=>{this.setState({isAlertMessageboxOpened: false});this.setSelectedRackTypeIdFromBuf()}} 
                    onCancel={()=>{this.setState({isAlertMessageboxOpened: false});this.setState({selectedRackTypeId: this.selectedRackTypeIdLast}); }}
                />
                {/* <DropdownListWithModels setModel={setModel}/> */}
        </>
        )
    }
}

export default AdministratorWarehouseCreating