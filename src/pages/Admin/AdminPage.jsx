import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import MUIDataTable from "mui-datatables";

export default function AdminPage() 
{
    const [isLoaded, setIsLoaded] = useState(false);
    const [tableName, setTableName] = useState("");
    const [testData, setTestData] = useState([]);
    const [error, setError] = useState(null);
    const [nbRows, setNbRows] = useState(10);

    const removeRow = () => setNbRows((x) => Math.max(0, x - 1));
    const addRow = () => setNbRows((x) => Math.min(100, x + 1));

    const { data } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 100,
        maxColumns: 6,
    });

    useEffect(() => {
        fetch("https://pmc-schedule-api.herokuapp.com/" + tableName)
            .then(res => res.json())
            .then(
                (data) => {
                    console.log("useEffect is called: " + tableName);
                    setIsLoaded(true);
                    setTestData(data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, [tableName]);


    let handleChange = (e) => {
        setIsLoaded(false);
        setTableName(e.target.value);
    }

    if (error) 
    {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) 
    {
        return <div>Loading...</div>;
    } else 
    {
        let columns = [];
        let rows = [];

        if(testData.length > 0)
        {
            for(let key in testData[0])
            {
                let temp = {}
                temp.field=key;
                columns.push(temp);
            }

            rows = testData;
        }
        const options = {
            filterType: 'checkbox',
          };

        return (
            <div style={{ width: '100%' }} className="admindiv">
                <h1>Admin Page</h1>
                <h1>Table {tableName}</h1>

                <label className="selector-label">Choose a table:</label>

                <select name="tables" id="tables-selector" onChange={handleChange}>
                    <option value=""></option>
                    <option value="class">class</option>
                    <option value="college">college</option>
                    <option value="course">course</option>
                    <option value="subject">subject</option>
                </select>

            <div style={{ height: 2500, width: '100%' }}>
                <DataGrid
                columns={columns}
                rows={rows}
                />
            </div>
            </div>
        );
    }
}