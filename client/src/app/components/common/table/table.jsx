import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ onSort, selectedSort, columns, data, children }) => {
    const styles = {
        table: {
            minWidth: "80vw"
        }
    };
    return (
        <div className=" mb-5 rounded-3 overflow-hidden shadow">
            <table
                className="table table-light text-center mb-0"
                style={styles.table}
            >
                {children || (
                    <>
                        <TableHeader {...{ onSort, selectedSort, columns }} />
                        <TableBody {...{ data, columns }} />
                    </>
                )}
            </table>
        </div>
    );
};

Table.propTypes = {
    data: PropTypes.array,
    onSort: PropTypes.func,
    selectedSort: PropTypes.object,
    columns: PropTypes.object,
    children: PropTypes.array
};

export default Table;
