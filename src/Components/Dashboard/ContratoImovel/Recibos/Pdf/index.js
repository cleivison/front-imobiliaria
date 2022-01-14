import React from 'react';
import { Page, Text, View, Document, Image, StyleSheet, Font } from '@react-pdf/renderer';
const numero = require('numero-por-extenso');

const styles = StyleSheet.create({
  body: {   
    flexDirection: 'row',
    display: 'flex',   
  },
  content: {
    padding: '15pt',
  },
  blocoEsquerdo: {
    width: '50%',  
    paddingLeft: '10pt',
  },
  blocoDireito_d: {
    width: '25%',    
    paddingLeft: '10pt',
    paddingTop: '3pt',
    borderRight: 1,
  },
  blocoDireito_e: {
    width: '25%', 
    paddingLeft: '10pt',
    paddingTop: '3pt',
    borderLeft: 1,
  },
  blocoCentral: {
    width: '100%', 
    paddingLeft: '10pt',
    paddingTop: '4pt',
    paddingBottom: '4pt',
    borderLeft: 1,
    borderRight: 1,
  },
   blocoDividido: {    
    paddingLeft: '10pt',
    paddingTop: '3pt',
    paddingBottom: '2pt',   
  },
  Texto: {
    fontSize: '9pt',
  },
  Titulo: {
    fontSize: '10pt',
  },
  TextoValores: {
    fontSize: '6pt',
  },
  LinhaCima: {
  	borderTop: 1,
  },
   LinhaEsquerda: {
  	borderLeft: 1,
  },
  LinhaDireita: {
  	borderRight: 1,
  },
   LinhaBaixo: {
  	borderBottom: 1,
  },
  emphasis: { fontFamily: 'Helvetica-Bold', color: '#000000' },
});
const dataConvert = (data) =>{
  
    let dataConvertida = new Date(data);   
    dataConvertida = `${
        dataConvertida.getUTCDate()
                    .toString().padStart(2, '0')
    }/${(dataConvertida.getUTCMonth()+1)
                    .toString()
                    .padStart(2, '0')
    }/${dataConvertida.getUTCFullYear()
                    .toString()
                    
    }`; 
    
    return dataConvertida;
}

Font.register({ family: 'Negrito', fontWeight: 'bold'});

const Pdf = (Inputs) => (  
  <Document>    
    <Page size={'A4'} style={[styles.content]}>      
      <View style={[styles.body]}>
        <Text style={[styles.blocoEsquerdo]}>          
        </Text>
        <Text style={[styles.blocoDireito_e, styles.TextoValores, styles.LinhaCima]}>
          Aluguel
        </Text>
         <Text style={[styles.blocoDireito_d, styles.TextoValores, styles.LinhaCima]}>
          R$   {Inputs.valor_aluguel},00
        </Text>
	  </View>    
      <View style={[styles.body]}>
        <Text style={[styles.blocoEsquerdo]}>          
        </Text>
        <Text style={[styles.blocoDireito_e, styles.TextoValores]}>
          Dias de aluguel
        </Text>
         <Text style={[styles.blocoDireito_d, styles.TextoValores]}>
          R$   {Inputs.dias_aluguel},00
        </Text>
	  </View>    
      <View style={[styles.body]}>
        <Text style={[styles.blocoEsquerdo, styles.Texto]}>   
          
        </Text>
        <Text style={[styles.blocoDireito_e, styles.TextoValores]}>
          Multa contr. cl. 2
        </Text>
         <Text style={[styles.blocoDireito_d, styles.TextoValores]}>
          R$   {Inputs.multa_cl2},00
        </Text>
	  </View>   
       <View style={[styles.body]}>
        <Text style={[styles.blocoEsquerdo]}>          
        </Text>
        <Text style={[styles.blocoDireito_e, styles.TextoValores]}>
          Multa contr. cl2. 24
        </Text>
         <Text style={[styles.blocoDireito_d, styles.TextoValores]}>
          R$   {Inputs.multa_cl24},00
        </Text>
	  </View>    
       <View style={[styles.body]}>
         <Text style={[styles.blocoEsquerdo, styles.Titulo, styles.emphasis]}>   
          Recibo de aluguel - Via da Imobiliária
        </Text>
        <Text style={[styles.blocoDireito_e, styles.TextoValores]}>
          Taxa de Água
        </Text>
         <Text style={[styles.blocoDireito_d, styles.TextoValores]}>
          R$   {Inputs.taxa_agua},00
        </Text>
	  </View>    
       <View style={[styles.body]}>
        <Text style={[styles.blocoEsquerdo]}>          
        </Text>
        <Text style={[styles.blocoDireito_e, styles.TextoValores]}>
          Taxa de luz
        </Text>
         <Text style={[styles.blocoDireito_d, styles.TextoValores]}>
          R$   {Inputs.taxa_luz},00
        </Text>
	  </View>   
      <View style={[styles.body]}>
        <Text style={[styles.blocoEsquerdo]}>          
        </Text>
        <Text style={[styles.blocoDireito_e, styles.TextoValores]}>
          Servicos Adicionais
        </Text>
         <Text style={[styles.blocoDireito_d, styles.TextoValores]}>
          R$   {Inputs.servicos_adicionais},00
        </Text>
	  </View>    
       <View style={[styles.body]}>
        <Text style={[styles.blocoEsquerdo, styles.LinhaCima, styles.Texto, styles.LinhaEsquerda]}>            
        </Text>
        <Text style={[styles.blocoDireito_e, styles.TextoValores]}>
          IPTU/TCRSU
        </Text>
         <Text style={[styles.blocoDireito_d, styles.TextoValores]}>
          R$   {Inputs.iptu_tcrsu},00
        </Text>
	  </View>    
      <View style={[styles.body]}>
        <Text style={[styles.blocoEsquerdo, styles.Texto, styles.LinhaEsquerda]}>  
          
        </Text>
        <Text style={[styles.blocoDireito_e, styles.TextoValores]}>
          Débitos Anteriores
        </Text>
         <Text style={[styles.blocoDireito_d, styles.TextoValores]}>
          R$   {Inputs.debito_anterior},00
        </Text>
	  </View>   
      <View style={[styles.body]}>
        <Text style={[styles.blocoEsquerdo, styles.Texto, styles.LinhaEsquerda]}>  
          Parcela:  {Inputs.parcela}
        </Text>
        <Text style={[styles.blocoDireito_e, styles.TextoValores]}>
          Pagt. na data
        </Text>
         <Text style={[styles.blocoDireito_d, styles.TextoValores]}>
          R$   {Inputs.pagamento},00
        </Text>
	  </View>   
      <View style={[styles.body]}>
        <Text style={[styles.blocoEsquerdo, styles.Texto, styles.LinhaEsquerda]}>            
        </Text>
        <Text style={[styles.blocoDireito_e, styles.TextoValores]}>
          Desconto Autorizado
        </Text>
         <Text style={[styles.blocoDireito_d, styles.TextoValores]}>
          R$   {Inputs.desconto},00
        </Text>
	  </View>   
      <View style={[styles.body]}>
        <Text style={[styles.blocoEsquerdo, styles.Texto, styles.LinhaEsquerda]}> 
          Tipo de Imóvel: {Inputs.tipoimovel}
        </Text>
        <Text style={[styles.blocoDireito_e, styles.TextoValores]}>
          Desc. IR - fonte
        </Text>
         <Text style={[styles.blocoDireito_d, styles.TextoValores]}>
          R$   {Inputs.desconto_ir},00
        </Text>
	  </View>
      <View style={[styles.body]}>
        <Text style={[styles.blocoEsquerdo, styles.LinhaEsquerda]}>            
        </Text>
        <Text style={[styles.blocoDireito_e,  styles.LinhaCima]}>        
        </Text>
         <Text style={[styles.blocoDireito_d, styles.LinhaCima]}>         
        </Text>
	  </View>
      <View style={[styles.body]}>
        <Text style={[styles.blocoEsquerdo, styles.Texto, styles.LinhaEsquerda]}>            
        </Text>
        <Text style={[styles.blocoDireito_e, styles.TextoValores]}>
          Líquido
        </Text>
         <Text style={[styles.blocoDireito_d, styles.TextoValores]}>
          R$   {Inputs.liquido},00
        </Text>
	  </View>
      <View style={[styles.body]}>
        <Text style={[styles.blocoEsquerdo, styles.Texto, styles.LinhaEsquerda]}>            
        </Text>
        <Text style={[styles.blocoDireito_e, styles.TextoValores]}>
          Seu débito
        </Text>
        <Text style={[styles.blocoDireito_d, styles.TextoValores]}> 
          R$   {Inputs.debito},00
        </Text>       
	  </View>     
       <View style={[styles.body]}>
        <Text style={[styles.blocoCentral, styles.LinhaCima]}>            
        </Text>       
	  </View>
      <View style={[styles.body]}>
        <Text style={[styles.blocoCentral, styles.Texto]}>  
          Recebemos de{" "} 
          <Text style={styles.emphasis}>
          {Inputs.inquilino_nome.toUpperCase()}
          </Text>, CPF nº {Inputs.inquilino_cpf} a quantia de R$ {Inputs.pagamento},00 
          ({numero.porExtenso(Inputs.pagamento, numero.estilo.monetario).toUpperCase()})
             proveniente do aluguel em pauta sito à {Inputs.endereco.toUpperCase()}.
        </Text>       
	  </View>  
       <View style={[styles.body]}>         
        <Text style={[styles.blocoCentral, styles.Texto, styles.LinhaCima, styles.LinhaBaixo]}>  
          Observacao: {Inputs.observacoes}
        </Text>       
	  </View>       
      <View style={[styles.body]}>         
        <Text style={[styles.blocoDividido, styles.Texto, styles.LinhaDireita, styles.LinhaEsquerda, { width: '65%'}]}>    
          Correspondente ao período: {dataConvert(Inputs.data_periodo)} à {dataConvert(Inputs.data_vencimento)}
        </Text>
        <Text style={[styles.blocoDividido, styles.Texto, styles.LinhaDireita, { width: '35%' }]}>    
          Vencido em: {dataConvert(Inputs.data_vencimento)}
        </Text> 
	  </View>
      <View style={[styles.body]}>         
        <Text style={[styles.blocoDividido, styles.Texto, styles.LinhaDireita, styles.LinhaCima, styles.LinhaEsquerda, { width: '65%'}]}>    
         Locador: {Inputs.proprietario_nome.toUpperCase()}
        </Text>
        <Text style={[styles.blocoDividido, styles.Texto, styles.LinhaDireita, styles.LinhaCima, { width: '35%' }]}>    
          CPF: {Inputs.proprietario_cpf}
        </Text> 
	  </View> 
      <View style={[styles.body]}>         
        <Text style={[styles.blocoDividido, styles.Texto, styles.LinhaCima, styles.LinhaEsquerda, { width: '50%'}]}>              
        </Text>
        <Text style={[styles.blocoDividido, styles.Texto, styles.LinhaDireita, styles.LinhaEsquerda, styles.LinhaCima, { width: '50%' }]}>              
        </Text> 
	  </View> 
       <View style={[styles.body]}>         
        <Text style={[styles.blocoDividido, styles.Texto,  styles.LinhaEsquerda, { width: '50%', textAlign:'center'}]}>              
       
        </Text>
        <Text style={[styles.blocoDividido, styles.Texto, styles.LinhaDireita, styles.LinhaEsquerda, { width: '50%', textAlign:'center'}]}>              
        </Text> 
	  </View>       
       <View style={[styles.body]}>         
        <Text style={[styles.blocoDividido, styles.Texto, styles.LinhaEsquerda, { width: '50%', textAlign:'center', textDecoration:'underline'}]}>              
        {dataConvert(Inputs.data_pagamento)}
        </Text>
        <Text style={[styles.blocoDividido, styles.Texto, styles.LinhaDireita, styles.LinhaEsquerda, { width: '50%', textAlign:'center' }]}>              
        _________________________________________
        </Text> 
	  </View> 
      <View style={[styles.body]}>         
        <Text style={[styles.blocoDividido, styles.Texto, styles.LinhaEsquerda, styles.LinhaBaixo, { width: '50%', textAlign:'center'}]}>              
        Data
        </Text>
        <Text style={[styles.blocoDividido, styles.Texto, styles.LinhaDireita, styles.LinhaEsquerda, styles.LinhaBaixo, { width: '50%', textAlign:'center' }]}>              
        Assinatura p/locador
        </Text> 
	  </View>   
    <View style={[styles.body]}>         
        <Text style={[styles.blocoDividido, styles.Texto,{ width: '100%', textAlign:'left'}]}>                      
        </Text>       
	  </View> 
      <View style={[styles.body]}>         
        <Text style={[styles.blocoDividido, styles.Texto,{ width: '100%', textAlign:'left'}]}>              
        RECIBO
        </Text>       
	  </View> 
      <View style={[styles.body]}>         
        <Text style={[styles.blocoDividido, styles.Texto,{ width: '100%', textAlign:'left'}]}>                     
        </Text>       
	  </View> 
      <View style={[styles.body]}>         
        <Text style={[styles.blocoDividido, styles.Texto,{ width: '50%', textAlign:'left'}]}>              
        	Recebi a quantia acima exposta n/data.
        </Text>             
	  </View> 
      <View style={[styles.body]}>         
        <Text style={[styles.blocoDividido, styles.Texto,{ width: '50%', textAlign:'left'}]}>              
        	Uberaba/MG, _________ de ___________ de {new Date().getUTCFullYear()}
        </Text>             
	  </View>
       <View style={[styles.body]}>         
          <Text style={[styles.blocoDividido, styles.Texto,{ width: '50%', textAlign:'left', paddingTop:'30pt'}]}>              
              ___________________________________________________________________
          </Text>             
        </View>
        <View style={[styles.body]}>         
          <Text style={[styles.blocoDividido, styles.Texto,{ width: '50%', textAlign:'center'}]}>              
              {Inputs.proprietario_nome.toUpperCase()}
          </Text>             
        </View>
     	<View style={[styles.body]}>         
          <Text style={[styles.blocoDividido, styles.Texto, { width: '6%', textAlign:'left'}]}>              
              CPF: 
          </Text>  
          <Text style={[styles.blocoDividido, styles.Texto, { width: '94%', textAlign:'left'}]}>              
              {Inputs.proprietario_cpf}
          </Text> 
      </View>
      <View style={[styles.body]}>         
          <Text style={[styles.blocoDividido, styles.Texto, { width: '6%', textAlign:'left'}]}>              
              End.:
          </Text> 
          <Text style={[styles.blocoDividido, styles.Texto, { width: '94%', textAlign:'left'}]}>              
              {Inputs.proprietario_end.toUpperCase()}
          </Text>
      </View>   
      <View style={[styles.body]}>         
          <Text style={[styles.blocoDividido, styles.Texto, { width: '6%', textAlign:'left'}]}>              
              Fone:
          </Text> 
          <Text style={[styles.blocoDividido, styles.Texto, { width: '94%', textAlign:'left'}]}>              
              {Inputs.proprietario_fone}
          </Text>
      </View>    
      <View style={[styles.body]}>         
          <Text style={[styles.blocoDividido, styles.Texto, { width: '100%', textAlign:'justify', paddingRight: '10pt'}]}>              
              ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
          </Text>            
      </View>  
      <View style={[styles.body]}>
        <Text style={[styles.blocoEsquerdo]}>          
        </Text>
        <Text style={[styles.blocoDireito_e, styles.TextoValores, styles.LinhaCima]}>
          Aluguel
        </Text>
         <Text style={[styles.blocoDireito_d, styles.TextoValores, styles.LinhaCima]}>
          R$   {Inputs.valor_aluguel},00
        </Text>
	  </View>    
      <View style={[styles.body]}>
        <Text style={[styles.blocoEsquerdo]}>          
        </Text>
        <Text style={[styles.blocoDireito_e, styles.TextoValores]}>
          Dias de aluguel
        </Text>
         <Text style={[styles.blocoDireito_d, styles.TextoValores]}>
          R$   {Inputs.dias_aluguel},00
        </Text>
	  </View>    
      <View style={[styles.body]}>
        <Text style={[styles.blocoEsquerdo, styles.Texto]}>   
          
        </Text>
        <Text style={[styles.blocoDireito_e, styles.TextoValores]}>
          Multa contr. cl. 2
        </Text>
         <Text style={[styles.blocoDireito_d, styles.TextoValores]}>
          R$   {Inputs.multa_cl2},00
        </Text>
	  </View>   
       <View style={[styles.body]}>
        <Text style={[styles.blocoEsquerdo]}>          
        </Text>
        <Text style={[styles.blocoDireito_e, styles.TextoValores]}>
          Multa contr. cl2. 24
        </Text>
         <Text style={[styles.blocoDireito_d, styles.TextoValores]}>
          R$   {Inputs.multa_cl24},00
        </Text>
	  </View>    
       <View style={[styles.body]}>
         <Text style={[styles.blocoEsquerdo, styles.Titulo, styles.emphasis]}>   
          Recibo de aluguel - Via do Inquilino
        </Text>
        <Text style={[styles.blocoDireito_e, styles.TextoValores]}>
          Taxa de Água
        </Text>
         <Text style={[styles.blocoDireito_d, styles.TextoValores]}>
          R$   {Inputs.taxa_agua},00
        </Text>
	  </View>    
       <View style={[styles.body]}>
        <Text style={[styles.blocoEsquerdo]}>          
        </Text>
        <Text style={[styles.blocoDireito_e, styles.TextoValores]}>
          Taxa de luz
        </Text>
         <Text style={[styles.blocoDireito_d, styles.TextoValores]}>
          R$   {Inputs.taxa_luz},00
        </Text>
	  </View>   
      <View style={[styles.body]}>
        <Text style={[styles.blocoEsquerdo]}>          
        </Text>
        <Text style={[styles.blocoDireito_e, styles.TextoValores]}>
          Servicos Adicionais
        </Text>
         <Text style={[styles.blocoDireito_d, styles.TextoValores]}>
          R$   {Inputs.servicos_adicionais},00
        </Text>
	  </View>    
       <View style={[styles.body]}>
        <Text style={[styles.blocoEsquerdo, styles.LinhaCima, styles.Texto, styles.LinhaEsquerda]}>            
        </Text>
        <Text style={[styles.blocoDireito_e, styles.TextoValores]}>
          IPTU/TCRSU
        </Text>
         <Text style={[styles.blocoDireito_d, styles.TextoValores]}>
          R$   {Inputs.iptu_tcrsu},00
        </Text>
	  </View>    
      <View style={[styles.body]}>
        <Text style={[styles.blocoEsquerdo, styles.Texto, styles.LinhaEsquerda]}>  
          
        </Text>
        <Text style={[styles.blocoDireito_e, styles.TextoValores]}>
          Débitos Anteriores
        </Text>
         <Text style={[styles.blocoDireito_d, styles.TextoValores]}>
          R$   {Inputs.debito_anterior},00
        </Text>
	  </View>   
      <View style={[styles.body]}>
        <Text style={[styles.blocoEsquerdo, styles.Texto, styles.LinhaEsquerda]}>  
          Parcela:  {Inputs.parcela}
        </Text>
        <Text style={[styles.blocoDireito_e, styles.TextoValores]}>
          Pagt. na data
        </Text>
         <Text style={[styles.blocoDireito_d, styles.TextoValores]}>
          R$   {Inputs.pagamento},00
        </Text>
	  </View>   
      <View style={[styles.body]}>
        <Text style={[styles.blocoEsquerdo, styles.Texto, styles.LinhaEsquerda]}>            
        </Text>
        <Text style={[styles.blocoDireito_e, styles.TextoValores]}>
          Desconto Autorizado
        </Text>
         <Text style={[styles.blocoDireito_d, styles.TextoValores]}>
          R$   {Inputs.desconto},00
        </Text>
	  </View>   
      <View style={[styles.body]}>
        <Text style={[styles.blocoEsquerdo, styles.Texto, styles.LinhaEsquerda]}> 
          Tipo de Imóvel: {Inputs.tipoimovel}
        </Text>
        <Text style={[styles.blocoDireito_e, styles.TextoValores]}>
          Desc. IR - fonte
        </Text>
         <Text style={[styles.blocoDireito_d, styles.TextoValores]}>
          R$   {Inputs.desconto_ir},00
        </Text>
	  </View>
      <View style={[styles.body]}>
        <Text style={[styles.blocoEsquerdo, styles.LinhaEsquerda]}>            
        </Text>
        <Text style={[styles.blocoDireito_e,  styles.LinhaCima]}>        
        </Text>
         <Text style={[styles.blocoDireito_d, styles.LinhaCima]}>         
        </Text>
	  </View>
      <View style={[styles.body]}>
        <Text style={[styles.blocoEsquerdo, styles.Texto, styles.LinhaEsquerda]}>            
        </Text>
        <Text style={[styles.blocoDireito_e, styles.TextoValores]}>
          Líquido
        </Text>
         <Text style={[styles.blocoDireito_d, styles.TextoValores]}>
          R$   {Inputs.liquido},00
        </Text>
	  </View>
      <View style={[styles.body]}>
        <Text style={[styles.blocoEsquerdo, styles.Texto, styles.LinhaEsquerda]}>            
        </Text>
        <Text style={[styles.blocoDireito_e, styles.TextoValores]}>
          Seu débito
        </Text>
        <Text style={[styles.blocoDireito_d, styles.TextoValores]}> 
          R$   {Inputs.debito},00
        </Text>       
	  </View>     
       <View style={[styles.body]}>
        <Text style={[styles.blocoCentral, styles.LinhaCima]}>            
        </Text>       
	  </View>
      <View style={[styles.body]}>
        <Text style={[styles.blocoCentral, styles.Texto]}>  
          Recebemos de{" "}
          <Text style={styles.emphasis}>
            {Inputs.inquilino_nome.toUpperCase()}
          </Text>, CPF nº {Inputs.inquilino_cpf} a quantia de R$ {Inputs.pagamento},00 
          ({numero.porExtenso(Inputs.pagamento, numero.estilo.monetario).toUpperCase()})
            proveniente do aluguel em pauta sito à {Inputs.endereco.toUpperCase()}.
        </Text>       
	  </View>  
       <View style={[styles.body]}>         
        <Text style={[styles.blocoCentral, styles.Texto, styles.LinhaCima, styles.LinhaBaixo]}>  
          Observacao: {Inputs.observacoes}
        </Text>       
	  </View>       
      <View style={[styles.body]}>         
        <Text style={[styles.blocoDividido, styles.Texto, styles.LinhaDireita, styles.LinhaEsquerda, { width: '65%'}]}>    
          Correspondente ao período: {dataConvert(Inputs.data_periodo)} à {dataConvert(Inputs.data_vencimento)}
        </Text>
        <Text style={[styles.blocoDividido, styles.Texto, styles.LinhaDireita, { width: '35%' }]}>    
          Vencido em: {dataConvert(Inputs.data_vencimento)}
        </Text> 
	  </View>
      <View style={[styles.body]}>         
        <Text style={[styles.blocoDividido, styles.Texto, styles.LinhaDireita, styles.LinhaCima, styles.LinhaEsquerda, { width: '65%'}]}>    
         Locador: {Inputs.proprietario_nome.toUpperCase()}
        </Text>
        <Text style={[styles.blocoDividido, styles.Texto, styles.LinhaDireita, styles.LinhaCima, { width: '35%' }]}>    
          CPF: {Inputs.proprietario_cpf}
        </Text> 
	  </View> 
      <View style={[styles.body]}>         
        <Text style={[styles.blocoDividido, styles.Texto, styles.LinhaCima, styles.LinhaEsquerda, { width: '50%'}]}>              
        </Text>
        <Text style={[styles.blocoDividido, styles.Texto, styles.LinhaDireita, styles.LinhaEsquerda, styles.LinhaCima, { width: '50%' }]}>              
        </Text> 
	  </View> 
       <View style={[styles.body]}>         
        <Text style={[styles.blocoDividido, styles.Texto,  styles.LinhaEsquerda, { width: '50%', textAlign:'center'}]}>              
       
        </Text>
        <Text style={[styles.blocoDividido, styles.Texto, styles.LinhaDireita, styles.LinhaEsquerda, { width: '50%', textAlign:'center'}]}>              
        </Text> 
	  </View>       
       <View style={[styles.body]}>         
        <Text style={[styles.blocoDividido, styles.Texto, styles.LinhaEsquerda, { width: '50%', textAlign:'center', textDecoration:'underline'}]}>              
        {dataConvert(Inputs.data_pagamento)}
        </Text>
        <Text style={[styles.blocoDividido, styles.Texto, styles.LinhaDireita, styles.LinhaEsquerda, { width: '50%', textAlign:'center' }]}>              
        _________________________________________
        </Text> 
	  </View> 
      <View style={[styles.body]}>         
        <Text style={[styles.blocoDividido, styles.Texto, styles.LinhaEsquerda, styles.LinhaBaixo, { width: '50%', textAlign:'center'}]}>              
        Data
        </Text>
        <Text style={[styles.blocoDividido, styles.Texto, styles.LinhaDireita, styles.LinhaEsquerda, styles.LinhaBaixo, { width: '50%', textAlign:'center' }]}>              
        Assinatura p/locador
        </Text> 
	  </View>    
    </Page>     
  </Document>
);

export default Pdf;