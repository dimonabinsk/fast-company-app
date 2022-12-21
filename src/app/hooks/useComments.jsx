import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
// import { toast } from "react-toastify";

// import professionService from "../services/profession.service";

const CommentsContext = React.createContext();

export const useComments = () => {
    return useContext(CommentsContext);
};

export const CommentsProvider = ({ children }) => {
    const [comments, setComments] = useState([]);
    // const [isLoading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    useEffect(() => {
        setComments(null);
    }, []);

    return (
        <CommentsContext.Provider value={{ comments }}>
            {children}
        </CommentsContext.Provider>
    );
};

CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
