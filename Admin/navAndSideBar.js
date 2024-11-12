async function navAndSideBar() {
    let adminId = localStorage.getItem("adminId");
    let request = await fetch(`https://localhost:44384/api/Admins/GetAdminNameAndImage/${adminId}`);
    let data = await request.json();
    let nav = document.getElementById("nav");
    nav.innerHTML = `
    <ul class="d-flex align-items-center">
          <li class="nav-item dropdown pe-3">
            <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
              <img src="assets/img/Admins/${data.adminImage}" alt="Profile" class="rounded-circle">
              <span class="d-none d-md-block dropdown-toggle ps-2">${data.adminName}</span>
            </a><!-- End Profile Iamge Icon -->
  
            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li class="dropdown-header" id="navAdminDropDown">
                <h6>${data.adminName}</h6>
                <span>${data.adminRole}</span>
              </li>
              <li>
                <hr class="dropdown-divider">
              </li>
  
              <li>
                <a class="dropdown-item d-flex align-items-center" href="users-profile.html">
                  <i class="bi bi-person"></i>
                  <span>My Profile</span>
                </a>
              </li>
              <li>
                <hr class="dropdown-divider">
              </li>
  
              <li>
                <a class="dropdown-item d-flex align-items-center" href="users-profile.html">
                  <i class="bi bi-gear"></i>
                  <span>Account Settings</span>
                </a>
              </li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li>
                <a class="dropdown-item d-flex align-items-center" href="index.html" onclick="logout()">
                  <i class="bi bi-box-arrow-right"></i>
                  <span>Log Out</span>
                </a>
              </li>
  
            </ul><!-- End Profile Dropdown Items -->
          </li><!-- End Profile Nav -->
  
        </ul>
    `; 
    let adminsli = document.getElementById('adminsli');
    if (data.adminRole === "Super Admin") {
      adminsli.style.display = "block";
    }
    }
    navAndSideBar()
    function logout() {
      localStorage.removeItem("adminId");
      localStorage.removeItem("Token");
      window.location.href = "index.html";
    }