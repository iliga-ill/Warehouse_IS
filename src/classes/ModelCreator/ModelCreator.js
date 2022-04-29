import * as THREE from 'three';
import { Vector3 } from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

//import font from './../../font/OpenSansSemiCondensedLight_Regular.json'


export default class ModelCreator {

    constructor(){
        
    }
    //#region supportFunctions
    rotateGeometry(geometry, rotation){
        geometry.rotateX(rotation.x * Math.PI / 180)
        geometry.rotateY(rotation.y * Math.PI / 180)
        geometry.rotateZ(rotation.z * Math.PI / 180)
        return geometry
    }
    
    //#endregion

    createCube(name, color, width, height, depth, translation){
        // cubes (модель куба, который будет создан)
        return {
            name: name, 
            modelName: "Cube",
            material: new THREE.MeshLambertMaterial( { color: color}), 
            geometry: new THREE.BoxGeometry( width, height, depth ), 
            mesh: new THREE.Mesh( 
                new THREE.BoxGeometry( width, height, depth ), 
                new THREE.MeshLambertMaterial( { color: color})
            ), 
            translation: translation,
        }
        //cubeMaterial.map = new THREE.TextureLoader().load( 'images/box-clipart-1.png' ) //TODO Понять почему не работает и исправить
    }

    createShelter(name, color, width, height, depth, borderWidth, translation){
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
            mesh: new THREE.Mesh( 
                new THREE.ExtrudeGeometry(frame, extrudeSettings), 
                new THREE.MeshLambertMaterial( { color: color})
            ), 
            translation: translation,
        }
    }

    createRack(name, color, shelfWidth, shelfHeight, shelfDepth, columsAmount, rowsAmount, borderWidth, translation){

        let fullRackWidth = shelfWidth*columsAmount + borderWidth*(columsAmount+1)
        let fullRackHight = shelfHeight*rowsAmount + borderWidth*(rowsAmount+1)

        let frame = new THREE.Shape();
        frame.moveTo( fullRackWidth/2,  0,               shelfDepth/2);
        frame.lineTo( fullRackWidth/2,  fullRackHight,   shelfDepth/2);
        frame.lineTo(-fullRackWidth/2,  fullRackHight,   shelfDepth/2);
        frame.lineTo(-fullRackWidth/2,  0,               shelfDepth/2);

        for (let rowIndex = 0; rowIndex < rowsAmount; rowIndex++){
            for (let columnIndex = 0; columnIndex < columsAmount; columnIndex++){
                
                let yShift = (shelfHeight*rowIndex + borderWidth*(rowIndex+1))
                let xShift = (shelfWidth*columnIndex + borderWidth*(columnIndex+1)) - (fullRackWidth/2-shelfWidth/2)
                
                var hole = new THREE.Path();
                hole.moveTo(xShift +   shelfWidth/2 ,  yShift, shelfDepth/2);
                hole.lineTo(xShift +   shelfWidth/2 ,  yShift +  shelfHeight, shelfDepth/2);
                hole.lineTo(xShift + -(shelfWidth/2),  yShift +  shelfHeight, shelfDepth/2);
                hole.lineTo(xShift + -(shelfWidth/2),  yShift, shelfDepth/2);
                frame.holes.push(hole);
            }
        }
    //  Extrude the shape into a geometry, and create a mesh from it:
        let extrudeSettings = {
            steps: 1,
            depth: shelfDepth,
            bevelEnabled: false,
        };

        let material = new THREE.MeshLambertMaterial( { color: color})
        let geometry = new THREE.ExtrudeGeometry(frame, extrudeSettings)

        let mesh = new THREE.Mesh(geometry, material)

        return {
            name: name, 
            modelName: "Rack",
            material: material, 
            geometry: geometry,
            mesh: mesh, 
            translation: translation,
        }
    }

    /*
    createZoneBorder(name, color, width, length, lineWidth, translation){

        let points = [];
        points.push(
            new THREE.Vector3(width/2, 0, length/2),
            new THREE.Vector3(width/2, 0, -length/2),
            new THREE.Vector3(-width/2, 0, -length/2),
            new THREE.Vector3(-width/2, 0, length/2),
            new THREE.Vector3(width/2, 0, length/2),
        );
        let geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new MeshLine();
        line.setGeometry(geometry);
        line.setPoints(points, p => lineWidth);

        let material = new MeshLineMaterial({
            color: color
        });

        let mesh = new THREE.Mesh(line, material);
        mesh.raycast = MeshLineRaycast;

        return {
            name: name, 
            modelName: "ZoneBorder",
            material: material, 
            geometry: line,
            mesh: mesh, 
            translation: translation,
        }
    }
    */

    /*
    createZoneBorder(name, color, width, length, lineWidth, translation){

        // line material
        var edgeLength = 1

        let points = [];
        points.push(

            new THREE.Vector3(width/2-edgeLength, 0, length/2  ),
            new THREE.Vector3(width/2  , 0, length/2-edgeLength),

            new THREE.Vector3(width/2  , 0, -length/2+edgeLength),
            new THREE.Vector3(width/2-edgeLength, 0, -length/2  ),

            new THREE.Vector3(-width/2+edgeLength, 0, -length/2),
            new THREE.Vector3(-width/2  , 0, -length/2+edgeLength),

            new THREE.Vector3(-width/2  , 0, length/2-edgeLength),
            new THREE.Vector3(-width/2+edgeLength, 0, length/2),

            new THREE.Vector3(width/2-edgeLength, 0, length/2  ),
            new THREE.Vector3(width/2  , 0, length/2-edgeLength),
        );

        // Create Tube Geometry
        var geometry = new THREE.TubeGeometry(
            new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.01),
            1000,// path segments
            lineWidth,// THICKNESS
            150, //Roundness of Tube
            false //closed
        );
        var material = new THREE.LineBasicMaterial({ color: color });

        let mesh = new THREE.Line(geometry, material);

        return {
            name: name, 
            modelName: "ZoneBorder",
            material: material, 
            geometry: geometry,
            mesh: mesh, 
            translation: translation,
        }
    }
    */

    createZoneBorder(name, color, width, length, borderWidth, font, chamferLendth, translation){
        let geometry
        let material
        let mesh
        let messageLength = 30
        let points = [];
        for (let i=0;i<4;i++){
            if (i==0) {
                points.push(
                    new THREE.Vector3(width/2-chamferLendth, 0, length/2  ),
                    new THREE.Vector3(width/2  , 0, length/2-chamferLendth),

                    new THREE.Vector3(width/2  , 0, messageLength),
                );
                geometry = new THREE.TubeGeometry(
                    new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.01),
                    Math.max(width,length)*2,// path segments
                    borderWidth,// THICKNESS
                    150, //Roundness of Tube
                    false //closed
                );
                material = new THREE.LineBasicMaterial({ color: color });
                mesh = new THREE.Line(geometry, material);
            }
            if (i==1) {
                points.push(
                    new THREE.Vector3(width/2  , 0, -messageLength),

                    new THREE.Vector3(width/2  , 0, -length/2+chamferLendth),
                    new THREE.Vector3(width/2-chamferLendth, 0, -length/2  ),

                    new THREE.Vector3(messageLength, 0, -length/2  ),
                );
            }
            if (i==2) {
                points.push(
                    new THREE.Vector3(-messageLength, 0, -length/2),

                    new THREE.Vector3(-width/2+chamferLendth, 0, -length/2),
                    new THREE.Vector3(-width/2  , 0, -length/2+chamferLendth),

                    new THREE.Vector3(-width/2  , 0, -messageLength),
                );
            }
            if (i==3) {
                points.push(
                    new THREE.Vector3(-width/2  , 0, messageLength),

                    new THREE.Vector3(-width/2  , 0, length/2-chamferLendth),
                    new THREE.Vector3(-width/2+chamferLendth, 0, length/2),

                    new THREE.Vector3(-messageLength, 0, length/2),
                    new THREE.Vector3(messageLength, 0, length/2  ),

                    new THREE.Vector3(width/2-chamferLendth, 0, length/2  ),
                    new THREE.Vector3(width/2  , 0, length/2-chamferLendth),
                );
            }

            // Create Tube Geometry
            if (i!=0){
                geometry = new THREE.TubeGeometry(
                    new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.01),
                    Math.max(width,length)*2,// path segments
                    borderWidth,// THICKNESS
                    150, //Roundness of Tube
                    false //closed
                );
                material = new THREE.LineBasicMaterial({ color: color });
                mesh.add(new THREE.Line(geometry, material))
            }
            // const textColor = 0x006699;
            const textColor = 0xffffff;

            //Create normal vector material
            var meshMaterial = new THREE.MeshNormalMaterial({
                flatShading: THREE.FlatShading,
                transparent: true,
                color: textColor,
                opacity: 1,
            });

        
            let textGeometry = new TextGeometry( `${name}`, {
                font: font,
                size: 15,
                height: 1,
                curveSegments: 1,
                bevelEnabled: false,
                bevelThickness: 1,
                bevelSize: 1,
                bevelSegments: 1,
            } );
            textGeometry = this.rotateGeometry(textGeometry, {x:-90,y:90 * -i,z:0})
            var textMesh = new THREE.Mesh(textGeometry, meshMaterial);
            if (i==0) textMesh.position.set(-30, 0, length/2+7);
            if (i==1) textMesh.position.set(-width/2-7, 0, -30);
            if (i==2) textMesh.position.set(+30, 0, -length/2-7);
            if (i==3) textMesh.position.set(width/2+7, 0, +30);
            
            mesh.add(textMesh)
        }

        return {
            name: name, 
            modelName: "ZoneBorder",
            material: material, 
            geometry: geometry,
            mesh: mesh, 
            translation: translation,
        }
    }
    
    createFloor(name, color, width, length, height, translation){

        let geometry = new THREE.BoxBufferGeometry(length, height, width)
        let material = new THREE.MeshLambertMaterial( { color: color})

        var mesh = new THREE.Mesh( geometry, material);
            
        return {
            name: name, 
            modelName: "Floor",
            material: material, 
            geometry: geometry,
            mesh: mesh, 
            translation: translation,
        }
    }


}