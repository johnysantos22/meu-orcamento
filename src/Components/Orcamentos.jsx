import React, { useState } from "react";
import styled from "styled-components";
import { jsPDF } from "jspdf";

const Container = styled.div`
  max-width: 500px;
  margin: auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background: #fff;
`;

const Label = styled.label`
  display: block;
  margin-top: 10px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 15px;
  background: ${(props) => props.color || "#007bff"};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background: ${(props) => props.hoverColor || "#0056b3"};
  }
`;

const Resultado = styled.h2`
  text-align: center;
  margin-top: 20px;
`;

const OrcamentoCameras = () => {
  const [formData, setFormData] = useState({
    cliente: "",
    email: "",
    numeroWhatsApp: "", // Novo campo para número de WhatsApp
    tipoCamera: "ip",
    cameras: 1,
    resolucao: "720p",
    gravacao: "dvr",
    distancia: 1,
    fonte: "individual",
    nobreak: "nao",
    acesso: "nao",
  });
  const [total, setTotal] = useState(0);
  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const calcularOrcamento = (e) => {
    e.preventDefault();
    let precoBase = 100 * formData.cameras;
    if (formData.resolucao === "1080p") precoBase *= 1.2;
    if (formData.resolucao === "4k") precoBase *= 1.5;
    if (formData.gravacao === "nuvem") precoBase += 200;
    if (formData.nobreak === "sim") precoBase += 150;
    if (formData.acesso === "sim") precoBase += 100;

    setTotal(precoBase);

    // Criar prévia do orçamento
    setPreview(`
      Cliente: ${formData.cliente}
      E-mail: ${formData.email}
      Tipo de Câmera: ${formData.tipoCamera}
      Quantidade: ${formData.cameras}
      Resolução: ${formData.resolucao}
      Tipo de Gravação: ${formData.gravacao}
      Distância: ${formData.distancia} metros
      Fonte: ${formData.fonte}
      Nobreak: ${formData.nobreak}
      Acesso Remoto: ${formData.acesso}
      Total: R$ ${precoBase.toFixed(2)}
    `);
  };

  const gerarPDF = () => {
    const doc = new jsPDF();

    // Definir título
    doc.setFontSize(18);
    doc.text("Orçamento de Instalação de Câmeras", 10, 10);

    // Adicionar detalhes do orçamento
    doc.setFontSize(12);
    doc.text(`Cliente: ${formData.cliente}`, 10, 20);
    doc.text(`E-mail: ${formData.email}`, 10, 30);
    doc.text(`Tipo de Câmera: ${formData.tipoCamera}`, 10, 40);
    doc.text(`Quantidade: ${formData.cameras}`, 10, 50);
    doc.text(`Resolução: ${formData.resolucao}`, 10, 60);
    doc.text(`Tipo de Gravação: ${formData.gravacao}`, 10, 70);
    doc.text(`Distância: ${formData.distancia} metros`, 10, 80);
    doc.text(`Fonte: ${formData.fonte}`, 10, 90);
    doc.text(`Nobreak: ${formData.nobreak}`, 10, 100);
    doc.text(`Acesso Remoto: ${formData.acesso}`, 10, 110);
    doc.text(`Total: R$ ${total.toFixed(2)}`, 10, 120);

    // Salvar o PDF
    doc.save("orcamento.pdf");
  };

  const enviarWhatsApp = () => {
    gerarPDF(); // Gera o PDF primeiro

    const numeroWhatsApp = formData.numeroWhatsApp; // Obtendo o número do WhatsApp do formulário
    if (!numeroWhatsApp) {
      alert("Por favor, insira o número de WhatsApp do cliente.");
      return;
    }

    const mensagem = "Olá, segue o orçamento em anexo.";
    
    // Enviar a mensagem do WhatsApp com a URL para o PDF
    window.open(`https://api.whatsapp.com/send?phone=55${numeroWhatsApp}&text=${mensagem}`, "_blank");
  };

  return (
    <Container>
      <h1>Orçamento de Instalação de Câmeras</h1>
      <form onSubmit={calcularOrcamento}>
        <Label>Nome do Cliente:</Label>
        <Input type="text" id="cliente" value={formData.cliente} onChange={handleChange} required />

        <Label>E-mail do Cliente:</Label>
        <Input type="email" id="email" value={formData.email} onChange={handleChange} required />

        <Label>Número do WhatsApp do Cliente:</Label>
        <Input
          type="text"
          id="numeroWhatsApp"
          value={formData.numeroWhatsApp}
          onChange={handleChange}
          placeholder="Ex: 11987654321"
          required
        />

        <Label>Tipo de Câmera:</Label>
        <Select id="tipoCamera" value={formData.tipoCamera} onChange={handleChange}>
          <option value="ip">IP</option>
          <option value="analogica">Analógica</option>
          <option value="dome">Dome</option>
          <option value="bullet">Bullet</option>
        </Select>

        <Label>Quantidade de Câmeras:</Label>
        <Input type="number" id="cameras" value={formData.cameras} onChange={handleChange} min="1" required />

        <Label>Resolução da Câmera:</Label>
        <Select id="resolucao" value={formData.resolucao} onChange={handleChange}>
          <option value="720p">720p</option>
          <option value="1080p">1080p</option>
          <option value="4k">4K</option>
        </Select>

        <Label>Tipo de Gravação:</Label>
        <Select id="gravacao" value={formData.gravacao} onChange={handleChange}>
          <option value="dvr">DVR</option>
          <option value="nvr">NVR</option>
          <option value="nuvem">Armazenamento em Nuvem</option>
        </Select>

        <Label>Distância da Fiação (metros):</Label>
        <Input type="number" id="distancia" value={formData.distancia} onChange={handleChange} min="1" required />

        <Label>Fonte de Alimentação:</Label>
        <Select id="fonte" value={formData.fonte} onChange={handleChange}>
          <option value="individual">Fonte Individual</option>
          <option value="centralizada">Centralizada</option>
        </Select>

        <Label>Necessita de Nobreak?</Label>
        <Select id="nobreak" value={formData.nobreak} onChange={handleChange}>
          <option value="sim">Sim</option>
          <option value="nao">Não</option>
        </Select>

        <Label>Deseja acesso remoto?</Label>
        <Select id="acesso" value={formData.acesso} onChange={handleChange}>
          <option value="sim">Sim</option>
          <option value="nao">Não</option>
        </Select>

        <Button type="submit">Calcular Orçamento</Button>
      </form>

      <Resultado>Orçamento Total: R$ {total.toFixed(2)}</Resultado>

      {preview && (
        <div>
          <h3>Prévia do Orçamento</h3>
          <pre>{preview}</pre>

          <Button color="#28a745" hoverColor="#218838" onClick={gerarPDF}>
            Gerar PDF
          </Button>
          <Button color="#25d366" hoverColor="#1da851" onClick={enviarWhatsApp}>
            Enviar pelo WhatsApp (PDF)
          </Button>
        </div>
      )}
    </Container>
  );
};

export default OrcamentoCameras;
