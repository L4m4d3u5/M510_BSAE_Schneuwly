import { useState } from 'react';
import { DataGrid, GridRowsProp, GridColDef, GridPaginationModel } from '@mui/x-data-grid';


const Produkttabelle = ({ products }: { products: GridRowsProp }) => {
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ page: 0, pageSize: 10 });
    const totalPages = Math.ceil(products.length / paginationModel.pageSize) || 1;

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'artikelnummer', headerName: 'Artikelnummer', width: 130 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'kategorie', headerName: 'Kategorie', width: 130 },
        { field: 'lagerbestand', headerName: 'Lagerbestand', width: 130, type: 'number' },
        { field: 'mindestbestand', headerName: 'Mindestbestand', width: 140, type: 'number' },
        { field: 'einheit', headerName: 'Einheit', width: 90 },
        { field: 'preis', headerName: 'Preis (CHF)', width: 110, type: 'number' },
        { field: 'lieferant', headerName: 'Lieferant', width: 180 },
        { field: 'standort', headerName: 'Standort', width: 120 },
    ];

    return (
        <>
            <p>Seite {paginationModel.page + 1} von {totalPages}</p>
            <DataGrid
                rows={products}
                columns={columns}
                pageSizeOptions={[10, 25, 50]}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                getRowClassName={(params) =>
                    params.row.lagerbestand < params.row.mindestbestand ? 'row-unterbestand' : ''
                }
                sx={{
                    '& .row-unterbestand': {
                        backgroundColor: '#ffcccc',
                        '&:hover': { backgroundColor: '#ffaaaa' },
                    },
                }}
            />
        </>
    );
}


export default Produkttabelle