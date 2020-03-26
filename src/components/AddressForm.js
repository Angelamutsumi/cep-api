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
    .catch(error => this.setState({error:true, loading:false}))
  }

  handleChange = async(field) => {
    const {name, value} = field
    this.setstate({[name]:value, error:false})
    if(name === 'cep'&& value.lenght === 8){
      this.setState({loading:true})
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
      this.setState({loading:true})
      const cepObject = await this.verificaCep(value)
      if(cepObject.erro){
        this.setState({error:true})
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
                <Input type="text" name="cep" id="cep" placeholder="00000-000"/>
              </FormGroup>

              <FormGroup>
                <Label for="logradouro">Logradouro</Label>
                <Input type="text" name="logradouro" id="logradouro" placeholder="Rua, avenida, travessa"/>
              </FormGroup>

              <FormGroup>
                <Label for="numero">Número</Label>
                <Input type="text" name="numero" id="numero"/>
              </FormGroup>
               
              <FormGroup>
                <Label for="localidade">Localidade</Label>
                <Input type="text" name="localidade" id="localidade" placeholder="Rua, avenida, travessa"/>
              </FormGroup>

              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="bairro">Bairro</Label>
                    <Input type="text" name="bairro" id="bairro"/>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="estado">Estado</Label>
                    <Input type="text" name="estado" id="estado"/>
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
