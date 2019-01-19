import React, {Component} from 'react';
import {Grid, Row, Col, Table, ButtonToolbar, Button, Alert} from 'react-bootstrap';
import {Link} from 'react-router-dom';


class Tabela extends Component{

    state = { produtos: [], errors: '', status: -1, alertShow: false };

    componentDidMount(){
        this.callApi()
        .then((res) => {
            this.setState({ produtos: res });
        })
        .catch( (err) => {
            console.log( err );
        });
    }

    callApi = async () => {
        const reponse = await fetch('/api/home');
        const body = reponse.json();
        if(reponse.status !== 200) 
            throw Error(body.message);
        return body;
    }

    deleteItens = async (event) => {
        const id = event.target.id;
        const response = await fetch(`api/del/${id}`);
        const body = response.json();
        if(response.status === 200){
            for(let produto in this.state.produtos){
                if(this.state.produtos[produto].id_produto == id){
                    this.state.produtos.splice(produto, 1);
                    this.setState({ errors: 'Excluído com sucesso!', status: 1, alertShow: true });
                }
            }
        }else{
            this.setState({ errors: 'Erro ao excluir!', status: 0, alertShow: true });
            console.log( body.message );
        }
    }

    dismissAlert = () => {
        this.setState({ errors: '', status: -1, alertShow: false });
    }

    render(){
        let alert;
        if(this.state.alertShow){
            let style = this.state.status === 1 ? 'success' : 'danger';
            alert = <Alert bsStyle={style} onDismiss={this.dismissAlert} > <b> {this.state.errors} </b> </Alert>;
        }
        return(
            <Grid>
                <Row>
                    <Col md={12}>
                        {alert}
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th> # </th>
                                    <th> Produto </th>
                                    <th> Preço </th>
                                    <th> Excluir </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.produtos.map((produto)=>{
                                    return(
                                        <tr key={produto.id_produto} >
                                            <td> {produto.id_produto} </td>
                                            <td> {produto.produto} </td>
                                            <td> {produto.preco} </td>
                                            <td> <Button id={produto.id_produto} onClick={ this.deleteItens } bsStyle="danger"> Excluir </Button> </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                        <ButtonToolbar>
                            <Link to="/add"> <Button bsStyle="success" > Adicionar  </Button> </Link>
                        </ButtonToolbar>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default Tabela;