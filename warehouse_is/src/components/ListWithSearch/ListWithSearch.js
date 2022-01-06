import React from "react";
import './ListWithSearch.css';


var styles = {
    scroll: {
        height: "",
        width:"",
        overflowY: "scroll",
        border: "1px solid darkgray",
        borderRadius: "5px"
    }
}

export default function ListWithSearch(props){
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);

    let [reload, setReload] = React.useState(0)

    function reloadPage(){
        setReload(reload+1)
    }

    const handleChange = event => {
       setSearchTerm(event.target.value);
     };
    React.useEffect(() => {
       var list = []
       props.item_list.map(function(item,i){
          list[i] = item.text
       })
       var results = list.filter(item =>
        item.toLowerCase().includes(searchTerm)
       );
       
       setSearchResults(results);
     }, [searchTerm]);

     var item_list = props.item_list
     function onItemClick(text){
        item_list.map(item=>{
            if (item.text == text) item.selected = true
            else item.selected = false
        })
        props.func(item_list)
        reloadPage()
     }

     if (styles.scroll.width != props.width) styles.scroll.width = props.width
     if (styles.scroll.height != props.height) styles.scroll.height = props.height
   
     return (
         <>
            <div class="search_wrap">
                <input type="text" placeholder="Search" value={searchTerm} onChange={handleChange} class="search_field" />
            </div>
            <div class="placeholder"/>
            <div class="white" style={styles.scroll}>
                {searchResults.map(item1=>{
                    var selected = false
                    props.item_list.map(function(item2,i){
                        if (item1 == item2.text) selected = item2.selected
                    })
                    if (selected){
                        return <div class='block_wrap_1 darkgray' onClick={e=>onItemClick(item1)}>{item1}</div>
                    }else{
                        return <div class='block_wrap_1 white' onClick={e=>onItemClick(item1)}>{item1}</div>
                    }
                })}
            </div>
          </>
     );

}