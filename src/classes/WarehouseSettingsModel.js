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
					color:0xB00000,
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
						centerPoint:new Vector3(-240,0,-340),
						rotation:{x:0,y:0,z:0},
						zoneTypeId: "0001",
						racks:[
							{
								name:"Стеллаж 1",
								centerPoint:new Vector3(120,0,-120),
								rotation:{x:0,y:0,z:0},
								racksTypeId: "0001",
								shelfs:[
									{name:"Полка 1", number:1, shelfCode:1, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', /*goodCode*/id: 0, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов", goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 2", number:2, shelfCode:2, space:[]},
									{name:"Полка 3", number:3, shelfCode:3, space:[]},
									{name:"Полка 4", number:4, shelfCode:4, space:[]},
									{name:"Полка 5", number:5, shelfCode:5, space:[]},
									{name:"Полка 6", number:6, shelfCode:6, space:[]},
									{name:"Полка 7", number:7, shelfCode:7, space:[]},
									{name:"Полка 8", number:8, shelfCode:8, space:[]},
									{name:"Полка 9", number:9, shelfCode:9, space:[
										{goodTypeId: "0003", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 1, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 10", number:10, shelfCode:10, space:[]},
									{name:"Полка 11", number:11, shelfCode:11, space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 2, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 12", number:12, shelfCode:12, space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 3, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
								]
							},
							{
								name:"Стеллаж 2",
								centerPoint:new Vector3(-120,0,-120),
								rotation:{x:0,y:0,z:0},
								racksTypeId: "0001",
								shelfs:[
									{name:"Полка 1", number:1, shelfCode:13, space:[]},
									{name:"Полка 2", number:2, shelfCode:14, space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 4, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 3", number:3, shelfCode:15, space:[]},
									{name:"Полка 4", number:4, shelfCode:16, space:[]},
									{name:"Полка 5", number:5, shelfCode:17, space:[]},
									{name:"Полка 6", number:6, shelfCode:18, space:[]},
									{name:"Полка 7", number:7, shelfCode:19, space:[]},
									{name:"Полка 8", number:8, shelfCode:20, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 5, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 9", number:9, shelfCode:21, space:[]},
									{name:"Полка 10", number:10, shelfCode:22, space:[]},
									{name:"Полка 11", number:11, shelfCode:23, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 6, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 12", number:12, shelfCode:24, space:[]},
								]
							},
							{
								name:"Стеллаж 3",
								centerPoint:new Vector3(-245,0,20),
								rotation:{x:0,y:90,z:0},
								racksTypeId: "0002",
								shelfs:[
									{name:"Полка 1", number:1, shelfCode:25, space:[]},
									{name:"Полка 2", number:2, shelfCode:26, space:[]},
									{name:"Полка 3", number:3, shelfCode:27, space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 7, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 4", number:4, shelfCode:28, space:[]},
									{name:"Полка 5", number:5, shelfCode:29, space:[]},
									{name:"Полка 6", number:6, shelfCode:30, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 8, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
								]
							},
							{
								name:"Стеллаж 4",
								centerPoint:new Vector3(-120,0,110),
								rotation:{x:0,y:0,z:0},
								racksTypeId: "0001",
								shelfs:[
									{name:"Полка 1", number:1, shelfCode:31, space:[]},
									{name:"Полка 2", number:2, shelfCode:32, space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 9, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 3", number:3, shelfCode:33, space:[
										{goodTypeId: "0003", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 10, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 4", number:4, shelfCode:34, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 11, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 5", number:5, shelfCode:35, space:[]},
									{name:"Полка 6", number:6, shelfCode:36, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 12, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 7", number:7, shelfCode:37, space:[]},
									{name:"Полка 8", number:8, shelfCode:38, space:[]},
									{name:"Полка 9", number:9, shelfCode:39, space:[]},
									{name:"Полка 10", number:10, shelfCode:40, space:[]},
									{name:"Полка 11", number:11, shelfCode:41, space:[]},
									{name:"Полка 12", number:12, shelfCode:42, space:[
										{goodTypeId: "0003", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 13, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
								]
							},

							{
								name:"Стеллаж 5",
								centerPoint:new Vector3(55,0,110),
								rotation:{x:0,y:0,z:0},
								racksTypeId: "0002",
								shelfs:[
									{name:"Полка 1", number:1, shelfCode:43, space:[]},
									{name:"Полка 2", number:2, shelfCode:44, space:[]},
									{name:"Полка 3", number:3, shelfCode:45, space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 14, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 4", number:4, shelfCode:46, space:[]},
									{name:"Полка 5", number:5, shelfCode:47, space:[]},
									{name:"Полка 6", number:6, shelfCode:48, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 15, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
								]
							},

							{
								name:"Стеллаж 6",
								centerPoint:new Vector3(180,0,110),
								rotation:{x:0,y:0,z:0},
								racksTypeId: "0002",
								shelfs:[
									{name:"Полка 1", number:1, shelfCode:49, space:[]},
									{name:"Полка 2", number:2, shelfCode:50, space:[]},
									{name:"Полка 3", number:3, shelfCode:51, space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 16, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 4", number:4, shelfCode:52, space:[]},
									{name:"Полка 5", number:5, shelfCode:53, space:[]},
									{name:"Полка 6", number:6, shelfCode:54, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 17, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
								]
							},
						]
					},
					{
						name:"Зона 2",
						centerPoint:new Vector3(-240,0,0),
						rotation:{x:0,y:0,z:0},
						zoneTypeId: "0002",
						racks:[
							{
								name:"Стеллаж 1",
								centerPoint:new Vector3(120,0,-120),
								rotation:{x:0,y:0,z:0},
								racksTypeId: "0001",
								shelfs:[
									{name:"Полка 1", number:1, shelfCode:55, space:[]},
									{name:"Полка 2", number:2, shelfCode:56, space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 18, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 3", number:3, shelfCode:57, space:[]},
									{name:"Полка 4", number:4, shelfCode:58, space:[]},
									{name:"Полка 5", number:5, shelfCode:59, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 19, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 6", number:6, shelfCode:60, space:[
										{goodTypeId: "0003", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 20, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 7", number:7, shelfCode:61, space:[]},
									{name:"Полка 8", number:8, shelfCode:62, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 21, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 9", number:9, shelfCode:63, space:[]},
									{name:"Полка 10", number:10, shelfCode:64, space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 22, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 11", number:11, shelfCode:65, space:[]},
									{name:"Полка 12", number:12, shelfCode:66, space:[]},
								]
							},
							{
								name:"Стеллаж 2",
								centerPoint:new Vector3(-180,0,-120),
								rotation:{x:0,y:0,z:0},
								racksTypeId: "0002",
								shelfs:[
									{name:"Полка 1", number:1, shelfCode:67, space:[]},
									{name:"Полка 2", number:2, shelfCode:68, space:[]},
									{name:"Полка 3", number:3, shelfCode:69, space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 23, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 4", number:4, shelfCode:70, space:[]},
									{name:"Полка 5", number:5, shelfCode:71, space:[]},
									{name:"Полка 6", number:6, shelfCode:72, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 24, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
								]
							},

							{
								name:"Стеллаж 3",
								centerPoint:new Vector3(-60,0,-120),
								rotation:{x:0,y:0,z:0},
								racksTypeId: "0002",
								shelfs:[
									{name:"Полка 1", number:1, shelfCode:73, space:[]},
									{name:"Полка 2", number:2, shelfCode:74, space:[]},
									{name:"Полка 3", number:3, shelfCode:75, space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 25, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 4", number:4, shelfCode:76, space:[
										{goodTypeId: "0003", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 26, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 5", number:5, shelfCode:77, space:[]},
									{name:"Полка 6", number:6, shelfCode:78, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 27, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
								]
							},
							{
								name:"Стеллаж 4",
								centerPoint:new Vector3(-245,0,20),
								rotation:{x:0,y:90,z:0},
								racksTypeId: "0002",
								shelfs:[
									{name:"Полка 1", number:1, shelfCode:79, space:[]},
									{name:"Полка 2", number:2, shelfCode:80, space:[]},
									{name:"Полка 3", number:3, shelfCode:81, space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 28, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 4", number:4, shelfCode:82, space:[]},
									{name:"Полка 5", number:5, shelfCode:83, space:[]},
									{name:"Полка 6", number:6, shelfCode:84, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 29, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
								]
							},
							{
								name:"Стеллаж 5",
								centerPoint:new Vector3(-120,0,110),
								rotation:{x:0,y:0,z:0},
								racksTypeId: "0001",
								shelfs:[
									{name:"Полка 1", number:1, shelfCode:85, space:[]},
									{name:"Полка 2", number:2, shelfCode:86, space:[]},
									{name:"Полка 3", number:3, shelfCode:87, space:[]},
									{name:"Полка 4", number:4, shelfCode:88, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 30, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 5", number:5, shelfCode:89, space:[]},
									{name:"Полка 6", number:6, shelfCode:90, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 31, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 7", number:7, shelfCode:91, space:[]},
									{name:"Полка 8", number:8, shelfCode:92, space:[]},
									{name:"Полка 9", number:9, shelfCode:93, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 32, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 10", number:10, shelfCode:94, space:[]},
									{name:"Полка 11", number:11, shelfCode:95, space:[]},
									{name:"Полка 12", number:12, shelfCode:96, space:[]},
								]
							},

							{
								name:"Стеллаж 6",
								centerPoint:new Vector3(120,0,110),
								rotation:{x:0,y:0,z:0},
								racksTypeId: "0001",
								shelfs:[
									{name:"Полка 1", number:1, shelfCode:97, space:[]},
									{name:"Полка 2", number:2, shelfCode:98, space:[]},
									{name:"Полка 3", number:3, shelfCode:99, space:[]},
									{name:"Полка 4", number:4, shelfCode:100, space:[]},
									{name:"Полка 5", number:5, shelfCode:101, space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 33, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 6", number:6, shelfCode:102, space:[]},
									{name:"Полка 7", number:7, shelfCode:103, space:[
										{goodTypeId: "0003", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 34, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 8", number:8, shelfCode:104, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 35, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 9", number:9, shelfCode:105, space:[]},
									{name:"Полка 10", number:10, shelfCode:106, space:[]},
									{name:"Полка 11", number:11, shelfCode:107, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 36, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 12", number:12, shelfCode:108, space:[]},
								]
							},
						]
					},
					{
						name:"Зона 3",
						centerPoint:new Vector3(-240,0,340),
						rotation:{x:0,y:0,z:0},
						zoneTypeId: "0003",
						racks:[
							{
								name:"Стеллаж 1",
								centerPoint:new Vector3(120,0,-120),
								rotation:{x:0,y:0,z:0},
								racksTypeId: "0001",
								shelfs:[
									{name:"Полка 1", number:1, shelfCode:109, space:[]},
									{name:"Полка 2", number:2, shelfCode:110, space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 37, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 38, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 3", number:3, shelfCode:111, space:[]},
									{name:"Полка 4", number:4, shelfCode:112, space:[]},
									{name:"Полка 5", number:5, shelfCode:113, space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 39, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 6", number:6, shelfCode:114, space:[]},
									{name:"Полка 7", number:7, shelfCode:115, space:[]},
									{name:"Полка 8", number:8, shelfCode:116, space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 40, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 9", number:9, shelfCode:117, space:[]},
									{name:"Полка 10", number:10, shelfCode:118, space:[]},
									{name:"Полка 11", number:11, shelfCode:119, space:[
										{goodTypeId: "0003", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 41, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 12", number:12, shelfCode:120, space:[]},
								]
							},
							{
								name:"Стеллаж 2",
								centerPoint:new Vector3(-120,0,-120),
								rotation:{x:0,y:0,z:0},
								racksTypeId: "0001",
								shelfs:[
									{name:"Полка 1", number:1, shelfCode:121, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 42, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 2", number:2, shelfCode:122, space:[]},
									{name:"Полка 3", number:3, shelfCode:123, space:[]},
									{name:"Полка 4", number:4, shelfCode:124, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 43, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 5", number:5, shelfCode:125, space:[]},
									{name:"Полка 6", number:6, shelfCode:126, space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 44, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 7", number:7, shelfCode:127, space:[]},
									{name:"Полка 8", number:8, shelfCode:128, space:[]},
									{name:"Полка 9", number:9, shelfCode:129, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 45, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 10", number:10, shelfCode:130, space:[]},
									{name:"Полка 11", number:11, shelfCode:131, space:[]},
									{name:"Полка 12", number:12, shelfCode:132, space:[]},
								]
							},
							{
								name:"Стеллаж 3",
								centerPoint:new Vector3(-245,0,20),
								rotation:{x:0,y:90,z:0},
								racksTypeId: "0002",
								shelfs:[
									{name:"Полка 1", number:1, shelfCode:133, space:[]},
									{name:"Полка 2", number:2, shelfCode:134, space:[]},
									{name:"Полка 3", number:3, shelfCode:135, space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 46, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 4", number:4, shelfCode:136, space:[]},
									{name:"Полка 5", number:5, shelfCode:137, space:[]},
									{name:"Полка 6", number:6, shelfCode:138, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 47, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
								]
							},
							{
								name:"Стеллаж 4",
								centerPoint:new Vector3(-120,0,110),
								rotation:{x:0,y:0,z:0},
								racksTypeId: "0001",
								shelfs:[
									{name:"Полка 1", number:1, shelfCode:139, space:[]},
									{name:"Полка 2", number:2, shelfCode:140, space:[]},
									{name:"Полка 3", number:3, shelfCode:141, space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 48, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 4", number:4, shelfCode:142, space:[]},
									{name:"Полка 5", number:5, shelfCode:143, space:[]},
									{name:"Полка 6", number:6, shelfCode:144, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 49, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 7", number:7, shelfCode:145, space:[]},
									{name:"Полка 8", number:8, shelfCode:146, space:[]},
									{name:"Полка 9", number:9, shelfCode:147, space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 50, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 10", number:10, shelfCode:148, space:[]},
									{name:"Полка 11", number:11, shelfCode:149, space:[]},
									{name:"Полка 12", number:12, shelfCode:150, space:[]},
								]
							},

							{
								name:"Стеллаж 5",
								centerPoint:new Vector3(120,0,110),
								rotation:{x:0,y:0,z:0},
								racksTypeId: "0001",
								shelfs:[
									{name:"Полка 1", number:1, shelfCode:151, space:[]},
									{name:"Полка 2", number:2, shelfCode:152, space:[]},
									{name:"Полка 3", number:3, shelfCode:153, space:[
										{goodTypeId: "0003", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 51, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 4", number:4, shelfCode:154, space:[]},
									{name:"Полка 5", number:5, shelfCode:155, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 52, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 6", number:6, shelfCode:156, space:[]},
									{name:"Полка 7", number:7, shelfCode:157, space:[]},
									{name:"Полка 8", number:8, shelfCode:158, space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 53, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 54, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 55, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 56, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 57, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 58, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', id: 59, cost:Number("10000"), subCategory: "Варочные поверхности", category:"Встраиваемая техника", weight: 44, status: 'Проинвентаризирован', goodCharacteristics:"4 электрические конфорки, предусмотренные в конструкции данной варочной поверхности, выполнены по технологии Hi-Light, что обеспечивает быстрый разогрев, а индикатор остаточного тепла позволяет оценивать состояние конфорок и сводит к минимуму риск ожогов"},
									]},
									{name:"Полка 9", number:9, shelfCode:159, space:[]},
									{name:"Полка 10", number:10, shelfCode:160, space:[]},
									{name:"Полка 11", number:11, shelfCode:161, space:[]},
									{name:"Полка 12", number:12, shelfCode:162, space:[]},
								]
							},
						]
					},
				]
			}
		)
	}


}