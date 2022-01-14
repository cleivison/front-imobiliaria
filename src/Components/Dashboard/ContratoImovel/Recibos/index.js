import React, { useReducer, useState, useEffect } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { Icon, Button, AutoComplete, Input, Alert, DatePicker } from 'antd';
import { TextField } from '@rmwc/textfield';
import { api } from '../../../../services/api';
import 'antd/es/icon/style/css';
import 'antd/es/alert/style/css';
import '@material/textfield/dist/mdc.textfield.css';
import '@material/floating-label/dist/mdc.floating-label.css';
import '@material/notched-outline/dist/mdc.notched-outline.css';
import '@material/line-ripple/dist/mdc.line-ripple.css';
import '@material/select/dist/mdc.select.css';
import '@material/list/dist/mdc.list.css';
import '@material/menu/dist/mdc.menu.css';
import '@material/menu-surface/dist/mdc.menu-surface.css';
import { 
    Row,
    Col,        
} from './styles.js';
import { Select } from '@rmwc/select';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Pdf from './Pdf';

function Reciboscontrato(props){
    const { state } = useLocation();
    const params = useParams();
    const history = useHistory();
   
    const [message, setMessage] = useState([]);
    const [isLoading, setIsLoading] = useState(false);        
    const [inputs, setInputs] = useReducer((state, newState) => ({...state, ...newState}),
    {   
        id: state? state.recibocontrato.id : '',    
        data_vencimento: state? state.recibocontrato.data_vencimento : '',        
        data_pagamento: state? state.recibocontrato.data_pagamento : new Date(),
        parcela: state? state.recibocontrato.parcela.toString() :'0',
        valor_aluguel: state? state.recibocontrato.valor_aluguel.toString() :'0',
        dias_aluguel: state? state.recibocontrato.dias_aluguel.toString(): '0',
        multa_cl2: state? state.recibocontrato.multa_cl2.toString(): '0',
        multa_cl24: state? state.recibocontrato.multa_cl24.toString():'0',   
        taxa_agua: state? state.recibocontrato.taxa_agua.toString():'0', 
        taxa_luz: state? state.recibocontrato.taxa_luz.toString():'0', 
        servicos_adicionais: state? state.recibocontrato.servicos_adicionais.toString():'0', 
        iptu_tcrsu: state? state.recibocontrato.iptu_tcrsu.toString():'0',      
        debito_anterior: state? state.recibocontrato.debito_anterior.toString():'0', 
        pagamento: state? state.recibocontrato.pagamento.toString():'0', 
        desconto: state? state.recibocontrato.desconto.toString():'0', 
        desconto_ir: state? state.recibocontrato.desconto_ir.toString():'0', 
        observacoes: state? state.recibocontrato.observacoes:'', 
        contratoimovel_id: state? state.recibocontrato.contratoimovel_id:'',
        liquido: state? state.recibocontrato.liquido.toString(): '0',
        debito: state? state.recibocontrato.debito.toString(): '0',        
        contratoimovel: state? state.recibocontrato.Contratoimovel: '0',
        tipoimovel: state? state.recibocontrato.Contratoimovel.Imovel.Tipoimovel.descricao: '0',
        inquilino_nome: state? state.recibocontrato.Contratoimovel.Inquilino.nome: '0',
        inquilino_cpf: state? state.recibocontrato.Contratoimovel.Inquilino.cpf: '0',
        proprietario_nome: state? state.recibocontrato.Contratoimovel.Imovel.Proprietario.nome: '0',
        proprietario_cpf: state? state.recibocontrato.Contratoimovel.Imovel.Proprietario.cpf: '0',
        proprietario_fone: state? state.recibocontrato.Contratoimovel.Imovel.Proprietario.Endereco.telefone: '0',
        proprietario_end: state? state.recibocontrato.Contratoimovel.Imovel.Proprietario.Endereco.rua: '0',    
        endereco: state? state.recibocontrato.Contratoimovel.Imovel.Endereco.rua: '0',   
        data_periodo: state? state.recibocontrato.Contratoimovel.data_inicio: '0'  
    }
    );
    const [recibos, setRecibos] = useState([]);

    /*
    let dataVencimentoFormated = new Date(inputs.data_vencimento);   
    dataVencimentoFormated = `${
        dataVencimentoFormated.getUTCFullYear()
                    .toString()
    }-${(dataVencimentoFormated.getUTCMonth()+1)
                    .toString()
                    .padStart(2, '0')
    }-${dataVencimentoFormated.getUTCDate()
                    .toString()
                    .padStart(2, '0')
    }`;   

    let dataPagamentoFormated = new Date(inputs.data_pagamento);   
    dataPagamentoFormated = `${
        dataPagamentoFormated.getUTCFullYear()
                    .toString()
    }-${(dataPagamentoFormated.getUTCMonth()+1)
                    .toString()
                    .padStart(2, '0')
    }-${dataPagamentoFormated.getUTCDate()
                    .toString()
                    .padStart(2, '0')
    }`;    
    */

    useEffect(() => {
        async function getItem(){
            const res = await api.get('recibocontrato/contrato/'+params.id);   
            
            if(res.status === 200){
                setRecibos(res.data);
                selectRecibo(res.data, 1); 
                calcularLiquido();                                                    
            }else{
                history.push('/dashboard/contratoimovel');
            }
        }
        if(!state && params.id !== undefined){
            getItem();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const selectRecibo = (recibo,item) =>{
        item -= 1;
        let dataInicio = ""
        
        if(item == 0)  
            dataInicio = recibo[item].Contratoimovel.data_inicio
        else
            dataInicio = recibo[item-1].data_vencimento

        setInputs({
            id: recibo[item].id, 
            data_vencimento: recibo[item].data_vencimento,        
            data_pagamento: recibo[item].data_pagamento,
            parcela: recibo[item].parcela,
            valor_aluguel: recibo[item].valor_aluguel,
            dias_aluguel: recibo[item].dias_aluguel,
            multa_cl2: recibo[item].multa_cl2,
            multa_cl24: recibo[item].multa_cl24,   
            taxa_agua: recibo[item].taxa_agua, 
            taxa_luz: recibo[item].taxa_luz, 
            servicos_adicionais: recibo[item].servicos_adicionais, 
            iptu_tcrsu: recibo[item].iptu_tcrsu,      
            debito_anterior: recibo[item].debito_anterior, 
            pagamento: recibo[item].pagamento,
            desconto: recibo[item].desconto, 
            desconto_ir: recibo[item].desconto_ir, 
            observacoes: recibo[item].observacoes,
            contratoimovel_id: recibo[item].contratoimovel_id, 
            liquido: recibo[item].liquido, 
            debito: recibo[item].debito,
            contratoimovel: recibo[item].Contratoimovel,   
            tipoimovel: recibo[item].Contratoimovel.Imovel.Tipoimovel.descricao,
            inquilino_nome: recibo[item].Contratoimovel.Inquilino.nome,
            inquilino_cpf: recibo[item].Contratoimovel.Inquilino.cpf,
            proprietario_nome: recibo[item].Contratoimovel.Imovel.Proprietario.nome,
            proprietario_cpf: recibo[item].Contratoimovel.Imovel.Proprietario.cpf,
            proprietario_fone: recibo[item].Contratoimovel.Imovel.Proprietario.Endereco.telefone,
            proprietario_end: recibo[item].Contratoimovel.Imovel.Proprietario.Endereco.rua+
                            ", "+recibo[item].Contratoimovel.Imovel.Proprietario.Endereco.numero+
                            " - "+recibo[item].Contratoimovel.Imovel.Proprietario.Endereco.bairro
            ,
            endereco: recibo[item].Contratoimovel.Imovel.Endereco.rua+
                    ", "+recibo[item].Contratoimovel.Imovel.Endereco.numero,  
            data_periodo: dataInicio,
        });
    }
    const multaCl2 = () =>{
        
        if(inputs.data_vencimento < inputs.data_pagamento ){
            inputs.multa_cl2 = (parseFloat(inputs.valor_aluguel) + parseFloat(inputs.dias_aluguel)) *0.1;            
        }else{
            inputs.multa_cl2 = 0;            
        }
        return inputs.multa_cl2;
    }

    const multaCl24 = () =>{
        
        if(inputs.data_vencimento < inputs.data_pagamento ){
            inputs.multa_cl24 = (parseFloat(inputs.valor_aluguel) + parseFloat(inputs.dias_aluguel) + parseFloat(inputs.multa_cl2)) *0.05;
        }else{
            inputs.multa_cl24 = 0;
        }
        return inputs.multa_cl24;
    }   
    const calcularLiquido = () =>{

        let total = parseFloat(inputs.valor_aluguel);
        total += parseFloat(inputs.dias_aluguel);
        total += parseFloat(inputs.multa_cl2);        
        total += parseFloat(inputs.multa_cl24);
        total += parseFloat(inputs.taxa_agua);
        total += parseFloat(inputs.taxa_luz);
        total += parseFloat(inputs.servicos_adicionais);
        total += parseFloat(inputs.iptu_tcrsu);
        total += parseFloat(inputs.debito_anterior);
        total -= parseFloat(inputs.desconto);
        total -= parseFloat(inputs.desconto_ir);

        inputs.liquido = total;    
        inputs.debito = inputs.liquido - inputs.pagamento;    
        return total;        
    }
    const renderOption = (item) => {                   
        return {            
            label: item.parcela,
            value: item.parcela
        };
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!isLoading){
            setIsLoading(true);
        
            const recibocontrato = {
                id: inputs.id,
                data_vencimento: inputs.data_vencimento,        
                data_pagamento: inputs.data_pagamento,
                parcela: inputs.parcela,
                valor_aluguel: inputs.valor_aluguel,
                dias_aluguel: inputs.dias_aluguel,
                multa_cl2: inputs.multa_cl2,
                multa_cl24: inputs.multa_cl24,   
                taxa_agua: inputs.taxa_agua, 
                taxa_luz: inputs.taxa_luz, 
                servicos_adicionais: inputs.servicos_adicionais, 
                iptu_tcrsu: inputs.iptu_tcrsu,      
                debito_anterior: inputs.debito_anterior, 
                pagamento: inputs.pagamento,
                desconto: inputs.desconto, 
                desconto_ir: inputs.desconto_ir, 
                observacoes: inputs.observacoes,
                contratoimovel_id: inputs.contratoimovel_id,
                liquido: inputs.liquido,
                debito: inputs.debito          
            }            
            let res = {},
            mensagem = null;            
            res = await api.put('recibocontrato/'+inputs.id, recibocontrato);                
            mensagem = 'Recibo atualizado com sucesso!';                
            
            if(res.status === 200){ 

                if(inputs.parcela < recibos.length){                
                    //const debitos = parseFloat(inputs.liquido) - parseFloat(recibos[inputs.parcela-1].pagamento);
                    const obj = {"debito_anterior": inputs.debito}                    
                    let res2 = await api.put('recibocontrato/'+recibos[inputs.parcela].id, obj);  
                    console.log(res.data)
                    if(res2.status ===200){
                        history.replace(`${res.data.contratoimovel_id}`);
                    }else{
                        setMessage(res2.error);
                        setIsLoading(false);
                    }
                }
                else{
                    if(res.status ===200){
                        history.replace(`${res.data.contratoimovel_id}`);
                    }
                }
            }else{
                setMessage(res.error);
                setIsLoading(false);
            }
        }  
    }

    return (
      <div>
         
        {message.map((msg, key) => (
            <Alert
                key={key}
                showIcon 
                message={msg.message || msg}
                type="error"
                closable
                onClose={() => {
                    let newMessages = [...message];
                    newMessages.slice(key);
                    setMessage(newMessages);
                }}
            />
        )) 
        }
         <form>
            <Row justifyContent="space-between" style={{paddingBottom: '1rem', paddingRight: '1rem'}}>
                <PDFDownloadLink document={Pdf(inputs)} fileName="Recibo.pdf">
                    {({ blob, url, loading, error }) => (                                                                         
                       <Button type="primary" icon="snippets" size="large">Imprimir</Button>
                    )}
                </PDFDownloadLink>
                
                <Button onClick={() => history.push('/dashboard/contratoimovel')} type="primary" icon="rollback" size="large">Voltar</Button>
            </Row>                                        
            <Row after>
                <Col>
                    <Select label="Parcela" options={recibos.map(renderOption)} value={inputs.parcela} onChange={(e) => selectRecibo(recibos,e.target.value)} />
                </Col>
                <Col>
                    <TextField 
                    label="Data do vencimento" 
                    type="date" 
                    disabled={true}
                    value={inputs.data_vencimento} 
                    onChange={(e) => {                        
                        setInputs({data_vencimento: e.target.value});
                    }} 
                    />
                </Col>
                <Col>
                    <TextField 
                    label="Data do pagamento" 
                    type="date" 
                    
                    value={inputs.data_pagamento} 
                    onChange={(e) => {                        
                        setInputs({data_pagamento: e.target.value})
                    }} 
                    />
                </Col>                
                <Col>
                    <TextField label="Valor aluguel" value={inputs.valor_aluguel} onChange={(e) => setInputs({valor_aluguel: e.target.value})} />
                </Col>    
                <Col>
                    <TextField label="Dias de aluguel" value={inputs.dias_aluguel} onChange={(e) => setInputs({dias_aluguel: e.target.value})} />
                </Col>
                <Col>
                    <TextField label="Multa cl2" value={multaCl2()} onChange={(e) => setInputs({multa_cl2: e.target.value})} />
                </Col>
                <Col>
                    <TextField label="Multa cl24" value={multaCl24()} onChange={(e) => setInputs({multa_cl24: e.target.value})} />
                </Col>
                <Col>
                    <TextField label="Taxa de água" value={inputs.taxa_agua} onChange={(e) => setInputs({taxa_agua: e.target.value})} />
                </Col>
                <Col>
                    <TextField label="Taxa de luz" value={inputs.taxa_luz} onChange={(e) => setInputs({taxa_luz: e.target.value})} />
                </Col>
                <Col>
                    <TextField label="Serviços adicionais" value={inputs.servicos_adicionais} onChange={(e) => setInputs({servicos_adicionais: e.target.value})} />
                </Col>
                <Col>
                    <TextField label="IPTU/TCRSU" value={inputs.iptu_tcrsu} onChange={(e) => setInputs({iptu_tcrsu: e.target.value})} />
                </Col>
                <Col>
                    <TextField label="Débitos anteriores" value={inputs.debito_anterior} onChange={(e) => setInputs({debito_anterior: e.target.value})} />
                </Col>
                <Col>
                    <TextField label="Pagamento na data" value={inputs.pagamento} onChange={(e) => setInputs({pagamento: e.target.value})} />
                </Col>
                <Col>
                    <TextField label="Desconto" value={inputs.desconto} onChange={(e) => setInputs({desconto: e.target.value})} />
                </Col>
                <Col>
                    <TextField label="Desconto IR" value={inputs.desconto_ir} onChange={(e) => setInputs({desconto_ir: e.target.value})} />
                </Col> 
                <Col>
                    <TextField label="Líquido" disabled={true} value={calcularLiquido()} onChange={(e) => setInputs({liquido: e.target.value})} />
                </Col>               
                <Col width="100" noChild>
                    <TextField
                        textarea
                        outlined
                        fullwidth
                        label="Observações"
                        rows={3}
                        maxLength={400}
                        characterCount
                        value={inputs.observacoes}
                        onChange={(e) => setInputs({observacoes: e.target.value})}
                    />
                </Col>                
            </Row>
                    
            <Row>
                <Col width="100">
                    <Button 
                        loading={isLoading}
                        type="primary" 
                        htmlType="button" 
                        onClick={handleSubmit}
                        icon={params.id === undefined?'plus':'save'} 
                        size='large'>{params.id === undefined? 'Cadastrar' : 'Salvar'}
                    </Button>                                       
                </Col> 
            </Row>
        </form>
      </div>
    );
  }
export default Reciboscontrato;
