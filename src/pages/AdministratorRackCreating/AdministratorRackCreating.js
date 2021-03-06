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

    lastSelId
    constructor(props){
        super(props)
        this.state = {
            reload:0,
            racks:[
                {id: 0, text: "????????????????"},
                // {id: 1, text: "?????????????? 2"},
                // {id: 2, text: "?????????????? 3"},
            ],
            selRack:{id: 0, text: "????????????????"},
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
            shownPanel:true,
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

    setShownPanel = (value)=>{this.setState({shownPanel: value})}

    getRacks = async() => {
        let api = new Api()
        let res = []
        res = await api.getVirtualRacks()
        // this.state.goods = res
        // this.state.selGood = res[0]
        
        structuredClone(this.state.racks).map(()=>{this.state.racks.pop()})
        res.map(item=>{this.state.racks.push(item)})
        this.setRack(res[0])
    }

    componentDidUpdate(){

        if (this.state.selRack.id!=this.lastSelId && this.state.selRack.depth!=undefined){
            let obj = this.state.selRack
            console.log("obj")
            console.log(obj)
            this.state.depth = obj.depth
            this.state.shelfWidth = obj.width!=undefined?obj.width:obj.shelfWidth
            this.state.shelfHeight = obj.height!=undefined?obj.height:obj.shelfHeight
            this.state.columsAmount = obj.columsAmount
            this.state.rowsAmount = obj.rowsAmount
            this.state.borderWidth = obj.borderWidth
            this.state.color = obj.color
            this.state.liftingCapacity = obj.liftingCapacity
            this.state.freeSpaceX = obj.freeSpaceX
            this.state.freeSpaceY = obj.freeSpaceY
            this.state.translationX = obj.translationX
            this.state.translationY = obj.translationY
            this.state.translationZ = obj.translationZ

            this.lastSelId = this.state.selRack.id
            this.setShownPanel(!this.state.shownPanel)
        }
    }

    componentDidMount(){
        var manager = new THREE.LoadingManager();
        manager.onLoad = () => { // when all resources are loaded
            if (this.state.racks[0].text == "????????????????") this.getRacks()
            init(
                this.state.shelfWidth*this.state.columsAmount + this.state.borderWidth*(this.state.columsAmount+1), 
                this.state.depth, 
                this.state.shelfHeight*this.state.rowsAmount + this.state.borderWidth*(this.state.rowsAmount+1)
            )
            render()
            model = modelCreator.createRack(
                "????????????", 
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
            if (obj.name == "????????????"){
                scene.remove( obj );
                objects.splice( objects.indexOf( obj ), 1 );
                model = modelCreator.createRack(
                    "????????????", 
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
        let new_id = Number(this.state.racks[this.state.racks.length - 1].id) + 1 
        
        let body = {
            id: new_id,
            depth: 50,
            shelf_width: 50,
            shelf_height: 50,
            columns_amount: 4,
            rows_amount: 3,
            border_width: 2,
            color: "rgba(136,90,170,1)",
            translation: `0/0/-25`,
            lifting_capacity: 50,
            free_space_x: 0,
            free_space_y: 50
        }
        api.insertVirtualRacks(body)

        this.state.racks.push(
            {
                id: new_id,
                text: `?????????????? ${Number(this.state.racks[this.state.racks.length - 1].text.split(" ")[1])+1}`, 
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
        )
        this.setRack(this.state.racks[this.state.racks.length-1])
    }

    btn_send_2=()=> {
        console.log(this.state.selRack)
        let rack = this.state
        let body = {
            id: rack.selRack.id,
            depth: rack.depth,
            shelf_width: rack.shelfWidth,
            shelf_height: rack.shelfHeight,
            columns_amount: rack.columsAmount,
            rows_amount: rack.rowsAmount,
            border_width: rack.borderWidth,
            color: rack.color.rgba,
            translation: `${rack.translationX}/${rack.translationY}/${rack.translationZ}`,
            free_space_x: rack.freeSpaceX,
            free_space_y: rack.freeSpaceY,
            lifting_capacity: rack.liftingCapacity
        }
        api.updateVirtualRacks(body)
    }

    btn_send_3=()=> {
        let body = {
            id: this.state.selRack.id,
        }
        this.deleteVirtualRacks(body)
    }

    deleteVirtualRacks = async(value) => {
        let res = api.deleteVirtualRacks(value)
        res.then(res=> {
            alert(res)
        })
        let buf = structuredClone(this.state.racks)
        structuredClone(this.state.racks).map(()=>{this.state.racks.pop()})
        buf.map(item=>{if (item.id!=this.state.selRack.id) {this.state.racks.push(item)}})
        this.setRack(this.state.racks[0])
    }

    render(){
        return (
            <div id = "pageWrap">
            <FlexibleBlocksPage marginTop={152}>
                <FlexibleBlock background={false} paddings={false}>
                    <ListWithSearch item_list={this.state.racks} selItem={this.state.selRack} func={this.setRack} width={200} height={430}/>
                </FlexibleBlock>
                <FlexibleBlock>
                    {this.state.shownPanel
                        &&<>
                            <div class="header_text">??????????????????</div>
                            <InputText styles = "row_with_item_wide" label="??????????????&nbsp;??????????&nbsp;(????)&nbsp;" placeholder="?????????????? ??????????"   defValue={this.state.depth}            set={this.setDepth} mask={/^[0-9]{0,10}$/i} maskExample="???????? ???????????? ???????????? ????????"/> 
                            <InputText styles = "row_with_item_wide" label="????????????&nbsp;??????????&nbsp;(????)&nbsp;"  placeholder="???????????? ??????????"    defValue={this.state.shelfWidth}       set={this.setShelfWidth} mask={/^[0-9]{0,10}$/i} maskExample="???????? ???????????? ???????????? ????????"/> 
                            <InputText styles = "row_with_item_wide" label="????????????&nbsp;??????????&nbsp;(????)&nbsp;"  placeholder="???????????? ??????????"    defValue={this.state.shelfHeight}      set={this.setShelfHeight} mask={/^[0-9]{0,10}$/i} maskExample="???????? ???????????? ???????????? ????????"/> 
                            <InputText styles = "row_with_item_wide" label="????????????????????&nbsp;????????????????&nbsp;"     placeholder="??????-???? ????????????????" defValue={this.state.columsAmount}     set={this.setColumsAmount} mask={/^[0-9]{0,10}$/i} maskExample="???????? ???????????? ???????????? ????????"/> 
                            <InputText styles = "row_with_item_wide" label="????????????????????&nbsp;??????????&nbsp;"        placeholder="??????-???? ??????????"    defValue={this.state.rowsAmount}       set={this.setRowsAmount} mask={/^[0-9]{0,10}$/i} maskExample="???????? ???????????? ???????????? ????????"/> 
                            <InputText styles = "row_with_item_wide" label="??????????????&nbsp;????????????&nbsp;(????)&nbsp;" placeholder="?????????????? ????????????" defValue={this.state.borderWidth}      set={this.setBorderWidth} mask={/^[0-9]{0,10}$/i} maskExample="???????? ???????????? ???????????? ????????"/> 
                            <div class = "low_text row_with_item_wide">
                                <div>????????&nbsp;????????????????:&nbsp;</div>
                                <InputColor initialValue={this.state.color.hex} onChange={this.setColor} placement="right"/>
                            </div>
                            <InputText styles = "row_with_item_wide" label="????????????????&nbsp;????&nbsp;x&nbsp;"                 placeholder="???????????????? ???? x"          defValue={this.state.translationX}     set={this.setTranslationX} mask={/^[-0-9]{0,10}$/i} maskExample="???????? ????????????"/> 
                            <InputText styles = "row_with_item_wide" label="????????????????&nbsp;????&nbsp;y&nbsp;"                 placeholder="???????????????? ???? y"          defValue={this.state.translationY}     set={this.setTranslationY} mask={/^[-0-9]{0,10}$/i} maskExample="???????? ????????????"/> 
                            <InputText styles = "row_with_item_wide" label="????????????????&nbsp;????&nbsp;z&nbsp;"                 placeholder="???????????????? ???? z"          defValue={this.state.translationZ}     set={this.setTranslationZ} mask={/^[-0-9]{0,10}$/i} maskExample="???????? ????????????"/> 
                            <InputText styles = "row_with_item_wide" label="????????????????????????????????&nbsp;??????????&nbsp;(????)&nbsp;"   placeholder="???????????????????????????????? ??????????" defValue={this.state.liftingCapacity}  set={this.setLiftingCapacity} mask={/^[0-9]{0,10}$/i} maskExample="???????? ???????????? ???????????? ????????"/> 
                            <InputText styles = "row_with_item_wide" label="??????????????????&nbsp;????????&nbsp;????????????&nbsp;??????????&nbsp;????&nbsp;??&nbsp;(????)"   placeholder="c???????????????? ???????? ???????????? ?????????? ???? ??" defValue={this.state.freeSpaceX} set={this.setFreeSpaceX} mask={/^[0-9]{0,10}$/i} maskExample="???????? ???????????? ???????????? ????????"/> 
                            <InputText styles = "row_with_item_wide" label="??????????????????&nbsp;????????&nbsp;????????????&nbsp;??????????&nbsp;????&nbsp;Y&nbsp;(????)"   placeholder="c???????????????? ???????? ???????????? ?????????? ???? Y" defValue={this.state.freeSpaceY} set={this.setFreeSpaceY} mask={/^[0-9]{0,10}$/i} maskExample="???????? ???????????? ???????????? ????????"/> 
                            <div></div>
                            <button class="bt_send_AdministratorRackCreating1" onClick={this.btn_send_1}>?????????????? ?????????? ??????????</button>
                            <div class="place_holder_AdministratorRackCreating"/><button class="bt_send_AdministratorRackCreating2" onClick={this.btn_send_2}>??????????????????</button>
                            <button class="bt_send_AdministratorRackCreating3" onClick={this.btn_send_3}>??????????????</button>
                        </>
                    }
                    {!this.state.shownPanel
                        &&<>
                            <div class="header_text">??????????????????</div>
                            <InputText styles = "row_with_item_wide" label="??????????????&nbsp;??????????&nbsp;(????)&nbsp;" placeholder="?????????????? ??????????"   defValue={this.state.depth}            set={this.setDepth} mask={/^[0-9]{0,10}$/i} maskExample="???????? ???????????? ???????????? ????????"/> 
                            <InputText styles = "row_with_item_wide" label="????????????&nbsp;??????????&nbsp;(????)&nbsp;"  placeholder="???????????? ??????????"    defValue={this.state.shelfWidth}       set={this.setShelfWidth} mask={/^[0-9]{0,10}$/i} maskExample="???????? ???????????? ???????????? ????????"/> 
                            <InputText styles = "row_with_item_wide" label="????????????&nbsp;??????????&nbsp;(????)&nbsp;"  placeholder="???????????? ??????????"    defValue={this.state.shelfHeight}      set={this.setShelfHeight} mask={/^[0-9]{0,10}$/i} maskExample="???????? ???????????? ???????????? ????????"/> 
                            <InputText styles = "row_with_item_wide" label="????????????????????&nbsp;????????????????&nbsp;"     placeholder="??????-???? ????????????????" defValue={this.state.columsAmount}     set={this.setColumsAmount} mask={/^[0-9]{0,10}$/i} maskExample="???????? ???????????? ???????????? ????????"/> 
                            <InputText styles = "row_with_item_wide" label="????????????????????&nbsp;??????????&nbsp;"        placeholder="??????-???? ??????????"    defValue={this.state.rowsAmount}       set={this.setRowsAmount} mask={/^[0-9]{0,10}$/i} maskExample="???????? ???????????? ???????????? ????????"/> 
                            <InputText styles = "row_with_item_wide" label="??????????????&nbsp;????????????&nbsp;(????)&nbsp;" placeholder="?????????????? ????????????" defValue={this.state.borderWidth}      set={this.setBorderWidth} mask={/^[0-9]{0,10}$/i} maskExample="???????? ???????????? ???????????? ????????"/> 
                            <div class = "low_text row_with_item_wide">
                                <div>????????&nbsp;????????????????:&nbsp;</div>
                                <InputColor initialValue={this.state.color.hex} onChange={this.setColor} placement="right"/>
                            </div>
                            <InputText styles = "row_with_item_wide" label="????????????????&nbsp;????&nbsp;x&nbsp;"                 placeholder="???????????????? ???? x"          defValue={this.state.translationX}     set={this.setTranslationX} mask={/^[-0-9]{0,10}$/i} maskExample="???????? ????????????"/> 
                            <InputText styles = "row_with_item_wide" label="????????????????&nbsp;????&nbsp;y&nbsp;"                 placeholder="???????????????? ???? y"          defValue={this.state.translationY}     set={this.setTranslationY} mask={/^[-0-9]{0,10}$/i} maskExample="???????? ????????????"/> 
                            <InputText styles = "row_with_item_wide" label="????????????????&nbsp;????&nbsp;z&nbsp;"                 placeholder="???????????????? ???? z"          defValue={this.state.translationZ}     set={this.setTranslationZ} mask={/^[-0-9]{0,10}$/i} maskExample="???????? ????????????"/> 
                            <InputText styles = "row_with_item_wide" label="????????????????????????????????&nbsp;??????????&nbsp;(????)&nbsp;"   placeholder="???????????????????????????????? ??????????" defValue={this.state.liftingCapacity}  set={this.setLiftingCapacity} mask={/^[0-9]{0,10}$/i} maskExample="???????? ???????????? ???????????? ????????"/> 
                            <InputText styles = "row_with_item_wide" label="??????????????????&nbsp;????????&nbsp;????????????&nbsp;??????????&nbsp;????&nbsp;??&nbsp;(????)"   placeholder="c???????????????? ???????? ???????????? ?????????? ???? ??" defValue={this.state.freeSpaceX} set={this.setFreeSpaceX} mask={/^[0-9]{0,10}$/i} maskExample="???????? ???????????? ???????????? ????????"/> 
                            <InputText styles = "row_with_item_wide" label="??????????????????&nbsp;????????&nbsp;????????????&nbsp;??????????&nbsp;????&nbsp;Y&nbsp;(????)"   placeholder="c???????????????? ???????? ???????????? ?????????? ???? Y" defValue={this.state.freeSpaceY} set={this.setFreeSpaceY} mask={/^[0-9]{0,10}$/i} maskExample="???????? ???????????? ???????????? ????????"/> 
                            <div></div>
                            <button class="bt_send_AdministratorRackCreating1" onClick={this.btn_send_1}>?????????????? ?????????? ??????????</button>
                            <div class="place_holder_AdministratorRackCreating"/><button class="bt_send_AdministratorRackCreating2" onClick={this.btn_send_2}>??????????????????</button>
                            <button class="bt_send_AdministratorRackCreating3" onClick={this.btn_send_3}>??????????????</button>
                        </>
                    }
                    
                </FlexibleBlock>
                <FlexibleBlock>
                    <div class="header_text">??????????????</div>
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