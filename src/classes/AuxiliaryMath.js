import * as THREE from 'three';
import { Vector3 } from 'three';

//import font from './../../font/OpenSansSemiCondensedLight_Regular.json'


export default class AuxiliaryMath {

    constructor(){
        
    }

    getPivotPoint(pointToRotate, axisStart, axisEnd) {
        const d = new Vector3().subVectors(axisEnd, axisStart).normalize()
        const v = new Vector3().subVectors(pointToRotate, axisStart)
        const t = v.dot(d)
        const pivotPoint = axisStart.add(d.multiplyScalar(t))
        return pivotPoint
    }
    
    rotatePointAroundAxis(pointToRotate, axisStart, axisEnd, radians) {
        const axisDirection = new Vector3().subVectors(axisEnd, axisStart).normalize()
        const pivotPoint = this.getPivotPoint(pointToRotate, axisStart, axisEnd)
        const translationToWorldCenter = new Vector3().subVectors(pointToRotate, pivotPoint)
        const translatedRotated = translationToWorldCenter.clone().applyAxisAngle(axisDirection, radians)
        const destination = pointToRotate.clone().add(translatedRotated).sub(translationToWorldCenter)
        return destination
    }

    translatePoint(point,{x,y,z}){
        return new Vector3(point.x+x,point.y+y,point.z+z)
    }
    
    rotatePointAroundAxisMass(pointToRotate, zoneCenter, rotation){
        pointToRotate = this.rotatePointAroundAxis(
            pointToRotate, 
            this.translatePoint(zoneCenter, {x:-1,y:0,z:0}), 
            this.translatePoint(zoneCenter, {x:1,y:0,z:0}), 
            rotation.x * Math.PI / 180
        )
        pointToRotate = this.rotatePointAroundAxis(
            pointToRotate, 
            this.translatePoint(zoneCenter, {x:0,y:-1,z:0}), 
            this.translatePoint(zoneCenter, {x:0,y:1,z:0}), 
            rotation.y * Math.PI / 180
        )
        pointToRotate = this.rotatePointAroundAxis(
            pointToRotate, 
            this.translatePoint(zoneCenter, {x:0,y:0,z:-1}), 
            this.translatePoint(zoneCenter, {x:0,y:0,z:1}), 
            rotation.z * Math.PI / 180
        )
        return pointToRotate
    }

    rotateMeshOnAxis(mesh, axis, rotationAngle){
        mesh.rotateOnAxis ( axis, rotationAngle * Math.PI / 180 )
        return mesh
    }

    rotateMeshOnAllAxis(mesh, rotation){
        mesh.rotateOnAxis ( new Vector3(1,0,0), rotation.x * Math.PI / 180 )
        mesh.rotateOnAxis ( new Vector3(0,1,0), rotation.y * Math.PI / 180 )
        mesh.rotateOnAxis ( new Vector3(0,0,1), rotation.z * Math.PI / 180 )
        return mesh
    }

    sumRotations(rotations){
        let res={x:0,y:0,z:0}
        rotations.map(rotation=>{
            res.x+=rotation.x
            res.y+=rotation.y
            res.z+=rotation.z
        })
        return res
    }

    sumVectors(vector1, vector2){
        return new Vector3(vector1.x+vector2.x, vector1.y+vector2.y, vector1.z+vector2.z)
    }

//getPointPerpendicularToLine(distancePoint, centerPoint, distance){
//     let point3 = new Vector3(
//         centerPoint.x+distance*(distancePoint.y-centerPoint.y)/Math.sqrt(Math.pow(distancePoint.x-centerPoint.x,2)+Math.pow(distancePoint.y-centerPoint.y,2)),
//         centerPoint.y-distance*(distancePoint.x-centerPoint.x)/Math.sqrt(Math.pow(distancePoint.x-centerPoint.x,2)+Math.pow(distancePoint.y-centerPoint.y,2))
//     )
//     return point3
// }

getPointPerpendicularToLine(distancePoint, centerPoint, childPos){
    // Create end vectors
    var v1 = distancePoint;
    var v2 = centerPoint;

    // Nest child object inside parent
    var parent = new THREE.Object3D();
    var child = new THREE.Object3D();
    parent.add(child);

    // Set child position to any point in the XY plane with radius = 1
    // This is a point in your "disc"
    child.position.set(childPos.x, childPos.y, childPos.z);

    // Move parent to midpoint
    parent.position.copy(v2);

    // Rotate parent to look towards end of the line
    // This makes the "disc" perpendicular to the line
    parent.lookAt(v1);

    // Get world position of child 
    var discPoint = new THREE.Vector3();
    child.getWorldPosition(discPoint);
    return discPoint
}

}