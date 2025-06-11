const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = form.email.value.trim();
  const senha = form.senha.value.trim();

  try {
    const resposta = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, senha }),
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      alert(dados.error || "Erro ao fazer login.");
      return;
    }

    // Salva token e usuário no sessionStorage
    sessionStorage.setItem("token", dados.token);
    sessionStorage.setItem(
      "usuarioLogado",
      JSON.stringify(dados.usuario || {})
    );

    // Redireciona para a home do quiz
    window.location.href = "areaQuiz/home.html";
  } catch (erro) {
    console.error("Erro ao fazer login:", erro);
    alert("Erro de conexão com o servidor.");
  }
});
