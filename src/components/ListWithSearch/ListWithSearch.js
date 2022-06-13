import { React, Component, Fragment } from "react";
import './ListWithSearch.css';
import SearchIcon from '../../images/SearchIcon.svg';

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

setRacks = (value)=>{this.setState({racks: value});}

<ListWithSearch item_list={this.state.racks} selItem={this.state.selRack} func={this.setRack} width={"200px"} height={"390px"}/>
*/
const styles={
    listItem:{
        borderBottom: "1px solid darkgray",
        height:"25px",
    }
}

class ListWithSearch extends Component {

    lastTerm=""

    constructor(props){
        super(props)
        //let searchRes
        this.state = {
            reload:0,
            searchResults:this.props.item_list,
            itemList:this.props.item_list,
        }
        //this.sortList()
    }

    componentDidUpdate(){
        // console.log("+")
        this.sortList(this.lastTerm)
    }

    setReload=()=>{this.setState({reload: this.state.reload+1});}

    setSearchTerm = (value)=>{
        this.sortList(value)
        this.lastTerm = value
        this.setReload()
    }

    sortList = (value)=>{
        this.state.searchResults = JSON.parse(JSON.stringify(this.state.itemList)).filter(item =>
            item.text.toLowerCase().includes(value)
        )
    }

    onItemClick = (item)=>{
        this.props.func(item)
    }

    render(){
        return (
            <div style={{width: "100%"}}>
                <div style={{paddingLeft:"5px", paddingBottom:"5px", borderBottom: "1px solid darkgray",}}>
                    <img src={SearchIcon} style={{width: "20px", height: "20px", display: "inline", verticalAlign: "middle"}}/>
                    <input style={{display: "inline", verticalAlign: "middle"}} 
                        className="listWithSearch_input no-outline" type="text" placeholder="Search" 
                        onChange={event => {this.setSearchTerm(event.target.value)}} 
                    />
                </div>
                <div style={{height: `${this.props.height}px`, width:`${this.props.width}px`, overflowY: "scroll"}}>
                    {this.state.searchResults.map(item=>{
                        if (this.props.selItem!=undefined?item.id == this.props.selItem.id:item.id==0){
                            return (
                                <div style={{...styles.listItem}} key={item.id} onClick={e=>this.onItemClick(item)}>
                                    <div className="listWithSearch_selected" style={{paddingLeft: "5px", width:"100%", height:"100%"}}/>
                                    <div className="noselect" style={{paddingLeft: "5px", marginTop: "-24px", fontSize:"15px"}}>{item.text}</div>
                                </div>
                            )
                        }else{
                            return (
                                <div style={styles.listItem} key={item.id}>
                                    <div className="main_unselected" style={{paddingLeft: "5px", width:"100%", height:"100%"}}
                                        onMouseDown={e=>this.onItemClick(item)}
                                    />
                                    <div className="noselect" style={{paddingLeft: "5px", marginTop: "-24px", fontSize:"15px"}}
                                        onMouseDown={e=>this.onItemClick(item)}
                                    >{item.text}</div>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        );
    }

}

export default ListWithSearch