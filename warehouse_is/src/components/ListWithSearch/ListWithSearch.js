import React from "react";
import './ListWithSearch.css';




export default function ListWithSearch(props){
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    const [itemList, setItemList] = React.useState([]);

    if (JSON.stringify(itemList)!=JSON.stringify(props.item_list)){setItemList(props.item_list)}
    React.useEffect(() => {sortList()}, [itemList]);

    const handleChange = event => {setSearchTerm(event.target.value);};
    React.useEffect(() => {sortList()}, [searchTerm]);

    function sortList(){
        var list = []
        itemList.map(function(item,i){
           list[i] = item.text
        })
        var results = list.filter(item =>
         item.toLowerCase().includes(searchTerm)
        );
        
        setSearchResults(results);
    }

    function onItemClick(item1){
        var list = []
        itemList.map(function(item,i){
            if (item.text == item1) {list[i] = item; list[i].selected = true;}
            else {list[i] = item; list[i].selected = false}
        })
        setItemList(list)
        props.func([])
        props.func(itemList)
    }

    var styles = {
        scroll: {
            height: "",
            width:"",
            overflowY: "scroll",
            border: "1px solid darkgray",
            borderRadius: "5px"
        }
    }

    if (styles.scroll.width != props.width) styles.scroll.width = props.width
    if (styles.scroll.height != props.height) styles.scroll.height = props.height

    return (
        <>
        <div class="search_wrap">
            <input id={props.Id+"_input"} type="text" placeholder="Search" value={searchTerm} onChange={handleChange} class="search_field" />
        </div>
        <div class="placeholder"/>
        <div class="white" style={styles.scroll}>
            {searchResults.map(function(item1,i){
                var selected = false
                // console.log("ItemList")
                // console.log(itemList)
                // console.log(item1)
                itemList.map(function(item2,j){
                    if (item1 == item2.text) selected = item2.selected
                })
                if (selected){
                    return <div class='block_wrap_1 darkgray' key={i} onClick={e=>onItemClick(item1)}>{item1}</div>
                }else{
                    return <div class='block_wrap_1 white' key={i} onClick={e=>onItemClick(item1)}>{item1}</div>
                }
            })}
        </div>
        </>
    );

}