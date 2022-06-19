import FlexibleBlocksPage from "../../components/FlexibleBlocks/FlexibleBlocksPage/FlexibleBlocksPage";
import FlexibleBlock from "../../components/FlexibleBlocks/FlexibleBlock/FlexibleBlock";
import ListWithSearch from "../../components/ListWithSearch/ListWithSearch";
import InputText from "../../components/InputText/InputText";
import InputColor from 'react-input-color';
import InputTextArea from "../../components/InputTextArea/InputTextArea";

import { React, Component, Fragment } from "react";
import './AdministratorZoneCreating.css';
import * as THREE from 'three';
import { MapControls, OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import ModelCreator from "../../classes/ModelCreator.js";
import { Color, MOUSE, Vector2, Vector3 } from "three";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

import AuxiliaryMath from "../../classes/AuxiliaryMath.js";
import zIndex from "@material-ui/core/styles/zIndex";
import { Api } from "../../api/administatoApi"

var api = new Api()
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
    const gridHelper = new THREE.GridHelper( Math.max(shelfWidth, shelfDepth)+100, Math.max(shelfWidth, shelfDepth)+100 );
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

class AdministratorZoneCreating extends Component {

    lastSelId
    constructor(props){
        super(props)
        this.state = {
            reload:0,
            zones:[
                {id: 0, text: "Загрузка"},
                // {id: 1, text: "Зона 2"},
                // {id: 2, text: "Зона 3"},
            ],
            selZone:{id: 0, text: "Загрузка"},
            length:500,
            width:300,
            color:{a: 100, b: 170, g: 90, h: 275, hex: "#ffffff", r: 136, rgba: "rgba(255,255,255,1)", s: 47, v: 67},
            lineWidth:1,
            chamferLendth:10,
            message:"",
            textSize:15,
            gapLengthX: "".length * 15,
            gapLengthY: "".length * 15,
            messageAlighment:["right"],
            isAighmentTop:false,
            isAighmentBottom:false,
            isAighmentLeft:false,
            isAighmentRight:true,
            shownPanel:true,
            // messageAlighment:["top", "bottom", "left", "right"],
        }
    }

    setReload = ()=>{this.setState({reload: this.state.reload+1});}
    setZones = (value)=>{this.setState({zones: value});}
    setSelZone = (value)=>{this.setState({selZone: value});}
    setLength = (value)=>{this.setState({length: Number(value)});}
    setWidth = (value)=>{this.setState({width: Number(value)});}
    setColor = (value)=>{this.setState({color: value});}
    setLineWidth = (value)=>{this.setState({lineWidth: Number(value)});}
    setChamferLendth = (value)=>{this.setState({chamferLendth: Number(value)});}
    setMessage = (value)=>{this.setState({message: value});}
    setTextSize = (value)=>{this.setState({textSize: Number(value)});}
    setGapLengthX = (value)=>{this.setState({gapLengthX: Number(value)});}
    setGapLengthY = (value)=>{this.setState({gapLengthY: Number(value)});}
    setMessageAlighment = (value)=>{this.setState({messageAlighment: value});}
    setIsAighmentTop = (value)=>{this.setState({isAighmentTop: value})}
    setIsAighmentBottom = (value)=>{this.setState({isAighmentBottom: value})}
    setIsAighmentLeft = (value)=>{this.setState({isAighmentLeft: value})}
    setIsAighmentRight = (value)=>{this.setState({isAighmentRight: value})}

    setShownPanel = (value)=>{this.setState({shownPanel: value})}

    getZones = async() => {
        let res = []
        res = await api.getVirtualZones()
        // this.state.goods = res
        // this.state.selGood = res[0]
        
        structuredClone(this.state.zones).map(()=>{this.state.zones.pop()})
        res.map(item=>{this.state.zones.push(item)})
        this.setSelZone(res[0])
    }

    componentDidUpdate(){

        if (this.state.selZone.id!=this.lastSelId && this.state.selZone.chamferLendth!=undefined){
            let obj = this.state.selZone

            this.state.length = Number(obj.length)
            this.state.width = Number(obj.width)
            this.state.lineWidth = Number(obj.lineWidth)
            this.state.chamferLendth = Number(obj.chamferLendth)
            this.state.color = obj.color
            this.state.message = obj.message
            this.state.textSize = Number(obj.textSize)
            this.state.gapLengthX = Number(obj.gapLengthX)
            this.state.gapLengthY = Number(obj.gapLengthY)
            this.state.messageAlighment = obj.messageAlighment
            this.state.isAighmentTop = Boolean(obj.isAighmentTop)
            this.state.isAighmentBottom = Boolean(obj.isAighmentBottom)
            this.state.isAighmentRight = Boolean(obj.isAighmentRight)
            this.state.isAighmentLeft = Boolean(obj.isAighmentLeft)

            this.lastSelId = this.state.selZone.id
            this.setShownPanel(!this.state.shownPanel)
            this.updateModel()
            this.updateModel()
        }
    }

    componentDidMount(){
        var manager = new THREE.LoadingManager();
        manager.onLoad = () => { // when all resources are loaded
            if (this.state.zones.length < 2) this.getZones()
            init(
                this.state.width, 
                this.state.length, 
                100
            )
            render()
            model = modelCreator.createZoneBorder(
                "Модель", 
                this.state.color.rgba, 
                this.state.width, 
                this.state.length, 
                this.state.lineWidth, 
                this.state.chamferLendth, 
                this.state.message, 
                this.state.messageAlighment, 
                font, 
                this.state.textSize, 
                this.state.gapLengthX, 
                this.state.gapLengthY, 
                new Vector3(0,0,0)
            )
            setModelOnCoordinates(
                model,
                new Vector3(0,0,0),
                false
            )
            render()
            this.updateModel()
            //this.timerID = setInterval(() => this.updateModel(), 500);
        }
        let fontWeight = 'regular';
        //fontWeight = 'bold';
        let fontName = 'helvetiker' // helvetiker, optimer, gentilis, droid sans, droid serif
        var loader = new FontLoader(manager);
        loader.load('https://threejs.org/examples/fonts/droid/droid_serif_bold.typeface.json', function(response) {
            font = response;
        });
    }

    //componentWillUnmount() {clearInterval(this.timerID);}

    updateModel = ()=>{
        scene.children.map(obj=>{
            if (obj.type == "GridHelper"){
                scene.remove( obj );
                objects.splice( objects.indexOf( obj ), 1 );
                const gridHelper = new THREE.GridHelper( Math.max(this.state.width, this.state.length)+100, Math.max(this.state.width, this.state.length)+100 );
                gridHelper.name = "GridHelper"
                scene.add( gridHelper );
            }
            if (obj.name == "Модель"){
                scene.remove( obj );
                objects.splice( objects.indexOf( obj ), 1 );
                model = modelCreator.createZoneBorder(
                    "Модель", 
                    this.state.color.rgba, 
                    this.state.width, 
                    this.state.length, 
                    this.state.lineWidth, 
                    this.state.chamferLendth, 
                    this.state.message, 
                    this.state.messageAlighment, 
                    font, 
                    this.state.textSize, 
                    this.state.gapLengthX, 
                    this.state.gapLengthY, 
                    new Vector3(0,0,0)
                )
                setModelOnCoordinates(
                    model, 
                    new Vector3(0,0,0),
                    false
                )
                render()
            }
        })
        
    }

    onCheckbox=(i)=>{
        if (i==0)this.setIsAighmentTop(!this.state.isAighmentTop)
        if (i==1)this.setIsAighmentBottom(!this.state.isAighmentBottom)
        if (i==2)this.setIsAighmentLeft(!this.state.isAighmentLeft)
        if (i==3)this.setIsAighmentRight(!this.state.isAighmentRight)
        this.timer = setTimeout(this.onMessageAlighment, 100);  
    }



onMessageAlighment=()=>{
    let buf = []
    if (this.state.isAighmentTop) buf.push("top")
    if (this.state.isAighmentBottom) buf.push("bottom")
    if (this.state.isAighmentLeft) buf.push("left")
    if (this.state.isAighmentRight) buf.push("right")
    this.setMessageAlighment(buf)
}

    btn_send_1=()=> {
        this.state.zones.push(
            {
                id: (Number(this.state.zones[this.state.zones.length - 1].id) + 1),
                // text: `Зона ${Number(this.state.zones[this.state.zones.length - 1].text.split(" ")[1]) + 1}`, 
                text: `Зона ${Number(this.state.zones[this.state.zones.length - 1].id) + 1}`, 
                length:500,
                width:300,
                color:{a: 100, b: 170, g: 90, h: 275, hex: "#ffffff", r: 136, rgba: "rgba(255,255,255,1)", s: 47, v: 67},
                lineWidth:1,
                chamferLendth:10,
                message:"",
                textSize:15,
                gapLengthX: "".length * 15,
                gapLengthY: "".length * 15,
                messageAlighment:["right"],
                isAighmentTop:false,
                isAighmentBottom:false,
                isAighmentLeft:false,
                isAighmentRight:true,
            }
        )
        this.setSelZone(this.state.zones[this.state.zones.length-1])
        let zone = this.state
        let alighments = ""
        let iter = 0
        for (let item of zone.messageAlighment){
            if (iter != zone.messageAlighment.length-1) alighments += `${item}/`
            else alighments += `${item}`
            iter += 1
        }

        let body = {
            id: zone.zones[zone.zones.length-1].id,
            width: zone.width,
            height: zone.length,
            color: zone.color.rgba,
            line_width: zone.lineWidth,
            chamfer_length: zone.chamferLendth,
            name: "Зона -",
            text_size: zone.textSize,
            message_alighment: alighments,
        }
        //console.log(body)
        api.postVirtualZones(body)
        this.updateModel()
        this.updateModel()
    }

    btn_send_2=()=> {
        this.updateModel()
        this.updateModel()
    }

    btn_send_3=()=> {
        let zone = this.state
        let alighments = ""
        let iter = 0
        for (let item of zone.messageAlighment){
            if (iter != zone.messageAlighment.length-1) alighments += `${item}/`
            else alighments += `${item}`
            iter += 1
        }

        let body = {
            id: zone.selZone.id,
            width: zone.width,
            height: zone.length,
            color: zone.color.rgba,
            line_width: zone.lineWidth,
            chamfer_length: zone.chamferLendth,
            name: zone.message,
            text_size: zone.textSize,
            message_alighment: alighments,
        }
        api.updateVirtualZones(body)
    }

    btn_send_4=()=> {
        let body = {
            id: this.state.selZone.id,
        }
        this.deleteVirtualZones(body)
        let buf = structuredClone(this.state.zones)
        structuredClone(this.state.zones).map(()=>{this.state.zones.pop()})
        buf.map(item=>{if (item.id!=this.state.selZone.id) {this.state.zones.push(item)}})
        this.setSelZone(this.state.zones[0])
    }

    deleteVirtualZones = async(value) => {
        let res = api.deleteVirtualZones(value)
        res.then(res=> {
            alert(res)
        })
    }

    render(){
        return (
            <>
                <FlexibleBlocksPage marginTop={152}>
                    <FlexibleBlock background={false} paddings={false}>
                        <ListWithSearch item_list={this.state.zones} selItem={this.state.selZone} func={this.setSelZone} width={200} height={430}/>
                    </FlexibleBlock>
                    <FlexibleBlock>
                        {this.state.shownPanel
                        &&<>
                            <div class="header_text">Настройка</div>
                            <InputText styles = "row_with_item_wide" label="Длинна&nbsp;зоны&nbsp;(см)&nbsp;"       placeholder="длинна зоны"           defValue={this.state.length}            set={this.setLength} mask={/^[0-9]{0,10}$/i} maskExample="быть числом больше нуля"/> 
                            <InputText styles = "row_with_item_wide" label="Ширина&nbsp;зоны&nbsp;(см)&nbsp;"       placeholder="ширина зоны"           defValue={this.state.width}             set={this.setWidth} mask={/^[0-9]{0,10}$/i} maskExample="быть числом больше нуля"/>
                            <div class = "low_text row_with_item_wide"><div>Цвет&nbsp;границы&nbsp;зоны:&nbsp;</div><InputColor initialValue={this.state.color.hex} onChange={this.setColor} placement="right"/></div>
                            <InputText styles = "row_with_item_wide" label="Ширина&nbsp;границы&nbsp;зоны&nbsp;"    placeholder="ширина границы зоны"   defValue={this.state.lineWidth}         set={this.setLineWidth} mask={/^[0-9]{0,10}$/i} maskExample="быть числом больше нуля"/> 
                            <InputText styles = "row_with_item_wide" label="Длинна&nbsp;фаски&nbsp;"                placeholder="длинна фаски"          defValue={this.state.chamferLendth}     set={this.setChamferLendth} mask={/^[0-9]{0,10}$/i} maskExample="быть числом больше нуля"/> 
                            <InputText styles = "row_with_item_wide" label="Надпись&nbsp;зоны&nbsp;"                placeholder="надпись зоны"          defValue={this.state.message}           set={this.setMessage} /> 
                            <InputText styles = "row_with_item_wide" label="Размер&nbsp;текста&nbsp;надписи&nbsp;"  placeholder="размер текста надписи" defValue={this.state.textSize}          set={this.setTextSize} mask={/^[0-9]{0,10}$/i} maskExample="быть числом больше нуля"/> 
                            <InputText styles = "row_with_item_wide" label="Вырез&nbsp;по&nbsp;оси&nbsp;x&nbsp;"    placeholder="вырез по оси x"        defValue={this.state.gapLengthX}        set={this.setGapLengthX} mask={/^[0-9]{0,10}$/i} maskExample="быть числом больше нуля"/> 
                            <InputText styles = "row_with_item_wide" label="Вырез&nbsp;по&nbsp;оси&nbsp;y&nbsp;"    placeholder="вырез по оси y"        defValue={this.state.gapLengthY}        set={this.setGapLengthY} mask={/^[0-9]{0,10}$/i} maskExample="быть числом больше нуля"/> 
                            
                            <div class = "low_text">Положение&nbsp;надписей:
                                <label><input type="checkbox" defaultChecked={this.state.isAighmentTop}    onChange={()=>{this.onCheckbox(0)}}/>Сверху</label>
                                <label><input type="checkbox" defaultChecked={this.state.isAighmentBottom} onChange={()=>{this.onCheckbox(1)}}/>Снизу</label>
                                <label><input type="checkbox" defaultChecked={this.state.isAighmentLeft}   onChange={()=>{this.onCheckbox(2)}}/>Слева</label>
                                <label><input type="checkbox" defaultChecked={this.state.isAighmentRight}  onChange={()=>{this.onCheckbox(3)}}/>Справа</label>
                            </div>

                            <div style={{width:'485px'}}></div>
                            <button class="bt_send_AdministratorZoneCreating1" onClick={this.btn_send_1}>Создать новую зону</button>
                            <div class="place_holder_AdministratorZoneCreating"/>
                            <button class="bt_send_AdministratorZoneCreating2" style={{marginRight:"5px"}} onClick={this.btn_send_2}>Построить</button>
                            <button class="bt_send_AdministratorZoneCreating2" onClick={this.btn_send_3}>Сохранить</button>
                            <button class="bt_send_AdministratorZoneCreating3" onClick={this.btn_send_4}>Удалить</button>
                        </>
                        }
                        {!this.state.shownPanel
                        &&<>
                        <div class="header_text">Настройка</div>
                        <InputText styles = "row_with_item_wide" label="Длинна&nbsp;зоны&nbsp;(см)&nbsp;"       placeholder="длинна зоны"           defValue={this.state.length}            set={this.setLength} mask={/^[0-9]{0,10}$/i} maskExample="быть числом больше нуля"/> 
                        <InputText styles = "row_with_item_wide" label="Ширина&nbsp;зоны&nbsp;(см)&nbsp;"       placeholder="ширина зоны"           defValue={this.state.width}             set={this.setWidth} mask={/^[0-9]{0,10}$/i} maskExample="быть числом больше нуля"/>
                        <div class = "low_text row_with_item_wide"><div>Цвет&nbsp;границы&nbsp;зоны:&nbsp;</div><InputColor initialValue={this.state.color.hex} onChange={this.setColor} placement="right"/></div>
                        <InputText styles = "row_with_item_wide" label="Ширина&nbsp;границы&nbsp;зоны&nbsp;"    placeholder="ширина границы зоны"   defValue={this.state.lineWidth}         set={this.setLineWidth} mask={/^[0-9]{0,10}$/i} maskExample="быть числом больше нуля"/> 
                        <InputText styles = "row_with_item_wide" label="Длинна&nbsp;фаски&nbsp;"                placeholder="длинна фаски"          defValue={this.state.chamferLendth}     set={this.setChamferLendth} mask={/^[0-9]{0,10}$/i} maskExample="быть числом больше нуля"/> 
                        <InputText styles = "row_with_item_wide" label="Надпись&nbsp;зоны&nbsp;"                placeholder="надпись зоны"          defValue={this.state.message}           set={this.setMessage} /> 
                        <InputText styles = "row_with_item_wide" label="Размер&nbsp;текста&nbsp;надписи&nbsp;"  placeholder="размер текста надписи" defValue={this.state.textSize}          set={this.setTextSize} mask={/^[0-9]{0,10}$/i} maskExample="быть числом больше нуля"/> 
                        <InputText styles = "row_with_item_wide" label="Вырез&nbsp;по&nbsp;оси&nbsp;x&nbsp;"    placeholder="вырез по оси x"        defValue={this.state.gapLengthX}        set={this.setGapLengthX} mask={/^[0-9]{0,10}$/i} maskExample="быть числом больше нуля"/> 
                        <InputText styles = "row_with_item_wide" label="Вырез&nbsp;по&nbsp;оси&nbsp;y&nbsp;"    placeholder="вырез по оси y"        defValue={this.state.gapLengthY}        set={this.setGapLengthY} mask={/^[0-9]{0,10}$/i} maskExample="быть числом больше нуля"/> 
                        
                        <div class = "low_text">Положение&nbsp;надписей:
                            <label><input type="checkbox" defaultChecked={this.state.isAighmentTop}    onChange={()=>{this.onCheckbox(0)}}/>Сверху</label>
                            <label><input type="checkbox" defaultChecked={this.state.isAighmentBottom} onChange={()=>{this.onCheckbox(1)}}/>Снизу</label>
                            <label><input type="checkbox" defaultChecked={this.state.isAighmentLeft}   onChange={()=>{this.onCheckbox(2)}}/>Слева</label>
                            <label><input type="checkbox" defaultChecked={this.state.isAighmentRight}  onChange={()=>{this.onCheckbox(3)}}/>Справа</label>
                        </div>

                        <div style={{width:'485px'}}></div>
                        <button class="bt_send_AdministratorZoneCreating1" onClick={this.btn_send_1}>Создать новую зону</button>
                        <div class="place_holder_AdministratorZoneCreating"/>
                        <button class="bt_send_AdministratorZoneCreating2" style={{marginRight:"5px"}} onClick={this.btn_send_2}>Построить</button>
                        <button class="bt_send_AdministratorZoneCreating2" onClick={this.btn_send_3}>Сохранить</button>
                        <button class="bt_send_AdministratorZoneCreating3" onClick={this.btn_send_4}>Удалить</button>
                    </>
                        }
                        

                    </FlexibleBlock>
                    <FlexibleBlock>
                        <div class="header_text">Зона</div>
                        <div id="warehouseSceneWrap">
                            <div id="warehouseScene"  style={{border: "1px solid #ccc", width:"min-content"}} onContextMenu={(e)=> e.preventDefault()}/>
                        </div>
                    </FlexibleBlock>
                </FlexibleBlocksPage>
            </>
        )
    }
}

export default AdministratorZoneCreating