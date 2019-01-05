import React from "react";

import Table from "./table/index";
import View  from "./view/index";
//import Edit from "./edit/index";
import Form from "./form/index";

import { BrowserRouter as Router,
        Route,
        Switch,
        Redirect,
    } from "react-router-dom";


const tableHeaders = ['Id','Name', 'Alias', 'Team'];

class App extends React.Component {

     state = ({
    //     selectedId: -1,
    //     selectedRecord: {}
        // tableValues: [
        //                 ['101','Tony Stark', 'Iron-Man', 'Avengers'],
        //                  ['102','Peter Parker', 'Spider-Man', 'Avengers'],
        //                  ['103','Steve Rogers', 'Captain America', 'Avengers']
                        
        // ]
        tableValues:[]
        
     })

     constructor(props){
         super(props);
         this.createRecord=this.createRecord.bind(this);
     }

     fetchList(){
        let self = this;
        const request = new Request('/heroes',
                                   {method: 'GET', headers:{"Content-Type":"application/json"}});
       
       fetch(request)
       .then(res => res.json())
       .then(function(data){
           self.setState({'tableValues': data});
       });
     }

     componentDidMount(){
         this.fetchList();
        
    }

     createRecord(name,alias,team){
         let self=this;
         console.log(name,alias,team);
         var body= {
             name: name,
             alias: alias,
             team: team
         };

         var request = new Request('/heroes',
                                    {method: 'POST', 
                                     body: JSON.stringify(body), 
                                     headers:{"Content-Type":"application/json"}});
        
        fetch(request)
        //.then(res => res.json())
         .then(function(){
             self.fetchList();

         }
        );

        //  const ID = (Math.random() * 100).toString();
        //  //const ID = Math.random() * 100
        //  const newRecord = [ID, name, alias, team]
        //  const newTableValues = [...this.state.tableValues] 
        //  //this is spread operator
        //  newTableValues.push(newRecord);
        //  this.setState({tableValues: newTableValues})

     }

     render() {
        return (
            <Router>
                <Switch>
                <Route exact path = "/list" render = {(props) => {
                    return <Table 
                                values = {this.state.tableValues} 
                                headers = {tableHeaders}
                                history = {props.history} />
                }}/>
                { <Route exact path = "/view/:id" component={View}/> 
                    
                }}/>
                <Route exact path = "/create" render = {(props) => {
                    
                    return <Form formSubmitCallback={this.createRecord} history={props.history}/>
                    

                    
                }}/>
                {/* <Route exact path = "/edit" render = {(props) => {
                    console.log(props)
                    return <Edit/>
                }}/> */}
                <Redirect to = "/list"/>
                
                </Switch>
            </Router>
            
        );
     }
}

// class App extends React.Component {
//     render() {
//         return (
//             <Edit/>
//         )
//     }
// }

export default App;