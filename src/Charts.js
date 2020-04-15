import React, { PureComponent } from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import {Link} from "@reach/router";

const Charts = () => {
    const data = [
        {
            name: 'usuarios', pv: 2400,
        },
        {
            name: 'admins', pv: 2400,
        },
        {
            name: 'productos', pv: 2400,
        },
        {
            name: 'newsletters', pv: 2400,
        },
    ];
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
                        data={data}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" fill="#8884d8" />
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

export default Charts;
