import * as THREE from 'three';
import { Vector3 } from 'three';
import AuxiliaryMath from "./AuxiliaryMath.js";
//import font from './../../font/OpenSansSemiCondensedLight_Regular.json'

let auxMath = new AuxiliaryMath()
let player = {
    height: 70,
    turnSpeed: 20,
    speed: 10,
    jumpHeight: 0.2,
    gravity: 0,
    velocity: 0,
    jump: false,
}

let onPointerDownMouseX = 0
let onPointerDownMouseY = 0
let lon = 0
let lat = 0
let onPointerDownLon = 0
let onPointerDownLat = 0
let phi = 0
let theta = 0
//lookedPoint = new Vector3(0,0,0)
let lookedPoint = undefined

let mouseLeftButton = false
let mouseRightButton = false
let isShiftDown = false
let isCtrlDown = false
let pressedKeys = []

//characteristics of first-person viewMod

let check = true
let keyListener

export default class FirstPersonControls  {

    camera
    domElement

    

    constructor(camera, domElement){
        this.camera = camera 
        this.domElement = domElement 
    }

    render(){
        if (mouseRightButton){
            lon += 0.1;
            this.updatelookedPoint()
            this.camera.lookAt(lookedPoint);
        }
    }

    updatelookedPoint(){
        lat = Math.max( - 85, Math.min( 85, lat ) );
        phi = THREE.MathUtils.degToRad( 90 - lat );
        theta = THREE.MathUtils.degToRad( lon );
    
        const x = 500 * Math.sin( phi ) * Math.cos( theta );
        const y = 500 * Math.cos( phi );
        const z = 500 * Math.sin( phi ) * Math.sin( theta );

        lookedPoint = new Vector3(x,y,z)
    }

    
    onKeyPressed(){
        console.log("working")
        if (pressedKeys != undefined && pressedKeys.includes(87)){// w
            console.log("pressed")
            if (lookedPoint!=undefined) {
                
                const vector = lookedPoint.multiplyScalar(player.speed/1000, player.speed/1000, player.speed/1000 );
                this.camera.position.x += vector.x;
                this.camera.position.y += vector.y;
                this.camera.position.z += vector.z;
                lookedPoint.x += vector.x;
                lookedPoint.y += vector.y;
                lookedPoint.z += vector.z;
                this.updatelookedPoint()
                this.render()
            }
        }
        if (pressedKeys != undefined && pressedKeys.includes(83)){// s
            if (lookedPoint!=undefined) {
                var vector = lookedPoint.multiplyScalar( player.speed/1000 * -1, player.speed/1000, player.speed/1000 * -1 );
                this.camera.position.x += vector.x;
                this.camera.position.y += vector.y;
                this.camera.position.z += vector.z;
                lookedPoint.x += vector.x;
                lookedPoint.y += vector.y;
                lookedPoint.z += vector.z;
                this.updatelookedPoint()
                this.render()
            }
        }
        if (pressedKeys != undefined && pressedKeys.includes(65)){// a
            if (lookedPoint!=undefined) {
                // let point = getPointPerpendicularToLine(lookedPoint, camera.position, new Vector3(10,0,0))

                // var vector = point.multiplyScalar( player.speed/1000, 1, player.speed/1000 );
                // camera.position.x += vector.x;
                // //camera.position.y += vector.y;
                // camera.position.z += vector.z;
                // lookedPoint.x += vector.x
                // lookedPoint.z += vector.z
                let point = new Vector3(lookedPoint.x, this.camera.position.y, lookedPoint.z )
                var distinct = auxMath.rotatePointAroundAxis(
                    point, 
                    auxMath.translatePoint(this.camera.position, {x:0,y:-1,z:0}),
                    auxMath.translatePoint(this.camera.position, {x:0,y:1,z:0}), 
                    90 * Math.PI / 180
                )

                var vector = distinct.multiplyScalar( player.speed/1000, 0, player.speed/1000 );
                this.camera.position.x += vector.x;
                //camera.position.y += vector.y;
                this.camera.position.z += vector.z;
                lookedPoint.x += vector.x
                lookedPoint.z += vector.z
                this.updatelookedPoint()
                this.render()
            }
        }
        if (pressedKeys != undefined && pressedKeys.includes(68)){// d
            if (lookedPoint!=undefined) {
                let point = new Vector3(lookedPoint.x, this.camera.position.y, lookedPoint.z )
                var distinct = auxMath.rotatePointAroundAxis(
                    point, 
                    auxMath.translatePoint(this.camera.position, {x:0,y:-1,z:0}),
                    auxMath.translatePoint(this.camera.position, {x:0,y:1,z:0}), 
                    -90 * Math.PI / 180
                )
                var vector = distinct.multiplyScalar( player.speed/1000, 0, player.speed/1000 );
                this.camera.position.x += vector.x;
                //this.camera.position.y += vector.y;
                this.camera.position.z += vector.z;
                lookedPoint.x += vector.x
                lookedPoint.z += vector.z
                this.updatelookedPoint()
                this.render()
            }
        }
        if (pressedKeys != undefined && pressedKeys.includes(18)){// left alt
            if (lookedPoint!=undefined) {
                var vector = this.camera.position.multiplyScalar( 1, player.speed/1000, 1 );
                this.camera.position.y -= vector.y/50;

                vector = lookedPoint.multiplyScalar( 1, player.speed/1000, 1 );
                lookedPoint.y -= vector.y/50;
            }
            this.render()
        }
        if (pressedKeys != undefined && pressedKeys.includes(32)){// space
            if (lookedPoint!=undefined){
                var vector = this.camera.position.multiplyScalar( 1, player.speed/1000, 1 );
                this.camera.position.y += vector.y/50;

                vector = lookedPoint.multiplyScalar( 1, player.speed/1000, 1 );
                lookedPoint.y += vector.y/50;
            }
            this.render()
        }
        keyListener = setTimeout(this.onKeyPressed, 100);
    }
    
    onDocumentKeyDown( event ) {
        event.preventDefault()
        if (!pressedKeys.includes(event.keyCode))
            pressedKeys.push(event.keyCode)
    
        switch ( event.keyCode ) {
            case 16: isShiftDown = true; break;  //shift
            case 17: isCtrlDown = true; break;  //ctrl
        }
    }
    
    onDocumentKeyUp( event ) {
        event.preventDefault()
        if (pressedKeys.includes(event.keyCode))
            pressedKeys.splice(pressedKeys.indexOf(event.keyCode), 1);
    
        switch ( event.keyCode ) {
            case 16: isShiftDown = false; break; //shift
            case 17: isCtrlDown = false; break; //ctrl
        }
    }

    onMouseMoveControls(event){
        if ( event.isPrimary === false ) return;
        if (mouseRightButton){
            lon = ( onPointerDownMouseX - event.clientX ) * player.turnSpeed/100 + onPointerDownLon;
            lat = ( event.clientY - onPointerDownMouseY ) * player.turnSpeed/100 + onPointerDownLat;
        }
    }

    onSceneMouseWheel( event ) {
        const fov = this.camera.fov + event.deltaY * 0.05;
        this.camera.fov = THREE.MathUtils.clamp( fov, 10, 100 );
        this.camera.updateProjectionMatrix();
    }

    getLoockedPoint(){
        return lookedPoint
    }

    refreshControls(){
        onPointerDownMouseX = 0
        onPointerDownMouseY = 0
        lon = 0
        lat = 0
        onPointerDownLon = 0
        onPointerDownLat = 0
        phi = 0
        theta = 0
        lookedPoint = undefined
    }

    onMouseDown(e){
        if (e.button == 0){ //left
            mouseLeftButton = true
        }
        if (e.button == 2) { //right
            mouseRightButton = true
            if ( e.isPrimary === false ) return;
    
            onPointerDownMouseX = e.clientX;
            onPointerDownMouseY = e.clientY;
 
            onPointerDownLon = lon;
            onPointerDownLat = lat;
        }
    }
    onMouseUp(e){
        if (e.button == 0) { //left
            mouseLeftButton = false
        }
        if (e.button == 2) { //right
            mouseRightButton = false
            if ( e.isPrimary === false ) return;
        }
    }

    connect(){
        // document.addEventListener( 'keydown', onDocumentKeyDown );
        // document.addEventListener( 'keyup', onDocumentKeyUp );
        this.domElement.addEventListener('mouseup', this.onMouseUp)
        this.domElement.addEventListener('mousedown', this.onMouseDown)
        this.domElement.addEventListener( 'keydown', this.onDocumentKeyDown );
        this.domElement.addEventListener( 'keyup', this.onDocumentKeyUp );
        this.domElement.addEventListener( 'mousemove', this.onMouseMoveControls );
        this.domElement.addEventListener( 'wheel', this.onSceneMouseWheel );
        keyListener = setTimeout(this.onKeyPressed, 100);
    }

    disconnect(){
        // document.removeEventListener( 'keydown', onDocumentKeyDown );
        // document.removeEventListener( 'keyup', onDocumentKeyUp );
        this.domElement.removeEventListener('mouseup', this.onMouseUp)
        this.domElement.removeEventListener('mousedown', this.onMouseDown)
        this.domElement.removeEventListener( 'keydown', this.onDocumentKeyDown );
        this.domElement.removeEventListener( 'keyup', this.onDocumentKeyUp );
        this.domElement.removeEventListener( 'mousemove', this.onMouseMoveControls );
        this.domElement.removeEventListener( 'wheel', this.onSceneMouseWheel );
        clearTimeout(keyListener);
    }

}