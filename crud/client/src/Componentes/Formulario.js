import React, {Component} from 'react';

import {Grid, Row, Col, Form, FormGroup, FormControl, Button, Alert} from 'react-bootstrap';

class Formulario extends Component{

    state = { produto: '', preco: '', errors: '', status: -1, showAlert: false};


    changeInput = (event) => {
        const field = event.target.name;
        this.setState({ [field]: event.target.value });
    }

    submitedData = async (event) => {
        event.preventDefault();
        let data = {produto: this.state.produto, preco: this.state.preco};
        const result = await fetch('/api/add', {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(data)
        });
        const body = await result.json();
        if(result.status == 200){
            this.setState({ produto: '', preco: '', errors: 'Sucesso ao inserir!', status: 1, showAlert: true});
        }else{
            this.setState({ produto: '', preco: '', errors: 'Erro ao inserir!', status: 0, showAlert: true});
            console.log(body.message);
        }
    }

    dismissAlert = () => {
        this.setState({ errors: '', status: -1, showAlert: false });
    }

    render(){
        let alert;
        if(this.state.showAlert){
            let style = this.state.status === 1 ? 'success' : 'danger';
            alert = <Alert bsStyle={style} onDismiss={this.dismissAlert} > <b> {this.state.errors} </b> </Alert>;
        }
        return(
            <Grid>
                <Row>
                    <Col sm={12}>
                        {alert}
                        <Form horizontal onSubmit={this.submitedData} >
                            <FormGroup>
                                <Col sm={1}> <b> Produto: </b> </Col>
                                <Col sm={8}> 
                                    <FormControl type="text" placeholder="Produto" value={this.state.produto} onChange={this.changeInput} name="produto" required/>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col sm={1}> <b> Preço: </b> </Col>
                                <Col sm={8}> 
                                    <FormControl type="number" placeholder="Preço" value={this.state.preco} onChange={this.changeInput} name="preco" required />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col smOffset={1} sm={8}>
                                    <Button type="submit" bsStyle="success"> Salvar </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default Formulario;