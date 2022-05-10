import { React, Component, Fragment } from "react";
import './SideBlock.css';

class SideBlock extends Component {

    constructor(props){
        super(props)
        this.state={
            onRightOpened: props.onRightOpened,
            onRightClosed: props.onRightClosed,
            style:{
                position: "fixed",
                right: props.isOpened?props.onRightOpened:props.onRightClosed,
                top: props.styles.top,
                fontSize: "20px",
                width: props.styles.width,
                height: props.styles.height,
                transition: "all .22s ease-in",
                backgroundColor: "white",
                border: "1px solid darkgray",
                zIndex: 100,
                display: "block",
                verticalAlign: "top",
            },
            top: props.styles.top,
            width: props.styles.width,
            height: props.styles.height,
            isOutsideStatus:false,
            isOpened: true,
            isMouseDown:false,
            first:0,
        }
    }

    onMouseMove=(e)=>{
        if(this.state.isMouseDown) {
            var btnPanel = document.getElementById("SideBlock")
            let onRight = this.state.onRightOpened.slice(0, this.state.onRightOpened.length-2)
            btnPanel.style.right = `${Number(onRight) - e.movementX}px`
            this.state.onRightOpened = `${Number(onRight) - e.movementX}px`
            let onWidth = this.state.width.slice(0, this.state.width.length-2)
            btnPanel.style.width = `${Number(onWidth) - e.movementX}px`
            this.state.width = `${Number(onWidth) - e.movementX}px`
            //console.log(`btnPanel.style.right: ${btnPanel.style.right} btnPanel.style.width: ${btnPanel.style.width}`)
        }
        //console.log(e.movementX)
    }

    // componentWillUnmount() {
    //     document.removeEventListener('mouseup', this.onMouseMove)
    // }

    componentDidMount() {
        this.setState({isOpened: !this.state.isOpened});
    }

    componentDidUpdate(props){
        if (this.state.isOutsideStatus != props.isOpened){
            this.state.isOpened = !this.state.isOpened
            this.state.isOutsideStatus = props.isOpened
        } 

        var btnPanel = document.getElementById("SideBlock")
        btnPanel.style.right=this.state.isOpened?this.state.onRightOpened:this.state.onRightClosed
    }

    setStyles = (value)=>{this.setState({styles: value});}

    openDropdown=()=>{this.setStyles(this.style.right = this.props.onRightOpened)}
    closeDropdown=()=>{this.setStyles(this.style.right = this.props.onRightClosed)}

    onMouseDown=(e)=>{
        e.preventDefault()
        this.state.isMouseDown = true
        document.addEventListener('mousemove', this.onMouseMove)
    }

    onMouseUp=(e)=>{
        e.preventDefault()
        this.state.isMouseDown = false
    }

    onClick=(e)=>{
        e.preventDefault()
        this.setState({isOpened: !this.state.isOpened});
    }
    
    render(){
        return (
            <>
                <div id="SideBlock" style={this.state.style}>
                    <div className="SideBlockHov" style={{display: "inline-block", marginLeft:"-1px", width:"5px", height:"100%", listStyle: "none"}} onClick={()=>{this.setState({isOpened: !this.state.isOpened})}} /*onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}*/></div>
                    <div style={{display: "inline-block", verticalAlign: "top", width:"calc(100% - 5px)"}}>
                        {this.props.children}
                    </div>
                    {/* {this.props.children} */}
                </div>
            </>
        )
    }
}
export default SideBlock