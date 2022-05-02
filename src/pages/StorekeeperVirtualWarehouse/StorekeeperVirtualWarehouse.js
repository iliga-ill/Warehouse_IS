import { React, Component, Fragment } from "react";
import './StorekeeperVirtualWarehouse.css';
import * as THREE from 'three';
import { MapControls, OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
//import {PointerLockControls} from 'https://threejs.org/examples/jsm/controls/PointerLockControls.js';
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls";

import DropdownListWithModels from "../../components/DropdownListWithModels/DropdownListWithModels";
import ModelCreator from "../../classes/ModelCreator/ModelCreator.js";
import Colors from "../../classes/Colors/Colors.js";
import { MOUSE, Vector2, Vector3 } from "three";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

import WarehouseSettingsModel from "../../classes/ModelCreator/WarehouseSettingsModel.js";
import zIndex from "@material-ui/core/styles/zIndex";

const styles = {

  }

let modelCreator = new ModelCreator()
let colors = new Colors()

let warehouseSettingsModel = new WarehouseSettingsModel()

let zonesType = warehouseSettingsModel.getZonesType()
let racksType = warehouseSettingsModel.getRacksType()
let goodsType = warehouseSettingsModel.getGoodsType()
let warehouseSettings = warehouseSettingsModel.getWarehouseSettings()


//#region Scene settings -------------------------------------------------

//#region Variables
let camera, scene, renderer;
let plane;
let pointer, raycaster; 
let font = null

let editingMod = "viewing" //viewing, adding, deleting
let viewMod = "first-person" //observasion, first-person


let hintModel = undefined;
let model = undefined;

let selectionLockedModels = [""]
let hintLockedModels = [""]

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

    raycaster = new THREE.Raycaster();
    pointer = new THREE.Vector2();

    //scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );

    //grid
    const gridHelper = new THREE.GridHelper( Math.max(warehouseSettings.width, warehouseSettings.length), Math.max(warehouseSettings.width, warehouseSettings.length) );
    scene.add( gridHelper );

    const geometry = new THREE.PlaneGeometry( 10000, 10000 );
    geometry.rotateX( - Math.PI / 2 );

    plane = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { visible: false } ) );
    plane.name = "Mesh"
    selectionLockedModels.push("Mesh")
    hintLockedModels.push("Mesh")

    scene.add( plane );
    objects.push( plane );

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

    if (viewMod == "first-person") setFirstPersonViewMod();
    if (viewMod == "observasion") setObservationViewMod();

    //addingSceneOnScreen
    var warehouseScene = document.getElementById("warehouseScene")
    warehouseScene.appendChild( renderer.domElement );

    //setListeners
    setListeners()
}

function render() {
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
    var btnViewMode = document.getElementById("btn_viewMode")

    //listener for hint
    warehouseScene.addEventListener('mousemove', onMouseMove)

    //listenets for saving mouse button
    warehouseScene.addEventListener('mousedown', onMouseDown)
    warehouseScene.addEventListener('mouseup', onMouseUp)

    //listener for shift and ctrl and creating model hint
    document.addEventListener( 'keydown', onDocumentKeyDown );
    document.addEventListener( 'keyup', onDocumentKeyUp );

    //listener for resizing
    window.addEventListener( 'resize', onWindowResize );

    //listener for saving mouse coordinates and animating model hint
    warehouseScene.addEventListener('pointermove', onPointerMove)

    //listener for creating a model on click
    warehouseScene.addEventListener('pointerdown', onPointerDown)

    //listener for flicking view mod
    btnViewMode.addEventListener('click', onChangeViewMode)
    warehouseScene.addEventListener('mousemove', onMouseMoveControls)
}

//#region flicking view mod
function onChangeViewMode(){
    if (viewMod == "observasion") setFirstPersonViewMod();
    if (viewMod == "first-person") setObservationViewMod();
    console.log(viewMod)
}

function setObservationViewMod(){
    viewMod = "observasion"
    console.log("happened")
    //camera
    camera = new THREE.PerspectiveCamera( 45, width/ height, 1, 10000 );
    camera.position.set( 500, 800, 1300 );
    // camera.lookAt( 0, 0, 0 );

    let controls = new OrbitControls( camera, renderer.domElement );
    controls.update()
}

function setFirstPersonViewMod(){
    viewMod = "first-person"
    //camera
    camera = new THREE.PerspectiveCamera( 45, width/ height, 1, 10000 );
    camera.position.set(0, player.height, 0);
    camera.lookAt(new THREE.Vector3(-5, 5, 0));
    // const controls = new FirstPersonControls( camera );
				
    // controls.lookSpeed = 0.4;
    // controls.movementSpeed = 20;
    // controls.noFly = true;
    // controls.lookVertical = true;
    // controls.constrainVertical = true;
    // controls.verticalMin = 1.0;
    // controls.verticalMax = 2.0;
    // controls.lon = -150;
    // controls.lat = 120;
    // scene.add( controls.object );
    // const controls = new PointerLockControls( camera, renderer.domElement )
    //controls.update()
}


let controls = {};
let player = {
  height: 5,
  turnSpeed: .1,
  speed: 5,
  jumpHeight: .2,
  gravity: 0,
  velocity: 0,
  
  playerJumps: false
};
var scale = 150;
 // this is not the default
let radians = .025
function onMouseMoveControls(e){
    if (viewMod == "first-person" && mouseRightButton) {
        // camera.rotation.x = -getScreenY(lastY) / scale + 135;
        // camera.rotation.y = getScreenX(lastX) / scale;


        console.log(`
        x:${Math.round(camera.rotation.x/(Math.PI / 180))} 
        y:${Math.round(camera.rotation.y/(Math.PI / 180))} 
        z:${Math.round(camera.rotation.z/(Math.PI / 180))} 
        x*:${Math.cos(camera.rotation.y)} 
        z*:${Math.sin(camera.rotation.y)}`)

        // camera.rotation.y += e.movementX / scale
        //camera.rotation.x += (e.movementY / scale) * Math.abs(Math.cos(camera.rotation.y))
        //camera.rotation.z += (e.movementY / scale) * Math.abs(Math.sin(camera.rotation.y))
        console.log(camera)

        
        //camera.rotation.getRotationFromMatrix( camera.matrix );
        
        
        
        camera.rotation.setFromRotationMatrix(camera.matrix.makeRotationX( camera.rotation.y + e.movementY / scale ))
        camera.rotation.setFromRotationMatrix(camera.matrix.makeRotationY( camera.rotation.x + e.movementX / scale ))
        

        //camera.matrix.makeRotationX( radians + e.movementY / scale );
        //camera.rotation.getRotationFromMatrix( camera.matrix );

        // e.x -= e.movementX
        // e.y -= e.movementY
        
    }
}



//#endregion

//#region textHint
let hintTimer = setTimeout(onMouseStop, 1000);
function onMouseMove(){
    clearTimeout(hintTimer);
    hintTimer = setTimeout(onMouseStop, 1000)
    var hint = document.getElementById("hint")
    if (hint != null){
        hint.remove()
    }
}

function onMouseStop(){
    if (pointer != undefined){
        pointer.set(getScreenX(lastX), getScreenY(lastY));
        raycaster.setFromCamera( pointer, camera );
        const intersects = raycaster.intersectObjects( objects );
        const intersect = intersects[0];
        if (intersects.length > 0 && !hintLockedModels.includes(intersect.object.name)) {
            generateHint(intersect, lastX, lastY)
        }
    }
}

function generateHint(intersect, lastX, lastY){
    console.log(intersect)
    var warehouseScene = document.getElementById("warehouseSceneWrap")
    var hint = document.createElement("div");
    hint.id = "hint";
    hint.style.position = "absolute";
    hint.style.left = `${lastX}px`;
    //hint.style.width = `${100}px`;
    hint.style.background = "white";
    hint.style.height = 0;
    hint.style.zIndex = 100;
    if (intersect.object.userData.space != undefined){
        intersect.object.userData.space.map(function(good,i){
            hint.style.top = `${lastY - 25*(i+1)}px`;
            hint.style.height = `${25*(i+1)}px`;
            hint.innerHTML += `${good.name}<br>`;
        })
    } else {
        hint.style.top = `${lastY - 25}px`;
        hint.style.height = `${25}px`;
        hint.innerHTML = `${intersect.object.name}`;
    }
    
    
    warehouseScene.appendChild(hint);
}
//#endregion

let mouseLeftButton = false
let mouseRightButton = false

function onMouseDown(e){
    if (e.button == 0) mouseLeftButton = true
    if (e.button == 2) mouseRightButton = true
}
function onMouseUp(e){
    if (e.button == 0) mouseLeftButton = false
    if (e.button == 2) mouseRightButton = false
}

//#region controls and creating model hint
let isShiftDown = false
let isCtrlDown = false

function onDocumentKeyDown( event ) {
    switch ( event.keyCode ) {
        case 16: //shift
            isShiftDown = true; 
            changeEditingMod(); 
            createHint(); 
            break;
        case 17:  //shift 
            isCtrlDown = true; 
            changeEditingMod(); 
            createHint(); 
            break;
        case 87: // w
        console.log(viewMod)
            if (viewMod == "first-person") {
                camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
                camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
                render()
            }
            break;
        case 83: // s
            if (viewMod == "first-person") {
                camera.position.x += Math.sin(camera.rotation.y) * player.speed;
                camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
                render()
            }
            break;
        case 65: // a
            if (viewMod == "first-person") {
                camera.position.x += Math.sin(camera.rotation.y + Math.PI / 2) * player.speed;
                camera.position.z += -Math.cos(camera.rotation.y + Math.PI / 2) * player.speed;
                render()
            }
            break;
        case 68: // d
            if (viewMod == "first-person") {
                camera.position.x += Math.sin(camera.rotation.y - Math.PI / 2) * player.speed;
                camera.position.z += -Math.cos(camera.rotation.y - Math.PI / 2) * player.speed;
                render()
            }
            break;
        case 37: // la
            if (viewMod == "first-person")
                camera.rotation.y -= player.turnSpeed;
                render()
            break;
        case 39: // ra
            if (viewMod == "first-person")
                camera.rotation.y += player.turnSpeed;
                render()
            break;
        case 32: // space
            if (viewMod == "first-person") {
                if(player.jumps) return false;
                player.jumps = true;
                player.velocity = -player.jumpHeight;
                render()
            }
            break;
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

        if (intersect != undefined && !selectionLockedModels.includes(intersect.object.name)) {
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
    animateHint();
}

function animateHint() {
    pointer.set(getScreenX(lastX), getScreenY(lastY));
    raycaster.setFromCamera( pointer, camera );
    const intersects = raycaster.intersectObjects( objects );
    const intersect = intersects[0];
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
//#endregion

//#region create a model on click
function onPointerDown( event ) {
    pointer.set(getScreenX(event.clientX), getScreenY(event.clientY));
    raycaster.setFromCamera( pointer, camera );
    const intersects = raycaster.intersectObjects( objects );
    
    if (intersects.length > 0) {
        const intersect = intersects[0];
        //event.button === 2
        if (editingMod == "deleting" && !selectionLockedModels.includes(intersect.object.name)) {
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
//#endregion

//#endregion

//#region math methods

function getPivotPoint(pointToRotate, axisStart, axisEnd) {
    const d = new Vector3().subVectors(axisEnd, axisStart).normalize()
    const v = new Vector3().subVectors(pointToRotate, axisStart)
    const t = v.dot(d)
    const pivotPoint = axisStart.add(d.multiplyScalar(t))
    return pivotPoint
}

function rotatePointAroundAxis(pointToRotate, axisStart, axisEnd, radians) {
    const axisDirection = new Vector3().subVectors(axisEnd, axisStart).normalize()
    const pivotPoint = getPivotPoint(pointToRotate, axisStart, axisEnd)
    const translationToWorldCenter = new Vector3().subVectors(pointToRotate, pivotPoint)
    const translatedRotated = translationToWorldCenter.clone().applyAxisAngle(axisDirection, radians)
    const destination = pointToRotate.clone().add(translatedRotated).sub(translationToWorldCenter)
    return destination
}

//#endregion

//#region work with vectors, models and scene

function translatePoint(point,{x,y,z}){
    return new Vector3(point.x+x,point.y+y,point.z+z)
}

function rotatePointAroundAxisMass(pointToRotate, zoneCenter, rotation){
    pointToRotate = rotatePointAroundAxis(
        pointToRotate, 
        translatePoint(zoneCenter, {x:-1,y:0,z:0}), 
        translatePoint(zoneCenter, {x:1,y:0,z:0}), 
        rotation.x * Math.PI / 180
    )
    pointToRotate = rotatePointAroundAxis(
        pointToRotate, 
        translatePoint(zoneCenter, {x:0,y:-1,z:0}), 
        translatePoint(zoneCenter, {x:0,y:1,z:0}), 
        rotation.y * Math.PI / 180
    )
    pointToRotate = rotatePointAroundAxis(
        pointToRotate, 
        translatePoint(zoneCenter, {x:0,y:0,z:-1}), 
        translatePoint(zoneCenter, {x:0,y:0,z:1}), 
        rotation.z * Math.PI / 180
    )
    return pointToRotate
}

function rotateMeshOnAxis(mesh, axis, rotationAngle){
    mesh.rotateOnAxis ( axis, rotationAngle * Math.PI / 180 )
    return mesh
}

function rotateMeshOnAllAxis(mesh, rotation){
    mesh.rotateOnAxis ( new Vector3(1,0,0), rotation.x * Math.PI / 180 )
    mesh.rotateOnAxis ( new Vector3(0,1,0), rotation.y * Math.PI / 180 )
    mesh.rotateOnAxis ( new Vector3(0,0,1), rotation.z * Math.PI / 180 )
    return mesh
}

function sumRotations(rotations){
    let res={x:0,y:0,z:0}
    rotations.map(rotation=>{
        res.x+=rotation.x
        res.y+=rotation.y
        res.z+=rotation.z
    })
    return res
}

function setModelOnCoordinates(model, coordinates, inObjects){
    const voxel = model.mesh;
    voxel.position.divideScalar( 1 ).floor().multiplyScalar( 1 ).addScalar( 1 );
    voxel.position.set(coordinates.x + model.translation.x, coordinates.y + model.translation.y, coordinates.z + model.translation.z)
    voxel.name = model.name;
    scene.add( voxel );
    if (inObjects) objects.push( voxel );
}

function warehouseGeneration(warehouseSettings, racksType){
    let floorModel = modelCreator.createFloor("Floor", 0x808080, warehouseSettings.width, warehouseSettings.length, 4, new Vector3(0,-2,0))
        
    setModelOnCoordinates(floorModel, new Vector3(0,0,0))
    selectionLockedModels.push(floorModel.name)
    hintLockedModels.push(floorModel.name)

        //zones
    warehouseSettings.zones.map(zone=>{
        let zoneType = zonesType[`zone_${zone.zoneTypeId}`]
        let zoneBorderModel = modelCreator.createZoneBorder(zone.name, zoneType.color, zoneType.width, zoneType.length, 1, zoneType.chamferLendth, zone.message, zone.messageAlighment, font, zone.textSize, zone.gapLengthX, zone.gapLengthY, new Vector3(0,0,0))
        zoneBorderModel.mesh = rotateMeshOnAllAxis(zoneBorderModel.mesh, zone.rotation)
        let zoneCenterGlobalCoordinate = zone.centerPoint
        setModelOnCoordinates(zoneBorderModel, zoneCenterGlobalCoordinate, false)
        selectionLockedModels.push(zone.name)
        hintLockedModels.push(zone.name)
        //racks
        zone.racks.map(rack=>{
            let rackType = racksType[`rack_${rack.racksTypeId}`]
            let rackModel = modelCreator.createRack(rack.name, rackType.color, rackType.shelfWidth, rackType.shelfHeight, rackType.depth, rackType.columsAmount, rackType.rowsAmount, rackType.borderWidth, rackType.translation)
            let rackCenterGlobalCoordinate = new Vector3(
                zoneCenterGlobalCoordinate.x + rack.centerPoint.x, 
                zoneCenterGlobalCoordinate.y + rack.centerPoint.y, 
                zoneCenterGlobalCoordinate.z + rack.centerPoint.z
            )
            rackModel.mesh = rotateMeshOnAllAxis(rackModel.mesh, sumRotations([zone.rotation, rack.rotation]))
            let rotatedRackCenterGlobalCoordinate = rotatePointAroundAxisMass(
                rackCenterGlobalCoordinate.clone(), 
                translatePoint(zoneCenterGlobalCoordinate.clone(), {x:-rackType.translation.x,y:-rackType.translation.y,z:-rackType.translation.z}), 
                zone.rotation
            )
            setModelOnCoordinates(
                rackModel, 
                rotatedRackCenterGlobalCoordinate,
                true
            )
            selectionLockedModels.push(rack.name)
            //shelfs
            rack.shelfs.map(shelf=>{
                if (shelf.space != ""){
                    //shelf.space.map(good=>{
                        let good = shelf.space[0]
                        let goodType = goodsType[`good_${good.goodTypeId}`]
                        let goodModel = modelCreator.createCube(good.name, goodType.color, goodType.width, goodType.height, goodType.depth, goodType.translation)
                        goodModel.mesh.userData.space = shelf.space
                        //console.log(model.mesh)
                        
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
                        goodModel.mesh = rotateMeshOnAllAxis(goodModel.mesh, sumRotations([zone.rotation, rack.rotation]))
                        let rotatedZoneShiftedFirstShelfCenterGlobalCoordinate = rotatePointAroundAxisMass(shiftedFirstShelfCenterGlobalCoordinate.clone(), zoneCenterGlobalCoordinate.clone(), zone.rotation)
                        let rotatedRackShiftedFirstShelfCenterGlobalCoordinate = rotatePointAroundAxisMass(
                            rotatedZoneShiftedFirstShelfCenterGlobalCoordinate.clone(), 
                            translatePoint(rotatedRackCenterGlobalCoordinate.clone(), {x:rackType.translation.x,y:rackType.translation.y,z:rackType.translation.z}),
                            rack.rotation
                        )
                            
                        setModelOnCoordinates(
                            goodModel, 
                            rotatedRackShiftedFirstShelfCenterGlobalCoordinate,
                            true
                        )
                    //})
                }
            })
        })
    })
}

//#endregion

class StorekeeperVirtualWarehouse extends Component {

    componentDidMount(){
        var manager = new THREE.LoadingManager();
        manager.onLoad = function() { // when all resources are loaded
            init()
            render()
            let modelCreator = new ModelCreator()

            //model = modelCreator.createCube("Пиксель", 0x885aaa, 2, 2, 2, new THREE.Vector3(-1,-1,-1))
            //model = modelCreator.createCube("Пиксель", 0x885aaa, 1, 1, 1, new THREE.Vector3(-0.5,-0.5,-0.5))
            model = modelCreator.createCube("Маленький товар", 0x885aaa, 16, 16, 16, new THREE.Vector3(0,8-2,0))
            //model = modelCreator.createCube("Большой товар", 0x885aaa, 30, 80, 36, new THREE.Vector3(0, (80/2-1), 0))
            // model = modelCreator.createShelter("Маленькая полка", 0x885aaa, 50, 50, 50, 5, new THREE.Vector3(0, -25, -25))
            // model = modelCreator.createShelter("Высокая полка", 0x885aaa, 50, 100, 50, 5, new THREE.Vector3(0, -25, -25))
            // model = modelCreator.createShelter("Большая полка", 0x885aaa, 150, 100, 50, 5, new THREE.Vector3(0, -25, -25))
            // model = modelCreator.createShelter("Широкая полка", 0x885aaa, 150, 50, 50, 5, new THREE.Vector3(0, -1, -25))
            createHint()
            warehouseGeneration(warehouseSettings, racksType)
        }
        let fontWeight = 'regular';
        //fontWeight = 'bold';
        let fontName = 'helvetiker' // helvetiker, optimer, gentilis, droid sans, droid serif
        var loader = new FontLoader(manager);
        loader.load('https://threejs.org/examples/fonts/droid/droid_serif_bold.typeface.json', function(response) {
            font = response;
        });
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
                    <div style={{display: "table-cell", width: "auto", height: "auto", verticalAlign: "middle"}}>
                        <button id="btn_viewMode" type="button" className="collapsible" style={{width: "80px", height: "28px"}}>Вид</button>
                    </div>
                </div>
                <div id="warehouseSceneWrap">
                    <div id="warehouseScene" onContextMenu={(e)=> e.preventDefault()}/>
                </div>

                <DropdownListWithModels setModel={setModel}/>
                
        </>
        )
    }
}

export default StorekeeperVirtualWarehouse