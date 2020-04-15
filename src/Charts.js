import React, {Component} from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import {Link} from "@reach/router";

class Charts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usuarios: [],
            admins: [],
            productos: [],
            newsletters: [],
            categorias: [],
            ultimoProducto: {},
            cantidadTotal: 0,
            selectedItem: this.selectedItem,
            data: []
        }
    }

    baseUrl = `http://localhost:3000/api`;
    selectedItem = [];

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

                // Obtener el total
                this.obtenerTotal();

                // Al final, obtener el ultimo
                this.obtenerUltimoProducto();

                // Seteo variables
                this.setState({data: [
                    {
                        name: 'Usuarios', cantidades: this.state.usuarios.length,
                    },
                    {
                        name: 'Administradores', cantidades: this.state.admins.length,
                    },
                    {
                        name: 'Productos', cantidades: this.state.productos.length,
                    },
                    {
                        name: 'Newsletters', cantidades: this.state.newsletters.length,
                    },
                    {
                        name: 'Categorías', cantidades: this.state.categorias.length,
                    },
                ]})
            })
    }

    obtenerTotal() {
        const productos = this.state.productos;
        let cantidadTotal = 0;
        productos.forEach(producto => {
            return cantidadTotal += producto.precio;
        })

        this.setState({cantidadTotal});
    }

    obtenerUltimoProducto() {
        const ultimoProducto = this.state.productos.filter(producto => {
            return this.state.productos.indexOf(producto) === this.state.productos.length - 1;
        })
        this.setState({ultimoProducto: ultimoProducto[0]});
    }

    render (){
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
                        <Link className="nav-link" to="/">
                            <i className="fas fa-fw fa-tachometer-alt"></i>
                            <span>Dashboard</span>
                        </Link>
                    </li>

                    {/*<!-- Divider -->*/}
                    <hr className="sidebar-divider" />

                    {/*<!-- Heading -->*/}
                    <div className="sidebar-heading">Actions</div>

                    {/*<!-- Nav Item - Pages -->*/}
                    <li className="nav-item">
                        <Link className="nav-link collapsed" to="/soon">
                            <i className="fas fa-fw fa-folder"></i>
                            <span>Pages</span>
                        </Link>
                    </li>

                    {/*<!-- Nav Item - Charts -->*/}
                    <li className="nav-item">
                        <Link className="nav-link" to="/chart">
                            <i className="fas fa-fw fa-chart-area"></i>
                            <span>Charts</span>
                        </Link>
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
                <div id="content-wrapper" className="d-flex flex-column" style={{position: 'relative'}}>
                    <h1 style={{position: 'absolute', left: '50%', top: '10%', transform: 'translateX(-50%)'}}>Quantities in DB</h1>
                    <div id="content" style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                        <BarChart
                            width={900}
                            height={500}
                            data={this.state.data}
                            margin={{
                                top: 5, right: 30, left: 20, bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="2 2" />
                            <XAxis dataKey="name" />
                            <YAxis dataKey="cantidades"/>
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="cantidades" fill="#8884d8" />
                        </BarChart>
                    </div>

                    {/*<!-- Footer -->*/}
                    <footer className="sticky-footer bg-white" style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
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

export default Charts;
