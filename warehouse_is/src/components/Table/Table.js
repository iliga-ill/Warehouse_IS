import React from "react";
import './Table.css';
import ExpandListInputTable from "../ExpandListInput/ExpandListInputTable/ExpandListInputTable";
import PlusIcon from '../../images/PlusIcon.svg'
import MinusIcon from '../../images/MinusIcon.svg'
import EditIcon from '../../images/EditIcon.svg'
import ConfirmIcon from '../../images/ConfirmIcon.svg'
import WarnIcon from '../../images/WarnIcon.svg'
import TableInputDate from "../InputDate/TableInputDate/TableInputDate";

var innerList = [[]]
var tableData = [[]]
var tableHeaders = [[]]

export default function Table(props){

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

 
    var showWarn = false
  

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
        {title:"Кол-во коробок", mode:"input", column_width: "70px", listValue: []},
        {title:"Дата", mode:"inputDate", column_width: "150px", listValue: []},
        {title:"", mode:"remove", column_width: "50px", listValue: []},
    ]

    var  table_field_height = "100px"

    var table_list = [
        [0, "Стиральная машина А30", "Стиральные машины", "10", "2022-01-14", false],
        [1, "Утюг В3000", "Утюги", "10", "2022-01-14", false],
        [2, "Вытяжка S240", "Вытяжки", "10", "2022-01-14", true],
        [3, "Утюг Ж510", "Утюги", "10", "2022-01-14", true],
        [4, "Вытяжка S240", "Вытяжки", "10", "2022-01-14", true],
        [5, "Пылесос Z2900", "Пылесосы", "10", "2022-01-14", true],
        [7, "Стиральная машина А30", "Стиральные машины", "10", "2022-01-14", true],
    ]
    function set_table_list_1(value) {
        table_list =value
    }
    */

    //pattern
    /*
        <Table Id={getId()} table_headers={table_headers} table_field_height={table_field_height} table_list={table_list} func={set_table_list_1} numb={0} search="true" add="true" delete="true"/>
    */

    if (document.getElementById(props.Id+"_input")==null){

        if (props.numb==0) {
            innerList = [[]]
            tableData = [[]]
            tableHeaders = [[]]
        }

        tableData[props.numb]=props.table_list
        var bufList = []
        props.table_list.map(function(item,i){
            bufList[i]={id: item[0], number: i, onChange: false, onCreate: false}
        })
        innerList[props.numb] = bufList

        tableData[props.numb].map(item=>{
            if (item[item.length-1]){
                showWarn=true
            }
        })

        tableHeaders[props.numb] = props.table_headers

        if (!showWarn){
            tableHeaders[props.numb][tableHeaders[props.numb].length-1].column_width="0px"
        }
        
    }

    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);

    const [reload, setReload] = React.useState(0)

    function reloadPage(){
        setReload(reload+1)
    }

    function recountInnerList(){
        var counter=1
        innerList[props.numb].map(item=>{
            tableData[props.numb].map(function(item2,i){
                if (item.id == item2[0]){
                    item.number=counter
                    counter++
                }
            })
        })
    }

    function checkShowWarn(){
        tableData[props.numb].map(item=>{
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
        tableData[props.numb].map(function(item,k){
            var search=false
            item.map(function(item1,i){
                if (i==0){
                    if(item1!==undefined && innerList[props.numb][k].number.toString().toLowerCase().includes(searchTerm.toLowerCase())) {
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
        document.getElementById(props.Id+"_input").value="fff"
        sort()
        document.getElementById(props.Id+"_input").value=""
        sort()
    }

    //console.log()
    grid_template_columns=""
    tableHeaders[props.numb].map(function(item, i){
        grid_template_columns += " " + tableHeaders[props.numb][i].column_width
    })
    
    //if (tableData[props.numb][0][3] != props.table_list[0][3]) {
    if (JSON.stringify(tableData[props.numb]) != JSON.stringify(props.table_list)) {
        if (props.table_list.length != 0) {
            tableData[props.numb] = props.table_list
            reloadTable()
            //reloadPage()
            //var bufList = []
            // props.table_list.map(function(item,i){
            //     bufList[i]={id: item[0], number: i, onChange: false, onCreate: false}
            // })
            // innerList[props.numb] = bufList
            // recountInnerList()
            // setSearchTerm(tableData[props.numb])
            reloadTable()
            // reloadPage()
            // setSearchTerm([])
            
            //window.location.reload(true);
            // React.useEffect(() => {
            //     sort()
            //   }, [searchTerm]);
        }
    } else {
        if (props.table_list.length >= 2) {
            //reloadPage()
           
        }
       
    }

    if (styles.table.gridTemplateColumns != grid_template_columns) styles.table.gridTemplateColumns = grid_template_columns
    if (styles.scroll.height != props.table_field_height) styles.scroll.height = props.table_field_height

    function onInputChange(Id, id, i){
        if (document.getElementById(Id) != null){
            tableData[props.numb].map(item1=>{
                if(item1[0] == id)
                    item1[i]=document.getElementById(Id).value
            })
            props.func(tableData[props.numb])
        }
        reloadPage()
    }

    function onListInputChange(value, id, i){
        if (value != null && i!=undefined && id!= undefined){
            value.map(item=>{
                if (item.selected) {
                    tableData[props.numb].map(item1=>{
                        if(item1[0] == id)
                            item1[i]=item.value
                    })
                    
                }
            })
            props.func(tableData[props.numb])
        }
    }

    function onInputDateChange(value, id, i){
        if (value != null && i!=undefined && id!= undefined){
            tableData[props.numb].map(item1=>{
                if(item1[0] == id)
                    item1[i]=value
            })
            props.func(tableData[props.numb])
        }
    }

    var lastItem = props.Id+"_"+0

    function onMouseEnterRow(id){
        if (showWarn){
            if (document.getElementById(lastItem) != null)
                document.getElementById(lastItem).hidden = true
            document.getElementById(id).hidden = false
            document.getElementById(id).hidden = false
            lastItem = id
        }
    }

    function removeItem(j, id){
        var newList = []
        var counter = 0
        tableData[props.numb].map(function(item,i){
            if (item[0] != id) {
                newList[counter] = item
                counter++
            }
        })
        tableData[props.numb] = newList

        // tableHeaders[props.numb].map(function(item1,i){
        //     document.getElementById(props.Id+"_"+j+"_"+i).remove()
        // })
        reloadTable()

        props.func(tableData[props.numb])
        reloadPage()
    }

    function changeItem(id){
        innerList[props.numb].map(item=>{
            if (item.id==id) item.onChange=true
        })
        reloadTable()
    }

    function confirmItem(id){
        innerList[props.numb].map(item=>{
            if (item.id==id) item.onChange=false
        })
        reloadTable()
    }

    function addItem(){
        var tableString=[]
        tableData[props.numb][0].map(function(item,i){
            if (i==0){
                tableString[i]=tableData[props.numb][tableData[props.numb].length-1][0]+1
            }
            else if (i==tableData[props.numb][0].length-1)
                tableString[i]=true
            else
                tableString[i]=""
        })
        tableData[props.numb][tableData[props.numb].length] = tableString
        innerList[props.numb][innerList[props.numb].length] = {id: innerList[props.numb][innerList[props.numb].length-1].id+1, number: innerList[props.numb][innerList[props.numb].length-1].number+1, onChange: true, onCreate: true}
        reloadTable()
    }

    return (
        <>
            {tableHeaders[props.numb].map(function(item,i){
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
                    {tableHeaders[props.numb].map(function(item,i){

                        var styles = {
                            border:{
                                borderTop: "1px solid darkgray",
                                borderLeft: "0px solid darkgray",
                                borderRight: "1px solid darkgray",
                                borderBottom: "1px solid darkgray",
                            }
                        }
                        if (i==0) styles.border.borderLeft="1px solid darkgray"
                        if (i==tableHeaders[props.numb].length-2) styles.border.borderRight="1px solid darkgray"
                        if (i==tableHeaders[props.numb].length-1) {
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
                                    innerList[props.numb].map(item3=>{
                                        if (item3.id==item1[0]) obj=item3
                                    })

                                    
                                    if (tableHeaders[props.numb][i] != undefined && obj.onChange && item1[item1.length-1] && !obj.onCreate){
                                        if (tableHeaders[props.numb][i].mode == "text" && i==0)
                                            return <div id={props.Id+"_"+j+"_"+i} style={styles.border} class="middle" onMouseEnter={e=>onMouseEnterRow(props.Id+"_"+j)} >{obj.number}</div>
                                        else if (tableHeaders[props.numb][i].mode == "text")
                                            return <div id={props.Id+"_"+j+"_"+i} style={styles.border} class="middle" onMouseEnter={e=>onMouseEnterRow(props.Id+"_"+j)} >{item}</div>
                                        else if (tableHeaders[props.numb][i].mode == "input")
                                            return <input id={props.Id+"_"+j+"_"+i} class="middle input" onMouseOver={e=>onMouseEnterRow(props.Id+"_"+j)} defaultValue={item} onChange={e => onInputChange(e.target.id, item1[0], i)} placeholder={""}/>
                                        else if (tableHeaders[props.numb][i].mode == "inputList")
                                            return <ExpandListInputTable style={styles.border} class="middle" onMouseOver={e=>onMouseEnterRow(props.Id+"_"+j)} Id={props.Id+"_"+j+"_"+i} defValue={item} list={props.table_headers[i].listValue} item_id={item1[0]} i={i} func={onListInputChange}/>
                                        else if (tableHeaders[props.numb][i].mode == "inputDate")
                                            return <TableInputDate Id={props.Id+"_"+j+"_"+i} defValue={item} item_id={item1[0]} i={i} func={onInputDateChange}/>
                                        else if (tableHeaders[props.numb][i].mode == "remove")
                                            return (<div class="middle icon_wrap" id={props.Id+"_"+j+"_"+i} onMouseOver={e=>onMouseEnterRow(props.Id+"_"+j)}>
                                                        <div id={props.Id+"_"+j} class="image_wrap" hidden="true">
                                                            {tableHeaders[props.numb].map(function(item,i){
                                                                if (i==0 && props.delete=="true"){
                                                                    return <img className="minus_icon" src={MinusIcon} alt="minus_icon" onClick={e=>removeItem(j, item1[0])}/>
                                                                }
                                                            })}
                                                            <img className="confirm_icon" src={ConfirmIcon} alt="confirm_icon" onClick={e=>confirmItem(item1[0])}/>
                                                        </div>
                                                    </div>)


                                    } else if (tableHeaders[props.numb][i] != undefined && obj.onChange && obj.onCreate) {
                                        if (tableHeaders[props.numb][i].mode == "inputList")
                                            return <ExpandListInputTable style={styles.border} class="middle" onMouseOver={e=>onMouseEnterRow(props.Id+"_"+j)} Id={props.Id+"_"+j+"_"+i} defValue={item} list={props.table_headers[i].listValue} item_id={item1[0]} i={i} func={onListInputChange}/>
                                        else if (tableHeaders[props.numb][i].mode == "inputDate")
                                            return <TableInputDate Id={props.Id+"_"+j+"_"+i} defValue={item} item_id={item1[0]} i={i} func={onInputDateChange}/>
                                        else if (tableHeaders[props.numb][i].mode == "remove")
                                            return (<div class="middle icon_wrap" id={props.Id+"_"+j+"_"+i} onMouseOver={e=>onMouseEnterRow(props.Id+"_"+j)}>
                                                        <div id={props.Id+"_"+j} class="image_wrap" hidden="true">
                                                            {tableHeaders[props.numb].map(function(item,i){
                                                                if (i==0 && props.delete=="true"){
                                                                    return <img className="minus_icon" src={MinusIcon} alt="minus_icon" onClick={e=>removeItem(j, item1[0])}/>
                                                                }
                                                            })}
                                                            <img className="confirm_icon" src={ConfirmIcon} alt="confirm_icon" onClick={e=>confirmItem(item1[0])}/>
                                                        </div>
                                                    </div>)
                                        else if (i!=0)
                                            return <input id={props.Id+"_"+j+"_"+i} class="middle input" onMouseOver={e=>onMouseEnterRow(props.Id+"_"+j)} defaultValue={item} onChange={e => onInputChange(e.target.id, item1[0], i)} placeholder={""}/>
                                        else 
                                            return <div id={props.Id+"_"+j+"_"+i} style={styles.border} class="middle" onMouseEnter={e=>onMouseEnterRow(props.Id+"_"+j)} >{obj.number}</div>
                                    
                                    
                                    } else if (tableHeaders[props.numb][i] != undefined && !item1[item1.length-1]) {
                                        
                                        if (tableHeaders[props.numb][i].mode != "remove" && i==0)
                                            return <div id={props.Id+"_"+j+"_"+i} style={styles.border} class="middle" onMouseEnter={e=>onMouseEnterRow(props.Id+"_"+j)} >{obj.number}</div>
                                        else if (tableHeaders[props.numb][i].mode == "inputDate")
                                            return <div id={props.Id+"_"+j+"_"+i} style={styles.border} class="middle" onMouseEnter={e=>onMouseEnterRow(props.Id+"_"+j)} >{item.toString().replace(/-/, '.').replace(/-/, '.')}</div>
                                        else if (tableHeaders[props.numb][i].mode != "remove")
                                            return <div id={props.Id+"_"+j+"_"+i} style={styles.border} class="middle" onMouseEnter={e=>onMouseEnterRow(props.Id+"_"+j)} >{item}</div>
                                        else if (tableHeaders[props.numb][i].mode == "remove"){
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
                                    } else if (tableHeaders[props.numb][i] != undefined) {
                                        if (tableHeaders[props.numb][i].mode != "remove" && i==0)
                                            return <div id={props.Id+"_"+j+"_"+i} style={styles.border} class="middle" onMouseEnter={e=>onMouseEnterRow(props.Id+"_"+j)} >{obj.number}</div>
                                        else if (tableHeaders[props.numb][i].mode == "inputDate")
                                            return <div id={props.Id+"_"+j+"_"+i} style={styles.border} class="middle" onMouseEnter={e=>onMouseEnterRow(props.Id+"_"+j)} >{item.toString().replace(/-/, '.').replace(/-/, '.')}</div>
                                        else if (tableHeaders[props.numb][i].mode != "remove")
                                            return <div id={props.Id+"_"+j+"_"+i} style={styles.border} class="middle" onMouseEnter={e=>onMouseEnterRow(props.Id+"_"+j)} >{item}</div>
                                        else if (tableHeaders[props.numb][i].mode == "remove" && showWarn)
                                            return (<div class="middle icon_wrap" id={props.Id+"_"+j+"_"+i} onMouseOver={e=>onMouseEnterRow(props.Id+"_"+j)}>
                                                        <div id={props.Id+"_"+j} class="image_wrap" hidden="true">
                                                            <img className="edit_icon" src={EditIcon} alt="edit_icon" onClick={e=>changeItem(item1[0])}/>
                                                        </div>
                                                    </div>)
                                        else if (tableHeaders[props.numb][i].mode == "remove" && !showWarn)
                                            return (<div class="middle icon_wrap" id={props.Id+"_"+j+"_"+i} onMouseOver={e=>onMouseEnterRow(props.Id+"_"+j)}>
                                                        <div id={props.Id+"_"+j} class="image_wrap" hidden="true">
                                                        </div>
                                                    </div>)
                                    }
                                })
                            }</>)
                        })}
                    </div>
                </div>
                <div class="low_table_text middle" style={styles.table}>
                    {tableHeaders[props.numb].map(function(item,i){

                    var styles = {
                        border:{
                            borderTop: "1px solid darkgray",
                            borderLeft: "0px solid darkgray",
                            borderRight: "1px solid darkgray",
                            borderBottom: "1px solid darkgray",
                        },
                        null:{
                            width:"0px",
                        }
                    }
                    if (i==0) styles.border.borderLeft="1px solid darkgray"
                    if (i==tableHeaders[props.numb].length-2) styles.border.borderRight="1px solid darkgray"
                    if (i==tableHeaders[props.numb].length-1) {
                        styles.border.borderRight="0px solid darkgray"
                        styles.border.borderTop="0px solid darkgray"
                        styles.border.borderBottom="0px solid darkgray"
                    }
                    if (props.add=="false"){
                        styles.border.borderRight="0px solid darkgray"
                        styles.border.borderLeft="0px solid darkgray"
                        styles.border.borderTop="1px solid darkgray"
                        styles.border.borderBottom="0px solid darkgray"
                    }

                        if (i==0 && props.add=="true")  
                            return (
                                <div style={styles.border} class="middle plus_icon_wrap plus_height">
                                    <img className="plus_icon" src={PlusIcon} alt="plus_icon" onClick={e=>addItem()}/>
                                </div>
                                )
                        else if (i != tableHeaders[props.numb].length-1 || showWarn)
                            return <div style={styles.border} class="middle"></div>
                        else 
                            return <div style={styles.null} class="middle"></div>
                    })} 
                </div>
            </div>
        </>
    )
}