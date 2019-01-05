import React from "react";

import Column from "./column";

class Row extends React.Component {

    constructor(props) {
        super(props)
        this.onViewClick = this.onViewClick.bind(this)
        //this.onEditClick = this.onEditClick.bind(this)
        
    }

    onViewClick() {
        console.log(this.props.values)
        const ID = this.props.values[0]
        this.props.onViewClick(ID)

    }
    // onEditClick() {
    //     console.log(this.props.values)
    //     const ID = this.props.values[0]
    //     this.props.onEditClick(ID)

    // }
    render() {
        const values = this.props.values;
        let renderedCols = values.map((val,index) =>
        <Column key = {index} isHeader = {this.props.isHeader}>{val}</Column> 
        );

        let actionButton;
        //let editButton;
        if(this.props.isHeader) {
            actionButton = (<Column isHeader = {this.props.isHeader}> Action </Column>)
        }
        else {
           actionButton = (<Column isHeader = {this.props.isHeader}>
                            <button onClick = {this.onViewClick}>View </button>
                            </Column>)
            // editButton = (<Column isHeader = {this.props.isHeader}>
            //     <button onClick = {this.onEditClick}>Edit </button>
            //     </Column>)

        }
     
        return (<tr>{renderedCols}{actionButton}</tr>)
    }
}

export default Row;