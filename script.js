document.getElementById('producaoForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Cria elemento temporário para captura
    const captureDiv = document.createElement('div');
    captureDiv.className = 'capture-container'; // Adiciona a classe nova
    captureDiv.innerHTML = `
        <h2>Resultado de Produção</h2>
       <p><strong>Processo:</strong> ${document.getElementById('Processo').value}</p>
       <p><strong>Marca:</strong> ${document.getElementById('Marca').value}</p>
        <p><strong>Turno:</strong> ${document.getElementById('turno').value}</p>
        <p><strong>Meta:</strong> ${document.getElementById('meta').value} </p>
        <p><strong>Realizado:</strong> ${document.getElementById('realizado').value} </p>
        <p><strong>Eficiência:</strong> ${document.getElementById('eficiencia').value}</p>
        <p><strong>Motivo:</strong> ${document.getElementById('Motivo').value}</p>
    `;

    document.body.appendChild(captureDiv);

    try {
        // Captura a imagem com configurações otimizadas
        const canvas = await html2canvas(captureDiv, {
            scale: 2, // Melhora a qualidade da imagem
            logging: false, // Desativa logs no console
            useCORS: true,
            width: captureDiv.scrollWidth,
            height: captureDiv.scrollHeight,
            windowWidth: captureDiv.scrollWidth,
            windowHeight: captureDiv.scrollHeight
        });
        
        const imgData = canvas.toDataURL('image/png');
        
        // Configura o modal
        const modal = document.getElementById('shareModal');
        const sharedImage = document.getElementById('sharedImage');
        const downloadBtn = document.getElementById('downloadBtn');
        const whatsappBtn = document.getElementById('whatsappBtn');

        sharedImage.src = imgData;
        downloadBtn.href = imgData;


        // ... (código de compartilhamento do WhatsApp)

        const textoCompartilhamento = `Confira meu resultado de produção! 
        Processo: ${document.getElementById('Processo').value} 
        Marca: ${document.getElementById('Marca').value}  
        Turno: ${document.getElementById('turno').value} 
        Meta: ${document.getElementById('meta').value}  
        Realizado: ${document.getElementById('realizado').value}  
        Eficiência: ${document.getElementById('eficiencia').value}
        Motivo: ${document.getElementById('Motivo').value}`;

        
        whatsappBtn.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(textoCompartilhamento)}`;        


    } catch (error) {
        console.error('Erro ao gerar imagem:', error);
        alert('Erro ao gerar imagem!');
    } finally {
        document.body.removeChild(captureDiv);
    }
});



// Função para cálculo de eficiência
function calcularEficiencia() {
    const meta = parseFloat(document.getElementById('meta').value) || 0;
    const realizado = parseFloat(document.getElementById('realizado').value) || 0;
    
    if (meta > 0) {
        const eficiencia = (realizado / meta * 100).toFixed(2);
        document.getElementById('eficiencia').value = `${eficiencia}%`;
    } else {
        document.getElementById('eficiencia').value = "";
    }
}

// Event listeners para cálculo automático
document.getElementById('meta').addEventListener('input', calcularEficiencia);
document.getElementById('realizado').addEventListener('input', calcularEficiencia);

// Fecha modal ao clicar fora
window.onclick = function(event) {
    const modal = document.getElementById('shareModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}