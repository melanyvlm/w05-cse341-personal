// 🌐 Cambia esta URL si estás en Render:
// const API_URL = "http://localhost:8080/contacts";
const API_URL = "https://cse341-val.onrender.com/contacts";

document.getElementById("loadContactsBtn").addEventListener("click", loadContacts);
document.getElementById("contactForm").addEventListener("submit", addContact);

async function loadContacts() {
  try {
    const res = await fetch(API_URL);
    const contacts = await res.json();

    const list = document.getElementById("contactList");
    list.innerHTML = "";

    contacts.forEach((c) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div>
          <strong>${c.firstName} ${c.lastName}</strong><br>
          📧 ${c.email}<br>
          🎨 ${c.favoriteColor}<br>
          🎂 ${c.birthday}
        </div>
        <div>
          <button onclick="deleteContact('${c._id}')">🗑️</button>
        </div>
      `;
      list.appendChild(li);
    });
  } catch (err) {
    alert("Error al cargar los contactos ❌");
    console.error(err);
  }
}

async function addContact(e) {
  e.preventDefault();

  const newContact = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    favoriteColor: document.getElementById("favoriteColor").value,
    birthday: document.getElementById("birthday").value,
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newContact),
    });

    if (res.ok) {
      alert("✅ Contacto agregado");
      loadContacts();
      document.getElementById("contactForm").reset();
    } else {
      alert("❌ Error al agregar el contacto");
    }
  } catch (err) {
    console.error(err);
  }
}

async function deleteContact(id) {
  if (!confirm("¿Seguro que quieres eliminar este contacto?")) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (res.ok) {
      alert("🗑️ Contacto eliminado");
      loadContacts();
    } else {
      alert("❌ Error al eliminar el contacto");
    }
  } catch (err) {
    console.error(err);
  }
}
