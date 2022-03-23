import React from "react";
import './ErrorBoundary.css';

export default class ErrorBoundary extends React.Component{

    state={
        hasError:false
    }

    componentDidCatch(error, info){
        this.setState({hasError:true})
    }

    render(){
        if (this.state.hasError){
            return <h1 style={{color:"red"}}>Что-то пошло не так</h1>
        }
        return this.props.children
    }
}