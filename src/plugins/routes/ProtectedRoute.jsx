import { useSelector } from "react-redux";

import { Navigate, Outlet, useLocation, matchRoutes } from "react-router-dom";
import DefaultLayout from '@/pages/admin/layout/defaultlayout.jsx'
import { red } from "@mui/material/colors";
import routes from '@/plugins/routes/index.jsx';

const ProtectedRoute = () => {
    const { user, token, roles } = useSelector((state) => state.auth)
    const { role_auth, permission_role } = useSelector((state) => state.global)
    if (!token) return <Navigate to='/auth/login' replace></Navigate>
    const matches = matchRoutes(routes, location);

    const permissions = roles.length > 0 ? permission_role[roles[0]] : []
    // old authorisation -- check by role  
    // const location = useLocation();
    // let allowedRoles = role_auth[location.pathname];

    // if (!roles || !allowedRoles ||  !allowedRoles.some(role => roles.includes(role)))
    //     return <Navigate to='/auth/unauthorized' replace></Navigate>

    // check permission
    console.log('matches ==> ', matches)
    const currentRoute = matches[matches.length - 1]?.route;
    const requiredPermissions = currentRoute?.handle?.permissions ?? [];

    const hasPermission =
        requiredPermissions.length === 0 ||
        requiredPermissions.some(
            permission =>
                permissions.includes(permission)
        );


    return (
        <div className="">
            <div className="d-flex" style={{ minHeight: "100vh", minWidth: "max-content" }}>
                <DefaultLayout content={<Outlet />} />
            </div>
        </div>
    )
}

export default ProtectedRoute