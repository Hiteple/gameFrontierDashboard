import React, {Component} from 'react';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      usuarios: [],
      admins: [],
      productos: [],
      newsletters: [],
      categorias: [],
      ultimoProducto: {}
    }
  }
  baseUrl = `http://localhost:3000/api`;

  componentDidMount() {
    const usuarios = () => {
      return new Promise((resolve, reject) => {
        fetch(`${this.baseUrl}/usuarios`)
            .then(response => response.json())
            .then(data => resolve(data))
      })
    }
    const admins = () => {
      return new Promise((resolve, reject) => {
        fetch(`${this.baseUrl}/admins`)
            .then(response => response.json())
            .then(data => resolve(data))
      })
    }
    const productos = () => {
      return new Promise((resolve, reject) => {
        fetch(`${this.baseUrl}/productos`)
            .then(response => response.json())
            .then(data => resolve(data))
      })
    }
    const newsletters = () => {
      return new Promise((resolve, reject) => {
        fetch(`${this.baseUrl}/newsletters`)
            .then(response => response.json())
            .then(data => resolve(data))
      })
    }
    const categorias = () => {
      return new Promise((resolve, reject) => {
        fetch(`${this.baseUrl}/categorias`)
            .then(response => response.json())
            .then(data => resolve(data))
      })
    }

    Promise.all([usuarios(), admins(), productos(), newsletters(), categorias()])
        .then(responses => {
          console.log(responses)
          this.setState({
            usuarios: responses[0],
            admins: responses[1],
            productos: responses[2],
            newsletters: responses[3],
            categorias: responses[4]
          });

          // Al final, obtener el ultimo
          this.obtenerUltimoProducto();
        })
  }

  obtenerUltimoProducto() {
    const ultimoProducto = this.state.productos.filter(producto => {
      return this.state.productos.indexOf(producto) === this.state.productos.length - 1;
    })
    this.setState({ultimoProducto: ultimoProducto[0]});
  }

  render() {
    return (
        <div id="wrapper">
          <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            {/*<!-- Sidebar - Brand -->*/}
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
              <div className="sidebar-brand-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <div className="sidebar-brand-text mx-3">Admin</div>
            </a>

            {/*<!-- Divider -->*/}
            <hr className="sidebar-divider my-0" />

            {/*<!-- Nav Item - Dashboard -->*/}
            <li className="nav-item active">
              <a className="nav-link" href="/">
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span></a>
            </li>

            {/*<!-- Divider -->*/}
            <hr className="sidebar-divider" />

            {/*<!-- Heading -->*/}
            <div className="sidebar-heading">Actions</div>

            {/*<!-- Nav Item - Pages -->*/}
            <li className="nav-item">
              <a className="nav-link collapsed" href="/">
                <i className="fas fa-fw fa-folder"></i>
                <span>Pages</span>
              </a>
            </li>

            {/*<!-- Nav Item - Charts -->*/}
            <li className="nav-item">
              <a className="nav-link" href="/">
                <i className="fas fa-fw fa-chart-area"></i>
                <span>Charts</span></a>
            </li>

            {/*<!-- Nav Item - Tables -->*/}
            <li className="nav-item">
              <a className="nav-link" href="/">
                <i className="fas fa-fw fa-table"></i>
                <span>Tables</span></a>
            </li>

            {/*<!-- Divider -->*/}
            <hr className="sidebar-divider d-none d-md-block" />
          </ul>
          {/*<!-- End of Sidebar -->*/}

          {/*<!-- Content Wrapper -->*/}
          <div id="content-wrapper" className="d-flex flex-column">

            {/*<!-- Main Content -->*/}
            <div id="content">

              {/*<!-- Topbar -->*/}
              <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                {/*<!-- Sidebar Toggle (Topbar) -->*/}
                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                  <i className="fa fa-bars"></i>
                </button>

                {/*<!-- Topbar Navbar -->*/}
                <ul className="navbar-nav ml-auto">

                  {/*<!-- Nav Item - Alerts -->*/}
                  <li className="nav-item dropdown no-arrow mx-1">
                    <a className="nav-link dropdown-toggle" href="/" id="alertsDropdown">
                      <i className="fas fa-bell fa-fw"></i>
                      {/*<!-- Counter - Alerts -->*/}
                      <span className="badge badge-danger badge-counter">3+</span>
                    </a>
                  </li>

                  {/*<!-- Nav Item - Messages -->*/}
                  <li className="nav-item dropdown no-arrow mx-1">
                    <a className="nav-link dropdown-toggle" href="/" id="messagesDropdown">
                      <i className="fas fa-envelope fa-fw"></i>
                      {/*<!-- Counter - Messages -->*/}
                      <span className="badge badge-danger badge-counter">7</span>
                    </a>
                  </li>

                  <div className="topbar-divider d-none d-sm-block"></div>

                  {/*<!-- Nav Item - User Information -->*/}
                  <li className="nav-item dropdown no-arrow">
                    <a className="nav-link dropdown-toggle" href="/" id="userDropdown">
                      <span className="mr-2 d-none d-lg-inline text-gray-600 small">Walter White</span>
                      <img className="img-profile rounded-circle" src="assets/images/dummy-avatar.jpg" width="60" alt="profile avatar"/>
                    </a>
                  </li>

                </ul>

              </nav>
              {/*<!-- End of Topbar -->*/}

              {/*<!-- Begin Page Content -->*/}
              <div className="container-fluid">

                {/*<!-- Page Heading -->*/}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                  <h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
                </div>

                {/*<!-- Content Row -->*/}
                <div className="row">
                  {/*<!-- Amount of Products in DB -->*/}
                  <div className="col-md-3 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1"> Products in Data
                              Base
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.productos.length}</div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*<!-- $$$ of all products in DB -->*/}
                  <div className="col-md-3 mb-4">
                    <div className="card border-left-success shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-success text-uppercase mb-1"> Amount in
                              products
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.productos.reduce((total, acum) => {
                              return `$${total + acum.precio}`;
                            }, 0)}</div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*<!-- Amount of users in DB -->*/}
                  <div className="col-md-3 mb-4">
                    <div className="card border-left-warning shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">Users quantity
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.usuarios.length}</div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-user-check fa-2x text-gray-300"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Amount of admins in DB */}
                  <div className="col-md-3 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Admins quantity
                            </div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.admins.length}</div>
                          </div>
                          <div className="col-auto">
                            <i className="fas fa-user-check fa-2x text-gray-300"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/*<!-- Content Row -->*/}
                <div className="row">
                  {/*<!-- Last Product in DB -->*/}
                  <div className="col-lg-6 mb-4">
                    <div className="card shadow mb-4">
                      <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Last product in Data Dase</h6>
                      </div>
                      <div className="card-body">
                        <div className="text-center">
                          <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: '25rem'}}
                               src="assets/images/product_dummy.svg" alt="Dummy logo" />
                        </div>
                        {this.state.ultimoProducto && <p>{this.state.ultimoProducto.descripcion}</p>}
                        <a target="_blank" rel="nofollow" href="/">View product detail</a>
                      </div>
                    </div>
                  </div>

                  {/*<!-- Categories in DB -->*/}
                  <div className="col-lg-6 mb-4">
                    <div className="card shadow mb-4">
                      <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Categories in Data Base</h6>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          {this.state.categorias.map(categoria => {
                            return (
                                <div className="col-lg-6 mb-4" key={categoria.id}>
                                  <div className="card bg-info text-white shadow">
                                    <div className="card-body">
                                      {categoria.nombre}
                                    </div>
                                  </div>
                                </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/*<!-- PRODUCTS LIST -->*/}
                <h1 className="h3 mb-2 text-gray-800">All the products in the Database</h1>

                {/*<!-- DataTales Example -->*/}
                <div className="card shadow mb-4">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                        <tr>
                          <th>Name</th>
                          <th>Description</th>
                          <th>Price</th>
                          <th>Categories</th>
                          <th>Stock</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.productos.map(producto => {
                          return(
                              <tr key={producto.id}>
                                <td>{producto.nombre}</td>
                                <td>{producto.descripcion}</td>
                                <td>${producto.precio}</td>
                                <td>
                                  {producto.categoriaId}
                                </td>
                                <td>pendiente</td>
                              </tr>
                          )
                        })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              {/*<!-- /.container-fluid -->*/}
            </div>
            {/*<!-- End of Main Content -->*/}

            {/*<!-- Footer -->*/}
            <footer className="sticky-footer bg-white">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  <span>Copyright &copy; Dashboard 2020</span>
                </div>
              </div>
            </footer>
            {/*<!-- End of Footer -->*/}

          </div>
          {/*<!-- End of Content Wrapper -->*/}
        </div>
    )
  }
}
