import { Link, useLocation, useParams } from "react-router-dom";
import { DashboardNav } from "./dashboard-nav.component";
import { useEffect, useState } from "react";
import { mediateRequestSearchDocument } from "../../core/mediator";
import { useDispatch, useSelector } from "react-redux";
import { selectDocumentSearch } from "../../core/store/document-search.state";

const Document = ({name, title}) => {
    return (
        <Link to={`/document/${name}`} className='d-inline-block me-3'>{title}</Link>
    );
};

export const Dashboard = () => {
    const params = useParams();
    const location = useLocation();
    const dispatch = useDispatch<any>();
    const docSearch = useSelector(selectDocumentSearch);

    useEffect(() => {
        if (location.pathname === '/dashboard/recent/today') {
            dispatch(mediateRequestSearchDocument({}));
        }
    }, [dispatch, location, params]);

    useEffect(() => {
        console.log('docSearch', docSearch);
    }, [docSearch]);

    return (
        <>
        <DashboardNav />
        <div className='m-3'>
        {docSearch.result && docSearch.result.map((e, index) => <Document key={`document-${index}`} name={e.name} title={e.title} />)}
        </div>
        </>
    );
};
