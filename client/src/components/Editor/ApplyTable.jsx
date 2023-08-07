import React, { useEffect, useMemo, useRef, useState } from "react";
import {useLocation} from "react-router-dom"
import { useTable } from "react-table";
import { useSelector } from 'react-redux';


const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData,
  block_id
  }) => {
  const [value, setValue] = useState(initialValue);
  const {pathname} = useLocation();
  const authority = pathname.includes("pages") 
  
  const cellValueFromRedux = useSelector(state => {
    const blockList = state.editor.blockList || [];
    const block = blockList.find(block => block.block_id === block_id);
    return block?.content?.rows?.[index]?.[id] || initialValue; 
});


  const onChange = (e) => {
    if(authority){
      return
    }
    setValue(e.target.value);
    updateMyData(index, id, e.target.value);
  };

  useEffect(() => {
    setValue(cellValueFromRedux);
  }, [cellValueFromRedux]);

  return (
  <input value={value || ""} onChange={onChange} disabled={authority}  style={{textAlign:"center" , padding:"10px" , border:"none", width:'100%'}}/>
  );
};

const EditableHeaderCell = ({ 
  columnName, 
  columnIdx, 
  handleColumnNameChange,
  block_id,
  authority,
}) => {
  const [currentName, setCurrentName] = useState(columnName);

  const headerValueFromRedux = useSelector(state => {
    const blockList = state.editor.blockList || [];
    const block = blockList.find(block => block.block_id === block_id);
    return block?.content?.cols?.[columnIdx] || columnName;
  });

  useEffect(() => {
    setCurrentName(headerValueFromRedux);
  }, [headerValueFromRedux]);

  const handleChange = (e) => {
    if (authority) return;
    setCurrentName(e.target.value);
  };

  const handleBlur = () => {
    handleColumnNameChange(block_id, `col${columnIdx + 1}`, currentName);
  };

  return (
    <input
      value={currentName}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled={authority}
      style={{ width: "100%" , border:"none", textAlign:"center", backgroundColor:"#EE7D00", color:"#f3f3f3", fontSize:'20px', fontWeight:'700'}}
    />
  );
};
const defaultColumn = {
  Cell: EditableCell,
};

const MyTable = ({ columns,data,updateMyData,columnNames,setColumnNames,editColumnName,setEditColumnName,newColumnName,
  setNewColumnName,handleCellChange, block_id, handleColumnNameChange}) => {
  const { getTableProps,getTableBodyProps,headerGroups,rows,prepareRow,} = useTable({columns,data,defaultColumn,updateMyData});
  const {pathname} = useLocation();
  const authority = pathname.includes("pages") 


  return (
    <div style={{ overflow: "auto", height: "100%" }}>
      <table {...getTableProps()} style={{ margin: "0 auto", border: "none", padding: "40px", width: "100%" }}>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr {...headerGroup.getHeaderGroupProps()} >
              {headerGroup.headers.map((column, idx) => (
                <th {...column.getHeaderProps()} style={{ padding: "10px", fontSize: "20px", color: "#f3f3f3", backgroundColor: "#EE7D00" }}>
                  <EditableHeaderCell
                    columnName={columnNames[idx]}
                    columnIdx={idx}
                    editColumnName={editColumnName}
                    setEditColumnName={setEditColumnName}
                    newColumnName={newColumnName}
                    setNewColumnName={setNewColumnName}
                    handleColumnNameChange={handleColumnNameChange}
                    block_id={block_id}
                    authority={authority}
                  />
                </th>
              ))}
            </tr>
          ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td
                  {...cell.getCellProps()}
                  style={{ padding: "0", margin: "0" }}
                >
                  {cell.render("Cell", { block_id: block_id })}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
  );
};
const selectTableData = (state, block_id) => {
  const blockList = state.blockList || [];
  const block = blockList.find(block => block.block_id === block_id);
  return block?.content?.rows || [];
};
const selectTableHeaders = (state, block_id, cols) => {
  const blockList = state.editor.blockList || [];
  const block = blockList.find(block => block.block_id === block_id);
  const reduxColumnNames = block?.content?.cols || {};
  const numberOfKeys = Object.keys(reduxColumnNames).length;
  const defaultColumnNames = Array(cols).fill(0).map((_, index) => `Column ${index + 1}`);

  return numberOfKeys ? Object.values(reduxColumnNames) : defaultColumnNames;
};

const ApplyTable = ({ design_id, handleCellChange, block_id, handleColumnNameChange }) => {
  const [designSize, setDesignSize] = useState(design_id.split(",").map(Number));
  const [rows, cols] = designSize;

  const tableDataFromRedux = useSelector((state) => selectTableData(state, block_id));
  const initialColumnNamesFromRedux = useSelector(state => selectTableHeaders(state, block_id));

  const [columnNames, setColumnNames] = useState(initialColumnNamesFromRedux);
  
  const [editColumnName, setEditColumnName] = useState(null);
  const [newColumnName, setNewColumnName] = useState("");

  const columns = useMemo(
    () =>
      Array(cols)
        .fill(0)
        .map((_, index) => ({
          Header: columnNames[index],
          accessor: `col${index + 1}`,
        })),
    [columnNames, cols]
  );

  const [data, setData] = useState(() => {
    if (tableDataFromRedux && tableDataFromRedux.length > 0) {
      return tableDataFromRedux;
    } else {
      return Array(rows)
        .fill(0)
        .map(() =>
          Array(cols)
            .fill(0)
            .reduce(
              (acc, _, index) => ({
                ...acc,
                [`col${index + 1}`]: "Default",
              }),
              {}
            )
        );
    }
  });
  
  useEffect(() => {
    if (tableDataFromRedux === null) {  
        const newData = Array(rows)
            .fill(0)
            .map(() =>
                Array(cols)
                    .fill(0)
                    .reduce(
                        (acc, _, index) => ({
                            ...acc,
                            [`col${index + 1}`]: "Default",
                        }),
                        {}
                    )
            );

        setData(newData);
        newData.forEach((rowData, rowIndex) => {
            Object.keys(rowData).forEach((colId) => {
                handleCellChange(block_id, colId, rowIndex, "Default");
            });
        });
    } else if (tableDataFromRedux && tableDataFromRedux.length > 0) {
        setData(tableDataFromRedux);
    }
}, [tableDataFromRedux, handleCellChange, block_id, rows, cols]);

useEffect(() => {
  if (JSON.stringify(initialColumnNamesFromRedux) !== JSON.stringify(columnNames)) {
    setColumnNames(initialColumnNamesFromRedux);
  }
}, [initialColumnNamesFromRedux, columnNames]);

  const updateMyData = (rowIndex, columnId, value) => {
    setData((oldData) =>
      oldData.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...oldData[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
    handleCellChange(block_id, columnId, rowIndex, value);
  };

  return (
    <MyTable
      columns={columns}
      data={data}
      updateMyData={updateMyData}
      columnNames={columnNames}
      setColumnNames={setColumnNames}
      editColumnName={editColumnName}
      setEditColumnName={setEditColumnName}
      newColumnName={newColumnName}
      setNewColumnName={setNewColumnName}
      handleCellChange={handleCellChange}
      block_id={block_id}
      handleColumnNameChange={handleColumnNameChange}
    />
  );
};

export default ApplyTable;
