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
					chamferLendth:10
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
						message:"Зона 1",
						textSize:15,
						gapLengthX: "Зона 1".length * 15,
						gapLengthY: "Зона 1".length * 15,
						messageAlighment:["right"],
						// messageAlighment:["top", "bottom", "left", "right"],
						racks:[
							{
								name:"Стеллаж 1",
								centerPoint:new Vector3(120,0,-120),
								rotation:{x:0,y:0,z:0},
								racksTypeId: "0001",
								shelfs:[
									{name:"Полка 1",number:1,space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
									{name:"Полка 2",number:2,space:[]},
									{name:"Полка 3",number:3,space:[]},
									{name:"Полка 4",number:4,space:[]},
									{name:"Полка 5",number:5,space:[]},
									{name:"Полка 6",number:6,space:[]},
									{name:"Полка 7",number:7,space:[]},
									{name:"Полка 8",number:8,space:[]},
									{name:"Полка 9",number:9,space:[
										{goodTypeId: "0003", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
									{name:"Полка 10",number:10,space:[]},
									{name:"Полка 11",number:11,space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
									{name:"Полка 12",number:12,space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
								]
							},
							{
								name:"Стеллаж 2",
								centerPoint:new Vector3(-120,0,-120),
								rotation:{x:0,y:0,z:0},
								racksTypeId: "0001",
								shelfs:[
									{name:"Полка 1",number:1,space:[]},
									{name:"Полка 2",number:2,space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
									{name:"Полка 3",number:3,space:[]},
									{name:"Полка 4",number:4,space:[]},
									{name:"Полка 5",number:5,space:[]},
									{name:"Полка 6",number:6,space:[]},
									{name:"Полка 7",number:7,space:[]},
									{name:"Полка 8",number:8,space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
									{name:"Полка 9",number:9,space:[]},
									{name:"Полка 10",number:10,space:[]},
									{name:"Полка 11",number:11,space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
									{name:"Полка 12",number:12,space:[]},
								]
							},
							{
								name:"Стеллаж 3",
								centerPoint:new Vector3(-245,0,20),
								rotation:{x:0,y:90,z:0},
								racksTypeId: "0002",
								shelfs:[
									{name:"Полка 1",number:1,space:[]},
									{name:"Полка 2",number:2,space:[]},
									{name:"Полка 3",number:3,space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
									{name:"Полка 4",number:4,space:[]},
									{name:"Полка 5",number:5,space:[]},
									{name:"Полка 6",number:6,space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
								]
							},
							{
								name:"Стеллаж 4",
								centerPoint:new Vector3(-120,0,110),
								rotation:{x:0,y:0,z:0},
								racksTypeId: "0001",
								shelfs:[
									{name:"Полка 1",number:1,space:[]},
									{name:"Полка 2",number:2,space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
									{name:"Полка 3",number:3,space:[
										{goodTypeId: "0003", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
									{name:"Полка 4",number:4,space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
									{name:"Полка 5",number:5,space:[]},
									{name:"Полка 6",number:6,space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
									{name:"Полка 7",number:7,space:[]},
									{name:"Полка 8",number:8,space:[]},
									{name:"Полка 9",number:9,space:[]},
									{name:"Полка 10",number:10,space:[]},
									{name:"Полка 11",number:11,space:[]},
									{name:"Полка 12",number:12,space:[
										{goodTypeId: "0003", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
								]
							},

							{
								name:"Стеллаж 5",
								centerPoint:new Vector3(55,0,110),
								rotation:{x:0,y:0,z:0},
								racksTypeId: "0002",
								shelfs:[
									{name:"Полка 1",number:1,space:[]},
									{name:"Полка 2",number:2,space:[]},
									{name:"Полка 3",number:3,space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
									{name:"Полка 4",number:4,space:[]},
									{name:"Полка 5",number:5,space:[]},
									{name:"Полка 6",number:6,space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
								]
							},

							{
								name:"Стеллаж 6",
								centerPoint:new Vector3(180,0,110),
								rotation:{x:0,y:0,z:0},
								racksTypeId: "0002",
								shelfs:[
									{name:"Полка 1",number:1,space:[]},
									{name:"Полка 2",number:2,space:[]},
									{name:"Полка 3",number:3,space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
									{name:"Полка 4",number:4,space:[]},
									{name:"Полка 5",number:5,space:[]},
									{name:"Полка 6",number:6,space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
								]
							},
						]
					},
					{
						name:"Зона 2",
						centerPoint:new Vector3(-240,0,0),
						rotation:{x:0,y:0,z:0},
						zoneTypeId: "0001",
						message:"Зона 2",
						textSize:15,
						gapLengthX: "Зона 1".length * 15,
						gapLengthY: "Зона 1".length * 15,
						messageAlighment:["right"],
						racks:[
							{
								name:"Стеллаж 1",
								centerPoint:new Vector3(120,0,-120),
								rotation:{x:0,y:0,z:0},
								racksTypeId: "0001",
								shelfs:[
									{name:"Полка 1",number:1,space:[]},
									{name:"Полка 2",number:2,space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
									{name:"Полка 3",number:3,space:[]},
									{name:"Полка 4",number:4,space:[]},
									{name:"Полка 5",number:5,space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
									{name:"Полка 6",number:6,space:[
										{goodTypeId: "0003", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
									{name:"Полка 7",number:7,space:[]},
									{name:"Полка 8",number:8,space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
									{name:"Полка 9",number:9,space:[]},
									{name:"Полка 10",number:10,space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
									{name:"Полка 11",number:11,space:[]},
									{name:"Полка 12",number:12,space:[]},
								]
							},
							{
								name:"Стеллаж 2",
								centerPoint:new Vector3(-180,0,-120),
								rotation:{x:0,y:0,z:0},
								racksTypeId: "0002",
								shelfs:[
									{name:"Полка 1",number:1,space:[]},
									{name:"Полка 2",number:2,space:[]},
									{name:"Полка 3",number:3,space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
									{name:"Полка 4",number:4,space:[]},
									{name:"Полка 5",number:5,space:[]},
									{name:"Полка 6",number:6,space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
								]
							},

							{
								name:"Стеллаж 3",
								centerPoint:new Vector3(-60,0,-120),
								rotation:{x:0,y:0,z:0},
								racksTypeId: "0002",
								shelfs:[
									{name:"Полка 1",number:1,space:[]},
									{name:"Полка 2",number:2,space:[]},
									{name:"Полка 3",number:3,space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
									{name:"Полка 4",number:4,space:[
										{goodTypeId: "0003", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
									{name:"Полка 5",number:5,space:[]},
									{name:"Полка 6",number:6,space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
								]
							},
							{
								name:"Стеллаж 4",
								centerPoint:new Vector3(-245,0,20),
								rotation:{x:0,y:90,z:0},
								racksTypeId: "0002",
								shelfs:[
									{name:"Полка 1",number:1,space:[]},
									{name:"Полка 2",number:2,space:[]},
									{name:"Полка 3",number:3,space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
									{name:"Полка 4",number:4,space:[]},
									{name:"Полка 5",number:5,space:[]},
									{name:"Полка 6",number:6,space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
								]
							},
							{
								name:"Стеллаж 5",
								centerPoint:new Vector3(-120,0,110),
								rotation:{x:0,y:0,z:0},
								racksTypeId: "0001",
								shelfs:[
									{name:"Полка 1",number:1,space:[]},
									{name:"Полка 2",number:2,space:[]},
									{name:"Полка 3",number:3,space:[]},
									{name:"Полка 4",number:4,space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
									{name:"Полка 5",number:5,space:[]},
									{name:"Полка 6",number:6,space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
									{name:"Полка 7",number:7,space:[]},
									{name:"Полка 8",number:8,space:[]},
									{name:"Полка 9",number:9,space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
									{name:"Полка 10",number:10,space:[]},
									{name:"Полка 11",number:11,space:[]},
									{name:"Полка 12",number:12,space:[]},
								]
							},

							{
								name:"Стеллаж 6",
								centerPoint:new Vector3(120,0,110),
								rotation:{x:0,y:0,z:0},
								racksTypeId: "0001",
								shelfs:[
									{name:"Полка 1",number:1,space:[]},
									{name:"Полка 2",number:2,space:[]},
									{name:"Полка 3",number:3,space:[]},
									{name:"Полка 4",number:4,space:[]},
									{name:"Полка 5",number:5,space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
									{name:"Полка 6",number:6,space:[]},
									{name:"Полка 7",number:7,space:[
										{goodTypeId: "0003", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
									{name:"Полка 8",number:8,space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
									{name:"Полка 9",number:9,space:[]},
									{name:"Полка 10",number:10,space:[]},
									{name:"Полка 11",number:11,space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
									{name:"Полка 12",number:12,space:[]},
								]
							},
						]
					},
					{
						name:"Зона 3",
						centerPoint:new Vector3(-240,0,340),
						rotation:{x:0,y:0,z:0},
						zoneTypeId: "0001",
						message:"Зона 3",
						textSize:15,
						gapLengthX: "Зона 1".length * 15,
						gapLengthY: "Зона 1".length * 15,
						messageAlighment:["right"],
						racks:[
							{
								name:"Стеллаж 1",
								centerPoint:new Vector3(120,0,-120),
								rotation:{x:0,y:0,z:0},
								racksTypeId: "0001",
								shelfs:[
									{name:"Полка 1",number:1,space:[]},
									{name:"Полка 2",number:2,space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
									{name:"Полка 3",number:3,space:[]},
									{name:"Полка 4",number:4,space:[]},
									{name:"Полка 5",number:5,space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
									{name:"Полка 6",number:6,space:[]},
									{name:"Полка 7",number:7,space:[]},
									{name:"Полка 8",number:8,space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
									{name:"Полка 9",number:9,space:[]},
									{name:"Полка 10",number:10,space:[]},
									{name:"Полка 11",number:11,space:[
										{goodTypeId: "0003", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
									{name:"Полка 12",number:12,space:[]},
								]
							},
							{
								name:"Стеллаж 2",
								centerPoint:new Vector3(-120,0,-120),
								rotation:{x:0,y:0,z:0},
								racksTypeId: "0001",
								shelfs:[
									{name:"Полка 1",number:1,space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
									{name:"Полка 2",number:2,space:[]},
									{name:"Полка 3",number:3,space:[]},
									{name:"Полка 4",number:4,space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
									{name:"Полка 5",number:5,space:[]},
									{name:"Полка 6",number:6,space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
									{name:"Полка 7",number:7,space:[]},
									{name:"Полка 8",number:8,space:[]},
									{name:"Полка 9",number:9,space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
									{name:"Полка 10",number:10,space:[]},
									{name:"Полка 11",number:11,space:[]},
									{name:"Полка 12",number:12,space:[]},
								]
							},
							{
								name:"Стеллаж 3",
								centerPoint:new Vector3(-245,0,20),
								rotation:{x:0,y:90,z:0},
								racksTypeId: "0002",
								shelfs:[
									{name:"Полка 1",number:1,space:[]},
									{name:"Полка 2",number:2,space:[]},
									{name:"Полка 3",number:3,space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
									{name:"Полка 4",number:4,space:[]},
									{name:"Полка 5",number:5,space:[]},
									{name:"Полка 6",number:6,space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
								]
							},
							{
								name:"Стеллаж 4",
								centerPoint:new Vector3(-120,0,110),
								rotation:{x:0,y:0,z:0},
								racksTypeId: "0001",
								shelfs:[
									{name:"Полка 1",number:1,space:[]},
									{name:"Полка 2",number:2,space:[]},
									{name:"Полка 3",number:3,space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
									{name:"Полка 4",number:4,space:[]},
									{name:"Полка 5",number:5,space:[]},
									{name:"Полка 6",number:6,space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
									{name:"Полка 7",number:7,space:[]},
									{name:"Полка 8",number:8,space:[]},
									{name:"Полка 9",number:9,space:[
										{goodTypeId: "0002", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
									{name:"Полка 10",number:10,space:[]},
									{name:"Полка 11",number:11,space:[]},
									{name:"Полка 12",number:12,space:[]},
								]
							},

							{
								name:"Стеллаж 5",
								centerPoint:new Vector3(120,0,110),
								rotation:{x:0,y:0,z:0},
								racksTypeId: "0001",
								shelfs:[
									{name:"Полка 1",number:1,space:[]},
									{name:"Полка 2",number:2,space:[]},
									{name:"Полка 3",number:3,space:[
										{goodTypeId: "0003", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
									{name:"Полка 4",number:4,space:[]},
									{name:"Полка 5",number:5,space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
									{name:"Полка 6",number:6,space:[]},
									{name:"Полка 7",number:7,space:[]},
									{name:"Полка 8",number:8,space:[
										{goodTypeId: "0001", name: 'Варочная поверхность Bosch PKE 645 B17E', goodCode: 6, amount: 1, weight: 44, status: 'Проинвентаризирован', shelfCode:1},
									]},
									{name:"Полка 9",number:9,space:[]},
									{name:"Полка 10",number:10,space:[]},
									{name:"Полка 11",number:11,space:[]},
									{name:"Полка 12",number:12,space:[]},
								]
							},
						]
					},
				]
			}
		)
	}


}