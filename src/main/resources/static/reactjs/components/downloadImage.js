import React from 'react';

export default class TestDownload extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            img: ''
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/app/items/1/images/test.png')
        .then(response => response.blob())
        .then(image => {
            this.setState({
                img: URL.createObjectURL(image)
            });
        })
        .catch(error => console.error("Error: ", error));
    }

    render() {
        return (
            <img src={this.state.img} width='100' height= '100'/>
        );
    }
}