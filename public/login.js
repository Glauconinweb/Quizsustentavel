document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.querySelector('input[name="email"]').value.trim();
  const senha = document.querySelector('input[name="senha"]').value.trim();

  try {
    const resposta = await fetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      alert(dados.error || "Erro ao fazer login.");
      return;
    }

    sessionStorage.setItem("token", dados.token);
    sessionStorage.setItem(
      "usuarioLogado",
      JSON.stringify(dados.usuario || {})
    );
    window.location.href = "areaQuiz/home.html";
  } catch (erro) {
    alert("Erro de conexão com o servidor.");
  }
});
