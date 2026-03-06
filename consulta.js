document.addEventListener("DOMContentLoaded", function () {

    let alunoAtual = null; // guarda o aluno consultado

    // ================= CONSULTA =================
    window.consultar = function () {

        const numero = document.getElementById("numero").value.trim();
        const resultado = document.getElementById("resultado");

        if (numero === "") {
            resultado.style.color = "red";
            resultado.innerHTML = "⚠️ Digite o número de inscrição.";
            return;
        }

        const inscritos = JSON.parse(localStorage.getItem("inscritos")) || [];

        alunoAtual = inscritos.find(a => a.numero === numero);

        if (!alunoAtual) {
            resultado.style.color = "red";
            resultado.innerHTML = "❌ Inscrição não encontrada.";
            return;
        }

        resultado.style.color = "green";
        resultado.innerHTML = `
            <strong>INSCRIÇÃO CONFIRMADA</strong><br><br>
            <strong>Nome:</strong> ${alunoAtual.nome}<br>
            <strong>Nascimento:</strong> ${alunoAtual.nascimento}<br>
            <strong>BI:</strong> ${alunoAtual.bi}<br>
            <strong>Curso:</strong> ${alunoAtual.curso}<br>
            <strong>Classe:</strong> ${alunoAtual.classe}<br>
            <strong>Nº de Inscrição:</strong> ${alunoAtual.numero}<br>
            <strong>Data:</strong> ${alunoAtual.data}
        `;
    };

    // ================= PDF INDIVIDUAL =================
    window.baixarComprovativo = function () {

        if (!alunoAtual) {
            alert("⚠️ Faça primeiro a consulta da inscrição.");
            return;
        }

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();

        // ===== LOGOTIPO =====
        const logo = new Image();
        logo.src = "Ícone do IPIKK~3.jpg"; // nome do ficheiro do logotipo

        logo.onload = function () {

            pdf.addImage(logo, "JPG", 85, 10, 40, 40);

            // ===== CABEÇALHO =====
            pdf.setFont("times", "bold");
            pdf.setFontSize(14);
            pdf.text(
                "INSTITUTO POLITÉCNICO INDUSTRIAL DO KILAMBA-KIAXI\n“NOVA VIDA” Nº 8056",
                105,
                60,
                { align: "center" }
            );

            pdf.setFontSize(12);
            pdf.text("COMPROVATIVO DE INSCRIÇÃO", 105, 75, { align: "center" });

            pdf.line(20, 80, 190, 80);

            // ===== DADOS DO ALUNO =====
            pdf.setFont("times", "normal");
            pdf.setFontSize(11);

            let y = 95;
            pdf.text(`Nome Completo: ${alunoAtual.nome}`, 20, y); y += 10;
            pdf.text(`Data de Nascimento: ${alunoAtual.nascimento}`, 20, y); y += 10;
            pdf.text(`Nº do BI: ${alunoAtual.bi}`, 20, y); y += 10;
            pdf.text(`Curso: ${alunoAtual.curso}`, 20, y); y += 10;
            pdf.text(`Classe: ${alunoAtual.classe}`, 20, y); y += 10;
            pdf.text(`Número de Inscrição: ${alunoAtual.numero}`, 20, y); y += 10;
            pdf.text(`Data da Inscrição: ${alunoAtual.data}`, 20, y);

            // ===== TEXTO OFICIAL =====
            y += 15;
            pdf.text(
                "Declara-se que o(a) candidato(a) acima identificado(a)\n" +
                "realizou a sua inscrição neste Instituto para o ano letivo corrente.",
                20,
                y
            );

            // ===== ASSINATURAS =====
            y += 35;
            pdf.line(20, y, 80, y);
            pdf.text("Assinatura", 35, y + 6);

            pdf.line(120, y, 190, y);
            pdf.text("Carimbo", 145, y + 6);

            // ===== RODAPÉ =====
            pdf.setFontSize(9);
            pdf.text(
                "Documento gerado eletronicamente • IPIKK",
                105,
                285,
                { align: "center" }
            );

            // ===== DOWNLOAD =====
            pdf.save(`Comprovativo_${alunoAtual.numero}.pdf`);
        };
    };

});