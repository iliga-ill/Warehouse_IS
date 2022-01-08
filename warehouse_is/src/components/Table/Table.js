import React from "react";
import './Table.css';
import ExpandListInputTable from "../ExpandListInput/ExpandListInputTable/ExpandListInputTable";
import PlusIcon from '../../images/PlusIcon.svg'
import MinusIcon from '../../images/MinusIcon.svg'

var grid_template_columns=""

var styles = {
    table: {
        display: "grid",
        gridTemplateColumns: "",
        height: "max-content",
    },
    scroll: {
        height: "",
        overflowY: "scroll",
    }
}

var tableData = null

export default function Table(props){

    //requiered data
    /*
    var id=0
    function getId(){
        id++
        return id-1
    }

    var table_list_value = [
        {value: "Стиральные машины", selected: true},
        {value: "Пылесосы", selected: false},
        {value: "Утюги", selected: false},
        {value: "Вытяжки", selected: false},
    ]

    var table_headers = [
        {title:"№", mode:"text", column_width: "30px", listValue: []}, 
        {title:"Наименование", mode:"text", column_width: "100px", listValue: []}, 
        // {title:"Категория", mode:"text", column_width: "70px", listValue: table_list_value}, 
        {title:"Категория", mode:"inputList", column_width: "160px", listValue: table_list_value}, 
        {title:"Кол-во коробок", mode:"input", column_width: "70px", listValue: []}
    ]

    var  table_field_height = "100px"

    var table_list = [
        [0, "Стиральная машина А30", "Стиральные машины", "20"],
        [0, "Утюг В3000", "Утюги", "10"],
        [0, "Вытяжка S240", "Вытяжки", "10"],
        [0, "Утюг Ж510", "Утюги", "10"],
    ]
    function set_table_list_1(value) {table_list = value}
    */

    //pattern
    /*
    <Table Id={getId()} table_headers={table_headers} table_field_height={table_field_height} table_list={table_list} func={set_table_list_1} search="true"/>
    */

    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);

    let [reload, setReload] = React.useState(0)

    function reloadPage(){
        setReload(reload+1)
    }

    if (tableData == null)
    tableData=props.table_list

    const handleChange = event => {
        setSearchTerm(event.target.value);
      };

     React.useEffect(() => {
        var results = []
        var j=0
        tableData.map(function(item,i){
            var search=false
            props.table_headers.map(function(item1,i){
                if (item[i]!=undefined && item[i].toString().toLowerCase().includes(searchTerm.toLowerCase())) {
                    search=true
                }
            })
            if (search) {
                results[j] = item
                j++
            }
        })
        setSearchResults(results);
      }, [searchTerm]);
    
    grid_template_columns=""
    props.table_headers.map(function(item, i){
        grid_template_columns += " " + props.table_headers[i].column_width
    })

    if (styles.table.gridTemplateColumns != grid_template_columns) styles.table.gridTemplateColumns = grid_template_columns
    if (styles.scroll.height != props.table_field_height) styles.scroll.height = props.table_field_height

    function onInputChange(Id, j, i){
        if (document.getElementById(Id) != null){
            tableData[j][i]=document.getElementById(Id).value
            props.func(tableData)
        }
        reloadPage()
    }

    function onListInputChange(value, i, j){
        if (value != null && i!=undefined && j!= undefined){
            value.map(item=>{
                if (item.selected) 
                tableData[j][i]=item.value
            })
            props.func(tableData)
        }
    }

    var lastItem = props.Id+"_"+0

    function onMouseEnterRow(id){
        if (document.getElementById(lastItem) != null)
            document.getElementById(lastItem).hidden = true
        document.getElementById(id).hidden = false
        lastItem = id
    }

    function removeItem(j){
        var newList = []
        var counter = 0
        tableData.map(function(item,i){
            if (i != j) {
                newList[counter] = item
                counter++
            }
        })
        tableData = newList
        tableData.map(function(item,i){ 
            tableData[i][0] = i 
        })
        console.log(tableData)

        props.table_headers.map(function(item1,i){
            document.getElementById(props.Id+"_"+j+"_"+i).remove()
        })
        
        props.func(tableData)
    }
    
    tableData.map(function(item,i){ 
        item[0] = i
    })

    return (
        <>
            {props.table_headers.map(function(item,i){
                if (props.search == "true" && i==0) {
                    return (
                        <div class="table_search_wrap">
                            <input type="text" placeholder="Search" value={searchTerm} onChange={handleChange} class="table_search_field" />
                        </div>
                        )
                }})
            }
            <div>
                <div class="low_table_text middle" style={styles.table}>
                    {props.table_headers.map(function(item,i){

                        var styles = {
                            border:{
                                borderTop: "1px solid darkgray",
                                borderLeft: "0px solid darkgray",
                                borderRight: "1px solid darkgray",
                                borderBottom: "1px solid darkgray",
                            }
                        }
                        if (i==0) styles.border.borderLeft="1px solid darkgray"
                        if (i==props.table_headers.length-2) styles.border.borderRight="1px solid darkgray"
                        if (i==props.table_headers.length-1) {
                            styles.border.borderRight="0px solid darkgray"
                            styles.border.borderTop="0px solid darkgray"
                            styles.border.borderBottom="0px solid darkgray"
                        }

                        return <div style={styles.border} class="middle">{item.title}</div>
                    })}
                </div>
                <div style={styles.scroll} class="scroll_field">
                    <div id={props.Id + "_holder"} class="low_table_text middle" style={styles.table}>
                        {searchResults.map(function(item1, j){
                            return (<>{
                                item1.map(function(item, i) {
                                    var styles = {
                                        border:{
                                            borderTop: "0px solid darkgray",
                                            borderLeft: "0px solid darkgray",
                                            borderRight: "1px solid darkgray",
                                            borderBottom: "1px solid darkgray",
                                        }
                                    }
                                    if (j==0) styles.border.borderTop="0px solid darkgray"
                                    //if (j==searchResults.length-1) styles.border.borderBottom="0px solid darkgray"
                                    if (i==0) styles.border.borderLeft="1px solid darkgray"
                                    if (i==item1.length-2) styles.border.borderRight="1px solid darkgray"

                                    if (props.table_headers[i].mode == "text")
                                        return <div id={props.Id+"_"+j+"_"+i} style={styles.border} class="middle" onMouseEnter={e=>onMouseEnterRow(props.Id+"_"+j)} >{item}</div>
                                    else if (props.table_headers[i].mode == "input")
                                        return <input id={props.Id+"_"+j+"_"+i} class="middle input" onMouseOver={e=>onMouseEnterRow(props.Id+"_"+j)} defaultValue={item} onChange={e => onInputChange(e.target.id, j, i)} placeholder={""}/>
                                    else if (props.table_headers[i].mode == "inputList")
                                        return <ExpandListInputTable style={styles.border} class="middle" onMouseOver={e=>onMouseEnterRow(props.Id+"_"+j)} Id={props.Id+"_"+j+"_"+i} defValue={item} list={props.table_headers[i].listValue} i={i} j={j} func={onListInputChange}/>
                                    else if (props.table_headers[i].mode == "remove")
                                        return (<div class="middle minus_icon_wrap" id={props.Id+"_"+j+"_"+i} onMouseOver={e=>onMouseEnterRow(props.Id+"_"+j)}>
                                                    <img Id={props.Id+"_"+j} className="minus_icon" src={MinusIcon} alt="minus_icon" hidden="true" onClick={e=>removeItem(j)}/>
                                                </div>)
                                })
                            }</>)
                        })}
                    </div>
                </div>
                <div class="low_table_text middle" style={styles.table}>
                    {props.table_headers.map(function(item,i){

                    var styles = {
                        border:{
                            borderTop: "1px solid darkgray",
                            borderLeft: "0px solid darkgray",
                            borderRight: "1px solid darkgray",
                            borderBottom: "1px solid darkgray",
                        }
                    }
                    if (i==0) styles.border.borderLeft="1px solid darkgray"
                    if (i==props.table_headers.length-2) styles.border.borderRight="1px solid darkgray"
                    if (i==props.table_headers.length-1) {
                        styles.border.borderRight="0px solid darkgray"
                        styles.border.borderTop="0px solid darkgray"
                        styles.border.borderBottom="0px solid darkgray"
                    }

                        if (i==0) 
                            return (
                                <div style={styles.border} class="middle plus_icon_wrap">
                                    <img className="plus_icon" src={PlusIcon} alt="plus_icon"/>
                                </div>
                                )
                        else
                            return <div style={styles.border} class="middle"></div>
                    })} 
                </div>
            </div>
        </>
    )
}