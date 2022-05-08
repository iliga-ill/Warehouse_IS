import * as THREE from 'three';
import { Vector3 } from 'three';
import AuxiliaryMath from "./AuxiliaryMath.js";
//import font from './../../font/OpenSansSemiCondensedLight_Regular.json'

let auxMath = new AuxiliaryMath()

export default class FirstPersonControls  {

    camera
    domElement
    document

    player = {
        height: 70,
        turnSpeed: 20,
        speed: 10,
        jumpHeight: 0.2,
        gravity: 0,
        velocity: 0,
        jump: false,
    }
    
    onPointerDownMouseX = 0
    onPointerDownMouseY = 0
    lon = 0
    lat = 0
    onPointerDownLon = 0
    onPointerDownLat = 0
    phi = 0
    theta = 0
    //lookedPoint = new Vector3(0,0,0)
    lookedPoint = undefined
    
    mouseLeftButton = false
    mouseRightButton = false
    isShiftDown = false
    isCtrlDown = false
    pressedKeys = []
    
    //characteristics of first-person viewMod
    
    check = true
    keyListener

    

    constructor(camera, domElement, document){
        this.camera = camera 
        this.domElement = domElement 
        this.document = document
    }

    render=()=>{
        if (this.mouseRightButton){
            this.lon += 0.1;
            this.updatelookedPoint()
            this.camera.lookAt(this.lookedPoint);
        }
    }

    updatelookedPoint=()=>{
        this.lat = Math.max( - 85, Math.min( 85, this.lat ) );
        this.phi = THREE.MathUtils.degToRad( 90 - this.lat );
        this.theta = THREE.MathUtils.degToRad( this.lon );
    
        const x = 500 * Math.sin( this.phi ) * Math.cos( this.theta );
        const y = 500 * Math.cos( this.phi );
        const z = 500 * Math.sin( this.phi ) * Math.sin( this.theta );

        this.lookedPoint = new Vector3(x,y,z)
    }

    
    onKeyPressed=()=>{
        console.log("work")
        if (this.pressedKeys != undefined && this.pressedKeys.includes(87)){// w
            if (this.lookedPoint!=undefined) {
                
                const vector = this.lookedPoint.multiplyScalar(this.player.speed/1000, this.player.speed/1000, this.player.speed/1000 );
                this.camera.position.x += vector.x;
                this.camera.position.y += vector.y;
                this.camera.position.z += vector.z;
                this.lookedPoint.x += vector.x;
                this.lookedPoint.y += vector.y;
                this.lookedPoint.z += vector.z;
                this.updatelookedPoint()
                this.render()
            }
        }
        if (this.pressedKeys != undefined && this.pressedKeys.includes(83)){// s
            if (this.lookedPoint!=undefined) {
                var vector = this.lookedPoint.multiplyScalar( this.player.speed/1000 * -1, this.player.speed/1000, this.player.speed/1000 * -1 );
                this.camera.position.x += vector.x;
                this.camera.position.y += vector.y;
                this.camera.position.z += vector.z;
                this.lookedPoint.x += vector.x;
                this.lookedPoint.y += vector.y;
                this.lookedPoint.z += vector.z;
                this.updatelookedPoint()
                this.render()
            }
        }
        if (this.pressedKeys != undefined && this.pressedKeys.includes(65)){// a
            if (this.lookedPoint!=undefined) {
                // let point = getPointPerpendicularToLine(lookedPoint, camera.position, new Vector3(10,0,0))

                // var vector = point.multiplyScalar( player.speed/1000, 1, player.speed/1000 );
                // camera.position.x += vector.x;
                // //camera.position.y += vector.y;
                // camera.position.z += vector.z;
                // lookedPoint.x += vector.x
                // lookedPoint.z += vector.z
                let point = new Vector3(this.lookedPoint.x, this.camera.position.y, this.lookedPoint.z )
                var distinct = auxMath.rotatePointAroundAxis(
                    point, 
                    auxMath.translatePoint(this.camera.position, {x:0,y:-1,z:0}),
                    auxMath.translatePoint(this.camera.position, {x:0,y:1,z:0}), 
                    90 * Math.PI / 180
                )

                var vector = distinct.multiplyScalar( this.player.speed/1000, 0, this.player.speed/1000 );
                this.camera.position.x += vector.x;
                //camera.position.y += vector.y;
                this.camera.position.z += vector.z;
                this.lookedPoint.x += vector.x
                this.lookedPoint.z += vector.z
                this.updatelookedPoint()
                this.render()
            }
        }
        if (this.pressedKeys != undefined && this.pressedKeys.includes(68)){// d
            if (this.lookedPoint!=undefined) {
                let point = new Vector3(this.lookedPoint.x, this.camera.position.y, this.lookedPoint.z )
                var distinct = auxMath.rotatePointAroundAxis(
                    point, 
                    auxMath.translatePoint(this.camera.position, {x:0,y:-1,z:0}),
                    auxMath.translatePoint(this.camera.position, {x:0,y:1,z:0}), 
                    -90 * Math.PI / 180
                )
                var vector = distinct.multiplyScalar( this.player.speed/1000, 0, this.player.speed/1000 );
                this.camera.position.x += vector.x;
                //this.camera.position.y += vector.y;
                this.camera.position.z += vector.z;
                this.lookedPoint.x += vector.x
                this.lookedPoint.z += vector.z
                this.updatelookedPoint()
                this.render()
            }
        }
        if (this.pressedKeys != undefined && this.pressedKeys.includes(18)){// left alt
            if (this.lookedPoint!=undefined) {
                var vector = this.camera.position.multiplyScalar( 1, this.player.speed/1000, 1 );
                this.camera.position.y -= vector.y/50;

                vector = this.lookedPoint.multiplyScalar( 1, this.player.speed/1000, 1 );
                this.lookedPoint.y -= vector.y/50;
            }
            this.render()
        }
        if (this.pressedKeys != undefined && this.pressedKeys.includes(32)){// space
            if (this.lookedPoint!=undefined){
                var vector = this.camera.position.multiplyScalar( 1, this.player.speed/1000, 1 );
                this.camera.position.y += vector.y/50;

                vector = this.lookedPoint.multiplyScalar( 1, this.player.speed/1000, 1 );
                this.lookedPoint.y += vector.y/50;
            }
            this.render()
        }
        this.keyListener = setTimeout(this.onKeyPressed, 100);
    }
    
    onDocumentKeyDown=(event)=>{
        event.preventDefault()
        if (!this.pressedKeys.includes(event.keyCode)){
            this.pressedKeys.push(event.keyCode)
            this.onKeyPressed()
        }
    
        switch ( event.keyCode ) {
            case 16: this.isShiftDown = true; break;  //shift
            case 17: this.isCtrlDown = true; break;  //ctrl
        }
    }
    
    onDocumentKeyUp=(event)=>{
        event.preventDefault()
        if (this.pressedKeys.includes(event.keyCode))
            this.pressedKeys.splice(this.pressedKeys.indexOf(event.keyCode), 1);
    
        switch ( event.keyCode ) {
            case 16: this.isShiftDown = false; break; //shift
            case 17: this.isCtrlDown = false; break; //ctrl
        }
    }

    onMouseMoveControls=(event)=>{
        if ( event.isPrimary === false ) return;
        if (this.mouseRightButton){
            this.lon = ( this.onPointerDownMouseX - event.clientX ) * this.player.turnSpeed/100 + this.onPointerDownLon;
            this.lat = ( event.clientY - this.onPointerDownMouseY ) * this.player.turnSpeed/100 + this.onPointerDownLat;
        }
    }

    onSceneMouseWheel=(event)=>{
        const fov = this.camera.fov + event.deltaY * 0.05;
        this.camera.fov = THREE.MathUtils.clamp( fov, 10, 100 );
        this.camera.updateProjectionMatrix();
    }

    getLookedPoint=()=>{
        return this.lookedPoint
    }

    setPlayer=(player)=>{
        this.player = player
    }

    refreshControls=()=>{
        this.onPointerDownMouseX = 0
        this.onPointerDownMouseY = 0
        this.lon = 0
        this.lat = 0
        this.onPointerDownLon = 0
        this.onPointerDownLat = 0
        this.phi = 0
        this.theta = 0
        this.lookedPoint = undefined
    }

    onMouseDown=(e)=>{
        if (e.button == 0){ //left
            this.mouseLeftButton = true
        }
        if (e.button == 2) { //right
            this.mouseRightButton = true
            if ( e.isPrimary === false ) return;
    
            this.onPointerDownMouseX = e.clientX;
            this.onPointerDownMouseY = e.clientY;
 
            this.onPointerDownLon = this.lon;
            this.onPointerDownLat = this.lat;
        }
    }
    onMouseUp=(e)=>{
        if (e.button == 0) { //left
            this.mouseLeftButton = false
        }
        if (e.button == 2) { //right
            this.mouseRightButton = false
            if ( e.isPrimary === false ) return;
        }
    }

    connect=()=>{
        // document.addEventListener( 'keydown', onDocumentKeyDown );
        // document.addEventListener( 'keyup', onDocumentKeyUp );
        this.domElement.addEventListener('mouseup', this.onMouseUp)
        this.domElement.addEventListener('mousedown', this.onMouseDown)
        this.document.addEventListener( 'keydown', this.onDocumentKeyDown );
        this.document.addEventListener( 'keyup', this.onDocumentKeyUp );
        this.domElement.addEventListener( 'mousemove', this.onMouseMoveControls );
        this.domElement.addEventListener( 'wheel', this.onSceneMouseWheel );
        this.keyListener = setTimeout(this.onKeyPressed, 100);
    }

    disconnect=()=>{
        // document.removeEventListener( 'keydown', onDocumentKeyDown );
        // document.removeEventListener( 'keyup', onDocumentKeyUp );
        this.domElement.removeEventListener('mouseup', this.onMouseUp)
        this.domElement.removeEventListener('mousedown', this.onMouseDown)
        this.document.removeEventListener( 'keydown', this.onDocumentKeyDown );
        this.document.removeEventListener( 'keyup', this.onDocumentKeyUp );
        this.domElement.removeEventListener( 'mousemove', this.onMouseMoveControls );
        this.domElement.removeEventListener( 'wheel', this.onSceneMouseWheel );
        clearTimeout(this.keyListener);
    }

}