// DefaultLayout.jsx

import { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "@/components/admin/sidebar.jsx";
import Navbar from "@/components/admin/navbar.jsx";

export default function DefaultLayout({ content }) {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Box sx={{ display: "flex", minHeight: "200vh", minWidth: "max-content" }}>

            <Sidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />
            <Box
                sx={{
                    minHeight: "100vh",
                    minWidth: `calc(100vw - ${collapsed ? "95px" : "290px"})`,
                    position: "relative",
                }}
            >
                <div
                     >
                    <Navbar collapsed={collapsed} />
                </div>
                <div className="px-3" style={{ marginTop: "75px" }} >
                    {content}
                </div>

            </Box>
        </Box>
    );
}