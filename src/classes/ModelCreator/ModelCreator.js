import * as THREE from 'three';
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

export default class ModelCreator {

    constructor(){
        
    }

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

    createRack(name, color, shelfWidth, shelfHeight, shelfDepth, horisontalShelfAmount, verticalShelfAmount, borderWidth, translation){

        let fullRackWidth = shelfWidth*horisontalShelfAmount + borderWidth*(horisontalShelfAmount+1)
        let fullRackHight = shelfHeight*verticalShelfAmount + borderWidth*(verticalShelfAmount+1)

        let frame = new THREE.Shape();
        frame.moveTo( fullRackWidth/2,  0,               shelfDepth/2);
        frame.lineTo( fullRackWidth/2,  fullRackHight,   shelfDepth/2);
        frame.lineTo(-fullRackWidth/2,  fullRackHight,   shelfDepth/2);
        frame.lineTo(-fullRackWidth/2,  0,               shelfDepth/2);

        for (let verticalIndex = 0; verticalIndex < verticalShelfAmount; verticalIndex++){
            for (let horisontalIndex = 0; horisontalIndex < horisontalShelfAmount; horisontalIndex++){
                
                let yShift = (shelfHeight*verticalIndex + borderWidth*(verticalIndex+1))
                let xShift = (shelfWidth*horisontalIndex + borderWidth*(horisontalIndex+1)) - (fullRackWidth/2-shelfWidth/2)
                
                var hole = new THREE.Path();
                hole.moveTo(xShift +   shelfWidth/2 ,  yShift, shelfDepth/2);
                hole.lineTo(xShift +   shelfWidth/2 ,  yShift +  shelfHeight, shelfDepth/2);
                hole.lineTo(xShift + -(shelfWidth/2),  yShift +  shelfHeight, shelfDepth/2);
                hole.lineTo(xShift + -(shelfWidth/2),  yShift, shelfDepth/2);
                frame.holes.push(hole);
            }
        }

    //  Extrude the shape into a geometry, and create a mesh from it:
        var extrudeSettings = {
            steps: 1,
            depth: shelfDepth,
            bevelEnabled: false,
        };
        
        return {
            name: name, 
            modelName: "Rack",
            material: new THREE.MeshLambertMaterial( { color: color}), 
            geometry: new THREE.ExtrudeGeometry(frame, extrudeSettings),
            mesh: new THREE.Mesh( 
                new THREE.ExtrudeGeometry(frame, extrudeSettings), 
                new THREE.MeshLambertMaterial( { color: color})
            ), 
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

    createZoneBorder(name, color, width, length, lineWidth, translation, font){

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

/*
        const textColor = 0x006699;

        const matDark = new THREE.LineBasicMaterial( {
            color: textColor,
            side: THREE.DoubleSide
        } );

        
        // loader.load( '//raw.githubusercontent.com/mrdoob/three.js/master/examples/fonts/helvetiker_regular.typeface.json', function ( response ) {
        //     font = response;
        // } );

        geometry = new TextGeometry( name, {
            font: font,
            size: 80,
            height: 5,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 10,
            bevelSize: 8,
            bevelSegments: 5
        } );
        //Create normal vector material
        var meshMaterial = new THREE.MeshNormalMaterial({
            flatShading: THREE.FlatShading,
            transparent: true,
            opacity: 0.9
    });
        var textMesh = new THREE.Mesh(geometry, meshMaterial);
        textMesh.position.set(0, 5, 0);

        mesh.add(textMesh)
        console.log(textMesh)
        console.log(mesh)
*/

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