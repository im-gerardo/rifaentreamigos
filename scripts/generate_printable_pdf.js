const fs = require('fs');
const path = require('path');
const { chromium } = require('@playwright/test');

// Cargar manifest de boletos
const manifestPath = path.join(__dirname, '..', 'public', 'tickets-manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

// Convertir foto limpia a base64
const motoPath = path.join(__dirname, '..', 'public', 'moto.jpg');
const motoBase64 = fs.existsSync(motoPath)
  ? `data:image/jpeg;base64,${fs.readFileSync(motoPath).toString('base64')}`
  : '';

// Función de folio oficial con letras
function getLetterFolio(folioNum) {
  const series = folioNum <= 100 ? '1' : '2';
  const offset = Math.max(0, (folioNum - 1) % 100);
  const first = Math.floor(offset / 26);
  const second = offset % 26;
  return `${series}A${String.fromCharCode(65 + first)}${String.fromCharCode(65 + second)}`;
}

// Generar HTML de un boleto (FRENTE)
function renderBoletoFrente(ticket) {
  const folioNum = parseInt(ticket.folio, 10);
  const letterCode = getLetterFolio(folioNum);
  const paddedFolio = String(folioNum).padStart(3, '0');

  return `
    <div class="ticket-row">
      <!-- TALON DESPRENDIBLE (IZQUIERDA: AMPLIO PARA NOMBRE COMPLETO) -->
      <div class="ticket-stub">
        <div class="stub-header">
          <div class="stub-brand-badge">RIFA ENTRE AMIGOS</div>
          <div class="stub-moto-tag">Bajaj Pulsar N250 • 2026</div>
        </div>

        <div class="stub-folio-badge">
          FOLIO: <strong>${letterCode}</strong> <span class="sub-num">(${paddedFolio})</span>
        </div>

        <div class="stub-fields">
          <div class="field-group">
            <span class="field-label">Nombre(s) y Apellidos:</span>
            <div class="field-line"></div>
            <div class="field-line" style="margin-top: 5px;"></div>
          </div>
          <div class="field-group" style="margin-top: 5px;">
            <span class="field-label">WhatsApp / Celular (10 dígitos):</span>
            <div class="field-line"></div>
          </div>
        </div>

        <div class="stub-numbers-box">
          <span class="numbers-label">TUS 5 OPORTUNIDADES:</span>
          <div class="stub-numbers-grid">
            ${ticket.numbers.map(n => `<span class="num-chip">${n}</span>`).join('')}
          </div>
        </div>
      </div>

      <!-- LINEA DE CORTE PUNTEADA -->
      <div class="cut-line">
        <span class="cut-scissors">✂</span>
      </div>

      <!-- CUERPO PRINCIPAL DEL BOLETO (DERECHA) -->
      <div class="ticket-body">
        <div class="body-top">
          <div class="body-brand">
            <div class="body-brand-header">
              <span class="brand-badge-star">★ ★ ★</span>
              <span class="brand-logo-text">RIFA ENTRE AMIGOS</span>
              <span class="brand-badge-star">★ ★ ★</span>
            </div>
            <div class="body-model-banner">
              <span class="model-name">Bajaj Pulsar N250</span>
              <span class="model-year">MODELO 2026</span>
            </div>
          </div>

          <div class="body-spec-list">
            <div class="spec-item"><span class="spec-dot">●</span> Seminueva (+3,000 km reales)</div>
            <div class="spec-item"><span class="spec-dot">●</span> Papeles en regla / Lista para plaquear</div>
            <div class="spec-item"><span class="spec-dot">●</span> Color oficial: Amarillo México</div>
          </div>
        </div>

        <div class="body-center">
          <div class="numbers-container">
            <div class="numbers-header-banner">TUS NÚMEROS DE PARTICIPACIÓN (5 OPORTUNIDADES):</div>
            <div class="numbers-five-row">
              ${ticket.numbers.map(n => `
                <div class="big-num-card">
                  <span class="big-num-val">${n}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="moto-photo-wrap">
            ${motoBase64 ? `<img src="${motoBase64}" class="moto-photo" alt="Bajaj Pulsar N250" />` : ''}
          </div>
        </div>

        <div class="body-bottom">
          <div class="sorteo-info-pill">
            <span class="info-icon">📅</span>
            <div>
              <div class="sorteo-label">SORTEO OFICIAL (LOTERÍA NACIONAL)</div>
              <div class="sorteo-date">12 de diciembre de 2026</div>
            </div>
          </div>

          <div class="price-badge">
            <span class="price-title">VALOR DEL BOLETO</span>
            <span class="price-val">$250 <span class="curr">MXN</span></span>
          </div>

          <div class="main-folio-card">
            <span class="main-folio-label">FOLIO OFICIAL</span>
            <span class="main-folio-code">${letterCode}</span>
            <span class="main-folio-alt">#${paddedFolio} / 200</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Generar HTML de un boleto (REVERSO)
function renderBoletoReverso(ticket) {
  const folioNum = parseInt(ticket.folio, 10);
  const letterCode = getLetterFolio(folioNum);
  const paddedFolio = String(folioNum).padStart(3, '0');

  return `
    <div class="ticket-row reverse-row">
      <!-- TALON TRASERO (CONTROL INTERNO VENDEDOR) -->
      <div class="ticket-stub-reverse">
        <div class="stub-rev-title">CONTROL INTERNO</div>
        <div class="stub-rev-folio">FOLIO ${letterCode} (${paddedFolio})</div>
        <div class="stub-rev-fields">
          <div class="rev-line-field">Vendedor: _______________________</div>
          <div class="rev-line-field">Fecha venta: _____/_____/2026</div>
          <div class="rev-line-field">Método: [ ] Efectivo  [ ] Transfer.</div>
          <div class="rev-line-field">Firma: __________________________</div>
        </div>
        <div class="stub-rev-note">
          * Este talón debe entregarse liquidado al 100% 24 horas antes del sorteo.
        </div>
      </div>

      <div class="cut-line"></div>

      <!-- BASES Y REGLAS OFICIALES (DERECHA) -->
      <div class="ticket-body-reverse">
        <div class="rev-header">
          <div class="rev-brand-wrap">
            <div class="rev-brand">RIFA ENTRE AMIGOS</div>
            <div class="rev-subbrand">Bajaj Pulsar N250 • MODELO 2026</div>
          </div>
          <div class="rev-rules-badge">BASES Y REGLAS OFICIALES</div>
        </div>

        <div class="rev-content">
          <div class="rev-rules-list">
            <div class="rule-entry">
              <span class="rule-bullet">✦</span>
              <p><strong>Premio:</strong> Motocicleta Bajaj Pulsar N250, seminueva con poco más de 3,000 km, modelo 2026, color amarillo con negro. Papeles en regla, lista para trámite de placas.</p>
            </div>
            <div class="rule-entry">
              <span class="rule-bullet">✦</span>
              <p><strong>Participación:</strong> Cada boleto otorga 5 números de 3 dígitos (del 000 al 999 sin repetición en toda la emisión de 200 boletos).</p>
            </div>
            <div class="rule-entry">
              <span class="rule-bullet">✦</span>
              <p><strong>Sorteo Oficial:</strong> Se determinará en combinación con el Primer Premio del sorteo oficial de la <strong>Lotería Nacional</strong> del día <strong>12 de diciembre de 2026</strong> (tomando las últimas 3 cifras).</p>
            </div>
            <div class="rule-entry">
              <span class="rule-bullet">✦</span>
              <p><strong>Ganador:</strong> Resultará ganador el tenedor del boleto que coincida en cualquiera de sus 5 números con las últimas 3 cifras del 1er premio.</p>
            </div>
            <div class="rule-entry">
              <span class="rule-bullet">✦</span>
              <p><strong>Condición de Pago:</strong> El boleto debe encontrarse <strong>liquidado al 100%</strong> a más tardar 24 horas antes del sorteo (11 de diciembre de 2026 a las 20:00 hrs). Boleto no liquidado queda anulado.</p>
            </div>
            <div class="rule-entry highlight-rule">
              <span class="rule-bullet">✦</span>
              <p><strong>Venta Total y Aplazamiento:</strong> La rifa se llevará a cabo habiéndose vendido y liquidado la totalidad de los 200 boletos. En caso de no completarse la venta al 100%, el sorteo se aplazará a una próxima fecha oficial del sorteo de la Lotería Nacional, la cual será notificada con anticipación a todos los compradores.</p>
            </div>
            <div class="rule-entry">
              <span class="rule-bullet">✦</span>
              <p><strong>Entrega:</strong> En León, Guanajuato en punto acordado con el ganador. Factura original endosada. Trámites de placas y cambio de propietario a cargo del ganador.</p>
            </div>
            <div class="rule-entry">
              <span class="rule-bullet">✦</span>
              <p><strong>Contacto Oficial WhatsApp:</strong> <strong>442 194 1930</strong> (exclusivamente mensajes para confirmación de pagos y dudas).</p>
            </div>
          </div>

          <div class="rev-footer-bar">
            <span>Boleto Oficial de Participación: <strong>${letterCode}</strong> (#${paddedFolio}/200)</span>
            <span>Consulta en línea: <strong>rifaentreamigos.ogba.space</strong></span>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Agrupar los 200 boletos en hojas de 4
const PAGE_SIZE = 4;
const pages = [];
for (let i = 0; i < manifest.tickets.length; i += PAGE_SIZE) {
  pages.push(manifest.tickets.slice(i, i + PAGE_SIZE));
}

let htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Boletos Oficiales - Rifa Entre Amigos 2026</title>
  <style>
    @page {
      size: letter portrait;
      margin: 8mm 6mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      background: #f8fafc;
      color: #0f172a;
    }
    .sheet-page {
      width: 200mm;
      height: 263mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      page-break-after: always;
      background: #fff;
    }

    /* FILA DE BOLETO */
    .ticket-row {
      width: 100%;
      height: 63.5mm;
      display: flex;
      border: 1px dashed #94a3b8;
      border-radius: 4px;
      overflow: hidden;
      background: #0b0e12;
      color: #fff;
      position: relative;
    }

    /* TALON (IZQUIERDA: 56mm) */
    .ticket-stub {
      width: 56mm;
      height: 100%;
      background: #141920;
      padding: 4mm 3.5mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-right: 1px dashed #64748b;
    }
    .stub-header .stub-brand-badge {
      font-size: 8.5pt;
      font-weight: 900;
      color: #ffd21a;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    .stub-header .stub-moto-tag {
      font-size: 6.5pt;
      color: #94a3b8;
      font-weight: 700;
    }
    .stub-folio-badge {
      background: #ffd21a;
      color: #000;
      font-size: 8.5pt;
      font-weight: 900;
      padding: 2.5px 6px;
      border-radius: 3px;
      text-align: center;
      margin: 2px 0;
    }
    .stub-folio-badge .sub-num {
      font-size: 7pt;
      color: #333;
    }
    .stub-fields .field-group {
      margin-bottom: 3px;
    }
    .stub-fields .field-label {
      font-size: 6pt;
      font-weight: 700;
      color: #cbd5e1;
      display: block;
      margin-bottom: 2px;
    }
    .stub-fields .field-line {
      height: 10px;
      border-bottom: 1px solid #475569;
    }
    .stub-numbers-box {
      background: #090c10;
      border: 1px solid #334155;
      border-radius: 3px;
      padding: 3px 4px;
      text-align: center;
    }
    .stub-numbers-box .numbers-label {
      font-size: 5.5pt;
      font-weight: 800;
      color: #ffd21a;
      display: block;
      margin-bottom: 2px;
    }
    .stub-numbers-grid {
      display: flex;
      justify-content: space-between;
    }
    .stub-numbers-grid .num-chip {
      background: #1e293b;
      color: #f8fafc;
      font-size: 7pt;
      font-weight: 800;
      font-family: monospace;
      padding: 1px 3px;
      border-radius: 2px;
      border: 1px solid #475569;
    }

    /* LINEA CORTE */
    .cut-line {
      width: 0;
      position: relative;
    }
    .cut-scissors {
      position: absolute;
      top: 50%;
      left: -6px;
      transform: translateY(-50%);
      font-size: 9pt;
      color: #94a3b8;
      background: #0b0e12;
      padding: 2px 0;
    }

    /* CUERPO PRINCIPAL (DERECHA: 144mm) */
    .ticket-body {
      flex: 1;
      height: 100%;
      background: linear-gradient(135deg, #11161d 0%, #080b0e 100%);
      padding: 4mm 5.5mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
    }
    .body-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 1px solid #232d3d;
      padding-bottom: 3px;
    }
    .body-brand-header {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .brand-badge-star {
      color: #ffd21a;
      font-size: 7pt;
    }
    .brand-logo-text {
      font-size: 13pt;
      font-weight: 900;
      color: #ffd21a;
      letter-spacing: -0.01em;
    }
    .body-model-banner {
      display: flex;
      align-items: baseline;
      gap: 6px;
      margin-top: 1px;
    }
    .model-name {
      font-size: 11pt;
      font-weight: 900;
      color: #ffffff;
      font-style: italic;
    }
    .model-year {
      font-size: 7pt;
      font-weight: 800;
      background: #ffd21a;
      color: #000;
      padding: 1px 5px;
      border-radius: 3px;
    }
    .body-spec-list {
      text-align: right;
      font-size: 6.5pt;
      color: #cbd5e1;
      line-height: 1.35;
    }
    .spec-dot {
      color: #ffd21a;
      font-size: 6pt;
    }

    /* CENTRO: NUMEROS Y FOTO */
    .body-center {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 1.5mm 0;
    }
    .numbers-container {
      flex: 1;
    }
    .numbers-header-banner {
      font-size: 6.5pt;
      font-weight: 800;
      color: #ffd21a;
      letter-spacing: 0.05em;
      margin-bottom: 3px;
    }
    .numbers-five-row {
      display: flex;
      gap: 3.5mm;
    }
    .big-num-card {
      background: #ffffff;
      color: #000000;
      padding: 3mm 2.5mm;
      border-radius: 4px;
      border: 2px solid #ffd21a;
      box-shadow: 0 2px 5px rgba(0,0,0,0.5);
      min-width: 14mm;
      text-align: center;
    }
    .big-num-val {
      font-size: 14pt;
      font-weight: 900;
      font-family: monospace;
      letter-spacing: 0.04em;
      display: block;
      line-height: 1;
    }
    .moto-photo-wrap {
      width: 48mm;
      height: 27mm;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 2mm;
      background: radial-gradient(circle, rgba(255, 210, 26, 0.15) 0%, rgba(0,0,0,0) 70%);
      border-radius: 6px;
    }
    .moto-photo {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      filter: drop-shadow(0 4px 8px rgba(0,0,0,0.6));
    }

    /* ABAJO: FECHA, PRECIO, FOLIO */
    .body-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #232d3d;
      padding-top: 3px;
    }
    .sorteo-info-pill {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .sorteo-info-pill .info-icon {
      font-size: 12pt;
    }
    .sorteo-label {
      font-size: 5.5pt;
      font-weight: 800;
      color: #94a3b8;
      letter-spacing: 0.04em;
    }
    .sorteo-date {
      font-size: 8pt;
      font-weight: 900;
      color: #ffd21a;
    }
    .price-badge {
      background: #ffd21a;
      color: #000;
      padding: 2.5px 8px;
      border-radius: 4px;
      text-align: center;
    }
    .price-title {
      font-size: 5.5pt;
      font-weight: 900;
      display: block;
      line-height: 1;
    }
    .price-val {
      font-size: 10.5pt;
      font-weight: 900;
      line-height: 1;
    }
    .price-val .curr {
      font-size: 6.5pt;
    }
    .main-folio-card {
      text-align: right;
    }
    .main-folio-label {
      font-size: 5.5pt;
      font-weight: 800;
      color: #94a3b8;
      display: block;
    }
    .main-folio-code {
      font-size: 12pt;
      font-weight: 900;
      color: #ffd21a;
      letter-spacing: 0.05em;
      line-height: 1;
      display: block;
    }
    .main-folio-alt {
      font-size: 6pt;
      color: #cbd5e1;
    }

    /* ESTILOS REVERSO */
    .reverse-row {
      background: #ffffff;
      color: #0f172a;
      border: 1px dashed #cbd5e1;
    }
    .ticket-stub-reverse {
      width: 56mm;
      height: 100%;
      background: #f1f5f9;
      padding: 4mm 3.5mm;
      border-right: 1px dashed #94a3b8;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .stub-rev-title {
      font-size: 8pt;
      font-weight: 900;
      color: #0f172a;
      border-bottom: 2px solid #ffd21a;
      padding-bottom: 2px;
    }
    .stub-rev-folio {
      font-size: 7.5pt;
      font-weight: 800;
      color: #b45309;
      margin: 3px 0 5px;
    }
    .stub-rev-fields .rev-line-field {
      font-size: 6pt;
      color: #334155;
      margin-bottom: 5px;
      font-family: monospace;
    }
    .stub-rev-note {
      font-size: 5.5pt;
      color: #64748b;
      font-style: italic;
      line-height: 1.2;
    }
    .ticket-body-reverse {
      flex: 1;
      height: 100%;
      padding: 3.5mm 5.5mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: #ffffff;
    }
    .rev-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #ffd21a;
      padding-bottom: 2px;
    }
    .rev-brand {
      font-size: 9.5pt;
      font-weight: 900;
      color: #0f172a;
    }
    .rev-subbrand {
      font-size: 6pt;
      font-weight: 700;
      color: #64748b;
    }
    .rev-rules-badge {
      background: #0f172a;
      color: #ffd21a;
      font-size: 6pt;
      font-weight: 900;
      padding: 2px 6px;
      border-radius: 3px;
      letter-spacing: 0.05em;
    }
    .rev-rules-list {
      display: flex;
      flex-direction: column;
      gap: 1.2mm;
      margin: 1.5mm 0;
    }
    .rule-entry {
      display: flex;
      align-items: flex-start;
      gap: 4px;
      font-size: 5.5pt;
      line-height: 1.3;
      color: #334155;
    }
    .rule-entry .rule-bullet {
      color: #d97706;
      font-size: 6pt;
      line-height: 1;
    }
    .highlight-rule {
      background: #fef3c7;
      border-left: 2px solid #d97706;
      padding: 2px 4px;
      border-radius: 2px;
    }
    .rev-footer-bar {
      display: flex;
      justify-content: space-between;
      font-size: 5.5pt;
      color: #64748b;
      border-top: 1px solid #e2e8f0;
      padding-top: 2px;
    }
  </style>
</head>
<body>
`;

// Insertar páginas: 1 página FRENTE y 1 página REVERSO por cada 4 boletos
pages.forEach((pageTickets, pageIdx) => {
  // PÁGINA FRENTE
  htmlContent += `\n<!-- PÁGINA ${pageIdx * 2 + 1}: FRENTE (BOLETOS ${pageIdx * 4 + 1} A ${pageIdx * 4 + pageTickets.length}) -->\n`;
  htmlContent += `<div class="sheet-page">\n`;
  pageTickets.forEach(ticket => {
    htmlContent += renderBoletoFrente(ticket);
  });
  htmlContent += `</div>\n`;

  // PÁGINA REVERSO (EN EL MISMO ORDEN VERTICAL PARA COINCIDIR EXACTO AL IMPRIMIR DUPLEX)
  htmlContent += `\n<!-- PÁGINA ${pageIdx * 2 + 2}: REVERSO -->\n`;
  htmlContent += `<div class="sheet-page">\n`;
  pageTickets.forEach(ticket => {
    htmlContent += renderBoletoReverso(ticket);
  });
  htmlContent += `</div>\n`;
});

htmlContent += `
</body>
</html>
`;

// Guardar archivo HTML y compilar PDF con Playwright
const tempHtmlPath = path.join(__dirname, '..', 'public', 'boletos-print-temp.html');
const outputPdfPath = path.join(__dirname, '..', 'public', 'boletos-oficiales-200.pdf');

fs.writeFileSync(tempHtmlPath, htmlContent, 'utf8');
console.log(`Archivo HTML generado con éxito en ${tempHtmlPath}`);

(async () => {
  console.log('Compilando PDF oficial a 300 DPI...');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(`file://${tempHtmlPath}`, { waitUntil: 'load' });

  await page.pdf({
    path: outputPdfPath,
    format: 'Letter',
    printBackground: true,
    margin: {
      top: '8mm',
      bottom: '8mm',
      left: '6mm',
      right: '6mm'
    }
  });

  await browser.close();
  console.log(`\n🎉 ¡PDF OFICIAL GENERADO EXITOSAMENTE!\nUbicación: ${outputPdfPath}`);
  const stats = fs.statSync(outputPdfPath);
  console.log(`Tamaño: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
})();
