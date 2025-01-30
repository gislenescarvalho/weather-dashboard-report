/* eslint-disable @typescript-eslint/no-explicit-any */
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const replaceSVGWithPNG = (element: HTMLElement) => {
  const images = element.querySelectorAll('img');
  images.forEach(img => {
    if (img.src.endsWith('.svg')) {
      img.src = img.src.replace('.svg', '.png'); // Substitui .svg por .png
    }
  });
};

export const generateHtmlToPdf = async (
  contentRef: { current: any },
  documentName = 'boletim.pdf',
  orientation = 'p' as const,
) => {
  if (!contentRef.current) return;

  // Substituir o componente <Image /> do Next.js por <img>
  replaceSVGWithPNG(contentRef.current);
  // p - modo retrato, l - modo paisagem
  const pdf = new jsPDF(orientation, 'mm', 'a4'); // Formato A4, modo retrato
  const pageHeight = pdf.internal.pageSize.getHeight();
  const pageWidth = pdf.internal.pageSize.getWidth();

  const content = contentRef.current;
  const sections = Array.from(content.querySelectorAll('[data-page-section]')); // Busca dinamicamente as seções
  let positionY = 10; // Posição inicial no topo da página

  for (const section of sections) {
    const canvas = await html2canvas(section as HTMLElement, {
      scale: 1,
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    const imgHeight = (canvas.height * (pageWidth - 20)) / canvas.width;

    // Verifica se a seção cabe na página atual
    if (positionY + imgHeight > pageHeight - 10) {
      pdf.addPage(); // Cria uma nova página
      positionY = 10; // Reinicia a posição vertical
    }

    // Adiciona a seção ao PDF
    pdf.addImage(
      imgData,
      'JPEG',
      10,
      positionY,
      pageWidth - 20,
      imgHeight,
      undefined,
      'SLOW',
    );
    positionY += imgHeight + 10; // Atualiza a posição vertical com uma margem extra
  }

  pdf.save(documentName); // Salva o PDF
};
