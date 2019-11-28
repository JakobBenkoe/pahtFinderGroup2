import React, { Component } from 'react';
import TextField from "@material-ui/core/TextField";
import ImageUploader from "./imageUploader";
import Selector from "./selector_BuildingType";
import Map from "../Maps/mapAddBuilding";
import gql from 'graphql-tag'
import Button from '@material-ui/core/Button';
import { Mutation } from 'react-apollo'
import { withApollo } from "react-apollo";
import "../../styles/addConstruction.scss";
import "../../styles/addBuilding.scss";
import { CURRENT_USER_ID } from '../../constants';


const CREATE_HOUSE = gql`
  mutation createHouse($name: String!, $ownerId: ID!, $addressStreet: String!, $addressCountry: String!, $addressCity:String!, $constructionYear:Int!,
    $heatingSystem:String!, $costOfHeating: Float!, $warmWaterPipe: Boolean!) {
    createHouse(name: $name, ownerId: $ownerId, addressStreet: $addressStreet, addressCountry: $addressCountry, addressCity: $addressCity,
        constructionYear: $constructionYear, heatingSystem: $heatingSystem, costOfHeating: $costOfHeating, warmWaterPipe: $warmWaterPipe) {
        id
    }
  }
`

/**
 * Exports form that allows user to fill in general 
 * information about houses (name, location, etc)
 */
class GeneralInformation extends Component {
    state = { 
        name: '',
        ownerId: localStorage.getItem(CURRENT_USER_ID),
        addressStreet : '',
        addressCountry: '',
        addressCity: '',
        constructionYear: 0,
        heatingSystem: '',
        costOfHeating: 0,
        warmWaterPipe: false,
        errorMessage: ''
     }

    componentDidUpdate(prevProps) {
      if (this.props.saveHouseClicked === true) {
        console.log("save House Clicked!")
        this.props.client.mutate({
          mutation: CREATE_HOUSE,
          variables: {
              name: this.state.name,
              ownerId: localStorage.getItem(CURRENT_USER_ID),
              addressStreet: this.state.addressStreet,
              addressCountry: this.state.addressCountry,
              addressCity: this.state.addressCity,
              constructionYear: this.state.constructionYear,
              heatingSystem: this.state.heatingSystem,
              costOfHeating: this.state.costOfHeating,
              warmWaterPipe: this.state.warmWaterPipe
          },
        }).then(results => {
            console.log(results);
        })
        .catch(error => {
            console.log("Error: ", error);
        });
      }
    }

    render() { 
        const {
        name,
        ownerId,
        addressStreet,
        addressCountry,
        addressCity,
        constructionYear,
        heatingSystem,
        costOfHeating,
        warmWaterPipe,
        errorMessage
        } = this.state;

        return (  
            <div className="generalInfo">
              <h2 className="addBuildText"> General Information</h2>

              <div className="generalContent">
                <div className="left">
                  <div className="imageUploader">
                    <ImageUploader className="imageUploader"></ImageUploader>
                  </div>
                  <TextField
                    autoFocus
                    id="outlined-basic"
                    className="addBuildField"
                    label="Name Of Building"
                    margin="normal"
                    variant="outlined"
                    onChange={e => this.setState({ name: e.target.value })}
                  />
                  <br></br>
                  <TextField
                    id="outlined-basic"
                    type="number"
                    className="addBuildField"
                    label="Construction Year"
                    margin="normal"
                    variant="outlined"
                    onChange={e => this.setState({ constructionYear: e.target.value })}
                  />
                  <br></br>
                </div>
                <div className="center">
                  <TextField
                    id="outlined-basic"
                    className="addBuildField"
                    label="Street"
                    margin="normal"
                    variant="outlined"
                    onChange={e => this.setState({ addressStreet: e.target.value })}
                  />
                  <br></br>
                  <TextField
                    id="outlined-basic"
                    className="addBuildField"
                    label="City"
                    margin="normal"
                    variant="outlined"
                    onChange={e => this.setState({ addressCity: e.target.value })}
                  />
                  <br></br>
                  <TextField
                    id="outlined-basic"
                    className="addBuildField"
                    label="Country"
                    margin="normal"
                    variant="outlined"
                    onChange={e => this.setState({ addressCountry: e.target.value })}
                  />
                  <br></br>
                  <TextField
                    id="outlined-basic"
                    className="addBuildField"
                    label="Heating system"
                    margin="normal"
                    variant="outlined"
                    onChange={e => this.setState({ heatingSystem: e.target.value })}
                  />
                  <br></br>
                  <TextField
                    id="outlined-basic"
                    type="number"
                    className="addBuildField"
                    label="Yearly cost of heating"
                    margin="normal"
                    variant="outlined"
                    onChange={e => this.setState({ costOfHeating: e.target.value })}
                  />
                  <br></br>
                  <TextField
                    id="outlined-basic"
                    className="addBuildField"
                    label="Warm water pipe"
                    margin="normal"
                    variant="outlined"
                    onChange={e => this.setState({ warmWaterPipe: e.target.value })}
                  />
                  <br></br>
                </div>
                {errorMessage}
                <Mutation
                            mutation={CREATE_HOUSE}
                            variables={{ name, ownerId, constructionYear, addressStreet, addressCity, addressCountry,
                                costOfHeating, heatingSystem, warmWaterPipe}}
                            onCompleted={data => this.setState({ errorMessage: data.graphQLErrors })}
                            onError={data => this.setState({ errorMessage: data.graphQLErrors })}
                        >
                            {mutation => (
                                <Button onClick={mutation}>
                                    Execute Mutation
                                </Button>
                            )}
                </Mutation>

                <div className="right">
                  <Selector></Selector>
                  <Map></Map>
                </div>
              </div>
            </div>
        );
    }
}
 
export default withApollo(GeneralInformation);