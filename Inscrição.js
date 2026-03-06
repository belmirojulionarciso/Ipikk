document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("formInscricao");
    const msg = document.getElementById("msg");

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        // ===== CAPTURAR DADOS =====
        const nome = form.nome.value.trim();
        const nascimento = form.nascimento.value;
        const bi = form.bi.value.trim();
        const curso = form.curso.value;
        const classe = form.classe.value;

        if (!nome || !nascimento || !bi || !curso || !classe) {
            msg.style.color = "red";
            msg.innerHTML = "⚠️ Preencha todos os campos.";
            return;
        }

        // ===== GERAR NÚMERO DE INSCRIÇÃO =====
        const numero = "IPIKK" + Math.floor(100000 + Math.random() * 900000);

        // ===== DATA =====
        const data = new Date().toLocaleDateString("pt-PT");

        // ===== OBJETO DO ALUNO =====
        const aluno = {
            numero: numero,
            nome: nome,
            nascimento: nascimento,
            bi: bi,
            curso: curso,
            classe: classe,
            data: data
        };

        // ===== GUARDAR NO LOCALSTORAGE =====
        let inscritos = JSON.parse(localStorage.getItem("inscritos")) || [];

        inscritos.push(aluno);

        localStorage.setItem("inscritos", JSON.stringify(inscritos));

        // ===== MENSAGEM =====
        document.getElementById("msg").className = "erro";
        document.getElementById("msg").innerHTML = "Erro ao enviar inscrição!";
        msg.style.color = "green";
        msg.innerHTML = `
            ✅ Inscrição enviada com sucesso! <br><br>
            <strong>Número de Inscrição:</strong> ${numero}<br>
            Guarde este número para consultar a candidatura.
        `;

        // ===== LIMPAR FORMULÁRIO =====
        form.reset();

    });

});