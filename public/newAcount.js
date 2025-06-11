document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.querySelector('input[name="nome"]').value.trim();
  const email = document.querySelector('input[name="email"]').value.trim();
  const senha = document.querySelector('input[name="senha"]').value.trim();
  const telefone = document
    .querySelector('input[name="telefone"]')
    .value.trim();

  try {
    const res = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha, telefone }),
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message);
      window.location.href = "index.html";
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.error("Erro ao registrar:", error);
    alert("Erro de conexão com o servidor.");
  }
});
