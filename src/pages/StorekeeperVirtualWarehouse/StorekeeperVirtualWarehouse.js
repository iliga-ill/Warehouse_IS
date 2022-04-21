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

  //#region Зона инициализации переменных
  let camera, scene, scene2, renderer, renderer2;
  let plane;
  let pointer, raycaster, isShiftDown = false;
  let light;
  let focusedScene;
  let canvas;

  let lastFocusedDiv;

  let rollOverMesh, rollOverMaterial;

  let ModelGeometry, ModelMaterial, ModelName;

  let TranslationX;
  let TranslationY;
  let TranslationZ;

  let ModelHeight;
  let ModelWidth;
  let ModelDepth;

  let HintTranslation;

  let width, height;
  let width2, height2;

  let objectsList = [];

  const objects = [];
  const scenes = [];
  const renderers = []
  const lights = []

  let marginRight = 30;
  let marginTop = 10;

  let lastX;
  let lastY;

//#endregion

  function init() {
      //#region Init() метод первого скрипта    
      // width =  window.innerWidth/100  * (100 - marginRight)
      // height = window.innerHeight/100 * (100 - marginTop)
      

      width =  window.innerWidth
      height = window.innerHeight/100 * (100 - marginTop)

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
      const gridHelper = new THREE.GridHelper( 1000, 20 );
      scene.add( gridHelper );

      //Позволяет отслеживать движение и нажатие мыши
      raycaster = new THREE.Raycaster();
      pointer = new THREE.Vector2();

      const geometry = new THREE.PlaneGeometry( 1000, 1000 );
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


      var main_block = document.getElementById("main")

      main_block.appendChild( renderer.domElement );
  //  document.body.appendChild( renderer.domElement );

      main_block.addEventListener( 'pointermove', onPointerMove );
      main_block.addEventListener( 'pointerdown', onPointerDown );
      document.addEventListener( 'keydown', onDocumentKeyDown );
      document.addEventListener( 'keyup', onDocumentKeyUp );

      const controls = new OrbitControls( camera, renderer.domElement );
      controls.update()

      window.addEventListener( 'resize', onWindowResize );
      //#endregion

      //#region Init() метод другого скрипта

      

      width2 = window.innerWidth/100 * (30)
      height2 = window.innerHeight 

      const content = document.getElementById( 'content' );

      for ( let i = 0; i < objectsList.length; i ++ ) {

          const scene = new THREE.Scene();

      
          // make a list item
          const element = document.createElement( 'div' );
          element.width = 400;
          element.height = 400;
          element.className = 'list-item';
          element.id = 'main-div';

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

          const geometry = objectsList[i].ModelGeometry;
          const material = objectsList[i].ModelMaterial;

          const voxel = new THREE.Mesh( geometry, material);
          //console.log("Pos: " + voxel.position.x + ";" + voxel.position.y + ";" + voxel.position.z )

          voxel.position.set(voxel.position.x + objectsList[i].AntiTranslation.x, voxel.position.y + objectsList[i].AntiTranslation.y, voxel.position.z + objectsList[i].AntiTranslation.z)

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
          
          renderer2 = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );
          renderer2.setClearColor( 0xffffff, 1 );
          renderer2.setPixelRatio( window.devicePixelRatio );

          renderers.push(renderer2)

          canvas.addEventListener( 'pointerdown', function(){onPointerDown2(scene, i, objectsList[i], element)});
      }
      document.addEventListener( 'pointerup', function(){onPointerUp2()});
      
          //document.addEventListener( 'pointerup', function(){onPointerUp2()} );
      //#endregion
  }

  function render() {
      renderer.render( scene, camera );

      //#region render() метод другого скрипта

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
          //const ref = document.getElementById( 'main' )
          // set the viewport
          const width2 = 200;
          const height2 = 200;
          const left = 0;
          const bottom = 0;

          renderers[iter].setViewport( left, bottom, width2, height2 );
          renderers[iter].setScissor( left, bottom, width2, height2 );

          const camera = scene.userData.camera;

          //camera.aspect = width / height; // not changing in this example
          //camera.updateProjectionMatrix();

          //scene.userData.controls.update();
          //console.log(renderer)
          renderers[iter].render( scene, camera );
          iter++
      } 
  );
      //#endregion
  }
  function createHint(){
      // roll-over helpers (подсказка, где будет расположен объект)
      scene.remove(rollOverMesh)
      const rollOverGeo = new THREE.BoxGeometry(ModelHeight, ModelWidth, ModelDepth); 
      rollOverMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } );
      rollOverMesh = new THREE.Mesh( rollOverGeo, rollOverMaterial );
      scene.add( rollOverMesh );
  }
  
//#region Зона создания подсказки на сетке
  function CubeHint() {
      pointer.set( ( (lastX) / width ) * 2 - 1, - ( (lastY - document.getElementById('info').offsetHeight - 100) / height ) * 2 + 1 );
      raycaster.setFromCamera( pointer, camera );
      const intersects = raycaster.intersectObjects( objects );
      const intersect = intersects[0];
      
      if (intersects.length > 0) {
          if ( isShiftDown ) {
              if (intersects[0].object.position.x != 0 || intersects[0].object.position.y != 0 || intersects[0].object.position.z != 0 ) {
                  rollOverMesh.visible = true;
                  rollOverMesh.position.copy(intersect.point).add({x:-intersect.face.normal.x,y:-intersect.face.normal.y,z:-intersect.face.normal.z});
                  rollOverMesh.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
                  rollOverMesh.position.set(rollOverMesh.position.x + HintTranslation.x,rollOverMesh.position.y + HintTranslation.y,rollOverMesh.position.z + HintTranslation.z)
              } else {
                  rollOverMesh.visible = false;
              }
          } else {
              rollOverMesh.visible = true;
              rollOverMesh.position.copy( intersect.point ).add( intersect.face.normal );
              rollOverMesh.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
              rollOverMesh.position.set(rollOverMesh.position.x + HintTranslation.x, rollOverMesh.position.y + HintTranslation.y, rollOverMesh.position.z + HintTranslation.z)
          }
      } else {
          rollOverMesh.visible = false;
      }
      render();
  }
//#endregion

//Обьекты в списке выбора обьекта
  function FillObjects(){
      SetModel_cube(30, 30, 30, 0, -5, 0)
      objectsList[0] = {"CommodityName":"Маленький товар", "ModelGeometry":ModelGeometry, "ModelMaterial":ModelMaterial, "ModelName":ModelName, "TranslationX":TranslationX, "TranslationY":TranslationY, "TranslationZ":TranslationZ, "AntiTranslation": new THREE.Vector3(0,0,0), "ModelHeight": ModelHeight, "ModelWidth": ModelWidth, "ModelDepth": ModelDepth, "HintTranslation": new THREE.Vector3(0,-5,0)};
      SetModel_cube(35, 80, 35, 0, 20, 0)
      objectsList[1] = {"CommodityName":"Большой товар", "ModelGeometry":ModelGeometry, "ModelMaterial":ModelMaterial, "ModelName":ModelName, "TranslationX":TranslationX, "TranslationY":TranslationY, "TranslationZ":TranslationZ, "AntiTranslation": new THREE.Vector3(0,0,0), "ModelHeight": ModelHeight, "ModelWidth": ModelWidth, "ModelDepth": ModelDepth, "HintTranslation": new THREE.Vector3(0,20,0)};
      SetModel_shelter(50, 50, 50, 5, 0, -25, -25)
      objectsList[2] = {"CommodityName":"Маленькая полка", "ModelGeometry":ModelGeometry, "ModelMaterial":ModelMaterial, "ModelName":ModelName, "TranslationX":TranslationX, "TranslationY":TranslationY, "TranslationZ":TranslationZ, "AntiTranslation": new THREE.Vector3(-25,-25, -100), "ModelHeight": ModelHeight, "ModelWidth": ModelWidth, "ModelDepth": ModelDepth, "HintTranslation": new THREE.Vector3(0,0,0)};
      SetModel_shelter(50, 100, 50, 5, 0, -25, -25)
      objectsList[3] = {"CommodityName":"Высокая полка", "ModelGeometry":ModelGeometry, "ModelMaterial":ModelMaterial, "ModelName":ModelName, "TranslationX":TranslationX, "TranslationY":TranslationY, "TranslationZ":TranslationZ, "AntiTranslation": new THREE.Vector3(-25,-50,-100), "ModelHeight": ModelHeight, "ModelWidth": ModelWidth, "ModelDepth": ModelDepth, "HintTranslation": new THREE.Vector3(0,25,0)};
      SetModel_shelter(150, 100, 50, 5, 0, -25, -25)
      objectsList[4] = {"CommodityName":"Большая полка", "ModelGeometry":ModelGeometry, "ModelMaterial":ModelMaterial, "ModelName":ModelName, "TranslationX":TranslationX, "TranslationY":TranslationY, "TranslationZ":TranslationZ, "AntiTranslation": new THREE.Vector3(-25,-50,-100), "ModelHeight": ModelHeight, "ModelWidth": ModelWidth, "ModelDepth": ModelDepth, "HintTranslation": new THREE.Vector3(0,25,0)};
      SetModel_shelter(150, 50, 50, 5, 0, -25, -25)
      objectsList[5] = {"CommodityName":"Широкая полка", "ModelGeometry":ModelGeometry, "ModelMaterial":ModelMaterial, "ModelName":ModelName, "TranslationX":TranslationX, "TranslationY":TranslationY, "TranslationZ":TranslationZ, "AntiTranslation": new THREE.Vector3(-25,-50,-100), "ModelHeight": ModelHeight, "ModelWidth": ModelWidth, "ModelDepth": ModelDepth, "HintTranslation": new THREE.Vector3(0,0,0)};
  }

//#region Зона создания моделей для визуализации

  function SetModel_cube(CubeWidth, CubeHeight, CubeDepth, translationX, translationY, translationZ, HintTranslation){
      // cubes (модель куба, который будет создан)
      TranslationX = translationX;
      TranslationY = translationY;
      TranslationZ = translationZ;
      ModelHeight = CubeWidth;
      ModelWidth = CubeHeight;
      ModelDepth = CubeDepth;
      HintTranslation = HintTranslation;
      ModelGeometry = new THREE.BoxGeometry( CubeWidth, CubeHeight, CubeDepth );
      ModelMaterial = new THREE.MeshLambertMaterial( { color: 0x885aaa});
      ModelName = "Cube"
      //cubeMaterial.map = new THREE.TextureLoader().load( 'images/box-clipart-1.png' ) //TODO Понять почему не работает и исправить
      }

  function SetModel_shelter(ShelderWidth, ShelderHeight, ShelderDepth, ShelderBorderWide, translationX, translationY, translationZ, HintTranslation){
      TranslationX = translationX;
      TranslationY = translationY;
      TranslationZ = translationZ;
      ModelHeight = ShelderWidth;
      ModelWidth = ShelderHeight;
      ModelDepth = ShelderDepth;
      HintTranslation = HintTranslation;

      var frame = new THREE.Shape();
      frame.moveTo( ShelderWidth/2, 0, 25);
      frame.lineTo( ShelderWidth/2, ShelderHeight, 25);
      frame.lineTo(-ShelderWidth/2, ShelderHeight, 25);
      frame.lineTo(-ShelderWidth/2, 0, 25);
      
      var hole = new THREE.Path();
      hole.moveTo( ShelderWidth/2 - ShelderBorderWide, ShelderBorderWide, 25);
      hole.lineTo( ShelderWidth/2 - ShelderBorderWide, ShelderHeight - ShelderBorderWide, 25);
      hole.lineTo(-(ShelderWidth/2 - ShelderBorderWide), ShelderHeight - ShelderBorderWide, 25);
      hole.lineTo(-(ShelderWidth/2 - ShelderBorderWide), ShelderBorderWide, 25);
      frame.holes.push(hole);

  //  Extrude the shape into a geometry, and create a mesh from it:
      var extrudeSettings = {
        steps: 1,
        depth: ShelderDepth,
        bevelEnabled: false,
      };
      ModelGeometry = new THREE.ExtrudeGeometry(frame, extrudeSettings);
      ModelMaterial = new THREE.MeshLambertMaterial( { color: 0x885a5a});
      ModelName = "Shelf"
  }

//#endregion

//#region Зона событий

  function onPointerDown( event ) {
      pointer.set( ( event.clientX / width ) * 2 - 1, - ( (event.clientY - document.getElementById('info').offsetHeight - 100) / height) * 2 + 1 );
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
          
              const voxel = new THREE.Mesh( ModelGeometry, ModelMaterial);
              voxel.position.copy( intersect.point ).add( intersect.face.normal );
              voxel.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
              voxel.position.set(voxel.position.x + TranslationX,voxel.position.y + TranslationY,voxel.position.z + TranslationZ)
              voxel.name = ModelName;
              scene.add( voxel );
              objects.push( voxel );
          }
          render();
      }
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
      width  = window.innerWidth
      height = window.innerHeight/100 * (100 - marginTop)

      if (document.getElementById('test').offsetWidth <= 650) {
          width2 = 400
          height2 = 400
      }
      else {
          width2 = 200
          height2 = 200
      }

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize( width, height);
      console.log(document.getElementById('test').offsetWidth)
      //#region UpdateSize другого метода
      // renderers.forEach( function ( render ){
      //     // const width = canvas.clientWidth;
      //     // const height = canvas.clientHeight;
      //     render.setViewport( 0, 0, width2, height2 );
      //     render.setScissor( 0, 0, width2, height2 );
      //     render.setSize( width2, height2 );
      //     console.log(render.width)
      // }) 
      
      scenes.forEach( function (scene){
          
      })
      //#endregion
  }

  function onPointerMove(event) {
      lastX = event.clientX;
      lastY = event.clientY;
      CubeHint();
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

  // let canvas, renderer;
  // let width, height
  // let light;
  // let focusedScene;

  

  function onPointerDown2(scene, num, object, element){
      focusedScene = num

      lastFocusedDiv.style.background = 'transparent'
      element.style.background = 'bisque'
      lastFocusedDiv = element
      
      ModelGeometry = object.ModelGeometry
      ModelMaterial = object.ModelMaterial
      ModelName     = object.ModelName
      TranslationX  = object.TranslationX
      TranslationY  = object.TranslationY
      TranslationZ  = object.TranslationZ
      ModelHeight = object.ModelHeight;
      ModelWidth = object.ModelWidth;
      ModelDepth = object.ModelDepth;
      HintTranslation = object.HintTranslation;
      createHint();
  }

  function onPointerUp2(){ 
      focusedScene = -1
  }

  function animate() {
      var iter = 0;
      lights.forEach( function (light) {
          light.position.copy( scenes[iter].userData.camera.position );
          iter++;
      })

      render();
      requestAnimationFrame( animate );
  }  

  //script 2
  
  
  function onPointerUp3(body){

      if (body.style.display == "") {
          body.style.display = "block"
          var main = document.getElementById('main')
          console.log(main.style.height)
          body.style = {display:"block", height:"500px"}
          // console.log(main.style.height)
          // console.log(body.style.height)
      }else {
          body.style.display = ""
      }

  }

  function init2(){

    var body = document.getElementById('content')
    var btn = document.getElementById('btn_models')

    btn.addEventListener('pointerdown', function(){onPointerUp3(body)})
}

class StorekeeperVirtualWarehouse extends Component {

    componentDidMount(){
        init()
        render()
        animate()
        init2()
    }

    render(){
        
        return (
            <>
                <div id="info" style={{display: "table"}}>

                <div style={{display: "table-cell", height: "auto"}}>
                    <strong>click</strong>: add voxel, <br/>
                    <strong>shift + click</strong>: remove voxel
                </div>

                <div style={{display: "table-cell", width: "auto", height: "auto", verticalAlign: "middle"}}>
                    <button id="btn_models" type="button" class="collapsible" style={{width: "80px", height: "28px"}}>Модели</button>
                </div>

                </div>

                <div id="main"/>
                    
                    
                
                <div id="test">
                    <div id="content"></div>
                </div> 
                
        </>
        )
    }
}

export default StorekeeperVirtualWarehouse