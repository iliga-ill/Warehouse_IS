import React, { Component, Fragment } from "react";
import './StorekeeperVirtualWarehouse.css';
import Table from "../../components/Table/Table";
import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";
import { TableComponent } from "../../components/Table/TableComponent";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
const host = 'http://localhost:5000';

const styles = {

  }

//ширина и длинна склада задаются в см


let warehouseSettings = {
    width:1000,
    length:1000,

}

//#region Variables
let camera, scene, renderer;
let plane;
let pointer, raycaster, isShiftDown = false;
let light;
let focusedScene;
let canvas;

let lastFocusedDiv;

let rollOverMesh, rollOverMaterial;

let model = {
    name: "", 
    modelName:"",
    material:"", 
    geometry:"", 
    width:"", 
    height:"", 
    depth:"", 
    translation:new THREE.Vector3(0,0,0),
}

let width, height;

let objectsList = [];

const objects = [];

let sceneMarginTop = 0;

let lastX;
let lastY;

//#endregion

//#region Scene settings -------------------------------------------------
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

    FillObjects();

    //SetModel_shelder(50, 50, 50, 5);
    //SetModel_cube(40, 40, 40)

    // grid
    const gridHelper = new THREE.GridHelper( 1000, Math.max(warehouseSettings.width, warehouseSettings.length) );
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
//#endregion

//#region Listeners -------------------------------------------------

function getModelPosition(mouse){
    return {x: mouse.position.x + model.translation.x, y: mouse.position.y + model.translation.y, z:mouse.position.z + model.translation.z}
}

function onPointerDown( event ) {
    pointer.set( ( event.clientX / width ) * 2 - 1, - ( (event.clientY - sceneMarginTop) / height) * 2 + 1 );
    raycaster.setFromCamera( pointer, camera );
    const intersects = raycaster.intersectObjects( objects );
    

    if (intersects.length > 0) {
        const intersect = intersects[0];

        // delete cube
        if ( isShiftDown ) {
            
            if ( intersect.object !== plane ) {
                
                scene.remove( intersect.object );
                objects.splice( objects.indexOf( intersect.object ), 1 );
        }
        // create cube
        } else {
        // console.log(intersect)
        // let isShelter = false;
        // for (let i=0;i<=100;i++){
        //     pointer.set( ( (lastX) / width ) * 2 - 1, - ( (lastY + i) / height ) * 2 + 1 );
        //     raycaster.setFromCamera( pointer, camera );
        //     const arr = raycaster.intersectObjects( objects );
        //     if (arr.length > 0) {
        //         if (arr[0].object.name == "Shelter"){
        //             isShelter = true;
        //         }
        //     }
        // }
        // console.log(isShelter)
            
        

        // console.log(HintIntersect);

        // if (intersect.object.name == "Shelf"){
        //     SetModel_cube(30, 30, 30, 0, -5, 0)
        // } else {
        //     SetModel_shelter(50, 50, 50, 5, 0, -25, -25)
        // }
        //console.log("Clicked face index: " + intersect.faceIndex)
        
            const voxel = new THREE.Mesh( model.geometry, model.material);
            voxel.position.copy( intersect.point ).add( intersect.face.normal );
            // voxel.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
            voxel.position.set(getModelPosition(voxel).x, getModelPosition(voxel).y, getModelPosition(voxel).z)
            voxel.name = model.name;
            scene.add( voxel );
            objects.push( voxel );
        }
        render();
    }
}

function createHint(){
    // roll-over helpers (подсказка, где будет расположен объект)
    scene.remove(rollOverMesh)
    const rollOverGeo = model.geometry; 
    rollOverMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } );
    rollOverMesh = new THREE.Mesh( rollOverGeo, rollOverMaterial );
    scene.add( rollOverMesh );
}

function CubeHint() {
    pointer.set( ( (lastX) / width ) * 2 - 1, - ( (lastY - sceneMarginTop) / height ) * 2 + 1 );
    raycaster.setFromCamera( pointer, camera );
    const intersects = raycaster.intersectObjects( objects );
    const intersect = intersects[0];
    
    if (intersects.length > 0) {
        if ( isShiftDown ) {
            if (intersects[0].object.position.x != 0 || intersects[0].object.position.y != 0 || intersects[0].object.position.z != 0 ) {
                rollOverMesh.visible = true;
                rollOverMesh.position.copy(intersect.point).add({x:-intersect.face.normal.x,y:-intersect.face.normal.y,z:-intersect.face.normal.z});
                // rollOverMesh.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
                rollOverMesh.position.set(getModelPosition(rollOverMesh).x, getModelPosition(rollOverMesh).y, getModelPosition(rollOverMesh).z)
            } else {
                rollOverMesh.visible = false;
            }
        } else {
            rollOverMesh.visible = true;
            rollOverMesh.position.copy( intersect.point ).add( intersect.face.normal );
            // rollOverMesh.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
            rollOverMesh.position.set(getModelPosition(rollOverMesh).x, getModelPosition(rollOverMesh).y, getModelPosition(rollOverMesh).z)
        }
    } else {
        rollOverMesh.visible = false;
    }
    render();
}

function onDocumentKeyDown( event ) {
    switch ( event.keyCode ) {
        case 16: isShiftDown = true; CubeHint(); break;
    }
}

function onDocumentKeyUp( event ) {
    switch ( event.keyCode ) {
        case 16: isShiftDown = false; CubeHint(); break;
    }
}

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
    CubeHint();
}

//#endregion

//#region Render -------------------------------------------------
    function render() {
        renderer.render( scene, camera );
    }
//#endregion

//#region Models generation -------------------------------------------------
    function FillObjects(){
        objectsList[0] = createCube("Маленький товар", 0x885aaa, 30, 30, 30, new THREE.Vector3(0, -5, 0))
        objectsList[1] = createCube("Большой товар", 0x885aaa, 35, 80, 35, new THREE.Vector3(0, -5, 0))
        objectsList[2] = createShelter("Маленькая полка", 0x885aaa, 50, 50, 50, 5, new THREE.Vector3(0, 0, 0))
        objectsList[3] = createShelter("Высокая полка", 0x885aaa, 50, 100, 50, 5, new THREE.Vector3(0, 0, 0))
        objectsList[4] = createShelter("Большая полка", 0x885aaa, 150, 100, 50, 5, new THREE.Vector3(0, 0, 0))
        objectsList[5] = createShelter("Широкая полка", 0x885aaa, 150, 50, 50, 5, new THREE.Vector3(0, 0, 0))
    }


    function createCube(name, color, width, height, depth, translation){
        // cubes (модель куба, который будет создан)
        return {
            name: name, 
            modelName: "Cube",
            material: new THREE.MeshLambertMaterial( { color: color}), 
            geometry: new THREE.BoxGeometry( width, height, depth ), 
            width: width, 
            height: height, 
            depth: depth, 
            translation: translation,
        }
        //cubeMaterial.map = new THREE.TextureLoader().load( 'images/box-clipart-1.png' ) //TODO Понять почему не работает и исправить
    }

    function createShelter(name, color, width, height, depth, borderWidth, translation){
        var frame = new THREE.Shape();
        frame.moveTo( width/2, 0, 25);
        frame.lineTo( width/2, height, 25);
        frame.lineTo(-width/2, height, 25);
        frame.lineTo(-width/2, 0, 25);
        
        var hole = new THREE.Path();
        hole.moveTo( width/2 - borderWidth, borderWidth, 25);
        hole.lineTo( width/2 - borderWidth, height - borderWidth, 25);
        hole.lineTo(-(width/2 - borderWidth), height - borderWidth, 25);
        hole.lineTo(-(width/2 - borderWidth), borderWidth, 25);
        frame.holes.push(hole);

    //  Extrude the shape into a geometry, and create a mesh from it:
        var extrudeSettings = {
            steps: 1,
            depth: depth,
            bevelEnabled: false,
        };
        
        return {
            name: name, 
            modelName: "Shelf",
            material: new THREE.MeshLambertMaterial( { color: color}), 
            geometry: new THREE.ExtrudeGeometry(frame, extrudeSettings), 
            width: width, 
            height: height, 
            depth: depth, 
            translation: translation,
        }
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
  
//#region Dropdown list -------------------------------------------------
let dropdownListWidth; 
let dropdownListHeight;

const scenes = [];
const renderers = []
const lights = []

function dropdownListInit(){

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
            onPointerDown2(scene, 0, objectsList[i], element)
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

        light = new THREE.PointLight( 0xffffff, 0.5 );
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

        canvas.addEventListener( 'pointerdown', function(){onPointerDown2(scene, i, element)});
    }

    document.addEventListener( 'pointerup', function(){onPointerUp2()});

    var body = document.getElementById('content')
    var btn = document.getElementById('btn_models')

    btn.addEventListener('pointerdown', function(){onPointerUp3(body)})
    window.addEventListener( 'resize', onDropdownListWindowResize );
}

  function onPointerDown2(scene, num, element){
      focusedScene = num

      lastFocusedDiv.style.background = 'transparent'
    //   element.style.background = 'bisque'
      lastFocusedDiv = element
      
      model=objectsList[num]

      createHint();
  }

  function onPointerUp2(){ 
      focusedScene = -1
  }

//#region DropdownListRender -------------------------------------------------
function dropdownListRender() {

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

    function onDropdownListWindowResize() {
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

  function dropdownListAnimate() {
      var iter = 0;
      lights.forEach( function (light) {
          light.position.copy( scenes[iter].userData.camera.position );
          iter++;
      })

      render();
      requestAnimationFrame( dropdownListAnimate );
  }  
  
  
  function onPointerUp3(body){

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

class StorekeeperVirtualWarehouse extends Component {

    componentDidMount(){
        init()
        render()
        
        dropdownListInit()
        dropdownListRender()
        dropdownListAnimate()

        model = createCube("Маленький товар", 0x885aaa, 16, 16, 16, new THREE.Vector3(0,(16/2-1),0))
        // model = createCube("Большой товар", 0x885aaa, 35, 80, 35, new THREE.Vector3(0, 20, 0))
        // model = createShelter("Маленькая полка", 0x885aaa, 50, 50, 50, 5, new THREE.Vector3(0, -25, -25))
        // model = createShelter("Высокая полка", 0x885aaa, 50, 100, 50, 5, new THREE.Vector3(0, -25, -25))
        // model = createShelter("Большая полка", 0x885aaa, 150, 100, 50, 5, new THREE.Vector3(0, -25, -25))
        // model = createShelter("Широкая полка", 0x885aaa, 150, 50, 50, 5, new THREE.Vector3(0, -1, -25))
        createHint()
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
                    
                    
                
                <div id="modelsList">
                    <div id="content"></div>
                </div> 
                
        </>
        )
    }
}

export default StorekeeperVirtualWarehouse