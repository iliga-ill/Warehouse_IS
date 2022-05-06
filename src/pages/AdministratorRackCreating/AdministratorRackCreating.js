import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";
import ListWithSearch from "../../components/ListWithSearch/ListWithSearch";
import InputText from "../../components/InputText/InputText";

import { React, Component, Fragment } from "react";
import './AdministratorRackCreating.css';
import * as THREE from 'three';
import { MapControls, OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import ModelCreator from "../../classes/ModelCreator.js";
import Colors from "../../classes/Colors.js";
import { MOUSE, Vector2, Vector3 } from "three";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

import AuxiliaryMath from "../../classes/AuxiliaryMath.js";
import zIndex from "@material-ui/core/styles/zIndex";

const styles = {

  }

let modelCreator = new ModelCreator()
let colors = new Colors()
let auxMath = new AuxiliaryMath()


//#region Scene settings -------------------------------------------------

//#region Variables

let font = null

//is mouse button pressed
let mouseLeftButton = false
let mouseRightButton = false

//scene variables
let width, height;
let sceneMarginTop = 0;

let camera, scene, renderer;
let plane;
let pointer, raycaster; 

const objects = [];

let editingMod = "viewing" //viewing, adding, deleting /change mode of interacting with models

let model = undefined; //currently placed model

let controls

let sceneHeight = 600
let sceneWidth = 300

//#endregion

function init(shelfWidth, shelfDepth, shelfHeight) { 
    sceneMarginTop = document.getElementById('warehouseSceneWrap').offsetTop + document.getElementById('warehouseSceneWrap').offsetHeight -1
    width =  sceneWidth
    height = sceneHeight - sceneMarginTop - 4

    raycaster = new THREE.Raycaster();
    pointer = new THREE.Vector2();

    //scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );

    //grid
    const gridHelper = new THREE.GridHelper( Math.max(shelfWidth, shelfDepth), Math.max(shelfWidth, shelfDepth) );
    scene.add( gridHelper );

    const geometry = new THREE.PlaneGeometry( Math.max(shelfWidth, shelfDepth), Math.max(shelfWidth, shelfDepth) );
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

    //renderer
    var factor = 0.8; // percentage of the screen
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( width, height );

    camera = new THREE.PerspectiveCamera( 45, width/ height, 1, 10000 );
    camera.position.set( Math.max(shelfWidth, shelfDepth), shelfHeight*2, Math.max(shelfWidth, shelfDepth) );

    controls = new OrbitControls( camera, renderer.domElement );
    controls.update()
    //controls.enabled = true;
    camera.lookAt( 0, 0, 0 );

    //addingSceneOnScreen
    var warehouseScene = document.getElementById("warehouseScene")
    warehouseScene.appendChild( renderer.domElement );

    //setListeners
    setListeners()
}

function render() {
    if (renderer!=undefined)
        renderer.render( scene, camera );
}

//#region Listeners 

function setListeners(){
    var warehouseScene = document.getElementById("warehouseScene")
    //listener for resizing
    window.addEventListener( 'resize', onWindowResize );
    warehouseScene.addEventListener( 'wheel', onSceneMouseWheel );
    warehouseScene.addEventListener('mousemove', onMouseMove)
}

function onMouseMove(){
    render()
}

function onSceneMouseWheel( event ) {
    const fov = camera.fov + event.deltaY * 0.05;
    camera.fov = THREE.MathUtils.clamp( fov, 10, 100 );
    camera.updateProjectionMatrix();
}

//#region window resize
function onWindowResize() {
    width =  sceneWidth
    height = sceneHeight - sceneMarginTop - 4

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize( width, height);
}
//#endregion

function setModelOnCoordinates(model, coordinates, inObjects){
    const voxel = model.mesh;
    voxel.position.divideScalar( 1 ).floor().multiplyScalar( 1 ).addScalar( 1 );
    voxel.position.set(coordinates.x + model.translation.x, coordinates.y + model.translation.y, coordinates.z + model.translation.z)
    voxel.name = model.name;
    scene.add( voxel );
    if (inObjects) objects.push( voxel );
}



class AdministratorRackCreating extends Component {

    constructor(props){
        super(props)
        this.state = {
            racks:[
                {id: 0, text: "Стеллаж 0001", selected: true},
                {id: 1, text: "Стеллаж 0002", selected: false},
                {id: 2, text: "Стеллаж 0003", selected: false},
            ],
            depth:50,
            shelfWidth:50,
            shelfHeight:50,
            columsAmount:4,
            rowsAmount:3,
            borderWidth:2,
            color:0x885aaa,
            translationX:0,
            translationY:0,
            translationZ:-50/2,
            liftingCapacity:50
        }
    }

    setRacks = (value)=>{this.setState({racks: value});}
    setDepth = (value)=>{this.setState({depth: Number(value)});}
    setShelfWidth = (value)=>{this.setState({shelfWidth: Number(value)});}
    setShelfHeight = (value)=>{this.setState({shelfHeight: Number(value)});}
    setColumsAmount = (value)=>{this.setState({columsAmount: Number(value)});}
    setRowsAmount = (value)=>{this.setState({rowsAmount: Number(value)});}
    setBorderWidth = (value)=>{this.setState({borderWidth: Number(value)});}
    setColor = (value)=>{this.setState({color: value});}
    setTranslationX = (value)=>{this.setState({translationX: Number(value)});}
    setTranslationY = (value)=>{this.setState({translationY: Number(value)});}
    setTranslationZ = (value)=>{this.setState({translationZ: Number(value)});}
    setLiftingCapacity = (value)=>{this.setState({liftingCapacity: Number(value)});}


    componentDidMount(){
        console.log("reload 1")
        var manager = new THREE.LoadingManager();
        manager.onLoad = () => { // when all resources are loaded
            init(
                this.state.shelfWidth*this.state.columsAmount + this.state.borderWidth*(this.state.columsAmount+1), 
                this.state.depth, 
                this.state.shelfHeight*this.state.rowsAmount + this.state.borderWidth*(this.state.rowsAmount+1)
            )
            render()
            let modelCreator = new ModelCreator()
            model = modelCreator.createRack(
                "Полка", 
                0x885aaa, 
                this.state.shelfWidth, 
                this.state.shelfHeight, 
                this.state.depth, 
                this.state.columsAmount, 
                this.state.rowsAmount, 
                this.state.borderWidth, 
                new Vector3(this.state.translationX,this.state.translationY,this.state.translationZ)
            )
            setModelOnCoordinates(
                model, 
                new Vector3(0,0,0),
                true
            )
            render()
            this.timerID = setInterval(
                () => this.updateModel(),
                200
              );
        }
        let fontWeight = 'regular';
        //fontWeight = 'bold';
        let fontName = 'helvetiker' // helvetiker, optimer, gentilis, droid sans, droid serif
        var loader = new FontLoader(manager);
        loader.load('https://threejs.org/examples/fonts/droid/droid_serif_bold.typeface.json', function(response) {
            font = response;
        });
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    updateModel = ()=>{
        let shelfWidth = (this.state.shelfWidth*this.state.columsAmount + this.state.borderWidth*(this.state.columsAmount+1)) 
        let shelfDepth = this.state.depth
        //console.log(scene)
        console.log(`
            shelfWidth: ${shelfWidth}
            this.state.shelfWidth: ${this.state.shelfWidth}
            this.state.columsAmount: ${this.state.columsAmount}
            this.state.borderWidth: ${this.state.borderWidth}
            this.state.shelfWidth*this.state.columsAmount: ${this.state.shelfWidth*this.state.columsAmount}
            this.state.borderWidth*(this.state.columsAmount+1): ${this.state.columsAmount+1}
            this.state.borderWidth*(this.state.columsAmount+1): ${this.state.borderWidth*(this.state.columsAmount+1)}
            `)
        scene.children.map(obj=>{
            if (obj.type == "GridHelper"){
                // obj.size = Math.max(shelfWidth, shelfDepth)
                // obj.number = Math.max(shelfWidth, shelfDepth)
                scene.remove( obj );
                objects.splice( objects.indexOf( obj ), 1 );

                const gridHelper = new THREE.GridHelper( Math.max(shelfWidth, shelfDepth), Math.max(shelfWidth, shelfDepth) );
                gridHelper.name = "GridHelper"
                scene.add( gridHelper );
            }
            // if (obj.type == "Mesh"){
            //     scene.remove( obj );
            //     objects.splice( objects.indexOf( obj ), 1 );

            //     //grid
                

            //     const geometry = new THREE.PlaneGeometry( Math.max(shelfWidth, shelfDepth), Math.max(shelfWidth, shelfDepth) );
            //     geometry.rotateX( - Math.PI / 2 );

            //     plane = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { visible: false } ) );
            //     plane.name = "Mesh"

            //     scene.add( plane );
            //     objects.push( plane );
            // }
            if (obj.name == "Полка"){
                scene.remove( obj );
                objects.splice( objects.indexOf( obj ), 1 );
                let modelCreator = new ModelCreator()
                model = modelCreator.createRack(
                    "Полка", 
                    0x885aaa, 
                    this.state.shelfWidth, 
                    this.state.shelfHeight, 
                    this.state.depth, 
                    this.state.columsAmount, 
                    this.state.rowsAmount, 
                    this.state.borderWidth, 
                    new Vector3(0,0,0),
                )
                setModelOnCoordinates(
                    model, 
                    new Vector3(this.state.translationX,this.state.translationY,this.state.translationZ),
                    true
                )
                render()
            }
        })
        
    }

    btn_send_1=()=> {

    }

    btn_send_2=()=> {

    }


/*
rack_0001:{
    depth:50,
    shelfWidth:50,
    shelfHeight:50,
    columsAmount:4,
    rowsAmount:3,
    borderWidth:2,
    color:0x885aaa,
    translation:new Vector3(0,0,-50/2),
    shelfs:{
        shelf_1:{name:"Полка 1", 	liftingCapacity:50, row:0, column:0},
        shelf_2:{name:"Полка 2", 	liftingCapacity:50, row:0, column:1},
        shelf_3:{name:"Полка 3", 	liftingCapacity:50, row:0, column:2},
        shelf_4:{name:"Полка 4", 	liftingCapacity:50, row:0, column:3},
        shelf_5:{name:"Полка 5", 	liftingCapacity:50, row:1, column:0},
        shelf_6:{name:"Полка 6", 	liftingCapacity:50, row:1, column:1},
        shelf_7:{name:"Полка 7", 	liftingCapacity:50, row:1, column:2},
        shelf_8:{name:"Полка 8", 	liftingCapacity:50, row:1, column:3},
        shelf_9:{name:"Полка 9", 	liftingCapacity:50, row:2, column:0},
        shelf_10:{name:"Полка 10", 	liftingCapacity:50, row:2, column:1},
        shelf_11:{name:"Полка 11", 	liftingCapacity:50, row:2, column:2},
        shelf_12:{name:"Полка 12", 	liftingCapacity:50, row:2, column:3},
    }
}
*/

    render(){
        return (
            <>
            <FlexibleBlocksPage>
                <FlexibleBlock>
                    <ListWithSearch item_list={this.state.racks} func={this.setRacks} width={"200px"} height={"390px"}/>
                </FlexibleBlock>
                <FlexibleBlock>
                    <div class="header_text">Настройка</div>
                    <InputText styles = "row_with_item_wide" Id={0}  label="Глубина&nbsp;полки&nbsp;(см)&nbsp;"            placeholder="глубина полки"          defValue={this.state.depth}            set={this.setDepth}/> 
                    <InputText styles = "row_with_item_wide" Id={1}  label="Ширина&nbsp;полки&nbsp;(см)&nbsp;"             placeholder="ширина полки"           defValue={this.state.shelfWidth}       set={this.setShelfWidth}/> 
                    <InputText styles = "row_with_item_wide" Id={2}  label="Высота&nbsp;полки&nbsp;(см)&nbsp;"             placeholder="высота полки"           defValue={this.state.shelfHeight}      set={this.setShelfHeight}/> 
                    <InputText styles = "row_with_item_wide" Id={3}  label="Количество&nbsp;столбцов&nbsp;"                    placeholder="кол-во столбцов"        defValue={this.state.columsAmount}     set={this.setColumsAmount}/> 
                    <InputText styles = "row_with_item_wide" Id={4}  label="Количество&nbsp;рядов&nbsp;"                       placeholder="кол-во рядов"           defValue={this.state.rowsAmount}       set={this.setRowsAmount}/> 
                    <InputText styles = "row_with_item_wide" Id={5}  label="Толщина&nbsp;стенки&nbsp;(см)&nbsp;"           placeholder="толщина стенки"         defValue={this.state.borderWidth}      set={this.setBorderWidth}/> 
                    <InputText styles = "row_with_item_wide" Id={6}  label="Цвет&nbsp;стеллажа&nbsp;"                      placeholder="цвет стеллажа"          defValue={this.state.color}            set={this.setColor}/> 
                    <InputText styles = "row_with_item_wide" Id={7}  label="Смещение&nbsp;по&nbsp;x&nbsp;"                 placeholder="смещение по x"          defValue={this.state.translationX}     set={this.setTranslationX}/> 
                    <InputText styles = "row_with_item_wide" Id={8}  label="Смещение&nbsp;по&nbsp;y&nbsp;"                 placeholder="смещение по y"          defValue={this.state.translationY}     set={this.setTranslationY}/> 
                    <InputText styles = "row_with_item_wide" Id={9}  label="Смещение&nbsp;по&nbsp;z&nbsp;"                 placeholder="смещение по z"          defValue={this.state.translationZ}     set={this.setTranslationZ}/> 
                    <InputText styles = "row_with_item_wide" Id={10} label="Грузоподьемность&nbsp;полки&nbsp;(кг)&nbsp;"   placeholder="грузоподьемность полки" defValue={this.state.liftingCapacity}  set={this.setLiftingCapacity}/> 
                    <div></div>
                    <button class="bt_send_AdministratorRackCreating1" onClick={this.btn_send_1}>Создать новую полку</button>
                    <div class="place_holder_AdministratorRackCreating"/><button class="bt_send_AdministratorRackCreating2" onClick={this.btn_send_2}>Сохранить</button>
                </FlexibleBlock>
                <FlexibleBlock>
                    <div class="header_text">Стеллаж</div>
                    <div id="warehouseSceneWrap">
                        <div id="warehouseScene"  style={{border: "1px solid #ccc", width:"min-content"}} onContextMenu={(e)=> e.preventDefault()}/>
                    </div>
                </FlexibleBlock>
            </FlexibleBlocksPage>
        </>
        )
    }
}

export default AdministratorRackCreating