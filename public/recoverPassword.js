document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.querySelector('input[name="email"]').value.trim();
  const novaSenha = document
    .querySelector('input[name="novaSenha"]')
    .value.trim();

  try {
    const res = await fetch("http://localhost:3000/auth/trocar-senha", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, novaSenha }),
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message);
      window.location.href = "index.html";
    } else {
      alert(data.error);
    }
  } catch (error) {
    alert("Erro de conexão com o servidor.");
  }
});
