import React from "react";
import './Table.css';
import ExpandListInputTable from "../ExpandListInput/ExpandListInputTable/ExpandListInputTable";
import PlusIcon from '../../images/PlusIcon.svg'
import MinusIcon from '../../images/MinusIcon.svg'
import EditIcon from '../../images/EditIcon.svg'
import ConfirmIcon from '../../images/ConfirmIcon.svg'
import WarnIcon from '../../images/WarnIcon.svg'

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
    },
}

var tableData = null
var innerList = []
var showWarn = false

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

    if (tableData == null) {
        tableData=props.table_list
        props.table_list.map(function(item,i){
            innerList[i]={id: item[0], number: i, onChange: false, onCreate: false}
        })
    }

    function recountInnerList(){
        var counter=1
        innerList.map(item=>{
            tableData.map(function(item2,i){
                if (item.id == item2[0]){
                    item.number=counter
                    counter++
                }
            })
        })
    }

    function checkShowWarn(){
        tableData.map(item=>{
            if (item[item.length-1]){
                showWarn=true
            }
        })
    }

    const handleChange = event => {
        setSearchTerm(event.target.value);
      };

     React.useEffect(() => {
        sort()
      }, [searchTerm]);

    function sort(){
        var results = []
        var j=0
        tableData.map(function(item,k){
            var search=false
            item.map(function(item1,i){
                if (i==0){
                    if(item1!==undefined && innerList[k].number.toString().toLowerCase().includes(searchTerm.toLowerCase())) {
                        search=true
                    }
                }
                else if (item1!==undefined && item1.toString().toLowerCase().includes(searchTerm.toLowerCase())) {
                    search=true
                }
            })
            if (search) {
                results[j] = item
                j++
            }
        })
        setSearchResults(results);
    }

    function reloadTable(){
        document.getElementById(props.Id+"_input").value=" "
        sort()
        document.getElementById(props.Id+"_input").value=""
        sort()
    }

    grid_template_columns=""
    props.table_headers.map(function(item, i){
        grid_template_columns += " " + props.table_headers[i].column_width
    })

    if (styles.table.gridTemplateColumns != grid_template_columns) styles.table.gridTemplateColumns = grid_template_columns
    if (styles.scroll.height != props.table_field_height) styles.scroll.height = props.table_field_height

    function onInputChange(Id, id, i){
        if (document.getElementById(Id) != null){
            tableData.map(item1=>{
                if(item1[0] == id)
                    item1[i]=document.getElementById(Id).value
            })
            props.func(tableData)
        }
        reloadPage()
    }

    function onListInputChange(value, id, i){
        if (value != null && i!=undefined && id!= undefined){
            value.map(item=>{
                if (item.selected) {
                    tableData.map(item1=>{
                        if(item1[0] == id)
                            item1[i]=item.value
                    })
                    
                }
            })
            props.func(tableData)
        }
    }

    var lastItem = props.Id+"_"+0

    function onMouseEnterRow(id){
        if (document.getElementById(lastItem) != null)
            document.getElementById(lastItem).hidden = true
        document.getElementById(id).hidden = false
        document.getElementById(id).hidden = false
        lastItem = id
    }

    function removeItem(j, id){
        var newList = []
        var counter = 0
        console.log(j)
        tableData.map(function(item,i){
            if (item[0] != id) {
                newList[counter] = item
                counter++
            }
        })
        tableData = newList

        // props.table_headers.map(function(item1,i){
        //     document.getElementById(props.Id+"_"+j+"_"+i).remove()
        // })
        reloadTable()

        props.func(tableData)
        reloadPage()
    }

    function changeItem(id){
        innerList.map(item=>{
            if (item.id==id) item.onChange=true
        })
        reloadTable()
    }

    function confirmItem(id){
        innerList.map(item=>{
            if (item.id==id) item.onChange=false
        })
        reloadTable()
    }

    function addItem(){
        var tableString=[]
        tableData[0].map(function(item,i){
            if (i==0){
                tableString[i]=tableData[tableData.length-1][0]+1
            }
            else if (i==tableData[0].length-1)
                tableString[i]=true
            else
                tableString[i]=""
        })
        console.log(tableData)
        tableData[tableData.length] = tableString
        innerList[innerList.length] = {id: innerList[innerList.length-1].id+1, number: innerList[innerList.length-1].number+1, onChange: true, onCreate: true}
        reloadTable()
    }

    return (
        <>
            {props.table_headers.map(function(item,i){
                if (props.search == "true" && i==0) {
                    return (
                        <div class="table_search_wrap">
                            <input id={props.Id+"_input"} type="text" placeholder="Search" value={searchTerm} onChange={handleChange} class="table_search_field" />
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

                                    if (document.getElementById(props.Id+"_"+j+"_"+i) != null){
                                        document.getElementById(props.Id+"_"+j+"_"+i).value=item
                                    }

                                    recountInnerList()
                                    checkShowWarn()
                                    var obj
                                    innerList.map(item3=>{
                                        if (item3.id==item1[0]) obj=item3
                                    })

                                    if (obj.onChange && item1[item1.length-1] && !obj.onCreate){
                                        if (props.table_headers[i].mode == "text" && i==0)
                                            return <div id={props.Id+"_"+j+"_"+i} style={styles.border} class="middle" onMouseEnter={e=>onMouseEnterRow(props.Id+"_"+j)} >{obj.number}</div>
                                        else if (props.table_headers[i].mode == "text")
                                            return <div id={props.Id+"_"+j+"_"+i} style={styles.border} class="middle" onMouseEnter={e=>onMouseEnterRow(props.Id+"_"+j)} >{item}</div>
                                        else if (props.table_headers[i].mode == "input")
                                            return <input id={props.Id+"_"+j+"_"+i} class="middle input" onMouseOver={e=>onMouseEnterRow(props.Id+"_"+j)} defaultValue={item} onChange={e => onInputChange(e.target.id, item1[0], i)} placeholder={""}/>
                                        else if (props.table_headers[i].mode == "inputList")
                                            return <ExpandListInputTable style={styles.border} class="middle" onMouseOver={e=>onMouseEnterRow(props.Id+"_"+j)} Id={props.Id+"_"+j+"_"+i} defValue={item} list={props.table_headers[i].listValue} item_id={item1[0]} i={i} func={onListInputChange}/>
                                        else if (props.table_headers[i].mode == "remove")
                                            return (<div class="middle icon_wrap" id={props.Id+"_"+j+"_"+i} onMouseOver={e=>onMouseEnterRow(props.Id+"_"+j)}>
                                                        <div id={props.Id+"_"+j} class="image_wrap" hidden="true">
                                                            <img className="minus_icon" src={MinusIcon} alt="minus_icon" onClick={e=>removeItem(j, item1[0])}/>
                                                            <img className="confirm_icon" src={ConfirmIcon} alt="confirm_icon" onClick={e=>confirmItem(item1[0])}/>
                                                        </div>
                                                    </div>)


                                    } else if (obj.onChange && obj.onCreate) {
                                        if (props.table_headers[i].mode == "inputList")
                                            return <ExpandListInputTable style={styles.border} class="middle" onMouseOver={e=>onMouseEnterRow(props.Id+"_"+j)} Id={props.Id+"_"+j+"_"+i} defValue={item} list={props.table_headers[i].listValue} item_id={item1[0]} i={i} func={onListInputChange}/>
                                        else if (props.table_headers[i].mode == "remove")
                                            return (<div class="middle icon_wrap" id={props.Id+"_"+j+"_"+i} onMouseOver={e=>onMouseEnterRow(props.Id+"_"+j)}>
                                                        <div id={props.Id+"_"+j} class="image_wrap" hidden="true">
                                                            <img className="minus_icon" src={MinusIcon} alt="minus_icon" onClick={e=>removeItem(j, item1[0])}/>
                                                            <img className="confirm_icon" src={ConfirmIcon} alt="confirm_icon" onClick={e=>confirmItem(item1[0])}/>
                                                        </div>
                                                    </div>)
                                        else if (i!=0)
                                            return <input id={props.Id+"_"+j+"_"+i} class="middle input" onMouseOver={e=>onMouseEnterRow(props.Id+"_"+j)} defaultValue={item} onChange={e => onInputChange(e.target.id, item1[0], i)} placeholder={""}/>
                                        else 
                                            return <div id={props.Id+"_"+j+"_"+i} style={styles.border} class="middle" onMouseEnter={e=>onMouseEnterRow(props.Id+"_"+j)} >{obj.number}</div>
                                    
                                    
                                    } else if (!item1[item1.length-1]) {
                                        if (props.table_headers[i].mode != "remove" && i==0)
                                            return <div id={props.Id+"_"+j+"_"+i} style={styles.border} class="middle" onMouseEnter={e=>onMouseEnterRow(props.Id+"_"+j)} >{obj.number}</div>
                                        else if (props.table_headers[i].mode != "remove")
                                            return <div id={props.Id+"_"+j+"_"+i} style={styles.border} class="middle" onMouseEnter={e=>onMouseEnterRow(props.Id+"_"+j)} >{item}</div>
                                        else if (props.table_headers[i].mode == "remove"){
                                            if (showWarn)
                                                return (<div class="middle icon_wrap" id={props.Id+"_"+j+"_"+i} onMouseOver={e=>onMouseEnterRow(props.Id+"_"+j)}>
                                                            <div id={props.Id+"_"+j} class="image_wrap" hidden="true">
                                                                <img className="warn_icon" src={WarnIcon} alt="warn_icon"/>
                                                            </div>
                                                        </div>)
                                            else
                                                return (<div class="middle icon_wrap" id={props.Id+"_"+j+"_"+i} onMouseOver={e=>onMouseEnterRow(props.Id+"_"+j)}>
                                                            <div id={props.Id+"_"+j} class="image_wrap" hidden="true">
                                                            </div>
                                                        </div>)
                                            
                                        }
                                    } else {
                                        if (props.table_headers[i].mode != "remove" && i==0)
                                            return <div id={props.Id+"_"+j+"_"+i} style={styles.border} class="middle" onMouseEnter={e=>onMouseEnterRow(props.Id+"_"+j)} >{obj.number}</div>
                                        else if (props.table_headers[i].mode != "remove")
                                            return <div id={props.Id+"_"+j+"_"+i} style={styles.border} class="middle" onMouseEnter={e=>onMouseEnterRow(props.Id+"_"+j)} >{item}</div>
                                        else if (props.table_headers[i].mode == "remove")
                                            return (<div class="middle icon_wrap" id={props.Id+"_"+j+"_"+i} onMouseOver={e=>onMouseEnterRow(props.Id+"_"+j)}>
                                                        <div id={props.Id+"_"+j} class="image_wrap" hidden="true">
                                                            <img className="edit_icon" src={EditIcon} alt="edit_icon" onClick={e=>changeItem(item1[0])}/>
                                                        </div>
                                                    </div>)
                                    }
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

                        if (i==0 && props.add=="true")  
                            return (
                                <div style={styles.border} class="middle plus_icon_wrap">
                                    <img className="plus_icon" src={PlusIcon} alt="plus_icon" onClick={e=>addItem()}/>
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