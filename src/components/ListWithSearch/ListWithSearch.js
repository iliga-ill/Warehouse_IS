import { React, Component, Fragment } from "react";
import './ListWithSearch.css';

/*
//component
const [orders, setOrders] = React.useState([])
const [selOrder, setSelOrder] = React.useState([])



<ListWithSearch item_list={orders} selItem={selOrder} func={setSelOrder} width={list_with_search_width} height={list_with_search_height}/>

//class
racks:[
    {id: 0, text: "Стеллаж 1"},
    {id: 1, text: "Стеллаж 2"},
    {id: 2, text: "Стеллаж 3"},
],
selRack:{id: 0, text: "Стеллаж 2"},

setReload = ()=>{this.setState({reload: this.state.reload+1});}
setRacks = (value)=>{this.setState({racks: value});}

<ListWithSearch item_list={this.state.racks} selItem={this.state.selRack} func={this.setRack} width={"200px"} height={"390px"}/>
*/

class ListWithSearch extends Component {
    constructor(props){
        super(props)
        //let searchRes
        this.state = {
            styles:{
                scroll: {
                    height: this.props.height,
                    width:this.props.width,
                    overflowY: "scroll",
                    border: "1px solid darkgray",
                    borderRadius: "5px"
                }
            },
            searchTerm:"",
            searchResults:this.props.item_list,
            itemList:this.props.item_list,
        }
        //this.sortList()
    }

    

    setSearchTerm = (value)=>{
        this.setState({searchTerm: value});
        this.sortList()
    }
    setSearchResults = (value)=>{this.setState({searchResults: value});}

    sortList = ()=>{
        let buf = this.state.itemList.filter(item =>
            item.text.toLowerCase().includes(this.state.searchTerm)
        )
        this.setSearchResults(buf);
    }

    onItemClick = (item)=>{
        this.props.func(item)
    }

    render(){
        return (
            <>
            <div class="search_wrap">
                <input type="text" placeholder="Search" value={this.searchTerm} onChange={event => {this.setSearchTerm(event.target.value)}} class="search_field" />
            </div>
            <div class="placeholder"/>
            <div class="white" style={this.state.styles.scroll}>
                {this.state.searchResults.map(item=>{
                    if (this.props.selItem!=undefined?item.id == this.props.selItem.id:item.id==0){
                        return <div class='block_wrap_1 darkgray' key={item.id} onClick={e=>this.onItemClick(item)}>{item.text}</div>
                    }else{
                        return <div class='block_wrap_1 white' key={item.id} onClick={e=>this.onItemClick(item)}>{item.text}</div>
                    }
                })}
            </div>
            </>
        );
    }

}

export default ListWithSearch