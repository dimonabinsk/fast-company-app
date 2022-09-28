import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const handlerSort = (item) => {
        if (selectedSort.iter === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ iter: item, order: "asc" });
        }
    };
    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        onClick={
                            columns[column].iter
                                ? () => handlerSort(columns[column].iter)
                                : undefined
                        }
                        scope="col"
                        {...{ role: columns[column].iter && "button" }}
                    >
                        {columns[column].name}
                    </th>
                ))}
                {/* <th onClick={() => handlerSort("name")} scope="col" role={"button"}>Имя</th>
                <th scope="col">Качества</th>
                <th onClick={() => handlerSort("")} scope="col" role={"button"}>Профессия</th>
                <th onClick={() => handlerSort("completedMeetings")} scope="col" role={"button"}></th>
                <th onClick={() => handlerSort("rate")} scope="col" role={"button"}></th>
                <th onClick={() => handlerSort("bookmark")} scope="col" role={"button"}></th>
                <th scope="col"></th> */}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
