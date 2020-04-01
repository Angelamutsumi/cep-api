import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';

class AddressForm extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      cep: '',
      bairro: '',
      logradouro: '',
      localidade: '',
      uf: '',
      numero: '',
      loading:false,
      error: ''
    }
  }

  verificaCep = async(cep) => {
    console.log("verifica", cep)
    this.setState({error:false})
    return await fetch(`http://viacep.com.br/ws/${cep}/json/`)
    .then(results => results.json())
    .then(cepResult => {
      this.setState({loading:false})
      return cepResult
    })
    .catch(error => this.setState({error: true, loading: false}))
  }

  handleChange = async(event) => {
    const {name, value} = event.target;
    this.setState({[name]: value, error: false})
    if(name === 'cep' && value.lenght === 8){
      this.setState({loading: true})
      const cepObject = await this.verificaCep(value)
      if (cepObject.erro){
        this.setState({error: true})
        return
      }
      console.log("cepObject", cepObject)
      const{cep, bairro, logradouro, localidade, uf} = cepObject
      this.setState({cep, bairro, logradouro, localidade, uf})
    }
  }

  handleBlur = async value => {
    if(value.lenght === 8) {
      this.setState({loading: true})
      const cepObject = await this.verificaCep(value)
      if(cepObject.erro){
        this.setState({error: true})
        return
      }
      const {cep, bairro, logradouro, localidade, uf} = cepObject
      this.setState({cep, bairro, logradouro, localidade, uf})
    }
  }

  render() {
    const { cep, bairro, logradouro, localidade, uf, numero, loading, error } = this.state
    return (
      <Container>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Form>
                <FormGroup>
                <Label for="cep">CEP</Label>
                <Input type="text" name="cep" id="cep" placeholder="00000-000" value={cep} onChange={(e) => this.handleChange(e)}/>
              </FormGroup>

              <FormGroup>
                <Label for="logradouro">Logradouro</Label>
                <Input type="text" name="logradouro" id="logradouro" placeholder="Rua, avenida, travessa" value={logradouro} onChange={(e) => this.handleChange(e)}/>
              </FormGroup>

              <FormGroup>
                <Label for="numero">Número</Label>
                <Input type="text" name="numero" id="numero" value={numero} onChange={(e) => this.handleChange(e)}/>
              </FormGroup>
               
              <FormGroup>
                <Label for="localidade">Localidade</Label>
                <Input type="text" name="localidade" id="localidade" placeholder="Rua, avenida, travessa" value={localidade} onChange={(e) => this.handleChange(e)}/>
              </FormGroup>

              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="bairro">Bairro</Label>
                    <Input type="text" name="bairro" id="bairro" value={bairro} onChange={(e) => this.handleChange(e)}/>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="uf">Estado</Label>
                    <Input type="text" name="uf" id="uf" value={uf} onChange={(e) => this.handleChange(e)}/>
                  </FormGroup>
                </Col>
              </Row>
              <Button>Procurar</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default AddressForm;
