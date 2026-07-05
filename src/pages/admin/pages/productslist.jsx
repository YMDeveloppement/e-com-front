import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Avatar, Typography, Breadcrumbs, Link, Box, Button } from "@mui/material";
import axiosAdmin from '@/plugins/axiosAdmin';
import { useEffect, useState } from 'react';
import '@/assets/css/admin/productslist.scss';
import { Add } from '@mui/icons-material';

const dataGridColumns = [
  {
    field: "name",
    headerName: "Product",
    flex: 1.5,
    minWidth: 250,
    minHeight: 150,

    renderCell: (params) => (
      <div className="d-flex align-items-center gap-2 h-100">
        <Avatar
          src={params.row.image_url}
          alt={params.row.name}
          sx={{ bgcolor: "#ccc" }}
        />
        <div className="title-product ">
          <div className="fw-bold">{params.row.name} : </div>
          <div>{params.row.category}</div>
        </div>
      </div>
    ),
  },
  {
    field: "brand",
    headerName: "Brand",
    minWidth: 150,
    align: "center",
    headerAlign: "center",
  },

  {
    field: "slug",
    headerName: "Slug",
    minWidth: 200,
  },

  {
    field: "short_desc",
    headerName: "Description",
    minWidth: 250,
    flex: 1,
  },

  {
    field: "base_price",
    headerName: "Base Price",
    minWidth: 120,
    type: "number",
    align: "right",
    headerAlign: "right",
    valueFormatter: (value) =>
      value != null ? Number(value).toFixed(2) : "--",
  },

  {
    field: "compare_price",
    headerName: "Compare Price",
    minWidth: 140,
    type: "number",
    align: "right",
    headerAlign: "right",
    valueFormatter: (value) =>
      value != null ? Number(value).toFixed(2) : "--",
  },

  {
    field: "cost_price",
    headerName: "Cost Price",
    minWidth: 120,
    type: "number",
    align: "right",
    headerAlign: "right",
    valueFormatter: (value) =>
      value != null ? Number(value).toFixed(2) : "--",
  },

  {
    field: "tax_rate",
    headerName: "Tax Rate",
    minWidth: 100,
    align: "right",
    headerAlign: "right",
    valueFormatter: (value) => `${value}%`,
  },

  {
    field: "weight_grams",
    headerName: "Weight (g)",
    minWidth: 120,
    type: "number",
    align: "right",
    headerAlign: "right",
  },

  {
    field: "is_active",
    headerName: "Active",
    minWidth: 100,
    align: "center",
    headerAlign: "center",
    valueFormatter: (value) => (value ? "Yes" : "No"),
  },

  {
    field: "is_featured",
    headerName: "Featured",
    minWidth: 100,
    align: "center",
    headerAlign: "center",
    valueFormatter: (value) => (value ? "Yes" : "No"),
  },

  {
    field: "rating_avg",
    headerName: "Rating Avg",
    minWidth: 120,
    type: "number",
    align: "right",
    headerAlign: "right",
    valueFormatter: (value) =>
      value != null ? Number(value).toFixed(2) : "--",
  },

  {
    field: "rating_count",
    headerName: "Rating Count",
    minWidth: 130,
    type: "number",
    align: "right",
    headerAlign: "right",
  },

  {
    field: "sold_count",
    headerName: "Sold Count",
    minWidth: 120,
    type: "number",
    align: "right",
    headerAlign: "right",
  },

  {
    field: "created_at",
    headerName: "Created At",
    minWidth: 180,
  },

  {
    field: "updated_at",
    headerName: "Updated At",
    minWidth: 180,
  },

  {
    field: "is_organic",
    headerName: "Organic",
    minWidth: 100,
    align: "center",
    headerAlign: "center",
    valueFormatter: (value) => (value ? "Yes" : "No"),
  },
];
const ProductsList = () => {
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    brand: true,   // visible
    slug: false,   // hidden by default
  });

  const [rows, setRows] = useState([]);
  useEffect(() => {
    axiosAdmin.get('/products')
      .then(res => {
        console.log(res.data.response?.data)
        setRows(Object.values(res.data.response?.data || []));
      })
      .catch(err => {
        console.error('Error fetching products:', err);
      });
  }, [])
  return (
    <>
      <Box sx={{ my: 3 }}>
        <div className="d-flex align-items-center justify-content-between gap-2 mb-2">
          <Typography variant="h4" fontWeight={700} gutterBottom>
            List
          </Typography>
          <Button className="btn addProduct" variant="contained" startIcon={<Add />}>
            <Link href="/admin/add-product" >
              <b>Add Product</b>
            </Link>
          </Button>
        </div>

        <Breadcrumbs separator="•" aria-label="breadcrumb">
          <Link underline="hover" color="#333 !important" href="/admin/products">
            <b>Product</b>
          </Link>
          <Typography color="text.primary">List</Typography>
        </Breadcrumbs>
      </Box>  
      <Box sx={{ height: 400, maxWidth: '75vw' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
          <input style={{ border: '1px solid #ccc !important', borderRadius: '8px' }} class="form-control form-control-sm" type="text" placeholder="Search..." aria-label="Search..." />

          <select style={{ border: '1px solid #ccc !important', borderRadius: '8px' }} class="form-select" aria-label="Default select example">
            <option disabled selected>stock</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <select style={{ border: '1px solid #ccc !important', borderRadius: '8px' }} class="form-select" aria-label="Default select example">
            <option disabled selected>state</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>

        </div>
        <div>

        </div>
        <DataGrid
          rows={rows}
          columns={dataGridColumns}
          getRowId={(row) => row.id}
          pageSizeOptions={[10, 25, 100]}
          autoHeight={true}
          autoWidth={true}
          getRowHeight={() => 'auto'}
          checkboxSelection
          showToolbar
          slots={{ toolbar: GridToolbar }}  // ← adds built-in show/hide UI

          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={(newModel) =>
            setColumnVisibilityModel(newModel)
          }
          sx={{
            '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': {
              py: '18px',
            },
            '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': {
              py: '15px',
            },
            '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': {
              py: '22px',
            },
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          disableRowSelectionOnClick
          autoHeight
        />
      </Box>
    </>
  )

}

export default ProductsList
