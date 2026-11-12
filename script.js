
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

const archiveModal = document.getElementById("archiveModal");
const loginModal = document.getElementById("loginModal");

const loginForm = document.getElementById("loginForm");
const username = document.getElementById("username");
const password = document.getElementById("password");
const loginMessage = document.getElementById("loginMessage");
const togglePassword = document.getElementById("togglePassword");

// Tahun otomatis pada footer
document.getElementById("year").textContent =
  new Date().getFullYear();

// Membuka pop-up
function openModal(dialog) {
  if (archiveModal.open) {
    archiveModal.close();
  }

  if (loginModal.open) {
    loginModal.close();
  }

  dialog.showModal();
  document.body.classList.add("modal-open");
}

// Menutup pop-up
function closeModal(dialog) {
  if (dialog && dialog.open) {
    dialog.close();
  }

  if (!archiveModal.open && !loginModal.open) {
    document.body.classList.remove("modal-open");
  }
}

// Tombol layanan kearsipan
document.querySelectorAll("[data-open-archive]").forEach((button) => {
  button.addEventListener("click", () => {
    openModal(archiveModal);
  });
});

// Tombol login
document.querySelectorAll("[data-open-login]").forEach((button) => {
  button.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");

    openModal(loginModal);
  });
});

// Semua tombol tutup pop-up
document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => {
    closeModal(button.closest("dialog"));
  });
});

// Tutup pop-up jika area luar diklik
[archiveModal, loginModal].forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      closeModal(dialog);
    }
  });

  dialog.addEventListener("close", () => {
    if (!archiveModal.open && !loginModal.open) {
      document.body.classList.remove("modal-open");
    }
  });
});

// Navigasi mobile
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");

  menuToggle.setAttribute(
    "aria-expanded",
    String(isOpen)
  );

  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Tutup navigasi" : "Buka navigasi"
  );
});

// Tutup navigasi setelah tautan dipilih
mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Efek navigasi aktif ketika halaman digulir
const sections = [
  ...document.querySelectorAll("main section[id]")
];

const navLinks = [
  ...document.querySelectorAll(".nav-link")
];

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const activeLink = navLinks.find((link) => {
          return link.getAttribute("href") ===
            `#${entry.target.id}`;
        });

        if (activeLink) {
          navLinks.forEach((link) => {
            link.classList.remove("active");
          });

          activeLink.classList.add("active");
        }
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px"
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
}

// Tampilkan atau sembunyikan password
togglePassword.addEventListener("click", () => {
  const showPassword = password.type === "password";

  password.type = showPassword ? "text" : "password";

  togglePassword.textContent = showPassword
    ? "Sembunyikan"
    : "Lihat";
});

// Form login demo
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const userValue = username.value.trim();
  const passwordValue = password.value;

  if (!userValue || !passwordValue) {
    loginMessage.textContent =
      "Username/email dan password wajib diisi.";

    return;
  }

const selectedRole = document.querySelector(
  'input[name="role"]:checked'
);

if (!selectedRole) {
  alert("Silakan pilih role terlebih dahulu.");
  return;
}

const role = selectedRole.value;

// Password yang telah diatur dari Profil Pengguna wajib cocok.
  // Username sengaja tidak divalidasi sesuai kebutuhan demo.
  let savedPassword = "";
  try { savedPassword = localStorage.getItem("siadPassword_" + role.toLowerCase()) || ""; } catch (error) {}
  if (savedPassword && passwordValue !== savedPassword) {
    loginMessage.textContent = "Password salah. Gunakan password yang sudah diatur pada Profil Pengguna.";
    password.focus();
    return;
  }

  sessionStorage.setItem("siadRole", role);
  sessionStorage.setItem("siadUsername", userValue);
  sessionStorage.setItem("siadDemoSession", "active");
  loginMessage.textContent = "Login demo berhasil. Membuka dashboard SIAD...";
  window.location.href = "siad/index.html";
});

// Animasi scroll untuk tautan internal
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (targetId.length <= 1) return;

    const target = document.querySelector(targetId);

    if (target) {
      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      history.replaceState(null, "", targetId);
    }
  });
});
