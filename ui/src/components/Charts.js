import React, { Component } from 'react';
import Chart from "react-apexcharts";
import { MDBJumbotron, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBRow } from 'mdbreact';

const fuelPrices = {
    options : {
        chart : {
            id : 'basic'
        },
        xaxis : {
            categories : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June']
        },
        stroke : {
            show : true,
            curve : 'smooth',
            width : 1
        }
    },
    series : [
        {
            name : '95+',
            data : [27.85, 27.70, 27.57, 25.61, 23.34, 23.34]
        },
        {
            name : '95',
            data : [26.57, 26.51, 26.40, 24.28, 21.83, 21.86]
        },
        {
            name : '92',
            data : [25.55, 25.49, 25.39, 23.27, 20.80, 20.83]
        },
        {
            name : 'Diesel',
            data : [26.20, 25.95, 25.77, 23.71, 21.26, 21.28]
        },
        {
            name : 'Gas',
            data : [12.60, 11.69, 10.94, 9.54, 8.89, 10.49]
        }
      ]
};

const salesBars = {
    options : {
        chart : {
            id : 'basic'
        },
        xaxis : {
            categories : ['KIA Sportage', 'RENAULT Duster', 'RENAULT Logan', 'TOYOTA RAV-4', 'RENAULT Sandero', 'SKODA Octavia', 'TOYOTA Land Cruiser Prado', 'HYUNDAI Tucson', 'NISSAN Qashqai', 'TOYOTA Camry']
        },
        colors:['#3B6BC3', '#E91E63', '#9C27B0']

    },
    series : [
        {
            name : 'sells',
            data : [ 6027, 5202, 4489, 4227, 3246, 2852, 2671, 2558, 2112, 1835 ],
        }        
    ]
}
export default class Charts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // ...fuelPrices
            ...salesBars
        }
    }
    
    render() {
        return (
            <MDBJumbotron>
                <MDBRow>
                    <MDBDropdown>
                        <MDBDropdownToggle caret color="default" >
                            Year
                        </MDBDropdownToggle>
                    </MDBDropdown>
                    <MDBDropdown>
                        <MDBDropdownToggle caret color="default" >
                            Vendor
                        </MDBDropdownToggle>
                    </MDBDropdown>
                </MDBRow>
                <p></p>
                <h2>Car sales</h2>
                <Chart
                    options={this.state.options}
                    series={this.state.series}
                    type="bar"
                    width="100%"
                />
            </MDBJumbotron>
        );
    }
}
