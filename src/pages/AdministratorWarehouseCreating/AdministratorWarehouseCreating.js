import { React, Component, Fragment } from "react";
import './AdministratorWarehouseCreating.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import SideBlock from "../../components/SideBlock/SideBlock";
import UniversalTabHolder from '../../components/TabHolders/UniversalTabHolder/UniversalTabHolder';
import { TableComponent } from "../../components/Table/TableComponent";
import InputText from "../../components/InputText/InputText";
import ExpandListInput from "../../components/ExpandListInput/ExpandListInput";
import AlertMessagebox from "../../components/Messagebox/AlertMessagebox.js";
import ModelList from "../../components/List/ModelList";
import ModelCreator from "../../classes/ModelCreator.js";
import { MOUSE, Vector2, Vector3 } from "three";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

import AuxiliaryMath from "../../classes/AuxiliaryMath.js";
import WarehouseSettingsModel from "../../classes/WarehouseSettingsModel.js";
import FirstPersonControls from "../../classes/FirstPersonControls.js";
import zIndex from "@material-ui/core/styles/zIndex";

import { Api } from "../../api/administatoApi"

var api = new Api()
const styles = {

  }

let modelCreator = new ModelCreator()
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

const objects = [];
let zones = []
let racks = []

//let editingMod = "viewing" //viewing, adding, deleting /change mode of interacting with models

let selectionLockedModels = [""] //models locked for selecting them

let hintModel = undefined; //currently placed hint model
let specificHintModel = undefined; //currently placed hint model
let zoneHintMesh = undefined; //currently placed hint model
let rackHintMesh = undefined; //currently placed hint model

let racksLimiterLines = []; //currently placed hint model

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
    // sceneMarginTop = document.getElementById('toolbar').offsetTop + document.getElementById('toolbar').offsetHeight -1
    sceneMarginTop = document.getElementById('warehouseSceneWrap').offsetTop -1
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
let lastIntersect = undefined
let lastCheckOnIntersection = undefined

function onDocumentKeyDown( event ) {
    event.preventDefault()
    if (!pressedKeys.includes(event.keyCode))
        pressedKeys.push(event.keyCode)

    switch ( event.keyCode ) {
        case 16:{
            if (isShiftDown==false){
                isShiftDown = true;
                if (page.state.panelSelTab.id==2 && page.state.selectedZone!=undefined && page.state.installedModel!=undefined) {
                    pointer.set(getScreenX(lastX), getScreenY(lastY));
                    raycaster.setFromCamera( pointer, camera );
                    const intersects = raycaster.intersectObjects( scene.children );
                    let intersect = findIntersectedFloorOrZone(intersects);
                    if (intersect!=undefined){
                        let checkOnIntersectionBuf = checkOnIntersection(racks, page.state.installedModel.mesh.position.copy( intersect.point ), page.state.installedModel.width, page.state.installedModel.depth, page.state.installedModel.freeSpaceX, page.state.installedModel.freeSpaceY)
                        if (
                            specificHintModel==undefined && page.state.installedModel!=undefined || 
                            page.state.installedModel!=undefined && page.state.installedModel.name != specificHintModel.mesh.name ||
                            lastIntersect.object.type!=intersect.object.type ||
                            checkOnIntersectionBuf.check != lastCheckOnIntersection
                        ) {
                            if (specificHintModel != undefined) {
                                scene.remove(specificHintModel.mesh)
                                specificHintModel = undefined
                                if (racksLimiterLines!=undefined) {
                                    racksLimiterLines.map(line=>{
                                        line.intersectedElm.remove(line.limiterLineModel)
                                    })
                                    racksLimiterLines = []
                                }
                            }
                            if (!checkOnIntersectionBuf.check && intersect.object.type=="zone" && intersect.object.userData.id == page.state.selectedZone.userData.id){
                                createSpecificHint(new THREE.Mesh( 
                                    page.state.installedModel.geometry, 
                                    page.state.installedModel.material
                                ))
                            }
                            if (checkOnIntersectionBuf.check || (intersect.object.userData.id != page.state.selectedZone.userData.id && intersect.object.type=="zone") || intersect.object.type!="zone"){
                                createSpecificHint(new THREE.Mesh( 
                                    page.state.installedModel.geometry, 
                                    new THREE.MeshBasicMaterial({ color: 0xff0000, opacity: 0.3, transparent: true })
                                ))
                                if (checkOnIntersectionBuf.intersectedIdArr != ""){
                                    let limiterLineModel = modelCreator.createSpacelimiterBorder(
                                        page.state.installedModel.width, 
                                        page.state.installedModel.depth, 
                                        page.state.installedModel.freeSpaceX, 
                                        page.state.installedModel.freeSpaceY,
                                        new Vector3(0,0,page.state.installedModel.depth/2),
                                        { color: 0xff0000, opacity: 1, transparent: false },
                                    )
                                    specificHintModel.mesh.add(limiterLineModel.mesh)
                                    checkOnIntersectionBuf.intersectedIdArr.map(rackId=>{
                                        console.log("rackId")
                                        console.log(rackId)
                                        console.log(scene.children)

                                        let intersectedElm = page.getSceneElmByIdAndType(rackId, "rack")

                                        let rackType = page.state.racksType[`rack_${intersectedElm.userData.racksTypeId}`]
                                        let limiterLineModel = modelCreator.createSpacelimiterBorder(
                                            rackType.shelfWidth*rackType.columsAmount + rackType.borderWidth*(rackType.columsAmount+1), 
                                            rackType.depth, 
                                            rackType.freeSpaceX, 
                                            rackType.freeSpaceY,
                                            new Vector3(0,1,rackType.depth/2),
                                            { color: 0xff0000, opacity: 0.3, transparent: true },
                                        )
                                        intersectedElm.add(limiterLineModel.mesh)
                                        console.log(intersectedElm.userData)
                                        racksLimiterLines.push({intersectedElm: intersectedElm, limiterLineModel: limiterLineModel.mesh})
                                    })
                                }
                            }

                            if (intersect!=undefined && specificHintModel!=undefined){
                                animateSpecificHint(intersect)
                                lastIntersect = intersect
                            }
                        }
                        lastCheckOnIntersection = checkOnIntersectionBuf.check
                    }
                    render()
                }
                if (page.state.panelSelTab.id==1 && page.state.installedModel!=undefined) {
                    pointer.set(getScreenX(lastX), getScreenY(lastY));
                    raycaster.setFromCamera( pointer, camera );
                    const intersects = raycaster.intersectObjects( scene.children );
                    let intersect = findIntersectedFloorOrZone(intersects)
                    if (intersect!=undefined){
                        let checkOnIntersectionBuf = checkOnIntersection(zones, page.state.installedModel.mesh.position.copy( intersect.point ), page.state.installedModel.width, page.state.installedModel.depth).check
                        if (specificHintModel==undefined && page.state.installedModel!=undefined || 
                            page.state.installedModel!=undefined && page.state.installedModel.name != specificHintModel.mesh.name ||
                            lastIntersect.object.type!=intersect.object.type ||
                            checkOnIntersectionBuf != lastCheckOnIntersection
                        ) {
                            if (specificHintModel != undefined) {
                                scene.remove(specificHintModel.mesh)
                                specificHintModel = undefined
                            }
                            if (!checkOnIntersectionBuf)
                                createSpecificHint(createZone(page.state.installedModel))
                            else
                                createSpecificHint(createZone(page.state.installedModel, new THREE.LineBasicMaterial({ color: 0xff0000, opacity: 0.3, transparent: true })))
                        }
                        if (intersect!=undefined){
                            lastIntersect = intersect
                            if (specificHintModel!=undefined){
                                animateSpecificHint(intersect)
                            }
                        } else if (specificHintModel != undefined) {
                            scene.remove(specificHintModel.mesh)
                            specificHintModel = undefined
                        }
                        lastCheckOnIntersection = checkOnIntersectionBuf
                    }
                    render()
                }
            }
            break;
        } 
        case 17: isCtrlDown = true; break;
    }
}

function createZone(zone, lineMaterial){
    let zoneModel = new THREE.Mesh()
    zone.lines.map(line=>{
        if (lineMaterial!=undefined) zoneModel.add(new THREE.Line(line.geometry, lineMaterial));
        else zoneModel.add(new THREE.Line(line.geometry, line.material))
    })
    zone.text.map( text=>{
        let textMesh = new THREE.Mesh(text.geometry, text.material)
        textMesh.position.set(text.position.x, text.position.y, text.position.z);
        zoneModel.add(textMesh)
    })
    return zoneModel
}

function onDocumentKeyUp( event ) {
    event.preventDefault()
    if (pressedKeys.includes(event.keyCode))
        pressedKeys.splice(pressedKeys.indexOf(event.keyCode), 1);

    switch ( event.keyCode ) {
        case 16:{ 
            isShiftDown = false;
            if (specificHintModel!=undefined){
                scene.remove(specificHintModel.mesh)
                specificHintModel = undefined
            }
            if (racksLimiterLines!=undefined) {
                racksLimiterLines.map(line=>{
                    line.intersectedElm.remove(line.limiterLineModel)
                })
                racksLimiterLines = []
            }
            render()
            break;
        }
        case 17: isCtrlDown = false; break;
    }
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
        let intersect = intersects[0];

        //----------------------------------------------------------------------------------------------------------page 0
        if (intersect!=undefined && page.state.panelSelTab.id==0 && intersect.object.type != "Line") {
            if (intersect.object != undefined && !selectionLockedModels.includes(intersect.object.name) && !mouseRightButton && !mouseLeftButton && 
            (hintModel == undefined || (intersect.object.userData.id != hintModel.userData.id && intersect.object.type == hintModel.userData.type)) &&
            (page.state.selectedZone==undefined || page.state.selectedZone.name!=intersect.object.name) &&
            ((page.state.selectedRack==undefined || page.state.selectedRack.name!=intersect.object.name))
            ) {
                if (hintModel != undefined) {
                    scene.remove(hintModel.mesh)
                    hintModel = undefined
                }
                createHintOnModel(intersect.object);
                animateHintOnModel(intersect.object);
            }
            if (hintModel != undefined && (intersect.object.userData.id != hintModel.userData.id || intersect.object.type != hintModel.userData.type)) {
                scene.remove(hintModel.mesh)
                hintModel = undefined
            }
        }
        //----------------------------------------------------------------------------------------------------------page 1
        if (page.state.panelSelTab.id==1 && intersect.object.type != "Line" && page.state.installedModel!=undefined && isShiftDown && !isCtrlDown){
                intersect = findIntersectedFloorOrZone(intersects)
                //-------------- 
                if (intersect!=undefined){
                    let checkOnIntersectionBuf = checkOnIntersection(zones, page.state.installedModel.mesh.position.copy( intersect.point ), page.state.installedModel.width, page.state.installedModel.depth).check
                    if (intersect!=undefined && (
                        (specificHintModel==undefined && page.state.installedModel!=undefined) || 
                        (page.state.installedModel!=undefined && page.state.installedModel.name != specificHintModel.mesh.name) ||
                        (lastIntersect.object.type!=intersect.object.type) ||
                        checkOnIntersectionBuf != lastCheckOnIntersection
                        )) {
                        if (specificHintModel != undefined) {
                            scene.remove(specificHintModel.mesh)
                            specificHintModel = undefined
                        }
                        //console.log()
                        if (!checkOnIntersectionBuf)
                            createSpecificHint(createZone(page.state.installedModel))
                        else
                            createSpecificHint(createZone(page.state.installedModel, new THREE.LineBasicMaterial({ color: 0xff0000, opacity: 0.3, transparent: true })))
                        //animateSpecificHint(intersect)
                        lastIntersect = intersect
                        lastCheckOnIntersection = checkOnIntersectionBuf
                    }
                }
                if (intersect!=undefined){
                    lastIntersect = intersect
                    if (specificHintModel!=undefined){
                        animateSpecificHint(intersect)
                    }
                } else if (specificHintModel != undefined) {
                    scene.remove(specificHintModel.mesh)
                    specificHintModel = undefined
                }
                //------------------
        }
        //----------------------------------------------------------------------------------------------------------page 2
        if (intersect!=undefined && page.state.panelSelTab.id==2 && intersect.object.type != "Line"){
            if (intersect.object.type == "zone" && (page.state.selectedZone==undefined || intersect.object.userData.id != page.state.selectedZone.userData.id) && (hintModel == undefined || (intersect.object.userData.id != hintModel.userData.id && intersect.object.type == hintModel.userData.type)) && !isShiftDown) {
                if (hintModel != undefined) {
                    scene.remove(hintModel.mesh)
                    hintModel = undefined
                }
                createHintOnModel(intersect.object);
                animateHintOnModel(intersect.object);
            }
            if (hintModel != undefined && (intersect.object.userData.id != hintModel.userData.id || intersect.object.type != hintModel.userData.type)) {
                scene.remove(hintModel.mesh)
                hintModel = undefined
            }

            if (page.state.selectedZone!=undefined && isShiftDown && !isCtrlDown) {
                intersect = findIntersectedFloorOrZone(intersects)
                if (intersect!=undefined && page.state.installedModel!=undefined){
                    let checkOnIntersectionBuf = checkOnIntersection(racks, page.state.installedModel.mesh.position.copy( intersect.point ), page.state.installedModel.width, page.state.installedModel.depth, page.state.installedModel.freeSpaceX, page.state.installedModel.freeSpaceY)
                    if (specificHintModel==undefined && page.state.installedModel!=undefined || 
                        page.state.installedModel!=undefined && page.state.installedModel.name != specificHintModel.mesh.name ||
                        lastIntersect.object.type!=intersect.object.type ||
                        checkOnIntersectionBuf.check != lastCheckOnIntersection
                    ) {
                        if (specificHintModel != undefined) {
                            scene.remove(specificHintModel.mesh)
                            specificHintModel = undefined
                            if (racksLimiterLines!=undefined) {
                                racksLimiterLines.map(line=>{
                                    line.intersectedElm.remove(line.limiterLineModel)
                                })
                                racksLimiterLines = []
                            }
                        }
                        if (!checkOnIntersectionBuf.check && intersect.object.type=="zone" && intersect.object.userData.id == page.state.selectedZone.userData.id){
                            createSpecificHint(new THREE.Mesh( 
                                page.state.installedModel.geometry, 
                                page.state.installedModel.material
                            ))
                        }
                        if (checkOnIntersectionBuf.check || (intersect.object.userData.id != page.state.selectedZone.userData.id && intersect.object.type=="zone") || intersect.object.type!="zone"){
                            createSpecificHint(new THREE.Mesh(
                                page.state.installedModel.geometry,
                                new THREE.MeshBasicMaterial({ color: 0xff0000, opacity: 0.3, transparent: true })
                            ))
                            if (checkOnIntersectionBuf.intersectedIdArr != ""){
                                let limiterLineModel = modelCreator.createSpacelimiterBorder(
                                    page.state.installedModel.width, 
                                    page.state.installedModel.depth, 
                                    page.state.installedModel.freeSpaceX, 
                                    page.state.installedModel.freeSpaceY,
                                    new Vector3(0,0,page.state.installedModel.depth/2),
                                    { color: 0xff0000, opacity: 1, transparent: false },
                                )
                                specificHintModel.mesh.add(limiterLineModel.mesh)
                                checkOnIntersectionBuf.intersectedIdArr.map(rackId=>{
                                    console.log("rackId2")
                                    console.log(rackId)
                                    let intersectedElm = page.getSceneElmByIdAndType(rackId, "rack")
                                    let rackType = page.state.racksType[`rack_${intersectedElm.userData.racksTypeId}`]
                                    let limiterLineModel = modelCreator.createSpacelimiterBorder(
                                        rackType.shelfWidth*rackType.columsAmount + rackType.borderWidth*(rackType.columsAmount+1), 
                                        rackType.depth, 
                                        rackType.freeSpaceX, 
                                        rackType.freeSpaceY,
                                        new Vector3(0,1,rackType.depth/2),
                                        { color: 0xff0000, opacity: 0.3, transparent: true },
                                    )
                                    intersectedElm.add(limiterLineModel.mesh)
                                    console.log(intersectedElm.userData)
                                    racksLimiterLines.push({intersectedElm: intersectedElm, limiterLineModel: limiterLineModel.mesh})
                                })
                            }
                        }
                    }
                    if (intersect!=undefined){
                        lastIntersect = intersect
                        if (specificHintModel!=undefined){
                            animateSpecificHint(intersect)
                        }
                    } else if (specificHintModel != undefined) {
                        scene.remove(specificHintModel.mesh)
                        specificHintModel = undefined
                    }
                    lastCheckOnIntersection = checkOnIntersectionBuf.check
                }
            }
        }
    }
    render();
}

function checkOnIntersection(objects, centerPoint, width, length, freeSpaceX, freeSpaceY){
    let check = false
    let intersectedIdArr=[]
    objects.map(obj=>{
        if (freeSpaceX!=undefined){
            if (
                (
                    Math.abs(obj.centerPoint.x - centerPoint.x)<Math.max(obj.width/2+obj.freeSpaceX+width/2,obj.width/2+width/2+freeSpaceX) && 
                    Math.abs(obj.centerPoint.z - centerPoint.z)<Math.max(obj.length/2+obj.freeSpaceY+length/2,obj.length/2+length/2+freeSpaceY)
                )
            ) {
                check=true
                intersectedIdArr.push(obj.id)
            }
        }
        else {
            if (Math.abs(obj.centerPoint.x - centerPoint.x)<obj.width/2+width/2 && Math.abs(obj.centerPoint.z - centerPoint.z)<obj.length/2+length/2) check=true
        }
        
    })
    return {check: check, intersectedIdArr: intersectedIdArr}
}

function findIntersectedFloorOrZone(intersects){
    let intersect = undefined
    for (let i=0;i<intersects.length;i++){
        if (intersects[i].object.name != ""){
            if (intersects[i].object.type == "zone"){
                intersect = intersects[i]
                break;
            }
            if (intersects[i].object.type == "floor"){
                intersect = intersects[i]
                break;
            }
        }
    }
    if (intersect!=undefined && intersect.object.name == "") intersect = undefined
    return intersect
}

function createHintOnModel(mesh){
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
        userData:{}
    }
    hintModel.mesh.rotation.set(mesh.rotation.x, mesh.rotation.y, mesh.rotation.z)
    hintModel.mesh.visible = false
    hintModel.userData = mesh.userData
    scene.add( hintModel.mesh );
}

function createSpecificHint(mesh, material){
    specificHintModel = {
        name: page.state.installedModel.name, 
        modelName: "specificHint",
        material: material, 
        geometry: page.state.installedModel.geometry, 
        mesh: mesh, 
        translation: page.state.installedModel.translation,
    }
    //hintModel.mesh.rotation.set(mesh.rotation.x, mesh.rotation.y, mesh.rotation.z)
    specificHintModel.mesh.visible = false
    specificHintModel.mesh.name = page.state.installedModel.name
    scene.add( specificHintModel.mesh );
}

function animateHintOnModel(mesh) {
    hintModel.mesh.position.set(
        mesh.position.x, 
        mesh.position.y, 
        mesh.position.z
    )
    if (!hintModel.mesh.visible) hintModel.mesh.visible = true
}

function animateSpecificHint(intersect){
    specificHintModel.mesh.position.copy( intersect.point ).add( intersect.face.normal );
    specificHintModel.mesh.position.divideScalar(1).floor().multiplyScalar(1).addScalar( 1 );
    specificHintModel.mesh.position.set(
        specificHintModel.mesh.position.x + specificHintModel.translation.x, 
        specificHintModel.mesh.position.y + specificHintModel.translation.y, 
        specificHintModel.mesh.position.z + specificHintModel.translation.z
    )
    if (!specificHintModel.mesh.visible) specificHintModel.mesh.visible = true
}
//#endregion

//#region create a model on click
function onPointerDown( event ) {
    pointer.set(getScreenX(event.clientX), getScreenY(event.clientY));
    raycaster.setFromCamera( pointer, camera );
    let intersects = raycaster.intersectObjects( scene.children );
    //----------------------------------------------------------------------------------------------------------page 0
    if (intersects.length > 0 && hintModel!=undefined && page.state.panelSelTab.id==0 ) {
        let intersect = intersects[0];

        if (intersect.object.type == "zone") selectZone(intersect)
        if (intersect.object.type == "rack" && page.state.panelSelTab.id==0) selectRack(intersect)
        
        render();
    }
    //----------------------------------------------------------------------------------------------------------page 1
    if (intersects.length > 0 && page.state.panelSelTab.id==1 && page.state.installedModel!=undefined && specificHintModel!=undefined) {
        let intersect = intersects[0];
        let checkOnIntersectionBuf = checkOnIntersection(zones, page.state.installedModel.mesh.position.copy( intersect.point ), page.state.installedModel.width, page.state.installedModel.depth).check
        if (!checkOnIntersectionBuf){
            //let intersect = findIntersectedFloorOrZone(intersects)
            let zoneBorderModel = createZone(page.state.installedModel)
            let userData = {
                name:"???????? -",
                id: page.getLastIdByType(scene, "zone")+1,
                centerPoint:new Vector3(
                    specificHintModel.mesh.position.x - specificHintModel.translation.x, 
                    0, 
                    specificHintModel.mesh.position.z - specificHintModel.translation.z
                ),
                rotation:{x:0,y:0,z:0},
                zoneTypeId: page.state.installedModel.name,
                type:"zone",
                racks:[],
            }
            zoneBorderModel.userData = userData
            let zoneType = page.state.zonesType[`zone_${page.state.installedModel.name}`]
            let zoneFillModel = modelCreator.zoneFillModel(`${userData.name}_fillament`, zoneType.color, zoneType.width, zoneType.length, zoneType.lineWidth, zoneType.chamferLendth, new Vector3(0,0,0))
            zoneFillModel.userData = userData
            setModelOnCoordinates(
                {mesh:zoneBorderModel,
                translation:new Vector3(0,0,0),
                name: specificHintModel.mesh.userData.name + " " + specificHintModel.mesh.userData.id,
                }, 
                userData.centerPoint,
                // new Vector3(
                //     specificHintModel.mesh.position.x, 
                //     specificHintModel.mesh.position.y, 
                //     specificHintModel.mesh.position.z
                // ),
                "zone"
            )
            zoneFillModel.mesh.userData = userData
            zoneFillModel.mesh.userData.borderModel = zoneBorderModel
            setModelOnCoordinates(zoneFillModel, userData.centerPoint, userData.type)

            page.state.warehouseSettings.zones.push(userData)
            zones.push({id:userData.id, centerPoint:userData.centerPoint, width:zoneType.width, length:zoneType.length})
            api.postZones(userData)
            render();
        }
    }
    //----------------------------------------------------------------------------------------------------------page 2
    if (intersects.length > 0 && page.state.panelSelTab.id==2) {
        let intersect = findIntersectedFloorOrZone(intersects)
        if (intersect!=undefined && page.state.installedModel!=undefined){
            let checkOnIntersectionBuf = checkOnIntersection(racks, page.state.installedModel.mesh.position.copy( intersect.point ), page.state.installedModel.width, page.state.installedModel.depth).check
            if (!checkOnIntersectionBuf && page.state.selectedZone!=undefined && ((intersect.object.type == page.state.selectedZone.userData.type && intersect.object.userData.id == page.state.selectedZone.userData.id)) && isShiftDown && !isCtrlDown) {
                let newObject = new THREE.Mesh( 
                    page.state.installedModel.geometry, 
                    page.state.installedModel.material
                )
                newObject.userData = {
                    name:"?????????????? -",
                    id: page.getLastIdByType(scene, "rack")+1,
                    centerPoint:new Vector3(
                        specificHintModel.mesh.position.x - page.state.selectedZone.userData.centerPoint.x - specificHintModel.translation.x, 
                        2, 
                        specificHintModel.mesh.position.z - page.state.selectedZone.userData.centerPoint.z - specificHintModel.translation.z
                    ),
                    rotation:{
                        x:0,
                        y:0,
                        z:0
                    },
                    racksTypeId: page.state.installedModel.name,
                    type:"rack",
                    shelfs:page.generateShelfsByRackType(page.state.installedModel.name, page.state.racksType, page.getLastShelfIdByType(scene)+1)
                }
                newObject.type = "rack"
                page.state.selectedZone.userData.racks.push(newObject.userData)
            
                let rackType = page.state.racksType[`rack_${page.state.installedModel.name}`]
                racks.push({
                    id:newObject.userData.id,
                    centerPoint:new Vector3(
                        specificHintModel.mesh.position.x - specificHintModel.translation.x, 
                        2, 
                        specificHintModel.mesh.position.z - specificHintModel.translation.z
                    ), 
                    width:rackType.shelfWidth*rackType.columsAmount + rackType.borderWidth*(rackType.columsAmount+1), 
                    length:rackType.depth,
                    freeSpaceX: rackType.freeSpaceX,
                    freeSpaceY: rackType.freeSpaceY,
                })
                setModelOnCoordinates(
                    {mesh:newObject,
                    translation:new Vector3(0,0,0),
                    name:newObject.userData.name + " " + newObject.userData.id,
                    }, 
                    new Vector3(
                        specificHintModel.mesh.position.x, 
                        specificHintModel.mesh.position.y, 
                        specificHintModel.mesh.position.z
                    ),
                    "rack"
                )

                api.postRacks(newObject.userData, page.state.selectedZone)
            }
        }
        if (intersect.object.type == "zone" && (page.state.selectedZone==undefined || intersect.object.userData.id != page.state.selectedZone.userData.id) && !isShiftDown && !isCtrlDown) selectZone(intersect)
        render();
    }
}

function selectZone(intersect){
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

function selectRack(intersect){
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

function addHintOnScene(mesh){
    const voxel = new THREE.Mesh( mesh.geometry, new THREE.MeshBasicMaterial( { color: 0x90EE90, opacity: 0.1, transparent: true } ));
    // voxel.position.copy( intersect.point ).add( intersect.face.normal );
    // voxel.position.divideScalar( 1 ).floor().multiplyScalar( 1 ).addScalar( 1 );
    voxel.position.set(
        mesh.position.x, 
        mesh.position.y, 
        mesh.position.z
    )
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
    objects.push(voxel)
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
    // //grid
    // const gridHelper = new THREE.GridHelper( Math.max(warehouseSettings.width, warehouseSettings.length), Math.max(warehouseSettings.width, warehouseSettings.length) );
    // scene.add( gridHelper );

    let floorModel = modelCreator.createFloor("Floor", 0x808080, warehouseSettings.width, warehouseSettings.length, 4, new Vector3(0,-2,0))
    setModelOnCoordinates(floorModel, new Vector3(0,0,0), "floor")
    selectionLockedModels.push(floorModel.name)
}

function addZoneOnScene(zone, zonesType){  
    let zoneType = zonesType[`zone_${zone.zoneTypeId}`]
    console.log(zoneType)
    console.log(zone.zoneTypeId)
    console.log(zonesType)
    let zoneBorderModel = modelCreator.createZoneBorder(zone.name, zoneType.color, zoneType.width, zoneType.length, zoneType.lineWidth, zoneType.chamferLendth, zoneType.message, zoneType.messageAlighment, font, zoneType.textSize, zoneType.gapLengthX, zoneType.gapLengthY, new Vector3(0,0,0))
    let zoneFillModel = modelCreator.zoneFillModel(`${zone.name}_fillament`, zoneType.color, zoneType.width, zoneType.length, zoneType.lineWidth, zoneType.chamferLendth, new Vector3(0,0,0))
    zoneBorderModel.mesh = auxMath.rotateMeshOnAllAxis(zoneBorderModel.mesh, zone.rotation)
    zoneFillModel.mesh = auxMath.rotateMeshOnAllAxis(zoneFillModel.mesh, zone.rotation)
    zoneFillModel.mesh.userData = zone
    zoneFillModel.mesh.userData.borderModel = zoneBorderModel.mesh
    setModelOnCoordinates(zoneBorderModel, zone.centerPoint, zone.type)
    setModelOnCoordinates(zoneFillModel, zone.centerPoint, zone.type)
    selectionLockedModels.push(zone.name)
    zones.push({id:zone.id, centerPoint:zone.centerPoint, width:zoneType.width, length:zoneType.length})
    return zoneFillModel.mesh
}

function addRackWithGoodsOnScene(zone, rack, racksType, goodsType){
    let rackType = racksType[`rack_${rack.racksTypeId}`]
    console.log('racksType')
    console.log(racksType)
    console.log(rackType)
    let rackModel = modelCreator.createRack(rack.name+" "+rack.id, rackType.color, rackType.shelfWidth, rackType.shelfHeight, rackType.depth, rackType.columsAmount, rackType.rowsAmount, rackType.borderWidth, rackType.translation)
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
    rackModel.mesh = auxMath.rotateMeshOnAllAxis(rackModel.mesh, auxMath.sumRotations([zone.rotation, rack.rotation]))
    
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
            // let rotatedRackCenterGlobalCoordinate = auxMath.rotatePointAroundAxisMass(
            //     rackCenterGlobalCoordinate.clone(), 
            //     auxMath.translatePoint(zone.centerPoint.clone(), {x:-rackType.translation.x,y:-rackType.translation.y,z:-rackType.translation.z}), 
            //     zone.rotation
            // )

            let good = shelf.space[0]
            let goodType = goodsType[`good_${good.goodTypeId}`]
            let goodModel = modelCreator.createCube(good.name, goodType.color, goodType.width, goodType.height, goodType.depth, goodType.translation)
            goodModel.mesh.userData.space = shelf.space
            
            let firstShelfCenterGlobalCoordinate = new Vector3(
                rackCenterGlobalCoordinate.x-((rackType.shelfWidth*rackType.columsAmount + rackType.borderWidth*(rackType.columsAmount+1))/2 - (rackType.shelfWidth/2 + rackType.borderWidth) ),
                rackCenterGlobalCoordinate.y + rackType.borderWidth*2,
                rackCenterGlobalCoordinate.z
            )
            console.log("shelf")
            console.log(shelf)
            console.log(rackType)
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
        }
    })
    setModelOnCoordinates(
        rackModel, 
        rotatedRackCenterGlobalCoordinate,
        rack.type
    )
    selectionLockedModels.push(rack.name+" "+rack.id)

    racks.push({
        id:rack.id, 
        centerPoint:new Vector3(
            zone.centerPoint.x + rack.centerPoint.x, 
            zone.centerPoint.y + rack.centerPoint.y, 
            zone.centerPoint.z + rack.centerPoint.z
        ), 
        width: rackModel.width, 
        length: rackModel.depth,
        freeSpaceX: rackType.freeSpaceX,
        freeSpaceY: rackType.freeSpaceY,
    })
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
            //?????????????????? ????????????
            zonesType: undefined,
            racksType: undefined,
            goodsType: undefined,
            warehouseSettings: undefined,
            //???????? toolbar'a
            // tabs:[
            //     {id:0, title:"??????", func:()=>{onChangeViewMode()}, selection:false, style:{fontSize:"15px", height:"20px"}},
            //     // {id:1, title:"???????? ????????????????", func:()=>{this.flickPanel()}, selection:false, style:{fontSize:"15px", height:"20px"}}
            // ],
            // selTab: {id:0},
            //???????? ???????????????????? ????????????????
            panelTabs:[
                {id:0, title:"????????????????????????????", func:()=>{}, selection:true, style:{fontSize:"15px", height:"20px"}},
                {id:1, title:"???????????????????? ????????", func:()=>{}, selection:true, style:{fontSize:"15px", height:"20px"}},
                {id:2, title:"???????????????????? ????????????????", func:()=>{}, selection:true, style:{fontSize:"15px", height:"20px"}}
            ],
            panelSelTab: {id:0},
            isSideBlockOpened:false,
            warehouseWidth:undefined, //??????-???? ????????????
            warehouseLength:undefined, //??????-???? ????????????
            selectedZone:undefined, //???????????????????? ???????? ????????????
            selectedZoneName:undefined, //??????-???? ???????????????????? ???????? ????????????
            selectedZoneCenterX:undefined, //??????-???? ???????????????????? ???????? ????????????
            selectedZoneCenterZ:undefined, //??????-???? ???????????????????? ???????? ????????????
            selectedZoneRotation:undefined, //??????-???? ???????????????????? ???????? ????????????
            zoneTypeIdExpandList: {value: "????????????????"}, //??????-???? ???????????????????? ???????? ????????????
            selectedZoneTypeId: {value: "0001"},//??????-???? ???????????????????? ???????? ????????????
            selectedRack:undefined, //???????????????????? ??????????????
            selectedRackName:undefined, //??????-???? ?????????????????????? ????????????????
            selectedRackCenterX:undefined, //??????-???? ?????????????????????? ????????????????
            selectedRackCenterZ:undefined, //??????-???? ?????????????????????? ????????????????
            selectedRackRotation:undefined, //??????-???? ?????????????????????? ????????????????
            rackTypeIdExpandList: {value: "????????????????"}, //??????-???? ?????????????????????? ????????????????
            selectedRackTypeId: {value: "0001"},//??????-???? ?????????????????????? ????????????????
            isAlertMessageboxOpened: false,
            installedModel:undefined,
            isAlertMessageboxOpened1: false,
            isAlertMessageboxOpened2: false,
        }
    }

    setReload = ()=>{this.setState({reload: this.state.reload+1});}
    setTableHeaders = (value)=>{this.setState({tableHeaders: value});}  //?????????????? ?? ???????????????????? ?????????? ???? ????????????????
    setTableList = (value)=>{this.setState({tableList: value});}        //?????????????? ?? ???????????????????? ?????????? ???? ????????????????
    setSelectedItem = (value)=>{this.setState({selectedItem: value});}  //?????????????? ?? ???????????????????? ?????????? ???? ????????????????
    // setSelTab = (value)=>{this.setState({selTab: value});}              //???????? toolbar'a
    setPanelSelTab = (value)=>{
        scene.remove(rackHintMesh)
        this.setSelectedRack(undefined)
        this.state.installedModel = undefined
        hintModel=undefined
        render()
        this.setState({panelSelTab: value});
    }                //???????? ???????????????????? ????????????????
    setIsSideBlockOpened = (value)=>{this.setState({isSideBlockOpened: value});}    //???????? ???????????????????? ????????????????
    
    setWarehouseWidth = (value)=>{this.state.warehouseSettings.width = Number(value); this.setState({warehouseWidth: Number(value)});this.recreateFloor()} //??????-???? ????????????
    setWarehouseLength = (value)=>{this.state.warehouseSettings.length = Number(value); this.setState({warehouseLength: Number(value)});this.recreateFloor()} //??????-???? ????????????

    setSelectedZone = (value)=>{this.setState({selectedZone: value})}       //???????????????????? ????????
    setSelectedZoneName = (value)=>{this.state.selectedZone.userData.name = value; this.setState({selectedZoneName: value});this.recreateZone()}       //??????-???? ???????????????????? ????????
    setSelectedZoneCenterX = (value)=>{this.state.selectedZone.userData.centerPoint.x = Number(value); this.setState({selectedZoneCenterX: Number(value)});this.recreateZone()}     //??????-???? ???????????????????? ????????
    setSelectedZoneCenterZ = (value)=>{this.state.selectedZone.userData.centerPoint.z = Number(value); this.setState({selectedZoneCenterZ: Number(value)});this.recreateZone()}     //??????-???? ???????????????????? ????????
    setSelectedZoneRotation = (value)=>{this.state.selectedZone.userData.rotation.y = Number(value); this.setState({selectedZoneRotation: Number(value)});this.recreateZone()}   //??????-???? ???????????????????? ????????
    setZoneTypeIdExpandList = (value)=>{this.setState({zoneTypeIdExpandList: value});}       //??????-???? ???????????????????? ????????
    setSelectedZoneTypeId = (value)=>{this.state.selectedZone.userData.zoneTypeId = value; this.setState({selectedZoneTypeId: value});this.recreateZone()}       //??????-???? ???????????????????? ????????

    setSelectedRack = (value)=>{this.setState({selectedRack: value});}       //???????????????????? ??????????????
    setSelectedRackName = (value)=>{this.state.selectedRack.userData.name = value; this.setState({selectedRackName: value});this.recreateRack(false)}       //??????-???? ?????????????????????? ????????????????
    setSelectedRackCenterX = (value)=>{this.state.selectedRack.userData.centerPoint.x = Number(value); this.setState({selectedRackCenterX: Number(value)});this.recreateRack(false)}     //??????-???? ?????????????????????? ????????????????
    setSelectedRackCenterZ = (value)=>{this.state.selectedRack.userData.centerPoint.z = Number(value); this.setState({selectedRackCenterZ: Number(value)});this.recreateRack(false)}     //??????-???? ?????????????????????? ????????????????
    setSelectedRackRotation = (value)=>{this.state.selectedRack.userData.rotation.y = Number(value); this.setState({selectedRackRotation: Number(value)});this.recreateRack(false)}   //??????-???? ?????????????????????? ????????????????
    setRackTypeIdExpandList = (value)=>{this.setState({rackTypeIdExpandList: value});}   //??????-???? ?????????????????????? ????????????????
    
    setSelectedRackTypeId = (value)=>{
        let check = this.checkSelectedRackOnGoods()
        if (!check){
            this.state.selectedRack.userData.racksTypeId = value; 
            this.recreateRack(true)
        }
        if (check){
            this.selectedRackTypeIdBuf = value; 
            this.selectedRackTypeIdLast = this.state.selectedRackTypeId; 
            this.setState({selectedRackTypeId: value}); 
            this.setState({isAlertMessageboxOpened: true});
        }
    }       //??????-???? ?????????????????????? ????????????????
    setSelectedRackTypeIdFromBuf = ()=>{ 
        this.state.selectedRack.userData.racksTypeId = this.selectedRackTypeIdBuf; 
        this.recreateRack(true)
    }       //??????-???? ?????????????????????? ????????????????

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
        let newZoneBuf = undefined
        this.state.warehouseSettings.zones.map(zone=>{
            if (zone.id === this.state.selectedZone.userData.id && zone.type === "zone"){
                let newZoneObj = this.getSceneElmByIdAndType(zone.id, "zone")
                console.log(newZoneObj.userData)
                let newZone = newZoneObj.userData
                newZoneBuf = newZone
                scene.remove(newZoneObj)
                scene.remove(newZone.borderModel)
                newZone.racks.map(rack=>{
                        let rackObj = this.getSceneElmByIdAndType(rack.id, "rack")
                        if (rackObj.userData.goodsModels!=undefined)
                        rackObj.userData.goodsModels.map(goodObj=>{
                            scene.remove(goodObj)
                        })
                        scene.remove(rackObj)
                        addRackWithGoodsOnScene(zone, rack, this.state.racksType, this.state.goodsType)
                })
                
                newZoneMesh = addZoneOnScene(newZone, this.state.zonesType)
                for(let i=0;i<zones.length;i++){
                    if (zones[i].id == newZoneMesh.userData.id) {
                        let zoneType = this.state.zonesType[`zone_${newZone.zoneTypeId}`]
                        zones[i].centerPoint = newZoneMesh.userData.centerPoint
                        zones[i].width = zoneType.width
                        zones[i].length = zoneType.length
                        break;
                    }
                }
                return newZone
            }
            return zone
        })
        scene.remove(zoneHintMesh)
        zoneHintMesh = addHintOnScene(newZoneMesh)
        api.updateZones(newZoneBuf)
        if (rackHintMesh!=undefined && this.state.selectedRack!=undefined){
            newRackMesh=this.getSceneElmByIdAndType(this.state.selectedRack.userData.id, "rack")
            scene.remove(rackHintMesh)
            rackHintMesh = addHintOnScene(newRackMesh)
        }
        render()
    }

    recreateRack=(isTypeChanged)=>{
        let newRackBuf = undefined
        this.state.warehouseSettings.zones.map(zone=>{
            if (zone.id === this.state.selectedZone.userData.id && zone.type === "zone"){
                let newZoneObj = this.getSceneElmByIdAndType(zone.id, "zone")
                let newZone = newZoneObj.userData
                newZone.racks = newZone.racks.map(rack=>{
                    if (rack.id === this.state.selectedRack.userData.id && rack.type === "rack"){
                        let newRackObj = this.getSceneElmByIdAndType(rack.id, "rack")
                        let newRack = newRackObj.userData
                        newRackBuf = newRack
                        if (newRackObj.userData.goodsModels!=undefined) {
                            newRackObj.userData.goodsModels.map(goodObj=>{
                                scene.remove(goodObj)
                            })
                        }
                        
                        scene.remove(newRackObj)
                        if (!isTypeChanged)
                            addRackWithGoodsOnScene(zone, newRack, this.state.racksType, this.state.goodsType)
                        else {
                            newRack.shelfs = this.generateShelfsByRackType(newRack.racksTypeId, this.state.racksType, this.getLastShelfIdByType(scene)+1)
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
        api.updateRacks(newRackBuf)
        let newRackMesh=this.getSceneElmByIdAndType(this.state.selectedRack.userData.id, "rack")
        scene.remove(rackHintMesh)
        rackHintMesh = addHintOnScene(newRackMesh)
        render()
    }

    generateShelfsByRackType=(racksTypeId, racksType, startShelfId)=>{
        let rackType = racksType[`rack_${racksTypeId}`]
        let newShelf = []
        Object.keys(rackType.shelfs).map(function(shelfKey,i){
            newShelf.push({name:`?????????? ${i+1}`, number:i+1, id: startShelfId+i, space:[]})
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
        if (buf == undefined) buf = this.getSceneElmByIdAndType(id-1, type)
        return buf
    }
    
    componentDidMount(){
        var manager = new THREE.LoadingManager();
        manager.onLoad = () => { // when all resources are loaded
            var racksWithShelfs = this.getRacksType()
            racksWithShelfs.then(racksWithShelfs => {
                console.log("racksWithShelfs")
                console.log(racksWithShelfs)
                this.state.racksType = racksWithShelfs
                this.state.rackTypeIdExpandList = Object.keys(racksWithShelfs).map(rackType=>{return {value: rackType.split("_")[1]}})

                var zones = this.getZonesType()
                zones.then(zones => {
                    this.state.zonesType = zones
                    this.state.zoneTypeIdExpandList = Object.keys(zones).map(zoneType=>{return {value: zoneType.split("_")[1]}})

                    var goods_type = this.getGoodsType()
                    goods_type.then(goods_type => {
                        this.state.goodsType = goods_type
                        var warehouse_model = this.getWarehouseModel()
                        warehouse_model.then(warehouse_model => {
                            this.state.warehouseSettings = warehouse_model
                            this.buildWarehouse()
                        })
                      
                    })
                })
            })
            
          
        }
        let fontWeight = 'regular';
        //fontWeight = 'bold';
        let fontName = 'helvetiker' // helvetiker, optimer, gentilis, droid sans, droid serif
        var loader = new FontLoader(manager);
        loader.load('https://threejs.org/examples/fonts/droid/droid_serif_bold.typeface.json', function(response) {
            font = response;
        });
    }

    buildWarehouse = () =>{
        init(this.state.warehouseSettings)
        // createHint()
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

    getRacksType = async ()=>{
		var res = {}
		res = await api.getRacksType()
		return res
	}

    getZonesType = async ()=>{
		var res = {}
		res = await api.getZones()
		return res
	}

    getGoodsType = async ()=>{
        var res = {}
		res = await api.getGoodsType()
		return res  
    }

    getWarehouseModel = async ()=>{
        var res = {}
		res = await api.getWarehouseModel()
		return res  
    }

    componentDidUpdate(){
        console.log("componentDidUpdate")
        if (this.state.zonesType != undefined && this.state.racksType != undefined && this.state.warehouseSettings != undefined && this.state.goodsType != undefined) {
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
    }

    sortListByKey=(list, key, searchTerm)=>{
        return list.filter(item => {
            return String(item[key]).toLowerCase().includes(String(searchTerm).toLowerCase())
        })
    }

    // componentWillUnmount() {
    //     clearInterval(keyListener);
    // }

    createRackListByType=()=>{
        let list = []
        Object.keys(this.state.racksType).map(key=>{
            let rackType = this.state.racksType[key]
            let buf = modelCreator.createRack(key.split("_")[1], rackType.color, rackType.shelfWidth, rackType.shelfHeight, rackType.depth, rackType.columsAmount, rackType.rowsAmount, rackType.borderWidth, rackType.translation)
            buf.freeSpaceX = rackType.freeSpaceX
            buf.freeSpaceY = rackType.freeSpaceY
            list.push(buf)
        })
        return list
    }

    createZoneListByType=()=>{
        let list = []
        Object.keys(this.state.zonesType).map(key=>{
            let zoneType = this.state.zonesType[key]
            let buf = modelCreator.createZoneBorder(key.split("_")[1], zoneType.color, zoneType.width, zoneType.length, zoneType.lineWidth, zoneType.chamferLendth, zoneType.message, zoneType.messageAlighment, font, zoneType.textSize, zoneType.gapLengthX, zoneType.gapLengthY, new Vector3(0,0,0))
            list.push(buf)
        })
        return list
    }

    checkSelectedZoneOnGoods=()=>{
        let check = false
        this.state.selectedZone.userData.racks.map(rack=>{
            for (let i=0;i<rack.shelfs.length;i++){
                if (rack.shelfs[i].space.length>0) check=true
            }
        })
        return check
    }

    deleteZone=()=>{
        for (let i=0;i<this.state.warehouseSettings.zones.length; i++){
            let zone = this.state.warehouseSettings.zones[i]
            if (zone.id === this.state.selectedZone.userData.id && zone.type === "zone"){
                let zoneObj = this.getSceneElmByIdAndType(zone.id, "zone")
                scene.remove(zoneObj)
                scene.remove(zoneObj.userData.borderModel)
                zoneObj.userData.racks.map(rack=>{
                        let rackObj = this.getSceneElmByIdAndType(rack.id, "rack")
                        if (rackObj.userData.goodsModels!=undefined)
                        rackObj.userData.goodsModels.map(goodObj=>{
                            scene.remove(goodObj)
                        })
                        scene.remove(rackObj)
                })
                
                let newZones = []
                for(let j=0;j<zones.length;j++){
                    let check = true
                    if (zones[j].id == this.state.selectedZone.userData.id) check = false
                    if (check) newZones.push(zones[j])
                }
                zones = newZones
                this.state.warehouseSettings.zones.splice(i,1)
                break;
            }
        }
        
        scene.remove(zoneHintMesh)
        api.deleteZones(this.state.selectedZone.userData)
        this.state.selectedZone = undefined
        zoneHintMesh = undefined
        
        if (rackHintMesh!=undefined && this.state.selectedRack!=undefined){
            this.state.selectedRack = undefined
            scene.remove(rackHintMesh)
            
        }
            
        this.setReload()
        render()
    }

    checkSelectedRackOnGoods=()=>{
        let check = false
        for (let i=0;i<this.state.selectedRack.userData.shelfs.length;i++){
            if (this.state.selectedRack.userData.shelfs[i].space.length > 0) {
                check=true
                break;
            }
        }
        return check
    }

    deleteRack=()=>{
        for (let i=0;i<this.state.warehouseSettings.zones.length; i++){
            let zone = this.state.warehouseSettings.zones[i]
            if (zone.id === this.state.selectedZone.userData.id && zone.type === "zone"){
                let zoneObj = this.getSceneElmByIdAndType(zone.id, "zone")
                for (let j=0;j<zoneObj.userData.racks.length; j++){
                    let rack = zoneObj.userData.racks[j]
                    if (rack.id === this.state.selectedRack.userData.id && rack.type === "rack"){
                        let rackObj = this.getSceneElmByIdAndType(rack.id, "rack")
                        if (rackObj.userData.goodsModels!=undefined) {
                            rackObj.userData.goodsModels.map(goodObj=>{
                                scene.remove(goodObj)
                            })
                        }
                        scene.remove(rackObj)
                        let newRacks = []
                        for(let j=0;j<racks.length;j++){
                            let check = true
                            if (racks[j].id == this.state.selectedRack.userData.id) check = false
                            if (check) newRacks.push(racks[j])
                        }
                        racks = newRacks
                        this.state.warehouseSettings.zones[i].racks.splice(j,1)
                        break;
                    }
                }
                break;
            }
        }
        scene.remove(rackHintMesh)
        api.deleteRacks(this.state.selectedRack.userData)
        this.state.selectedRack = undefined
        rackHintMesh = undefined
        this.setReload()
        render()
    }

    render(){
        return (
            <>
                {/* <div id="toolbar" style={{display: "table", width:"100%"}}>
                    <UniversalTabHolder tabs={this.state.tabs} setTab={this.setSelTab} selTab={this.state.selTab}/>
                </div> */}
                
                <div id="warehouseSceneWrap">
                    <div id="warehouseScene" onContextMenu={(e)=> e.preventDefault()}/>
                    <SideBlock isOpened={this.isSideBlockOpened} onRightClosed="-502px" onRightOpened="-1px" styles={{top:"130px",width:"505px", height:"100%"}}>
                        <UniversalTabHolder tabs={this.state.panelTabs} setTab={this.setPanelSelTab} selTab={this.state.panelSelTab}/>
                        {this.state.panelSelTab.id==0&&(
                            <div style={{marginLeft:"5px", marginTop:"5px"}}>
                                <div className="header_text" >??????-???? ????????????</div>
                                <InputText styles = "row_with_item_wide" label="????????????&nbsp;????????????&nbsp;(????)&nbsp;"       placeholder="???????????? ????????????"           defValue={this.state.warehouseLength}            set={this.setWarehouseLength} mask={/^[0-9]{0,10}$/i} maskExample="???????? ???????????? ???????????? ????????"/> 
                                <InputText styles = "row_with_item_wide" label="????????????&nbsp;????????????&nbsp;(????)&nbsp;"       placeholder="???????????? ????????????"           defValue={this.state.warehouseWidth}             set={this.setWarehouseWidth} mask={/^[0-9]{0,10}$/i} maskExample="???????? ???????????? ???????????? ????????"/>

                                {this.state.selectedZone==undefined
                                ?<div>???????????????? ???????? ????????????</div>
                                :<>
                                    <div className="header_text">??????-???? ???????????????????? ????????</div>
                                    <InputText styles = "row_with_item_wide" label="????????????????&nbsp;????????&nbsp;"               placeholder="???????????????? ????????"         defValue={this.state.selectedZoneName}      set={this.setSelectedZoneName} mask={/^(.)(.*)$/i} maskExample="???????? ??????????????????"/> 
                                    <InputText styles = "row_with_item_wide" label="??????????&nbsp;????????&nbsp;????&nbsp;x&nbsp;"   placeholder="?????????? ???????? ???? x"       defValue={this.state.selectedZoneCenterX}   set={this.setSelectedZoneCenterX} mask={/^[-0-9]{0,10}$/i} maskExample="???????? ????????????"/> 
                                    <InputText styles = "row_with_item_wide" label="??????????&nbsp;????????&nbsp;????&nbsp;y&nbsp;"   placeholder="?????????? ???????? ???? y"       defValue={this.state.selectedZoneCenterZ}   set={this.setSelectedZoneCenterZ} mask={/^[-0-9]{0,10}$/i} maskExample="???????? ????????????"/> 
                                    <InputText styles = "row_with_item_wide" label="????????&nbsp;????????????????&nbsp;????????&nbsp;"     placeholder="???????? ???????????????? ????????"    defValue={this.state.selectedZoneRotation}  set={this.setSelectedZoneRotation} mask={/^[-0-9]{0,10}$/i} maskExample="???????? ????????????"/> 
                                    <div className="low_text row_with_item_equal" style={{width:"200px", display: "inline-block"}}>??????&nbsp;????????&nbsp;<ExpandListInput width={100} list={this.state.zoneTypeIdExpandList} defValue={this.state.selectedZoneTypeId} func={this.setSelectedZoneTypeId}/></div>
                                    <div style={{width:"calc(100% - 290px)", display: "inline-block"}}/>
                                    <button style={{verticalAlign:"flex-end", width:"70px"}} onClick={()=>{this.checkSelectedZoneOnGoods()?this.setState({isAlertMessageboxOpened1: true}):this.deleteZone()}}>??????????????</button>
                                    {this.state.selectedRack==undefined
                                    ?<div>???????????????? ??????????????</div>
                                    :<>
                                        <div className="header_text">??????-???? ?????????????????????? ????????????????</div>
                                        <InputText styles = "row_with_item_wide" label="????????????????&nbsp;????????????????&nbsp;"               placeholder="???????????????? ????????????????"         defValue={this.state.selectedRackName}      set={this.setSelectedRackName} mask={/^(.)(.*)$/i} maskExample="???????? ??????????????????"/> 
                                        <InputText styles = "row_with_item_wide" label="??????????&nbsp;????????????????&nbsp;????&nbsp;x&nbsp;????????????????????????&nbsp;????????????&nbsp;????????&nbsp;"   placeholder="?????????? ???????????????? ???? x"       defValue={this.state.selectedRackCenterX}   set={this.setSelectedRackCenterX} mask={/^[-0-9]{0,10}$/i} maskExample="???????? ????????????"/> 
                                        <InputText styles = "row_with_item_wide" label="??????????&nbsp;????????????????&nbsp;????&nbsp;y&nbsp;????????????????????????&nbsp;????????????&nbsp;????????&nbsp;"   placeholder="?????????? ???????????????? ???? y"       defValue={this.state.selectedRackCenterZ}   set={this.setSelectedRackCenterZ} mask={/^[-0-9]{0,10}$/i} maskExample="???????? ????????????"/> 
                                        <InputText styles = "row_with_item_wide" label="????????&nbsp;????????????????&nbsp;????????????????&nbsp;"     placeholder="???????? ???????????????? ????????????????"    defValue={this.state.selectedRackRotation}  set={this.setSelectedRackRotation}  mask={/^[-0-9]{0,10}$/i} maskExample="???????? ????????????"/> 
                                        <div className="low_text row_with_item_equal" style={{width:"200px", display: "inline-block"}}>??????&nbsp;????????????????&nbsp;<ExpandListInput width={100} list={this.state.rackTypeIdExpandList} defValue={this.state.selectedRackTypeId} func={this.setSelectedRackTypeId}/></div>
                                        <div style={{width:"calc(100% - 290px)", display: "inline-block"}}/>
                                        <button style={{verticalAlign:"flex-end", width:"70px"}} onClick={()=>{this.checkSelectedRackOnGoods()?this.setState({isAlertMessageboxOpened2: true}):this.deleteRack()}}>??????????????</button>
                                    
                                    </>
                                    }
                                </>
                                }
                                {/* <div style={{width:"350px", display: "inline-block"}}/><button className="bt_send" style={{width:"120px"}} onClick={this.btn_send_1}>?????????????????????????? ??????????</button> */}
                            </div>
                        )}
                        {this.state.panelSelTab.id==1&&(
                            <>
                                <div className="header_text" style={{margin:"5px"}}>?????????????????? ????????</div>
                                <ModelList models={this.createZoneListByType()} modelType={"????????"} width={490} minWidth={230} spaceBetweenItems={10} setModel={(model)=>{this.state.installedModel = model}}/>
                            </>
                        )}
                        {this.state.panelSelTab.id==2&&(
                            <>
                                <div className="header_text" style={{margin:"5px"}}>?????????????????? ????????????????</div>
                                <ModelList models={this.createRackListByType()} modelType={"??????????????"} width={490} minWidth={150} spaceBetweenItems={10} setModel={(model)=>{this.state.installedModel = model}}/>
                            </>
                        )}
                    </SideBlock>
                </div>
                <AlertMessagebox
                    title={"????????????????!"}
                    message={"???????????????????? ???????????????? ?????? ???????????????? ???????? ???? ?????? ???????? ????????????!"}
                    isOpened={this.state.isAlertMessageboxOpened} 
                    onOk={()=>{this.setState({isAlertMessageboxOpened: false});}} 
                    // onAccept={()=>{this.setState({isAlertMessageboxOpened: false});this.setSelectedRackTypeIdFromBuf()}} 
                    // onCancel={()=>{this.setState({isAlertMessageboxOpened: false});this.setState({selectedRackTypeId: this.selectedRackTypeIdLast}); }}
                />
                <AlertMessagebox
                    title={"????????????????!"}
                    message={"???????????????????? ?????????????? ???????? ???????? ???? ?????? ???????? ???????????????? ?? ????????????????!"}
                    isOpened={this.state.isAlertMessageboxOpened1} 
                    onOk={()=>{this.setState({isAlertMessageboxOpened1: false});}} 
                    // onAccept={()=>{this.setState({isAlertMessageboxOpened1: false});this.deleteZone()}} 
                    // onCancel={()=>{this.setState({isAlertMessageboxOpened1: false});}}
                />
                <AlertMessagebox
                    title={"????????????????!"}
                    message={"???????????????????? ?????????????? ?????????????? ???????? ???? ?????? ???????? ????????????!"}
                    isOpened={this.state.isAlertMessageboxOpened2} 
                    onOk={()=>{this.setState({isAlertMessageboxOpened2: false});}} 
                    // onAccept={()=>{this.setState({isAlertMessageboxOpened2: false});this.deleteRack()}} 
                    // onCancel={()=>{this.setState({isAlertMessageboxOpened2: false});}}
                />
                {/* <DropdownListWithModels setModel={setModel}/> */}
        </>
        )
    }
}

export default AdministratorWarehouseCreating