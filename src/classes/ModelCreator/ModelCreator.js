import * as THREE from 'three';
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline';

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