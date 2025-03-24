// src/components/Orcamento.js
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Container = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin: 5px 0;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin: 5px 0;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
`;

const Preview = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  background: #fff;
  margin-top: 20px;
`;

const Orcamento = () => {
  const [formData, setFormData] = useState({
    cliente: "",
    telefone: "",
    email: "",
    endereco: "",
    tipoCamera: "ip",
    quantidadeCameras: 1,
    dvr: "4 Canais",
    armazenamento: "1TB",
    cabeamento: "UTP",
    metrosCabo: 10,
    nobreak: "Sim",
    acessorios: "Conectores",
    garantia: "1 Ano",
    observacoes: "",
  });

  const [total, setTotal] = useState(0);
  const previewRef = useRef(null);

  const calcularOrcamento = () => {
    const precoCamera = { ip: 500, analogica: 300, dome: 400, bullet: 450 };
    const precoDVR = { "4 Canais": 400, "8 Canais": 700, "16 Canais": 1200 };
    const precoArmazenamento = { "500GB": 200, "1TB": 350, "2TB": 600 };
    const precoCabo = 2 * formData.metrosCabo;
    const precoNobreak = formData.nobreak === "Sim" ? 500 : 0;

    const totalCalculado =
      formData.quantidadeCameras * precoCamera[formData.tipoCamera] +
      precoDVR[formData.dvr] +
      precoArmazenamento[formData.armazenamento] +
      precoCabo +
      precoNobreak;

    setTotal(totalCalculado);
  };

  const gerarPDF = async () => {
    const element = previewRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 180, 100);
    return pdf;
  };

  const visualizarPDF = useReactToPrint({
    content: () => previewRef.current,
  });

  const enviarWhatsApp = async () => {
    const pdf = await gerarPDF();
    const pdfBlob = pdf.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);

    const mensagem = `Olá, ${formData.cliente}! Segue seu orçamento para instalação de câmeras. Total: R$ ${total}`;
    const whatsappURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(mensagem)}&url=${pdfUrl}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <Container>
      <h1>Orçamento de Câmeras</h1>
      {/* Formulário de Dados do Cliente */}
      <h2>Dados do Cliente</h2>
      <Input type="text" placeholder="Nome do Cliente" value={formData.cliente} onChange={(e) => setFormData({ ...formData, cliente: e.target.value })} />
      <Input type="tel" placeholder="Telefone" value={formData.telefone} onChange={(e) => setFormData({ ...formData, telefone: e.target.value })} />
      <Input type="email" placeholder="E-mail" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
      <Input type="text" placeholder="Endereço" value={formData.endereco} onChange={(e) => setFormData({ ...formData, endereco: e.target.value })} />

      {/* Formulário de Equipamentos */}
      <h2>Equipamentos</h2>
      <Select value={formData.tipoCamera} onChange={(e) => setFormData({ ...formData, tipoCamera: e.target.value })}>
        <option value="ip">IP</option>
        <option value="analogica">Analógica</option>
        <option value="dome">Dome</option>
        <option value="bullet">Bullet</option>
      </Select>
      <Input type="number" placeholder="Quantidade de Câmeras" min="1" value={formData.quantidadeCameras} onChange={(e) => setFormData({ ...formData, quantidadeCameras: parseInt(e.target.value) })} />
      <Select value={formData.dvr} onChange={(e) => setFormData({ ...formData, dvr: e.target.value })}>
        <option value="4 Canais">DVR - 4 Canais</option>
        <option value="8 Canais">DVR - 8 Canais</option>
        <option value="16 Canais">DVR - 16 Canais</option>
      </Select>
      <Select value={formData.armazenamento} onChange={(e) => setFormData({ ...formData, armazenamento: e.target.value })}>
        <option value="500GB">HD - 500GB</option>
        <option value="1TB">HD - 1TB</option>
        <option value="2TB">HD - 2TB</option>
      </Select>

      {/* Formulário de Instalação */}
      <h2>Instalação</h2>
      <Select value={formData.cabeamento} onChange={(e) => setFormData({ ...formData, cabeamento: e.target.value })}>
        <option value="UTP">Cabo UTP</option>
        <option value="Coaxial">Cabo Coaxial</option>
      </Select>
      <Input type="number" placeholder="Metros de Cabo" min="1" value={formData.metrosCabo} onChange={(e) => setFormData({ ...formData, metrosCabo: parseInt(e.target.value) })} />
      <Select value={formData.nobreak} onChange={(e) => setFormData({ ...formData, nobreak: e.target.value })}>
        <option value="Sim">Com Nobreak</option>
        <option value="Não">Sem Nobreak</option>
      </Select>

      {/* Formulário de Extras */}
      <h2>Extras</h2>
      <Input type="text" placeholder="Acessórios (Fonte, Conectores, etc.)" value={formData.acessorios} onChange={(e) => setFormData({ ...formData, acessorios: e.target.value })} />
      <Select value={formData.garantia} onChange={(e) => setFormData({ ...formData, garantia: e.target.value })}>
        <option value="1 Ano">1 Ano</option>
        <option value="2 Anos">2 Anos</option>
      </Select>
      <Input type="text" placeholder="Observações" value={formData.observacoes} onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })} />

      <Button onClick={calcularOrcamento}>Calcular Orçamento</Button>

      {total > 0 && (
        <>
          <Button onClick={visualizarPDF}>Visualizar PDF</Button>
          <Button onClick={enviarWhatsApp} style={{ background: "#25D366" }}>Enviar pelo WhatsApp</Button>
        </>
      )}
    </Container>
  );
};

export default Orcamento;
