import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";
import ListWithSearch from "../../components/ListWithSearch/ListWithSearch";
import InputText from "../../components/InputText/InputText";
import InputColor from 'react-input-color';

import { React, Component, Fragment } from "react";
import './AdministratorRackCreating.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import ModelCreator from "../../classes/ModelCreator.js";
import { Color, MOUSE, Vector2, Vector3 } from "three";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

import AuxiliaryMath from "../../classes/AuxiliaryMath.js";
import zIndex from "@material-ui/core/styles/zIndex";

const styles = {

}

let modelCreator = new ModelCreator()
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
    camera.position.set( Math.max(shelfWidth, shelfDepth)*2, shelfHeight*2, Math.max(shelfWidth, shelfDepth)*2 );

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
            reload:0,
            racks:[
                {id: 0, text: "Стеллаж 1"},
                {id: 1, text: "Стеллаж 2"},
                {id: 2, text: "Стеллаж 3"},
            ],
            selRack:{id: 0, text: "Стеллаж 1"},
            depth:50,
            shelfWidth:50,
            shelfHeight:50,
            columsAmount:4,
            rowsAmount:3,
            borderWidth:2,
            color:{a: 100, b: 170, g: 90, h: 275, hex: "#885aaa", r: 136, rgba: "rgba(136,90,170,1)", s: 47, v: 67},
            translationX:0,
            translationY:0,
            translationZ:-50/2,
            liftingCapacity:50,
            freeSpaceX:0,
			freeSpaceY:50,
        }
    }

    setReload = ()=>{this.setState({reload: this.state.reload+1});}
    setRacks = (value)=>{this.setState({racks: value});}
    setRack = (value)=>{this.setState({selRack: value});}
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
    setFreeSpaceX = (value)=>{this.setState({freeSpaceX: Number(value)});}
    setFreeSpaceY = (value)=>{this.setState({freeSpaceY: Number(value)});}


    componentDidMount(){
        var manager = new THREE.LoadingManager();
        manager.onLoad = () => { // when all resources are loaded
            init(
                this.state.shelfWidth*this.state.columsAmount + this.state.borderWidth*(this.state.columsAmount+1), 
                this.state.depth, 
                this.state.shelfHeight*this.state.rowsAmount + this.state.borderWidth*(this.state.rowsAmount+1)
            )
            render()
            model = modelCreator.createRack(
                "Модель", 
                this.state.color.rgba, 
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
            let limiterLineModel = modelCreator.createSpacelimiterBorder(
                this.state.shelfWidth*this.state.columsAmount + this.state.borderWidth*(this.state.columsAmount+1), 
                this.state.depth, 
                this.state.freeSpaceX, 
                this.state.freeSpaceY,
                new Vector3(0,0,0),
                { color: 0xffffff, opacity: 1, transparent: false },
            )
            setModelOnCoordinates(
                limiterLineModel, 
                new Vector3(0,0,0),
                true
            )
            render()
            this.timerID = setInterval(() => this.updateModel(), 200);
        }
        let fontWeight = 'regular';
        //fontWeight = 'bold';
        let fontName = 'helvetiker' // helvetiker, optimer, gentilis, droid sans, droid serif
        var loader = new FontLoader(manager);
        loader.load('https://threejs.org/examples/fonts/droid/droid_serif_bold.typeface.json', function(response) {
            font = response;
        });
    }

    componentWillUnmount() {clearInterval(this.timerID);}

    updateModel = ()=>{
        let shelfWidth = (this.state.shelfWidth*this.state.columsAmount + this.state.borderWidth*(this.state.columsAmount+1)) 
        let shelfDepth = this.state.depth
        scene.children.map(obj=>{
            if (obj.type == "GridHelper"){
                scene.remove( obj );
                objects.splice( objects.indexOf( obj ), 1 );
                const gridHelper = new THREE.GridHelper( Math.max(shelfWidth + this.state.freeSpaceX*2 + 10, shelfDepth + this.state.freeSpaceY*2 + 10), Math.max(shelfWidth + this.state.freeSpaceX*2 + 10, shelfDepth  + this.state.freeSpaceY*2 + 10) );
                gridHelper.name = "GridHelper"
                scene.add( gridHelper );
            }
            if (obj.name == "limiterLine"){
                scene.remove( obj );
                objects.splice( objects.indexOf( obj ), 1 );
                let limiterLineModel = modelCreator.createSpacelimiterBorder(
                    this.state.shelfWidth*this.state.columsAmount + this.state.borderWidth*(this.state.columsAmount+1), 
                    this.state.depth, 
                    this.state.freeSpaceX, 
                    this.state.freeSpaceY,
                    new Vector3(0,0,0),
                    { color: 0xffffff, opacity: 1, transparent: false },
                )
                setModelOnCoordinates(
                    limiterLineModel, 
                    new Vector3(0,0,0),
                    true
                )
                render()
            }
            if (obj.name == "Модель"){
                scene.remove( obj );
                objects.splice( objects.indexOf( obj ), 1 );
                model = modelCreator.createRack(
                    "Модель", 
                    this.state.color.rgba, 
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
        this.state.racks.push(
            {
                id: (Number(this.state.racks[this.state.racks.length - 1].id) + 1),
                text: `Стеллаж ${Number(this.state.racks[this.state.racks.length - 1].text.split(" ")[1])+1}`, 
            }
        )
        this.setRack(this.state.racks[this.state.racks.length-1])
    }

    btn_send_2=()=> {

    }

    btn_send_3=()=> {

    }

    render(){
        return (
            <div id = "pageWrap">
            <FlexibleBlocksPage marginTop={152}>
                <FlexibleBlock>
                    <ListWithSearch item_list={this.state.racks} selItem={this.state.selRack} func={this.setRack} width={"200px"} height={"390px"}/>
                </FlexibleBlock>
                <FlexibleBlock>
                    <div class="header_text">Настройка</div>
                    <InputText styles = "row_with_item_wide" label="Глубина&nbsp;полки&nbsp;(см)&nbsp;" placeholder="глубина полки"   defValue={this.state.depth}            set={this.setDepth} mask={/^[0-9]{0,10}$/i} maskExample="быть числом больше нуля"/> 
                    <InputText styles = "row_with_item_wide" label="Ширина&nbsp;полки&nbsp;(см)&nbsp;"  placeholder="ширина полки"    defValue={this.state.shelfWidth}       set={this.setShelfWidth} mask={/^[0-9]{0,10}$/i} maskExample="быть числом больше нуля"/> 
                    <InputText styles = "row_with_item_wide" label="Высота&nbsp;полки&nbsp;(см)&nbsp;"  placeholder="высота полки"    defValue={this.state.shelfHeight}      set={this.setShelfHeight} mask={/^[0-9]{0,10}$/i} maskExample="быть числом больше нуля"/> 
                    <InputText styles = "row_with_item_wide" label="Количество&nbsp;столбцов&nbsp;"     placeholder="кол-во столбцов" defValue={this.state.columsAmount}     set={this.setColumsAmount} mask={/^[0-9]{0,10}$/i} maskExample="быть числом больше нуля"/> 
                    <InputText styles = "row_with_item_wide" label="Количество&nbsp;рядов&nbsp;"        placeholder="кол-во рядов"    defValue={this.state.rowsAmount}       set={this.setRowsAmount} mask={/^[0-9]{0,10}$/i} maskExample="быть числом больше нуля"/> 
                    <InputText styles = "row_with_item_wide" label="Толщина&nbsp;стенки&nbsp;(см)&nbsp;" placeholder="толщина стенки" defValue={this.state.borderWidth}      set={this.setBorderWidth} mask={/^[0-9]{0,10}$/i} maskExample="быть числом больше нуля"/> 
                    <div class = "low_text row_with_item_wide">
                        <div>Цвет&nbsp;стеллажа:&nbsp;</div>
                        <InputColor initialValue={this.state.color.hex} onChange={this.setColor} placement="right"/>
                    </div>
                    <InputText styles = "row_with_item_wide" label="Смещение&nbsp;по&nbsp;x&nbsp;"                 placeholder="смещение по x"          defValue={this.state.translationX}     set={this.setTranslationX} mask={/^[-0-9]{0,10}$/i} maskExample="быть числом"/> 
                    <InputText styles = "row_with_item_wide" label="Смещение&nbsp;по&nbsp;y&nbsp;"                 placeholder="смещение по y"          defValue={this.state.translationY}     set={this.setTranslationY} mask={/^[-0-9]{0,10}$/i} maskExample="быть числом"/> 
                    <InputText styles = "row_with_item_wide" label="Смещение&nbsp;по&nbsp;z&nbsp;"                 placeholder="смещение по z"          defValue={this.state.translationZ}     set={this.setTranslationZ} mask={/^[-0-9]{0,10}$/i} maskExample="быть числом"/> 
                    <InputText styles = "row_with_item_wide" label="Грузоподьемность&nbsp;полки&nbsp;(кг)&nbsp;"   placeholder="грузоподьемность полки" defValue={this.state.liftingCapacity}  set={this.setLiftingCapacity} mask={/^[0-9]{0,10}$/i} maskExample="быть числом больше нуля"/> 
                    <InputText styles = "row_with_item_wide" label="Свободная&nbsp;зона&nbsp;вокруг&nbsp;полки&nbsp;по&nbsp;Х&nbsp;(см)"   placeholder="cвободная зона вокруг полки по Х" defValue={this.state.freeSpaceX} set={this.setFreeSpaceX} mask={/^[0-9]{0,10}$/i} maskExample="быть числом больше нуля"/> 
                    <InputText styles = "row_with_item_wide" label="Свободная&nbsp;зона&nbsp;вокруг&nbsp;полки&nbsp;по&nbsp;Y&nbsp;(см)"   placeholder="cвободная зона вокруг полки по Y" defValue={this.state.freeSpaceY} set={this.setFreeSpaceY} mask={/^[0-9]{0,10}$/i} maskExample="быть числом больше нуля"/> 
                    <div></div>
                    <button class="bt_send_AdministratorRackCreating1" onClick={this.btn_send_1}>Создать новую полку</button>
                    <div class="place_holder_AdministratorRackCreating"/><button class="bt_send_AdministratorRackCreating2" onClick={this.btn_send_2}>Сохранить</button>
                    <button class="bt_send_AdministratorRackCreating3" onClick={this.btn_send_3}>Удалить</button>
                </FlexibleBlock>
                <FlexibleBlock>
                    <div class="header_text">Стеллаж</div>
                    <div id="warehouseSceneWrap">
                        <div id="warehouseScene"  style={{border: "1px solid #ccc", width:"min-content"}} onContextMenu={(e)=> e.preventDefault()}/>
                    </div>
                </FlexibleBlock>
            </FlexibleBlocksPage>
        </div>
        )
    }
}

export default AdministratorRackCreating