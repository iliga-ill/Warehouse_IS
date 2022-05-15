import * as THREE from 'three';
import { Vector2, Vector3 } from "three";

export default class WarehouseSettingsModel {

    constructor(){
        
    }

	getZonesType(){
		return(
			{
				zone_0001:{
					width:500,
					length:300,
					color:0xffffff,
					lineWidth:1,
					chamferLendth:10,
					message:"Зона 1",
					textSize:15,
					gapLengthX: "Зона 1".length * 15,
					gapLengthY: "Зона 1".length * 15,
					messageAlighment:["right"],
					// messageAlighment:["top", "bottom", "left", "right"],
				},
				zone_0002:{
					width:500,
					length:300,
					color:0xffffff,
					lineWidth:1,
					chamferLendth:10,
					message:"Зона 2",
					textSize:15,
					gapLengthX: "Зона 2".length * 15,
					gapLengthY: "Зона 2".length * 15,
					messageAlighment:["right"],
					// messageAlighment:["top", "bottom", "left", "right"],
				},
				zone_0003:{
					width:500,
					length:300,
					color:0xffffff,
					lineWidth:1,
					chamferLendth:10,
					message:"Зона 3",
					textSize:15,
					gapLengthX: "Зона 3".length * 15,
					gapLengthY: "Зона 3".length * 15,
					messageAlighment:["right"],
					// messageAlighment:["top", "bottom", "left", "right"],
				},
			}
		)
	}

	getRacksType(){
		return(
			{
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
				},
				rack_0002:{
					depth:50,
					shelfWidth:50,
					shelfHeight:50,
					columsAmount:2,
					rowsAmount:3,
					borderWidth:2,
					color:0x885aaa,
					translation:new Vector3(0,0,-50/2),
					shelfs:{
						shelf_1:{name:"Полка 1", 	liftingCapacity:50, row:0, column:0},
						shelf_2:{name:"Полка 2", 	liftingCapacity:50, row:0, column:1},
						shelf_3:{name:"Полка 3", 	liftingCapacity:50, row:1, column:0},
						shelf_4:{name:"Полка 4", 	liftingCapacity:50, row:1, column:1},
						shelf_5:{name:"Полка 5", 	liftingCapacity:50, row:2, column:0},
						shelf_6:{name:"Полка 6", 	liftingCapacity:50, row:2, column:1},
					}
				},
			}
		)
	}

	getGoodsType(){
		return(
			{
				good_0001:{
					width:16,
					height:16,
					depth:16,
					color:0x885aff,
					translation:new Vector3(0,8-2,0),
				},
				good_0002:{
					width:30,
					height:30,
					depth:30,
					color:0x885aff,
					translation:new Vector3(0,15-2,0),
				},
				good_0003:{
					width:20,
					height:20,
					depth:40,
					color:0xab5bab,
					translation:new Vector3(0,10-2,0),
				},
			}
		)
	}

	//размеры склада задаются в см
	getWarehouseSettings(){
		return (
			{
				width:1000,
				length:1000,
				zones:[
					{
						name:"Зона 1",
						/*zoneCode*/id:1,
						centerPoint:new Vector3(-240,0,-340),
						rotation:{x:0,y:0,z:0},
						zoneTypeId: "0001",
						type:"zone",
						racks:[
							{
								name:"Стеллаж 1",
								/*rackCode*/id:1,
								centerPoint:new Vector3(120,0,-120),
								rotation:{x:0,y:0,z:0},
								racksTypeId: "0001",
								type:"rack",
								shelfs:[
									{name:"Полка 1", number:1, /*shelfCode*/id:1, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", /*goodCode*/id: 0, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов", goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 2", number:2, id:2, space:[]},
									{name:"Полка 3", number:3, id:3, space:[]},
									{name:"Полка 4", number:4, id:4, space:[]},
									{name:"Полка 5", number:5, id:5, space:[]},
									{name:"Полка 6", number:6, id:6, space:[]},
									{name:"Полка 7", number:7, id:7, space:[]},
									{name:"Полка 8", number:8, id:8, space:[]},
									{name:"Полка 9", number:9, id:9, space:[
										{goodTypeId: "0003", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 1, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 10", number:10, id:10, space:[]},
									{name:"Полка 11", number:11, id:11, space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 2, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 12", number:12, id:12, space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 3, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
								]
							},
							{
								name:"Стеллаж 2",
								id:2,
								centerPoint:new Vector3(-120,0,-120),
								rotation:{x:0,y:0,z:0},
								racksTypeId: "0001",
								type:"rack",
								shelfs:[
									{name:"Полка 1", number:1, id:13, space:[]},
									{name:"Полка 2", number:2, id:14, space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 4, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 3", number:3, id:15, space:[]},
									{name:"Полка 4", number:4, id:16, space:[]},
									{name:"Полка 5", number:5, id:17, space:[]},
									{name:"Полка 6", number:6, id:18, space:[]},
									{name:"Полка 7", number:7, id:19, space:[]},
									{name:"Полка 8", number:8, id:20, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 5, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 9", number:9, id:21, space:[]},
									{name:"Полка 10", number:10, id:22, space:[]},
									{name:"Полка 11", number:11, id:23, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 6, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 12", number:12, id:24, space:[]},
								]
							},
							{
								name:"Стеллаж 3",
								id:3,
								centerPoint:new Vector3(-245,0,20),
								rotation:{x:0,y:90,z:0},
								racksTypeId: "0002",
								type:"rack",
								shelfs:[
									{name:"Полка 1", number:1, id:25, space:[]},
									{name:"Полка 2", number:2, id:26, space:[]},
									{name:"Полка 3", number:3, id:27, space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 7, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 4", number:4, id:28, space:[]},
									{name:"Полка 5", number:5, id:29, space:[]},
									{name:"Полка 6", number:6, id:30, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 8, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
								]
							},
							{
								name:"Стеллаж 4",
								id:4,
								centerPoint:new Vector3(-120,0,110),
								rotation:{x:0,y:0,z:0},
								racksTypeId: "0001",
								type:"rack",
								shelfs:[
									{name:"Полка 1", number:1, id:31, space:[]},
									{name:"Полка 2", number:2, id:32, space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 9, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 3", number:3, id:33, space:[
										{goodTypeId: "0003", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 10, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 4", number:4, id:34, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 11, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 5", number:5, id:35, space:[]},
									{name:"Полка 6", number:6, id:36, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 12, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 7", number:7, id:37, space:[]},
									{name:"Полка 8", number:8, id:38, space:[]},
									{name:"Полка 9", number:9, id:39, space:[]},
									{name:"Полка 10", number:10, id:40, space:[]},
									{name:"Полка 11", number:11, id:41, space:[]},
									{name:"Полка 12", number:12, id:42, space:[
										{goodTypeId: "0003", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 13, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
								]
							},

							{
								name:"Стеллаж 5",
								id:5,
								centerPoint:new Vector3(55,0,110),
								rotation:{x:0,y:0,z:0},
								racksTypeId: "0002",
								type:"rack",
								shelfs:[
									{name:"Полка 1", number:1, id:43, space:[]},
									{name:"Полка 2", number:2, id:44, space:[]},
									{name:"Полка 3", number:3, id:45, space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 14, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 4", number:4, id:46, space:[]},
									{name:"Полка 5", number:5, id:47, space:[]},
									{name:"Полка 6", number:6, id:48, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 15, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
								]
							},

							{
								name:"Стеллаж 6",
								id:6,
								centerPoint:new Vector3(180,0,110),
								rotation:{x:0,y:0,z:0},
								racksTypeId: "0002",
								type:"rack",
								shelfs:[
									{name:"Полка 1", number:1, id:49, space:[]},
									{name:"Полка 2", number:2, id:50, space:[]},
									{name:"Полка 3", number:3, id:51, space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 16, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 4", number:4, id:52, space:[]},
									{name:"Полка 5", number:5, id:53, space:[]},
									{name:"Полка 6", number:6, id:54, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 17, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
								]
							},
						]
					},
					{
						name:"Зона 2",
						id:2,
						centerPoint:new Vector3(-240,0,0),
						rotation:{x:0,y:0,z:0},
						zoneTypeId: "0002",
						type:"zone",
						racks:[
							{
								name:"Стеллаж 1",
								id:7,
								centerPoint:new Vector3(120,0,-120),
								rotation:{x:0,y:0,z:0},
								racksTypeId: "0001",
								type:"rack",
								shelfs:[
									{name:"Полка 1", number:1, id:55, space:[]},
									{name:"Полка 2", number:2, id:56, space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 18, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 3", number:3, id:57, space:[]},
									{name:"Полка 4", number:4, id:58, space:[]},
									{name:"Полка 5", number:5, id:59, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 19, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 6", number:6, id:60, space:[
										{goodTypeId: "0003", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 20, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 7", number:7, id:61, space:[]},
									{name:"Полка 8", number:8, id:62, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 21, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 9", number:9, id:63, space:[]},
									{name:"Полка 10", number:10, id:64, space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 22, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 11", number:11, id:65, space:[]},
									{name:"Полка 12", number:12, id:66, space:[]},
								]
							},
							{
								name:"Стеллаж 2",
								id:8,
								centerPoint:new Vector3(-180,0,-120),
								rotation:{x:0,y:0,z:0},
								racksTypeId: "0002",
								type:"rack",
								shelfs:[
									{name:"Полка 1", number:1, id:67, space:[]},
									{name:"Полка 2", number:2, id:68, space:[]},
									{name:"Полка 3", number:3, id:69, space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 23, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 4", number:4, id:70, space:[]},
									{name:"Полка 5", number:5, id:71, space:[]},
									{name:"Полка 6", number:6, id:72, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 24, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
								]
							},

							{
								name:"Стеллаж 3",
								id:9,
								centerPoint:new Vector3(-60,0,-120),
								rotation:{x:0,y:0,z:0},
								racksTypeId: "0002",
								type:"rack",
								shelfs:[
									{name:"Полка 1", number:1, id:73, space:[]},
									{name:"Полка 2", number:2, id:74, space:[]},
									{name:"Полка 3", number:3, id:75, space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 25, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 4", number:4, id:76, space:[
										{goodTypeId: "0003", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 26, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 5", number:5, id:77, space:[]},
									{name:"Полка 6", number:6, id:78, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 27, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
								]
							},
							{
								name:"Стеллаж 4",
								id:10,
								centerPoint:new Vector3(-245,0,20),
								rotation:{x:0,y:90,z:0},
								racksTypeId: "0002",
								type:"rack",
								shelfs:[
									{name:"Полка 1", number:1, id:79, space:[]},
									{name:"Полка 2", number:2, id:80, space:[]},
									{name:"Полка 3", number:3, id:81, space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 28, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 4", number:4, id:82, space:[]},
									{name:"Полка 5", number:5, id:83, space:[]},
									{name:"Полка 6", number:6, id:84, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 29, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
								]
							},
							{
								name:"Стеллаж 5",
								id:11,
								centerPoint:new Vector3(-120,0,110),
								rotation:{x:0,y:0,z:0},
								racksTypeId: "0001",
								type:"rack",
								shelfs:[
									{name:"Полка 1", number:1, id:85, space:[]},
									{name:"Полка 2", number:2, id:86, space:[]},
									{name:"Полка 3", number:3, id:87, space:[]},
									{name:"Полка 4", number:4, id:88, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 30, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 5", number:5, id:89, space:[]},
									{name:"Полка 6", number:6, id:90, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 31, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 7", number:7, id:91, space:[]},
									{name:"Полка 8", number:8, id:92, space:[]},
									{name:"Полка 9", number:9, id:93, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 32, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 10", number:10, id:94, space:[]},
									{name:"Полка 11", number:11, id:95, space:[]},
									{name:"Полка 12", number:12, id:96, space:[]},
								]
							},

							{
								name:"Стеллаж 6",
								id:12,
								centerPoint:new Vector3(120,0,110),
								rotation:{x:0,y:0,z:0},
								racksTypeId: "0001",
								type:"rack",
								shelfs:[
									{name:"Полка 1", number:1, id:97, space:[]},
									{name:"Полка 2", number:2, id:98, space:[]},
									{name:"Полка 3", number:3, id:99, space:[]},
									{name:"Полка 4", number:4, id:100, space:[]},
									{name:"Полка 5", number:5, id:101, space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 33, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 6", number:6, id:102, space:[]},
									{name:"Полка 7", number:7, id:103, space:[
										{goodTypeId: "0003", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 34, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 8", number:8, id:104, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 35, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 9", number:9, id:105, space:[]},
									{name:"Полка 10", number:10, id:106, space:[]},
									{name:"Полка 11", number:11, id:107, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 36, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 12", number:12, id:108, space:[]},
								]
							},
						]
					},
					{
						name:"Зона 3",
						id:3,
						centerPoint:new Vector3(-240,0,340),
						rotation:{x:0,y:0,z:0},
						zoneTypeId: "0003",
						type:"zone",
						racks:[
							{
								name:"Стеллаж 1",
								id:13,
								centerPoint:new Vector3(120,0,-120),
								rotation:{x:0,y:0,z:0},
								racksTypeId: "0001",
								type:"rack",
								shelfs:[
									{name:"Полка 1", number:1, id:109, space:[]},
									{name:"Полка 2", number:2, id:110, space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 37, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 38, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 3", number:3, id:111, space:[]},
									{name:"Полка 4", number:4, id:112, space:[]},
									{name:"Полка 5", number:5, id:113, space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 39, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 6", number:6, id:114, space:[]},
									{name:"Полка 7", number:7, id:115, space:[]},
									{name:"Полка 8", number:8, id:116, space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 40, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 9", number:9, id:117, space:[]},
									{name:"Полка 10", number:10, id:118, space:[]},
									{name:"Полка 11", number:11, id:119, space:[
										{goodTypeId: "0003", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 41, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 12", number:12, id:120, space:[]},
								]
							},
							{
								name:"Стеллаж 2",
								id:14,
								centerPoint:new Vector3(-120,0,-120),
								rotation:{x:0,y:0,z:0},
								racksTypeId: "0001",
								type:"rack",
								shelfs:[
									{name:"Полка 1", number:1, id:121, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 42, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 2", number:2, id:122, space:[]},
									{name:"Полка 3", number:3, id:123, space:[]},
									{name:"Полка 4", number:4, id:124, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 43, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 5", number:5, id:125, space:[]},
									{name:"Полка 6", number:6, id:126, space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 44, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 7", number:7, id:127, space:[]},
									{name:"Полка 8", number:8, id:128, space:[]},
									{name:"Полка 9", number:9, id:129, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 45, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 10", number:10, id:130, space:[]},
									{name:"Полка 11", number:11, id:131, space:[]},
									{name:"Полка 12", number:12, id:132, space:[]},
								]
							},
							{
								name:"Стеллаж 3",
								id:15,
								centerPoint:new Vector3(-245,0,20),
								rotation:{x:0,y:90,z:0},
								racksTypeId: "0002",
								type:"rack",
								shelfs:[
									{name:"Полка 1", number:1, id:133, space:[]},
									{name:"Полка 2", number:2, id:134, space:[]},
									{name:"Полка 3", number:3, id:135, space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 46, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 4", number:4, id:136, space:[]},
									{name:"Полка 5", number:5, id:137, space:[]},
									{name:"Полка 6", number:6, id:138, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 47, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
								]
							},
							{
								name:"Стеллаж 4",
								id:16,
								centerPoint:new Vector3(-120,0,110),
								rotation:{x:0,y:0,z:0},
								racksTypeId: "0001",
								type:"rack",
								shelfs:[
									{name:"Полка 1", number:1, id:139, space:[]},
									{name:"Полка 2", number:2, id:140, space:[]},
									{name:"Полка 3", number:3, id:141, space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 48, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 4", number:4, id:142, space:[]},
									{name:"Полка 5", number:5, id:143, space:[]},
									{name:"Полка 6", number:6, id:144, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 49, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 7", number:7, id:145, space:[]},
									{name:"Полка 8", number:8, id:146, space:[]},
									{name:"Полка 9", number:9, id:147, space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 50, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 10", number:10, id:148, space:[]},
									{name:"Полка 11", number:11, id:149, space:[]},
									{name:"Полка 12", number:12, id:150, space:[]},
								]
							},

							{
								name:"Стеллаж 5",
								id:17,
								centerPoint:new Vector3(120,0,110),
								rotation:{x:0,y:0,z:0},
								racksTypeId: "0001",
								type:"rack",
								shelfs:[
									{name:"Полка 1", number:1, id:151, space:[]},
									{name:"Полка 2", number:2, id:152, space:[]},
									{name:"Полка 3", number:3, id:153, space:[
										{goodTypeId: "0003", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 51, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 4", number:4, id:154, space:[]},
									{name:"Полка 5", number:5, id:155, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 52, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 6", number:6, id:156, space:[]},
									{name:"Полка 7", number:7, id:157, space:[]},
									{name:"Полка 8", number:8, id:158, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 53, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 54, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 55, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 56, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 57, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 58, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', type:"good", id: 59, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 9", number:9, id:159, space:[]},
									{name:"Полка 10", number:10, id:160, space:[]},
									{name:"Полка 11", number:11, id:161, space:[]},
									{name:"Полка 12", number:12, id:162, space:[]},
								]
							},
						]
					},
				]
			}
		)
	}


}