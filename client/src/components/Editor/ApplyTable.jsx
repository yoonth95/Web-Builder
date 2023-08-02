import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTable } from "react-table";

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData,
}) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
    updateMyData(index, id, e.target.value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <input value={value || ""} onChange={onChange} style={{textAlign:"center" , padding:"10px" , border:"none", width:'100%'}}/>;
};

const defaultColumn = {
  Cell: EditableCell,
};

const MyTable = ({
  columns,
  data,
  updateMyData,
  columnNames,
  setColumnNames,
  editColumnName,
  setEditColumnName,
  newColumnName,
  setNewColumnName,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
    defaultColumn,
    updateMyData,
  });

  const inputRef = useRef();

  useEffect(() => {
    if (editColumnName !== null) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    }
  }, [editColumnName]);

  return (
    <div style={{ overflow: 'auto', height: '100%' }}>
    <table {...getTableProps()} style={{ margin:"0 auto", border:"none", padding:"40px", width:'100%'}}>
      <thead>
        {headerGroups.map((headerGroup, index) => (
          <tr {...headerGroup.getHeaderGroupProps()} >
            {headerGroup.headers.map((column, idx) => (
              <th
                {...column.getHeaderProps()}
                style={{ padding: "10px", fontSize:"20px", color:"#f3f3f3",backgroundColor:"#EE7D00"}}
              >
                {editColumnName === idx ? (
                  <input
                    style={{width:"100px"}}
                    ref={inputRef}
                    value={newColumnName}
                    onChange={(e) => setNewColumnName(e.target.value)}
                    onBlur={() => {
                      setColumnNames(
                        columnNames.map((name, i) =>
                          i === idx ? newColumnName : name
                        )
                      );
                      setEditColumnName(null);
                      setNewColumnName("");
                    }}
                  />
                ) : (
                  <div
                    onClick={() => {
                      setEditColumnName(idx);
                      setNewColumnName(columnNames[idx]);
                    }}
                  >
                    {columnNames[idx]}
                  </div>
                )}
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
                  {cell.render("Cell")}
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

const ApplyTable = ({ design_id }) => {
  const [designSize, setDesignSize] = useState(
    design_id.split(",").map(Number)
  ); 
  const [rows, cols] = designSize;

  const [columnNames, setColumnNames] = useState(
    Array(cols)
      .fill(0)
      .map((_, index) => `Column ${index + 1}`)
  );
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

  const [data, setData] = useState(
    Array(rows)
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
      )
  );

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
    />
  );
};

export default ApplyTable;
