import React, { Component } from "react";
import firebase from "./../firebase";

//*****
// check if first button clicked is an operator
// check if the last button clicked is an operator 
// bind numbers to keyboard 
// the aray in JSX so it's not too redunandt 
// [0,1,2...9]
// ()
// allwo to be first character in equation 
// if its not then it has to after an operator 
// equal number of opening and closing ()
// const dbRef = firebase.database().ref(); 

const dbRef = firebase.database().ref();

class Calculator extends Component {    
    
    constructor(){
        super();
        this.state = {
            equation: "",
            value:"",
            operator:"",
            operatorSelected: false,
        };
    }
     
    handleClickNum = (e) => {
        e.preventDefault();
     
        const clickedNum = e.target.value;
        const newEquation = this.state.equation + clickedNum;
        this.setState({
           equation: newEquation,
           operatorSelected: false
       })
    }
    
    handleClickOperator = (e) => {
        e.preventDefault();
        let clickedOperator = e.target.value;
        let newEquation;
        if (this.state.operatorSelected === false){
            newEquation = this.state.equation + clickedOperator;
        } else if (this.state.operatorSelected === true){
            newEquation = this.state.equation.slice(0, -1) + clickedOperator;
        }
        this.setState({
            equation: newEquation,
            operatorSelected: true,
        })        
    }

    // STRETCH GOAL: make the numbers disappear one at a time 
    handleClickClear = (e) => {
        e.preventDefault();
        this.setState({
            equation: "",
            value: ""
        })
    }

    formSubmit = (e) => {
        e.preventDefault();
        const answer = eval(this.state.equation);
        this.setState({
            value: answer
        })
        dbRef.push({
            equation: this.state.equation,
            value: answer
        })
    }

    render(){            
        return(
            <div>
                <form className="wrapper" onSubmit={this.formSubmit}>
                    <input type="text" placeholder={this.state.equation} className="equation"/>
                    <input type="text" placeholder={this.state.value} className="value"/>
                    <div className="buttonsContainer">
                        <button></button>
                        <button></button>
                        <button></button>
                        <button value="clear" onClick={this.handleClickClear}>ce</button>
                    </div>

                    <div className="buttonsContainer">
                        <button value="7" onClick={this.handleClickNum}>7</button>
                        <button value="8" onClick={this.handleClickNum}>8</button>
                        <button value="9" onClick={this.handleClickNum}>9</button>
                        <button value="/" onClick={this.handleClickOperator}>/</button>
                    </div>

                    <div className="buttonsContainer">
                        <button value="4" onClick={this.handleClickNum}>4</button>
                        <button value="5" onClick={this.handleClickNum}>5</button>
                        <button value="6" onClick={this.handleClickNum}>6</button>
                        <button value="*" onClick={this.handleClickOperator}>x</button>
                    </div>

                    <div className="buttonsContainer">
                        <button value="1" onClick={this.handleClickNum}>1</button>
                        <button value="2" onClick={this.handleClickNum}>2</button>
                        <button value="3" onClick={this.handleClickNum}>3</button>
                        <button value="-" onClick={this.handleClickOperator}>-</button>
                    </div>

                    <div className="buttonsContainer">
                        <button value="0" onClick={this.handleClickNum}>0</button>
                        <button value="." onClick={this.handleClickNum}>.</button>
                        <button type="submit" value="=">=</button>
                        <button value="+" onClick={this.handleClickOperator}>+</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Calculator;